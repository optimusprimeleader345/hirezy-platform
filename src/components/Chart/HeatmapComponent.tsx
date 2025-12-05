'use client'

import { GlassCard } from '@/components/cards/GlassCard'

interface HeatmapComponentProps {
  title: string
  data: Array<{
    day: string
    hours: number[]
  }>
  className?: string
}

export function HeatmapComponent({ title, data, className }: HeatmapComponentProps) {
  // Generate color intensity based on activity level
  const getColor = (value: number) => {
    if (value === 0) return 'bg-slate-900'
    if (value <= 5) return 'bg-blue-900/60'
    if (value <= 15) return 'bg-blue-700/70'
    if (value <= 30) return 'bg-cyan-600/80'
    if (value <= 50) return 'bg-green-500/85'
    if (value <= 70) return 'bg-yellow-500/90'
    if (value <= 85) return 'bg-orange-500/95'
    return 'bg-red-500/100'
  }

  const getTextColor = (value: number) => {
    return value > 30 ? 'text-white' : 'text-slate-300'
  }

  // Day labels
  const days = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon']

  // Hour labels (simplified)
  const hours = ['12am', '6am', '12pm', '6pm', '12am']

  return (
    <GlassCard title={title} className={className}>
      <div className="space-y-2">
        <div className="grid grid-cols-[60px_1fr] gap-1 text-xs text-slate-400 mb-4">
          <div></div>
          <div className="flex justify-between px-2">
            {hours.map(hour => (
              <div key={hour} className="w-8 text-center">{hour}</div>
            ))}
          </div>
        </div>

        {data.map((row, rowIndex) => (
          <div key={row.day} className="grid grid-cols-[60px_1fr] gap-1">
            <div className="flex items-center text-xs text-slate-300 font-medium px-2">
              {days[days.length - 1 - rowIndex]}
            </div>
            <div className="grid grid-cols-24 gap-0.5">
              {row.hours.map((hour, hourIndex) => {
                // Show only every 6th hour for readability
                const isVisible = hourIndex % 6 === 0 || hourIndex === 23
                if (!isVisible) return null

                return (
                  <div
                    key={hourIndex}
                    className={`w-8 h-8 rounded-sm ${getColor(hour)} flex items-center justify-center text-xs ${getTextColor(hour)} font-medium transition-all hover:scale-110 border border-slate-700/50`}
                    title={`${row.day} ${hourIndex}:00 - ${hour} activity`}
                  >
                    {hour > 20 ? hour.toFixed(0) : ''}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="flex justify-center items-center mt-4 space-x-6 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-slate-900 rounded-sm border border-slate-700"></div>
            <span className="text-slate-400">Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-700/70 rounded-sm border border-slate-700"></div>
            <span className="text-slate-400">Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500/90 rounded-sm border border-slate-700"></div>
            <span className="text-slate-400">High</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500/100 rounded-sm border border-slate-700"></div>
            <span className="text-slate-400">Peak</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 text-center mt-2">
          User activity heatmap showing busiest hours by day of week
        </div>
      </div>
    </GlassCard>
  )
}
