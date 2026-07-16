'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Brain, TrendingUp, CheckCircle, XCircle } from 'lucide-react'

interface SuccessData {
  score: number
  strengths: string[]
  weaknesses: string[]
  analysis: string
  factors: Array<{
    name: string
    weight: number
    score: number
  }>
}

interface Props {
  gigId: number
}

export function GigSuccessPredictor({ gigId }: Props) {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuccessPrediction = async () => {
      try {
        const response = await fetch('/api/gigs/success-predictor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gigId })
        })

        if (!response.ok) throw new Error('Prediction failed')

        const data: SuccessData = await response.json()
        setSuccessData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to predict')
      } finally {
        setLoading(false)
      }
    }

    if (gigId) fetchSuccessPrediction()
  }, [gigId])

  const getProgressRingStyles = (score: number) => {
    const circumference = 100
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (score / 100) * circumference

    return {
      strokeDasharray,
      strokeDashoffset,
      transition: 'stroke-dashoffset 1s ease-in-out'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreText = (score: number) => {
    if (score >= 85) return 'Excellent match!'
    if (score >= 70) return 'Good match'
    if (score >= 60) return 'Fair match'
    return 'May need improvement'
  }

  if (loading) {
    return (
      <GlassCard title="AI Success Predictor">
        <div className="text-center py-8 text-white/60">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          Analyzing your fit for this gig...
        </div>
      </GlassCard>
    )
  }

  if (error || !successData) {
    return (
      <GlassCard title="AI Success Predictor">
        <div className="text-center py-8 text-red-400">
          <p>Unable to predict success score</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard title="AI Success Predictor">
      <div className="space-y-6">
        {/* Score Visualization */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress Circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={`url(#gradient-${successData.score})`}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={getProgressRingStyles(successData.score)}
              />
              <defs>
                <linearGradient id={`gradient-${successData.score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={successData.score >= 70 ? "#10b981" : successData.score >= 60 ? "#f59e0b" : "#ef4444"} />
                  <stop offset="100%" stopColor={successData.score >= 70 ? "#059669" : successData.score >= 60 ? "#d97706" : "#dc2626"} />
                </linearGradient>
              </defs>
            </svg>
            {/* Score Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(successData.score)}`}>
                  {successData.score}%
                </div>
              </div>
            </div>
          </div>

          <h3 className={`text-lg font-semibold ${getScoreColor(successData.score)}`}>
            {getScoreText(successData.score)}
          </h3>
        </div>

        {/* Analysis */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="flex items-start">
            <Brain className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-purple-300 text-sm font-medium mb-1">AI Analysis</p>
              <p className="text-white/80 text-sm">{successData.analysis}</p>
            </div>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Match Factors
          </h4>

          {successData.factors.map((factor, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm">{factor.name}</span>
                <span className="text-purple-400 text-sm font-medium">{factor.score}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {successData.strengths.length > 0 && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <h4 className="text-green-400 font-medium text-sm">Strengths</h4>
              </div>
              <ul className="space-y-1">
                {successData.strengths.map((strength, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start">
                    <span className="text-green-400 mr-2 mt-1.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {successData.weaknesses.length > 0 && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <XCircle className="w-4 h-4 text-yellow-400 mr-2" />
                <h4 className="text-yellow-400 font-medium text-sm">Areas to Improve</h4>
              </div>
              <ul className="space-y-1">
                {successData.weaknesses.map((weakness, index) => (
                  <li key={index} className="text-white/80 text-xs flex items-start">
                    <span className="text-yellow-400 mr-2 mt-1.5">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTAs */}
        {(successData.score >= 80 && successData.strengths.length > 0) && (
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-green-400 font-medium">🎯 You're highly competitive!</div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
