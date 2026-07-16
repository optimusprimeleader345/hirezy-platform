import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

export async function POST(request: NextRequest) {
  const { resumeText, jobTitle = 'Software Developer' } = await request.json()

  if (!resumeText || typeof resumeText !== 'string') {
    return NextResponse.json(
      { error: 'Resume text is required' },
      { status: 400 }
    )
  }

  try {

    // Use AI to analyze missing skills relevant to the job
    const prompt = `
Analyze this resume and identify missing skills and knowledge areas that would strengthen it for a ${jobTitle} position.

RESUME CONTENT:
${resumeText}

Please identify skills that are commonly required or beneficial for ${jobTitle} positions but appear to be missing from this resume.

Return analysis in JSON format:
{
  "missingSkills": [
    {
      "skill": "Skill name",
      "category": "Technical|Soft Skills|Tools|Domain Knowledge",
      "relevance": number (1-100, how relevant for ${jobTitle}),
      "marketDemand": "High|Medium|Low",
      "learnTime": "Quick (1-2 weeks)|Medium (1-3 months)|Long (3-6 months)|Ongoing",
      "whyImportant": "Brief explanation of why this skill matters"
    }
  ],
  "skillGaps": ["High-level gaps identified"],
  "learningPriorities": ["Skills that would have biggest impact, ordered by priority"],
  "recommendedAdditions": ["Specific suggestions for resume sections to add"],
  "certificationsToConsider": ["Relevant certifications that could help"]
}

Focus on realistic skills that would actually improve job prospects. Consider both technical skills and soft skills relevant to ${jobTitle}.
`

    const result = await textModel.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Missing skills API error:', error)
    // Fallback implementation
    const text = resumeText.toLowerCase()

    const commonSkills = [
      'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
      'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Microservices',
      'CI/CD', 'Git', 'Linux', 'System Design', 'Testing', 'Security', 'Communication', 'Teamwork'
    ]

    const missingSkills = commonSkills.filter(skill =>
      !text.includes(skill.toLowerCase())
    ).slice(0, 6).map((skill, index) => ({
      skill,
      category: index < 10 ? 'Technical' : 'Soft Skills',
      relevance: 90 - index * 5,
      marketDemand: index < 2 ? 'High' : index < 4 ? 'Medium' : 'Low',
      learnTime: index < 3 ? 'Medium (1-3 months)' : 'Long (3-6 months)',
      whyImportant: `${skill} is commonly required for software development roles.`
    }))

    return NextResponse.json({
      missingSkills,
      skillGaps: ['Could benefit from more cloud technologies', 'Testing skills could be highlighted'],
      learningPriorities: ['AWS Cloud Services', 'Docker/Kubernetes', 'System Design'],
      recommendedAdditions: [
        'Add a dedicated Skills section at the top',
        'Include specific versions of technologies used',
        'Mention soft skills and collaboration experience',
        'Add industry certifications if available'
      ],
      certificationsToConsider: ['AWS Certified Developer', 'Docker Certified Associate', 'Certified Scrum Master']
    })
  }
}
