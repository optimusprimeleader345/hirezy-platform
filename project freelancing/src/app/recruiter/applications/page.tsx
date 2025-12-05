'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Filter, Users, CheckCircle, XCircle, Clock, Star, Briefcase, BarChart3, Square } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ActionBar } from '@/components/recruiter/ActionBar'

import { mockGigs, mockApplicants, type Applicant } from '@/lib/ai/recruiter/mockData'

export default function ApplicationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([])

  // Collect all applicants from all gigs
  const allApplications = useMemo(() => {
    const applications: Array<Applicant & { gigTitle: string; gigId: string }> = []

    mockGigs.forEach(gig => {
      gig.applicants?.forEach(applicant => {
        applications.push({
          ...applicant,
          gigTitle: gig.title,
          gigId: gig.id
        })
      })
    })

    return applications
  }, [])

  // Filter applications based on search and status
  const filteredApplications = useMemo(() => {
    return allApplications.filter(applicant => {
      const matchesSearch = searchQuery === '' ||
        applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        applicant.gigTitle.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [allApplications, searchQuery, statusFilter])

  // Statistics
  const stats = useMemo(() => {
    const total = allApplications.length
    const shortlisted = allApplications.filter(a => a.status === 'shortlisted').length
    const rejected = allApplications.filter(a => a.status === 'rejected').length
    const applied = allApplications.filter(a => a.status === 'applied').length
    const interviewed = allApplications.filter(a => a.status === 'interviewed').length
    const hired = allApplications.filter(a => a.status === 'hired').length

    return { total, shortlisted, rejected, applied, interviewed, hired }
  }, [allApplications])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'interviewed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'hired':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'interviewed':
        return <Users className="w-4 h-4" />
      case 'hired':
        return <Star className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleAction = (action: string, applicantId: string) => {
    console.log(`Action: ${action} for applicant: ${applicantId}`)
    // In a real implementation, this would update the backend
    alert(`Action "${action}" performed for applicant ${applicantId}`)
  }

  const handleComparisonToggle = (applicantId: string) => {
    setSelectedForComparison(prev =>
      prev.includes(applicantId)
        ? prev.filter(id => id !== applicantId)
        : [...prev, applicantId]
    )
  }

  const handleCompareSelected = () => {
    if (selectedForComparison.length >= 2) {
      const candidatesParam = selectedForComparison.join(',')
      router.push(`/recruiter/applications/comparison?candidates=${candidatesParam}`)
    }
  }

  const toggleComparisonMode = () => {
    setComparisonMode(!comparisonMode)
    setSelectedForComparison([])
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          All Applications
        </h1>
        <p className="text-white/80 text-lg">View and manage all job applications across your postings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Applied</p>
              <p className="text-lg font-bold text-white">{stats.applied}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Shortlisted</p>
              <p className="text-lg font-bold text-white">{stats.shortlisted}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Interviewed</p>
              <p className="text-lg font-bold text-white">{stats.interviewed}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Hired</p>
              <p className="text-lg font-bold text-white">{stats.hired}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-xs text-gray-400">Rejected</p>
              <p className="text-lg font-bold text-white">{stats.rejected}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-lg font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters & Mode Toggle */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by candidate or job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2 items-center">
          {!comparisonMode && (
            <>
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
              >
                All ({stats.total})
              </Button>

              <Button
                variant={statusFilter === 'applied' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('applied')}
                className={statusFilter === 'applied' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
              >
                Applied ({stats.applied})
              </Button>

              <Button
                variant={statusFilter === 'shortlisted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('shortlisted')}
                className={statusFilter === 'shortlisted' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
              >
                Shortlisted ({stats.shortlisted})
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={toggleComparisonMode}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {comparisonMode ? <><Square className="w-4 h-4 mr-1" /> Exit Compare</> : <><BarChart3 className="w-4 h-4 mr-1" /> Compare</>}
          </Button>

          {comparisonMode && selectedForComparison.length >= 2 && (
            <Button
              size="sm"
              onClick={handleCompareSelected}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Compare {selectedForComparison.length} Candidates
            </Button>
          )}
        </div>

        {!comparisonMode && (
          <div className="sm:w-auto">
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              Export All
            </Button>
          </div>
        )}
      </div>

      {/* Applications List */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Applications ({filteredApplications.length})
              {comparisonMode && selectedForComparison.length > 0 && (
                <span className="ml-2 text-sm text-purple-400">
                  ({selectedForComparison.length} selected)
                </span>
              )}
            </h3>
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No applications found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredApplications.map((applicant) => {
                const isSelected = selectedForComparison.includes(applicant.id.toString())

                return (
                  <div
                    key={`${applicant.id}-${applicant.gigId}`}
                    className={`relative p-4 rounded-xl border transition-all duration-200 ${
                      comparisonMode
                        ? `border-white/10 bg-white/5 ${
                            isSelected
                              ? 'ring-2 ring-purple-500 bg-purple-500/5'
                              : 'hover:bg-white/10'
                          }`
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    } ${comparisonMode ? 'cursor-pointer' : ''}`}
                    onClick={comparisonMode ? () => handleComparisonToggle(applicant.id.toString()) : undefined}
                  >
                    {comparisonMode && (
                      <div
                        className={`absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-purple-600 border-purple-600'
                            : 'border-white/30 bg-white/5'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleComparisonToggle(applicant.id.toString())
                        }}
                      >
                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>}
                      </div>
                    )}

                    {!comparisonMode ? (
                      <Link href={`/recruiter/applications/${applicant.id}`} className="block">
                        <ApplicationContent applicant={applicant} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                      </Link>
                    ) : (
                      <ApplicationContent applicant={applicant} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />
                    )}

                    {!comparisonMode && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <ActionBar
                          applicant={applicant}
                          onShortlist={(id) => handleAction('shortlist', id)}
                          onReject={(id) => handleAction('reject', id)}
                          onMessage={(id) => handleAction('message', id)}
                          onDownload={(id) => handleAction('download', id)}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function ApplicationContent({ applicant, getStatusColor, getStatusIcon }: {
  applicant: any,
  getStatusColor: (status: string) => string,
  getStatusIcon: (status: string) => JSX.Element
}) {
  return (
    <>
      <div className="flex items-start space-x-4 flex-1">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
          <span className="text-white font-semibold text-lg">
            {applicant.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold truncate">{applicant.name}</h4>
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1 ${
              getStatusColor(applicant.status)
            }`}>
              {getStatusIcon(applicant.status)}
              {applicant.status}
            </div>
            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">
              {applicant.gigTitle}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {applicant.location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {applicant.experience} years exp
            </div>
            {applicant.matchScore && (
              <div className="flex items-center gap-1 text-green-400 font-medium">
                <CheckCircle className="w-3 h-3" />
                {applicant.matchScore}% match
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {applicant.skills && applicant.skills.slice(0, 4).map((skill: any, index: number) => (
              <span
                key={index}
              >
                {typeof skill === 'string' ? skill : skill.name}
              </span>
            ))}
            {applicant.skills.length > 4 && (
              <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded-full text-xs">
                +{applicant.skills.length - 4}
              </span>
            )}
          </div>

          {applicant.proposal && (
            <p className="text-gray-400 text-sm line-clamp-2 mt-2">
              "{applicant.proposal.substring(0, 100)}{applicant.proposal.length > 100 ? '...' : ''}"
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0 mt-4 pt-4 border-t border-white/10">
        <div className="text-right">
          <div className="text-sm text-gray-400">Applied</div>
          <div className="text-xs text-gray-300" suppressHydrationWarning>
            {new Date(applicant.appliedDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </>
  )
}
