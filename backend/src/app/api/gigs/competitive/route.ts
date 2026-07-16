import { NextRequest, NextResponse } from 'next/server'
import { mockGigs } from '@/lib/gigs/mockData'

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

    const totalBidders = gig.totalBidders || 15
    const rank = gig.matchScore ? Math.max(1, Math.min(totalBidders, Math.floor(totalBidders * (100 - gig.matchScore) / 100))) : Math.floor(Math.random() * totalBidders) + 1

    // Mock skill distribution across bidders
    const skillDistribution = {
      "React": { count: totalBidders * 0.8, percentage: 80 },
      "TypeScript": { count: totalBidders * 0.6, percentage: 60 },
      "Node.js": { count: totalBidders * 0.5, percentage: 50 },
      "MongoDB": { count: totalBidders * 0.3, percentage: 30 },
      "AWS": { count: totalBidders * 0.3, percentage: 30 },
      "GraphQL": { count: totalBidders * 0.2, percentage: 20 },
      "Docker": { count: totalBidders * 0.25, percentage: 25 },
      "Jest": { count: totalBidders * 0.35, percentage: 35 }
    }

    // Generate recommendations based on gig requirements and competition
    const recommendations = []

    const userScore = gig.matchScore || 85

    if (rank <= totalBidders * 0.2) {
      recommendations.push({
        type: "success",
        icon: "✅",
        text: `You're ranked top ${(rank/totalBidders*100).toFixed(0)}%! Strong position with ${(userScore >= 85 ? 'excellent' : 'strong')} match score of ${userScore}%`
      })
    } else if (rank <= totalBidders * 0.5) {
      recommendations.push({
        type: "warning",
        icon: "⚠️",
        text: `You're ranked ${rank}/${totalBidders}. Boost your bid by emphasizing your ${gig.experience.toLowerCase()} experience`
      })
    } else {
      recommendations.push({
        type: "danger",
        icon: "🔴",
        text: `High competition - only top ${(totalBidders * 0.3).toFixed(0)} bidders typically win. Consider premium pricing`
      })
    }

    // Additional personalized recommendations
    if (gig.type === 'Remote') {
      recommendations.push({
        type: "info",
        icon: "🏠",
        text: "Highlight remote work experience - client prefers distributed team"
      })
    }

    if (gig.category === 'Full Stack Development') {
      recommendations.push({
        type: "info",
        icon: "⚡",
        text: `Only ${(skillDistribution['React'].count/totalBidders*100).toFixed(0)}% of bidders have React experience - emphasize this strength`
      })
    }

    // Pricing recommendations
    const salaryMatches = gig.salary.match(/\$(\d{1,3}(?:,\d{3})*)/g)
    const suggestedPrice = salaryMatches ? Math.ceil(parseInt(salaryMatches[0].replace(/[$,]/g, '')) / totalBidders) : 75

    recommendations.push({
      type: "info",
      icon: "💰",
      text: `Suggested rate: $${suggestedPrice}/hr based on ${(totalBidders-1)} other bidders and project complexity`
    })

    const response = {
      totalBidders,
      rank,
      rankPercentage: (rank / totalBidders * 100).toFixed(1),
      skillDistribution,
      recommendations: recommendations.slice(0, 4), // Limit to 4 recommendations
      marketInsights: {
        averageBidders: 18,
        competitionLevel: totalBidders > 20 ? 'High' : totalBidders > 10 ? 'Medium' : 'Low',
        winRateForYourRank: rank <= totalBidders * 0.3 ? '55%' : rank <= totalBidders * 0.6 ? '25%' : '<10%',
        similarGigs: {
          count: Math.floor(Math.random() * 12) + 3,
          averageWinRate: '32%'
        }
      },
      biddingStrategy: {
        priceRange: {
          minimum: Math.max(25, suggestedPrice - 15),
          optimal: suggestedPrice,
          maximum: suggestedPrice + 25
        },
        keyDifferentiators: gig.skills.slice(0, 3)
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Competitive Analysis API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate competitive insights' },
      { status: 500 }
    )
  }
}
