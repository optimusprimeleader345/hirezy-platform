'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, CheckCircle, Clock, Star, FileText, Target, Brain, Zap, Eye, ThumbsUp, ThumbsDown } from 'lucide-react'
import { mockGigs, type Applicant } from '@/lib/ai/recruiter/mockData'

// AI Application Review Engine
const AI_REVIEW_SYSTEM = {
  analyzeProfile: (applicant: Applicant) => {
    const review = {
      overallScore: 0,
      strengths: [] as string[],
      weaknesses: [] as string[],
      redFlags: [] as string[],
      recommendations: '' as 'Shortlist' | 'Interview' | 'Reject',
      confidence: 0,
      skillMatch: 0,
      experienceFit: 0,
      culturalFit: 0,
      riskLevel: 'Low' as 'Low' | 'Medium' | 'High'
    }

    // Skill Analysis
    const gigSkills = ['React', 'TypeScript', 'Node.js', 'AWS']
    const applicantSkills = applicant.matchScore ? Array.from({length: Math.floor(applicant.matchScore/20)}, (_, i) =>
      gigSkills.slice(0, gigSkills.length - i)) : []
    const skillScore = applicantSkills.flat().length / gigSkills.length * 100

    // Experience Analysis
    const expScore = Math.min(applicant.matchScore || 0, 100)

    // Cultural Fit (simulated)
    const culturalScore = Math.floor(Math.random() * 30) + 70

    review.skillMatch = skillScore
    review.experienceFit = expScore
    review.culturalFit = culturalScore
    review.overallScore = Math.round((skillScore * 0.4 + expScore * 0.35 + culturalScore * 0.25))

    // Generate Strengths
    if (skillScore > 70) review.strengths.push('Strong technical skill alignment')
    if (expScore > 80) review.strengths.push('Excellent experience level')
    if (culturalScore > 75) review.strengths.push('Good cultural fit potential')

    // Generate Weaknesses
    if (skillScore < 80) review.weaknesses.push('Skills gap in core technologies')
    if (expScore < 70) review.weaknesses.push('Limited relevant experience')
    if (culturalScore < 80) review.weaknesses.push('Cultural fit concerns')

    // Red Flags
    const randomRedFlags = []
    if (Math.random() > 0.7) randomRedFlags.push('Employment gap detected')
    if (Math.random() > 0.8) randomRedFlags.push('Inconsistent skill progression')
    if (Math.random() > 0.9) randomRedFlags.push('Reference concerns')
    review.redFlags = randomRedFlags

    // Recommendations
    if (review.overallScore >= 85 && review.redFlags.length === 0) {
      review.recommendations = 'Shortlist'
      review.confidence = 90 + Math.floor(Math.random() * 10)
    } else if (review.overallScore >= 70) {
      review.recommendations = 'Interview'
      review.confidence = 75 + Math.floor(Math.random() * 15)
    } else {
      review.recommendations = 'Reject'
      review.confidence = 60 + Math.floor(Math.random() * 20)
    }

    review.riskLevel = review.redFlags.length > 1 ? 'High' : review.redFlags.length > 0 ? 'Medium' : 'Low'

    return review
  }
}

export default function AIApplicationReviewPage() {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [review, setReview] = useState<any>(null)
  const [processedApplications, setProcessedApplications] = useState<Set<string>>(new Set())
  const [bulkReviewing, setBulkReviewing] = useState(false)

  // Initialize processed applications
  useEffect(() => {
    // Mark first few as processed for demo
    const firstFewIds = mockGigs.flatMap(gig => gig.applicants?.slice(0, 2) || []).map(a => a.id || '')
    setProcessedApplications(new Set(firstFewIds))
  }, [])

  const handleAnalyzeApplication = (applicant: Applicant) => {
    setSelectedApplicant(applicant)
    setReview(null) // Clear previous review

    // Simulate AI processing
    setTimeout(() => {
      const analysis = AI_REVIEW_SYSTEM.analyzeProfile(applicant)
      setReview(analysis)
      setProcessedApplications(prev => new Set([...prev, applicant.id]))
    }, 2000)
  }

  const handleBulkAnalyze = () => {
    setBulkReviewing(true)

    const allApplicants = mockGigs.flatMap(gig => gig.applicants || [])

    // Analyze first 10 applications
    allApplicants.slice(0, 10).forEach((applicant, index) => {
      setTimeout(() => {
        AI_REVIEW_SYSTEM.analyzeProfile(applicant) // Process but don't display
        setProcessedApplications(prev => new Set([...prev, applicant.id]))

        if (index === 9) {
          setBulkReviewing(false)
          alert('✅ AI Analysis completed for 10 applications!')
        }
      }, index * 500)
    })
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'Shortlist': return 'bg-green-900 text-green-300'
      case 'Interview': return 'bg-blue-900 text-blue-300'
      default: return 'bg-red-900 text-red-300'
    }
  }

  const unanalyzedApplications = mockGigs.flatMap(gig => gig.applicants || []).filter(app => !processedApplications.has(app.id))

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#FFD700]" />
            AI Application Review Assistant
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Instant evaluation of candidate profiles, highlighting strengths, red flags, and recommendations
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleBulkAnalyze}
            disabled={bulkReviewing || unanalyzedApplications.length === 0}
            className="bg-[#FFD700] hover:bg-[#FFC107] text-black"
          >
            {bulkReviewing ? 'Analyzing...' : 'Bulk AI Analysis'} ({unanalyzedApplications.length})
          </Button>
          <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA]">
            Export Reports
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">{mockGigs.flatMap(g => g.applicants || []).length}</div>
            <div className="text-[#C9CFD6] text-sm">Total Applications</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3EFFA8] mb-1">{processedApplications.size}</div>
            <div className="text-[#C9CFD6] text-sm">AI-Analyzed</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#60A5FA] mb-1">
              {processedApplications.size > 0 ?
                Math.round(mockGigs.flatMap(g => g.applicants || [])
                  .filter(a => processedApplications.has(a.id))
                  .reduce((sum, a) => sum + (a.matchScore || 0), 0) / processedApplications.size) : 0}
            </div>
            <div className="text-[#C9CFD6] text-sm">Avg Match Score</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#EF4444] mb-1">{unanalyzedApplications.length}</div>
            <div className="text-[#C9CFD6] text-sm">Pending Analysis</div>
          </div>
        </Card>
      </div>

      {/* Application List */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">Application Queue</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGigs.flatMap(gig => gig.applicants || []).map((applicant) => (
            <Card
              key={applicant.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedApplicant?.id === applicant.id
                  ? 'bg-[#FFD700]/10 border-[#FFD700]'
                  : processedApplications.has(applicant.id)
                    ? 'bg-[#111315] border-[#23262B] hover:border-[#60A5FA]'
                    : 'bg-[#0D0F11] border-[#EF4444] opacity-75'
              }`}
              onClick={() => handleAnalyzeApplication(applicant)}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 bg-[#60A5FA]">
                  <AvatarFallback className="text-white font-bold text-sm">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-[#FFFFFF] font-medium">{applicant.name}</h4>
                  <p className="text-[#C9CFD6] text-sm">{applicant.pastExperience?.[0]?.title || 'Candidate'}</p>
                </div>
                {processedApplications.has(applicant.id) ? (
                  <CheckCircle className="w-6 h-6 text-[#3EFFA8]" />
                ) : (
                  <Clock className="w-6 h-6 text-[#EF4444]" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Match Score</span>
                  <Badge className={`text-xs ${
                    (applicant.matchScore || 0) >= 80 ? 'bg-green-900 text-green-300' :
                    (applicant.matchScore || 0) >= 60 ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {applicant.matchScore || 0}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Status</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    processedApplications.has(applicant.id) ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {processedApplications.has(applicant.id) ? 'Analyzed' : 'Pending'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {mockGigs.flatMap(g => g.applicants || []).length === 0 && (
          <div className="text-center py-12 text-[#8A8F98]">
            <FileText className="w-16 h-16 mx-auto mb-4 text-[#C9CFD6]" />
            No applications found
          </div>
        )}
      </Card>

      {/* AI Analysis Panel */}
      {selectedApplicant && (
        <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 bg-[#FFD700]">
                <AvatarFallback className="text-black font-bold text-sm">
                  {selectedApplicant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-[#FFFFFF]">{selectedApplicant.name}</h2>
                <p className="text-[#C9CFD6]">{selectedApplicant.pastExperience?.[0]?.title || 'Candidate'} • Applied via Hirezy</p>
              </div>
            </div>

            {review && (
              <Badge className={`px-4 py-2 ${getRecommendationColor(review.recommendations)}`}>
                {review.recommendations}
              </Badge>
            )}
          </div>

          {!review ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-[#FFD700] mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">AI Analysis in Progress</h3>
              <p className="text-[#C9CFD6]">Analyzing candidate profile, skills, and background...</p>
              <div className="mt-4 space-y-2">
                <div className="text-[#8A8F98] text-sm">✓ Reading resume and application details</div>
                <div className="text-[#8A8F98] text-sm">✓ Analyzing skill requirements alignment</div>
                <div className="text-[#8A8F98] text-sm">✓ Checking for red flags and inconsistencies</div>
                <div className="text-[#8A8F98] text-sm">✓ Generating hiring recommendations</div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Score Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                  <div className="text-3xl font-bold text-[#FFD700] mb-1">{review.overallScore}%</div>
                  <div className="text-[#C9CFD6] text-sm">Overall Score</div>
                  <div className="mt-2 w-full bg-[#23262B] rounded-full h-2">
                    <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: `${review.overallScore}%` }}></div>
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                  <div className="text-3xl font-bold text-[#3EFFA8] mb-1">{Math.round(review.skillMatch)}%</div>
                  <div className="text-[#C9CFD6] text-sm">Skill Match</div>
                  <div className="mt-2 w-full bg-[#23262B] rounded-full h-2">
                    <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: `${Math.min(review.skillMatch, 100)}%` }}></div>
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                  <div className="text-3xl font-bold text-[#60A5FA] mb-1">{review.culturalFit}%</div>
                  <div className="text-[#C9CFD6] text-sm">Cultural Fit</div>
                  <div className="mt-2 w-full bg-[#23262B] rounded-full h-2">
                    <div className="bg-[#60A5FA] h-2 rounded-full" style={{ width: `${review.culturalFit}%` }}></div>
                  </div>
                </div>

                <div className="text-center p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                  <div className="text-3xl font-bold text-[#EF4444] mb-1">{review.confidence}%</div>
                  <div className="text-[#C9CFD6] text-sm">Confidence</div>
                  <div className="mt-2 w-full bg-[#23262B] rounded-full h-2">
                    <div className="bg-[#EF4444] h-2 rounded-full" style={{ width: `${review.confidence}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-[#3EFFA8]" />
                    Strengths ({review.strengths.length})
                  </h4>
                  <div className="space-y-2">
                    {review.strengths.map((strength: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#111315] border border-[#23262B]">
                        <CheckCircle className="w-5 h-5 text-[#3EFFA8] mt-0.5 flex-shrink-0" />
                        <span className="text-[#C9CFD6]">{strength}</span>
                      </div>
                    ))}
                    {review.strengths.length === 0 && (
                      <p className="text-[#8A8F98] text-sm">No significant strengths identified</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <ThumbsDown className="w-5 h-5 text-[#EF4444]" />
                    Weaknesses ({review.weaknesses.length})
                  </h4>
                  <div className="space-y-2">
                    {review.weaknesses.map((weakness: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#111315] border border-[#23262B]">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span className="text-[#C9CFD6]">{weakness}</span>
                      </div>
                    ))}
                    {review.weaknesses.length === 0 && (
                      <p className="text-[#8A8F98] text-sm">No significant weaknesses identified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              <div>
                <h4 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                  Red Flags ({review.redFlags.length})
                </h4>
                {review.redFlags.length > 0 ? (
                  <div className="space-y-2">
                    {review.redFlags.map((flag: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                        <span className="text-[#C9CFD6]">{flag}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[#3EFFA8]/10 border border-[#3EFFA8]/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#3EFFA8]" />
                      <span className="text-[#C9CFD6]">No red flags detected</span>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Recommendation */}
              <div className="p-6 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20">
                <div className="flex items-center gap-4 mb-4">
                  <Zap className="w-8 h-8 text-[#FFD700]" />
                  <div>
                    <h4 className="text-xl font-bold text-[#FFFFFF]">AI Recommendation</h4>
                    <p className="text-[#C9CFD6]">Based on comprehensive analysis</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold mb-2 ${
                      review.recommendations === 'Shortlist' ? 'text-[#3EFFA8]' :
                      review.recommendations === 'Interview' ? 'text-[#60A5FA]' :
                      'text-[#EF4444]'
                    }`}>
                      {review.recommendations}
                    </div>
                    <p className="text-[#C9CFD6]">
                      Confidence: {review.confidence}% • Risk Level: {review.riskLevel}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Eye className="w-4 h-4 mr-2" />
                      View Full Profile
                    </Button>
                    <Button className={`${
                      review.recommendations === 'Shortlist' ? 'bg-[#3EFFA8] hover:bg-[#00ff88]' :
                      review.recommendations === 'Interview' ? 'bg-[#60A5FA] hover:bg-[#3B82F6]' :
                      'bg-[#EF4444] hover:bg-[#DC2626]'
                    } text-white`}>
                      {review.recommendations === 'Shortlist' ? 'Shortlist Candidate' :
                       review.recommendations === 'Interview' ? 'Schedule Interview' :
                       'Send Rejection'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recruiter Override */}
              <div className="p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                <h4 className="text-[#FFFFFF] font-medium mb-3">Recruiter Override</h4>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve AI Recommendation
                  </Button>
                  <Button size="sm" variant="outline" className="border-[#EF4444] text-[#EF4444]">
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Override Decision
                  </Button>
                  <Textarea
                    placeholder="Add notes for overridden decision..."
                    className="flex-1 min-h-[60px] bg-[#0D0F11] border-[#23262B]"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
