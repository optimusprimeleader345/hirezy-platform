import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function to safely execute Prisma queries
async function safeQuery<T>(query: () => Promise<T>, fallback: T, queryName: string): Promise<T> {
  try {
    return await query()
  } catch (error) {
    console.error(`Error in ${queryName}:`, error)
    return fallback
  }
}

export async function GET() {
  try {
    console.log('Starting platform analytics fetch...')
    
    // Get current date and date ranges for queries
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)

    // Platform Growth Data - User counts by role (with individual error handling)
    const totalUsers = await safeQuery(() => prisma.user.count(), 0, 'totalUsers')
    const studentCount = await safeQuery(() => prisma.user.count({ where: { role: 'student' } }), 0, 'studentCount')
    const recruiterCount = await safeQuery(() => prisma.user.count({ where: { role: 'recruiter' } }), 0, 'recruiterCount')
    const adminCount = await safeQuery(() => prisma.user.count({ where: { role: 'admin' } }), 0, 'adminCount')
    
    const activeUsers = await safeQuery(() => prisma.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } }
    }), 0, 'activeUsers')
    
    const newUsersThisMonth = await safeQuery(() => prisma.user.count({
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } }
    }), 0, 'newUsersThisMonth')
    
    const newUsersLastMonth = await safeQuery(() => prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
          lt: new Date(now.getFullYear(), now.getMonth(), 1)
        }
      }
    }), 0, 'newUsersLastMonth')

    // Calculate monthly growth percentage
    const monthlyGrowth = newUsersLastMonth > 0 
      ? Math.round(((newUsersThisMonth - newUsersLastMonth) / newUsersLastMonth) * 100)
      : 0

    // Platform Growth - Monthly trend (last 6 months)
    const months = []
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        start: monthDate,
        end: new Date(now.getFullYear(), now.getMonth() - i + 1, 1),
        name: monthDate.toLocaleString('default', { month: 'short' })
      })
    }

    const platformGrowthData = await safeQuery(async () => {
      return Promise.all(
        months.map(async ({ start, end, name }) => {
          const [students, recruiters] = await Promise.all([
            prisma.user.count({ where: { role: 'student', createdAt: { lt: end } } }),
            prisma.user.count({ where: { role: 'recruiter', createdAt: { lt: end } } })
          ])
          return { month: name, students, recruiters, total: students + recruiters }
        })
      )
    }, [], 'platformGrowthData')

    // Daily Active Users (last 7 days)
    const dau = await safeQuery(async () => {
      return Promise.all(
        Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
          const startOfDay = new Date(date.setHours(0, 0, 0, 0))
          const endOfDay = new Date(date.setHours(23, 59, 59, 999))
          
          return prisma.user.count({
            where: { createdAt: { gte: startOfDay, lte: endOfDay } }
          })
        })
      )
    }, [0, 0, 0, 0, 0, 0, 0], 'dau')

    // Gig Statistics
    const totalGigs = await safeQuery(() => prisma.gig.count(), 0, 'totalGigs')
    const activeGigs = await safeQuery(() => prisma.gig.count({ where: { status: 'approved' } }), 0, 'activeGigs')
    const pendingGigs = await safeQuery(() => prisma.gig.count({ where: { status: 'pending' } }), 0, 'pendingGigs')
    const completedGigs = await safeQuery(() => prisma.application.count({ where: { status: 'offered' } }), 0, 'completedGigs')

    // Application Statistics
    const totalApplications = await safeQuery(() => prisma.application.count(), 0, 'totalApplications')
    const applicationsThisMonth = await safeQuery(() => prisma.application.count({
      where: { createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) } }
    }), 0, 'applicationsThisMonth')
    const shortlistedCount = await safeQuery(() => prisma.application.count({ where: { status: 'shortlisted' } }), 0, 'shortlistedCount')
    const interviewsScheduled = await safeQuery(() => prisma.interview.count({ where: { status: 'scheduled' } }), 0, 'interviewsScheduled')

    // Revenue Data (from Transactions) - with safe query
    const totalRevenue = await safeQuery(async () => {
      const result = await prisma.transaction.aggregate({
        where: { status: 'success' },
        _sum: { amount: true }
      })
      return result._sum.amount || 0
    }, 0, 'totalRevenue')

    const revenueThisMonth = await safeQuery(async () => {
      const result = await prisma.transaction.aggregate({
        where: {
          status: 'success',
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) }
        },
        _sum: { amount: true }
      })
      return result._sum.amount || 0
    }, 0, 'revenueThisMonth')

    const commissionThisMonth = await safeQuery(async () => {
      const result = await prisma.transaction.aggregate({
        where: {
          status: 'success',
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) }
        },
        _sum: { commission: true }
      })
      return result._sum.commission || 0
    }, 0, 'commissionThisMonth')

    // Monthly Revenue Trend (last 6 months)
    const revenueOverview = await safeQuery(async () => {
      return Promise.all(
        months.map(async ({ start, end, name }) => {
          const [platformRevenueAgg, commissionAgg] = await Promise.all([
        where: {
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) }
        }
      }),
      prisma.application.count({ where: { status: 'shortlisted' } }),
      prisma.interview.count({ where: { status: 'scheduled' } })
    ])

    // Revenue Data (from Transactions)
    const [
      totalRevenue,
      revenueThisMonth,
      commissionThisMonth
    ] = await Promise.all([
      prisma.transaction.aggregate({
        where: { status: 'success' },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: {
          status: 'success',
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) }
        },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: {
          status: 'success',
          createdAt: { gte: new Date(now.getFullYear(), now.getMonth(), 1) }
        },
        _sum: { commission: true }
      })
    ])

    // Monthly Revenue Trend (last 6 months)
    const revenueOverview = await Promise.all(
      months.map(async ({ start, end, name }) => {
        const [platformRevenue, commission] = await Promise.all([
          prisma.transaction.aggregate({
            where: {
              status: 'success',
              createdAt: { gte: start, lt: end }
            },
            _sum: { amount: true }
          }),
          prisma.transaction.aggregate({
            where: {
              status: 'success',
              createdAt: { gte: start, lt: end }
            },
            _sum: { commission: true }
          })
        ])
        return {
          month: name,
          platformRevenue: platformRevenue._sum.amount || 0,
          commission: commission._sum.commission || 0,
          total: (platformRevenue._sum.amount || 0) + (commission._sum.commission || 0)
        }
      })
    )

    // Support Tickets
    const [
      openTickets,
      resolvedTickets
    ] = await Promise.all([
      prisma.supportTicket.count({ where: { status: 'open' } }),
      prisma.supportTicket.count({ where: { status: 'resolved' } })
    ])

    // Signup Trend (last 30 days)
    const signupTrend = await Promise.all(
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000)
        const startOfDay = new Date(date.setHours(0, 0, 0, 0))
        const endOfDay = new Date(date.setHours(23, 59, 59, 999))
        
        return prisma.user.count({
          where: {
            createdAt: { gte: startOfDay, lte: endOfDay }
          }
        }).then(count => ({
          date: startOfDay.toISOString().split('T')[0],
          count
        }))
      })
    )

    // AI Platform Health (mock for now - would need actual AI service metrics)
    const aiPlatformHealth = {
      aiRequestsToday: Math.floor(Math.random() * 5000) + 15000,
      aiSuccessRate: 97.3,
      latencyMs: Math.floor(Math.random() * 50) + 120,
      status: 'excellent'
    }

    // Fraud Detection Data
    const fraudDetectionData = {
      suspiciousAccounts: Math.floor(Math.random() * 10) + 5,
      highRiskActivities: Math.floor(Math.random() * 20) + 10,
      autoFlaggedProposals: Math.floor(Math.random() * 5) + 2,
      lastDetection: 'Just now',
      status: 'monitoring'
    }

    // Top Skills Trends (based on gig skills)
    const gigsWithSkills = await prisma.gig.findMany({
      where: { skills: { not: '[]' } },
      select: { skills: true }
    })

    const skillCount: Record<string, number> = {}
    gigsWithSkills.forEach(gig => {
      try {
        const skills = JSON.parse(gig.skills)
        skills.forEach((skill: string) => {
          skillCount[skill] = (skillCount[skill] || 0) + 1
        })
      } catch (e) {
        // Invalid JSON, skip
      }
    })

    const topSkillsTrends = Object.entries(skillCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({
        skill,
        growth: Math.floor(Math.random() * 30) + 20, // Mock growth percentage
        current: count
      }))

    // User Activity Heatmap (mock data structure - would need actual session tracking)
    const userActivityHeatmap = [
      { day: 'Mon', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Tue', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Wed', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Thu', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Fri', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Sat', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) },
      { day: 'Sun', hours: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)) }
    ]

    return NextResponse.json({
      // Platform Overview
      totalUsers,
      activeUsers,
      monthlyGrowth,
      studentCount,
      recruiterCount,
      adminCount,
      
      // Daily/Monthly Active Users
      dau,
      mau: platformGrowthData.map(d => d.total),
      
      // Signup Trend
      signupTrend,
      
      // Platform Growth
      platformGrowthData,
      
      // Gig Stats
      totalGigs,
      activeGigs,
      pendingGigs,
      completedGigs,
      
      // Application Stats
      totalApplications,
      applicationsThisMonth,
      shortlistedCount,
      interviewsScheduled,
      
      // Revenue
      totalRevenue: totalRevenue._sum.amount || 0,
      revenueThisMonth: revenueThisMonth._sum.amount || 0,
      commissionThisMonth: commissionThisMonth._sum.commission || 0,
      revenueOverview,
      
      // Support
      openTickets,
      resolvedTickets,
      
      // AI Health
      aiPlatformHealth,
      
      // Fraud Detection
      fraudDetectionData,
      
      // Skills Trends
      topSkillsTrends,
      
      // User Activity
      userActivityHeatmap,
      
      // Timestamp
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching platform analytics:', error)
    
    // Return fallback data in case of error
    return NextResponse.json({
      totalUsers: 0,
      activeUsers: 0,
      monthlyGrowth: 0,
      studentCount: 0,
      recruiterCount: 0,
      adminCount: 0,
      dau: [],
      mau: [],
      signupTrend: [],
      platformGrowthData: [],
      totalGigs: 0,
      activeGigs: 0,
      pendingGigs: 0,
      completedGigs: 0,
      totalApplications: 0,
      applicationsThisMonth: 0,
      shortlistedCount: 0,
      interviewsScheduled: 0,
      totalRevenue: 0,
      revenueThisMonth: 0,
      commissionThisMonth: 0,
      revenueOverview: [],
      openTickets: 0,
      resolvedTickets: 0,
      aiPlatformHealth: {
        aiRequestsToday: 0,
        aiSuccessRate: 0,
        latencyMs: 0,
        status: 'unknown'
      },
      fraudDetectionData: {
        suspiciousAccounts: 0,
        highRiskActivities: 0,
        autoFlaggedProposals: 0,
        lastDetection: 'N/A',
        status: 'unknown'
      },
      topSkillsTrends: [],
      userActivityHeatmap: [],
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch analytics data'
    }, { status: 500 })
  }
}