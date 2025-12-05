'use client'

import { useState, useMemo, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { realApplicants } from '@/lib/ai/recruiter/mockData'
import { mockGigs } from '@/lib/gigs/mockData'
import {
  ArrowLeft,
  User,
  DollarSign,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  Download
} from 'lucide-react'

export default function OfferLetterPage() {
  const params = useParams()
  const router = useRouter()
  const candidateId = params.candidateId as string

  // Form data
  const [payRange, setPayRange] = useState('')
  const [duration, setDuration] = useState('Full-time')
  const [startDate, setStartDate] = useState('')
  const [workMode, setWorkMode] = useState('Remote')
  const [projectSummary, setProjectSummary] = useState('')

  // Find candidate directly from realApplicants
  const candidate = realApplicants.find(app => app.id === candidateId)

  // Find a related gig that could be associated (just pick first gig for demo)
  const relatedGig = mockGigs[0]

  // Auto-fill form fields when candidate loads
  useEffect(() => {
    if (candidate) {
      // Auto-fill with reasonable defaults based on candidate
      const mockPay = `$${25 + Math.floor(Math.random() * 25)}` // $25-$50/hour base
      setPayRange(`$${mockPay}/hour - Winning Bid`)
      setStartDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]) // 2 weeks from now
      setProjectSummary(relatedGig?.description.substring(0, 200) + '...' || '')
    }
  }, [candidate, relatedGig])

  // Generate the offer letter content
  const offerLetterContent = useMemo(() => {
    if (!candidate) return ''

    return `Dear ${candidate.name},

We are thrilled to extend an offer for the position of "${relatedGig?.title || 'Full Stack Developer'}" at Hirezy.

After reviewing your application and impressive credentials, we believe you would be a valuable addition to our team.

OFFER DETAILS:

Position: ${relatedGig?.title || 'Full Stack Developer'}
Compensation: ${payRange || '$XX/hour'}
Duration: ${duration}
Start Date: ${startDate ? new Date(startDate).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) : 'TBD'}
Work Mode: ${workMode}

PROJECT SUMMARY:

${projectSummary || 'We are working on exciting projects that will challenge and develop your skills...'}

ABOUT THE ROLE:

Based on your skills in ${candidate.skills?.slice(0, 3).map((skill: any) => typeof skill === 'string' ? skill : skill.name).join(', ')}, you will be contributing to:

• High-impact software development projects
• Collaborative team environment
• Opportunities for professional growth
• Flexible work arrangements

YOUR PROFILE:

With ${candidate.experience} years of experience and a ${candidate.matchScore}% match rate for our requirements, you are exactly what we are looking for.

We are excited about the possibility of working together. Please review the offer details above and feel free to reach out if you have any questions.

To accept this offer, please reply to this email or contact us directly.

Best regards,
The Hirezy Team
recruiting@hirezy.com
`
  }, [candidate, relatedGig, payRange, duration, startDate, workMode, projectSummary])

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    // For now, we'll just show an alert
    alert('PDF generation would be implemented here. This would create a professional PDF version of the offer letter.')
  }

  if (!candidate) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Candidate not found</h1>
        <Button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={() => router.back()} className="border-white/20 text-white hover:bg-white/10 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Offer Letter Generator
          </h1>
          <p className="text-white/80 text-lg">
            Create a professional offer letter for {candidate.name}
          </p>
        </div>
      </div>

      {/* Candidate Info */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Candidate Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {candidate.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{candidate.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {candidate.experience} years
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Skills Match</h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills?.slice(0, 4).map((skill: any, index: number) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                >
                  {typeof skill === 'string' ? skill : skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Offer Details Form */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Offer Details
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="payRange" className="text-white">Pay Range</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="payRange"
                    value={payRange}
                    onChange={(e) => setPayRange(e.target.value)}
                    placeholder="$XX/hour"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration" className="text-white">Duration</Label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <Label htmlFor="startDate" className="text-white">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workMode" className="text-white">Work Mode</Label>
                <select
                  id="workMode"
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Remote">Remote</option>
                  <option value="Office">Office</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="projectSummary" className="text-white">Project Summary</Label>
                <Textarea
                  id="projectSummary"
                  value={projectSummary}
                  onChange={(e) => setProjectSummary(e.target.value)}
                  placeholder="Brief description of the project(s) they'll be working on..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-400" />
                Offer Letter Preview
              </h2>
              <Button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-white text-sm whitespace-pre-wrap font-mono">
                {offerLetterContent}
              </pre>
            </div>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Send to Candidate
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Save as Draft
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                Copy to Clipboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
