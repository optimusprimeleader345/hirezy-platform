'use client'

import { useState } from 'react'
import { Users, Search, Ban, Trash, Crown, Eye } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { users } from '@/lib/demoData'

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Mock user actions
  const handleSuspendUser = (userId: string) => {
    console.log('Suspend user:', userId)
  }

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId)
  }

  const handlePromoteUser = (userId: string) => {
    console.log('Promote user:', userId)
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' // For now, assume all active

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
        <p className="text-slate-300">Manage students and recruiters on the platform</p>
      </div>

      {/* Filters */}
      <AdminGlassCard>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="recruiter">Recruiters</option>
            <option value="admin">Admins</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </AdminGlassCard>

      {/* Users Table */}
      <AdminGlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold">User</th>
                <th className="pb-3 text-slate-300 font-semibold">Role</th>
                <th className="pb-3 text-slate-300 font-semibold">Status</th>
                <th className="pb-3 text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-slate-400 text-sm">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'recruiter' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        onClick={() => handlePromoteUser(user.id.toString())}
                      >
                        <Crown className="w-4 h-4 mr-1" />
                        Promote
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-amber-600 border-amber-600 text-white hover:bg-amber-700"
                        onClick={() => handleSuspendUser(user.id.toString())}
                      >
                        <Ban className="w-4 h-4 mr-1" />
                        Suspend
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDeleteUser(user.id.toString())}
                      >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.role === 'student').length}</div>
            <div className="text-slate-400">Students</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{users.filter(u => u.role === 'recruiter').length}</div>
            <div className="text-slate-400">Recruiters</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{users.length}</div>
            <div className="text-slate-400">Total Users</div>
          </div>
        </AdminGlassCard>
      </div>
    </div>
  )
}
