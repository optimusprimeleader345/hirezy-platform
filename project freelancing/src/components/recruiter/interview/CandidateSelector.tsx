'use client'

import { useEffect, useState } from 'react'
import { realApplicants } from '@/lib/ai/recruiter/mockData'
import { Search } from 'lucide-react'

interface CandidateSelectorProps {
  selectedCandidateId: string
  onCandidateSelect: (candidateId: string) => void
  preselectedId?: string
}

export default function CandidateSelector({
  selectedCandidateId,
  onCandidateSelect,
  preselectedId
}: CandidateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCandidates, setFilteredCandidates] = useState<any[]>([])

  // Convert applicants to candidates format
  const candidates = realApplicants.map(app => ({
    id: app.id,
    name: app.name,
    location: app.location,
    experience: app.experience,
    status: app.status,
    matchScore: app.matchScore
  }))

  // Removed useEffect - parent handles URL param initialization

  useEffect(() => {
    // Filter candidates based on search
    const filtered = candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCandidates(filtered)
  }, [searchQuery, candidates])

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Select Candidate</h3>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search candidates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
        />
      </div>

      {/* Candidates list */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            onClick={() => onCandidateSelect(candidate.id)}
            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedCandidateId === candidate.id
                ? 'bg-purple-500/20 border border-purple-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{candidate.name}</h4>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span>{candidate.location}</span>
                  <span>{candidate.experience} yrs</span>
                  {candidate.matchScore && (
                    <span className="text-green-400 font-medium">{candidate.matchScore}% match</span>
                  )}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${
                candidate.status === 'shortlisted'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : candidate.status === 'applied'
                  ? 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
              }`}>
                {candidate.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
