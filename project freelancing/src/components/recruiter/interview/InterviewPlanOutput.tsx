'use client'

import { Video, Clock, List, CheckCircle, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface InterviewPlan {
  candidateName: string
  candidateEmail: string
  gigTitle: string
  date: string
  recommendedSlot: string
  alternativeSlots: string[]
  meetingLink: string
  agenda: string[]
  recruiterNotes: string
  estimatedDuration: number
  prepRequired: string[]
}

interface InterviewPlanOutputProps {
  plan: InterviewPlan | null
  onConfirm: () => void
  onSendToCandidate: () => void
}

export default function InterviewPlanOutput({
  plan,
  onConfirm,
  onSendToCandidate
}: InterviewPlanOutputProps) {
  if (!plan) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Recommended Interview Plan
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{plan.estimatedDuration} minutes</span>
          </div>
        </div>

        {/* Candidate and Position Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="text-sm text-gray-400 mb-1">Candidate</h4>
            <p className="text-white font-medium">{plan.candidateName}</p>
            <p className="text-gray-300 text-sm">{plan.candidateEmail}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl">
            <h4 className="text-sm text-gray-400 mb-1">Position</h4>
            <p className="text-white font-medium">{plan.gigTitle}</p>
            <p className="text-gray-300 text-sm">{formatDate(plan.date)}</p>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="bg-white/10 p-5 rounded-xl border border-white/20">
          <div className="flex items-start gap-4">
            <Video className="w-5 h-5 text-purple-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-white font-medium mb-2">Interview Meeting Details</h4>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-gray-400">Date:</span> {formatDate(plan.date)}</p>
                <p><span className="text-gray-400">Time:</span> {plan.recommendedSlot}</p>
                <p><span className="text-gray-400">Duration:</span> {plan.estimatedDuration} minutes</p>
              </div>

              {/* Meeting Link */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <label className="block text-sm text-gray-400 mb-2">Video Call Link</label>
                <button
                  onClick={() => navigator.clipboard.writeText(plan.meetingLink)}
                  className="w-full bg-white/10 p-3 rounded-lg text-left text-purple-400 hover:text-purple-300 transition-colors border border-white/20 hover:border-purple-500/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm break-all">{plan.meetingLink}</span>
                    <span className="text-xs opacity-70">Copy</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agenda Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-purple-400" />
            <h4 className="text-white font-semibold">Interview Agenda</h4>
          </div>
          <div className="space-y-3">
            {plan.agenda.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-purple-400 text-sm font-medium w-8 flex-shrink-0">
                  {item.split(' ')[0]}
                </span>
                <span className="text-gray-300 flex-1">
                  {item.substring(item.indexOf(' ') + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Notes */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <h4 className="text-white font-semibold mb-2">Recruiter Preparation Notes</h4>
          <p className="text-gray-300 leading-relaxed">{plan.recruiterNotes}</p>
        </div>

        {/* Preparation Checklist */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <h4 className="text-white font-semibold mb-3">Preparation Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.prepRequired.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Time Slots */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/20">
          <h4 className="text-white font-semibold mb-3">Alternative Time Slots</h4>
          <div className="flex flex-wrap gap-2">
            {plan.alternativeSlots.map((slot, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-gray-300"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/20">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Confirm Interview Plan
          </Button>

          <Button
            onClick={onSendToCandidate}
            variant="outline"
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Send to Candidate
          </Button>
        </div>
      </div>
    </Card>
  )
}
