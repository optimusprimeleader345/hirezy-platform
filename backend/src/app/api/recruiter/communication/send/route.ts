import { NextRequest, NextResponse } from 'next/server'
import { mockRecruiterMessages } from '@/lib/communication/mockRecruiterMessages'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, message, sender } = body

    if (!conversationId || !message || !sender) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create new message
    const newMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      sender,
      senderId: sender === 'recruiter' ? 'rec1' : 'student-1',
      text: message,
      timestamp: new Date().toISOString(),
      messageType: 'text' as const
    }

    // Add to mock data (in a real app this would go to database)
    if (!mockRecruiterMessages[conversationId]) {
      mockRecruiterMessages[conversationId] = []
    }
    mockRecruiterMessages[conversationId].push(newMessage)

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
