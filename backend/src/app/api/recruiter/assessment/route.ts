import { NextResponse } from 'next/server'
import { getComprehensiveAssessmentForCandidate } from '@/lib/ai/recruiter/aiAssessmentData'

// Advanced AI Assessment API Route
// GET /api/recruiter/assessment?candidateId=X
// POST /api/recruiter/assessment (analyze candidate)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const candidateId = searchParams.get('candidateId')

  if (!candidateId) {
    return NextResponse.json(
      { error: 'Candidate ID is required' },
      { status: 400 }
    )
  }

  try {
    const assessment = getComprehensiveAssessmentForCandidate(candidateId)

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found for candidate' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      assessment,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Assessment API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { candidateId, assessmentType } = await request.json()

    if (!candidateId) {
      return NextResponse.json(
        { error: 'Candidate ID is required' },
        { status: 400 }
      )
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock comprehensive analysis
    const assessment = getComprehensiveAssessmentForCandidate(candidateId)

    if (!assessment) {
      return NextResponse.json(
        { error: 'Assessment not found for candidate' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      candidateId,
      status: 'completed',
      assessment,
      processingTime: '2.1 seconds',
      modelVersion: 'AI-HR-v2.1',
      confidence: 94,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Assessment POST API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
