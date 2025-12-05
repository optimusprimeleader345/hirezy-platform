import { NextRequest, NextResponse } from 'next/server'
import { opportunityInsights } from '@/lib/ai/market-demand/mockData'

export async function GET(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: opportunityInsights,
      timestamp: new Date().toISOString(),
      source: 'AI Market Intelligence'
    })
  } catch (error) {
    console.error('Market insights API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market insights' },
      { status: 500 }
    )
  }
}
