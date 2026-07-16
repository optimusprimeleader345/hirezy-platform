'use client'

import { useState, useEffect } from 'react'
import {
  Users, Search, Ban, Trash, Crown, Eye, MapPin, Calendar, TrendingUp,
  Download, UserPlus, RefreshCw, AlertCircle, CheckCircle, Filter,
  Shield, Phone, AlertTriangle, BarChart3, UserCheck, UserX,
  Edit, Mail, MoreVertical, CheckSquare, Square, Send, Activity,
  PieChart, Target, Clock, Globe, Archive, FileText, Settings
} from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { HeatmapComponent } from '@/components/Chart/HeatmapComponent'

interface User {
  id: string
  name: string | null
  email: string
  role: string
  status: string
  createdAt: string
  updatedAt?: string
  lastLogin?: string | null
  verified: boolean
  warnings: number
  lastActivity: string
  profilePicture?: string
  phone?: string
  location?: string
  bio?: string
  _count: {
    gigs: number
    applications: number
    completedInterviews: number
  }
  activity: {
    lastWeek: number
    lastMonth: number
    totalLogins: number
  }
}

interface ApiResponse {
  success: boolean
  users?: User[]
  error?: string
  user?: User
  message?: string
  analytics?: any
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list')
  const [analytics, setAnalytics] = useState<any>(null)

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (selectedRole) params.set('role', selectedRole)
      if (selectedStatus) params.set('status', selectedStatus)

      const response = await fetch(`/api/admin/users/list?${params}`)
      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch users')
      }

      setUsers(data.users || [])
      setError('')
    } catch (err) {
      setError('Failed to load users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/users/analytics')
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (err) {
      console.error('Error fetching analytics:', err)
    }
  }

  useEffect(() => {
    if (viewMode === 'analytics') {
      fetchAnalytics()
    } else {
      fetchUsers()
    }
  }, [searchTerm, selectedRole, selectedStatus, viewMode])

  // Show toast messages
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  // Bulk selection handlers
  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    } else {
      setSelectedUsers(prev => [...prev, userId])
    }
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(u => u.id))
    }
  }

  // User management actions
  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/users/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newStatus })
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      showToast(`User ${newStatus === 'active' ? 'activated' : newStatus}`, 'success')
      await fetchUsers()
    } catch (err) {
      console.error('Error updating status:', err)
      showToast('Failed to update user status', 'error')
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch('/api/admin/users/change-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole })
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change role')
      }

      showToast(`Role changed to ${newRole}`, 'success')
      await fetchUsers()
    } catch (err) {
      console.error('Error changing role:', err)
      showToast('Failed to change user role', 'error')
    }
  }

  const handleBulkActions = async (action: string, options: any = {}) => {
    if (selectedUsers.length === 0) return

    try {
      const response = await fetch('/api/admin/users/bulk-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, userIds: selectedUsers, ...options })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bulk action failed')
      }

      showToast(`${action} applied to ${data.successful} users`, 'success')
      setSelectedUsers([])
      setIsBulkMode(false)
      await fetchUsers()
    } catch (err) {
      console.error('Error in bulk action:', err)
      showToast('Bulk action failed', 'error')
    }
  }

  const handleWarning = async (userId: string, reason: string) => {
    try {
      const response = await fetch('/api/admin/users/warning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          reason,
          autoBan: false
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to issue warning')
      }

      showToast(data.message || 'Warning issued', 'success')
      await fetchUsers()
    } catch (err) {
      console.error('Error issuing warning:', err)
      showToast('Failed to issue warning', 'error')
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to ban this user? This will prevent them from accessing the platform.')) {
      return
    }

    try {
      const response = await fetch('/api/admin/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      const data: ApiResponse = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user')
      }

      showToast(data.message || 'User banned successfully', 'success')
      await fetchUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
      showToast('Failed to ban user', 'error')
    }
  }

  const handleApprove = (userId: string) => {
    handleStatusChange(userId, 'active')
  }

  // User statistics
  const userStats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    recruiters: users.filter(u => u.role === 'recruiter').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.status === 'active').length,
    banned: users.filter(u => u.status === 'banned').length,
    pending: users.filter(u => u.status === 'pending').length,
    verified: users.filter(u => u.verified).length,
    unverified: users.filter(u => !u.verified).length,
    warnings: users.reduce((sum, u) => sum + (u.warnings || 0), 0)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminGlassCard>
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Loading Users</h2>
            <p className="text-slate-400">Fetching user data...</p>
          </div>
        </AdminGlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md ${
          toast.type === 'success'
            ? 'bg-green-500/20 border border-green-500/50 text-green-300'
            : 'bg-red-500/20 border border-red-500/50 text-red-300'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="font-medium text-sm">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-current opacity-70 hover:opacity-100 ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Header with View Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-blue-400" />
            Admin User Management
          </h1>
          <p className="text-slate-300">Advanced user management, analytics, and moderation tools</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              User List
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>
          <Button onClick={viewMode === 'analytics' ? fetchAnalytics : fetchUsers} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {viewMode === 'analytics' ? (
        <>
          {/* Analytics Dashboard */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overview Stats */}
              <AdminGlassCard title="User Overview">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Users</span>
                    <span className="text-2xl font-bold text-blue-400">{analytics.overview.totalUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Active Users</span>
                    <span className="text-xl font-semibold text-green-400">{analytics.overview.activeUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Verified</span>
                    <span className="text-lg font-medium text-purple-400">{analytics.overview.verifiedUsers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">With Warnings</span>
                    <span className="text-lg font-medium text-yellow-400">{analytics.overview.usersWithWarnings}</span>
                  </div>
                </div>
              </AdminGlassCard>

              {/* Role Distribution - Enhanced Visual */}
              <AdminGlassCard title="Role Distribution">
                <div className="space-y-4">
                  {analytics.distribution && (() => {
                    const roles = [
                      { name: 'Students', count: analytics.distribution.roles.student || 0, color: '#10b981', icon: Users },
                      { name: 'Recruiters', count: analytics.distribution.roles.recruiter || 0, color: '#3b82f6', icon: UserCheck },
                      { name: 'Admins', count: analytics.distribution.roles.admin || 0, color: '#8b5cf6', icon: Crown }
                    ]
                    const total = roles.reduce((sum, role) => sum + role.count, 0)
                    const maxCount = Math.max(...roles.map(r => r.count))

                    return (
                      <div className="space-y-3">
                        {roles.map((role, index) => {
                          const percentage = total > 0 ? Math.round((role.count / total) * 100) : 0
                          const barWidth = maxCount > 0 ? Math.round((role.count / maxCount) * 100) : 0

                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <role.icon className="w-4 h-4" style={{ color: role.color }} />
                                  <span className="text-slate-300 font-medium">{role.name}</span>
                                  <span className="text-slate-400">({percentage}%)</span>
                                </div>
                                <span className="font-bold" style={{ color: role.color }}>{role.count}</span>
                              </div>
                              <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                                  style={{
                                    width: `${barWidth}%`,
                                    backgroundColor: role.color,
                                    boxShadow: `0 0 8px ${role.color}40`
                                  }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>
              </AdminGlassCard>

              {/* Issues & Alerts */}
              <AdminGlassCard title="Issues & Alerts">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <div className="flex-1">
                      <div className="font-medium">Pending Verifications</div>
                      <div className="text-sm text-slate-400">{analytics.issues.pendingVerifications} users</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-red-500/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <div className="flex-1">
                      <div className="font-medium">Problem Users</div>
                      <div className="text-sm text-slate-400">{analytics.issues.problemUsers.length} users with 3+ warnings</div>
                    </div>
                  </div>
                </div>
              </AdminGlassCard>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Error State */}
          {error && (
            <AdminGlassCard>
              <div className="text-center py-6">
                <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <h3 className="text-red-300 font-semibold mb-2">Error Loading Users</h3>
                <p className="text-red-200 mb-4">{error}</p>
                <Button onClick={fetchUsers} variant="outline" className="border-red-500 text-red-300 hover:bg-red-500/20">
                  Try Again
                </Button>
              </div>
            </AdminGlassCard>
          )}

          {/* Bulk Actions Bar */}
          {selectedUsers.length > 0 && (
            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">
                    {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkActions('verify')}
                    className="border-green-500 text-green-300 hover:bg-green-500/20"
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkActions('activate')}
                    className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Activate
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkActions('ban')}
                    className="border-red-500 text-red-300 hover:bg-red-500/20"
                  >
                    <Ban className="w-4 h-4 mr-1" />
                    Ban
                  </Button>
                </div>
              </div>
            </AdminGlassCard>
          )}

          {/* Enhanced Filters */}
          <AdminGlassCard title="Advanced Filters & Search">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">All Roles</option>
                <option value="student">Students</option>
                <option value="recruiter">Recruiters</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending Verification</option>
                <option value="banned">Banned</option>
              </select>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={isBulkMode ? "default" : "outline"}
                  onClick={() => setIsBulkMode(!isBulkMode)}
                  className={isBulkMode ? "bg-blue-600" : ""}
                >
                  <CheckSquare className="w-4 h-4 mr-1" />
                  Bulk Mode
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedRole('')
                    setSelectedStatus('')
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  Clear All
                </Button>
              </div>
            </div>
          </AdminGlassCard>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <AdminGlassCard>
              <div className="text-center">
                <Users className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-blue-400">{userStats.total}</div>
                <div className="text-slate-400 text-xs">Total</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <UserCheck className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-green-400">{userStats.verified}</div>
                <div className="text-slate-400 text-xs">Verified</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-emerald-400">{userStats.active}</div>
                <div className="text-slate-400 text-xs">Active</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <Clock className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-yellow-400">{userStats.pending}</div>
                <div className="text-slate-400 text-xs">Pending</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <Ban className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-red-400">{userStats.banned}</div>
                <div className="text-slate-400 text-xs">Banned</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <UserCheck className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-purple-400">{userStats.recruiters}</div>
                <div className="text-slate-400 text-xs">Recruiters</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <Users className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-indigo-400">{userStats.students}</div>
                <div className="text-slate-400 text-xs">Students</div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="text-center">
                <AlertTriangle className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-orange-400">{userStats.warnings}</div>
                <div className="text-slate-400 text-xs">Warnings</div>
              </div>
            </AdminGlassCard>
          </div>

          {/* Bulk Select Header */}
          {isBulkMode && (
            <AdminGlassCard>
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSelectAll}
                  className="flex items-center gap-2"
                >
                  {selectedUsers.length === users.length ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  {selectedUsers.length === users.length ? 'Deselect All' : 'Select All'}
                </Button>
                <span className="text-sm text-slate-400">
                  {selectedUsers.length} of {users.length} selected
                </span>
              </div>
            </AdminGlassCard>
          )}

          {/* Enhanced User List */}
          <AdminGlassCard>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-3">
              User Directory
              <span className="text-slate-400 text-sm">({users.length} users)</span>
              {viewMode === 'list' && (
                <Button size="sm" variant="outline" className="ml-auto">
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </Button>
              )}
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {users.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h4 className="text-slate-400 text-lg mb-2">No users found</h4>
                  <p className="text-slate-500">Try adjusting your filters or refresh the page.</p>
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Checkbox for bulk mode */}
                      {isBulkMode && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleSelectUser(user.id)}
                            className="w-5 h-5 flex items-center justify-center"
                          >
                            {selectedUsers.includes(user.id) ? (
                              <CheckSquare className="w-4 h-4 text-blue-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* User Info Header */}
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold text-lg truncate">{user.name || 'Unnamed'}</h4>
                          {user.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {user.warnings > 0 && (
                            <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
                              {user.warnings} warnings
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full capitalize font-medium ${
                            user.role === 'admin' ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50' :
                            user.role === 'recruiter' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/50' :
                            'bg-green-500/20 text-green-300 border border-green-400/50'
                          }`}>
                            {user.role}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize font-medium ${
                            user.status === 'active' ? 'bg-green-500/20 text-green-300 border border-green-400/50' :
                            user.status === 'banned' ? 'bg-red-500/20 text-red-300 border border-red-400/50' :
                            'bg-yellow-500/20 text-yellow-300 border border-yellow-400/50'
                          }`}>
                            {user.status}
                          </span>
                        </div>

                        {/* User Details */}
                        <div className="flex items-center gap-6 text-sm text-slate-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                          {user.lastLogin && (
                            <span>Last Login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                          )}
                          <span>Gigs: {user._count.gigs}</span>
                          <span>Applications: {user._count.applications}</span>
                        </div>

                        {/* Location & Bio */}
                        {(user.location || user.bio) && (
                          <div className="text-sm text-slate-300 mb-3 space-y-1">
                            {user.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{user.location}</span>
                              </div>
                            )}
                            {user.bio && (
                              <div className="text-slate-400 italic">
                                "{user.bio.length > 100 ? user.bio.substring(0, 100) + '...' : user.bio}"
                              </div>
                            )}
                          </div>
                        )}

                        {/* Activities */}
                        <div className="text-xs text-slate-500 mb-3">
                          <div>Last Activity: {user.lastActivity}</div>
                          <div>Logins this week: {user.activity.lastWeek}</div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {user.status === 'pending' && (
                            <Button
                              onClick={() => handleApprove(user.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                          )}

                          {user.status === 'active' ? (
                            <Button
                              onClick={() => handleStatusChange(user.id, 'banned')}
                              size="sm"
                              className="bg-yellow-600 hover:bg-yellow-700 text-white"
                            >
                              <Ban className="w-3 h-3 mr-1" />
                              Ban
                            </Button>
                          ) : user.status === 'banned' ? (
                            <Button
                              onClick={() => handleStatusChange(user.id, 'active')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Unban
                            </Button>
                          ) : null}

                          {user.role !== 'admin' && (
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className="px-3 py-1 text-xs rounded bg-slate-700 text-white border border-slate-600"
                            >
                              <option value="student">Student</option>
                              <option value="recruiter">Recruiter</option>
                            </select>
                          )}

                          <Button
                            onClick={() => handleWarning(user.id, 'Violation detected')}
                            size="sm"
                            variant="outline"
                            className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Warning
                          </Button>

                          <Button
                            onClick={() => handleDelete(user.id)}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Trash className="w-3 h-3 mr-1" />
                            Ban User
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </AdminGlassCard>
        </>
      )}
    </div>
  )
}
