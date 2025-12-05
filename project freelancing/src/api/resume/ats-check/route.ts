import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    // Mock ATS analysis
    const text = resumeText.toLowerCase()

    // Check for various formatting and keyword issues
    const keywordChecks = ['javascript', 'python', 'java', 'c++', 'react', 'node.js', 'aws', 'docker']
    const keywordsFound = keywordChecks.filter(keyword =>
      text.includes(keyword.toLowerCase())
    ).length

    let score = 70 // base score

    // Keywords factor (major ATS criteria)
    if (keywordsFound > 6) score += 20
    else if (keywordsFound > 4) score += 15
    else if (keywordsFound > 2) score += 10
    else if (keywordsFound > 0) score += 5
    else score -= 10

    // Structure checks
    if (text.includes('experience') && text.includes('education')) score += 10
    if (text.includes('skills') || text.includes('technologies')) score += 5

    // Length check (optimal resume length)
    const wordCount = resumeText.split(' ').length
    if (wordCount > 300 && wordCount < 600) score += 10
    else if (wordCount < 200) score -= 15
    else if (wordCount > 800) score -= 5

    // Format checks (ATS prefers plain text)
    const hasSpecialChars = /[^\w\s\-\.@,\/\(\)\n]/.test(resumeText)
    if (!hasSpecialChars) score += 5
    else score -= 5

    score = Math.min(Math.max(score, 0), 100)

    // Generate checklist results
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

    // Generate optimization tips
    const optimizationTips = [
      'Include more job-specific keywords (e.g., React, Node.js, AWS)',
      'Remove special characters and complex formatting',
      'Ensure contact information is at the top',
      'Keep resume length between 400-600 words',
      'Use standard section headers (Experience, Education, Skills)',
      'Quantify achievements with numbers and percentages',
      'Match company language from job description'
    ].slice(0, issues.info + issues.warnings)

    const result = {
      score,
      issues,
      checklist,
      optimizationTips
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
