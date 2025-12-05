'use client'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { GlassCard } from '@/components/cards/GlassCard'

interface ChartWrapperProps {
  title: string
  data: any[]
  dataKey: string
  className?: string
}

export function ChartWrapper({ title, data, dataKey, className }: ChartWrapperProps) {
  return (
    <GlassCard title={title} className={className}>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <YAxis
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
              labelStyle={{ color: 'white' }}
            />
            <Legend
              wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#6EE7FF"
              strokeWidth={3}
              dot={{
                fill: '#6EE7FF',
                strokeWidth: 2,
                stroke: '#6EE7FF',
                r: 6
              }}
              activeDot={{
                r: 8,
                fill: '#C084FC',
                stroke: '#6EE7FF',
                strokeWidth: 2
              }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Neon glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rounded-xl"></div>
      </div>
    </GlassCard>
  )
}
