'use client'

interface TrendData {
  month: string
  value: number
}

interface TrendChartProps {
  data: TrendData[]
  selectedSkill?: string
}

export function TrendChart({ data, selectedSkill = 'React' }: TrendChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">
        {selectedSkill} Popularity Trends (12 Months)
      </h3>
      <p className="text-white/60 text-sm mb-6">
        Monthly demand percentage from Jan to Dec 2024
      </p>

      <div className="flex items-end space-x-3 h-48">
        {data.map((point, index) => (
          <div key={point.month} className="flex-1 flex flex-col items-center">
            <div className="text-xs text-white/40 mb-2">{point.value}</div>
            <div
              className="w-full bg-gradient-to-t from-purple-600 to-blue-600 rounded-t transition-all duration-500 hover:opacity-80"
              style={{
                height: `${(point.value / maxValue) * 100}%`,
                minHeight: '4px'
              }}
              title={`${point.month}: ${point.value}`}
            ></div>
            <div className="text-xs text-white/60 mt-2">{point.month.split(' ')[0]}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-white/50 text-center">
        Values normalized from 80 (base) to 110 (peak)
      </div>
    </div>
  )
    </div>
  )
}
