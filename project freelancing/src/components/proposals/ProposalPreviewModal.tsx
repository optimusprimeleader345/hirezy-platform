'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { X, FileText, DollarSign, CheckCircle } from 'lucide-react'

interface ProposalPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  gigTitle: string
  proposalText: string
  pricing: string
  qualityScore?: number
  onSubmit: () => void
}

export function ProposalPreviewModal({
  isOpen,
  onClose,
  gigTitle,
  proposalText,
  pricing,
  qualityScore,
  onSubmit
}: ProposalPreviewModalProps) {
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center">
            <FileText className="w-6 h-6 mr-3 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Proposal Preview</h2>
              <p className="text-white/60 text-sm">Review before submitting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Gig Title */}
          <div className="space-y-2">
            <h3 className="text-white font-medium">Gig Title</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white font-semibold">{gigTitle}</p>
            </div>
          </div>

          {/* Suggested Pricing */}
          <div className="space-y-2">
            <h3 className="text-white font-medium flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Suggested Pricing
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-green-400 font-semibold text-lg">{pricing}</p>
              <p className="text-white/60 text-sm">Based on market analysis and project complexity</p>
            </div>
          </div>

          {/* Quality Score */}
          {qualityScore !== undefined && (
            <div className="space-y-2">
              <h3 className="text-white font-medium flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Proposal Quality Score
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${
                      qualityScore >= 90 ? 'text-green-400' :
                      qualityScore >= 80 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {qualityScore}
                    </div>
                    <p className="text-white/60 text-sm">AI-analyzed quality score</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    qualityScore >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    qualityScore >= 80 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {qualityScore >= 90 ? 'Excellent' :
                     qualityScore >= 80 ? 'Good' :
                     qualityScore >= 70 ? 'Fair' : 'Needs Work'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Proposal Content */}
          <div className="space-y-2">
            <h3 className="text-white font-medium">Your Proposal</h3>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-h-64 overflow-y-auto">
              <div className="whitespace-pre-wrap text-white/90 leading-relaxed text-sm">
                {proposalText}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-white/20 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
            >
              Back & Edit
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Proposal'}
            </button>
          </div>

          <div className="mt-4 text-center text-white/60 text-sm">
            By submitting, you agree to our terms and understand this will be sent to the client.
          </div>
        </div>
      </div>
    </div>
  )
}
