import { GoogleGenerativeAI } from "@google/generative-ai"

// Lazy initialization - only create client when needed
let genAI: GoogleGenerativeAI | null = null
let embeddingModel: any = null
let textModel: any = null

function initializeGoogleAI(): void {
  if (!genAI) {
    // Only check environment variable on server side
    if (typeof window === 'undefined') {
      const apiKey = process.env.GOOGLE_AI_API_KEY
      if (!apiKey) {
        throw new Error('GOOGLE_AI_API_KEY environment variable is not configured. Please add your Google AI API key to your environment variables.')
      }
      genAI = new GoogleGenerativeAI(apiKey)
      embeddingModel = genAI.getGenerativeModel({ model: "embedding-001" })
      textModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        }
      })
    } else {
      throw new Error('Google AI API is not available on client side. Please configure server-side API key.')
    }
  }
}

export function getTextModel() {
  initializeGoogleAI()
  return textModel
}

export interface JobMatchResult {
  score: number
  reasoning: string
  matchingSkills: string[]
  missingSkills: string[]
  recommendations: string[]
}

/**
 * Calculate semantic similarity between user profile and job description
 */
export async function calculateJobMatch(
  userProfile: {
    skills: string[]
    experience: string[]
    education: string[]
    projects: string[]
  },
  jobDescription: string,
  jobTitle: string
): Promise<JobMatchResult> {
  try {
    // Create text representations
    const userText = `
Skills: ${userProfile.skills.join(', ')}
Experience: ${userProfile.experience.join(' | ')}
Education: ${userProfile.education.join(' | ')}
Projects: ${userProfile.projects.join(' | ')}
    `.trim()

    // Generate embeddings
    const [userEmbedding, jobEmbedding] = await Promise.all([
      embeddingModel.embedContent(userText),
      embeddingModel.embedContent(`Job Title: ${jobTitle}\nDescription: ${jobDescription}`)
    ])

    // Calculate cosine similarity
    const similarity = calculateCosineSimilarity(
      userEmbedding.embedding.values,
      jobEmbedding.embedding.values
    )

    // Convert to 0-100 scale
    const matchScore = Math.round(Math.max(0, Math.min(100, (similarity + 1) * 50)))

    // Get detailed analysis using Gemini
    const analysis = await textModel.generateContent(`
Analyze the match between this candidate profile and job description:

CANDIDATE PROFILE:
${userText}

JOB TITLE: ${jobTitle}
JOB DESCRIPTION:
${jobDescription}

Provide analysis in JSON format:
{
  "reasoning": "Brief explanation of the match score",
  "matchingSkills": ["skill1", "skill2", "skill3"],
  "missingSkills": ["missing_skill1", "missing_skill2"],
  "recommendations": ["actionable advice 1, advice 2, advice 3"]
}

Focus on specific technical skills, experience level alignment, and qualifications mentioned in the job description.
    `)

    const analysisResult = JSON.parse(analysis.response.text())

    return {
      score: matchScore,
      reasoning: analysisResult.reasoning || "Analysis based on skills and experience alignment",
      matchingSkills: analysisResult.matchingSkills || [],
      missingSkills: analysisResult.missingSkills || [],
      recommendations: analysisResult.recommendations || []
    }

  } catch (error) {
    console.error('Error calculating job match:', error)

    // Fallback to simple keyword matching if embeddings fail
    return calculateKeywordMatch(userProfile.skills, jobDescription)
  }
}

/**
 * Fallback keyword-based matching when embeddings fail
 */
function calculateKeywordMatch(userSkills: string[], jobDescription: string): JobMatchResult {
  const jobLower = jobDescription.toLowerCase()
  const matched = userSkills.filter(skill =>
    jobLower.includes(skill.toLowerCase())
  )

  const matchScore = Math.round((matched.length / userSkills.length) * 85) + 5 // Add base score

  return {
    score: Math.max(0, Math.min(100, matchScore)),
    reasoning: `Keyword matching analysis: ${matched.length}/${userSkills.length} skills found`,
    matchingSkills: matched,
    missingSkills: userSkills.filter(skill => !matched.includes(skill)),
    recommendations: [
      "Consider adding skills mentioned in job but missing from your profile",
      "Highlight relevant projects that demonstrate required skills",
      "Tailor your resume keywords to match job requirements"
    ]
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have same length')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }

  normA = Math.sqrt(normA)
  normB = Math.sqrt(normB)

  if (normA === 0 || normB === 0) {
    return 0
  }

  return dotProduct / (normA * normB)
}

/**
 * Enhance project descriptions using AI
 */
export async function enhanceProjectDescription(
  projectName: string,
  currentDescription: string,
  technologies: string[]
): Promise<string> {
  try {
    const prompt = `
Transform this project description into a compelling, professional STAR format description:

Current Project: ${projectName}
Existing Description: ${currentDescription}
Technologies Used: ${technologies.join(', ')}

Requirements:
- Use STAR methodology (Situation, Task, Action, Result)
- Start with a strong hook
- Highlight technical challenges solved
- Include quantifiable impacts where possible
- Keep it 150-200 words
- Focus on achievements and contributions
- Make it ATS-friendly with relevant keywords

Write an engaging project description that would impress recruiters and hiring managers.
`

    const result = await textModel.generateContent(prompt)
    return result.response.text().trim()

  } catch (error) {
    console.error('Error enhancing project description:', error)
    return currentDescription // Return original if AI fails
  }
}

/**
 * Generate career insights and recommendations
 */
export async function generateCareerInsights(
  userProfile: {
    currentRole: string
    experience: string[]
    skills: string[]
    interests: string[]
    goal: string
  }
): Promise<{
  insights: string[]
  skillGaps: string[]
  recommendedRoles: Array<{ title: string; match: number; reasoning: string }>
  nextSteps: string[]
}> {
  try {
    const prompt = `
Provide comprehensive career insights for this professional profile:

CURRENT PROFILE:
Role: ${userProfile.currentRole}
Experience: ${userProfile.experience.join('; ')}
Skills: ${userProfile.skills.join(', ')}
Interests: ${userProfile.interests.join(', ')}
Career Goal: ${userProfile.goal}

Analyze their career trajectory and provide detailed insights in JSON format:
{
  "insights": ["insight1", "insight2", "insight3", "insight4", "insight5"],
  "skillGaps": ["skill_gap1", "skill_gap2", "skill_gap3"],
  "recommendedRoles": [
    {
      "title": "Role Name",
      "match": 85 (percentage),
      "reasoning": "Why this role fits"
    },
    {
      "title": "Another Role",
      "match": 72,
      "reasoning": "Why this fits"
    }
  ],
  "nextSteps": ["action1", "action2", "action3", "action4", "action5"]
}

Make insights actionable and specific. Focus on realistic career progression.
`

    const result = await textModel.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    return {
      insights: analysis.insights || [],
      skillGaps: analysis.skillGaps || [],
      recommendedRoles: analysis.recommendedRoles || [],
      nextSteps: analysis.nextSteps || []
    }

  } catch (error) {
    console.error('Error generating career insights:', error)
    throw new Error('Failed to generate career insights. Please try again.')
  }
}

/**
 * Analyze code quality and provide suggestions
 */
export async function analyzeCodeReview(
  codeSnippet: string,
  language: string,
  context: string = 'general'
): Promise<{
  score: number
  strengths: string[]
  issues: Array<{ severity: string; message: string; suggestion: string }>
  bestPractices: string[]
  improvements: string[]
}> {
  try {
    const prompt = `
Perform a comprehensive code review for this ${language} code snippet:

CODE CONTEXT: ${context}
LANGUAGE: ${language}

CODE:
${codeSnippet}

Provide analysis in JSON format:
{
  "score": number (0-100 based on code quality),
  "strengths": ["strength1", "strength2"],
  "issues": [
    {
      "severity": "high|medium|low",
      "message": "Brief description of the issue",
      "suggestion": "Suggested improvement or fix"
    }
  ],
  "bestPractices": ["practice1", "practice2"],
  "improvements": ["specific code improvement 1", "improvement 2"]
}

Focus on:
- Code structure and organization
- Performance considerations
- Security best practices
- Readability and maintainability
- ${language}-specific best practices

Be constructive and specific in your feedback.
`

    const result = await textModel.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    return {
      score: Math.max(0, Math.min(100, analysis.score || 0)),
      strengths: analysis.strengths || [],
      issues: analysis.issues || [],
      bestPractices: analysis.bestPractices || [],
      improvements: analysis.improvements || []
    }

  } catch (error) {
    console.error('Error analyzing code:', error)
    throw new Error('Failed to analyze code. Please try again.')
  }
}
