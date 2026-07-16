'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface TrendingSkill {
  id: string
  name: string
  category: string
  growth: number
  demand: string
  jobs: number
  salary: string
  trend: string
}

interface TrendingSkillsListProps {
  skills: TrendingSkill[]
  onSkillClick: (skill: TrendingSkill) => void
}

export function TrendingSkillsList({ skills, onSkillClick }: TrendingSkillsListProps) {
  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-400/50 transition-colors cursor-pointer"
          onClick={() => onSkillClick(skill)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                skill.demand === 'High' ? 'bg-green-500/20 text-green-400' :
                skill.demand === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                #{index + 1}
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">{skill.name}</h4>
                <div className="text-white/60 text-sm">{skill.category} • {skill.jobs.toLocaleString()} jobs</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-white font-medium">{skill.salary}</div>
              <div className="flex items-center justify-end text-sm">
                {skill.trend === 'rising' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-blue-400" />
                )}
                <span className="text-white/70 ml-1">+{skill.growth}%</span>
              </div>
            </div>
          </div>

          {/* Simple inline sparkline */}
          <div className="mt-4 flex items-end space-x-1">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className={`w-2 rounded-t ${
                  skill.demand === 'High' ? 'bg-green-400' :
                  skill.demand === 'Medium' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}
                style={{
                  height: `${Math.max(4, Math.min(32, 8 + (skill.growth / 10) * 2 + 4))}px`
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
