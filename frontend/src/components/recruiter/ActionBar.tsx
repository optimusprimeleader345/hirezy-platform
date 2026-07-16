'use client'

import { MessageSquare, UserCheck, X, Star, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Applicant } from '@/lib/ai/recruiter/mockData'

interface ActionBarProps {
  applicant: Applicant
  onShortlist: (applicantId: string) => void
  onReject: (applicantId: string) => void
  onMessage: (applicantId: string) => void
  onDownload?: (applicantId: string) => void
}

export function ActionBar({ applicant, onShortlist, onReject, onMessage, onDownload }: ActionBarProps) {
  const isShortlisted = applicant.status === 'shortlisted'
  const isRejected = applicant.status === 'rejected'
  const isHired = applicant.status === 'hired'

  return (
    <div className="flex flex-wrap gap-3">
      {!isHired && (
        <>
          <Button
            variant={isShortlisted ? "secondary" : "default"}
            size="sm"
            onClick={() => onShortlist(applicant.id)}
            className={`${isShortlisted
              ? 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
              : 'bg-purple-600 hover:bg-purple-700'
            }`}
            disabled={isRejected}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            {isShortlisted ? 'Shortlisted' : 'Shortlist'}
          </Button>

          <Button
            variant={isRejected ? "secondary" : "outline"}
            size="sm"
            onClick={() => onReject(applicant.id)}
            className={`${isRejected
              ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
              : 'border-white/20 text-white hover:bg-white/10'
            }`}
            disabled={isShortlisted}
          >
            <X className="w-4 h-4 mr-2" />
            {isRejected ? 'Rejected' : 'Reject'}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onMessage(applicant.id)}
        className="border-white/20 text-white hover:bg-white/10"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Message
      </Button>

      {isShortlisted && onDownload && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDownload(applicant.id)}
          className="border-white/20 text-white hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      )}

      {applicant.matchScore && applicant.matchScore >= 85 && !isHired && (
        <Button
          variant="outline"
          size="sm"
          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/20"
        >
          <Star className="w-4 h-4 mr-2" />
          Best Match
        </Button>
      )}
    </div>
  )
}
