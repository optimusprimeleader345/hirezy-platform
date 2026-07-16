'use client'

import { useState, useEffect } from 'react'
import { Brain, CheckCircle, XCircle, AlertTriangle, Search, Filter, RefreshCw, Eye, Clock, Trash2, Edit3, ThumbsUp, ThumbsDown, Target, Zap, TrendingUp, Shield, FileText } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface GigAnalysis {
  gigId: string
  title: string
  company: string
  postedBy: string
  postedAt: string
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  qualityScore: number
  scamRisk: number
  aiAnalysis: {
    contentQuality: number
    jobClarity: number
    skillMatch: number
    compensation: 'low' | 'fair' | 'high'
    urgency: 'normal' | 'high'
  }
  flags: Array<{
    type: 'scam' | 'spam' | 'duplicate' | 'quality' | 'compliance'
    severity: 'low' | 'medium' | 'high'
    description: string
  }>
  aiRecommendation: 'approve' | 'reject' | 'review'
  reasons: string[]
}

export default function AdminGigsPage() {
  const [gigs, setGigs] = useState<GigAnalysis[]>([])
  const [selectedGig, setSelectedGig] = useState<GigAnalysis | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedGigs, setSelectedGigs] = useState<string[]>([])

  // Mock AI-analyzed gig data
  const [gigData] = useState<GigAnalysis[]>([
    {
      gigId: 'gig_001',
      title: 'Senior React Developer Needed',
      company: 'TechCorp Inc.',
      postedBy: 'john.recruiter@techcorp.com',
      postedAt: '2 hours ago',
      status: 'pending',
      qualityScore: 87,
      scamRisk: 12,
      aiAnalysis: {
        contentQuality: 85,
        jobClarity: 92,
        skillMatch: 83,
        compensation: 'high',
        urgency: 'normal'
      },
      flags: [],
      aiRecommendation: 'approve',
      reasons: ['High quality job description', 'Clear requirements', 'Competitive compensation']
    },
    {
      gigId: 'gig_002',
      title: 'URGENT! Make $5000 in ONE DAY!!!',
      company: 'Amazing Opportunities',
      postedBy: 'scammer@example.com',
      postedAt: '30 minutes ago',
      status: 'flagged',
      qualityScore: 23,
      scamRisk: 95,
      aiAnalysis: {
        contentQuality: 15,
        jobClarity: 22,
        skillMatch: 18,
        compensation: 'fair',
        urgency: 'high'
      },
      flags: [
        { type: 'scam', severity: 'high', description: 'Unrealistic earnings claims' },
        { type: 'spam', severity: 'high', description: 'Excessive exclamation marks and urgency' },
        { type: 'quality', severity: 'medium', description: 'Poor content quality' }
      ],
      aiRecommendation: 'reject',
      reasons: ['Scam indicators detected', 'Unrealistic promises', 'Poor job description quality']
    },
    {
      gigId: 'gig_003',
      title: 'Full Stack Developer - Remote',
      company: 'StartupXYZ',
      postedBy: 'hr@startupxyz.com',
      postedAt: '1 hour ago',
      status: 'approved',
      qualityScore: 76,
      scamRisk: 8,
      aiAnalysis: {
        contentQuality: 74,
        jobClarity: 78,
        skillMatch: 75,
        compensation: 'fair',
        urgency: 'normal'
      },
      flags: [
        { type: 'quality', severity: 'low', description: 'Minor clarity improvements needed' }
      ],
      aiRecommendation: 'approve',
      reasons: ['Legitimate posting', 'Clear job requirements', 'Reasonable compensation']
    },
    {
      gigId: 'gig_004',
      title: 'Data Scientist Position',
      company: 'DataTech Solutions',
      postedBy: 'recruiter@datatech.com',
      postedAt: '3 hours ago',
      status: 'pending',
      qualityScore: 91,
      scamRisk: 5,
      aiAnalysis: {
        contentQuality: 92,
        jobClarity: 89,
        skillMatch: 93,
        compensation: 'high',
        urgency: 'normal'
      },
      flags: [],
      aiRecommendation: 'approve',
      reasons: ['Excellent job description', 'Specific skill requirements', 'Competitive salary range']
    },
    {
      gigId: 'gig_005',
      title: 'Simple Copy-Paste Task',
      company: 'Freelance Hub',
      postedBy: 'admin@freelancehub.com',
      postedAt: '45 minutes ago',
      status: 'pending',
      qualityScore: 34,
      scamRisk: 45,
      aiAnalysis: {
        contentQuality: 28,
        jobClarity: 35,
        skillMatch: 40,
        compensation: 'low',
        urgency: 'high'
      },
      flags: [
        { type: 'quality', severity: 'high', description: 'Insufficient job details' },
        { type: 'spam', severity: 'low', description: 'Generic job posting' }
      ],
      aiRecommendation: 'review',
      reasons: ['Requires manual review', 'Job details incomplete', 'Quality borderline']
    }
  ])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const handleGigAction = (gigId: string, action: 'approve' | 'reject' | 'flag', reasons?: string[]) => {
    setGigs(prev => prev.map(gig =>
      gig.gigId === gigId
        ? { ...gig, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged' }
        : gig
    ))
  }

  const handleBulkAction = (action: 'approve' | 'reject') => {
    setGigs(prev => prev.map(gig =>
      selectedGigs.includes(gig.gigId)
        ? { ...gig, status: action === 'approve' ? 'approved' : 'rejected' }
        : gig
    ))
    setSelectedGigs([])
  }

  const toggleGigSelection = (gigId: string) => {
    setSelectedGigs(prev => prev.includes(gigId)
      ? prev.filter(id => id !== gigId)
      : [...prev, gigId]
    )
  }

  const selectAllGigs = () => {
    const filteredGigIds = filteredGigs.map(gig => gig.gigId)
    setSelectedGigs(prev =>
      prev.length === filteredGigIds.length ? [] : filteredGigIds
    )
  }

  useEffect(() => {
    setGigs(gigData)
  }, [])

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gig.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || gig.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'text-green-400'
      case 'rejected': return 'text-red-400'
      case 'flagged': return 'text-orange-400'
      case 'pending': return 'text-yellow-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'rejected': return <XCircle className="w-4 h-4 text-red-400" />
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-orange-400" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />
      default: return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk > 70) return 'bg-red-500'
    if (risk > 40) return 'bg-orange-500'
    if (risk > 20) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getRecommendationColor = (rec: string) => {
    switch(rec) {
      case 'approve': return 'bg-green-900/50 text-green-400'
      case 'reject': return 'bg-red-900/50 text-red-400'
      case 'review': return 'bg-yellow-900/50 text-yellow-400'
      default: return 'bg-slate-900/50 text-slate-400'
    }
  }

  const gigMetrics = {
    totalAnalyzed: gigs.length,
    autoApproved: gigs.filter(g => g.aiRecommendation === 'approve' && g.status === 'approved').length,
    autoRejected: gigs.filter(g => g.aiRecommendation === 'reject' && g.status === 'rejected').length,
    pendingReview: gigs.filter(g => g.status === 'pending').length,
    flagged: gigs.filter(g => g.status === 'flagged').length,
    avgQualityScore: Math.round(gigs.reduce((sum, g) => sum + g.qualityScore, 0) / gigs.length),
    avgScamRisk: Math.round(gigs.reduce((sum, g) => sum + g.scamRisk, 0) / gigs.length)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="w-10 h-10 text-indigo-400" />
            Complete Gig Moderation System
          </h1>
          <p className="text-slate-300">AI-powered content analysis, scam detection, and automated approval workflows</p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Analyzing...' : 'Refresh Analysis'}
        </Button>
      </div>

      {/* AI Moderation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Target className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-indigo-400">{gigMetrics.totalAnalyzed}</div>
            <div className="text-slate-400 text-xs">Gigs Analyzed</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-400">{gigMetrics.autoApproved}</div>
            <div className="text-slate-400 text-xs">Auto Approved</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <XCircle className="w-6 h-6 text-red-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-red-400">{gigMetrics.autoRejected}</div>
            <div className="text-slate-400 text-xs">Auto Rejected</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-yellow-400">{gigMetrics.pendingReview}</div>
            <div className="text-slate-400 text-xs">Pending Review</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-orange-400">{gigMetrics.flagged}</div>
            <div className="text-slate-400 text-xs">Flagged</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Brain className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-400">{gigMetrics.avgQualityScore}%</div>
            <div className="text-slate-400 text-xs">Avg Quality</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Bulk Actions */}
      {selectedGigs.length > 0 && (
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">{selectedGigs.length} gigs selected</span>
            <div className="flex gap-2">
              <Button
                onClick={() => handleBulkAction('approve')}
                className="bg-green-600 hover:bg-green-700"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Bulk Approve
              </Button>
              <Button
                onClick={() => handleBulkAction('reject')}
                className="bg-red-600 hover:bg-red-700"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Bulk Reject
              </Button>
            </div>
          </div>
        </AdminGlassCard>
      )}

      {/* Gig Moderation Queue */}
      <AdminGlassCard title="AI Gig Moderation Queue">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                type="text"
                placeholder="Search gigs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 w-80"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
          <Button
            onClick={selectAllGigs}
            variant="outline"
            size="sm"
            className="border-slate-600 hover:bg-slate-800"
          >
            {selectedGigs.length === filteredGigs.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold text-left">
                  <input
                    type="checkbox"
                    checked={selectedGigs.length === filteredGigs.length && filteredGigs.length > 0}
                    onChange={selectAllGigs}
                    className="rounded border-slate-600"
                  />
                </th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Gig Details</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">AI Quality</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Scam Risk</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">AI Recommendation</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Status</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGigs.map((gig) => (
                <tr key={gig.gigId} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4">
                    <input
                      type="checkbox"
                      checked={selectedGigs.includes(gig.gigId)}
                      onChange={() => toggleGigSelection(gig.gigId)}
                      className="rounded border-slate-600"
                    />
                  </td>
                  <td className="py-4">
                    <div className="max-w-xs">
                      <div className="font-semibold text-white text-sm mb-1 truncate">
                        {gig.title}
                      </div>
                      <div className="text-slate-400 text-xs mb-1">
                        {gig.company}
                      </div>
                      <div className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {gig.postedAt}
                      </div>
                      {gig.flags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {gig.flags.slice(0, 2).map((flag, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 text-xs rounded-full ${
                                flag.severity === 'high' ? 'bg-red-900/50 text-red-300' :
                                flag.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                                'bg-blue-900/50 text-blue-300'
                              }`}
                            >
                              {flag.type}
                            </span>
                          ))}
                          {gig.flags.length > 2 && (
                            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-900/50 text-slate-300">
                              +{gig.flags.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className={`font-bold ${
                        gig.qualityScore > 80 ? 'text-green-400' :
                        gig.qualityScore > 60 ? 'text-blue-400' :
                        gig.qualityScore > 40 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {gig.qualityScore}%
                      </span>
                      <div className="w-16 h-2 bg-slate-700 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            gig.qualityScore > 80 ? 'bg-green-500' :
                            gig.qualityScore > 60 ? 'bg-blue-500' :
                            gig.qualityScore > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${gig.qualityScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-slate-300">{gig.scamRisk}%</span>
                      <div className="w-16 h-2 bg-slate-700 rounded-full mt-1">
                        <div
                          className={`h-2 rounded-full ${getRiskColor(gig.scamRisk)}`}
                          style={{ width: `${gig.scamRisk}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getRecommendationColor(gig.aiRecommendation)}`}>
                      {gig.aiRecommendation.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(gig.status)}
                      <span className={`text-sm capitalize ${getStatusColor(gig.status)}`}>
                        {gig.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-1 justify-center">
                      {gig.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleGigAction(gig.gigId, 'approve')}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 h-7 px-2"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </Button>
                          <Button
                            onClick={() => handleGigAction(gig.gigId, 'reject')}
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 h-7 px-2"
                          >
                            <XCircle className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => setSelectedGig(gig)}
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 border-slate-600 hover:bg-slate-800"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Gig Analysis Modal */}
      {selectedGig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedGig.title}</h3>
                <div className="text-slate-400 mb-2">{selectedGig.company}</div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>Posted by: {selectedGig.postedBy}</span>
                  <span>Status: <span className={getStatusColor(selectedGig.status)}>{selectedGig.status}</span></span>
                </div>
              </div>
              <button
                onClick={() => setSelectedGig(null)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* AI Analysis Scores */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  AI Content Analysis
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Overall Quality:</span>
                    <span className="text-white font-bold">{selectedGig.qualityScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Content Quality:</span>
                    <span className="text-blue-400">{selectedGig.aiAnalysis.contentQuality}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Job Clarity:</span>
                    <span className="text-green-400">{selectedGig.aiAnalysis.jobClarity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Skill Match:</span>
                    <span className="text-purple-400">{selectedGig.aiAnalysis.skillMatch}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Scam Risk:</span>
                    <span className={selectedGig.scamRisk > 70 ? 'text-red-400' : selectedGig.scamRisk > 40 ? 'text-orange-400' : 'text-green-400'}>
                      {selectedGig.scamRisk}%
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  AI Recommendation
                </h4>
                <div className={`p-3 rounded-lg mb-4 ${getRecommendationColor(selectedGig.aiRecommendation)} border border-opacity-50 ${
                  selectedGig.aiRecommendation === 'approve' ? 'border-green-500' :
                  selectedGig.aiRecommendation === 'reject' ? 'border-red-500' :
                  'border-yellow-500'
                }`}>
                  <div className="text-center font-bold text-lg mb-2">
                    {selectedGig.aiRecommendation.toUpperCase()}
                  </div>
                  <div className="text-sm space-y-1">
                    {selectedGig.reasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-slate-300">Compensation Level:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    selectedGig.aiAnalysis.compensation === 'high' ? 'bg-green-900/50 text-green-400' :
                    selectedGig.aiAnalysis.compensation === 'fair' ? 'bg-blue-900/50 text-blue-400' :
                    'bg-gray-900/50 text-gray-400'
                  }`}>
                    {selectedGig.aiAnalysis.compensation.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Flags */}
            {selectedGig.flags.length > 0 && (
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Security & Quality Flags ({selectedGig.flags.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedGig.flags.map((flag, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${
                        flag.severity === 'high' ? 'bg-red-900/20 border-red-700' :
                        flag.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-700' :
                        'bg-blue-900/20 border-blue-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                          flag.severity === 'high' ? 'bg-red-900/50 text-red-300' :
                          flag.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                          'bg-blue-900/50 text-blue-300'
                        }`}>
                          {flag.type.toUpperCase()}
                        </span>
                        <span className={`text-xs ${
                          flag.severity === 'high' ? 'text-red-400' :
                          flag.severity === 'medium' ? 'text-yellow-400' :
                          'text-blue-400'
                        }`}>
                          {flag.severity}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{flag.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
              <Button variant="outline" onClick={() => setSelectedGig(null)}>
                Close Review
              </Button>
              {selectedGig.status === 'pending' && (
                <>
                  <Button
                    onClick={() => {
                      handleGigAction(selectedGig.gigId, 'flag')
                      setSelectedGig(null)
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Flag for Review
                  </Button>
                  <Button
                    onClick={() => {
                      handleGigAction(selectedGig.gigId, 'reject')
                      setSelectedGig(null)
                    }}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Gig
                  </Button>
                  <Button
                    onClick={() => {
                      handleGigAction(selectedGig.gigId, 'approve')
                      setSelectedGig(null)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Gig
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
