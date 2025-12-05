'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Button } from '@/components/ui/button'
import { RefreshCw, Sparkles, Zap, Briefcase } from 'lucide-react'

interface Props {
  gigId: number
  gigRequirements: string[]
  onProposalGenerated?: (proposal: string, pricing: string) => void
}

export function ProposalForm({ gigId, gigRequirements, onProposalGenerated }: Props) {
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [additionalInstructions, setAdditionalInstructions] = useState('')
  const [selectedTone, setSelectedTone] = useState<'professional' | 'friendly' | 'technical'>('professional')
  const [selectedLength, setSelectedLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProposal, setGeneratedProposal] = useState('')
  const [recommendedPrice, setRecommendedPrice] = useState('')
  const [generationMeta, setGenerationMeta] = useState<{
    tone: string
    wordCount: number
    estimatedReadTime: string
    highlights: string[]
  } | null>(null)

  const handleGenerate = async () => {
    if (isGenerating) return

    setIsGenerating(true)

    try {
      const response = await fetch('/api/proposals/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigId,
          additionalNotes: additionalNotes.trim(),
          instructions: additionalInstructions.trim(),
          tone: selectedTone,
          length: selectedLength
        })
      })

      if (!response.ok) throw new Error('Failed to generate proposal')

      const data = await response.json()
      setGeneratedProposal(data.proposal)
      setRecommendedPrice(data.recommendedPrice)
      setGenerationMeta({
        tone: data.tone,
        wordCount: data.wordCount,
        estimatedReadTime: data.estimatedReadTime,
        highlights: data.keyHighlights
      })

      onProposalGenerated?.(data.proposal, data.recommendedPrice)
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate proposal. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const toneOptions = [
    {
      id: 'professional' as const,
      name: 'Professional',
      icon: <Briefcase className="w-4 h-4" />,
      description: 'Formal, enterprise-ready tone'
    },
    {
      id: 'friendly' as const,
      name: 'Friendly',
      icon: <Sparkles className="w-4 h-4" />,
      description: 'Warm, approachable style'
    },
    {
      id: 'technical' as const,
      name: 'Technical',
      icon: <Zap className="w-4 h-4" />,
      description: 'Detailed, solution-focused'
    }
  ]

  return (
    <GlassCard title="AI Proposal Generator">
      <div className="space-y-6">
        {/* Gig Requirements Display (Read-only) */}
        <div className="space-y-3">
          <h4 className="text-white font-medium flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Gig Requirements (Reference)
          </h4>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-32 overflow-y-auto">
            {gigRequirements.length > 0 ? (
              <ul className="space-y-2">
                {gigRequirements.map((req, index) => (
                  <li key={index} className="flex items-start text-white/70 text-sm">
                    <span className="text-purple-400 mr-2">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/60 text-sm">No specific requirements provided. AI will analyze the gig details.</p>
            )}
          </div>
        </div>

        {/* User Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Additional Notes</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any specific project details, technologies, or company info..."
              className="w-full min-h-20 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 resize-none"
              rows={3}
            />
          </div>

          {/* Additional Instructions */}
          <div className="space-y-2">
            <label className="text-white font-medium text-sm">Special Instructions</label>
            <textarea
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              placeholder="Emphasize portfolio work, specific strengths, availability, etc..."
              className="w-full min-h-20 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Tone Selection */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Proposal Tone & Style</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {toneOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedTone(option.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTone === option.id
                    ? 'bg-purple-500/20 border-purple-400 text-white'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="mr-2">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </div>
                <p className="text-xs opacity-75">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Proposal Length</h4>
          <div className="flex space-x-3">
            {[
              { id: 'short' as const, name: 'Short', description: '~150 words' },
              { id: 'medium' as const, name: 'Medium', description: '~300 words' },
              { id: 'long' as const, name: 'Long', description: '~500 words' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedLength(option.id)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  selectedLength === option.id
                    ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium">{option.name}</div>
                <div className="text-xs opacity-75">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating AI Proposal...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Proposal
              </>
            )}
          </Button>
        </div>

        {/* Generated Proposal Display */}
        {generatedProposal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Generated Proposal
              </h4>
              <Button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="px-4 py-2 bg-white/10 text-white/80 hover:bg-white/20 text-sm rounded"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Regenerate
              </Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-white/90 text-sm leading-relaxed">
                {generatedProposal}
              </div>
            </div>

            {/* Generation Metadata */}
            {generationMeta && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-purple-400 font-medium">Tone</div>
                    <div className="text-white">{generationMeta.tone}</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Words</div>
                    <div className="text-white">{generationMeta.wordCount}</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Read Time</div>
                    <div className="text-white">{generationMeta.estimatedReadTime}</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-medium">Recommended Price</div>
                    <div className="text-green-400 font-semibold">{recommendedPrice}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-purple-400 font-medium mb-2">Key Highlights:</div>
                  <div className="flex flex-wrap gap-2">
                    {generationMeta.highlights.map((highlight, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                        ✓ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  )
}
