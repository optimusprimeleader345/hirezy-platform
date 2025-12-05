'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  TrendingUp,
  Brain,
  Activity,
  Shield,
  BarChart3,
  DollarSign,
  MapIcon as HeatMap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const monitoringItems = [
  {
    name: 'Platform Growth',
    href: '/admin/monitoring?tab=platform-growth',
    icon: TrendingUp,
    description: 'User growth metrics & trends'
  },
  {
    name: 'AI Health Monitor',
    href: '/admin/monitoring?tab=ai-health',
    icon: Brain,
    description: 'AI system performance & requests'
  },
  {
    name: 'User Activity Heatmap',
    href: '/admin/monitoring?tab=user-heatmap',
    icon: HeatMap,
    description: 'Activity patterns & busy hours'
  },
  {
    name: 'Fraud Detection',
    href: '/admin/monitoring?tab=fraud-detection',
    icon: Shield,
    description: 'Security monitoring & alerts'
  },
  {
    name: 'Skills Trends',
    href: '/admin/monitoring?tab=skills-trends',
    icon: BarChart3,
    description: 'Market skills analysis'
  },
  {
    name: 'Revenue Analytics',
    href: '/admin/monitoring?tab=revenue-analytics',
    icon: DollarSign,
    description: 'Financial performance & commissions'
  }
]

interface MonitoringSidebarProps {
  activeTab: string
}

export function MonitoringSidebar({ activeTab }: MonitoringSidebarProps) {
  return (
    <div className="bg-slate-800/30 border-r border-slate-700 p-6 w-80">
      <h2 className="text-xl font-semibold text-white mb-2">Monitoring Dashboard</h2>
      <p className="text-slate-400 text-sm mb-8">Enterprise analytics & monitoring</p>

      <nav className="space-y-3">
        {monitoringItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.href.split('=')[1]

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block p-4 rounded-lg border transition-all duration-200 hover:border-slate-600',
                isActive
                  ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800/40'
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn(
                  'w-6 h-6 mt-0.5',
                  isActive ? 'text-blue-400' : 'text-slate-500'
                )} />
                <div>
                  <div className="font-medium text-white mb-1">
                    {item.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {item.description}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
        <div className="text-sm text-slate-500">
          <strong className="text-white">Pro Tip:</strong> These metrics update in real-time based on live platform activity.
        </div>
      </div>
    </div>
  )
}
