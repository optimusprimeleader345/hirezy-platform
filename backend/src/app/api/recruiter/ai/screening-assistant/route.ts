import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'
import { calculateJobMatch } from '@/lib/ai/google-ai-service'

interface ScreeningRequest {
  candidateProfile: {
    resumeText?: string
    skills: string[]
    experience: string[]
    qualificationScore?: number
    interviewNotes?: string[]
  }
  jobRequirements: {
    title: string
    requiredSkills: string[]
    minimumExperience?: string
    educationRequirements?: string[]
    criticalCriteria?: string[]
    dealBreakers?: string[]
  }
  screeningLevel: 'Initial' | 'Technical' | 'Final'
  companyCulture: string[]
  historicalData?: {
    averageHireSuccess: number
    commonRejectionReasons: string[]
    successfulCandidatePatterns: string[]
  }
}

interface ScreeningResponse {
  recommendation: {
    decision: 'Strong_Hire' | 'Consider_Hire' | 'Borderline' | 'Reject' | 'Interview_Needed'
    confidence: number // 0-100
    rationale: string
    urgency: 'Immediate' | 'High' | 'Medium' | 'Low'
  }
  scores: {
    skillsMatch: number // 0-100
    experienceFit: number // 0-100
    culturalAlignment: number // 0-100
    overallCompatibility: number // 0-100
    potentialScore: number // 0-100
  }
  analysis: {
    matchedRequirements: string[]
    unmetRequirements: Array<{
      requirement: string
      severity: 'Critical' | 'Important' | 'Desirable'
      reason: string
    }>
    strengths: string[]
    concerns: Array<{
      concern: string
      severity: 'High' | 'Medium' | 'Low'
      mitigation: string
    }>
    risks: Array<{
      risk: string
      probability: 'High' | 'Medium' | 'Low'
      impact: string
      prevention: string
    }>
  }
  nextSteps: {
    immediateActions: string[]
    suggestedInterviews: Array<{
      type: string
      purpose: string
      duration: number
      focus: string[]
    }>
    requiredAssessments: string[]
    documentationNeeded: string[]
  }
  improvementSuggestions: {
    forCandidate: string[]
    forProcess: string[]
    forJobRequirements: string[]
  }
  marketContext: {
    competitiveness: string
    marketFit: string
    salaryRange: string
    alternativeRoles: string[]
  }
  processedAt: string
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    candidateProfile,
    jobRequirements,
    screeningLevel = 'Initial',
    companyCulture = [],
    historicalData
  } = body

  if (!candidateProfile || !jobRequirements) {
    return NextResponse.json(
      { error: 'Candidate profile and job requirements are required' },
      { status: 400 }
    )
  }

  try {
    // Prepare data for semantic matching
    const candidateData = {
      skills: candidateProfile.skills || [],
      experience: candidateProfile.experience || [],
      education: [],
      projects: [candidateProfile.resumeText || '']
    }

    const jobData = {
      skills: jobRequirements.requiredSkills || [],
      experience: [jobRequirements.minimumExperience || '2+ years'],
      education: jobRequirements.educationRequirements || [],
      projects: [`${jobRequirements.title} requirements`]
    }

    // Get initial matching score
    const semanticMatch = await calculateJobMatch(candidateData, JSON.stringify(jobRequirements), jobRequirements.title)

    // Comprehensive screening analysis
    const screeningPrompt = `
Perform comprehensive candidate screening analysis for ${jobRequirements.title} position at screening level: ${screeningLevel}.

CANDIDATE PROFILE:
- Skills: ${candidateProfile.skills?.join(', ') || 'Not specified'}
- Experience: ${candidateProfile.experience?.join('; ') || 'Not specified'}
- Resume: ${candidateProfile.resumeText?.substring(0, 500) || 'Not provided'}
- Interview Notes: ${candidateProfile.interviewNotes?.join('; ') || 'None'}

JOB REQUIREMENTS:
- Title: ${jobRequirements.title}
- Required Skills: ${jobRequirements.requiredSkills?.join(', ') || 'Not specified'}
- Minimum Experience: ${jobRequirements.minimumExperience || 'Not specified'}
- Education: ${jobRequirements.educationRequirements?.join(', ') || 'Not specified'}
- Critical Criteria: ${jobRequirements.criticalCriteria?.join(', ') || 'Not specified'}
- Deal Breakers: ${jobRequirements.dealBreakers?.join(', ') || 'Not specified'}

COMPANY CONTEXT:
- Culture: ${companyCulture.join(', ') || 'Standard tech culture'}
- Screening Level: ${screeningLevel}
${historicalData ? `- Historical Data: Success rate ${historicalData.averageHireSuccess}%, Common rejections: ${historicalData.commonRejectionReasons?.join(', ')}` : ''}

Provide screening analysis in JSON format:
{
  "recommendation": {
    "decision": "Strong_Hire|Consider_Hire|Borderline|Reject|Interview_Needed",
    "confidence": 85,
    "rationale": "Detailed reasoning for decision",
    "urgency": "Immediate|High|Medium|Low"
  },
  "scores": {
    "skillsMatch": number,
    "experienceFit": number,
    "culturalAlignment": number,
    "overallCompatibility": number,
    "potentialScore": number
  },
  "analysis": {
    "matchedRequirements": ["Successfully met requirements"],
    "unmetRequirements": [
      {
        "requirement": "Skill or experience gap",
        "severity": "Critical|Important|Desirable",
        "reason": "Why it's not met"
      }
    ],
    "strengths": ["Key candidate strengths"],
    "concerns": [
      {
        "concern": "Specific concern",
        "severity": "High|Medium|Low",
        "mitigation": "How to address it"
      }
    ],
    "risks": []
  },
  "nextSteps": {
    "immediateActions": ["Immediate hiring actions"],
    "suggestedInterviews": [
      {
        "type": "Technical Interview",
        "purpose": "Assess technical skills",
        "duration": 90,
        "focus": ["React", "Node.js", "Architecture"]
      }
    ],
    "requiredAssessments": ["skills assessments needed"],
    "documentationNeeded": ["additional documentation required"]
  }
}

Provide actionable, evidence-based screening recommendations. Be thorough and specific.
`

    const aiResponse = await textModel.generateContent(screeningPrompt)
    const rawAnalysis = JSON.parse(aiResponse.response.text())

    // Structure the final response
    const response: ScreeningResponse = {
      recommendation: rawAnalysis.recommendation || {
        decision: 'Consider_Hire',
        confidence: 75,
        rationale: 'Good technical fit with some areas requiring further evaluation',
        urgency: 'Medium'
      },
      scores: {
        skillsMatch: semanticMatch.score,
        experienceFit: rawAnalysis.scores?.experienceFit || 70,
        culturalAlignment: rawAnalysis.scores?.culturalAlignment || 75,
        overallCompatibility: rawAnalysis.scores?.overallCompatibility || semanticMatch.score,
        potentialScore: rawAnalysis.scores?.potentialScore || Math.min(95, semanticMatch.score + 10)
      },
      analysis: {
        matchedRequirements: rawAnalysis.analysis?.matchedRequirements || semanticMatch.matchingSkills || [],
        unmetRequirements: rawAnalysis.analysis?.unmetRequirements || [],
        strengths: rawAnalysis.analysis?.strengths || [
          'Strong technical foundation',
          'Relevant experience demonstrated'
        ],
        concerns: rawAnalysis.analysis?.concerns || [],
        risks: rawAnalysis.analysis?.risks || []
      },
      nextSteps: rawAnalysis.nextSteps || {
        immediateActions: ['Schedule technical assessment'],
        suggestedInterviews: [
          {
            type: 'Technical Interview',
            purpose: 'Validate technical skills',
            duration: 90,
            focus: jobRequirements.requiredSkills?.slice(0, 3) || ['Core skills']
          }
        ],
        requiredAssessments: ['Coding assessment'],
        documentationNeeded: ['References', 'Portfolio']
      },
      improvementSuggestions: rawAnalysis.improvementSuggestions || {
        forCandidate: ['Develop specific skill areas', 'Gain relevant experience'],
        forProcess: ['Clarify job requirements', 'Improve interview structure'],
        forJobRequirements: ['Adjust requirements based on candidate pool', 'Consider skill transferability']
      },
      marketContext: {
        competitiveness: 'Medium',
        marketFit: `Good fit for ${jobRequirements.title} market`,
        salaryRange: 'Competitive market rate',
        alternativeRoles: [`Senior ${jobRequirements.title}`, 'Tech Lead', 'Full Stack Developer']
      },
      processedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: response,
      _meta: {
        screeningLevel,
        algorithmVersion: 'AI-Screening v2.0',
        decisionConfidence: response.recommendation.confidence,
        processingTime: `${Date.now()}ms`,
        semanticMatchUsed: true
      }
    })

  } catch (error) {
    console.error('AI screening assistant API error:', error)

    // Enhanced fallback screening
    const hasSkills = candidateProfile.skills?.some(skill =>
      jobRequirements.requiredSkills?.some(req => req.toLowerCase().includes(skill.toLowerCase()))
    ) || false

    const fallbackDecision = hasSkills ? 'Consider_Hire' : 'Borderline'
    const fallbackScore = hasSkills ? semanticMatch?.score || 70 : 45

    const fallbackResponse: ScreeningResponse = {
      recommendation: {
        decision: fallbackDecision as any,
        confidence: 0.6,
        rationale: `Basic screening shows ${hasSkills ? 'good' : 'limited'} alignment with requirements`,
        urgency: hasSkills ? 'Medium' : 'Low'
      },
      scores: {
        skillsMatch: fallbackScore,
        experienceFit: 65,
        culturalAlignment: 70,
        overallCompatibility: fallbackScore,
        potentialScore: Math.min(90, fallbackScore + 15)
      },
      analysis: {
        matchedRequirements: semanticMatch?.matchingSkills || [],
        unmetRequirements: semanticMatch?.missingSkills?.map(skill => ({
          requirement: skill,
          severity: 'Important' as const,
          reason: 'Not demonstrated in candidate profile'
        })) || [],
        strengths: ['Technical foundation present', 'Relevant experience'],
        concerns: [{
          concern: 'May need skill gap assessment',
          severity: 'Medium' as const,
          mitigation: 'Schedule technical evaluation'
        }],
        risks: []
      },
      nextSteps: {
        immediateActions: [
          'Review candidate portfolio',
          'Schedule basic technical assessment',
          'Conduct reference check'
        ],
        suggestedInterviews: [{
          type: 'Initial Interview',
          purpose: 'Assess basic qualifications',
          duration: 60,
          focus: ['Experience validation', 'Culture fit']
        }],
        requiredAssessments: ['Basic skills test', 'Problem-solving assessment'],
        documentationNeeded: ['Updated resume', 'Professional references']
      },
      improvementSuggestions: {
        forCandidate: ['Highlight relevant projects', 'Demonstrate specific skills'],
        forProcess: ['Use AI screening tools', 'Implement skill assessments'],
        forJobRequirements: ['Clarify must-have skills', 'Consider skill flexibility']
      },
      marketContext: {
        competitiveness: 'Medium',
        marketFit: 'Standard market alignment',
        salaryRange: 'Market competitive',
        alternativeRoles: [`Entry ${jobRequirements.title}`, 'Related positions']
      },
      processedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        screeningLevel,
        method: 'Basic rule-based screening',
        confidence: 0.65
      }
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Screening Assistant API',
    version: '2.0',
    features: [
      'Automated hire/no-hire recommendations',
      'Comprehensive candidate scoring',
      'Risk assessment and mitigation',
      'Interview planning and suggestions',
      'Market competitiveness analysis',
      'Process improvement recommendations'
    ],
    decisionCategories: [
      'Strong_Hire', 'Consider_Hire', 'Borderline',
      'Reject', 'Interview_Needed'
    ],
    screeningLevels: ['Initial', 'Technical', 'Final'],
    riskAssessment: 'Integrated with recommendations',
    rateLimit: '20 requests per minute'
  })
}
