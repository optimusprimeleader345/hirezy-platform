import { NextResponse } from 'next/server'
import { mockRecruiterConversations } from '@/lib/communication/mockRecruiterConversations'

export async function GET() {
  try {
    // In a real app, this would filter by the current recruiter
    const conversations = mockRecruiterConversations
    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Error fetching recruiter conversations:', error)
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
  }
}
