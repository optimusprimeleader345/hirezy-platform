'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { Users, Briefcase, TrendingUp } from 'lucide-react'

interface RecruiterStudentBarChartProps {
  isLive?: boolean
}

export function RecruiterStudentBarChart({ isLive }: RecruiterStudentBarChartProps) {
  // Mock data for student vs recruiter growth
  const growthData = [
    { category: 'Students', 'Jan': 1200, 'Feb': 1350, 'Mar': 1520, 'Apr': 1700, 'May': 1900, 'Jun': 2100 },
    { category: 'Recruiters', 'Jan': 450, 'Feb': 480, 'Mar': 520, 'Apr': 580, 'May': 640, 'Jun': 720 }
  ]

  // Transform data for horizontal bar chart
  const barChartData = [
    {
      category: 'Students',
      count: growthData[0]['Jun'],
      growth: '+15.8%',
      color: '#10b981',
      total: growthData[0]['Jun']
    },
    {
      category: 'Recruiters',
      count: growthData[1]['Jun'],
      growth: '+16.2%',
      color: '#3b82f6',
      total: growthData[1]['Jun']
    }
  ]

  const totalUsers = barChartData.reduce((sum, item) => sum + item.total, 0)
  const studentRatio = Math.round((barChartData[0].total / totalUsers) * 100)

  return (
    <AdminGlassCard title="Student vs Recruiter Growth">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-xs text-slate-400">Current Period</span>
        </div>
        <div className="text-xs text-slate-400">
          {studentRatio}% Students
        </div>
      </div>

      <ChartWrapper
        title=""
        data={barChartData}
        dataKey="count"
        type="bar"
        className="h-64"
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        {barChartData.map((item, index) => {
          const Icon = index === 0 ? Users : Briefcase
          return (
            <div key={item.category} className="p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: item.color }} />
                <span className="text-slate-300 text-sm font-medium">{item.category}</span>
              </div>
              <div className="text-xl font-bold" style={{ color: item.color }}>
                {item.total.toLocaleString()}
              </div>
              <div className={`text-xs ${item.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {item.growth}
              </div>
            </div>
          )
        })}
      </div>

      {/* Trend summary */}
      <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Growth Trend</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold">Balanced Growth</span>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Both user segments showing steady month-over-month growth
        </div>
      </div>
    </AdminGlassCard>
  )
}
