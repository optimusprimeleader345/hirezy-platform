'use client'

import { Users, UserCheck, TrendingUp, BarChart3 } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  monthlyGrowth: number
  studentCount: number
  recruiterCount: number
}

interface StatsCardsProps {
  data: AnalyticsData
  isLive: boolean
}

export function StatsCards({ data, isLive }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Total Users</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-blue-400">{data.totalUsers.toLocaleString()}</span>
              <div className="flex items-center text-green-400">
                {isLive && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-1"></div>}
                <span className="text-xs ml-1">Live</span>
              </div>
            </div>
          </div>
          <Users className="w-8 h-8 text-blue-400/60" />
        </div>
        <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(data.totalUsers / 8000 * 100, 100)}%` }}
          />
        </div>
      </AdminGlassCard>

      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Active Users</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-green-400">{data.activeUsers.toLocaleString()}</span>
              <div className="flex items-center text-green-400">
                {isLive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>}
                <span className="text-xs ml-1">Growing</span>
              </div>
            </div>
          </div>
          <UserCheck className="w-8 h-8 text-green-400/60" />
        </div>
        <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(data.activeUsers / data.totalUsers * 100).toFixed(1)}%` }}
          />
        </div>
      </AdminGlassCard>

      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Monthly Growth</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-400">+{data.monthlyGrowth}%</span>
              <div className="flex items-center text-green-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span className="text-xs ml-1">Up</span>
              </div>
            </div>
          </div>
          <TrendingUp className="w-8 h-8 text-purple-400/60" />
        </div>
        <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(data.monthlyGrowth * 10, 100)}%` }}
          />
        </div>
      </AdminGlassCard>

      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-sm">Students vs Recruiters</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-indigo-400">
                {data.studentCount}:{data.recruiterCount}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {Math.round(data.studentCount / (data.studentCount + data.recruiterCount) * 100)}% Students
            </div>
          </div>
          <BarChart3 className="w-8 h-8 text-indigo-400/60" />
        </div>
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-green-600 rounded-full"></div>
            <span className="text-xs text-slate-400 w-12">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 flex-1 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-slate-400 w-12">Recruiters</span>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
