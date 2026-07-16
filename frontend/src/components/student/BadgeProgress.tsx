'use client'

import { Trophy, Star } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface BadgeType {
  id: number
  name: string
  description: string
  progress: number
  max: number
  achieved: boolean
  icon: string
}

interface BadgeProgressProps {
  badges: BadgeType[]
}

export function BadgeProgress({ badges }: BadgeProgressProps) {
  const overallProgress = Math.round(
    (badges.reduce((sum, badge) => sum + (badge.progress / badge.max) * 100, 0) / badges.length)
  )

  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Badge Progress</h3>
        </div>
        <div className="px-3 py-1 bg-white/20 rounded-full">
          <span className="text-sm text-white font-semibold">{overallProgress}%</span>
        </div>
      </div>

      <div className="space-y-4">
        {badges.map((badge) => {
          const percentage = Math.round((badge.progress / badge.max) * 100)

          return (
            <div
              key={badge.id}
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white">{badge.name}</h4>
                    {badge.achieved && (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-xs font-medium">Achieved!</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-white/70 mb-3">{badge.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">
                        Progress: {badge.progress}/{badge.max}
                      </span>
                      <span className="text-white/80 font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          badge.achieved
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                            : 'bg-gradient-to-r from-blue-400 to-purple-400'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {percentage >= 100 && !badge.achieved && (
                    <div className="mt-2 text-center">
                      <span className="text-xs text-yellow-400 font-medium">
                        🎉 Almost there! Complete this milestone to unlock the badge!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {badges.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No badges available</p>
            <p className="text-sm mt-1">Start applying to earn your first badge!</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/60">Overall badge progress</p>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-white/10 rounded-full h-2">
              <div
                className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <span className="text-xs text-white/80">{overallProgress}%</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
