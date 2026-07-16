import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proposalText, gigRequirements } = body

    if (!proposalText || typeof proposalText !== 'string') {
      return NextResponse.json(
        { error: 'Proposal text is required' },
        { status: 400 }
      )
    }

    // AI-powered quality analysis
    const wordCount = proposalText.split(/\s+/).length
    const sentenceCount = proposalText.split(/[.!?]+/).length - 1

    // Grammar score (mock - real implementation would use AI service)
    const grammarScore = calculateGrammarScore(proposalText)

    // Professional tone analysis
    const toneScore = analyzeTone(proposalText)

    // Alignment with gig requirements
    const alignmentScore = analyzeRequirementsAlignment(proposalText, gigRequirements || [])

    // Overall score calculation
    const overallScore = Math.round((grammarScore * 0.3 + toneScore * 0.3 + alignmentScore * 0.4))

    // Generate suggestions based on scores
    const suggestions = generateSuggestions(grammarScore, toneScore, alignmentScore, wordCount)

    const response = {
      score: overallScore,
      grammar: grammarScore,
      tone: toneScore,
      alignment: alignmentScore,
      suggestions,
      breakdown: {
        readability: getReadabilityScore(wordCount, sentenceCount),
        structure: hasGoodStructure(proposalText),
        length: getLengthAssessment(wordCount),
        keywords: countRelevantKeywords(proposalText),
        confidenceIndicators: countConfidenceIndicators(proposalText)
      },
      grade: getGradeLetter(overallScore),
      improvementAreas: getImprovementAreas(grammarScore, toneScore, alignmentScore)
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Quality Analysis API Error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze proposal quality' },
      { status: 500 }
    )
  }
}

// Utility functions
function calculateGrammarScore(text: string): number {
  // Simplified grammar scoring - real AI would analyze actual grammar
  let score = 85 // Base score

  // Reduce for common issues
  if (text.includes('  ')) score -= 10 // double spaces
  if (!text.includes('.') || text.split('.').length < 3) score -= 15 // poor sentence structure
  if (text.includes('!!') || text.includes('??') || text.includes('...')) score -= 5 // excessive punctuation

  return Math.max(60, Math.min(100, score))
}

function analyzeTone(text: string): number {
  const professionalWords = ['professional', 'experience', 'skills', 'deliver', 'results', 'quality', 'expertise']
  const casualWords = ['hey', 'cool', 'awesome', 'totally', 'kinda', 'sorta', 'just']

  let professionalScore = professionalWords.filter(word => text.toLowerCase().includes(word)).length * 5
  let casualPenalty = casualWords.filter(word => text.toLowerCase().includes(word)).length * 5

  return Math.max(50, Math.min(100, 70 + professionalScore - casualPenalty))
}

function analyzeRequirementsAlignment(text: string, requirements: string[]): number {
  if (!requirements || requirements.length === 0) return 75 // Default if no requirements provided

  const textWords = text.toLowerCase().split(/\s+/)
  let matches = 0

  requirements.forEach(req => {
    const reqWords = req.toLowerCase().split(/\s+/)
    const matchCount = reqWords.filter(word =>
      word.length > 2 && textWords.includes(word.replace(/[.,!?]/g, ''))
    ).length
    if (matchCount >= reqWords.length * 0.5) matches++
  })

  return Math.min(100, 50 + (matches / requirements.length) * 50)
}

function generateSuggestions(grammar: number, tone: number, alignment: number, wordCount: number): string[] {
  const suggestions: string[] = []

  if (alignment < 70) suggestions.push("Better align your experience with specific client requirements")
  if (tone < 70) suggestions.push("Consider a more professional tone for enterprise clients")
  if (grammar < 80) suggestions.push("Review for grammar and formatting consistency")
  if (wordCount < 200) suggestions.push("Add more specific examples and achievements")
  if (wordCount > 600) suggestions.push("Consider condensing to focus on most relevant experiences")
  if (!suggestions.length) suggestions.push("Great balance of professionalism and relevance!")

  return suggestions.slice(0, 3)
}

function getReadabilityScore(wordCount: number, sentenceCount: number): number {
  const avgWordsPerSentence = wordCount / Math.max(sentenceCount, 1)
  // Ideal is 15-20 words per sentence
  return Math.max(50, Math.min(100, 100 - Math.abs(avgWordsPerSentence - 17.5) * 5))
}

function hasGoodStructure(text: string): boolean {
  return text.includes('experience') &&
         text.includes('skills') &&
         (text.includes('looking') || text.includes('available'))
}

function getLengthAssessment(wordCount: number): string {
  if (wordCount < 150) return 'tooshort'
  if (wordCount > 500) return 'toolong'
  return 'perfect'
}

function countRelevantKeywords(text: string): number {
  const keywords = ['experience', 'skills', 'deliver', 'results', 'quality', 'expertise', 'project', 'client']
  return keywords.filter(word => text.toLowerCase().includes(word)).length
}

function countConfidenceIndicators(text: string): number {
  const indicators = ['successfully', 'expertise', 'confident', 'experienced', 'skilled', 'accomplished']
  return indicators.filter(word => text.toLowerCase().includes(word)).length
}

function getGradeLetter(score: number): string {
  if (score >= 95) return 'A+'
  if (score >= 90) return 'A'
  if (score >= 85) return 'B+'
  if (score >= 80) return 'B'
  if (score >= 75) return 'C+'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

function getImprovementAreas(grammar: number, tone: number, alignment: number): string[] {
  const areas: string[] = []

  if (grammar < 85) areas.push('Grammar & Formatting')
  if (tone < 75) areas.push('Professional Tone')
  if (alignment < 70) areas.push('Requirements Alignment')

  return areas.length ? areas : ['Looks good!']
}
