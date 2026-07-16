'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import CandidateSelector from '@/components/recruiter/interview/CandidateSelector'
import GigSelector from '@/components/recruiter/interview/GigSelector'
import DatePicker from '@/components/recruiter/interview/DatePicker'
import TimeSlotPicker from '@/components/recruiter/interview/TimeSlotPicker'
import InterviewPlanOutput from '@/components/recruiter/interview/InterviewPlanOutput'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2 } from 'lucide-react'

export default function InterviewSchedulerPage() {
  const searchParams = useSearchParams()
  // Removed unused router

  const [selectedCandidate, setSelectedCandidate] = useState('')
  const [selectedGig, setSelectedGig] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [interviewPlan, setInterviewPlan] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Pre-select values from URL params (for direct links from applicant detail)
  useEffect(() => {
    const candidateId = searchParams.get('candidateId')
    const gigId = searchParams.get('gigId')

    if (candidateId) setSelectedCandidate(candidateId)
    if (gigId) setSelectedGig(gigId)

    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setSelectedDate(tomorrow.toISOString().split('T')[0])
  }, []) // Remove searchParams dependency to avoid re-renders

  // Handle URL parameter changes separately if needed
  useEffect(() => {
    const candidateId = searchParams.get('candidateId')
    const gigId = searchParams.get('gigId')

    if (candidateId && candidateId !== selectedCandidate) {
      setSelectedCandidate(candidateId)
    }
    if (gigId && gigId !== selectedGig) {
      setSelectedGig(gigId)
    }
  }, [searchParams, selectedCandidate, selectedGig])

  const handleGeneratePlan = async () => {
    if (!selectedCandidate || !selectedGig || !selectedDate || !selectedTimeSlot) {
      alert('Please fill in all required fields')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/recruiter/interview/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidateId: selectedCandidate,
          gigId: selectedGig,
          date: selectedDate,
          timeSlot: selectedTimeSlot
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate interview plan')
      }

      const data = await response.json()
      setInterviewPlan(data.plan)

    } catch (error) {
      console.error('Error generating plan:', error)
      alert('Failed to generate interview plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleConfirmPlan = () => {
    alert('Interview plan confirmed! This would update your calendar and send invites.')
    // In a real app, this would save to database and send emails
  }

  const handleSendToCandidate = () => {
    alert('Interview invitation would be sent to the candidate!')
    // In a real app, this would send calendar invite and email
  }

  const allFieldsSelected = selectedCandidate && selectedGig && selectedDate && selectedTimeSlot

  return (
    <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI Interview Scheduler
          </h1>
          <p className="text-white/80 text-lg">
            Generate personalized interview plans with AI assistance
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <CandidateSelector
              selectedCandidateId={selectedCandidate}
              onCandidateSelect={setSelectedCandidate}
              preselectedId={selectedCandidate}
            />

            <GigSelector
              selectedGigId={selectedGig}
              onGigSelect={setSelectedGig}
              preselectedId={selectedGig}
            />

            <DatePicker
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              preselectedDate={selectedDate}
            />

            {selectedDate && (
              <TimeSlotPicker
                selectedTimeSlot={selectedTimeSlot}
                onTimeSlotSelect={setSelectedTimeSlot}
                date={selectedDate}
              />
            )}

            {allFieldsSelected && (
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  size="lg"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-3" />
                      Generate Interview Plan
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Output */}
          <div className="lg:sticky lg:top-8">
            <InterviewPlanOutput
              plan={interviewPlan}
              onConfirm={handleConfirmPlan}
              onSendToCandidate={handleSendToCandidate}
            />

            {!interviewPlan && (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-2">AI Interview Planning</h3>
                <p className="text-gray-300">
                  Fill in the details on the left and let AI generate a personalized interview plan with optimized timing and structured agenda.
                </p>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}
