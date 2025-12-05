'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, MapPin, Star, User, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Applicant } from '@/lib/ai/recruiter/mockData'

interface ApplicantListProps {
  applicants: Applicant[]
  onSelectApplicant: (applicant: Applicant) => void
  selectedApplicantId?: string
}

export function ApplicantList({ applicants, onSelectApplicant, selectedApplicantId }: ApplicantListProps) {
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
        return <User className="w-4 h-4" />
      case 'hired':
        return <Star className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Applicants ({applicants.length})</h3>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10"
        >
          Run AI Shortlist
        </Button>
      </div>

      {applicants.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No applicants yet</p>
          <p className="text-sm">Applicants will appear here once they apply to this gig.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              onClick={() => onSelectApplicant(applicant)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                selectedApplicantId === applicant.id
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-semibold text-lg">
                      {applicant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
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
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {applicant.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {applicant.experience} years exp
                      </div>
                      {applicant.matchScore && (
                        <div className="flex items-center gap-1 text-green-400 font-medium">
                          <Star className="w-3 h-3" />
                          {applicant.matchScore}% match
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {applicant.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs"
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
                        "{applicant.proposal.substring(0, 120)}{applicant.proposal.length > 120 ? '...' : ''}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right space-y-2">
                    <div>
                      <div className="text-sm text-gray-400">Applied</div>
                      <div className="text-xs text-gray-300">
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Link href={`/recruiter/communication/${applicant.id}`}>
                      <Button
                        size="sm"
                        className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-md hover:opacity-90 transition w-full"
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
