import { NextRequest, NextResponse } from 'next/server'
import { mockGigs, type Gig } from '@/lib/gigs/mockData'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gigId } = body

    if (!gigId || typeof gigId !== 'number') {
      return NextResponse.json(
        { error: 'Gig ID is required' },
        { status: 400 }
      )
    }

    const gig = mockGigs.find(g => g.id === gigId)

    if (!gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      )
    }

    // Mock AI analysis based on gig characteristics
    const score = gig.matchScore || Math.floor(Math.random() * 40) + 60 // 60-100 range

    const strengths = [
      "Strong portfolio alignment with project requirements",
      "Relevant experience in key technologies mentioned",
      "Previous similar project completions match perfectly"
    ]

    const weaknesses = [
      "Limited exposure to project management tools used",
      "Could enhance portfolio with more recent examples"
    ]

    const analysis = `Based on your current skills (${gig.skills.slice(0, 3).join(', ')}) and experience level (${gig.experience}), you have a ${score > 80 ? 'excellent' : score > 70 ? 'good' : 'moderate'} chance of success. Your background strongly matches ${(gig.requirements?.length || 3) - 2} out of ${(gig.requirements?.length || 3)} key requirements. Consider highlighting these strengths in your proposal: ${gig.skills.slice(0, 2).join(', ')}.`

    const response = {
      score,
      strengths: strengths.slice(0, Math.min(3, score / 30)),
      weaknesses: weaknesses.slice(0, Math.max(0, 3 - Math.floor(score / 30))),
      analysis,
      factors: [
        { name: "Skills Match", weight: 40, score: gig.matchScore || 80 },
        { name: "Experience Level", weight: 30, score: gig.experience === "Senior" ? 95 : gig.experience === "Mid-Level" ? 75 : 55 },
        { name: "Portfolio Relevance", weight: 20, score: Math.min(95, (gig.totalBidders || 15) * -1 + 100) },
        { name: "Location Match", weight: 10, score: gig.type === "Remote" ? 95 : 75 }
      ]
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Success Predictor API Error:', error)
    return NextResponse.json(
      { error: 'Failed to predict success' },
      { status: 500 }
    )
  }
}
