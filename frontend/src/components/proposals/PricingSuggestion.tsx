'use client'

import { useEffect, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface PricingData {
  hourlyRate: number
  fixedBid: number | null
  marketRate: string
  marketRange: string
  confidence: 'Low' | 'Medium' | 'High'
  reasoning: string
  factors: {
    baseRate: string
    region: string
    urgency: string
    complexity: string
  }
  alternatives: {
    budgetFriendly: number
    premiumService: number
    packageDeal: number | null
  }
}

interface Props {
  gigId: number
}

export function PricingSuggestion({ gigId }: Props) {
  const [pricingData, setPricingData] = useState<PricingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch('/api/proposals/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gigId })
        })

        if (!response.ok) throw new Error('Failed to get pricing')

        const data: PricingData = await response.json()
        setPricingData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pricing')
      } finally {
        setLoading(false)
      }
    }

    if (gigId) fetchPricing()
  }, [gigId])

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'Medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'Low':
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      default:
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'Medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'Low':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      default:
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
    }
  }

  if (loading) {
    return (
      <GlassCard title="AI Pricing Suggestion">
        <div className="text-center py-8 text-white/60">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          Analyzing market pricing...
        </div>
      </GlassCard>
    )
  }

  if (error || !pricingData) {
    return (
      <GlassCard title="AI Pricing Suggestion">
        <div className="text-center py-8 text-red-400">
          <p>Unable to load pricing suggestions</p>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard title="AI Pricing Suggestion">
      <div className="space-y-6">
        {/* Main Pricing Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hourly Rate */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Hourly Rate
              </h4>
              {getConfidenceIcon(pricingData.confidence)}
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1">${pricingData.hourlyRate}</div>
            <div className="text-white/70 text-sm">{pricingData.marketRate}</div>
          </div>

          {/* Fixed Bid (if available) */}
          {pricingData.fixedBid && (
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Fixed Bid
                </h4>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">
                  Optional
                </span>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">${pricingData.fixedBid.toLocaleString()}</div>
              <div className="text-white/70 text-sm">Project package deal</div>
            </div>
          )}
        </div>

        {/* Confidence Meter */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Pricing Confidence</h4>
          <div className={`flex items-center justify-between p-3 rounded-lg border ${getConfidenceColor(pricingData.confidence)}`}>
            <span className="font-medium">{pricingData.confidence} Confidence</span>
            <span className="text-sm opacity-75">{pricingData.marketRange}</span>
          </div>
        </div>

        {/* Reasoning */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2 flex items-center">
            <Info className="w-4 h-4 mr-2" />
            Why This Price
          </h4>
          <p className="text-white/80 text-sm">{pricingData.reasoning}</p>
        </div>

        {/* Factors Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(pricingData.factors).map(([key, value]) => (
            <div key={key} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <div className="text-white/60 text-xs capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className="text-white text-sm">{value}</div>
            </div>
          ))}
        </div>

        {/* Alternative Pricing Options */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Alternative Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-purple-400 font-medium">${pricingData.alternatives.budgetFriendly}</div>
              <div className="text-white/60 text-xs">Budget Friendly</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
              <div className="text-green-400 font-medium">${pricingData.alternatives.premiumService}</div>
              <div className="text-white/60 text-xs">Premium Service</div>
            </div>
            {pricingData.alternatives.packageDeal && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <div className="text-blue-400 font-medium">${pricingData.alternatives.packageDeal.toLocaleString()}</div>
                <div className="text-white/60 text-xs">Package Deal</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
