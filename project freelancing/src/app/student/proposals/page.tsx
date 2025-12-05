import Link from 'next/link'
import { ArrowLeft, Eye, Clock, CheckCircle, XCircle, Clock3, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { mockProposals } from '@/lib/proposals/mockData'

export default function StudentProposalsPage() {
  const stats = {
    total: mockProposals.length,
    pending: mockProposals.filter(p => p.status === 'Pending').length,
    accepted: mockProposals.filter(p => p.status === 'Accepted').length,
    rejected: mockProposals.filter(p => p.status === 'Rejected').length,
    shortlisted: mockProposals.filter(p => p.status === 'Shortlisted').length
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'Shortlisted':
        return <Clock className="w-4 h-4 text-blue-400" />
      default:
        return <Clock3 className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Shortlisted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/student/dashboard"
            className="flex items-center text-white/70 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">My Proposals</h1>
          <p className="text-white/60">Track your submitted proposals and their status</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
          <div className="text-white/70 text-sm">Total Proposals</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
          <div className="text-white/70 text-sm">Pending</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-blue-400 mb-1">{stats.shortlisted}</div>
          <div className="text-white/70 text-sm">Shortlisted</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-green-400 mb-1">{stats.accepted}</div>
          <div className="text-white/70 text-sm">Accepted</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-red-400 mb-1">{stats.rejected}</div>
          <div className="text-white/70 text-sm">Rejected</div>
        </GlassCard>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Proposal History</h2>

        {mockProposals.length === 0 ? (
          <GlassCard>
            <div className="text-center py-12">
              <div className="text-white/60 mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">No proposals yet</p>
                <p className="text-sm">Start applying to gigs to see your proposals here!</p>
              </div>
              <Link
                href="/student/gigs"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700"
              >
                Browse Gigs
              </Link>
            </div>
          </GlassCard>
        ) : (
          <div className="space-y-4">
            {mockProposals.map((proposal) => (
              <GlassCard key={proposal.id} className="hover:bg-white/5 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{proposal.gigTitle}</h3>
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                        {getStatusIcon(proposal.status)}
                        <span>{proposal.status}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Submitted {proposal.submittedAt}
                      </div>
                      <div>Pricing: {proposal.price}</div>
                      <div>Score: {proposal.score}/100</div>
                    </div>

                    {proposal.clientResponse && (
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <div className="text-white/80 font-medium text-sm mb-1">Client Response:</div>
                        <div className="text-white/70 text-sm">{proposal.clientResponse}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center px-4 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors text-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Proposal
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <GlassCard className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
        <div className="text-center py-6">
          <h3 className="text-xl font-bold text-white mb-2">Improve Your Success Rate</h3>
          <p className="text-white/70 mb-4">
            Use AI-powered proposal generation and pricing suggestions to boost your acceptance rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/student/gigs"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700"
            >
              Apply to More Gigs
            </Link>
            <Link
              href="/student/dashboard"
              className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              View AI Tools
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
