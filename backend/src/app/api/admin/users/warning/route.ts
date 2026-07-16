import { NextRequest, NextResponse } from 'next/server'
import { issueWarning, updateUserStore } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, reason, message, autoBan = false } = body

    if (!userId || !reason) {
      return NextResponse.json(
        { error: 'userId and reason are required' },
        { status: 400 }
      )
    }

    // Issue warning
    const user = issueWarning(userId, reason)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if user should be auto-banned (e.g., 3 warnings)
    if (autoBan && user.warnings >= 3) {
      updateUserStore(userId, {
        status: 'banned',
        lastActivity: 'Auto-banned for excessive warnings'
      })
    }

    return NextResponse.json({
      success: true,
      user,
      message: user.warnings >= 3 && autoBan
        ? 'Warning issued and user auto-banned for excessive violations'
        : 'Warning issued successfully',
      warnings: user.warnings,
      autoBanned: user.warnings >= 3 && autoBan
    })

  } catch (error) {
    console.error('Error issuing warning:', error)
    return NextResponse.json(
      { error: 'Failed to issue warning' },
      { status: 500 }
    )
  }
}
