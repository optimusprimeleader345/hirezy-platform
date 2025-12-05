import { ReactNode, useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon?: ReactNode
  className?: string
}

export function MetricCard({ title, value, change, icon, className = '' }: MetricCardProps) {
  const [animatedValue, setAnimatedValue] = useState(typeof value === 'number' ? 0 : value)

  useEffect(() => {
    if (typeof value === 'number') {
      const numValue = value
      const interval = setInterval(() => {
        setAnimatedValue((prev: any) => {
          const numPrev = Number(prev)
          if (numPrev >= numValue) return numValue
          return numPrev + numValue / 50
        })
      }, 10)

      return () => clearInterval(interval)
    } else {
      setAnimatedValue(value)
    }
  }, [value])

  return (
    <div className={cn('glass-card neon-glow rounded-xl p-6 hover:scale-105 transition-transform duration-200', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="text-3xl font-bold text-gradient mt-1">
            {typeof value === 'number' ? Math.round(Number(animatedValue)) : animatedValue}
            {typeof value === 'number' && title.toLowerCase().includes('rate') && '%'}
          </p>
          {change !== undefined && (
            <div className={cn('flex items-center text-sm mt-2', change >= 0 ? 'text-green-400' : 'text-red-400')}>
              {change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              {Math.abs(change)}% from last month
            </div>
          )}
        </div>
        {icon && <div className="text-white/80">{icon}</div>}
      </div>
    </div>
  )
}
