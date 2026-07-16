'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Users, Eye, CheckCircle, Target, TrendingDown } from 'lucide-react'

export function ConversionFunnelChart() {
  // Mock conversion funnel data
  const funnelStages = [
    {
      name: 'Website Visitors',
      count: 15420,
      percentage: 100,
      rate: '100%',
      color: '#3b82f6',
      icon: Eye,
      description: 'People visiting the platform'
    },
    {
      name: 'User Registrations',
      count: 3890,
      percentage: 25.2,
      rate: '25.2%',
      color: '#8b5cf6',
      icon: Users,
      description: 'Successful user signups'
    },
    {
      name: 'Profile Completion',
      count: 2870,
      percentage: 73.8,
      rate: '73.8%',
      color: '#06b6d4',
      icon: CheckCircle,
      description: 'Users completing their profiles'
    },
    {
      name: 'Gig Applications',
      count: 1250,
      percentage: 43.6,
      rate: '43.6%',
      color: '#10b981',
      icon: Target,
      description: 'Users applying for gigs'
    },
    {
      name: 'Successful Hires',
      count: 540,
      percentage: 43.2,
      rate: '43.2%',
      color: '#f59e0b',
      icon: TrendingDown,
      description: 'Final successful placements'
    }
  ]

  const conversionRate = ((funnelStages[funnelStages.length - 1].count / funnelStages[0].count) * 100).toFixed(1)

  return (
    <AdminGlassCard title="Conversion Funnel Analysis">
      <div className="space-y-6">
        {/* Funnel Visualization */}
        <div className="space-y-2">
          {funnelStages.map((stage, index) => (
            <div key={stage.name} className="relative">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2 w-48">
                  <stage.icon className="w-4 h-4" style={{ color: stage.color }} />
                  <div>
                    <div className="text-white font-medium text-sm">{stage.name}</div>
                    <div className="text-slate-400 text-xs">{stage.description}</div>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 bg-slate-700 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{
                        width: `${stage.percentage}%`,
                        background: `linear-gradient(90deg, ${stage.color}80 0%, ${stage.color} 100%)`
                      }}
                    />
                  </div>
                </div>

                <div className="w-32 text-right">
                  <div className="text-white font-bold">{stage.count.toLocaleString()}</div>
                  <div className="text-sm" style={{ color: stage.color }}>{stage.rate}</div>
                </div>
              </div>

              <div className="ml-48 pl-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Conversion Rate</span>
                  <span>{stage.percentage}% of previous stage</span>
                </div>
                {index < funnelStages.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-slate-600 to-transparent mb-3" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="border-t border-slate-600 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-green-400 font-bold text-2xl">{conversionRate}%</div>
              <div className="text-slate-400 text-sm">Overall Conversion Rate</div>
              <div className="text-slate-500 text-xs mt-1">Visitors to Hires</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-blue-400 font-bold text-2xl">
                {((funnelStages[3].count / funnelStages[2].count) * 100).toFixed(1)}%
              </div>
              <div className="text-slate-400 text-sm">Application Conversion</div>
              <div className="text-slate-500 text-xs mt-1">Profile to Applications</div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="text-purple-400 font-bold text-2xl">
                {((funnelStages[4].count / funnelStages[3].count) * 100).toFixed(1)}%
              </div>
              <div className="text-slate-400 text-sm">Success Rate</div>
              <div className="text-slate-500 text-xs mt-1">Applications to Hires</div>
            </div>
          </div>
        </div>

        {/* Top Drop-off Points */}
        <div className="border-t border-slate-600 pt-4">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" />
            Critical Drop-off Points
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
              <div className="text-red-400 font-semibold text-sm mb-1">Highest Drop-off</div>
              <div className="text-white">Website Visitors → Registrations</div>
              <div className="text-red-300 text-sm mt-1">74.8% drop-off rate</div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-3">
              <div className="text-yellow-400 font-semibold text-sm mb-1">Improvement Needed</div>
              <div className="text-white">Profile Completion → Applications</div>
              <div className="text-yellow-300 text-sm mt-1">43.6% completion rate</div>
            </div>
          </div>
        </div>
      </div>
    </AdminGlassCard>
  )
}
