'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Target, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

interface Props {
  analysis: {
    gapScore: number
    analysis: string
    difficultyLevel: string
  }
}

export function GapScoreCard({ analysis }: Props) {
  const { gapScore, analysis: analysisText, difficultyLevel } = analysis

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6" />
    if (score >= 60) return <AlertTriangle className="w-6 h-6" />
    return <XCircle className="w-6 h-6" />
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 60) return 'Good Foundation'
    if (score >= 40) return 'Needs Significant Work'
    return 'Major Skill Gap'
  }

  return (
    <GlassCard title="Skill Gap Analysis Score">
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
                stroke="url(#gapScore)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (1 - gapScore / 100)}`
                }}
              />
              <defs>
                <linearGradient id="gapScore" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(gapScore)}`}>
                  {gapScore}
                </div>
                <div className="text-xs text-white/60">Skill Match Score</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-2">
            {getScoreIcon(gapScore)}
            <span className={`ml-2 font-semibold ${getScoreColor(gapScore)}`}>
              {difficultyLevel} Level
            </span>
          </div>

          <p className="text-white/70 text-sm mb-4">
            {getScoreLabel(gapScore)}
          </p>
        </div>

        {/* AI Analysis */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Target className="w-4 h-4 mr-2 text-purple-400" />
            AI Skill Analysis
          </h4>
          <p className="text-white/90 text-sm leading-relaxed">
            {analysisText}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className={`text-2xl font-bold ${getScoreColor(gapScore)}`}>
              {gapScore}%
            </div>
            <div className="text-white/60 text-xs">Current Match</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-400">
              {Math.max(0, 100 - gapScore)}%
            </div>
            <div className="text-white/60 text-xs">Gap to Close</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">
              {difficultyLevel}
            </div>
            <div className="text-white/60 text-xs">Difficulty</div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
