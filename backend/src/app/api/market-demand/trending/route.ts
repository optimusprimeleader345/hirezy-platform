import { NextRequest, NextResponse } from 'next/server'
import { trendingSkills } from '@/lib/ai/market-demand/mockData'

export async function GET(request: NextRequest) {
  try {
    // Simulate processing time for market analysis
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: trendingSkills,
      lastUpdated: new Date().toISOString(),
      totalAnalyzed: trendingSkills.reduce((sum, skill) => sum + skill.jobs, 0),
      source: 'Market Intelligence AI'
    })
  } catch (error) {
    console.error('Market demand trending API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending skills data' },
      { status: 500 }
    )
  }
}
