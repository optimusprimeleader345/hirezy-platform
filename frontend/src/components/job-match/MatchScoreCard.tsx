'use client'

import { Award, TrendingUp, TrendingDown } from 'lucide-react'

interface MatchScoreCardProps {
  matchScore: number
  summary: string
  breakdown: {
    skillScore: number
    experienceScore: number
    portfolioScore: number
    careerScore: number
    marketScore: number
    profileScore: number
  }
}

export function MatchScoreCard({ matchScore, summary, breakdown }: MatchScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-600 to-green-500'
    if (score >= 60) return 'from-yellow-600 to-yellow-500'
    return 'from-red-600 to-red-500'
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-6 text-center">Job Match Score</h3>

      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.2)" strokeWidth="10" fill="none"/>
            <circle cx="60" cy="60" r="50"
                    stroke={`url(#matchGrad)`} strokeWidth="10" fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - matchScore / 100)}`}/>
            <defs>
              <linearGradient id="matchGrad">
                <stop offset="0%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#3b82f6"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-white">{matchScore}</span>
              <span className="text-sm text-white/70">/100</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white/80 text-center mb-4 text-sm">{summary}</p>

      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-white/70 text-sm">Skills Fit</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getScoreColor(breakdown.skillScore)}`}>
              {breakdown.skillScore}
            </span>
            {breakdown.skillScore >= 70 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className={`w-4 h-4 ${breakdown.skillScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`} />
            )}
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-white/70 text-sm">Experience Level</span>
          <span className={`text-sm font-semibold ${getScoreColor(breakdown.experienceScore)}`}>
            {breakdown.experienceScore}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-white/70 text-sm">Portfolio Quality</span>
          <span className={`text-sm font-semibold ${getScoreColor(breakdown.portfolioScore)}`}>
            {breakdown.portfolioScore}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
          <span className="text-white/70 text-sm">Career Alignment</span>
          <span className={`text-sm font-semibold ${getScoreColor(breakdown.careerScore)}`}>
            {breakdown.careerScore}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center space-x-2">
          {matchScore >= 80 ? (
            <>
              <Award className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Excellent Match!</span>
            </>
          ) : matchScore >= 70 ? (
            <>
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Good Match</span>
            </>
          ) : matchScore >= 60 ? (
            <>
              <TrendingDown className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Fair Match</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Limited Match</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
