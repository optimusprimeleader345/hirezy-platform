'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Activity, RefreshCw, Users, UserCheck, TrendingUp } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { StatsCards } from '@/components/admin/analytics/StatsCards'
import { UserGrowthChart } from '@/components/admin/analytics/UserGrowthChart'
import { RecruiterStudentBarChart } from '@/components/admin/analytics/RecruiterStudentBarChart'
import { ApplicationTrendChart } from '@/components/admin/analytics/ApplicationTrendChart'
import { RevenueBreakdownChart } from '@/components/admin/analytics/RevenueBreakdownChart'
import { SkillsTrendChart } from '@/components/admin/analytics/SkillsTrendChart'
import { ConversionFunnelChart } from '@/components/admin/analytics/ConversionFunnelChart'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'

interface PlatformAnalytics {
  totalUsers: number
  activeUsers: number
  monthlyGrowth: number
  studentCount: number
  recruiterCount: number
  adminCount: number
  dau: number[]
  mau: number[]
  signupTrend: Array<{ date: string; count: number }>
}

export default function PlatformAnalyticsPage() {
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setRefreshing(true)
      setError(null)
      const response = await fetch('/api/admin/analytics/platform')
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      setError('Failed to load platform analytics')
      console.error('Error fetching analytics:', err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminGlassCard>
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Loading Platform Analytics</h2>
            <p className="text-slate-400">Fetching analytics data...</p>
          </div>
        </AdminGlassCard>
      </div>
    )
  }

  if (error || !analytics) {
    return (
      <div className="space-y-6">
        <AdminGlassCard>
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <BarChart3 className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Analytics Error</h2>
            <p className="text-slate-400 mb-4">{error}</p>
            <Button onClick={fetchAnalytics} variant="outline" className="border-red-500 text-red-300 hover:bg-red-500/20">
              Try Again
            </Button>
          </div>
        </AdminGlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Platform Usage Analytics</h2>
        <Button
          onClick={fetchAnalytics}
          disabled={refreshing}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {/* Stats Cards (4 Professional Metric Cards) */}
      <StatsCards data={{
        totalUsers: analytics.totalUsers,
        activeUsers: analytics.activeUsers,
        monthlyGrowth: analytics.monthlyGrowth,
        studentCount: analytics.studentCount,
        recruiterCount: analytics.recruiterCount
      }} isLive={false} />

      {/* Analytics Charts - Using the separate components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart - Monthly Active Users Line Chart */}
        <UserGrowthChart isLive={false} />

        {/* Recruiter Student Bar Chart - Student vs Recruiter Growth Bar Chart */}
        <RecruiterStudentBarChart isLive={false} />
      </div>

      {/* Application Trend Chart - Job Postings & Applications Dual Line Chart */}
      <ApplicationTrendChart isLive={false} />

      {/* Advanced Analytics Charts - Enhanced UI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown Chart */}
        <RevenueBreakdownChart />

        {/* Skills Trend Chart - Area Chart with Trends */}
        <SkillsTrendChart />
      </div>

      {/* Conversion Funnel Analysis - Full Width */}
      <ConversionFunnelChart />
    </div>
  )
}
