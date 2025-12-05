import { NextRequest, NextResponse } from 'next/server'
import { getUserActivityStats, userStore } from '@/lib/adminUserStore'

export async function GET(request: NextRequest) {
  try {
    const activityStats = getUserActivityStats()

    // Calculate comprehensive analytics
    const totalUsers = userStore.length
    const activeUsers = userStore.filter(u => u.status === 'active').length
    const pendingUsers = userStore.filter(u => u.status === 'pending').length
    const bannedUsers = userStore.filter(u => u.status === 'banned').length
    const verifiedUsers = userStore.filter(u => u.verified).length

    const usersWithWarnings = userStore.filter(u => (u.warnings || 0) > 0).length
    const totalWarnings = userStore.reduce((sum, u) => sum + (u.warnings || 0), 0)

    // Activity metrics
    const recentlyActive = activityStats.filter(u => u.isActive).length
    const totalLogins = userStore.reduce((sum, u) => sum + (u.activity?.totalLogins || 0), 0)
    const avgLoginsPerUser = totalUsers > 0 ? Math.round(totalLogins / totalUsers) : 0

    // Geographic distribution (mock data based on locations)
    const locationStats = userStore.reduce((acc, user) => {
      if (user.location) {
        acc[user.location] = (acc[user.location] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // Role distribution
    const roleStats = {
      student: userStore.filter(u => u.role === 'student').length,
      recruiter: userStore.filter(u => u.role === 'recruiter').length,
      admin: userStore.filter(u => u.role === 'admin').length
    }

    // Activity timeline (weekly data simulation)
    const weeklyActivity = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        date: date.toISOString().split('T')[0],
        logins: Math.floor(Math.random() * 50) + 20,
        newUsers: i === 6 ? 1 : 0
      }
    })

    // Problem users (warnings > 1)
    const problemUsers = userStore
      .filter(u => (u.warnings || 0) > 1)
      .map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        warnings: u.warnings,
        status: u.status,
        lastActivity: u.lastActivity
      }))

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalUsers,
          activeUsers,
          pendingUsers,
          bannedUsers,
          verifiedUsers,
          usersWithWarnings,
          totalWarnings,
          recentlyActive
        },
        activity: {
          totalLogins,
          avgLoginsPerUser,
          weeklyActivity,
          activityStats
        },
        distribution: {
          roles: roleStats,
          locations: Object.entries(locationStats)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10) // Top 10 locations
        },
        issues: {
          problemUsers,
          pendingVerifications: pendingUsers
        }
      }
    })

  } catch (error) {
    console.error('Error fetching user analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user analytics' },
      { status: 500 }
    )
  }
}
