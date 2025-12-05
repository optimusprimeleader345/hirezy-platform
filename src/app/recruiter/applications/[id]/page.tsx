'use client'

import { useState, useEffect } from 'react'
import ApplicantDetail from '@/components/recruiter/ApplicantDetail'
import type { Applicant } from '@/lib/ai/recruiter/mockData'

interface PageProps {
  params: { id: string }
}

export default function ApplicantPage({ params }: PageProps) {
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [loading, setLoading] = useState(true)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  useEffect(() => {
    const loadApplicant = async () => {
      try {
        // Handle both async and sync params
        let resolvedParams: { id: string }

        try {
          // If params is a Promise, await it
          resolvedParams = await Promise.resolve(params)
        } catch {
          // If params is synchronous, use directly
          resolvedParams = params as { id: string }
        }

        // Store the application ID for the analysis API
        setApplicationId(resolvedParams.id)

        // Try to get real application data first
        const response = await fetch(`/pages/api/recruiter/application/list?gigId=${resolvedParams.id}`)
        if (response.ok) {
          const data = await response.json()
          if (data.applications && data.applications.length > 0) {
            // Convert application data to Applicant format
            const app = data.applications[0]
            const convertedApplicant: Applicant = {
              id: resolvedParams.id, // Use the param ID, not app.id
              name: app.student?.name || 'Unknown Candidate',
              email: app.student?.email || '',
              location: 'Remote', // Default fallback
              experience: 2, // Default fallback
              education: 'Bachelor\'s Degree', // Default fallback
              skills: [{ name: 'JavaScript', level: 'intermediate' }, { name: 'React', level: 'intermediate' }], // Default skills
              status: app.status || 'applied',
              appliedDate: app.createdAt || new Date().toISOString(),
              proposal: app.coverLetter || 'No proposal provided',
              github: 'https://github.com/example',
              linkedin: 'https://linkedin.com/in/example',
              portfolio: ['https://portfolio.example.com'],
              resume: 'https://example.com/resume.pdf',
              salaryExpectation: '$50,000 - $70,000',
              timeline: [],
              matchScore: 85
            }
            setApplicant(convertedApplicant)
            return
          }
        }

        // Fallback to mock data if API fails - for demo purposes
        const convertedApplicant: Applicant = {
          id: resolvedParams.id,
          name: 'Demo Candidate',
          email: 'demo@company.com',
          location: 'San Francisco, CA',
          experience: 3,
          education: 'Masters in Computer Science',
          skills: [{ name: 'React', level: 'advanced' }, { name: 'Node.js', level: 'intermediate' }, { name: 'TypeScript', level: 'advanced' }],
          status: 'shortlisted',
          appliedDate: new Date().toISOString(),
          proposal: 'I am excited to apply for this role as I have extensive experience with React and modern web development practices.',
          github: 'https://github.com/democandidate',
          linkedin: 'https://linkedin.com/in/democandidate',
          portfolio: ['https://democandidate.dev'],
          resume: 'https://example.com/resume.pdf',
          salaryExpectation: '$80,000 - $100,000',
          timeline: [],
          matchScore: 92
        }
        setApplicant(convertedApplicant)
      } catch (error) {
        console.error('Failed to load applicant:', error)
        setApplicant(null)
      } finally {
        setLoading(false)
      }
    }

    loadApplicant()
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
