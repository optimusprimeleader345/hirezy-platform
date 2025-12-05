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

    // Simple analysis based on content length and keywords
    const textLength = resumeText.length
    const wordCount = resumeText.split(' ').length

    // Check for key sections and keywords
    const keywords = ['javascript', 'react', 'node.js', ' typescript', 'python', 'aws', 'docker', 'git']
    const keywordCount = keywords.filter(keyword =>
      resumeText.toLowerCase().includes(keyword.toLowerCase())
    ).length

    // Calculate score based on multiple factors
    let score = 50 // base score

    // Content quality factors
    if (textLength > 2000) score += 20
    else if (textLength > 1000) score += 10

    // Keywords factor
    if (keywordCount > 5) score += 15
    else if (keywordCount > 3) score += 10
    else if (keywordCount > 1) score += 5

    // Length appropriateness
    if (wordCount > 400 && wordCount < 800) score += 10
    else if (wordCount < 200) score -= 15

    // Structure check
    if (resumeText.toLowerCase().includes('experience')) score += 5
    if (resumeText.toLowerCase().includes('education')) score += 5

    // Cap at 100
    score = Math.min(Math.max(score, 0), 100)

    // Generate grade
    let grade = 'Poor'
    if (score >= 90) grade = 'Excellent'
    else if (score >= 80) grade = 'Very Good'
    else if (score >= 70) grade = 'Good'
    else if (score >= 60) grade = 'Fair'
    else if (score >= 50) grade = 'Needs Work'

    // Generate mock strengths and weaknesses
    const strengths = [
      'Clear and concise writing style',
      'Relevant technical skills listed',
      'Education background clearly presented',
      'Professional experience highlighted'
    ].slice(0, Math.floor(score / 25) + 1)

    const weaknesses = [
      'Could add more quantifiable achievements',
      'Missing some trending technologies',
      'Could strengthen action verbs',
      'Add more industry-specific keywords'
    ].slice(0, Math.max(0, 4 - Math.floor(score / 25)))

    const suggestions = [
      'Add specific metrics to your achievements (percentages, numbers, impacts)',
      'Include industry-specific keywords that ATS systems look for',
      'Use stronger action verbs (Led, Developed, Optimized vs. Worked on)',
      'Update with latest technologies and certifications',
      'Customize resume for each job application'
    ].slice(0, Math.floor((100 - score) / 20) + 1)

    const result = {
      score,
      grade,
      strengths,
      weaknesses,
      suggestions
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Strength score API error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze resume strength' },
      { status: 500 }
    )
  }
}
