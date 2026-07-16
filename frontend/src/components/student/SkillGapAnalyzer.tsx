'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { BarChart3, Lightbulb, Users, TrendingUp, Check, X } from 'lucide-react'

interface SkillGapResponse {
  currentSkills: string[]
  requiredSkills: string[]
  gapScore: number
  missingSkills: string[]
  roadmap: Array<{
    phase: string
    skills: string[]
    timeline: string
    resources: string[]
  }>
}

export function SkillGapAnalyzer() {
  const [careerGoal, setCareerGoal] = useState('')
  const [analysis, setAnalysis] = useState<SkillGapResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async () => {
    if (!careerGoal.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/skill-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ careerGoal })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data: SkillGapResponse = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const getGapColor = (score: number) => {
    if (score < 30) return 'text-red-400'
    if (score < 50) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getGapBgColor = (score: number) => {
    if (score < 30) return 'from-red-500/10 to-red-600/10'
    if (score < 50) return 'from-yellow-500/10 to-yellow-600/10'
    return 'from-green-500/10 to-green-600/10'
  }

  return (
    <GlassCard title="AI Skill Gap Analyzer">
      <div className="space-y-6">
        <p className="text-white/80 text-sm">
          Analyze your current skills against your career goals and get a personalized skill development roadmap.
        </p>

        {/* Career Goal Input */}
        <div className="space-y-3">
          <label className="text-white font-medium text-sm">Your Career Goal</label>
          <div className="flex gap-3">
            <select
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            >
              <option value="" className="bg-gray-800">Select a career path...</option>
              <option value="frontend developer" className="bg-gray-800">Frontend Developer</option>
              <option value="backend developer" className="bg-gray-800">Backend Developer</option>
              <option value="full stack developer" className="bg-gray-800">Full Stack Developer</option>
              <option value="ui/ux designer" className="bg-gray-800">UI/UX Designer</option>
              <option value="data scientist" className="bg-gray-800">Data Scientist</option>
            </select>
            <button
              onClick={handleAnalyze}
              disabled={loading || !careerGoal}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <>
            {/* Gap Score */}
            <div className={`bg-gradient-to-r ${getGapBgColor(analysis.gapScore)} border border-purple-500/20 rounded-lg p-6`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getGapColor(analysis.gapScore)}`}>
                  {analysis.gapScore}%
                </div>
                <div className="text-white/80 text-sm mt-1">Skill Gap Score</div>
                <div className="text-white/60 text-xs mt-2">
                  You possess {analysis.currentSkills.length - analysis.missingSkills.length}/{analysis.requiredSkills.length} required skills
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Gap: {analysis.gapScore}%</span>
                  <span>Match: {100 - analysis.gapScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${100 - analysis.gapScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Skills Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Skills */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Check className="w-4 h-4 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-medium text-sm">Current Skills ({analysis.currentSkills.length})</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.currentSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <X className="w-4 h-4 text-red-400 mr-2" />
                  <h3 className="text-red-400 font-medium text-sm">Missing Skills ({analysis.missingSkills.length})</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Development Roadmap */}
            <div className="space-y-4">
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-white font-medium">Personalized Development Roadmap</h3>
              </div>

              <div className="space-y-3">
                {analysis.roadmap.map((phase, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-purple-400 font-medium">{phase.phase}</h4>
                      <span className="text-white/60 text-xs">{phase.timeline}</span>
                    </div>

                    <div className="mb-3">
                      <div className="text-white/80 text-sm font-medium mb-2">Focus Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {phase.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-white/80 text-sm font-medium mb-1">Recommended Resources:</div>
                      <div className="text-white/60 text-xs space-y-1">
                        {phase.resources.map((resource, resIndex) => (
                          <div key={resIndex} className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {resource}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
