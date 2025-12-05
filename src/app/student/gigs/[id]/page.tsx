'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Send, Loader2, XCircle, Calendar, DollarSign } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface Gig {
  gigId: string
  title: string
  description: string
  budget: string
  skills: string[]
  status: string
  createdAt: string
  recruiterName: string
  applicationsCount: number
}

export default function GigDetailPage() {
  const params = useParams()
  const gigId = params?.id as string

  const [showApplyForm, setShowApplyForm] = useState(false)
  const [applicationText, setApplicationText] = useState('')
  const [proposedRate, setProposedRate] = useState('')
  const [timeline, setTimeline] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    data: gig,
    isLoading,
    error
  } = useQuery({
    queryKey: ['gig', gigId],
    queryFn: async () => {
      const response = await fetch('/api/gigs/list')
      if (!response.ok) throw new Error('Failed to fetch gigs')
      const gigsData = await response.json() as Gig[]
      return gigsData.find(g => g.gigId === gigId)
    },
    enabled: !!gigId,
  })

  const handleApply = async () => {
    setIsSubmitting(true)

    try {
      // TODO: Implement actual application API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

      alert('Application submitted successfully!')
      setShowApplyForm(false)
    } catch (error) {
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <GlassCard className="neon-glow-purple">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Loading Gig Details</h1>
            <p className="text-white/70">Fetching gig information...</p>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (error || !gig) {
    return (
      <div className="space-y-8">
        <GlassCard className="border-red-400/30 bg-red-500/10">
          <div className="text-center py-12">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Gig Not Found</h1>
            <p className="text-white/70 mb-6">The requested gig could not be found.</p>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors text-purple-300"
            >
              Go Back
            </button>
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header with back button */}
      <GlassCard>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-white/70" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gradient">{gig.title}</h1>
            <p className="text-white/70">by {gig.recruiterName}</p>
          </div>
        </div>
      </GlassCard>

      {/* Gig Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">Gig Description</h2>
            <p className="text-white/70 leading-relaxed">{gig.description}</p>
          </GlassCard>

          {/* Required Skills */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {gig.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-400/30">
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Application Instructions */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">How to Apply</h2>
            <div className="space-y-3 text-white/70">
              <p>1. Review the gig requirements carefully</p>
              <p>2. Prepare your proposal including your approach, timeline, and rate</p>
              <p>3. Submit your application below</p>
              <p>4. The recruiter will review and respond within 3-5 business days</p>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Card */}
          <GlassCard>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-3xl font-bold text-green-400">{gig.budget}</span>
              </div>
              <p className="text-white/60 text-sm">Budget</p>
            </div>
          </GlassCard>

          {/* Stats */}
          <GlassCard>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Posted</span>
                <span className="text-white">{new Date(gig.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Applications</span>
                <span className="text-white">{gig.applicationsCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Status</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  gig.status === 'open' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {gig.status}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Apply Button */}
          <GlassCard>
            <button
              onClick={() => setShowApplyForm(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Apply for This Gig
            </button>
            <p className="text-xs text-white/50 text-center mt-2">
              Response time: 3-5 business days
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Apply for: {gig.title}</h2>
              <button
                onClick={() => setShowApplyForm(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <XCircle className="h-5 w-5 text-white/70" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2">Cover Letter / Proposal</label>
                <textarea
                  value={applicationText}
                  onChange={(e) => setApplicationText(e.target.value)}
                  placeholder="Explain why you're perfect for this gig. Describe your approach, relevant experience, and why you should be selected."
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/25 outline-none transition-colors text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">Your Proposed Rate</label>
                  <input
                    type="text"
                    value={proposedRate}
                    onChange={(e) => setProposedRate(e.target.value)}
                    placeholder="e.g. $1500, $50/hour"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/25 outline-none transition-colors text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Timeline</label>
                  <input
                    type="text"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="e.g. 2 weeks, 3-4 days"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/25 outline-none transition-colors text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowApplyForm(false)}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={isSubmitting || !applicationText.trim()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}
