import { NextRequest, NextResponse } from 'next/server'

interface SkillGapRequest {
  careerGoal: string
  userSkills?: string[]
}

interface SkillGapResponse {
  currentSkills: string[]
  requiredSkills: string[]
  gapScore: number
  missingSkills: string[]
  roadmap: Array<{
    phase: string
    skills: string[]
    timeline: string
    resources: string[]
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as SkillGapRequest
    const { careerGoal, userSkills = [] } = body

    if (!careerGoal || typeof careerGoal !== 'string') {
      return NextResponse.json(
        { error: 'Career goal is required' },
        { status: 400 }
      )
    }

    // Mock current skills based on typical portfolio
    const currentSkills = [
      'JavaScript', 'React', 'CSS', 'HTML', 'Git', 'Node.js', 'REST APIs',
      'TypeScript', 'Figma', 'Responsive Design', 'UI/UX Basics'
    ]

    let requiredSkills: string[] = []
    let gapScore: number = 0

    // Different skill requirements based on career goal
    switch (careerGoal.toLowerCase()) {
      case 'frontend developer':
      case 'react developer':
        requiredSkills = [
          'React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Git',
          'Webpack', 'Jest', 'Next.js', 'Tailwind CSS', 'Figma',
          'Responsive Design', 'Performance Optimization', 'GraphQL'
        ]
        gapScore = 25 // Current skills cover 75%
        break

      case 'full stack developer':
        requiredSkills = [
          'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL',
          'JavaScript', 'TypeScript', 'REST APIs', 'GraphQL', 'Docker',
          'AWS', 'Git', 'Testing', 'CI/CD', 'Security Best Practices'
        ]
        gapScore = 40 // Current skills cover 60%
        break

      case 'backend developer':
        requiredSkills = [
          'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB', 'Redis',
          'REST APIs', 'GraphQL', 'Microservices', 'Docker', 'Kubernetes',
          'AWS/Azure', 'Testing', 'Security', 'CI/CD'
        ]
        gapScore = 70 // Current skills cover 30%
        break

      case 'ui/ux designer':
        requiredSkills = [
          'Figma', 'Sketch', 'Adobe XD', 'Wireframing', 'Prototyping',
          'User Research', 'Usability Testing', 'CSS', 'JavaScript',
          'React', 'Design Systems', 'Typography', 'Color Theory',
          'Accessibility', 'Design Thinking'
        ]
        gapScore = 45 // Current skills cover 55%
        break

      default:
        requiredSkills = [
          'React', 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Node.js',
          'Git', 'REST APIs', 'Figma', 'UI/UX Design', 'Testing',
          'Performance', 'Security'
        ]
        gapScore = 35
    }

    const missingSkills = requiredSkills.filter(skill =>
      !currentSkills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase())
      )
    )

    const roadmap = [
      {
        phase: "Foundation (1-2 months)",
        skills: ["TypeScript", "Advanced CSS", "Git Workflow"],
        timeline: "4-8 weeks",
        resources: ["TypeScript Handbook", "CSS Grid Garden", "Git Documentation"]
      },
      {
        phase: "Core Development (2-4 months)",
        skills: ["React Advanced", "State Management", "Testing"],
        timeline: "8-16 weeks",
        resources: ["React Docs", "Redux Toolkit", "Testing Library"]
      },
      {
        phase: "Specialization (3-6 months)",
        skills: ["Performance Optimization", "Design Systems", "API Design"],
        timeline: "12-24 weeks",
        resources: ["Web.dev Performance", "Figma for Developers", "API Design Patterns"]
      },
      {
        phase: "Career Growth (6+ months)",
        skills: ["Leadership", "Architecture", "Team Collaboration"],
        timeline: "Continuous",
        resources: ["Technical Leadership Books", "System Design Interviews"]
      }
    ]

    const response: SkillGapResponse = {
      currentSkills,
      requiredSkills,
      gapScore,
      missingSkills,
      roadmap
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Skill Gap Analysis API Error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze skill gap' },
      { status: 500 }
    )
  }
}
