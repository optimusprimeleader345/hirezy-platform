'use client'

import { Sparkles, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface CareerSuggestionType {
  id: number
  title: string
  reason: string
  confidence: number
}

interface CareerSuggestionsProps {
  suggestions: CareerSuggestionType[]
}

export function CareerSuggestions({ suggestions }: CareerSuggestionsProps) {
  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-6 w-6 text-white" />
        <h3 className="text-xl font-bold text-white">AI Career Suggestions</h3>
      </div>

      <div className="text-sm text-white/70 mb-4">
        AI-powered insights based on your skills, experience, and market trends
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:border-white/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-white text-lg flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                {suggestion.title}
              </h4>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  {suggestion.confidence}% match
                </span>
              </div>
            </div>

            <p className="text-white/90 text-sm leading-relaxed mb-3">
              {suggestion.reason}
            </p>

            {/* Confidence indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>AI Confidence</span>
                <span>{suggestion.confidence}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    suggestion.confidence >= 80
                      ? 'bg-gradient-to-r from-green-400 to-green-500'
                      : suggestion.confidence >= 60
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                      : 'bg-gradient-to-r from-blue-400 to-blue-500'
                  }`}
                  style={{ width: `${suggestion.confidence}%` }}
                />
              </div>
            </div>

            {/* Action hints based on confidence */}
            <div className="mt-3 flex items-center justify-center">
              {suggestion.confidence >= 80 && (
                <div className="text-center">
                  <span className="text-xs text-green-400 font-medium">
                    💪 Strong match! Consider exploring this path
                  </span>
                </div>
              )}
              {suggestion.confidence >= 60 && suggestion.confidence < 80 && (
                <div className="text-center">
                  <span className="text-xs text-yellow-400 font-medium">
                    ⭐ Promising direction with some skill development
                  </span>
                </div>
              )}
              {suggestion.confidence < 60 && (
                <div className="text-center">
                  <span className="text-xs text-blue-400 font-medium">
                    🔄 Interesting option - requires significant learning
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No career suggestions available</p>
            <p className="text-sm mt-1">Complete your profile to get personalized AI insights</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-white/10">
        <div className="text-center">
          <p className="text-sm text-white/60">
            AI suggestions updated based on market trends and your activity
          </p>
          <button className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white/80 text-xs rounded-lg transition-colors">
            Explore More Career Paths →
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
