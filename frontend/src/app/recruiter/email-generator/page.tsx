'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import EmailGeneratorForm from '@/components/recruiter/EmailGeneratorForm'

function EmailGeneratorContent() {
  const searchParams = useSearchParams()
  const candidateId = searchParams.get('candidateId')
  const gigId = searchParams.get('gigId')
  const type = searchParams.get('type') || 'followup'

  return (
    <EmailGeneratorForm
      initialCandidateName={candidateId ? `Candidate ${candidateId}` : ''}
      initialGigTitle={gigId ? `Gig ${gigId}` : ''}
      initialType={type}
    />
  )
}

export default function EmailGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<div className="p-8 text-center text-white/60">Loading...</div>}>
        <EmailGeneratorContent />
      </Suspense>
    </div>
  )
}
