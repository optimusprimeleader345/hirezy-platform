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
  Zap,
  Download,
  User,
  MessageSquare,
  FileText,
  Settings
} from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { adminStats, chartData, users, reports, gigListings } from '@/lib/demoData'
import AdminGlobalSearch from '@/components/admin/AdminGlobalSearch'

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

interface SystemAlert {
  id: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  icon: string
  timestamp: string
  dismissed: boolean
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  action: () => void
}

export default function AdminDashboard() {
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      message: 'High CPU usage on Database Server',
      severity: 'warning',
      icon: '💻',
      timestamp: '2 minutes ago',
      dismissed: false
    },
    {
      id: '2',
      message: 'New user onboarding surge detected',
      severity: 'info',
      icon: '👥',
      timestamp: '5 minutes ago',
      dismissed: false
    }
  ])

  const [quickActions] = useState<QuickAction[]>([
    {
      id: 'users',
      title: 'Manage Users',
      description: 'Add, edit, or review user accounts',
      icon: '👥',
      action: () => window.open('/admin/users', '_blank')
    },
    {
      id: 'gigs',
      title: 'Review Gigs',
      description: 'Moderate and approve job postings',
      icon: '💼',
      action: () => window.open('/admin/gigs', '_blank')
    },
    {
      id: 'reports',
      title: 'Analytics',
      description: 'View detailed platform analytics',
      icon: '📊',
      action: () => window.open('/admin/analytics', '_blank')
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'Check data privacy and compliance',
      icon: '🛡️',
      action: () => window.open('/admin/compliance', '_blank')
    }
  ])

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

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        uptime: Math.max(99.0, prev.uptime - 0.01)
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const clearAlerts = () => {
    setSystemAlerts(prev => prev.map(alert => ({ ...alert, dismissed: true })))
  }

  const dismissAlert = (alertId: string) => {
    setSystemAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ))
  }

  const exportDashboard = (format: 'pdf' | 'excel' | 'json') => {
    // Mock export functionality
    const exportData = {
      format,
      timestamp: new Date().toISOString(),
      metrics: currentStats,
      charts: userActivity
    }

    if (format === 'json') {
      // In a real app, this would send data to server for JSON export
      console.log('Exporting JSON:', exportData)
      alert('JSON export initiated - check console for data')
    } else {
      // In a real app, this would trigger download
      alert(`${format.toUpperCase()} export initiated - check downloads`)
    }
  }

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
      {/* Welcome Section */}
      <AdminGlassCard>
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Enterprise Analytics Dashboard</h1>
          <p className="text-slate-300">Comprehensive platform monitoring and management</p>
        </div>
      </AdminGlassCard>

      {/* Enhanced Global Search */}
      <AdminGlassCard title="Platform-wide Search">
        <AdminGlobalSearch />
        <p className="text-xs text-slate-400 mt-2">
          Search across users, gigs, logs, analytics, and more • Results from all admin sections
        </p>
      </AdminGlassCard>

      {/* Real-time System Alerts */}
      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">System Status: Operational</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={clearAlerts} variant="outline" size="sm" className="bg-slate-700 hover:bg-slate-600">
              Clear All
            </Button>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {systemAlerts.filter(alert => !alert.dismissed).map(alert => (
            <div key={alert.id} className={`p-3 rounded-lg border ${alert.severity === 'critical' ? 'bg-red-900/30 border-red-700' : alert.severity === 'warning' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-blue-900/30 border-blue-700'}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs">{alert.icon}</span>
                  <span className="text-white font-medium">{alert.message}</span>
                  <span className={`px-2 py-0.5 text-xs rounded ${alert.severity === 'critical' ? 'bg-red-100 text-red-800' : alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">{alert.timestamp}</span>
                  <Button
                    onClick={() => dismissAlert(alert.id)}
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {systemAlerts.filter(alert => !alert.dismissed).length === 0 && (
            <div className="text-center py-6 text-slate-400">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <div>All systems running optimally</div>
            </div>
          )}
        </div>
      </AdminGlassCard>

      {/* Quick Action Shortcuts */}
      <AdminGlassCard title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={action.action}
              className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors text-left"
            >
              <div className="text-blue-400 text-lg mb-1">{action.icon}</div>
              <div className="text-white text-sm font-medium">{action.title}</div>
              <div className="text-slate-400 text-xs">{action.description}</div>
            </button>
          ))}
        </div>
      </AdminGlassCard>

      {/* Export Panel */}
      <AdminGlassCard title="Dashboard Exports">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => exportDashboard('pdf')}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF Report
          </Button>
          <Button
            onClick={() => exportDashboard('excel')}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel Data
          </Button>
          <Button
            onClick={() => exportDashboard('json')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export JSON API
          </Button>
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
