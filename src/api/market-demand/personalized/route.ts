import { NextRequest, NextResponse } from 'next/server'
import { getPersonalizedAlerts, getSkillBasedRecommendations } from '@/lib/ai/market-demand/mockStudentProfile'

export async function GET(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 400))

    const alerts = getPersonalizedAlerts()
    const recommendations = getSkillBasedRecommendations()

    return NextResponse.json({
      success: true,
      data: {
        alerts,
        recommendations,
        summary: {
          criticalSkillsNeedAttention: alerts.filter(a => a.urgency === 'Critical').length,
          totalLearningTime: alerts.reduce((sum, alert) => sum + parseInt(alert.timeToLearn.replace(/[^0-9]/g, '')), 0),
          averageSalaryPremium: alerts.reduce((sum, alert) => sum + parseInt(alert.potentialSalaryIncrease), 0) / alerts.length
        }
      },
      lastUpdated: new Date().toISOString(),
      source: 'Personalized Market Intelligence'
    })
  } catch (error) {
    console.error('Personalized market data API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch personalized data' },
      { status: 500 }
    )
  }
}
