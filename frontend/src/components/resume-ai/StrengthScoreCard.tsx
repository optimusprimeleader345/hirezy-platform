'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react'

interface StrengthData {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  grade: string
}

interface Props {
  resumeText: string
}

export function StrengthScoreCard({ resumeText }: Props) {
  const [data, setData] = useState<StrengthData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeResume = async () => {
    if (!resumeText || resumeText.trim().length === 0) {
      setData(null)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/resume/strength-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const result: StrengthData = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(analyzeResume, 1000)
    return () => clearTimeout(debounceTimer)
  }, [resumeText])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    if (score >= 70) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-6 h-6" />
    if (score >= 80) return <AlertTriangle className="w-6 h-6" />
    return <XCircle className="w-6 h-6" />
  }

  const getGradientColor = (score: number) => {
    if (score >= 90) return 'from-green-400 to-green-600'
    if (score >= 80) return 'from-yellow-400 to-yellow-600'
    if (score >= 70) return 'from-orange-400 to-orange-600'
    return 'from-red-400 to-red-600'
  }

  return (
    <GlassCard title="Resume Strength Score">
      {!resumeText ? (
        <div className="text-center py-12 text-white/60">
          <Target className="w-12 h-12 mx-auto mb-4" />
          <p>Paste or upload your resume to get a strength analysis</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-400" />
          <p className="text-white/70">Analyzing resume strength...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">
          <XCircle className="w-8 h-8 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Score Circle */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke={`url(#score${data.score})`}
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 50}`,
                    strokeDashoffset: `${2 * Math.PI * 50 * (1 - data.score / 100)}`
                  }}
                />
                <defs>
                  <linearGradient id={`score${data.score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(data.score)}`}>
                    {data.score}
                  </div>
                  <div className="text-xs text-white/60">out of 100</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-2">
              {getScoreIcon(data.score)}
              <span className={`ml-2 font-semibold ${getScoreColor(data.score)}`}>
                {data.grade}
              </span>
            </div>

            <p className="text-white/70 text-sm">
              {data.score >= 90 ? 'Excellent! Your resume is job-ready.' :
               data.score >= 80 ? 'Good foundation with room for improvement.' :
               data.score >= 70 ? 'Fair, but needs significant work.' :
               'Needs substantial improvements.'}
            </p>
          </div>

          {/* Strengths */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Strengths ({data.strengths.length})
            </h4>
            <div className="space-y-2">
              {data.strengths.map((strength, index) => (
                <div key={index} className="flex items-start bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-400" />
              Areas for Improvement ({data.weaknesses.length})
            </h4>
            <div className="space-y-2">
              {data.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{weakness}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Suggestions */}
          {data.suggestions.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold flex items-center">
                <Target className="w-4 h-4 mr-2 text-purple-400" />
                Recommendations ({data.suggestions.length})
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {data.suggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <span className="text-white/90 text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </GlassCard>
  )
}
