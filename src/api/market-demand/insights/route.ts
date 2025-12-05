import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const industry = url.searchParams.get('industry') || 'technology'
    const region = url.searchParams.get('region') || 'global'
    const timeframe = url.searchParams.get('timeframe') || '2024'

    // Generate real-time market insights using AI
    const prompt = `
Analyze the current market demand for tech skills and provide insights for ${industry} industry in ${region} for ${timeframe}.

Return analysis in JSON format with marketOverview, skillDemand, industryTrends, regionalInsights, careerAdvice, and predictions.
`

    const result = await textModel.generateContent(prompt)
    const insights = JSON.parse(result.response.text())

    return NextResponse.json({
      success: true,
      data: insights,
      timestamp: new Date().toISOString(),
      source: 'AI Market Intelligence',
      appliedFilters: { industry, region, timeframe }
    })
  } catch (error) {
    console.error('Market insights API error:', error)
    // Fallback response with basic insights if AI fails
    return NextResponse.json({
      success: true,
      data: {
        marketOverview: {
          growthRate: "+12.5%",
          totalJobOpenings: "5.8M+",
          hottestSkills: ["AI/ML", "Cloud Computing", "Cybersecurity"],
          emergingTechnologies: ["Blockchain", "Edge Computing"]
        },
        skillDemand: [],
        industryTrends: [],
        regionalInsights: {},
        careerAdvice: {},
        predictions: []
      },
      timestamp: new Date().toISOString(),
      source: 'AI Market Intelligence (fallback)',
      error: 'AI service temporarily unavailable'
    })
  }
}
