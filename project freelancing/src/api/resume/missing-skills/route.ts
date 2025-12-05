import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    // Mock skill gap analysis
    const text = resumeText.toLowerCase()

    // Generate mock missing skills based on common developer skills
    const allSkills = [
      'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
      'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Microservices',
      'CI/CD', 'Git', 'Linux', 'System Design', 'Testing', 'Security'
    ]

    const presentSkills = allSkills.filter(skill =>
      text.includes(skill.toLowerCase())
    )

    const missingSkills = allSkills.filter(skill =>
      !text.includes(skill.toLowerCase())
    )

    // Create skill analysis with relevance scores
    const missingSkillData = missingSkills.slice(0, 6).map((skill, index) => ({
      skill,
      relevance: 85 - index * 10 + Math.floor(Math.random() * 10),
      marketDemand: index < 3 ? 'High' : index < 5 ? 'Medium' : 'Low',
      learnTime: index < 2 ? '2-4 weeks' : index < 4 ? '1-2 months' : '3-6 months'
    }))

    const recommendedAdditions = [
      'Add a dedicated Skills section at the top',
      'Include specific versions of technologies (React 16+, Node.js 14+)',
      'Mention soft skills like communication and teamwork',
      'Add industry certifications if available',
      'Include relevant tools and frameworks'
    ]

    const result = {
      missingSkills: missingSkillData,
      recommendedAdditions
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Missing skills API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze missing skills' },
      { status: 500 }
    )
  }
}
