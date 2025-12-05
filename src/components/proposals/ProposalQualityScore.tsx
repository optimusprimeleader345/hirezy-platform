'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Brain, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

interface QualityData {
  score: number
  grammar: number
  tone: number
  alignment: number
  suggestions: string[]
}

interface Props {
  proposalText: string
  gigRequirements: string[]
}

export function ProposalQualityScore({ proposalText, gigRequirements }: Props) {
  const [qualityData, setQualityData] = useState<QualityData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (proposalText && proposalText.trim().length > 0) {
      analyzeQuality()
    }
  }, [proposalText, gigRequirements])

  const analyzeQuality = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/proposals/quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalText,
          gigRequirements
        })
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data: QualityData = await response.json()
      setQualityData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-5 h-5" />
    if (score >= 80) return <AlertTriangle className="w-5 h-5" />
    return <XCircle className="w-5 h-5" />
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Good'
    if (score >= 70) return 'Fair'
    return 'Needs Work'
  }

  if (!proposalText || proposalText.trim().length === 0) {
    return (
      <GlassCard title="Proposal Quality Score">
        <div className="text-center py-8 text-white/60">
          <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <p>Write a proposal above to see quality analysis</p>
        </div>
      </GlassCard>
    )
  }

  if (loading) {
    return (
      <GlassCard title="Proposal Quality Score">
        <div className="text-center py-8 text-white/60">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          Analyzing proposal quality...
        </div>
      </GlassCard>
    )
  }

  if (error || !qualityData) {
    return (
      <GlassCard title="Proposal Quality Score">
        <div className="text-center py-8 text-red-400">
          <p>Unable to analyze proposal quality</p>
          {error && <p className="text-sm mt-2">{error}</p>}
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard title="Proposal Quality Score">
      <div className="space-y-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(qualityData.score)}`}>
            {qualityData.score}
          </div>
          <div className="flex items-center justify-center mb-2">
            {getScoreIcon(qualityData.score)}
            <span className={`ml-2 font-medium ${getScoreColor(qualityData.score)}`}>
              {getScoreLabel(qualityData.score)}
            </span>
          </div>
          <p className="text-white/60 text-sm">Overall Quality Score</p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grammar */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${getScoreColor(qualityData.grammar)}`}>
              {qualityData.grammar}
            </div>
            <div className="text-white/60 text-sm">Grammar</div>
          </div>

          {/* Professional Tone */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${getScoreColor(qualityData.tone)}`}>
              {qualityData.tone}
            </div>
            <div className="text-white/60 text-sm">Professional Tone</div>
          </div>

          {/* Alignment */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${getScoreColor(qualityData.alignment)}`}>
              {qualityData.alignment}
            </div>
            <div className="text-white/60 text-sm">Job Requirements</div>
          </div>
        </div>

        {/* Suggestions */}
        {qualityData.suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-white font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Improvement Suggestions
            </h4>
            <div className="space-y-2">
              {qualityData.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <div className="text-yellow-400 mr-2 mt-0.5">•</div>
                  <div className="text-white/90 text-sm">{suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grade Indicator */}
        <div className="text-center">
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
            qualityData.score >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
            qualityData.score >= 80 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
            'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            Grade: {
              qualityData.score >= 95 ? 'A+' :
              qualityData.score >= 90 ? 'A' :
              qualityData.score >= 85 ? 'B+' :
              qualityData.score >= 80 ? 'B' :
              qualityData.score >= 75 ? 'C+' :
              qualityData.score >= 70 ? 'C' :
              qualityData.score >= 60 ? 'D' :
              'F'
            }
          </span>
        </div>

        {/* Re-analyze Button */}
        <div className="text-center pt-4 border-t border-white/10">
          <button
            onClick={analyzeQuality}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Re-analyze Quality
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
