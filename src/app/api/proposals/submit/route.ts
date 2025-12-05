import { NextRequest, NextResponse } from 'next/server'
import { mockGigs } from '@/lib/gigs/mockData'
import { mockProposals } from '@/lib/proposals/mockData'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { gigId, proposalText, pricing, contactInfo } = body

    if (!gigId || !proposalText || !pricing) {
      return NextResponse.json(
        { error: 'Missing required fields: gigId, proposalText, pricing' },
        { status: 400 }
      )
    }

    const gig = mockGigs.find(g => g.id === gigId)

    if (!gig) {
      return NextResponse.json(
        { error: 'Gig not found' },
        { status: 404 }
      )
    }

    // Generate a proposal ID
    const proposalId = `PROP${Date.now().toString().slice(-6)}`

    // Simulate proposal submission (in real app, this would go to a database/API)
    const proposalData = {
      id: proposalId,
      gigId,
      gigTitle: gig.title,
      proposalText,
      price: pricing,
      score: Math.floor(Math.random() * 20) + 80, // Mock score
      status: 'Pending' as const,
      submittedAt: new Date().toISOString().split('T')[0],
      clientResponse: undefined,
      aiNotes: 'Proposal submitted successfully. Waiting for client review.'
    }

    // Add to mock proposals (simulating database save)
    mockProposals.push(proposalData)

    // Simulate successful submission
    return NextResponse.json({
      status: 'success',
      message: 'Proposal submitted successfully! You will receive a notification when the client responds.',
      proposalId,
      submittedAt: proposalData.submittedAt,
      estimatedResponseTime: '3-5 business days',
      nextSteps: [
        'Monitor your Proposals page for updates',
        'Keep an eye on your email for client responses',
        'Consider following up politely after 5-7 days if no response'
      ]
    })

  } catch (error) {
    console.error('Proposal Submission API Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit proposal' },
      { status: 500 }
    )
  }
}
