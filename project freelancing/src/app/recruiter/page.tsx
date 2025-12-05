'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, Filter, Star, MapPin, Calendar, Brain, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Import working components
import { GigList } from '@/components/recruiter/GigList'
import { GigEditor } from '@/components/recruiter/GigEditor'
import { ApplicantList } from '@/components/recruiter/ApplicantList'
import { ActionBar } from '@/components/recruiter/ActionBar'

import { mockGigs, mockAnalytics, type Gig, type Applicant } from '@/lib/ai/recruiter/mockData'

export default function RecruiterDashboard() {
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null)
  const [showCreateGig, setShowCreateGig] = useState(false)
  const [gigs, setGigs] = useState(mockGigs)
  const [analytics] = useState(mockAnalytics)

  const [isShortlisting, setIsShortlisting] = useState(false)
  const [shortlistedResults, setShortlistedResults] = useState<any[]>([])

  const handleSelectGig = (gig: Gig) => {
    setSelectedGig(gig)
    setShortlistedResults([]) // Reset shortlisting results
  }

  const handleCreateGig = (gigData: Partial<Gig>) => {
    const newGig: Gig = {
      id: `gig-${Date.now()}`,
      title: gigData.title || 'New Gig',
      company: 'TechSolutions Inc.',
      description: gigData.description || 'New gig description',
      skills: gigData.skills || [],
      budget: gigData.budget || '$0-$0',
      type: gigData.type || 'remote',
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
    }

    setGigs(prev => [...prev, newGig])
    setShowCreateGig(false)
  }

  const handleUpdateGig = (updatedGig: Gig) => {
    setGigs(prev => prev.map(g => g.id === updatedGig.id ? updatedGig : g))
    setSelectedGig(updatedGig)
  }

  const handleAIShortlist = async () => {
    if (!selectedGig) return

    setIsShortlisting(true)

    try {
      const response = await fetch('/api/recruiter/shortlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gigId: selectedGig.id,
          topN: 5 // Get top 5 matches by default
        }),
      })

      const data = await response.json()
      if (data.success) {
        // Update applicants with match scores
        const updatedGig = { ...selectedGig }
        if (updatedGig.applicants) {
          data.candidates.forEach((result: any) => {
            const applicantIndex = updatedGig.applicants!.findIndex(app => app.id === result.candidateId)
            if (applicantIndex !== -1) {
              updatedGig.applicants![applicantIndex].matchScore = result.matchScore
            }
          })
        }

        setSelectedGig(updatedGig)
        setShortlistedResults(data.candidates)
      }
    } catch (error) {
      console.error('Shortlisting failed:', error)
    } finally {
      setIsShortlisting(false)
    }
  }

  const handleApplicantAction = (action: string, applicantId: string) => {
    console.log(`Action: ${action} for applicant: ${applicantId}`)

    if (selectedGig?.applicants) {
      const updatedGig = { ...selectedGig }
      const applicantIndex = updatedGig.applicants!.findIndex(app => app.id === applicantId)

      if (applicantIndex !== -1) {
        const applicant = updatedGig.applicants![applicantIndex]

        switch (action) {
          case 'shortlist':
            applicant.status = 'shortlisted'
            updatedGig.shortlistedCount = (updatedGig.shortlistedCount || 0) + 1
            break
          case 'reject':
            applicant.status = 'rejected'
            break
          case 'message':
            // Open communication modal (placeholder)
            alert(`Message for ${applicant.name}`)
            break
        }

        setSelectedGig(updatedGig)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Recruiter Dashboard</h1>
          <p className="text-gray-300">
            Welcome back, Jane Wilson. Manage your job postings and review talent.
          </p>
        </div>
        <Button
          onClick={() => setShowCreateGig(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create Gig
        </Button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Gigs</p>
              <p className="text-2xl font-bold text-white">{analytics.totalGigs}</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Active Applicants</p>
              <p className="text-2xl font-bold text-white">{analytics.activeApplicants}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <MapPin className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Avg Match Score</p>
              <p className="text-2xl font-bold text-white">{analytics.averageMatchScore}%</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Hires</p>
              <p className="text-2xl font-bold text-white">{analytics.hires}</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Star className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Gig List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Job Postings</h2>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <GigList gigs={gigs} selectedGigId={selectedGig?.id} onSelectGig={handleSelectGig} />
        </div>

        {/* Right Column: Gig Details/Selected View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Advanced Analytics Toggle */}
          <div className="flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Advanced Analytics</span>
              <button
                className="px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full text-sm transition-all"
                onClick={() => setSelectedGig(null)}
              >
                View Dashboard Analytics
              </button>
            </div>
          </div>

          {!selectedGig ? (
            /* Advanced Analytics Dashboard when no gig selected */
            <div className="space-y-6">
              {/* Analytics Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-1">Monthly Forecast</p>
                      <p className="text-2xl font-bold text-white">13 days</p>
                      <p className="text-xs text-gray-400 mt-1">Predicted time to fill</p>
                    </div>
                    <div className="p-3 bg-purple-500/20 rounded-full">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300">Talent Market</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                        HOT
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-green-400 font-medium">87%</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-300 mb-1">Budget Utilization</p>
                      <p className="text-2xl font-bold text-white">$185k</p>
                      <p className="text-xs text-gray-400 mt-1">Spent this month</p>
                    </div>
                    <div className="p-3 bg-green-500/20 rounded-full">
                      <Filter className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-300">Remaining Budget</span>
                      <span className="text-green-400 font-medium">$65k</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recruitment Funnel */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Recruitment Funnel Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-red-500/20 rounded-full h-6 relative overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '100%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-white font-medium text-sm">Applied</span>
                        <span className="text-white font-semibold">989</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">100%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-orange-500/20 rounded-full h-6 relative overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '27.7%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-white font-medium text-sm">Shortlisted</span>
                        <span className="text-white font-semibold">274</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">27.7%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-yellow-500/20 rounded-full h-6 relative overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '16.7%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-white font-medium text-sm">Interviewed</span>
                        <span className="text-white font-semibold">165</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">16.7%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-green-500/20 rounded-full h-6 relative overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '10.2%' }}></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <span className="text-white font-medium text-sm">Hired</span>
                        <span className="text-white font-semibold">101</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm w-12">10.2%</span>
                  </div>
                </div>
              </Card>

              {/* Source of Hire */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Source of Hire Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-blue-300 font-bold text-lg">45%</span>
                    </div>
                    <p className="text-gray-300 text-sm">LinkedIn</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-green-300 font-bold text-lg">26%</span>
                    </div>
                    <p className="text-gray-300 text-sm">Website</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-purple-300 font-bold text-lg">17%</span>
                    </div>
                    <p className="text-gray-300 text-sm">Indeed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-yellow-300 font-bold text-lg">9%</span>
                    </div>
                    <p className="text-gray-300 text-sm">Referral</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                      <span className="text-red-300 font-bold text-lg">3%</span>
                    </div>
                    <p className="text-gray-300 text-sm">GitHub</p>
                  </div>
                </div>
              </Card>
            </div>
          ) : selectedGig ? (
            <div className="space-y-6">
              {/* Gig Detail Header */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{selectedGig.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs uppercase ${
                    selectedGig.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : selectedGig.status === 'paused'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {selectedGig.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Budget:</span>
                      <p className="text-white font-semibold">{selectedGig.budget}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <p className="text-white font-semibold capitalize">{selectedGig.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Applications:</span>
                      <p className="text-white font-semibold">{selectedGig.applicants?.length || 0}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Shortlisted:</span>
                      <p className="text-white font-semibold">{selectedGig.shortlistedCount || 0}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-300 text-sm leading-relaxed">{selectedGig.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedGig.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6 pt-6 border-t border-white/10">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleAIShortlist}
                    disabled={isShortlisting}
                  >
                    {isShortlisting ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Running AI Analysis...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Run AI Shortlist
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => alert('Edit gig functionality would open here')}
                  >
                    Edit Gig
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => alert('Analytics view would open here')}
                  >
                    View Analytics
                  </Button>
                </div>
              </Card>

              {/* Applicant List with AI Assessment Modal */}
              <ApplicantList
                applicants={selectedGig.applicants || []}
                onSelectApplicant={(applicant) => {
                  // Open AI Assessment Modal for selected applicant
                  const assessmentModal = document.createElement('div')
                  assessmentModal.innerHTML = `
                    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                      <div class="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-6 max-w-md w-full">
                        <h3 class="text-white text-lg font-semibold mb-4">AI Analysis: ${applicant.name}</h3>
                        <div class="space-y-4">
                          <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                            <p class="text-green-300 font-medium">Behavioral Analysis</p>
                            <p class="text-green-200 text-sm">Strong leadership potential with collaborative approach</p>
                          </div>
                          <div class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                            <p class="text-blue-300 font-medium">Cultural Fit</p>
                            <p class="text-blue-200 text-sm">Excellent alignment with company values</p>
                          </div>
                          <div class="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                            <p class="text-purple-300 font-medium">Skill Assessment</p>
                            <p class="text-purple-200 text-sm">Some skill gaps identified - 4.5 months to competency</p>
                          </div>
                        </div>
                        <div class="flex justify-end gap-3 mt-6">
                          <button class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white"
                            onclick="this.closest('.fixed').remove()">Close</button>
                          <button class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
                            onclick="this.closest('.fixed').remove()">View Full Assessment</button>
                        </div>
                      </div>
                    </div>
                  `
                  document.body.appendChild(assessmentModal)
                }}
              />
            </div>
          ) : (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 h-96 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Select a Gig</h3>
                <p className="text-gray-400">Choose a gig from the list to view applications and analytics</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Create Gig Modal */}
      {showCreateGig && (
        <GigEditor
          onSave={handleCreateGig}
          onCancel={() => setShowCreateGig(false)}
        />
      )}
    </div>
  )
}
