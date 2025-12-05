'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { TrendingUp, DollarSign } from 'lucide-react'

export function RevenueBreakdownChart() {
  // Mock revenue data
  const revenueData = [
    { source: 'Gig Payments', amount: 45650, percentage: 45, color: '#3b82f6' },
    { source: 'Premium Subscriptions', amount: 28120, percentage: 28, color: '#10b981' },
    { source: 'Commission Fees', amount: 18930, percentage: 19, color: '#f59e0b' },
    { source: 'Ad Revenue', amount: 6120, percentage: 6, color: '#ef4444' },
    { source: 'Other', amount: 1180, percentage: 2, color: '#8b5cf6' }
  ]

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <AdminGlassCard title="Revenue Breakdown by Source">
      <div className="space-y-4">
        {revenueData.map((item, index) => (
          <div key={item.source} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <div className="text-white font-medium">{item.source}</div>
                <div className="text-slate-400 text-sm">${item.amount.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-white font-bold">{item.percentage}%</div>
              </div>
              <div className="w-32 bg-slate-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-slate-400">Total Revenue</span>
            </div>
            <div className="text-green-400 font-bold text-2xl">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </AdminGlassCard>
  )
}
