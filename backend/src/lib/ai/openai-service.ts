import OpenAI from 'openai'

// Lazy initialization - only create client when needed
let openai: OpenAI | null = null

function getOpenAIClient(): OpenAI {
  if (!openai) {
    // Only check environment variable on server side
    if (typeof window === 'undefined') {
      const apiKey = process.env.OPENAI_API_KEY
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not configured. Please add your OpenAI API key to your environment variables.')
      }
      openai = new OpenAI({ apiKey })
    } else {
      throw new Error('OpenAI API is not available on client side. Please configure server-side API key.')
    }
  }
  return openai
}

export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    portfolio: string
  }
  skills: string[]
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  education: Array<{
    degree: string
    school: string
    year: string
  }>
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
}

export interface ATSResult {
  score: number
  keywords: string[]
  suggestions: string[]
  strengths: string[]
  weaknesses: string[]
  optimizedContent?: string
}

/**
 * Generate a professional resume from user profile data
 */
export async function generateResumeFromProfile(
  profileData: ResumeData,
  jobTitle?: string,
  tone: 'professional' | 'creative' | 'concise' = 'professional'
): Promise<string> {
  const systemPrompt = `You are a professional resume writer with 10+ years of experience.
Create a ATS-friendly resume in markdown format. Focus on quantifiable achievements,
relevant keywords, and compelling action verbs. Keep it to 1 page worth of content.`

  const userPrompt = `
Create a professional resume with these details:
Tone: ${tone}
Target Job: ${jobTitle || 'Software Developer'}

Profile Data:
${JSON.stringify(profileData, null, 2)}

Requirements:
- Resume should be 1 page (approximately 600-800 words)
- Start with professional summary
- Use bullet points with action verbs
- Include quantifiable achievements where possible
- Format in clean markdown
- Optimize for ATS with relevant keywords
- Keep education, experience in reverse chronological order

Focus on: skills, experience, projects, education.
`

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating resume:', error)
    throw new Error('Failed to generate resume. Please try again.')
  }
}

/**
 * Optimize existing resume for ATS compatibility
 */
export async function optimizeResumeATS(
  resumeContent: string,
  jobDescription?: string
): Promise<ATSResult> {
  const analysisPrompt = `
Analyze this resume for ATS compatibility and overall effectiveness:

RESUME CONTENT:
${resumeContent}

${jobDescription ? `TARGET JOB DESCRIPTION:
${jobDescription}

` : ''}
Provide a comprehensive analysis in JSON format with these fields:
{
  "score": number (0-100),
  "keywords": array of important keywords found,
  "suggestions": array of specific improvement suggestions,
  "strengths": array of resume strengths,
  "weaknesses": array of areas needing improvement,
  "optimizedContent": improved version of the resume (enhanced content and ATS optimization)
}

Be specific, actionable, and constructive. Focus on:
- Keyword optimization for ATS
- Content structure and readability
- Quantifiable achievements
- Relevant skills placement
- Professional language usage
`

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert ATS optimization consultant and career coach. Provide detailed, actionable feedback." },
        { role: "user", content: analysisPrompt }
      ],
      temperature: 0.3,
      max_tokens: 3000,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      score: Math.max(0, Math.min(100, result.score || 0)),
      keywords: result.keywords || [],
      suggestions: result.suggestions || [],
      strengths: result.strengths || [],
      weaknesses: result.weaknesses || [],
      optimizedContent: result.optimizedContent
    }
  } catch (error) {
    console.error('Error analyzing resume:', error)
    throw new Error('Failed to analyze resume. Please try again.')
  }
}

/**
 * Generate a personalized cover letter
 */
export async function generateCoverLetter(
  resumeData: Partial<ResumeData>,
  jobDescription: string,
  companyName: string,
  tone: 'professional' | 'enthusiastic' | 'confident' = 'professional'
): Promise<string> {
  const toneGuidelines = {
    professional: 'formal, polished, business-appropriate language',
    enthusiastic: 'energetic, passionate, highly motivated tone',
    confident: 'self-assured, authoritative, expert positioning'
  }

  const systemPrompt = `You are a professional cover letter writer. Create compelling, personalized cover letters that highlight relevant experience and enthusiasm for the role. Use ${toneGuidelines[tone]} throughout.`

  const userPrompt = `
Write a compelling cover letter for this position:

JOB DESCRIPTION:
${jobDescription}

COMPANY: ${companyName}

APPLICANT BACKGROUND:
${JSON.stringify(resumeData, null, 2)}

Requirements:
- 3-4 paragraphs (250-350 words)
- Start with how you learned about the position
- Second paragraph: Highlight 2-3 key achievements relevant to the role
- Third paragraph: Explain why you're interested in the company
- End with call to action and contact information
- Use ${toneGuidelines[tone]}
- Avoid generic phrases
- Proofread for professional language

Make it specific to the job and company!
`

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.8,
      max_tokens: 1000
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating cover letter:', error)
    throw new Error('Failed to generate cover letter. Please try again.')
  }
}

/**
 * Analyze job requirements and suggest resume improvements
 */
export async function analyzeJobFit(
  resumeContent: string,
  jobDescription: string
): Promise<{
  matchScore: number
  missingSkills: string[]
  keyStrengths: string[]
  recommendedImprovements: string[]
}> {
  const analysisPrompt = `
Compare this resume to the job requirements and provide detailed fit analysis:

RESUME CONTENT:
${resumeContent}

JOB REQUIREMENTS:
${jobDescription}

Provide analysis in JSON format:
{
  "matchScore": number (0-100 based on skills/experience alignment),
  "missingSkills": array of skills mentioned in job but not demonstrated in resume,
  "keyStrengths": array of resume elements that strongly match job needs,
  "recommendedImprovements": array of specific suggestions to improve job fit
}

Be specific and actionable in your recommendations.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert recruitment consultant specializing in job-candidate matching." },
        { role: "user", content: analysisPrompt }
      ],
      temperature: 0.2,
      max_tokens: 1500,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      matchScore: Math.max(0, Math.min(100, result.matchScore || 0)),
      missingSkills: result.missingSkills || [],
      keyStrengths: result.keyStrengths || [],
      recommendedImprovements: result.recommendedImprovements || []
    }
  } catch (error) {
    console.error('Error analyzing job fit:', error)
    throw new Error('Failed to analyze job fit. Please try again.')
  }
}

/**
 * Generate interview preparation questions and answers
 */
export async function generateInterviewPrep(
  jobTitle: string,
  jobDescription: string,
  userBackground?: string
): Promise<{
  technicalQuestions: Array<{ question: string; suggestedAnswer: string; difficulty: string }>
  behavioralQuestions: Array<{ question: string; suggestedAnswer: string; difficulty: string }>
  tips: string[]
}> {
  const prepPrompt = `
Generate comprehensive interview preparation for this position:

JOB TITLE: ${jobTitle}
JOB DESCRIPTION: ${jobDescription}
${userBackground ? `CANDIDATE BACKGROUND: ${userBackground}` : ''}

Provide in JSON format:
{
  "technicalQuestions": array of 5 objects with:
    - question: string
    - suggestedAnswer: detailed answer (2-3 paragraphs)
    - difficulty: "easy" | "medium" | "hard"

  "behavioralQuestions": array of 5 objects with same structure,

  "tips": array of 8-10 general interview tips specific to this role
}

Questions should be realistic for this job level and industry. Answers should be specific and use STAR method where appropriate.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a senior technical interviewer and career coach. Create realistic interview questions with detailed, helpful answers." },
        { role: "user", content: prepPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      technicalQuestions: result.technicalQuestions || [],
      behavioralQuestions: result.behavioralQuestions || [],
      tips: result.tips || []
    }
  } catch (error) {
    console.error('Error generating interview prep:', error)
    throw new Error('Failed to generate interview preparation. Please try again.')
  }
}

/**
 * Generate personalized interview questions for specific job
 */
export async function generateInterviewQuestions(
  jobTitle: string,
  jobDescription: string,
  experienceLevel: 'entry' | 'mid' | 'senior' = 'mid'
): Promise<{
  technical: Array<{ question: string; category: string; difficulty: string; expectedAnswer: string }>,
  behavioral: Array<{ question: string; category: string; difficulty: string; expectedAnswer: string }>,
  situational: Array<{ question: string; category: string; difficulty: string; expectedAnswer: string }>
}> {
  const levelMap = {
    entry: 'junior developer or entry-level candidate',
    mid: 'mid-level developer with 2-5 years experience',
    senior: 'senior developer or tech lead with 5+ years experience'
  }

  const prompt = `
Generate comprehensive interview questions for a ${levelMap[experienceLevel]} applying for a ${jobTitle} position.

JOB DESCRIPTION:
${jobDescription}

Create 8 total interview questions:
- 3 Technical questions specific to ${jobTitle} technologies and skills
- 3 Behavioral questions using STAR method
- 2 Situational questions for problem-solving scenarios

Each question must include:
- question: The actual interview question
- category: Skill area it tests (e.g., "React", "Leadership", "Problem Solving")
- difficulty: "easy", "medium", or "hard"
- expectedAnswer: Strong sample answer using STAR method (200-300 words)

Questions should be challenging but appropriate for the role level.

Format as JSON:
{
  "technical": [...],
  "behavioral": [...],
  "situational": [...]
}
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a senior technical interviewer. Create realistic, role-appropriate interview questions with detailed sample answers." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      technical: result.technical || [],
      behavioral: result.behavioral || [],
      situational: result.situational || []
    }
  } catch (error) {
    console.error('Error generating interview questions:', error)
    throw new Error('Failed to generate interview questions. Please try again.')
  }
}

/**
 * Analyze interview answer and provide detailed feedback
 */
export async function analyzeInterviewAnswer(
  question: string,
  userAnswer: string,
  jobTitle: string,
  expectedAnswer?: string
): Promise<{
  score: number,
  rating: 'poor' | 'fair' | 'good' | 'excellent',
  strengths: string[],
  improvements: string[],
  suggestions: string[],
  betterAnswer: string
}> {
  const prompt = `
Analyze this interview response for a ${jobTitle} position interview:

QUESTION: "${question}"

CANDIDATE'S ANSWER:
${userAnswer}

${expectedAnswer ? `EXAMPLE STRONG ANSWER: ${expectedAnswer}` : ''}

Provide detailed feedback in JSON format:
{
  "score": number (0-100),
  "rating": "poor|fair|good|excellent",
  "strengths": ["2-3 specific strong points, be concrete"],
  "improvements": ["2-3 areas needing improvement, be specific"],
  "suggestions": ["3-4 actionable tips for better answers"],
  "betterAnswer": "Rewritten version of their answer using STAR method, 200-300 words"
}

Evaluate based on:
- Content relevance and completeness
- STAR method usage (Situation, Task, Action, Result)
- Specificity and concrete examples
- Communication clarity
- Technical accuracy for ${jobTitle}
- Measurable results/impact

Be constructive, specific, and encouraging.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert interview coach. Provide detailed, constructive feedback on interview answers." },
        { role: "user", content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 2500,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      score: Math.max(0, Math.min(100, result.score || 0)),
      rating: result.rating || 'fair',
      strengths: result.strengths || [],
      improvements: result.improvements || [],
      suggestions: result.suggestions || [],
      betterAnswer: result.betterAnswer || 'Good answer! Focus on using specific examples.'
    }
  } catch (error) {
    console.error('Error analyzing interview answer:', error)
    throw new Error('Failed to analyze interview answer. Please try again.')
  }
}

/**
 * Generate company-specific interview preparation
 */
export async function generateCompanyInterviewTips(
  companyName: string,
  jobTitle: string
): Promise<{
  research: string[],
  preparation: string[],
  questions: string[],
  avoid: string[],
  strategies: string[]
}> {
  const prompt = `
Create comprehensive interview preparation guide for ${companyName} - ${jobTitle} position.

Provide detailed tips in JSON format:
{
  "research": ["3-4 key things to research about ${companyName} before interview"],
  "preparation": ["5 specific preparation steps for a ${jobTitle} role"],
  "questions": ["4-5 likely interview questions for this role at ${companyName}"],
  "avoid": ["3-4 common mistakes to avoid in ${companyName} interviews"],
  "strategies": ["4-5 success strategies specific to ${companyName}'s interview process"]
}

Be specific to ${companyName} as a tech company and focus on realistic, actionable advice for ${jobTitle} candidates.
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert career coach specializing in tech company interview preparation." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return {
      research: result.research || [],
      preparation: result.preparation || [],
      questions: result.questions || [],
      avoid: result.avoid || [],
      strategies: result.strategies || []
    }
  } catch (error) {
    console.error('Error generating company tips:', error)
    throw new Error('Failed to generate company interview tips. Please try again.')
  }
}
