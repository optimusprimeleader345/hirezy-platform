'use client'

import { useEffect, useState } from 'react'
import { Briefcase, FileText, Users, TrendingUp } from 'lucide-react'
import { SaaSCard } from '@/components/cards/SaaSCard'
import { MetricCard } from '@/components/MetricCard'
import { getUser, getRecruiterStats, getGigs } from '@/lib/apiClient'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  company: string
}

interface RecruiterStats {
  postedGigs: number
  receivedApplications: number
  hiredFreelancers: number
  successRate: number
  budgetSpent: number
  avgProjectCost: number
}

interface Gig {
  id: number
  title: string
  company: string
  salary: string
  skills: string[]
  location: string
  postedDate: string
  description: string
}

export default function RecruiterDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<RecruiterStats | null>(null)
  const [gigs, setGigs] = useState<Gig[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, statsData, gigsData] = await Promise.all([
          getUser(),
          getRecruiterStats(),
          getGigs()
        ])
        setUser(userData)
        setStats(statsData)
        setGigs(gigsData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }

    loadData()
  }, [])

  if (!user || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading your dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Recruiter Header */}
      <SaaSCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">{user.company}</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Edit Profile
          </Button>
        </div>
      </SaaSCard>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SaaSCard>
          <MetricCard
            title="Active Job Posts"
            value={stats.postedGigs}
            icon={<Briefcase className="h-8 w-8" />}
            change={12.5}
          />
        </SaaSCard>
        <SaaSCard>
          <MetricCard
            title="Total Applications"
            value={stats.receivedApplications}
            icon={<FileText className="h-8 w-8" />}
            change={8.2}
          />
        </SaaSCard>
        <SaaSCard>
          <MetricCard
            title="Interview Scheduled"
            value={stats.hiredFreelancers}
            icon={<Users className="h-8 w-8" />}
            change={15.3}
          />
        </SaaSCard>
        <SaaSCard>
          <MetricCard
            title="AI Screening Success Rate"
            value={`${stats.successRate}%`}
            icon={<TrendingUp className="h-8 w-8" />}
            change={2.1}
          />
        </SaaSCard>
      </div>

      {/* Job Manager Table */}
      <SaaSCard title="Job Manager">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gigs.map((gig, index) => (
                <tr key={gig.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{gig.title}</div>
                    <div className="text-sm text-gray-500">{gig.salary}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gig.postedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {[8, 2, 0, 1][index] || 0} {/* Fixed applicant counts */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Open
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SaaSCard>

      {/* Quick Actions */}
      <SaaSCard title="Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-16 bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
            <Briefcase className="h-6 w-6 mr-2" />
            Post a New Gig
          </Button>
          <Button className="h-16 bg-green-600 hover:bg-green-700 flex items-center justify-center">
            <FileText className="h-6 w-6 mr-2" />
            Review Applications
          </Button>
          <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
            <Users className="h-6 w-6 mr-2" />
            AI Recommend Candidates
          </Button>
        </div>
      </SaaSCard>
    </div>
  )
}
