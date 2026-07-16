import { AnalyticsCard } from './AnalyticsCard'
import { Flame, Calendar, TrendingUp } from 'lucide-react'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weeks = ['W1', 'W2', 'W3', 'W4']

const activityData: number[][] = [
  [1, 3, 2, 4], // Sun
  [3, 5, 4, 2],
  [2, 4, 3, 5],
  [1, 2, 4, 3],
  [3, 1, 5, 4],
  [4, 2, 3, 1],
  [2, 4, 1, 3]
]

const getIntensityStyle = (level: number, isHovered: boolean) => {
  const baseColors = {
    0: 'from-gray-700 to-gray-600',
    1: 'from-emerald-600 to-emerald-500',
    2: 'from-green-500 to-green-400',
    3: 'from-blue-500 to-blue-400',
    4: 'from-purple-500 to-purple-400',
    5: 'from-orange-500 to-orange-400'
  }

  const color = baseColors[level as keyof typeof baseColors] || baseColors[5]

  return {
    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
    className: `bg-gradient-to-br ${color} ${isHovered ? 'scale-110 shadow-lg shadow-current/50' : 'hover:scale-105'} transition-all duration-300 cursor-pointer`,
    glow: level >= 4 ? `0 0 8px rgba(${level === 4 ? '139, 92, 246' : '249, 115, 22'}, 0.4)` : undefined
  }
}

export function WeeklyActivityHeatmap() {
  const totalActivities = activityData.flat().reduce((sum, val) => sum + val, 0)
  const maxActivityDay = activityData.reduce((max, day, index) => day.reduce((a, b) => a + b, 0) > max.reduce((a, b) => a + b, 0) ? day : max, activityData[0])
  const mostActiveDay = daysOfWeek[activityData.indexOf(maxActivityDay)]
  const avgActivity = Math.round(totalActivities / (daysOfWeek.length * weeks.length))

  return (
    <AnalyticsCard title="Weekly Activity Heatmap">
      <div className="space-y-4">
        {/* Header with stats */}
        <div className="flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>Total: {totalActivities} activities</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span>Avg: {avgActivity}/week</span>
          </div>
        </div>

        {/* Enhanced Heatmap */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span></span>
            {weeks.map(week => (
              <span key={week} className="w-8 text-center font-mono">{week}</span>
            ))}
          </div>

          {daysOfWeek.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-2">
              <div className="w-10 text-xs text-gray-300 font-mono text-right">{day}</div>
              <div className="flex gap-1.5">
                {weeks.map((week, weekIndex) => {
                  const activity = activityData[dayIndex][weekIndex]
                  const isHighest = activity === Math.max(...activityData.flat())
                  return (
                    <div
                      key={week}
                      className={`relative w-8 h-8 rounded-lg transform transition-all duration-300 hover:scale-110 ${
                        getIntensityStyle(activity, false).className
                      } ${isHighest ? 'ring-2 ring-yellow-400 ring-opacity-75' : ''}`}
                      style={{
                        boxShadow: getIntensityStyle(activity, false).glow
                      }}
                      title={`${day} ${week}: ${activity} activities ${isHighest ? '(highest)' : ''}`}
                    >
                      {activity > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-white opacity-80">
                            {activity}
                          </span>
                        </div>
                      )}
                      {isHighest && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
                          <span className="text-[8px] font-bold text-black">★</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend with activity insights */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-semibold text-white flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Activity Legend
            </h4>
            <div className="text-xs text-cyan-300">
              Most active: {mostActiveDay}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <span className="text-xs text-gray-400">Less</span>
            <div className="flex gap-1">
              {[0, 1, 3, 5].map(level => (
                <div
                  key={level}
                  className={`w-4 h-4 rounded ${getIntensityStyle(level, false).className} flex items-center justify-center`}
                  title={`${level} activities`}
                >
                  {level > 0 && <span className="text-[8px] font-bold text-white">{level}</span>}
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400">More</span>
          </div>

          {/* Activity insights */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Consistency Score</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div className="w-8/12 h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 font-semibold">67%</span>
              </div>
            </div>
            <div className="text-gray-400 text-[11px]">
              You're most active on {mostActiveDay}s. Try increasing weekday activity to improve consistency!
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
