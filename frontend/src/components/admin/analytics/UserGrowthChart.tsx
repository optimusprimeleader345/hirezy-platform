'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { TrendingUp, Users } from 'lucide-react'

interface UserGrowthChartProps {
  isLive?: boolean
}

export function UserGrowthChart({ isLive }: UserGrowthChartProps) {
  // Mock MAU data - Monthly Active Users (last 6 months)
  const mauData = [
    { month: 'Jul', users: 3200 },
    { month: 'Aug', users: 3600 },
    { month: 'Sep', users: 4100 },
    { month: 'Oct', users: 4700 },
    { month: 'Nov', users: 5400 },
    { month: 'Dec', users: 6200 }
  ]

  const totalGrowth = mauData[mauData.length - 1].users - mauData[0].users
  const growthPercentage = Math.round((totalGrowth / mauData[0].users) * 100)

  return (
    <AdminGlassCard title="Monthly Active Users Growth">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-xs text-slate-400">Monthly Trend</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-green-400">+{growthPercentage}%</span>
          <span className="text-xs text-slate-400">6 months</span>
        </div>
      </div>

      <ChartWrapper
        title=""
        data={mauData}
        dataKey="users"
        type="line"
        className="h-64"
      />

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="text-blue-400 text-lg font-bold">
            {mauData[mauData.length - 1].users.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Current MAU</div>
        </div>
        <div className="p-3 bg-slate-800/50 rounded-lg">
          <div className="text-green-400 text-lg font-bold">
            +{totalGrowth.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Growth</div>
        </div>
      </div>
    </AdminGlassCard>
  )
}
