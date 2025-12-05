'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Zap, Plus, CheckCircle } from 'lucide-react'

interface Props {
  skills: string[]
}

export function RecommendedSkillsList({ skills }: Props) {
  if (skills.length === 0) return null

  return (
    <GlassCard title="Recommended Skills Additions">
      <div className="space-y-4">
        <div className="flex items-center">
          <Zap className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="text-white font-semibold">
            Skills to Consider Adding ({skills.length} recommendations)
          </h3>
        </div>

        <p className="text-white/70 text-sm">
          These skills will complement your current expertise and open new career opportunities.
        </p>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30 hover:bg-green-500/30 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 mr-1" />
              {skill}
            </span>
          ))}
        </div>

        <div className="text-center pt-4">
          <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-colors">
            Add All Recommended Skills
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
