import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { currentSkills, jobDescription, marketSkills } = await request.json()

    if (!currentSkills || !Array.isArray(currentSkills)) {
      return NextResponse.json(
        { error: 'Current skills array is required' },
        { status: 400 }
      )
    }

    // Mock skill gap analysis
    const allMarketSkills = [
      'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
      'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'REST APIs', 'Microservices',
      'CI/CD', 'Git', 'Linux', 'System Design', 'Testing', 'Security',
      'React Native', 'CI/CD Pipelines', 'AWS Lambda'
    ]

    const missingSkills = allMarketSkills.filter(skill =>
      !currentSkills.some(currSkill =>
        currSkill.toLowerCase().includes(skill.toLowerCase())
      )
    )

    // Calculate score based on current skills breadth
    let score = Math.min(currentSkills.length * 5, 100)
    score = Math.max(score, 20) // Minimum 20

    // Generate gap score (0-100, 100 being perfect match)
    const gapScore = Math.max(0, 100 - Math.floor(missingSkills.length * 8))

    // Prioritize skills based on missing ones
    const prioritySkills = missingSkills.slice(0, 2)

    // Generate recommended skills (similar but different from missing)
    const recommendedSkills = [
      'REST APIs', 'Postman', 'Unit Testing', 'MongoDB',
      'GraphQL', 'System Design', 'Security', 'Linux'
    ].filter(skill => !currentSkills.includes(skill)).slice(0, 4)

    const difficultyLevel = gapScore > 70 ? 'Beginner' :
                           gapScore > 40 ? 'Intermediate' :
                           'Advanced'

    const analysis = currentSkills.length > 5 ?
      "You have strong technical fundamentals but need specialized skills for advanced roles. Focus on cloud and DevOps technologies." :
      "You have a solid foundation. Focus on expanding your skills in high-demand areas like cloud computing and modern development practices."

    const result = {
      gapScore,
      missingSkills: missingSkills.slice(0, 4),
      recommendedSkills,
      difficultyLevel,
      prioritySkills,
      analysis
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Skill gap analysis API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze skill gap' },
      { status: 500 }
    )
  }
}
