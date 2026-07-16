import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'
import { optimizeResumeATS } from '@/lib/ai/openai-service'

interface ContentGenerationRequest {
  jobTitle: string
  company?: string
  location?: 'Remote' | 'On-site' | 'Hybrid' | 'Any'
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  skills: string[]
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  salaryRange?: string
  contentType: 'job-description' | 'job-summary' | 'requirements' | 'benefits' | 'full-posting'
  tone?: 'Professional' | 'Casual' | 'Enthusiastic' | 'Corporate'
  targetAudience?: string
}

interface ContentGenerationResponse {
  generatedContent: string
  atsOptimizedContent?: string
  suggestions: {
    improvements: string[]
    keywordsToInclude: string[]
    atsTips: string[]
  }
  metadata: {
    contentLength: number
    keywordDensity: number
    readabilityScore: number
    tonality: string
  }
  alternatives: {
    shortVersion?: string
    detailedVersion?: string
    casualVersion?: string
  }
  usageInsights: {
    marketDemand: string
    competitionLevel: 'High' | 'Medium' | 'Low'
    suggestedPosting: string
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    jobTitle,
    company,
    location = 'Remote',
    experienceLevel,
    skills,
    responsibilities,
    requirements,
    benefits,
    salaryRange,
    contentType,
    tone = 'Professional',
    targetAudience = 'developers'
  } = body

  if (!jobTitle || !skills || !experienceLevel || !Array.isArray(skills)) {
    return NextResponse.json(
      { error: 'Job title, skills, and experience level are required' },
      { status: 400 }
    )
  }

  try {
    let prompt = ''

    switch (contentType) {
      case 'job-description':
        prompt = generateJobDescriptionPrompt({
          jobTitle,
          company,
          location,
          experienceLevel,
          skills,
          responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
          benefits: Array.isArray(benefits) ? benefits : [],
          salaryRange,
          tone,
          targetAudience
        })
        break

      case 'job-summary':
        prompt = generateJobSummaryPrompt({
          jobTitle,
          company,
          skills,
          experienceLevel,
          location,
          tone
        })
        break

      case 'requirements':
        prompt = generateRequirementsPrompt({
          jobTitle,
          skills,
          responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
          requirements: Array.isArray(requirements) ? requirements : [],
          experienceLevel
        })
        break

      case 'benefits':
        prompt = generateBenefitsPrompt({
          company,
          benefits: Array.isArray(benefits) ? benefits : [],
          jobTitle,
          targetAudience
        })
        break

      case 'full-posting':
        prompt = generateFullPostingPrompt({
          jobTitle,
          company,
          location,
          experienceLevel,
          skills,
          responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
          requirements: Array.isArray(requirements) ? requirements : [],
          benefits: Array.isArray(benefits) ? benefits : [],
          salaryRange,
          tone
        })
        break

      default:
        return NextResponse.json(
          { error: 'Invalid content type' },
          { status: 400 }
        )
    }

    // Generate primary content
    const aiResponse = await textModel.generateContent(prompt)
    const analysis = JSON.parse(aiResponse.response.text())

    // Generate ATS-optimized version if applicable
    let atsOptimized: string | undefined = undefined
    if (contentType === 'job-description' || contentType === 'full-posting') {
      try {
        const atsPrompt = `Optimize this job posting for ATS systems. Enhance with relevant keywords, improve formatting, and ensure it's ATS-friendly:\n\n${analysis.generatedContent || analysis.mainContent || ''}`
        const atsResponse = await textModel.generateContent(atsPrompt)
        atsOptimized = atsResponse.response.text()
      } catch (error) {
        console.warn('ATS optimization failed:', error)
      }
    }

    // Generate improvement suggestions
    const suggestions = await generateOptimizationSuggestions(analysis.generatedContent || analysis.mainContent || '')

    // Generate usage insights
    const usageInsights = await generateUsageInsights(jobTitle, skills, location, experienceLevel)

    const response: ContentGenerationResponse = {
      generatedContent: analysis.generatedContent || analysis.mainContent || 'Content generation failed',
      atsOptimizedContent: atsOptimized,
      suggestions,
      metadata: {
        contentLength: (analysis.generatedContent || analysis.mainContent || '').length,
        keywordDensity: Math.round((skills.length / (analysis.generatedContent || analysis.mainContent || '').split(' ').length) * 100),
        readabilityScore: 75, // Placeholder - could be calculated
        tonality: tone
      },
      alternatives: analysis.alternatives || {},
      usageInsights
    }

    return NextResponse.json({
      success: true,
      data: response,
      _meta: {
        contentType,
        generationTime: `${Date.now()}ms`,
        aiModel: 'Gemini-1.5-Flash',
        optimizationApplied: !!atsOptimized
      }
    })

  } catch (error) {
    console.error('Content generation API error:', error)

    // Fallback content generation
    const fallbackResponse: ContentGenerationResponse = {
      generatedContent: generateBasicContent(jobTitle, skills, experienceLevel, contentType, tone),
      suggestions: {
        improvements: ['Add company culture description', 'Include specific achievements', 'Mention growth opportunities'],
        keywordsToInclude: skills.slice(0, 5),
        atsTips: ['Use standard section headers', 'Include specific technologies', 'Avoid graphics/tables']
      },
      metadata: {
        contentLength: 200,
        keywordDensity: 3,
        readabilityScore: 70,
        tonality: tone
      },
      alternatives: {},
      usageInsights: {
        marketDemand: 'Medium',
        competitionLevel: 'Medium',
        suggestedPosting: 'Post immediately, good time to hire'
      }
    }

    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        contentType,
        method: 'Basic template generation'
      }
    })
  }
}

function generateJobDescriptionPrompt(data: any): string {
  return `
Create a compelling job description for a ${data.jobTitle} position.

REQUIREMENTS:
- Company: ${data.company || 'Tech Company'}
- Location: ${data.location}
- Experience Level: ${data.experienceLevel} Level
- Key Skills: ${data.skills.join(', ')}
- Responsibilities: ${data.responsibilities?.join(', ') || 'Standard responsibilities for this role'}
- Benefits: ${data.benefits?.join(', ') || 'Competitive benefits package'}
- Salary: ${data.salaryRange || 'Competitive'}
- Tone: ${data.tone}
- Target Audience: ${data.targetAudience}

Return JSON with detailed job description in "generatedContent" field, including:
- Job overview
- Responsibilities
- Requirements
- Benefits
- Company information
- How to apply

Make it compelling, ATS-friendly, and realistic for ${data.experienceLevel} level candidates.
`
}

function generateJobSummaryPrompt(data: any): string {
  return `
Create a concise, compelling job summary for a ${data.jobTitle} role.

DETAILS:
- Skills: ${data.skills.join(', ')}
- Experience Level: ${data.experienceLevel}
- Location: ${data.location}
- Company: ${data.company || 'Growing Tech Company'}
- Tone: ${data.tone}

Return JSON with a 2-3 sentence job summary that highlights the most attractive aspects.
`
}

function generateRequirementsPrompt(data: any): string {
  return `
Generate detailed job requirements for a ${data.jobTitle} position.

DETAILS:
- Skills Required: ${data.skills.join(', ')}
- Experience Level: ${data.experienceLevel}
- Key Responsibilities: ${data.responsibilities?.join(', ') || 'Technical delivery and collaboration'}
- Additional Requirements: ${data.requirements?.join(', ') || 'Basic requirements'}

Return JSON with comprehensive requirements section including:
- Must-have technical skills
- Experience requirements
- Education/certifications
- Soft skills needed
`
}

function generateBenefitsPrompt(data: any): string {
  return `
Create an appealing benefits section for a ${data.jobTitle} position at ${data.company || 'our company'}.

CONTEXT:
- Target Audience: ${data.targetAudience}
- Existing Benefits: ${data.benefits?.join(', ') || 'Base benefits'}
- Position Level: ${data.jobTitle}

Return JSON with compelling benefits description that would attract candidates.
`
}

function generateFullPostingPrompt(data: any): string {
  return `
Create a complete, professional job posting for a ${data.jobTitle} position.

ALL DETAILS:
- Company: ${data.company || 'Tech Company'}
- Location: ${data.location}
- Experience: ${data.experienceLevel} Level
- Skills: ${data.skills.join(', ')}
- Responsibilities: ${data.responsibilities?.join(', ') || 'Deliver high-quality solutions'}
- Requirements: ${data.requirements?.join(', ') || 'Technical proficiency required'}
- Benefits: ${data.benefits?.join(', ') || 'Full benefits package'}
- Salary: ${data.salaryRange || 'Competitive'}
- Tone: ${data.tone}

Return JSON with complete, ready-to-post job description including all sections.
`
}

async function generateOptimizationSuggestions(content: string) {
  try {
    const suggestionPrompt = `
Analyze this job posting content and provide optimization suggestions:

CONTENT:
${content}

Return JSON with:
- improvements: ["specific suggestions to make content better"]
- keywordsToInclude: ["important keywords that should be added"]
- atsTips: ["ATS optimization tips"]
`

    const response = await textModel.generateContent(suggestionPrompt)
    return JSON.parse(response.response.text())
  } catch (error) {
    return {
      improvements: ['Add more specific achievements examples', 'Include company values', 'Mention growth opportunities'],
      keywordsToInclude: ['team collaboration', 'problem-solving', 'communication'],
      atsTips: ['Use standard section headers', 'Include specific technologies', 'Avoid complex formatting']
    }
  }
}

async function generateUsageInsights(jobTitle: string, skills: string[], location: string, experienceLevel: string): Promise<{
  marketDemand: string
  competitionLevel: 'High' | 'Medium' | 'Low'
  suggestedPosting: string
}> {
  // Placeholder for market insights - in real implementation this could use job market data
  return {
    marketDemand: 'High',
    competitionLevel: experienceLevel === 'Senior' ? 'High' : 'Medium',
    suggestedPosting: 'Post immediately - good time to attract qualified candidates'
  }
}

function generateBasicContent(jobTitle: string, skills: string[], experienceLevel: string, contentType: string, tone: string): string {
  const skillStr = skills.slice(0, 5).join(', ') + (skills.length > 5 ? ' and more' : '')

  switch (contentType) {
    case 'job-description':
      return `We're seeking a talented ${jobTitle} to join our team. \n\nIn this ${experienceLevel} level role, you'll work with ${skillStr} and contribute to exciting projects. \n\nRequirements:\n- ${experienceLevel} level experience\n- Proficiency in ${skillStr}\n\nBenefits include competitive salary, health insurance, and professional development opportunities.`

    case 'job-summary':
      return `Join our team as a ${jobTitle}! We're looking for a ${experienceLevel} level professional with expertise in ${skillStr}. This is a great opportunity to work on challenging projects and grow your career.`

    default:
      return `We're hiring a ${jobTitle} with ${experienceLevel} level experience in ${skillStr}.`
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Content Generator API',
    version: '1.0',
    features: [
      'Job description generation',
      'ATS optimization',
      'Multi-tone content',
      'Market insights integration',
      'Alternative content versions'
    ],
    supportedContentTypes: [
      'job-description',
      'job-summary',
      'requirements',
      'benefits',
      'full-posting'
    ],
    supportedTones: ['Professional', 'Casual', 'Enthusiastic', 'Corporate'],
    rateLimit: '10 requests per minute'
  })
}
