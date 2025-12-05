import { NextRequest, NextResponse } from 'next/server'
import { userStore, updateUserStore } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, reason, autoBan = false } = body

    if (!userId || !reason) {
      return NextResponse.json(
        { error: 'userId and reason are required' },
        { status: 400 }
      )
    }

    // Find user
    const userIndex = userStore.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const user = userStore[userIndex]
    const newWarningCount = (user.warnings || 0) + 1

    const updates: any = {
      warnings: newWarningCount,
      lastActivity: `Warning: ${reason}`
    }

    // Auto-ban if they reach 3 warnings
    if (autoBan && newWarningCount >= 3) {
      updates.status = 'banned'
      updates.lastActivity = `Auto-banned for 3+ warnings. Last warning: ${reason}`
    }

    const updatedUser = updateUserStore(userId, updates)
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      )
    }

    const message = autoBan && newWarningCount >= 3
      ? `Warning issued. User has been auto-banned for reaching ${newWarningCount} warnings.`
      : `Warning issued (${newWarningCount} total).`

    return NextResponse.json({
      success: true,
      message,
      user: updatedUser,
      warningCount: newWarningCount,
      wasAutoBanned: autoBan && newWarningCount >= 3
    })
  } catch (error) {
    console.error('Error issuing warning:', error)

    return NextResponse.json(
      { error: 'Failed to issue warning' },
      { status: 500 }
    )
  }
}
