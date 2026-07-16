import { NextResponse } from 'next/server'
import { getShortlistSummary } from '@/lib/ai/recruiter/shortlistEngine'

// AI Shortlisting API Route
// POST /api/recruiter/shortlist
export async function POST(request: Request) {
  try {
    const { gigId, topN } = await request.json()

    if (!gigId) {
      return NextResponse.json(
        { error: 'Gig ID is required' },
        { status: 400 }
      )
    }

    // Get shortlisted candidates
    const candidates = getShortlistSummary(gigId, topN)

    return NextResponse.json({
      success: true,
      gigId,
      candidates,
      totalCandidates: candidates.length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Shortlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
