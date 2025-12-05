import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Zap } from 'lucide-react'
import { AnalyticsCard } from './AnalyticsCard'

const data = [
  { name: 'Completed', value: 87 },
  { name: 'Remaining', value: 13 }
]

const COLORS = ['#10B981', '#E5E7EB']

export function AIPerformanceScore() {
  const performanceData = [
    { category: 'Resume Quality', current: 92, max: 100, color: '#10B981' },
    { category: 'Application Success', current: 87, max: 100, color: '#3B82F6' },
    { category: 'Skill Relevance', current: 85, max: 100, color: '#F59E0B' },
    { category: 'Interview Performance', current: 78, max: 100, color: '#EF4444' }
  ]

  const overallScore = Math.round(performanceData.reduce((acc, item) => acc + item.current, 0) / performanceData.length)

  return (
    <AnalyticsCard title="AI Performance Score" glow={true}>
      <div className="space-y-6">
        {/* Overall Score with Animated Gauge */}
        <div className="relative text-center">
          <div className="relative inline-block">
            {/* Gauge Background */}
            <svg width="140" height="140" className="transform -rotate-90">
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#374151"
                strokeWidth="8"
                className="opacity-30"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="url(#gauge-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 60 * (overallScore / 100)} ${2 * Math.PI * 60}`}
                className="transition-all duration-2000 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))'
                }}
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {overallScore}%
              </span>
              <span className="text-xs text-gray-400 mt-1">Overall</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="space-y-3">
          {performanceData.map((metric, index) => (
            <div key={metric.category} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-white/80">{metric.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white">{metric.current}</span>
                </div>
              </div>
              <div className="relative">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-blue-500/30"
                    style={{ width: `${metric.current}%` }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-cyan-300 mb-2">
            <Zap className="w-3 h-3" />
            AI-Powered Insights
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span>Top 10% among platform users</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-3 h-3 rounded-full bg-blue-400" />
              <span>87% job match compatibility detected</span>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
