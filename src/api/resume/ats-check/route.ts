import { NextRequest, NextResponse } from 'next/server'
import { optimizeResumeATS } from '@/lib/ai/openai-service'

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json()

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    // Use AI-powered ATS optimization
    const atsResult = await optimizeResumeATS(resumeText, jobDescription)

    // Calculate additional metrics for checklist
    const text = resumeText.toLowerCase()
    const wordCount = resumeText.split(' ').length

    // Keyword density analysis
    const keywordChecks = ['javascript', 'python', 'java', 'c++', 'react', 'node.js', 'aws', 'docker']
    const keywordsFound = keywordChecks.filter(keyword =>
      text.includes(keyword.toLowerCase())
    ).length

    // Format checks (ATS prefers plain text)
    const hasSpecialChars = /[^\w\s\-\.@,\/\(\)\n]/.test(resumeText)

    const checklist = {
      keywordDensity: keywordsFound >= keywordChecks.length * 0.5,
      formatting: !hasSpecialChars,
      contactInfo: resumeText.includes('@'),
      fileFormat: true,
      length: wordCount > 200 && wordCount < 800
    }

    // Issues summary
    const issueCount = Object.values(checklist).filter(v => !v).length
    const issues = {
      critical: issueCount > 2 ? 1 : 0,
      warnings: issueCount,
      info: Math.max(0, 3 - issueCount)
    }

    const result = {
      score: atsResult.score,
      issues,
      checklist,
      optimizationTips: atsResult.suggestions.concat(atsResult.suggestions.length < 5 ? [
        'Include more job-specific keywords (e.g., React, Node.js, AWS)',
        'Remove special characters and complex formatting',
        'Ensure contact information is at the top',
        'Keep resume length between 400-600 words',
        'Use standard section headers (Experience, Education, Skills)',
        'Quantify achievements with numbers and percentages',
        'Match company language from job description'
      ].slice(atsResult.suggestions.length) : []),
      keywords: atsResult.keywords,
      strengths: atsResult.strengths,
      weaknesses: atsResult.weaknesses,
      optimizedContent: atsResult.optimizedContent
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('ATS check API error:', error)
    return NextResponse.json(
      { error: 'Failed to check ATS compatibility' },
      { status: 500 }
    )
  }
}
