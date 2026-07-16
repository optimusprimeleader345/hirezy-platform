'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Zap, Activity, Calendar, RefreshCw, Settings, AlertTriangle, Users, Briefcase, Target } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { StatsCards } from '@/components/admin/analytics/StatsCards'
import { UserGrowthChart } from '@/components/admin/analytics/UserGrowthChart'
import { RecruiterStudentBarChart } from '@/components/admin/analytics/RecruiterStudentBarChart'
import { ApplicationTrendChart } from '@/components/admin/analytics/ApplicationTrendChart'

export default function AdminAnalyticsIntelligencePage() {
  const [isLive, setIsLive] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 2400,
    activeUsers: 1780,
    monthlyGrowth: 12,
    studentCount: 1800,
    recruiterCount: 550,
    adminCount: 5,
  })

  // Simulate real-time data updates (without API calls as requested)
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        activeUsers: Math.max(0, prev.activeUsers + Math.floor(Math.random() * 5 - 2)),
        monthlyGrowth: Math.max(0, prev.monthlyGrowth + (Math.random() - 0.5) * 0.5),
        studentCount: prev.studentCount + Math.floor(Math.random() * 8),
        recruiterCount: Math.max(0, prev.recruiterCount + Math.floor(Math.random() * 3 - 1)),
        adminCount: 5, // Keep admin count stable
      }))
      setLastUpdated(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const refreshData = () => {
    setRefreshing(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setRefreshing(false)
    }, 1000)
  }

  // Mock data for additional components - simulating backend data
  const aiRecommendations = [
    "🚀 Boost student engagement by 25% through personalized learning paths",
    "📈 Focus on AI/ML skills - projected 40% demand increase Q2 2025",
    "🎯 Conversion rate optimization: Target inactive recruiters with automated reminders",
    "🔄 Implement predictive analytics to forecast hiring peaks",
    "💡 Expand enterprise partnerships for large-scale talent pools"
  ]

  const systemHealth = {
    uptime: 99.97,
    responseTime: 1.2,
    errorRate: 0.03,
    activeInstances: 8
  }

  const recentEvents = [
    { time: '14:32', event: 'User registration', type: 'success', details: 'New administrator account created' },
    { time: '14:28', event: 'System backup', type: 'info', details: 'Daily automated backup completed' },
    { time: '14:22', event: 'API rate limit', type: 'warning', details: 'Resume analyzer hitting rate limit, cooldown applied' },
    { time: '14:15', event: 'AI model update', type: 'success', details: 'Candidate scoring model v2.1 deployed successfully' },
    { time: '14:10', event: 'Database optimization', type: 'info', details: 'User profile indexing completed' },
  ]

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            Admin Analytics Intelligence Module
          </h1>
          <p className="text-slate-300 text-lg">Comprehensive platform intelligence with predictive AI insights</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 ${isLive
            ? 'bg-green-900/30 text-green-300 border border-green-700 ring-1 ring-green-500/20'
            : 'bg-slate-700 text-slate-400'
          }`}>
            <Activity className={`w-4 h-4 ${isLive ? 'animate-pulse' : ''}`} />
            <span className="font-medium">{isLive ? 'LIVE MODE' : 'STATIC MODE'}</span>
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`}></div>
          </div>

          <Button
            onClick={() => setIsLive(!isLive)}
            variant="outline"
            size="sm"
            className="border-slate-600 hover:bg-slate-800 transition-all duration-200"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isLive ? 'Pause Live Data' : 'Resume Live Data'}
          </Button>

          <Button
            onClick={refreshData}
            disabled={refreshing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      {/* Connection Status & Last Updated */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`}></div>
              <span className="text-slate-400 text-sm">
                Data Pipeline: {isLive ? 'Active' : 'Paused'} • Server Response: {systemHealth.responseTime}s
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Last Updated</div>
            <div className="text-white font-mono">{lastUpdated.toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Core Analytics Cards */}
      <StatsCards data={analyticsData} isLive={isLive} />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <UserGrowthChart isLive={isLive} />
        <RecruiterStudentBarChart isLive={isLive} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ApplicationTrendChart isLive={isLive} />

        {/* Skill Demand Heatmap */}
        <AdminGlassCard title="Top Skills Demand Heatmap">
          <div className="space-y-4">
            {[
              { skill: 'React & Next.js', demand: 92, color: '#8b5cf6', growth: '+18%' },
              { skill: 'Python & ML', demand: 88, color: '#06b6d4', growth: '+24%' },
              { skill: 'DevOps & Cloud', demand: 85, color: '#10b981', growth: '+15%' },
              { skill: 'AI/ML Engineering', demand: 95, color: '#f59e0b', growth: '+31%' },
              { skill: 'Full-Stack Development', demand: 82, color: '#ef4444', growth: '+12%' },
              { skill: 'Data Engineering', demand: 78, color: '#3b82f6', growth: '+19%' }
            ].map((item, idx) => (
              <div key={item.skill} className="flex items-center gap-4">
                <div className="w-8 text-sm font-semibold text-slate-400">#{idx + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{item.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-xs font-medium">{item.growth}</span>
                      <span className="text-slate-400 text-xs">{item.demand}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${item.demand}%`,
                        background: `linear-gradient(90deg, ${item.color}80 0%, ${item.color} 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      </div>

      {/* AI Insights & System Health */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* AI Insights Box */}
        <AdminGlassCard title="AI-Powered Platform Insights">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Auto-Generated Recommendations</span>
            </div>

            <div className="space-y-3">
              {aiRecommendations.map((recommendation, idx) => (
                <div key={idx} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-slate-300 text-sm leading-relaxed">{recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Generated by AI Analysis Engine</span>
                <span className="text-green-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Real-time
                </span>
              </div>
            </div>
          </div>
        </AdminGlassCard>

        {/* Platform Health Score */}
        <AdminGlassCard title="Platform Health Score">
          <div className="flex flex-col items-center">
            {/* Circular Progress Indicator */}
            <div className="relative w-32 h-32 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="transparent"
                  stroke="rgba(71, 85, 105, 0.3)"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="transparent"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - systemHealth.uptime / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{systemHealth.uptime.toFixed(2)}%</div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                <div className="text-green-400 text-lg font-bold">{systemHealth.responseTime}s</div>
                <div className="text-xs text-slate-400">Avg Response</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg text-center">
                <div className="text-red-400 text-lg font-bold">{systemHealth.errorRate}%</div>
                <div className="text-xs text-slate-400">Error Rate</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg text-center col-span-2">
                <div className="text-blue-400 text-lg font-bold">{systemHealth.activeInstances}</div>
                <div className="text-xs text-slate-400">Active Instances</div>
              </div>
            </div>

            {/* Health Status */}
            <div className="mt-4 p-3 bg-green-900/20 border border-green-700/30 rounded-lg w-full">
              <div className="flex items-center justify-center gap-2 text-green-300">
                <Activity className="w-4 h-4" />
                <span className="font-medium">Platform Health: Excellent</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* System Events Log & Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Events Log */}
        <AdminGlassCard title="System Events Log">
          <div className="space-y-3">
            {recentEvents.map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${event.type === 'success' ? 'bg-green-400' : event.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{event.event}</span>
                    <span className="text-slate-400 text-xs">{event.time}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700">
            <Button variant="outline" size="sm" className="w-full border-slate-600 hover:bg-slate-800">
              View Full Event History
            </Button>
          </div>
        </AdminGlassCard>

        {/* Activity Timeline */}
        <AdminGlassCard title="Admin Activity Timeline">
          <div className="space-y-4">
            <div className="relative">
              {[
                { time: '2 mins ago', action: 'Generated analytics report', admin: 'System Auto' },
                { time: '15 mins ago', action: 'Updated user permission', admin: 'admin@example.com' },
                { time: '1 hour ago', action: 'Reviewed flagged content', admin: 'moderator@hirezy.com' },
                { time: '2 hours ago', action: 'Deployed AI model update', admin: 'devops@hirezy.com' },
                { time: '4 hours ago', action: 'Approved gig posting', admin: 'admin@example.com' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 mb-3 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    {idx < 4 && <div className="w-px h-8 bg-slate-600 mt-1"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-slate-300 text-sm">{item.action}</p>
                      <span className="text-slate-500 text-xs">{item.time}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">by {item.admin}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity className="w-3 h-3" />
              <span>Real-time activity monitoring active</span>
            </div>
            <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300 p-0 h-auto">
              View All Activity
            </Button>
          </div>
        </AdminGlassCard>
      </div>

      {/* Footer with System Stats */}
      <AdminGlassCard className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border-t border-slate-700/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-green-400 text-2xl font-bold">99.97%</div>
            <div className="text-slate-400 text-sm">System Uptime</div>
          </div>
          <div>
            <div className="text-blue-400 text-2xl font-bold">1.2s</div>
            <div className="text-slate-400 text-sm">Avg Response</div>
          </div>
          <div>
            <div className="text-purple-400 text-2xl font-bold">256</div>
            <div className="text-slate-400 text-sm">Active Sessions</div>
          </div>
          <div>
            <div className="text-yellow-400 text-2xl font-bold">A+</div>
            <div className="text-slate-400 text-sm">Health Score</div>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
