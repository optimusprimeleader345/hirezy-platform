'use client'

import { Star, Target, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface SkillScoreVisualizationProps {
  skillScore: number
  averageScoreIndustry?: number
}

export function SkillScoreVisualization({
  skillScore,
  averageScoreIndustry = 72
}: SkillScoreVisualizationProps) {
  const getScoreLevel = (score: number): { level: string; color: string; icon: string } => {
    if (score >= 90) return { level: 'Expert', color: 'text-green-400', icon: '⭐' }
    if (score >= 80) return { level: 'Advanced', color: 'text-blue-400', icon: '💪' }
    if (score >= 70) return { level: 'Intermediate', color: 'text-yellow-500', icon: '🎯' }
    if (score >= 60) return { level: 'Developing', color: 'text-orange-400', icon: '📈' }
    return { level: 'Beginner', color: 'text-red-400', icon: '🌱' }
  }

  const scoreLevel = getScoreLevel(skillScore)
  const industryLevel = getScoreLevel(averageScoreIndustry)

  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Skill Score</h3>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{skillScore}</div>
          <div className="text-xs text-white/60">out of 100</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-white/70 mb-2">Your Progress</div>
        <div className="relative">
          <div className="w-full bg-white/10 rounded-full h-4">
            <div
              className="h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-1000"
              style={{ width: `${skillScore}%` }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-4 flex items-center justify-center">
            <span className={`text-sm font-bold text-white ${scoreLevel.color}`}>
              {scoreLevel.icon} {scoreLevel.level}
            </span>
          </div>
        </div>
      </div>

      {/* Industry Comparison */}
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-white/80">Industry Average</div>
          <div className="text-sm text-white/60 flex items-center">
            <Star className="h-4 w-4 mr-1" />
            {averageScoreIndustry}
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 mb-2">
          <div
            className="h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
            style={{ width: `${averageScoreIndustry}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Your Score</span>
          <span className={skillScore > averageScoreIndustry ? 'text-green-400' : 'text-yellow-400'}>
            {skillScore > averageScoreIndustry ? 'Above Average!' : 'Keep Improving!'}
          </span>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">4.8</div>
          <div className="text-xs text-white/60">Avg Rating</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-white">23</div>
          <div className="text-xs text-white/60">Projects</div>
        </div>
      </div>

      {/* Improvement suggestions */}
      <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-400/30">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">Next Steps</span>
        </div>
        <ul className="text-xs text-white/80 space-y-1">
          <li>• Complete 2 more projects to reach 80</li>
          <li>• Take advanced React certification</li>
          <li>• Contribute to open-source</li>
        </ul>
      </div>
    </GlassCard>
  )
}
