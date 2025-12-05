import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { skills, experienceLevel, goal, resumeText } = await request.json()

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: 'Skills array is required' }, { status: 400 })
    }

    // Mock AI career path analysis
    const coreTechSkills = skills.filter(skill =>
      ['javascript', 'react', 'node.js', 'python', 'typescript', 'sql'].includes(skill.toLowerCase())
    )

    const hasFrontendSkills = skills.some(skill =>
      ['react', 'javascript', 'html', 'css', 'typescript'].includes(skill.toLowerCase())
    )

    const hasBackendSkills = skills.some(skill =>
      ['node.js', 'python', 'sql', 'linux', 'docker'].includes(skill.toLowerCase())
    )

    const experienceMultiplier = experienceLevel === 'beginner' ? 0.6 :
                                 experienceLevel === 'intermediate' ? 1.0 :
                                 1.4

    // Determine best fit roles
    const bestFitRoles = []
    if (hasFrontendSkills && hasBackendSkills) {
      bestFitRoles.push('Fullstack Developer', 'Technical Lead')
    } else if (hasFrontendSkills) {
      bestFitRoles.push('Frontend Developer', 'React Specialist', 'UI Engineer')
    } else if (hasBackendSkills) {
      bestFitRoles.push('Backend Developer', 'DevOps Engineer', 'API Developer')
    } else {
      bestFitRoles.push('Junior Developer', 'Software Engineer', 'Fullstack Developer')
    }

    // Calculate salary range
    const baseSalary = coreTechSkills.length * 50000 * experienceMultiplier
    const salaryRange = `${Math.round(baseSalary * 0.8 / 100000)} LPA – ${Math.round(baseSalary * 1.2 / 100000)} LPA`

    // Industry analysis
    const industryDemand = coreTechSkills.length > 3 ? 'High' : coreTechSkills.length > 1 ? 'Medium' : 'Medium'
    const futureGrowth = 'Strong'

    // Skill analysis
    const requiredSkills = [
      'React', 'Node.js', 'APIs', 'Git', 'JavaScript', 'TypeScript',
      'Testing', 'Database Design', 'System Architecture', 'CI/CD'
    ]

    const coreSkillsNeeded = requiredSkills.filter(skill =>
      !skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    ).slice(0, 6)

    const missingSkills = requiredSkills.filter(skill =>
      !skills.some(userSkill => userSkill.toLowerCase().includes(skill.toLowerCase()))
    ).slice(6, 10)

    const difficultyLevel = experienceLevel === 'beginner' ? 'Beginner to Medium' : 'Medium'

    // AI summary generation
    const aiSummary = `Based on your ${skills.length}-skill profile (${experienceLevel} level) and goal to become a ${goal || 'professional developer'}, ${bestFitRoles.join(' or ')} are excellent matches. With ${industryDemand.toLowerCase()} industry demand and ${futureGrowth.toLowerCase()} growth potential, you'll earn ${salaryRange}. Focus on ${missingSkills.slice(0, 2).join(' and ')} to bridge your skill gaps and accelerate your career progression.`

    const result = {
      bestFitRoles,
      salaryRange,
      industryDemand,
      futureGrowth,
      coreSkillsNeeded,
      missingSkills,
      difficultyLevel,
      aiSummary
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Career path analysis API error:', error)
    return NextResponse.json({ error: 'Failed to analyze career path' }, { status: 500 })
  }
}
