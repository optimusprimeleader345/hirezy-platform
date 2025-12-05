import { NextRequest, NextResponse } from 'next/server'
import { updateUserStore, deleteUsers } from '@/lib/adminUserStore'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userIds, newRole, newStatus } = body

    if (!action || !userIds || !Array.isArray(userIds)) {
      return NextResponse.json(
        { error: 'action and userIds array are required' },
        { status: 400 }
      )
    }

    let successCount = 0
    let errors: string[] = []

    switch (action) {
      case 'changeStatus':
        if (!newStatus) {
          return NextResponse.json({ error: 'newStatus required for status change' }, { status: 400 })
        }
        const validStatuses = ['active', 'banned', 'pending']
        if (!validStatuses.includes(newStatus)) {
          return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
        }

        userIds.forEach(userId => {
          const result = updateUserStore(userId, { status: newStatus })
          if (result) successCount++
          else errors.push(`User ${userId} not found`)
        })
        break

      case 'changeRole':
        if (!newRole) {
          return NextResponse.json({ error: 'newRole required for role change' }, { status: 400 })
        }
        const validRoles = ['student', 'recruiter', 'admin']
        if (!validRoles.includes(newRole)) {
          return NextResponse.json({ error: 'Invalid role value' }, { status: 400 })
        }

        userIds.forEach(userId => {
          const result = updateUserStore(userId, { role: newRole })
          if (result) successCount++
          else errors.push(`User ${userId} not found`)
        })
        break

      case 'bulkDelete':
        successCount = deleteUsers(userIds)
        if (successCount !== userIds.length) {
          errors.push(`${userIds.length - successCount} users not found`)
        }
        break

      case 'verify':
        userIds.forEach(userId => {
          const result = updateUserStore(userId, {
            verified: true,
            status: 'active',
            lastActivity: 'Account verified by admin'
          })
          if (result) successCount++
          else errors.push(`User ${userId} not found`)
        })
        break

      case 'activate':
        userIds.forEach(userId => {
          const result = updateUserStore(userId, { status: 'active' })
          if (result) successCount++
          else errors.push(`User ${userId} not found`)
        })
        break

      case 'ban':
        userIds.forEach(userId => {
          const result = updateUserStore(userId, { status: 'banned' })
          if (result) successCount++
          else errors.push(`User ${userId} not found`)
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `${action} applied to ${successCount} users`,
      processed: userIds.length,
      successful: successCount,
      errors: errors.length > 0 ? errors : undefined
    })

  } catch (error) {
    console.error('Error in bulk action:', error)
    return NextResponse.json(
      { error: 'Failed to process bulk action' },
      { status: 500 }
    )
  }
}
