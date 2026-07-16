'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { TrendingDown, AlertTriangle } from 'lucide-react'

interface Props {
  skills: string[]
}

export function MissingSkillsList({ skills }: Props) {
  if (skills.length === 0) return null

  return (
    <GlassCard title="Missing Skills Analysis">
      <div className="space-y-4">
        <div className="flex items-center">
          <TrendingDown className="w-5 h-5 text-red-400 mr-2" />
          <h3 className="text-white font-semibold">
            Skills You Need to Learn ({skills.length} total)
          </h3>
        </div>

        <p className="text-white/70 text-sm">
          These skills will significantly improve your market competitiveness and job-matching potential.
        </p>

        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={skill} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-red-500/20 text-red-400 rounded-full text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <div className="text-white font-medium">{skill}</div>
                  <div className="text-white/60 text-xs">High priority for your career progression</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium mr-2">
                  Essential
                </span>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  📚 Learn
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
