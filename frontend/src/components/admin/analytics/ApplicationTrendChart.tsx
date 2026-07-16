'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { Briefcase, Users, TrendingUp } from 'lucide-react'

interface ApplicationTrendChartProps {
  isLive?: boolean
}

export function ApplicationTrendChart({ isLive }: ApplicationTrendChartProps) {
  // Mock data for job postings and applications trend
  const trendData = [
    { month: 'Oct', jobPostings: 45, applications: 320, hired: 8 },
    { month: 'Nov', jobPostings: 52, applications: 380, hired: 12 },
    { month: 'Dec', jobPostings: 48, applications: 410, hired: 15 },
    { month: 'Jan', jobPostings: 61, applications: 480, hired: 18 },
    { month: 'Feb', jobPostings: 55, applications: 520, hired: 16 },
    { month: 'Mar', jobPostings: 58, applications: 560, hired: 20 }
  ]

  const currentData = trendData[trendData.length - 1]
  const previousData = trendData[trendData.length - 2]

  const jobGrowth = Math.round(((currentData.jobPostings - previousData.jobPostings) / previousData.jobPostings) * 100)
  const appGrowth = Math.round(((currentData.applications - previousData.applications) / previousData.applications) * 100)
  const conversionRate = ((currentData.hired / currentData.applications) * 100).toFixed(1)

  return (
    <AdminGlassCard title="Job Postings & Applications Trend">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-xs text-slate-400">Dual-axis Trend</span>
        </div>
        <div className="text-xs text-slate-400">
          Conversion Rate: <span className="text-blue-400 font-semibold">{conversionRate}%</span>
        </div>
      </div>

      <ChartWrapper
        title=""
        data={trendData}
        dataKey="applications"
        dataKeys={['jobPostings', 'applications']}
        type="line"
        className="h-64"
      />

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 text-sm">Jobs Posted</span>
          </div>
          <div className="text-xl font-bold text-purple-400">{currentData.jobPostings}</div>
          <div className={`text-xs ${jobGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {jobGrowth > 0 ? '+' : ''}{jobGrowth}%
          </div>
        </div>

        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300 text-sm">Applications</span>
          </div>
          <div className="text-xl font-bold text-blue-400">{currentData.applications.toLocaleString()}</div>
          <div className={`text-xs ${appGrowth > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {appGrowth > 0 ? '+' : ''}{appGrowth}%
          </div>
        </div>

        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-slate-300 text-sm">Successful Hires</span>
          </div>
          <div className="text-xl font-bold text-green-400">{currentData.hired}</div>
          <div className="text-xs text-slate-400">This month</div>
        </div>
      </div>

      {/* Application pipeline summary */}
      <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Hiring Pipeline Health</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold">Strong</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>Applications per job: <strong>{Math.round(currentData.applications / currentData.jobPostings)}</strong></span>
          <span>Hire rate: <strong>{((currentData.hired / currentData.applications) * 100).toFixed(1)}%</strong></span>
        </div>
      </div>
    </AdminGlassCard>
  )
}
