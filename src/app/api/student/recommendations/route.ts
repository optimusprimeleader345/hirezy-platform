import { NextRequest, NextResponse } from 'next/server'

interface GigRecommendation {
  id: number
  title: string
  matchPercentage: number
  salaryRange: string
  tags: string[]
  whyRecommended: string
  company: string
  location: string
  remote: boolean
}

export async function GET(request: NextRequest) {
  try {
    // Mock data - in real app this would come from AI matching algorithm
    const recommendations: GigRecommendation[] = [
      {
        id: 1,
        title: "Frontend Developer - React/TypeScript",
        matchPercentage: 95,
        salaryRange: "$60,000 - $80,000/year",
        tags: ["React", "TypeScript", "JavaScript", "CSS"],
        whyRecommended: "Based on your React and TypeScript experience, this role matches your skills perfectly. Your portfolio shows advanced UI/UX implementation.",
        company: "TechStart Inc.",
        location: "New York, NY",
        remote: true
      },
      {
        id: 2,
        title: "Full Stack Engineer - MERN Stack",
        matchPercentage: 88,
        salaryRange: "$70,000 - $90,000/year",
        tags: ["MongoDB", "Express.js", "React", "Node.js"],
        whyRecommended: "Your MERN stack experience aligns with this position. The role requires the exact technologies you've worked with recently.",
        company: "WebSolutions Corp",
        location: "San Francisco, CA",
        remote: false
      },
      {
        id: 3,
        title: "UI/UX Developer - Component Library",
        matchPercentage: 82,
        salaryRange: "$65,000 - $85,000/year",
        tags: ["React", "Design Systems", "Figma", "CSS-in-JS"],
        whyRecommended: "Your UI/UX skills and component library experience make you ideal for building scalable design systems.",
        company: "DesignFirst Agency",
        location: "Austin, TX",
        remote: true
      },
      {
        id: 4,
        title: "JavaScript Backend Developer",
        matchPercentage: 76,
        salaryRange: "$55,000 - $75,000/year",
        tags: ["Node.js", "Express.js", "REST APIs", "PostgreSQL"],
        whyRecommended: "Strong backend JavaScript experience qualifies you for this API development role.",
        company: "DataFlow Systems",
        location: "Boston, MA",
        remote: false
      }
    ]

    return NextResponse.json({
      recommendations,
      totalCount: recommendations.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    )
  }
}
