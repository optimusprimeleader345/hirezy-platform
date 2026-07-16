import { NextRequest, NextResponse } from 'next/server'
import { generateEmail } from '@/lib/ai/recruiter/emailGenerator'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, context } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Email type is required' },
        { status: 400 }
      )
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const generatedEmail = generateEmail(type, context || {})

    return NextResponse.json({
      generatedEmail,
      emailType: type,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error generating email:', error)
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    )
  }
}
