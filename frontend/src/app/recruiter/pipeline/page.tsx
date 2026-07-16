'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Eye,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Plus,
  Filter,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Calendar,
  Star,
  Zap,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

interface Candidate {
  id: string
  name: string
  avatar: string
  role: string
  skillMatch: number
  timeInStage: string
  priority: 'High' | 'Medium' | 'Low'
  lastActivity: string
  aiRecommendation?: string
  stage: string
}

export default function CandidatePipeline() {
  const [pipelineData, setPipelineData] = useState({
    applied: [
      { id: '1', name: 'Alex Chen', avatar: 'AC', role: 'React Developer', skillMatch: 94, timeInStage: '2 days', priority: 'High' as const, lastActivity: 'Applied recently', stage: 'applied' },
      { id: '2', name: 'Sarah Kumar', avatar: 'SK', role: 'UX Designer', skillMatch: 91, timeInStage: '1 day', priority: 'Medium' as const, lastActivity: 'Resume reviewed', stage: 'applied' }
    ],
    reviewed: [
      { id: '3', name: 'Mike Rodriguez', avatar: 'MR', role: 'Full Stack Engineer', skillMatch: 87, timeInStage: '3 days', priority: 'High' as const, lastActivity: 'Technical review completed', stage: 'reviewed' }
    ],
    shortlisted: [] as Candidate[],
    interview: [
      { id: '4', name: 'David Kim', avatar: 'DK', role: 'Data Scientist', skillMatch: 95, timeInStage: '1 day', priority: 'High' as const, lastActivity: 'Interview scheduled', stage: 'interview' }
    ],
    offer: [
      { id: '5', name: 'Lisa Wang', avatar: 'LW', role: 'Product Manager', skillMatch: 92, timeInStage: '2 days', priority: 'High' as const, lastActivity: 'Offer extended', stage: 'offer' }
    ],
    hired: [
      { id: '6', name: 'John Smith', avatar: 'JS', role: 'DevOps Engineer', skillMatch: 90, timeInStage: 'Completed', priority: 'High' as const, lastActivity: 'Hired successfully', stage: 'hired' }
    ]
  })

  const moveCandidate = (candidateId: string, fromStage: string, toStage: string) => {
    const candidate = pipelineData[fromStage as keyof typeof pipelineData].find((c: Candidate) => c.id === candidateId)
    if (!candidate) return

    const updatedCandidate = { ...candidate, lastActivity: `Moved to ${toStage}`, timeInStage: 'Just moved' }

    setPipelineData(prev => ({
      ...prev,
      [fromStage]: prev[fromStage as keyof typeof prev].filter((c: Candidate) => c.id !== candidateId),
      [toStage]: [...prev[toStage as keyof typeof prev], updatedCandidate]
    }))

    // Show brief notification
    alert(`✅ ${candidate.name} moved from ${fromStage} to ${toStage}`)
  }

  const getStageColor = (stage: string) => {
    const colors = {
      applied: 'border-blue-500 bg-blue-900/20',
      reviewed: 'border-yellow-500 bg-yellow-900/20',
      shortlisted: 'border-green-500 bg-green-900/20',
      interview: 'border-purple-500 bg-purple-900/20',
      offer: 'border-orange-500 bg-orange-900/20',
      hired: 'border-emerald-500 bg-emerald-900/20'
    }
    return colors[stage as keyof typeof colors] || 'border-gray-500 bg-gray-900/20'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-900 text-red-300'
      case 'Medium': return 'bg-yellow-900 text-yellow-300'
      case 'Low': return 'bg-gray-900 text-gray-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const stages = [
    { id: 'applied', title: 'Applied', color: 'blue' },
    { id: 'reviewed', title: 'Reviewed', color: 'yellow' },
    { id: 'shortlisted', title: 'Shortlisted', color: 'green' },
    { id: 'interview', title: 'Interview', color: 'purple' },
    { id: 'offer', title: 'Offer Extended', color: 'orange' },
    { id: 'hired', title: 'Hired', color: 'emerald' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#3EFFA8]" />
            Candidate Pipeline
          </h1>
          <p className="text-[#C9CFD6] text-lg mt-1">
            Manage candidates through the complete hiring journey
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-[#FFD700]" />
          <div className="flex-1">
            <h3 className="text-[#FFFFFF] font-medium">AI Pipeline Intelligence</h3>
            <p className="text-[#C9CFD6] text-sm">
              23 candidates in pipeline • 8 high-priority • 12 interviews this week • <span className="text-[#3EFFA8] font-medium">94% conversion rate</span>
            </p>
          </div>
          <Badge className="bg-[#3EFFA8] text-black">AI Optimized</Badge>
        </div>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4 overflow-x-auto">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4 min-h-[600px] flex flex-col">
            {/* Stage Header */}
            <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-gray-900/50">
              <div>
                <h3 className="text-[#FFFFFF] font-medium text-sm">{stage.title}</h3>
                <p className="text-[#C9CFD6] text-xs">{pipelineData[stage.id as keyof typeof pipelineData].length} candidates</p>
              </div>
              <div className={`w-3 h-3 rounded-full bg-${stage.color}-400`}></div>
            </div>

            {/* Candidates */}
            <div className="flex-1 space-y-3">
              {pipelineData[stage.id as keyof typeof pipelineData].map((candidate: Candidate) => (
                <div key={candidate.id} className="bg-[#111315] border border-[#23262B] rounded-lg p-4 hover:border-[#3EFFA8] transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <Avatar className="w-8 h-8 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-xs">
                        {candidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className={getPriorityColor(candidate.priority)}>
                      {candidate.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[#FFFFFF] font-medium text-sm truncate">
                      {candidate.name}
                    </h4>
                    <p className="text-[#C9CFD6] text-xs truncate">
                      {candidate.role}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#C9CFD6]">Match: {candidate.skillMatch}%</span>
                      <span className="text-[#C9CFD6]">{candidate.timeInStage}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 mt-3">
                    {stage.id !== 'applied' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => moveCandidate(candidate.id, stage.id, stages[stages.findIndex(s => s.id === stage.id) - 1]?.id)}
                      >
                        <ArrowLeft className="w-3 h-3" />
                      </Button>
                    )}
                    {stage.id !== 'hired' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        onClick={() => moveCandidate(candidate.id, stage.id, stages[stages.findIndex(s => s.id === stage.id) + 1]?.id)}
                      >
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {pipelineData.applied.length + pipelineData.reviewed.length + pipelineData.shortlisted.length + pipelineData.interview.length + pipelineData.offer.length + pipelineData.hired.length}
            </div>
            <p className="text-[#C9CFD6] text-sm">Total Candidates</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400 mb-2">{pipelineData.shortlisted.length + pipelineData.interview.length + pipelineData.offer.length + pipelineData.hired.length}</div>
            <p className="text-[#C9CFD6] text-sm">Advanced Stages</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">{pipelineData.interview.length + pipelineData.offer.length + pipelineData.hired.length}</div>
            <p className="text-[#C9CFD6] text-sm">Interview/Offer</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-400 mb-2">{pipelineData.offer.length + pipelineData.hired.length}</div>
            <p className="text-[#C9CFD6] text-sm">Offers Extended</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">{pipelineData.hired.length}</div>
            <p className="text-[#C9CFD6] text-sm">Successfully Hired</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {Math.round((pipelineData.hired.length / (pipelineData.applied.length + pipelineData.reviewed.length + pipelineData.shortlisted.length + pipelineData.interview.length + pipelineData.offer.length + pipelineData.hired.length)) * 100)}%
            </div>
            <p className="text-[#C9CFD6] text-sm">Conversion Rate</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
