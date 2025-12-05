'use client'

import { useEffect, useState, useRef } from 'react'
import {
  Users,
  Building,
  Briefcase,
  DollarSign,
  TrendingUp,
  Activity,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle,
  Archive,
  Flag,
  Target,
  Calendar,
  BarChart3,
  Wifi,
  Zap
} from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { adminStats, chartData, users, reports, gigListings } from '@/lib/demoData'

interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance'
  uptime: number
  apiHealth: number
  databaseHealth: number
  lastIncident: string
}

interface ProjectedStats {
  totalUsers: number
  totalRecruiters: number // Estimated based on user roles
  totalPostedJobs: number
  platformRevenue: number
}

interface RealTimeStats {
  activeConnections: number
  requestsPerSecond: number
  dataTransferRate: number
  cacheHitRate: number
}

export default function AdminDashboard() {
  const [isConnected, setIsConnected] = useState(true)
  const [connectionIndicator, setConnectionIndicator] = useState('stable')
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'operational',
    uptime: 99.9,
    apiHealth: 100,
    databaseHealth: 100,
    lastIncident: '2024-11-20 14:30'
  })

  const [userActivity, setUserActivity] = useState(chartData.adminUsers)
  const [currentStats, setCurrentStats] = useState<ProjectedStats>({
    totalUsers: adminStats.totalUsers,
    totalRecruiters: Math.floor(adminStats.totalUsers * 0.3), // Estimate 30% recruiters
    totalPostedJobs: adminStats.totalGigs,
    platformRevenue: adminStats.platformRevenue
  })

  const [realTimeStats, setRealTimeStats] = useState<RealTimeStats>({
    activeConnections: 1247,
    requestsPerSecond: 89,
    dataTransferRate: 12.4,
    cacheHitRate: 94.8
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        uptime: Math.max(99.0, prev.uptime - 0.01)
      }))

      // Simulate connection status changes
      if (Math.random() < 0.1) {
        setConnectionIndicator(Math.random() > 0.9 ? 'unstable' : 'stable')
      }

      // Update real-time stats with random variations
      setRealTimeStats(prev => ({
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 20 - 10),
        requestsPerSecond: Math.max(50, prev.requestsPerSecond + Math.floor(Math.random() * 10 - 5)),
        dataTransferRate: Math.max(5, prev.dataTransferRate + (Math.random() - 0.5) * 2),
        cacheHitRate: Math.min(99.9, Math.max(85, prev.cacheHitRate + (Math.random() - 0.5) * 2))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600'
      case 'degraded': return 'text-yellow-600'
      case 'maintenance': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-5 w-5" />
      case 'degraded': return <AlertTriangle className="h-5 w-5" />
      case 'maintenance': return <Server className="h-5 w-5" />
      default: return <Server className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Real-time Connection Status - MNC Feature */}
      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Wifi className={`w-5 h-5 ${connectionIndicator === 'stable' ? 'text-green-400' : 'text-amber-400'} animate-pulse`} />
              <span className="text-white font-semibold">Live Connection</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                connectionIndicator === 'stable' ? 'bg-green-900/30 text-green-400' : 'bg-amber-900/30 text-amber-400'
              }`}>
                {connectionIndicator.toUpperCase()}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-600"></div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">Active Connections:</span>
                <AnimatedCounter value={realTimeStats.activeConnections} />
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 text-sm">Requests/sec:</span>
                <AnimatedCounter value={realTimeStats.requestsPerSecond} />
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300 text-sm">Data Transfer:</span>
                <span className="text-purple-400 font-semibold">{realTimeStats.dataTransferRate.toFixed(1)} MB/s</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300 text-sm">Cache Hit Rate:</span>
                <span className="text-yellow-400 font-semibold">{realTimeStats.cacheHitRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400 text-sm">WebSocket Connected</span>
          </div>
        </div>
      </AdminGlassCard>

      {/* Welcome Section */}
      <AdminGlassCard>
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Analytics Dashboard</h1>
          <p className="text-slate-300">Real-time platform monitoring and management</p>
          <div className="mt-4 flex justify-center">
            <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full animate-pulse">
              🔴 LIVE DASHBOARD
            </span>
          </div>
        </div>
      </AdminGlassCard>

      {/* A) KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminGlassCard>
          <MetricCard
            title="Total Users"
            value={currentStats.totalUsers.toLocaleString()}
            icon={<Users className="h-8 w-8" />}
            change={adminStats.monthlyGrowth}
          />
        </AdminGlassCard>
        <AdminGlassCard>
          <MetricCard
            title="Total Recruiters"
            value={currentStats.totalRecruiters.toLocaleString()}
            icon={<Building className="h-8 w-8" />}
            change={8.2}
          />
        </AdminGlassCard>
        <AdminGlassCard>
          <MetricCard
            title="Total Posted Jobs"
            value={currentStats.totalPostedJobs.toLocaleString()}
            icon={<Briefcase className="h-8 w-8" />}
            change={12.8}
          />
        </AdminGlassCard>
        <AdminGlassCard>
          <MetricCard
            title="Platform Revenue"
            value={`$${(currentStats.platformRevenue / 1000).toFixed(0)}K`}
            icon={<DollarSign className="h-8 w-8" />}
            change={18.5}
          />
        </AdminGlassCard>
      </div>

      {/* B) Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-2">
          <ChartWrapper
            title="User Growth Over Time"
            data={userActivity.map(item => ({
              ...item,
              date: item.month
            }))}
            dataKey="activeUsers"
            className="h-full"
          />
        </div>

        {/* Revenue Analytics */}
        <AdminGlassCard title="Revenue Analytics">
          <div className="space-y-4">
            {reports.find(r => r.type === 'financial')?.data?.revenue?.slice(-3).map((month: number, index: number) => {
              const months = ['Jun', 'Jul', 'Aug']
              return (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0">
                  <span className="text-sm text-slate-300">{months[index]}</span>
                  <span className="font-semibold text-white">${(month / 1000).toFixed(0)}K</span>
                </div>
              )
            }) || <div className="text-center text-slate-500 py-8">Revenue data not available</div>}
            <div className="pt-2">
              <div className="text-xs text-slate-500 flex justify-between">
                <span>Total:</span>
                <span className="font-semibold text-white">${(currentStats.platformRevenue / 1000).toFixed(0)}K</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* System Metrics & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <AdminGlassCard title="System Metrics">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-300">Success Rate</span>
              <span className="font-semibold text-white">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-300">Uptime</span>
              <span className="font-semibold text-green-400">{systemStatus.uptime.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-300">API Health</span>
              <span className="font-semibold text-green-400">{systemStatus.apiHealth}%</span>
            </div>
          </div>
        </AdminGlassCard>

        {/* System Status Widget */}
        <AdminGlassCard title="System Status">
          <div className="flex items-center space-x-2 mb-3">
            {getStatusIcon(systemStatus.status)}
            <span className={`font-semibold capitalize text-white`}>
              {systemStatus.status}
            </span>
          </div>
          <div className="text-xs text-slate-500">
            Last incident: {systemStatus.lastIncident}
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Quick Stats">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Reports Generated:</span>
              <span className="font-semibold text-white">{reports.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Pending Reviews:</span>
              <span className="font-semibold text-white">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Active Projects:</span>
              <span className="font-semibold text-white">{adminStats.completedProjects}</span>
            </div>
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Activity Alerts">
          <div className="space-y-2">
            <div className="flex items-center text-xs text-amber-400">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>3 pending flags</span>
            </div>
            <div className="flex items-center text-xs text-blue-400">
              <Activity className="h-4 w-4 mr-1" />
              <span>5 new signups</span>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* C) Management Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <AdminGlassCard title="User Management">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm mb-2 text-white">Recent Users</h4>
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <div className="font-semibold text-sm text-white">{user.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{user.role}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  user.role === 'admin' ? 'bg-purple-600 text-purple-100' :
                  user.role === 'recruiter' ? 'bg-blue-600 text-blue-100' :
                  'bg-green-600 text-green-100'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </AdminGlassCard>

        {/* Gig Moderation Queue */}
        <AdminGlassCard title="Gig Moderation Queue">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm mb-2 text-white">Pending Review</h4>
            {gigListings.slice(0, 3).map((gig) => (
              <div key={gig.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <div className="font-semibold text-sm truncate max-w-32 text-white">{gig.title}</div>
                  <div className="text-xs text-slate-500">{gig.company}</div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-amber-600 text-amber-100">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </AdminGlassCard>

        {/* Reports & Flags */}
        <AdminGlassCard title="Reports & Flags">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm mb-2 text-white">System Alerts</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 bg-red-900/30 px-3 rounded">
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-red-400" />
                  <span className="text-slate-300">Spam Detected</span>
                </div>
                <span className="text-xs text-red-400">High</span>
              </div>
              <div className="flex items-center justify-between py-2 bg-yellow-900/30 px-3 rounded">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-yellow-400" />
                  <span className="text-slate-300">Suspicious Activity</span>
                </div>
                <span className="text-xs text-yellow-400">Medium</span>
              </div>
              <div className="flex items-center justify-between py-2 bg-blue-900/30 px-3 rounded">
                <div className="flex items-center">
                  <Archive className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-slate-300">Mass Unsubscribes</span>
                </div>
                <span className="text-xs text-blue-400">Low</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>
    </div>
  )
}
