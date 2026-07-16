import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { GlassCard } from '@/components/cards/GlassCard'

interface ChartWrapperProps {
  title: string
  data: any[]
  dataKey?: string
  className?: string
  type?: 'line' | 'bar' | 'area' | 'radar'
  dataKeys?: string[]
  colors?: string[]
}

export function ChartWrapper({
  title,
  data,
  dataKey,
  className,
  type = 'line',
  dataKeys,
  colors = ['#6EE7FF', '#C084FC']
}: ChartWrapperProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    }

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.2)" />
          <XAxis
            dataKey="skill"
            stroke="rgba(6, 182, 212, 0.8)"
            fontSize={11}
            tickLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
            axisLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
          />
          <YAxis
            stroke="rgba(6, 182, 212, 0.8)"
            fontSize={11}
            tickLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
            axisLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
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
          <Bar
            dataKey={dataKey || 'value'}
            fill={colors[0]}
            stroke={colors[0]}
            strokeWidth={2}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      )
    }

    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
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
          {dataKeys ? dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stackId="1"
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.6}
            />
          )) : (
            <Area
              type="monotone"
              dataKey={dataKey || 'value'}
              stackId="1"
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.6}
            />
          )}
        </AreaChart>
      )
    }

    if (type === 'radar') {
      return (
        <RadarChart {...commonProps}>
          <PolarGrid stroke="rgba(255,255,255,0.3)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fontSize: 11, fill: 'white', fontWeight: 'bold' }}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <PolarRadiusAxis
            angle={45}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.8)' }}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            stroke={colors[0]}
            fill={colors[0]}
            fillOpacity={0.4}
            strokeWidth={3}
            dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px'
            }}
          />
        </RadarChart>
      )
    }

    // Default multiline line chart with neon colors
    const multiLineKeys = dataKeys || [dataKey || 'value']
    const neonColors = ['#06b6d4', '#9333ea', '#10b981', '#f59e0b']

    return (
      <LineChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.2)" />
        <XAxis
          dataKey="month"
          stroke="rgba(6, 182, 212, 0.8)"
          fontSize={11}
          tickLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
          axisLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
        />
        <YAxis
          stroke="rgba(6, 182, 212, 0.8)"
          fontSize={11}
          tickLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
          axisLine={{ stroke: 'rgba(6, 182, 212, 0.3)' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '13px',
            boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)'
          }}
          labelStyle={{ color: 'white' }}
        />
        {multiLineKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={neonColors[index % neonColors.length]}
            strokeWidth={3}
            className="neon-line-animation"
            dot={{
              fill: neonColors[index % neonColors.length],
              strokeWidth: 2,
              stroke: neonColors[index % neonColors.length],
              r: 5,
              filter: 'drop-shadow(0 0 8px ' + neonColors[index % neonColors.length] + ')'
            }}
            activeDot={{
              r: 7,
              fill: neonColors[index % neonColors.length],
              stroke: '#ffffff',
              strokeWidth: 3,
              filter: 'drop-shadow(0 0 12px ' + neonColors[index % neonColors.length] + ')'
            }}
          />
        ))}
      </LineChart>
    )
  }

  return (
    <GlassCard title={title} className={className}>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>

        {/* Neon glow overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent rounded-xl"></div>
      </div>
    </GlassCard>
  )
}
