import { NextRequest, NextResponse } from 'next/server'
import { mockGigs } from '@/lib/gigs/mockData'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gigId, experience, region, urgency } = body

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

    // AI-powered pricing analysis based on multiple factors
    const baseRate = getBaseRate(gig.experience, gig.category)
    const regionMultiplier = getRegionMultiplier(region || 'global')
    const urgencyMultiplier = getUrgencyMultiplier(urgency || 'normal')
    const complexityMultiplier = getComplexityMultiplier(gig.category, gig.skills.length)

    const hourlyRate = Math.round(baseRate * regionMultiplier * urgencyMultiplier * complexityMultiplier)

    // Fixed pricing suggestion for project-based gigs
    const fixedBid = calculateFixedBid(hourlyRate, gig.duration, gig.category)

    // Market analysis
    const marketData = analyzeMarketPricing(gig.category, gig.experience)
    const confidence = calculateConfidence(gig.category, gig.skills.length)

    const response = {
      hourlyRate,
      fixedBid: gig.duration !== 'Ongoing' ? fixedBid : null,
      marketRate: marketData.averageRate,
      marketRange: `${marketData.low} - ${marketData.high}`,
      confidence,
      reasoning: generatePricingReasoning(hourlyRate, marketData, confidence, gig),
      factors: {
        baseRate: `$${baseRate}/hr (${gig.experience} ${gig.category})`,
        region: `${regionMultiplier > 1 ? '+' + Math.round((regionMultiplier - 1) * 100) + '%' : '-' + Math.round((1 - regionMultiplier) * 100) + '%'} from global average (${region || 'global'})`,
        urgency: urgencyMultiplier > 1 ? `${Math.round((urgencyMultiplier - 1) * 100)}% premium` : 'Standard rate',
        complexity: `${Math.round((complexityMultiplier - 1) * 100)}% adjustment for skill requirements`
      },
      alternatives: {
        budgetFriendly: Math.round(hourlyRate * 0.8),
        premiumService: Math.round(hourlyRate * 1.3),
        packageDeal: gig.duration !== 'Ongoing' ? Math.round(fixedBid * 1.15) : null
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Pricing API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate pricing recommendations' },
      { status: 500 }
    )
  }
}

// Helper functions for pricing calculations
function getBaseRate(experience: string, category: string): number {
  const baseRates: Record<string, number> = {
    'Entry Level': 25,
    'Mid-Level': 45,
    'Senior': 75,
    'Lead/Principal': 120
  }

  const categoryMultipliers: Record<string, number> = {
    'Full Stack Development': 1.0,
    'Frontend Development': 0.9,
    'Backend Development': 0.95,
    'Mobile Development': 1.1,
    'Data Engineering': 1.2,
    'Machine Learning': 1.4,
    'DevOps': 1.1,
    'Design': 0.8,
    'Security': 1.3,
    'Quality Assurance': 0.9
  }

  return Math.round(baseRates[experience] * (categoryMultipliers[category] || 1.0))
}

function getRegionMultiplier(region: string): number {
  const regionMultipliers: Record<string, number> = {
    'global': 1.0,
    'us': 1.1,
    'uk': 1.05,
    'eu': 1.0,
    'asia': 0.8,
    'india': 0.6,
    'australia': 1.0
  }

  return regionMultipliers[region] || 1.0
}

function getUrgencyMultiplier(urgency: string): number {
  const urgencyMultipliers: Record<string, number> = {
    'normal': 1.0,
    'asap': 1.2,
    'week': 1.1,
    'month': 0.95
  }

  return urgencyMultipliers[urgency] || 1.0
}

function getComplexityMultiplier(category: string, skillsCount: number): number {
  const categoryComplexity: Record<string, number> = {
    'Full Stack Development': 1.0,
    'Frontend Development': 0.9,
    'Backend Development': 1.0,
    'Mobile Development': 1.1,
    'Data Engineering': 1.2,
    'Machine Learning': 1.4,
    'DevOps': 1.2,
    'Design': 0.8,
    'Security': 1.3,
    'Quality Assurance': 0.95
  }

  const skillsMultiplier = 1 + (skillsCount - 5) * 0.05 // 5% more per additional skill
  return categoryComplexity[category] * Math.min(skillsMultiplier, 1.5)
}

function calculateFixedBid(hourlyRate: number, duration: string, category: string): number {
  // Estimate hours based on duration
  let estimatedHours = 40 // default weekly

  if (duration.includes('week')) {
    estimatedHours = parseInt(duration) * 40
  } else if (duration.includes('month')) {
    estimatedHours = parseInt(duration) * 160 // 40 hours/week * 4 weeks
  } else if (duration === 'Long-term' || duration === 'Ongoing') {
    estimatedHours = 640 // ~6 months
  }

  // Adjust for project type
  const projectTypeMultiplier = category.includes('Development') ? 1.0 :
                                 category.includes('ML') || category.includes('Security') ? 1.3 : 0.9

  return Math.round(hourlyRate * estimatedHours * projectTypeMultiplier)
}

function analyzeMarketPricing(category: string, experience: string): {
  low: number, average: number, high: number, averageRate: string
} {
  const baseAverage = getBaseRate(experience, category)
  const variation = baseAverage * 0.3 // 30% variation

  return {
    low: Math.round(baseAverage - variation),
    average: baseAverage,
    high: Math.round(baseAverage + variation),
    averageRate: `$${baseAverage}/hr average market rate`
  }
}

function calculateConfidence(category: string, skillsCount: number): 'Low' | 'Medium' | 'High' {
  if (category === 'Machine Learning' || skillsCount >= 8) return 'High'
  if (skillsCount >= 5) return 'Medium'
  return 'Low'
}

function generatePricingReasoning(
  hourlyRate: number,
  marketData: any,
  confidence: string,
  gig: any
): string {
  const position = hourlyRate > marketData.average ? 'above' : hourlyRate < marketData.average ? 'below' : 'at'

  return `Pricing suggestion of $${hourlyRate}/hour is ${position} market average ($${marketData.average}/hr) with ${confidence} confidence. This reflects your ${gig.experience.toLowerCase()} experience in ${gig.category.toLowerCase()} and ${gig.skills.length} relevant skills. The rate balances competitiveness with premium service quality for complex technical requirements.`
}
