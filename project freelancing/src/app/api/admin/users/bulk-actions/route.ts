import { NextRequest, NextResponse } from 'next/server'
import { userStore, updateUserStore, issueWarning, verifyUser } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userIds, reason } = body

    if (!action || !userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'action and userIds array are required' },
        { status: 400 }
      )
    }

    let successful = 0
    let failed = 0
    const results = []

    switch (action) {
      case 'verify':
        for (const userId of userIds) {
          try {
            const updated = updateUserStore(userId, { verified: true, status: 'active' })
            if (updated) {
              successful++
              results.push({ userId, success: true })
            } else {
              failed++
              results.push({ userId, success: false, error: 'User not found' })
            }
          } catch (error) {
            failed++
            results.push({ userId, success: false, error: 'Update failed' })
          }
        }
        break

      case 'activate':
        for (const userId of userIds) {
          try {
            const updated = updateUserStore(userId, { status: 'active' })
            if (updated) {
              successful++
              results.push({ userId, success: true })
            } else {
              failed++
              results.push({ userId, success: false, error: 'User not found' })
            }
          } catch (error) {
            failed++
            results.push({ userId, success: false, error: 'Update failed' })
          }
        }
        break

      case 'ban':
        for (const userId of userIds) {
          try {
            const updated = updateUserStore(userId, { status: 'banned' })
            if (updated) {
              successful++
              results.push({ userId, success: true })
            } else {
              failed++
              results.push({ userId, success: false, error: 'User not found' })
            }
          } catch (error) {
            failed++
            results.push({ userId, success: false, error: 'Update failed' })
          }
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      action,
      successful,
      failed,
      total: userIds.length,
      results
    })
  } catch (error) {
    console.error('Error in bulk action:', error)

    return NextResponse.json(
      { error: 'Bulk action failed' },
      { status: 500 }
    )
  }
}
