'use client'

import { Users, MapPin, Clock, Briefcase } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { type Gig } from '@/lib/ai/recruiter/mockData'

interface GigListProps {
  gigs: Gig[]
  selectedGigId?: string
  onSelectGig: (gig: Gig) => void
}

export function GigList({ gigs, selectedGigId, onSelectGig }: GigListProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
      {gigs.map((gig) => (
        <div
          key={gig.id}
          onClick={() => onSelectGig(gig)}
          className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
            selectedGigId === gig.id
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-white leading-tight">
                  {gig.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                    gig.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : gig.status === 'paused'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {gig.status}
                </span>
              </div>
              <div className="text-gray-300 text-sm mb-2">{gig.company}</div>
              <div className="text-gray-400 text-xs mb-3 leading-relaxed">
                {gig.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm">{gig.budget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300 text-sm capitalize">{gig.type}</span>
                  </div>
                </div>
                <div className="text-gray-400 text-xs">
                  {gig.applicants?.length || 0} applicants
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
