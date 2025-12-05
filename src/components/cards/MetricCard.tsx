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
    <div className={cn('relative overflow-hidden bg-gradient-to-br from-[#1A1D21]/80 to-[#141619]/80 backdrop-blur-xl border border-[#23262B]/50 rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:transform hover:translate-y-[-2px] hover:shadow-[0_6px_24px_rgba(62,255,168,0.1)] border-b-2 border-b-[#3EFFA8]/30 transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-br before:from-[#3EFFA8]/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300', className)}>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 pr-3">
          <p className="text-sm font-medium text-[#C9CFD6]/80 mb-1">{title}</p>
          <p className="text-3xl font-bold text-[#FFFFFF] leading-none truncate">
            {typeof value === 'number' ? Math.round(Number(animatedValue)) : animatedValue}
            {typeof value === 'number' && title.toLowerCase().includes('rate') && '%'}
          </p>
          {change !== undefined && (
            <div className="mt-2 flex flex-col gap-1">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#3EFFA8]/20 to-[#3EFFA8]/10 text-[#3EFFA8] border border-[#3EFFA8]/20 shadow-[0_2px_8px_rgba(62,255,168,0.2)] w-fit">
                {change >= 0 ? '+' : ''}{change}%
              </span>
              <span className="text-[#C9CFD6]/70 text-xs">from last month</span>
            </div>
          )}
        </div>
        {icon && <div className="relative flex-shrink-0 self-start mt-1">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3EFFA8]/15 to-[#23262B]/40 border border-[#3EFFA8]/25 flex items-center justify-center text-[#C9CFD6] shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] backdrop-blur-sm">
            <div className="w-6 h-6 flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>}
      </div>
    </div>
  )
}
