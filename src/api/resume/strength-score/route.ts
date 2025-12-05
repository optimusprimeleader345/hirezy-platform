import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    // Use AI to analyze resume strength comprehensively
    const prompt = `
Analyze this resume for overall strength and quality. Provide a detailed assessment including:

RESUME CONTENT:
${resumeText}

Please evaluate the resume on multiple criteria and return a JSON response with:
{
  "score": number (0-100 based on overall resume quality),
  "grade": "Poor|Needs Work|Fair|Good|Very Good|Excellent",
  "strengths": ["3-5 specific strong points from the resume"],
  "weaknesses": ["3-5 areas that need improvement"],
  "suggestions": ["5-7 specific, actionable recommendations for improvement"],
  "breakdown": {
    "contentQuality": number (0-100),
    "atsReadiness": number (0-100),
    "presentation": number (0-100),
    "completeness": number (0-100),
    "impactStatements": number (0-100)
  },
  "keywordScore": number (0-100 for industry relevance)
}

Be specific and constructive in your feedback. Focus on real improvements that will help the candidate.
`

    const result = await textModel.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    // Ensure score is within bounds
    analysis.score = Math.max(0, Math.min(100, analysis.score || 50))

    // Generate grade based on score if not provided
    if (!analysis.grade) {
      if (analysis.score >= 90) analysis.grade = 'Excellent'
      else if (analysis.score >= 80) analysis.grade = 'Very Good'
      else if (analysis.score >= 70) analysis.grade = 'Good'
      else if (analysis.score >= 60) analysis.grade = 'Fair'
      else if (analysis.score >= 50) analysis.grade = 'Needs Work'
      else analysis.grade = 'Poor'
    }

    // Add fallback arrays if missing
    analysis.strengths = analysis.strengths || ['Well-structured content', 'Clear presentation']
    analysis.weaknesses = analysis.weaknesses || ['Could add more quantifiable achievements']
    analysis.suggestions = analysis.suggestions || ['Consider adding specific metrics to your achievements']

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Strength score API error:', error)
    // Fallback to a basic implementation if AI fails
    const wordCount = resumeText.split(' ').length
    const hasKeywords = /javascript|react|node\.js|python|aws|docker/i.test(resumeText)

    let score = 50
    if (wordCount > 400) score += 10
    if (hasKeywords) score += 10
    if (resumeText.includes('experience')) score += 5
    if (resumeText.includes('education')) score += 5

    return NextResponse.json({
      score: Math.max(0, Math.min(100, score)),
      grade: score >= 70 ? 'Good' : 'Needs Work',
      strengths: ['Basic structure present', 'Some technical skills mentioned'],
      weaknesses: ['Could add more specific achievements'],
      suggestions: ['Add quantifiable results to your experience'],
      breakdown: {
        contentQuality: score,
        atsReadiness: hasKeywords ? 60 : 40,
        presentation: 50,
        completeness: 50,
        impactStatements: 40
      },
      keywordScore: hasKeywords ? 65 : 40
    })
  }
}
