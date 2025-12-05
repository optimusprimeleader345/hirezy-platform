'use client'

import { useState, useEffect } from 'react'
import { Users, TrendingUp, Activity, DollarSign, Target, AlertTriangle, Crown, Star, MapPin, Calendar, Phone, Mail, ExternalLink } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { users } from '@/lib/demoData'

interface CustomerProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: 'student' | 'recruiter'
  status: 'active' | 'inactive' | 'premium'
  reputation: number
  lifetimeValue: number
  totalGigs: number
  completedGigs: number
  avgRating: number
  location: string
  joinedDate: string
  lastActive: string
  phone?: string
  website?: string
  linkedin?: string
}

interface CustomerMetrics {
  totalCustomers: number
  activeUsers: number
  premiumUsers: number
  averageLifetimeValue: number
  churnRate: number
  newCustomersThisMonth: number
}

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'recruiter'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'premium'>('all')

  const customerMetrics: CustomerMetrics = {
    totalCustomers: 1578412,
    activeUsers: 892439,
    premiumUsers: 89243,
    averageLifetimeValue: 834,
    churnRate: 12.4,
    newCustomersThisMonth: 28492
  }

  const customerProfiles: CustomerProfile[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      avatar: '🧑‍💼',
      role: 'student',
      status: 'premium',
      reputation: 98,
      lifetimeValue: 1247,
      totalGigs: 45,
      completedGigs: 42,
      avgRating: 4.9,
      location: 'San Francisco, CA',
      joinedDate: '2023-03-15',
      lastActive: '2 hours ago',
      phone: '+1-555-0123',
      website: 'sarah-chen.dev',
      linkedin: 'linkedin.com/in/sarahchen'
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      email: 'marcus@techhire.com',
      avatar: '👨‍💻',
      role: 'recruiter',
      status: 'active',
      reputation: 95,
      lifetimeValue: 5890,
      totalGigs: 127,
      completedGigs: 125,
      avgRating: 4.8,
      location: 'Austin, TX',
      joinedDate: '2022-11-08',
      lastActive: '1 day ago',
      phone: '+1-555-0456'
    },
    {
      id: '3',
      name: 'Emma Watson',
      email: 'emma.w@example.com',
      avatar: '👩‍🎓',
      role: 'student',
      status: 'active',
      reputation: 87,
      lifetimeValue: 456,
      totalGigs: 12,
      completedGigs: 10,
      avgRating: 4.7,
      location: 'London, UK',
      joinedDate: '2024-01-23',
      lastActive: '30 minutes ago',
      linkedin: 'linkedin.com/in/emmawatson'
    },
    {
      id: '4',
      name: 'TechCorp Inc.',
      email: 'hr@techcorp.com',
      avatar: '🏢',
      role: 'recruiter',
      status: 'premium',
      reputation: 99,
      lifetimeValue: 15678,
      totalGigs: 289,
      completedGigs: 285,
      avgRating: 4.9,
      location: 'Seattle, WA',
      joinedDate: '2022-07-12',
      lastActive: '5 hours ago',
      phone: '+1-555-0789'
    },
    {
      id: '5',
      name: 'Alex Thompson',
      email: 'alex.thompson@outlook.com',
      avatar: '👻',
      role: 'student',
      status: 'inactive',
      reputation: 72,
      lifetimeValue: 178,
      totalGigs: 8,
      completedGigs: 6,
      avgRating: 4.2,
      location: 'Toronto, CA',
      joinedDate: '2023-09-04',
      lastActive: '23 days ago'
    }
  ]

  const filteredCustomers = customerProfiles.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === 'all' || customer.role === filterRole
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'premium':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleBadge = (role: string) => {
    return role === 'student'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-orange-100 text-orange-800'
  }

  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Customer 360 Dashboard</h1>
          <p className="text-slate-300">Complete customer profiles, journey mapping, and lifetime value analytics</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">Last sync: 2 minutes ago</div>
          <Button className="bg-gradient-to-r from-green-600 to-teal-600">
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Customer Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-blue-400">{customerMetrics.totalCustomers.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Total Customers</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Activity className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-green-400">{customerMetrics.activeUsers.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Active Users</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Crown className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-purple-400">{customerMetrics.premiumUsers.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Premium Users</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-yellow-400">${customerMetrics.averageLifetimeValue}</div>
            <div className="text-slate-400 text-xs">Avg LTV</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-red-400">{customerMetrics.churnRate}%</div>
            <div className="text-slate-400 text-xs">Churn Rate</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-teal-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-teal-400">+{customerMetrics.newCustomersThisMonth.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">New This Month</div>
          </div>
        </AdminGlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters and Search */}
        <AdminGlassCard>
          <h3 className="text-white font-semibold mb-4">Filters & Search</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Search</label>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name, email, location..."
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="recruiter">Recruiters</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 text-sm mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <Button
              onClick={() => {
                setSearchTerm('')
                setFilterRole('all')
                setFilterStatus('all')
              }}
              className="w-full bg-slate-700 hover:bg-slate-600"
            >
              Clear Filters
            </Button>
          </div>
        </AdminGlassCard>

        {/* Customer List */}
        <div className="lg:col-span-3">
          <AdminGlassCard>
            <h3 className="text-white font-semibold mb-4">Customer Profiles ({filteredCustomers.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedCustomer?.id === customer.id
                      ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500/50'
                      : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                        {customer.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-semibold">{customer.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusBadge(customer.status)}`}>
                            {customer.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full capitalize ${getRoleBadge(customer.role)}`}>
                            {customer.role}
                          </span>
                        </div>
                        <div className="text-slate-400 text-sm mb-2">{customer.email}</div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-400">
                            <MapPin className="w-3 h-3" />
                            {customer.location}
                          </div>
                          <div className="flex items-center gap-1">
                            {getStars(customer.avgRating)}
                            <span className="text-slate-400 ml-1">({customer.avgRating})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-400">${customer.lifetimeValue}</div>
                      <div className="text-sm text-slate-400">Lifetime Value</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t border-slate-700">
                    <div>
                      <div className="text-xs text-slate-400">Reputation</div>
                      <div className="text-white font-semibold">{customer.reputation}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Completed Gigs</div>
                      <div className="text-white font-semibold">{customer.completedGigs}/{customer.totalGigs}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Last Active</div>
                      <div className="text-white font-semibold">{customer.lastActive}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </div>
      </div>

      {/* Detailed Customer Profile */}
      {selectedCustomer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdminGlassCard title={`Customer Profile: ${selectedCustomer.name}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                    {selectedCustomer.avatar}
                  </div>
                  <div className="text-white font-semibold">{selectedCustomer.name}</div>
                  <div className="text-slate-400 text-sm">{selectedCustomer.role.charAt(0).toUpperCase() + selectedCustomer.role.slice(1)}</div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-slate-400 text-xs">LIFETIME VALUE</div>
                    <div className="text-2xl font-bold text-green-400">${selectedCustomer.lifetimeValue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">COMPLETION RATE</div>
                    <div className="text-white font-semibold">{((selectedCustomer.completedGigs / selectedCustomer.totalGigs) * 100).toFixed(0)}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-slate-400 text-xs">AVERAGE RATING</div>
                    <div className="flex items-center gap-1 mb-1">
                      {getStars(selectedCustomer.avgRating)}
                    </div>
                    <div className="text-white text-lg font-semibold">{selectedCustomer.avgRating}/5.0</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">REPUTATION SCORE</div>
                    <div className="text-purple-400 text-lg font-bold">{selectedCustomer.reputation}</div>
                    <div className="w-16 h-2 bg-slate-700 rounded-full">
                      <div className={`h-2 rounded-full bg-purple-400`} style={{ width: `${selectedCustomer.reputation}%` }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-slate-400 text-xs flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      CONTACT
                    </div>
                    <div className="text-white text-sm">{selectedCustomer.email}</div>
                    {selectedCustomer.phone && (
                      <div className="text-white text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {selectedCustomer.phone}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      LOCATION
                    </div>
                    <div className="text-white text-sm">{selectedCustomer.location}</div>
                  </div>
                </div>
              </div>

              {/* Customer Journey Timeline */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Customer Journey</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white font-semibold text-sm">Account Created</div>
                      <div className="text-slate-400 text-xs">Joined {selectedCustomer.joinedDate}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white font-semibold text-sm">First Gig Completed</div>
                      <div className="text-slate-400 text-xs">2 weeks after join</div>
                    </div>
                  </div>
                  {selectedCustomer.status === 'premium' && (
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-white font-semibold text-sm">Premium Upgrade</div>
                        <div className="text-slate-400 text-xs">30 days after first gig</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white font-semibold text-sm">Last Active</div>
                      <div className="text-slate-400 text-xs">{selectedCustomer.lastActive}</div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>

          <AdminGlassCard title="Quick Actions">
            <div className="space-y-3">
              {[
                { label: 'Send Message', action: () => {}, color: 'bg-blue-600 hover:bg-blue-700' },
                { label: 'View All Gigs', action: () => {}, color: 'bg-green-600 hover:bg-green-700' },
                { label: 'Edit Profile', action: () => {}, color: 'bg-purple-600 hover:bg-purple-700' },
                { label: 'Premium Discount', action: () => {}, color: 'bg-yellow-600 hover:bg-yellow-700' },
                { label: 'Export Data', action: () => {}, color: 'bg-teal-600 hover:bg-teal-700' },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`w-full p-3 ${action.color} rounded-lg text-white font-medium transition-colors`}
                >
                  {action.label}
                </button>
              ))}

              {/* Linked Accounts */}
              {selectedCustomer.website && (
                <div className="pt-4 border-t border-slate-700">
                  <h5 className="text-white font-semibold mb-3">Linked Accounts</h5>
                  <div className="space-y-2">
                    {selectedCustomer.website && (
                      <a href={`https://${selectedCustomer.website}`} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Portfolio Website
                      </a>
                    )}
                    {selectedCustomer.linkedin && (
                      <a href={`https://${selectedCustomer.linkedin}`} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AdminGlassCard>
        </div>
      )}
    </div>
  )
}
