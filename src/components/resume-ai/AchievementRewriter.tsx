'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Edit3, Loader2, Star } from 'lucide-react'

interface AchievementData {
  rewrittenAchievements: Array<{
    original: string
    rewritten: string
    starMethod: boolean
    metricsAdded: boolean
  }>
}

interface Props {
  resumeText: string
}

export function AchievementRewriter({ resumeText }: Props) {
  const [data, setData] = useState<AchievementData | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <GlassCard title="Achievement Rewriter (STAR Method)">
      <div className="space-y-6">
        <div className="text-center py-8">
          <Edit3 className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-bold text-white mb-2">Rewrite Achievements with STAR Method</h3>
          <p className="text-white/70">Transform your bullet points into compelling STAR-format achievements</p>
        </div>

        <div className="space-y-4">
          {[
            {
              original: "Worked on React application development",
              rewritten: "Led development of React-based e-commerce platform serving 10,000+ users, implementing responsive design and improving load time by 40%"
            },
            {
              original: "Helped with database optimization",
              rewritten: "Optimized PostgreSQL database queries reducing response time from 800ms to 120ms, improving user experience and server efficiency"
            },
            {
              original: "Contributed to team projects",
              rewritten: "Spearheaded cross-functional collaboration on mobile app launch, coordinating with 5 departments and delivering project 2 weeks ahead of deadline"
            }
          ].map((achievement, index) => (
            <div key={index} className="space-y-3 bg-white/5 border border-white/10 rounded-lg p-4">
              <div>
                <div className="text-white/60 text-xs mb-1">Original:</div>
                <div className="text-white/90 text-sm italic">{achievement.original}</div>
              </div>
              <div>
                <div className="text-white/60 text-xs mb-1 flex items-center">
                  Augmented with STAR + Metrics:
                  <Star className="w-4 h-4 ml-1 text-yellow-400" />
                </div>
                <div className="text-green-400 text-sm font-medium">{achievement.rewritten}</div>
              </div>
              <button className="text-purple-400 text-xs hover:underline">
                Improve This Achievement
              </button>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
