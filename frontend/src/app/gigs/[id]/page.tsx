import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Clock, DollarSign, Building, Users } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { GigSuccessPredictor } from '@/components/gigs/GigSuccessPredictor'
import { ProposalForm } from '@/components/proposals/ProposalForm'
import { mockGigs } from '@/lib/gigs/mockData'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getGig(id: string) {
  const gig = mockGigs.find(g => g.id === parseInt(id))
  if (!gig) {
    notFound()
  }
  return gig
}

export default async function GigDetailsPage({ params }: PageProps) {
  const { id } = await params
  const gig = await getGig(id)

  return (
    <div className="min-h-screen space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/gigs"
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Gigs
        </Link>
        <div className="text-white/60 text-sm">
          Posted {gig.postedAt}
        </div>
      </div>

      {/* Main Gig Details */}
      <GlassCard className="space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{gig.title}</h1>
            <div className="flex items-center text-white/70 mb-4">
              <Building className="w-5 h-5 mr-2" />
              <span className="text-lg">{gig.company}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center text-white/80">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                <div>
                  <div className="font-semibold text-green-400">{gig.salary}</div>
                  <div className="text-xs text-white/60">Salary</div>
                </div>
              </div>
              <div className="flex items-center text-white/80">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                <div>
                  <div className="font-semibold">{gig.location}</div>
                  <div className="text-xs text-white/60">Location</div>
                </div>
              </div>
              <div className="flex items-center text-white/80">
                <Clock className="w-5 h-5 mr-2 text-purple-400" />
                <div>
                  <div className="font-semibold">{gig.duration}</div>
                  <div className="text-xs text-white/60">Duration</div>
                </div>
              </div>
              <div className="flex items-center text-white/80">
                <Users className="w-5 h-5 mr-2 text-yellow-400" />
                <div>
                  <div className="font-semibold">{gig.experience}</div>
                  <div className="text-xs text-white/60">Level</div>
                </div>
              </div>
            </div>

            {gig.matchScore && (
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                gig.matchScore >= 85 ? 'bg-green-500/20 text-green-400' :
                gig.matchScore >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {gig.matchScore}% skill match
              </div>
            )}
          </div>

          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700">
            Apply Now
          </button>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Job Description</h3>
          <p className="text-white/80">{gig.description}</p>
        </div>
      </GlassCard>

      {/* AI Success Predictor */}
      <GigSuccessPredictor gigId={gig.id} />

      {/* Proposal Form */}
      <ProposalForm
        gigId={gig.id}
        gigRequirements={gig.requirements}
        onProposalGenerated={(proposal, pricing) => {
          console.log('Proposal generated:', { proposal, pricing })
        }}
      />

      {/* Footer */}
      <div className="flex justify-between items-center pt-8">
        <Link
          href="/student/gigs"
          className="flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse More Gigs
        </Link>
        <div className="text-white/60 text-sm">
          Powered by Hirezy AI
        </div>
      </div>
    </div>
  )
}
