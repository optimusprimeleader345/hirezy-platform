'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { realApplicants } from '@/lib/ai/recruiter/mockData'
import {
  ArrowLeft,
  User,
  Brain,
  Briefcase,
  Calendar,
  MessageCircle,
  Star,
  Trophy,
  Clock,
  Zap
} from 'lucide-react'

export default function ComparisonPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>([])

  // Get candidate IDs from URL
  useEffect(() => {
    const candidatesParam = searchParams.get('candidates')
    if (candidatesParam) {
      const ids = candidatesParam.split(',')
      setSelectedCandidateIds(ids)
    }
  }, [searchParams])

  // Get candidate data
  const candidates = useMemo(() => {
    return realApplicants.filter(app => selectedCandidateIds.includes(app.id.toString()))
  }, [selectedCandidateIds])

  // Generate comparison data
  const comparisonData = useMemo(() => {
    return candidates.map(candidate => {
      // Mock data generation for demonstration
      const mockData = {
        aiMatchScore: Math.floor(Math.random() * 30) + 70, // 70-100
        skillsMatch: Math.floor(Math.random() * 25) + 75, // 75-100
        experience: candidate.experience,
        projects: Math.floor(Math.random() * 10) + 5, // 5-15 projects
        rate: `$${20 + Math.floor(Math.random() * 31)}/hr`, // $20-50/hr
        resumeStrength: Math.floor(Math.random() * 20) + 70, // 70-90
        portfolioQuality: Math.floor(Math.random() * 20) + 70, // 70-90
        lastActive: Math.floor(Math.random() * 7) + 1, // 1-7 days ago
        communicationScore: Math.floor(Math.random() * 25) + 75, // 75-100
      }
      return { candidate, ...mockData }
    })
  }, [candidates])

  if (candidates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            No Candidates Selected
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Please select candidates from the applications page to compare them.
          </p>
          <Button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>
      </div>
    )
  }

  if (candidates.length === 1) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Select More Candidates
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Please select at least 2 candidates to see the comparison.
          </p>
          <Button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={() => router.push('/recruiter/applications')} className="border-white/20 text-white hover:bg-white/10 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Candidate Comparison
          </h1>
          <p className="text-white/80 text-lg">
            Comparing {candidates.length} candidates side by side
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="space-y-6">
        {/* Candidates Header */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
          {comparisonData.map(({ candidate, ...data }) => (
            <Card key={candidate.id} className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
                  <span className="text-white font-bold text-xl">
                    {candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{candidate.name}</h3>
                <p className="text-gray-300 text-sm">{candidate.location}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 rounded-lg mb-4">
                <div className="bg-slate-800 rounded-lg p-3 text-center">
                  <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-white font-bold text-xl">{data.aiMatchScore}%</p>
                  <p className="text-gray-300 text-xs">AI Match</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Comparison Metrics */}
        <div className="space-y-4">
          {/* Skills Match */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h4 className="text-white font-semibold flex items-center mb-4">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              Skills Match
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {comparisonData.map(({ candidate, skillsMatch }) => (
                <div key={candidate.id} className="text-center">
                  <div className="bg-white/10 rounded-xl p-4 mb-2">
                    <p className="text-2xl font-bold text-green-400">{skillsMatch}%</p>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                      style={{ width: `${skillsMatch}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h4 className="text-white font-semibold flex items-center mb-4">
              <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
              Experience
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {comparisonData.map(({ candidate, experience }) => (
                <div key={candidate.id} className="text-center">
                  <div className="bg-white/10 rounded-xl p-4 mb-2">
                    <p className="text-2xl font-bold text-blue-400">{experience} yrs</p>
                    <p className="text-gray-300 text-xs">Years</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Projects & Rate */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h4 className="text-white font-semibold flex items-center mb-4">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Projects & Rate
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {comparisonData.map(({ candidate, projects, rate }) => (
                <div key={candidate.id} className="text-center">
                  <div className="bg-white/10 rounded-xl p-3 mb-2">
                    <p className="text-lg font-bold text-yellow-400">{projects}</p>
                    <p className="text-gray-300 text-xs">Projects</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-sm font-bold text-purple-400">{rate}</p>
                    <p className="text-gray-300 text-xs">Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resume Strength & Portfolio */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h4 className="text-white font-semibold flex items-center mb-4">
              <User className="w-5 h-5 mr-2 text-green-400" />
              Resume & Portfolio Quality
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {comparisonData.map(({ candidate, resumeStrength, portfolioQuality }) => (
                <div key={candidate.id} className="text-center">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="bg-white/10 rounded-xl p-3 mb-2">
                        <p className="text-lg font-bold text-green-400">{resumeStrength}%</p>
                        <p className="text-gray-300 text-xs">Resume</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/10 rounded-xl p-3 mb-2">
                        <p className="text-lg font-bold text-orange-400">{portfolioQuality}%</p>
                        <p className="text-gray-300 text-xs">Portfolio</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity & Communication */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h4 className="text-white font-semibold flex items-center mb-4">
              <MessageCircle className="w-5 h-5 mr-2 text-indigo-400" />
              Activity & Communication
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(candidates.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {comparisonData.map(({ candidate, lastActive, communicationScore }) => (
                <div key={candidate.id} className="text-center">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="bg-white/10 rounded-xl p-3 mb-2">
                        <Clock className="w-4 h-4 text-red-400 mx-auto mb-1" />
                        <p className="text-sm font-bold text-white">{lastActive}d ago</p>
                        <p className="text-gray-300 text-xs">Active</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/10 rounded-xl p-3 mb-2">
                        <p className="text-lg font-bold text-indigo-400">{communicationScore}%</p>
                        <p className="text-gray-300 text-xs">Comm.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={() => router.push('/recruiter/applications')} variant="outline" className="border-white/20 text-white hover:bg-white/10 mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </Button>
      </div>
    </div>
  )
}
