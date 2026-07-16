'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Shield, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react'

interface ATSData {
  score: number
  issues: {
    critical: number
    warnings: number
    info: number
  }
  checklist: {
    keywordDensity: boolean
    formatting: boolean
    contactInfo: boolean
    fileFormat: boolean
    length: boolean
  }
  optimizationTips: string[]
}

interface Props {
  resumeText: string
}

export function ATSReport({ resumeText }: Props) {
  const [data, setData] = useState<ATSData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (resumeText && resumeText.trim().length > 0) {
      analyzeATS()
    }
  }, [resumeText])

  const analyzeATS = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/resume/ats-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText })
      })

      if (!response.ok) throw new Error('ATS analysis failed')

      const result: ATSData = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-yellow-400'
    if (score >= 60) return 'text-orange-400'
    return 'text-red-400'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-6 h-6" />
    if (score >= 75) return <AlertTriangle className="w-6 h-6" />
    return <XCircle className="w-6 h-6" />
  }

  return (
    <GlassCard title="ATS Compatibility Report">
      {!resumeText ? (
        <div className="text-center py-12 text-white/60">
          <Shield className="w-12 h-12 mx-auto mb-4" />
          <p>Paste your resume to check ATS compatibility</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-400" />
          <p className="text-white/70">Analyzing ATS compatibility...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-400">
          <XCircle className="w-8 h-8 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* ATS Score */}
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(data.score)}`}>
              {data.score}%
            </div>
            <div className="flex items-center justify-center mb-2">
              {getScoreIcon(data.score)}
              <span className={`ml-2 font-medium ${getScoreColor(data.score)}`}>
                {data.score >= 90 ? 'Excellent' :
                 data.score >= 75 ? 'Good' :
                 data.score >= 60 ? 'Fair' : 'Needs Work'}
              </span>
            </div>
            <p className="text-white/70 text-sm">
              ATS compatibility score based on keyword optimization and formatting
            </p>
          </div>

          {/* Issue Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="text-red-400 text-2xl font-bold">{data.issues.critical}</div>
              <div className="text-white/70 text-xs">Critical Issues</div>
            </div>
            <div className="text-center bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <div className="text-yellow-400 text-2xl font-bold">{data.issues.warnings}</div>
              <div className="text-white/70 text-xs">Warnings</div>
            </div>
            <div className="text-center bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 text-2xl font-bold">{data.issues.info}</div>
              <div className="text-white/70 text-xs">Suggestions</div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">ATS Checklist</h4>
            <div className="space-y-2">
              {Object.entries(data.checklist).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                  <span className="text-white/90 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  {value ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Optimization Recommendations</h4>
            <div className="space-y-2">
              {data.optimizationTips.map((tip, index) => (
                <div key={index} className="flex items-start bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={analyzeATS}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
          >
            Re-scan for ATS Compatibility
          </button>
        </div>
      ) : null}
    </GlassCard>
  )
}
