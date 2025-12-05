import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock AI-generated forecast data

    const mockForecast = {
      nextMonthPrediction: 87500.25,
      quarterlyGrowth: 18.5, // percentage
      riskScore: 2.4, // out of 10, lower is better
      recommendationText: 'Market conditions are favorable. Based on current growth trajectory and seasonal factors, next month shows strong potential. Consider expanding marketing budget by 15% to capitalize on expected high season growth. Risk assessment shows minimal volatility.'
    }

    return NextResponse.json({
      success: true,
      forecast: mockForecast
    })

  } catch (error) {
    console.error('Error fetching finance forecast:', error)
    return NextResponse.json(
      { error: 'Failed to load finance forecast' },
      { status: 500 }
    )
  }
}
