import { NextRequest, NextResponse } from 'next/server'
import { userStore, updateUserStore } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, newRole } = body

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'userId and newRole are required' },
        { status: 400 }
      )
    }

    const validRoles = ['student', 'recruiter', 'admin']
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { error: 'Invalid role value' },
        { status: 400 }
      )
    }

    // Find user and check safeguards
    const userIndex = userStore.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent changing an admin's role
    if (userStore[userIndex].role === 'admin' && newRole !== 'admin') {
      return NextResponse.json(
        { error: 'Cannot change admin role' },
        { status: 403 }
      )
    }

    // Update user role using shared function
    const updatedUser = updateUserStore(userId, { role: newRole })
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
    console.error('Error changing user role:', error)

    return NextResponse.json(
      { error: 'Failed to change user role' },
      { status: 500 }
    )
  }
}
