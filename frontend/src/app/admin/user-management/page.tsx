'use client'

import { useState, useEffect } from 'react'
import { Users, UserCheck, UserX, Shield, Eye, AlertTriangle, Search, Filter, RefreshCw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

interface User {
  id: string
  name?: string
  email: string
  role: string
  status: 'active' | 'suspended'
  createdAt: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingUsers, setUpdatingUsers] = useState<Set<string>>(new Set())

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (roleFilter !== 'all') params.append('role', roleFilter)

      const response = await fetch(`/api/admin/users/list?${params}`)
      if (!response.ok) throw new Error('Failed to fetch users')

      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      toast.error('Failed to load users')
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: string) => {
    if (updatingUsers.has(userId)) return

    try {
      setUpdatingUsers(prev => new Set(prev).add(userId))

      const response = await fetch('/api/admin/users/update-role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole })
      })

      if (!response.ok) throw new Error('Failed to update role')

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      ))

      toast.success(`Role updated to ${newRole}`)
    } catch (error) {
      toast.error('Failed to update user role')
      console.error('Error updating role:', error)
    } finally {
      setUpdatingUsers(prev => {
        const next = new Set(prev)
        next.delete(userId)
        return next
      })
    }
  }

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    if (updatingUsers.has(userId)) return

    try {
      setUpdatingUsers(prev => new Set(prev).add(userId))

      const response = await fetch('/api/admin/users/toggle-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      if (!response.ok) throw new Error('Failed to update status')

      const newStatus = currentStatus === 'active' ? 'suspended' : 'active'

      // Update local state
      setUsers(prev => prev.map(user =>
        user.id === userId ? { ...user, status: newStatus as 'active' | 'suspended' } : user
      ))

      toast.success(`User ${newStatus === 'active' ? 'activated' : 'suspended'}`)
    } catch (error) {
      toast.error('Failed to update user status')
      console.error('Error updating status:', error)
    } finally {
      setUpdatingUsers(prev => {
        const next = new Set(prev)
        next.delete(userId)
        return next
      })
    }
  }

  const handleViewProfile = (userId: string) => {
    // This would navigate to a user profile page
    toast.info('View Profile functionality would go here')
  }

  useEffect(() => {
    fetchUsers()
  }, [searchTerm, roleFilter])

  const getRoleBadge = (role: string) => {
    const variants = {
      student: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      recruiter: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      admin: 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
    }
    return variants[role as keyof typeof variants] || variants.student
  }

  const getStatusIndicator = (status: string) => {
    return status === 'active' ? (
      <UserCheck className="w-4 h-4 text-green-400" />
    ) : (
      <UserX className="w-4 h-4 text-red-400" />
    )
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-400" />
            User Management
          </h1>
          <p className="text-slate-300">Manage user roles, permissions, and account status</p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400/60" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-400/60" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Suspended</p>
              <p className="text-2xl font-bold text-red-400">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
            <UserX className="w-8 h-8 text-red-400/60" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Admins</p>
              <p className="text-2xl font-bold text-purple-400">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-purple-400/60" />
          </div>
        </AdminGlassCard>
      </div>

      {/* Filters */}
      <AdminGlassCard>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-36 bg-slate-800 border-slate-700">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="recruiter">Recruiters</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-slate-800 border-slate-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </AdminGlassCard>

      {/* Users Table */}
      <AdminGlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Users ({users.length})</h3>

          {users.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No users found matching the current filters.
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-800/70 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* User Info */}
                    <div className="space-y-1">
                      <div className="font-medium text-white">
                        {user.name || 'Unnamed User'}
                      </div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                      <div className="text-xs text-slate-500">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex justify-center">
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center justify-center gap-2">
                      <Switch
                        checked={user.status === 'active'}
                        onCheckedChange={() => toggleUserStatus(user.id, user.status)}
                        disabled={updatingUsers.has(user.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <div className={`flex items-center gap-1 ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {getStatusIndicator(user.status)}
                        <span className="text-sm capitalize">{user.status}</span>
                      </div>
                    </div>

                    {/* Change Role */}
                    <div className="flex justify-center">
                      <Select
                        value={user.role}
                        onValueChange={(value) => updateUserRole(user.id, value)}
                        disabled={updatingUsers.has(user.id)}
                      >
                        <SelectTrigger className="w-32 bg-slate-700 border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(user.id)}
                        className="border-slate-600 hover:bg-slate-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminGlassCard>
    </div>
  )
}
