import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/adminUserStore'

export async function GET(request: NextRequest) {
  try {
    const totalUsers = userStore.length
    const activeUsers = userStore.filter(user => user.status === 'active').length
    const verifiedUsers = userStore.filter(user => user.verified).length
    const bannedUsers = userStore.filter(user => user.status === 'banned').length
    const pendingUsers = userStore.filter(user => user.status === 'pending').length

    // Role distribution
    const students = userStore.filter(user => user.role === 'student').length
    const recruiters = userStore.filter(user => user.role === 'recruiter').length
    const admins = userStore.filter(user => user.role === 'admin').length

    // Problem users (those with 3+ warnings)
    const problemUsers = userStore.filter(user => (user.warnings || 0) >= 3)

    // Users with warnings
    const usersWithWarnings = userStore.filter(user => (user.warnings || 0) > 0).length

    // Pending verifications
    const pendingVerifications = userStore.filter(user => !user.verified).length

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalUsers,
          activeUsers,
          verifiedUsers,
          bannedUsers,
          pendingUsers
        },
        distribution: {
          roles: {
            student: students,
            recruiter: recruiters,
            admin: admins
          }
        },
        issues: {
          pendingVerifications,
          problemUsers,
          usersWithWarnings
        }
      }
    })
  } catch (error) {
    console.error('Error fetching user analytics:', error)
    return NextResponse.json(
      { error: 'Failed to load analytics' },
      { status: 500 }
    )
  }
}
