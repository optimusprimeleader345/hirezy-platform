'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Brain, MapPin, Clock, Users } from 'lucide-react'

interface GigRecommendation {
  id: number
  title: string
  matchPercentage: number
  salaryRange: string
  tags: string[]
  whyRecommended: string
  company: string
  location: string
  remote: boolean
}

interface ApiResponse {
  recommendations: GigRecommendation[]
  totalCount: number
  timestamp: string
}

export function AIGigRecommendations() {
  const [recommendations, setRecommendations] = useState<GigRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/student/recommendations')
        if (!response.ok) throw new Error('Failed to fetch recommendations')

        const data: ApiResponse = await response.json()
        setRecommendations(data.recommendations)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <GlassCard title="AI Gig Recommendations">
        <div className="text-center py-8 text-white/60">
          Analyzing your profile and generating personalized recommendations...
        </div>
      </GlassCard>
    )
  }

  if (error) {
    return (
      <GlassCard title="AI Gig Recommendations">
        <div className="text-center py-8 text-red-400">
          <p>Unable to load recommendations</p>
          <p className="text-sm text-white/60 mt-2">{error}</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard title="AI Gig Recommendations">
      <div className="space-y-6">
        <p className="text-white/80 text-sm mb-4">
          Based on your skills and experience, here are gigs that best match your profile:
        </p>

        <div className="grid gap-4">
          {recommendations.map((gig) => (
            <div
              key={gig.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{gig.title}</h3>
                  <div className="flex items-center text-white/70 text-sm space-x-4">
                    <span className="flex items-center">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-1">
                        <span className="text-xs font-bold">{gig.matchPercentage}%</span>
                      </div>
                      Match
                    </span>
                    <span>{gig.company}</span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {gig.location}
                    </span>
                    {gig.remote && (
                      <span className="text-green-400 text-xs font-medium">Remote</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 font-semibold">{gig.salaryRange}</div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {gig.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Recommendation Reason */}
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3 mb-3">
                <div className="flex items-start">
                  <Brain className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Why Recommended</p>
                    <p className="text-white/80 text-sm mt-1">{gig.whyRecommended}</p>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-between items-center">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                  View Details
                </button>
                <div className="text-white/60 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Posted recently
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white/80 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Found {recommendations.length} personalized recommendations
            </div>
            <div className="text-purple-400 text-sm font-medium">
              Average match: {Math.round(recommendations.reduce((sum, gig) => sum + gig.matchPercentage, 0) / recommendations.length)}%
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
