import { NextRequest, NextResponse } from 'next/server'
import { mockRecruiterMessages } from '@/lib/communication/mockRecruiterMessages'

export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const conversationId = params.conversationId
    const messages = mockRecruiterMessages[conversationId] || []

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching recruiter messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}
