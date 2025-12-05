'use client'

import { TrendingUp, Users, Briefcase, DollarSign } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { adminStats, chartData } from '@/lib/demoData'

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Suite</h1>
        <p className="text-slate-300">Comprehensive platform analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Total Users</div>
            </div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center">
            <Briefcase className="w-8 h-8 text-green-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-white">{adminStats.totalGigs}</div>
              <div className="text-slate-400 text-sm">Total Gigs</div>
            </div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-white">{adminStats.monthlyGrowth}%</div>
              <div className="text-slate-400 text-sm">Monthly Growth</div>
            </div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <div className="text-2xl font-bold text-white">${(adminStats.platformRevenue / 1000).toFixed(0)}K</div>
              <div className="text-slate-400 text-sm">Platform Revenue</div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <AdminGlassCard title="User Growth Analytics">
          <ChartWrapper
            title=""
            data={chartData.adminUsers.map(item => ({
              ...item,
              date: item.month
            }))}
            dataKey="activeUsers"
            className="h-64"
          />
        </AdminGlassCard>

        {/* Skill Trends - Mock Radial Chart */}
        <AdminGlassCard title="Skill Trends">
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <div className="text-white text-lg">React Developers</div>
              <div className="text-slate-400 text-sm">Growing Skill</div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Heatmap & Success Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand vs Supply Heatmap */}
        <AdminGlassCard title="Demand vs Supply Heatmap">
          <div className="space-y-3">
            {['React', 'Node.js', 'Python', 'UI/UX', 'DevOps'].map(skill => (
              <div key={skill} className="flex items-center justify-between">
                <span className="text-white">{skill}</span>
                <div className="flex gap-1">
                  {Array.from({length: 5}).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-3 rounded ${
                        i < 3 ? 'bg-red-500' : i === 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-slate-400">
            <span>High Demand - Low Supply</span>
            <span>High Demand - High Supply</span>
          </div>
        </AdminGlassCard>

        {/* Gig Success Rates */}
        <AdminGlassCard title="Gig Success Rates">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-300">Completed Projects</span>
              <span className="text-green-400 font-semibold">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Successful Hires</span>
              <span className="text-blue-400 font-semibold">65%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">On-time Delivery</span>
              <span className="text-purple-400 font-semibold">82%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Client Satisfaction</span>
              <span className="text-yellow-400 font-semibold">4.8/5</span>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Revenue Patterns */}
      <AdminGlassCard title="Revenue & Earning Patterns">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">$245k</div>
            <div className="text-slate-400">Monthly Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">$89.50</div>
            <div className="text-slate-400">Avg Transaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">$156</div>
            <div className="text-slate-400">Freelancer Earning (avg)</div>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
