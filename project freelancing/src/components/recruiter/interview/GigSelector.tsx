'use client'

import { useEffect } from 'react'
import { mockGigs } from '@/lib/gigs/mockData'
import { Calendar } from 'lucide-react'

interface GigSelectorProps {
  selectedGigId: string
  onGigSelect: (gigId: string) => void
  preselectedId?: string
}

export default function GigSelector({
  selectedGigId,
  onGigSelect,
  preselectedId
}: GigSelectorProps) {
  const gigs = mockGigs.map(gig => ({
    id: gig.id.toString(),
    title: gig.title,
    deadline: gig.deadline,
    status: gig.status || 'active'
  }))

  // Removed useEffect - parent handles URL param initialization

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Select Gig</h3>

      {/* Gigs list */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {gigs.map((gig) => (
          <div
            key={gig.id}
            onClick={() => onGigSelect(gig.id)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedGigId === gig.id
                ? 'bg-purple-500/20 border border-purple-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-white font-medium truncate">{gig.title}</h4>
                {gig.deadline && (
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>Deadline: {new Date(gig.deadline).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${
                gig.status === 'active'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
              }`}>
                {gig.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {gigs.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No active gigs available</p>
        </div>
      )}
    </div>
  )
}
