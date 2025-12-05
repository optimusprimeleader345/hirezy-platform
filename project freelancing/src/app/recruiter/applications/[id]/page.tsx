'use client'

import { useState, useEffect } from 'react'
import ApplicantDetail from '@/components/recruiter/ApplicantDetail'
import { realApplicants } from '@/lib/ai/recruiter/mockData'

interface PageProps {
  params: { id: string }
}

export default function ApplicantPage({ params }: PageProps) {
  const [applicant, setApplicant] = useState<any>(null)

  useEffect(() => {
    // Handle both async and sync params
    const getParams = async () => {
      let resolvedParams: { id: string }

      try {
        // If params is a Promise, await it
        resolvedParams = await Promise.resolve(params)
      } catch {
        // If params is synchronous, use directly
        resolvedParams = params as { id: string }
      }

      const foundApplicant = realApplicants.find(app => app.id === resolvedParams.id)
      setApplicant(foundApplicant)
    }

    getParams()
  }, [params])

  if (!applicant) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        <div className="text-center py-12 text-gray-400">
          <h2 className="text-2xl font-semibold mb-4">Applicant Not Found</h2>
          <p>This applicant does not exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const handleBack = () => {
    window.history.back()
  }

  return (
    <ApplicantDetail
      applicant={applicant}
      onBack={handleBack}
    />
  )
}
