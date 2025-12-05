'use client'

interface SummaryCardProps {
  title: string
  value: string | number
  delta: string
}

export function SummaryCard({ title, value, delta }: SummaryCardProps) {
  const isPositive = delta.includes('+')

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white/70 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {delta}
        </span>
      </div>
    </div>
  )
}
