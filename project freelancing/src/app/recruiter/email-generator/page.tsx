'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import EmailGeneratorForm from '@/components/recruiter/EmailGeneratorForm'

export default function EmailGeneratorPage() {
  const searchParams = useSearchParams()
  const candidateId = searchParams.get('candidateId')
  const gigId = searchParams.get('gigId')
  const type = searchParams.get('type') || 'followup'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<div>Loading...</div>}>
        <EmailGeneratorForm
          initialCandidateName={candidateId ? `Candidate ${candidateId}` : ''}
          initialGigTitle={gigId ? `Gig ${gigId}` : ''}
          initialType={type}
        />
      </Suspense>
    </div>
  )
}
