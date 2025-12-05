import { NextRequest, NextResponse } from 'next/server'
import { userStore, updateUserStore } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, newStatus } = body

    if (!userId || !newStatus) {
      return NextResponse.json(
        { error: 'userId and newStatus are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['active', 'banned', 'pending']
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Update user status using shared function
    const updatedUser = updateUserStore(userId, { status: newStatus })
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error updating user status:', error)

    return NextResponse.json(
      { error: 'Failed to update user status' },
      { status: 500 }
    )
  }
}
