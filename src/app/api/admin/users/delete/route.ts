import { NextRequest, NextResponse } from 'next/server'
import { userStore, updateUserStore } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    // Soft delete user by setting status to "banned"
    const updatedUser = updateUserStore(userId, { status: 'banned' })
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User has been banned (soft delete)',
      user: updatedUser
    })
  } catch (error) {
    console.error('Error deleting user:', error)

    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}
