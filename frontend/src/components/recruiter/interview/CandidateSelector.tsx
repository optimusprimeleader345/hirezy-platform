'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { User, Search, CheckCircle } from 'lucide-react'

interface CandidateSelectorProps {
  selectedCandidateId: string
  onCandidateSelect: (id: string) => void
  preselectedId?: string
}

export default function CandidateSelector({
  selectedCandidateId,
  onCandidateSelect,
  preselectedId
}: CandidateSelectorProps) {
  // Mock candidates that could be interviewed
  const candidates = [
    {
      id: '1',
      name: 'Alex Chen',
      role: 'Frontend Developer',
      avatar: 'AC',
      matchScore: 94,
      status: 'shortlisted',
      lastInterview: null
    },
    {
      id: '2',
      name: 'Sarah Kumar',
      role: 'UX Designer',
      avatar: 'SK',
      matchScore: 91,
      status: 'shortlisted',
      lastInterview: null
    },
    {
      id: '3',
      name: 'David Kim',
      role: 'Data Scientist',
      avatar: 'DK',
      matchScore: 95,
      status: 'interview',
      lastInterview: 'Jan 20, 2024'
    },
    {
      id: '4',
      name: 'Lisa Wang',
      role: 'Product Manager',
      avatar: 'LW',
      matchScore: 92,
      status: 'offer',
      lastInterview: null
    }
  ]

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId)

  return (
    <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-5 h-5 text-[#3EFFA8]" />
        <h3 className="text-lg font-medium text-[#FFFFFF]">Select Candidate</h3>
      </div>

      <Select value={selectedCandidateId} onValueChange={onCandidateSelect}>
        <SelectTrigger className="bg-[#111315] border-[#23262B] text-[#E2E8F0] mb-4">
          <SelectValue placeholder="Choose a candidate for interview" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1D21] border-[#23262B] max-h-64">
          {candidates.map((candidate) => (
            <SelectItem key={candidate.id} value={candidate.id}>
              <div className="flex items-center gap-3 py-2">
                <Avatar className="w-8 h-8 bg-[#3EFFA8]">
                  <AvatarFallback className="text-black font-bold text-xs">
                    {candidate.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#FFFFFF] font-medium">{candidate.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#3EFFA8] text-sm font-medium">{candidate.matchScore}% match</span>
                      {candidate.lastInterview && (
                        <span className="text-[#8A8F98] text-xs">Interviewed</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[#C9CFD6] text-sm">{candidate.role}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedCandidate && (
        <div className="bg-[#111315] border border-[#3EFFA8] border-opacity-30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 bg-[#3EFFA8]">
                <AvatarFallback className="text-black font-bold">
                  {selectedCandidate.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-[#FFFFFF] font-medium">{selectedCandidate.name}</h4>
                <p className="text-[#C9CFD6] text-sm">{selectedCandidate.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#3EFFA8] font-bold text-lg">{selectedCandidate.matchScore}%</div>
              <p className="text-[#8A8F98] text-xs">Match Score</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-[#C9CFD6]">Status: </span>
              <span className={`px-2 py-1 rounded text-xs ${
                selectedCandidate.status === 'shortlisted' ? 'bg-yellow-900 text-yellow-300' :
                selectedCandidate.status === 'interview' ? 'bg-purple-900 text-purple-300' :
                selectedCandidate.status === 'offer' ? 'bg-orange-900 text-orange-300' :
                'bg-green-900 text-green-300'
              }`}>
                {selectedCandidate.status.charAt(0).toUpperCase() + selectedCandidate.status.slice(1)}
              </span>
            </div>
            {selectedCandidate.lastInterview && (
              <div className="text-sm text-[#8A8F98]">
                Last interviewed: {selectedCandidate.lastInterview}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
