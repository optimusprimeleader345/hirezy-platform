'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { TrendingUp, DollarSign, Clock, Lightbulb, ArrowRight } from 'lucide-react'

interface CareerPathResponse {
  suggestedRoles: string[]
  salaryRanges: Array<{
    role: string
    entryLevel: string
    midLevel: string
    seniorLevel: string
  }>
  demandForecast: 'High' | 'Medium' | 'Low'
  emergingSkills: string[]
  timeline: string
  successFactors: string[]
  alternativePaths: string[]
}

export function CareerPathPredictor() {
  const [primaryGoal, setPrimaryGoal] = useState('')
  const [prediction, setPrediction] = useState<CareerPathResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async () => {
    if (!primaryGoal.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/career-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ primaryGoal })
      })

      if (!response.ok) throw new Error('Prediction failed')

      const data: CareerPathResponse = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Prediction failed')
    } finally {
      setLoading(false)
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-red-400'
      default: return 'text-white'
    }
  }

  return (
    <GlassCard title="AI Career Path Predictor">
      <div className="space-y-6">
        <p className="text-white/80 text-sm">
          Get AI-powered predictions about your career path, including recommended roles, salary forecasts, and emerging skills.
        </p>

        {/* Primary Goal Input */}
        <div className="space-y-3">
          <label className="text-white font-medium text-sm">Your Primary Career Goal</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              placeholder="e.g., Frontend Developer, AI Engineer, Product Manager..."
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
            <button
              onClick={handlePredict}
              disabled={loading || !primaryGoal.trim()}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Predicting...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Predict
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        {prediction && (
          <>
            {/* Suggested Roles */}
            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-white font-medium">Recommended Career Paths</h3>
              </div>

              <div className="grid gap-3">
                {prediction.suggestedRoles.map((role, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <h4 className="text-purple-400 font-medium">{role}</h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Ranges */}
            <div className="space-y-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                <h3 className="text-white font-medium">Salary Projections</h3>
              </div>

              <div className="space-y-3">
                {prediction.salaryRanges.map((range, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
                    <h4 className="text-green-400 font-medium mb-3">{range.role}</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-white/60 text-xs">Entry Level</div>
                        <div className="text-white font-semibold">{range.entryLevel}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs">Mid Level</div>
                        <div className="text-white font-semibold">{range.midLevel}</div>
                      </div>
                      <div>
                        <div className="text-white/60 text-xs">Senior Level</div>
                        <div className="text-white font-semibold">{range.seniorLevel}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Forecast */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-medium">Market Demand Forecast</h3>
                <span className={`font-bold ${getDemandColor(prediction.demandForecast)}`}>
                  {prediction.demandForecast} Demand
                </span>
              </div>
              <div className="flex items-center text-white/60 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Timeline: {prediction.timeline}
              </div>
            </div>

            {/* Emerging Skills */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="text-white font-medium">Emerging Skills to Learn</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {prediction.emergingSkills.map((skill, index) => (
                  <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
                    <span className="text-yellow-400 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Factors */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h3 className="text-purple-400 font-medium mb-3 flex items-center">
                <ArrowRight className="w-4 h-4 mr-2" />
                Key Success Factors
              </h3>
              <ul className="text-white/80 text-sm space-y-2">
                {prediction.successFactors.map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternative Paths */}
            {prediction.alternativePaths.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-blue-400 font-medium mb-3 flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Alternative Career Paths
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prediction.alternativePaths.map((path, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                      {path}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
