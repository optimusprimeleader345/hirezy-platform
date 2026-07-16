'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Zap, Plus, CheckCircle, Loader2 } from 'lucide-react'

interface MissingSkillsData {
  missingSkills: Array<{
    skill: string
    relevance: number
    marketDemand: string
    learnTime: string
  }>
  recommendedAdditions: string[]
}

interface Props {
  resumeText: string
}

export function MissingSkills({ resumeText }: Props) {
  const [data, setData] = useState<MissingSkillsData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeText && resumeText.trim().length > 0) {
      analyzeSkills()
    }
  }, [resumeText])

  const analyzeSkills = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/resume/missing-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const result: MissingSkillsData = await response.json()
      setData(result)
    } catch (err) {
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GlassCard title="Missing Skills Analysis">
      {!resumeText ? (
        <div className="text-center py-12 text-white/60">
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <p>Analyze missing skills in your resume</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-400" />
          <p className="text-white/70">Analyzing skill gaps...</p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          <div className="space-y-4">
            {data.missingSkills.map((skill, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{skill.skill}</h4>
                  <span className="text-purple-400 text-sm">Relevance: {skill.relevance}/100</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Market Demand:</span>
                    <span className="ml-2 text-green-400">{skill.marketDemand}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Learn Time:</span>
                    <span className="ml-2 text-blue-400">{skill.learnTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Suggested Skills to Add
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.recommendedAdditions.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </GlassCard>
  )
}
