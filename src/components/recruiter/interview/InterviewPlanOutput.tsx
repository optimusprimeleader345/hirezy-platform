'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Mail,
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle,
  Zap,
  MessageSquare,
  FileText,
  AlertCircle
} from 'lucide-react'

interface InterviewPlanOutputProps {
  plan: any
  onConfirm?: () => void
  onSendToCandidate?: () => void
}

export default function InterviewPlanOutput({
  plan,
  onConfirm,
  onSendToCandidate
}: InterviewPlanOutputProps) {
  // Mock plan data since actual plan generation would come from API
  const mockPlan = {
    candidateName: 'Alex Chen',
    position: 'Senior React Developer',
    interviewType: 'Technical Interview',
    date: 'January 25, 2025',
    time: '2:00 PM EST',
    duration: '60 minutes',
    location: 'Meet (Virtual)',
    interviewers: [
      { name: 'Sarah Johnson', role: 'Engineering Manager', avatar: 'SJ' },
      { name: 'Mike Wilson', role: 'Senior Developer', avatar: 'MW' },
      { name: 'AI Assistant', role: 'Interview Facilitator', avatar: 'AI' }
    ],
    agenda: [
      {
        time: '0:00 - 0:10',
        topic: 'Introductions & Background Check',
        description: 'Team introductions, candidate background overview, resume walkthrough'
      },
      {
        time: '0:10 - 0:30',
        topic: 'Technical Assessment',
        description: 'React expertise evaluation, system design discussion, coding challenge'
      },
      {
        time: '0:30 - 0:45',
        topic: 'Team Fit & Culture Discussion',
        description: 'Questions about team collaboration, company culture alignment, career goals'
      },
      {
        time: '0:45 - 1:00',
        topic: 'Q&A & Next Steps',
        description: 'Candidate questions, timeline discussion, offer process explanation'
      }
    ],
    generatedQuestions: [
      'How do you approach optimizing React application performance?',
      'Can you walk us through a complex state management scenario?',
      'How do you handle code reviews and feedback?',
      'What are your thoughts on testing strategies?',
      'How do you stay updated with React ecosystem advancements?'
    ],
    preparationMaterials: [
      'Technical challenge repository will be shared in the meeting invite',
      'Review the company engineering principles document',
      'Prepare examples of recent projects using React and TypeScript',
      'Have LinkedIn/GitHub profiles ready for discussion'
    ],
    aiInsights: {
      successProbability: 87,
      keyStrengths: [
        'Strong React/TypeScript background evident in portfolio',
        'Previous experience with similar tech stack',
        'Good culture fit based on communication style'
      ],
      potentialConcerns: [
        'May need experience with specific internal tools',
        'Ask about performance optimization in scaled applications'
      ],
      recommendedFocus: [
        'Deep technical capabilities',
        'Team collaboration style',
        'Career growth objectives at company'
      ]
    }
  }

  return (
    <div className="space-y-6">
      {!plan ? (
        // Empty state
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-[#FFD700] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h3 className="text-xl font-semibold text-[#FFFFFF] mb-2">AI Interview Planner</h3>
          <p className="text-[#C9CFD6]">
            Fill in the details above and let AI generate a comprehensive interview plan with optimized structure and questions.
          </p>
        </Card>
      ) : (
        // Generated plan
        <>
          {/* Plan Overview */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#3EFFA8]" />
                <div>
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Interview Plan Generated</h3>
                  <p className="text-[#C9CFD6]">AI-optimized for maximum candidate assessment</p>
                </div>
              </div>
              <Badge className="bg-[#FFD700] text-black">{mockPlan.aiInsights.successProbability}% Fit Score</Badge>
            </div>

            {/* Interview Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#C9CFD6]" />
                  <div>
                    <div className="text-[#FFFFFF] font-medium">{mockPlan.date}</div>
                    <div className="text-[#C9CFD6] text-sm">{mockPlan.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C9CFD6]" />
                  <div>
                    <div className="text-[#FFFFFF] font-medium">{mockPlan.duration}</div>
                    <div className="text-[#C9CFD6] text-sm">Interview Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-[#C9CFD6]" />
                  <div>
                    <div className="text-[#FFFFFF] font-medium">{mockPlan.location}</div>
                    <div className="text-[#C9CFD6] text-sm">Meeting Platform</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[#FFFFFF] font-medium mb-3">Interview Team</h4>
                <div className="space-y-3">
                  {mockPlan.interviewers.map((interviewer: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className={`w-8 h-8 ${
                        interviewer.role === 'Interview Facilitator' ? 'bg-[#FFD700]' : 'bg-[#3EFFA8]'
                      }`}>
                        <AvatarFallback className="text-black font-bold text-xs">
                          {interviewer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-[#FFFFFF] font-medium text-sm">{interviewer.name}</div>
                        <div className="text-[#C9CFD6] text-xs">{interviewer.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Agenda */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">Interview Agenda</h3>
            <div className="space-y-4">
              {mockPlan.agenda.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                  <div className="w-16 text-[#3EFFA8] font-medium text-sm flex-shrink-0">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#FFFFFF] font-medium mb-1">{item.topic}</h4>
                    <p className="text-[#C9CFD6] text-sm">{item.description}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-[#3EFFA8] flex-shrink-0" />
                </div>
              ))}
            </div>
          </Card>

          {/* AI-Generated Questions */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-[#FFD700]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">AI-Generated Questions</h3>
            </div>
            <div className="space-y-3">
              {mockPlan.generatedQuestions.map((question: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#111315] border border-[#23262B]">
                  <span className="text-[#FFD700] font-bold min-w-[24px]">Q{i+1}</span>
                  <p className="text-[#E2E8F0]">{question}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">AI Interview Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-[#111315] rounded-lg border border-[#3EFFA8] border-opacity-30">
                <div className="text-2xl font-bold text-[#3EFFA8]">{mockPlan.aiInsights.successProbability}%</div>
                <div className="text-[#C9CFD6] text-sm">Success Probability</div>
              </div>
              {[{ label: 'Technical Match', value: 94 }, { label: 'Culture Fit', value: 88 }].map((item, i) => (
                <div key={i} className="text-center p-4 bg-[#111315] rounded-lg">
                  <div className="text-2xl font-bold text-[#FFD700]">{item.value}%</div>
                  <div className="text-[#C9CFD6] text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-1">
                  {mockPlan.aiInsights.keyStrengths.map((strength: string, i: number) => (
                    <li key={i} className="text-[#C9CFD6] text-sm flex items-start gap-2">
                      <span className="text-green-400">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Areas to Explore
                </h4>
                <ul className="space-y-1">
                  {mockPlan.aiInsights.potentialConcerns.map((concern: string, i: number) => (
                    <li key={i} className="text-[#C9CFD6] text-sm flex items-start gap-2">
                      <span className="text-orange-400">•</span>
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Preparation Materials */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Preparation Materials
            </h3>
            <div className="space-y-2">
              {mockPlan.preparationMaterials.map((material: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#111315] border border-[#23262B]">
                  <CheckCircle className="w-4 h-4 text-[#3EFFA8] mt-0.5 flex-shrink-0" />
                  <p className="text-[#C9CFD6] text-sm">{material}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-gradient-to-r from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">Ready for Interview?</h3>
            <div className="flex gap-4">
              <Button
                onClick={onConfirm}
                className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black font-bold flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Interview Plan
              </Button>
              <Button
                onClick={onSendToCandidate}
                variant="outline"
                className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send to Candidate
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
