import { NextRequest, NextResponse } from 'next/server'
import { generateInterviewPlan } from '@/lib/ai/recruiter/interviewEngine'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { candidateId, gigId, date } = body

    if (!candidateId || !gigId || !date) {
      return NextResponse.json(
        {
          error: 'Missing required fields: candidateId, gigId, and date are all required'
        },
        { status: 400 }
      )
    }

    // Validate date format
    const testDate = new Date(date)
    if (isNaN(testDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD format.' },
        { status: 400 }
      )
    }

    // Check if date is in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (testDate < today) {
      return NextResponse.json(
        { error: 'Date must be today or in the future.' },
        { status: 400 }
      )
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate the interview plan using AI mock
    const plan = generateInterviewPlan(candidateId, gigId, date)

    return NextResponse.json({
      success: true,
      plan,
      generatedAt: new Date().toISOString(),
      sessionId: `${candidateId}-${gigId}-${Date.now()}`
    })

  } catch (error) {
    console.error('Error generating interview plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate interview plan' },
      { status: 500 }
    )
  }
}

// Optional: Handle GET request to get available time slots
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    // Return mock time slots
    const { getAvailableTimeSlots } = await import('@/lib/ai/recruiter/interviewEngine')
    const timeSlots = getAvailableTimeSlots(date)

    return NextResponse.json({
      date,
      availableSlots: timeSlots
    })

  } catch (error) {
    console.error('Error fetching time slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    )
  }
}
