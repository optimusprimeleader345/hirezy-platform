'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { MonitoringSidebar } from '@/components/MonitoringSidebar'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { HeatmapComponent } from '@/components/Chart/HeatmapComponent'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { MonitoringSkeleton } from '@/components/MonitoringSkeleton'
import { useMonitoringData } from '@/hooks/useMonitoringData'
import { Zap, TrendingUp, Activity, Shield, BarChart3, DollarSign, AlertTriangle, RefreshCw, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

function MonitoringContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'platform-growth'
  
  const { data, isLoading, isError, error, refetch, dataUpdatedAt } = useMonitoringData()

  // Format the last updated time
  const getLastUpdatedText = () => {
    if (!dataUpdatedAt) return 'Loading...'
    const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    return `${Math.floor(seconds / 3600)} hours ago`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <MonitoringSidebar activeTab={activeTab} />
        <div className="flex-1 p-8">
          <MonitoringSkeleton />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-screen">
        <MonitoringSidebar activeTab={activeTab} />
        <div className="flex-1 p-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Data</h2>
            <p className="text-slate-300 mb-6 max-w-md">
              {error instanceof Error ? error.message : 'An unexpected error occurred while fetching monitoring data.'}
            </p>
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen">
        <MonitoringSidebar activeTab={activeTab} />
        <div className="flex-1 p-8">
          <div className="text-center text-slate-300">No data available</div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'platform-growth':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Platform Growth Insights</h1>
              <p className="text-slate-300">Track user acquisition and platform expansion metrics</p>
            </div>
            <ChartWrapper
              title="Platform User Growth Trends (Last 6 Months)"
              data={data.platformGrowthData}
              dataKeys={['students', 'recruiters']}
              colors={['#3B82F6', '#EF4444']}
              type="line"
              className="w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AdminGlassCard title="Growth Rate">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    {data.monthlyGrowth > 0 ? '+' : ''}{data.monthlyGrowth}%
                  </div>
                  <div className="text-sm text-slate-400">Monthly Growth Rate</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Total Users">
                <div className="text-center py-6">
                  <Activity className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{data.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Active Platform Users</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="New Users This Month">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{data.activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Users Joined (30 days)</div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'ai-health':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">AI Platform Health Monitor</h1>
              <p className="text-slate-300">Real-time monitoring of AI system performance and usage</p>
            </div>
            <AdminGlassCard title="AI Platform Health Overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-yellow-400" />
                    <div>
                      <div className="text-sm text-slate-400">AI Requests Today</div>
                      <div className="text-2xl font-bold text-white">{data.aiPlatformHealth.aiRequestsToday.toLocaleString()}</div>
                      <div className="text-xs text-green-400">+12% from yesterday</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    High Activity
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                      <div className="text-2xl font-bold text-white">{data.aiPlatformHealth.aiSuccessRate}%</div>
                      <div className="text-xs text-green-400">Excellent performance</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    Excellent
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                    <div>
                      <div className="text-sm text-slate-400">Avg Latency</div>
                      <div className="text-2xl font-bold text-white">{data.aiPlatformHealth.latencyMs}ms</div>
                      <div className="text-xs text-green-400">Under 200ms target</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    Excellent
                  </div>
                </div>
              </div>
            </AdminGlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdminGlassCard title="Platform Statistics">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Students</span>
                    <span className="text-white font-semibold">{data.studentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Recruiters</span>
                    <span className="text-white font-semibold">{data.recruiterCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Active Gigs</span>
                    <span className="text-white font-semibold">{data.activeGigs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Applications</span>
                    <span className="text-white font-semibold">{data.totalApplications.toLocaleString()}</span>
                  </div>
                </div>
              </AdminGlassCard>

              <AdminGlassCard title="Recent Activity">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Applications This Month</span>
                    <span className="text-white font-semibold">{data.applicationsThisMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Shortlisted Candidates</span>
                    <span className="text-green-400 font-semibold">{data.shortlistedCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Interviews Scheduled</span>
                    <span className="text-blue-400 font-semibold">{data.interviewsScheduled.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Pending Gigs</span>
                    <span className="text-yellow-400 font-semibold">{data.pendingGigs.toLocaleString()}</span>
                  </div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'user-heatmap':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">User Activity Heatmap</h1>
              <p className="text-slate-300">Visualize peak usage hours and activity patterns across days</p>
            </div>
            <HeatmapComponent
              title="Weekly User Activity Patterns"
              data={data.userActivityHeatmap}
            />
            <AdminGlassCard title="Activity Insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">User Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Students:</span>
                      <span className="text-white font-semibold">{data.studentCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Recruiters:</span>
                      <span className="text-white font-semibold">{data.recruiterCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Platform Admins:</span>
                      <span className="text-white font-semibold">{data.adminCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Engagement Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Active Users (30d):</span>
                      <span className="text-green-400 font-semibold">{data.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Monthly Growth:</span>
                      <span className={`font-semibold ${data.monthlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {data.monthlyGrowth > 0 ? '+' : ''}{data.monthlyGrowth}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Platform Users:</span>
                      <span className="text-blue-400 font-semibold">{data.totalUsers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>
        )

      case 'fraud-detection':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Fraud Detection Dashboard</h1>
              <p className="text-slate-300">AI-powered security monitoring and risk assessment</p>
            </div>
            <AdminGlassCard title="Security Overview Cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-red-900/30 rounded-lg border border-red-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-red-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-red-600">High Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-red-400">Suspicious Accounts</div>
                    <div className="text-2xl font-bold text-white">{data.fraudDetectionData.suspiciousAccounts}</div>
                    <div className="text-xs text-slate-400">{data.fraudDetectionData.lastDetection}</div>
                  </div>
                </div>
                <div className="p-6 bg-orange-900/30 rounded-lg border border-orange-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="h-8 w-8 text-orange-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-orange-600">Medium Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-orange-400">High Risk Activities</div>
                    <div className="text-2xl font-bold text-white">{data.fraudDetectionData.highRiskActivities}</div>
                    <div className="text-xs text-slate-400">All monitored</div>
                  </div>
                </div>
                <div className="p-6 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-yellow-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-600">Low Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-yellow-400">Auto-Flagged Proposals</div>
                    <div className="text-2xl font-bold text-white">{data.fraudDetectionData.autoFlaggedProposals}</div>
                    <div className="text-xs text-slate-400">Under review</div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdminGlassCard title="Support Tickets">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Open Tickets</span>
                    <span className="text-red-400 font-semibold">{data.openTickets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Resolved Tickets</span>
                    <span className="text-green-400 font-semibold">{data.resolvedTickets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Tickets</span>
                    <span className="text-white font-semibold">{(data.openTickets + data.resolvedTickets).toLocaleString()}</span>
                  </div>
                </div>
              </AdminGlassCard>

              <AdminGlassCard title="Platform Health">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">AI Success Rate:</span>
                    <span className="text-green-400 font-semibold">{data.aiPlatformHealth.aiSuccessRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Avg Response Time:</span>
                    <span className="text-green-400 font-semibold">{data.aiPlatformHealth.latencyMs}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">System Status:</span>
                    <span className="text-green-400 font-semibold capitalize">{data.aiPlatformHealth.status}</span>
                  </div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'skills-trends':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Top Skills Trends Analysis</h1>
              <p className="text-slate-300">Track the most in-demand skills and growth trends</p>
            </div>
            <ChartWrapper
              title="Skill Demand (Based on Gig Postings)"
              data={data.topSkillsTrends}
              dataKey="current"
              type="bar"
              colors={['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']}
              className="w-full"
            />
            <AdminGlassCard title="Skills Market Insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Top In-Demand Skills</h3>
                  <div className="space-y-3">
                    {data.topSkillsTrends.slice(0, 5).map((skill, index) => (
                      <div key={skill.skill} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                            index === 0 ? 'bg-purple-600' : 
                            index === 1 ? 'bg-blue-600' : 
                            index === 2 ? 'bg-green-600' : 
                            index === 3 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-white font-medium">{skill.skill}</span>
                        </div>
                        <span className="text-slate-300 font-semibold">{skill.current} gigs</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Platform Activity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Total Gigs Posted:</span>
                      <span className="text-white font-semibold">{data.totalGigs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Active Gigs:</span>
                      <span className="text-green-400 font-semibold">{data.activeGigs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Pending Approval:</span>
                      <span className="text-yellow-400 font-semibold">{data.pendingGigs.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Completed Projects:</span>
                      <span className="text-blue-400 font-semibold">{data.completedGigs.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>
        )

      case 'revenue-analytics':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Revenue Analytics Overview</h1>
              <p className="text-slate-300">Platform revenue, commission income, and financial performance</p>
            </div>
            <ChartWrapper
              title="Revenue & Commission Trends (Last 6 Months)"
              data={data.revenueOverview}
              dataKeys={['platformRevenue', 'commission']}
              colors={['#10B981', '#06B6D4']}
              type="area"
              className="w-full"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AdminGlassCard title="Total Revenue">
                <div className="text-center py-6">
                  <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${data.totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">All Time Revenue</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="This Month">
                <div className="text-center py-6">
                  <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${data.revenueThisMonth.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Monthly Revenue</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Commission">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${data.commissionThisMonth.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Monthly Commission</div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      default:
        return <div className="text-slate-300">Select a monitoring tab from the sidebar</div>
    }
  }

  return (
    <div className="flex min-h-screen">
      <MonitoringSidebar activeTab={activeTab} />
      <div className="flex-1 p-8">
        {/* Last Updated Timestamp */}
        <div className="flex justify-end items-center gap-2 mb-4 text-sm text-slate-400">
          <Clock className="h-4 w-4" />
          <span>Last updated: {getLastUpdatedText()}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => refetch()} 
            className="ml-2 h-8 px-2"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default function MonitoringPage() {
  return (
    <Suspense fallback={<MonitoringSkeleton />}>
      <MonitoringContent />
    </Suspense>
  )
}