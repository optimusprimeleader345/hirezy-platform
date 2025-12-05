'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  CheckCircle,
  Clock,
  MessageCircle,
  FileText,
  Download,
  Star,
  Zap,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  ArrowLeft,
  Plus,
  Send
} from 'lucide-react'

export default function CandidateTimelineView() {
  const [candidate, setCandidate] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const params = useParams()
  const router = useRouter()

  // Mock candidate data matching our dark theme and features
  const mockCandidates = {
    '1': {
      id: 1,
      name: 'Alex Chen',
      avatar: 'AC',
      role: 'React Developer',
      location: 'San Francisco, CA',
      experience: 5,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      fitScore: 97,
      appliedDate: '2024-01-15',
      linkedin: 'https://linkedin.com/in/alexchen',

      // Timeline data
      timeline: [
        {
          id: 1,
          stage: 'Applied',
          date: 'Jan 15, 2024',
          completed: true,
          description: 'Application submitted automatically via job board',
          aiInsights: 'Strong initial resume screening - 94% match rate'
        },
        {
          id: 2,
          stage: 'AI Resume Analysis',
          date: 'Jan 15, 2024',
          completed: true,
          description: 'Resume parsed successfully - skills extracted',
          aiInsights: 'Outstanding React ecosystem experience detected'
        },
        {
          id: 3,
          stage: 'Technical Review',
          date: 'Jan 16, 2024',
          completed: true,
          description: 'Resume reviewed by senior developer',
          aiInsights: 'Portfolio reviewed - GitHub activity shows strong contribution history'
        },
        {
          id: 4,
          stage: 'Shortlisting Completed',
          date: 'Jan 17, 2024',
          completed: true,
          description: 'Candidate added to shortlist',
          aiInsights: 'Cultural fit prediction: 92% team compatibility'
        },
        {
          id: 5,
          stage: 'Initial Interview',
          date: 'Jan 20, 2024',
          completed: false,
          description: 'Scheduled for next week',
          aiInsights: 'Recommended time slots identified based on candidate calendar'
        }
      ],

      // AI Assessment
      assessments: {
        technical: 94,
        communication: 92,
        culture: 91,
        leadership: 88
      },

      // Comments
      comments: [
        {
          id: 1,
          author: 'Sarah Johnson',
          role: 'Senior Recruiter',
          text: 'Excellent portfolio and GitHub activity. Strong technical background.',
          date: 'Jan 16, 2024',
          avatar: 'SJ'
        },
        {
          id: 2,
          author: 'Mike Wilson',
          role: 'Tech Lead',
          text: 'Reviewed resume - impressed with AWS Lambda and React expertise.',
          date: 'Jan 16, 2024',
          avatar: 'MW'
        },
        {
          id: 3,
          author: 'AI Assistant',
          role: 'Intelligent Analysis',
          text: 'AI predicts 92% success probability based on skills match and team compatibility.',
          date: 'Jan 15, 2024',
          avatar: 'AI'
        }
      ]
    }
  }

  useEffect(() => {
    const candidateId = params.id as string
    setCandidate(mockCandidates[candidateId as keyof typeof mockCandidates] || mockCandidates['1'])
  }, [params.id])

  const addComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: comments.length + 1,
      author: 'You',
      role: 'Recruiter',
      text: newComment,
      date: new Date().toLocaleDateString(),
      avatar: 'YO'
    }

    setComments([...comments, comment])
    setCandidate((prev: any) => ({
      ...prev,
      comments: [...prev.comments, comment]
    }))
    setNewComment('')
  }

  if (!candidate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3EFFA8]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#FFFFFF]">{candidate.name} - Hiring Timeline</h1>
            <p className="text-[#C9CFD6]">Complete application journey with AI insights</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
            <Download className="w-4 h-4 mr-2" />
            Export Timeline
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Timeline Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* AI-Powered Timeline */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-[#3EFFA8]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">AI-Enhanced Timeline</h3>
              <Badge className="bg-[#FFD700] text-black">97% Match Score</Badge>
            </div>

            <div className="space-y-6">
              {candidate.timeline.map((step: any, index: number) => (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* Timeline Line */}
                  {index !== candidate.timeline.length - 1 && (
                    <div className="absolute left-6 top-12 w-px h-16 bg-gradient-to-b from-[#3EFFA8] to-transparent"></div>
                  )}

                  {/* Timeline Dot & Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full border-4 ${
                    step.completed
                      ? 'bg-[#3EFFA8] border-[#3EFFA8]'
                      : 'bg-[#23262B] border-[#23262B]'
                  } flex items-center justify-center`}>
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6 text-black" />
                    ) : (
                      <Clock className="w-6 h-6 text-[#C9CFD6]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium text-lg ${
                        step.completed ? 'text-[#FFFFFF]' : 'text-[#C9CFD6]'
                      }`}>
                        {step.stage}
                      </h4>
                      <span className="text-sm text-[#8A8F98]">{step.date}</span>
                    </div>

                    <p className="text-[#C9CFD6] text-sm mb-3">{step.description}</p>

                    {/* AI Insights */}
                    {step.aiInsights && (
                      <div className="bg-[#FFD700] bg-opacity-10 border border-[#FFD700] border-opacity-20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-[#FFD700]" />
                          <span className="text-[#FFD700] font-medium text-sm">AI Insight</span>
                        </div>
                        <p className="text-[#FFD700] text-xs">{step.aiInsights}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comments & Activity */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Team Comments & Activity
            </h3>

            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {candidate.comments.map((comment: any) => (
                <div key={comment.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#111315] border border-[#23262B]">
                  <Avatar className={`w-8 h-8 ${
                    comment.role === 'Intelligent Analysis' ? 'bg-[#FFD700]' : 'bg-[#3EFFA8]'
                  }`}>
                    <AvatarFallback className="text-xs font-bold text-black">
                      {comment.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#FFFFFF] font-medium text-sm">{comment.author}</span>
                      <Badge variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] text-xs py-0 px-2">
                        {comment.role}
                      </Badge>
                    </div>
                    <p className="text-[#C9CFD6] text-sm mb-1">{comment.text}</p>
                    <span className="text-[#8A8F98] text-xs">{comment.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="flex gap-3 pt-4 border-t border-[#23262B]">
              <Avatar className="w-8 h-8 bg-[#3EFFA8]">
                <AvatarFallback className="text-black font-bold text-xs">YO</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment or note..."
                  className="flex-1 bg-[#111315] border border-[#23262B] rounded-lg px-3 py-2 text-[#E2E8F0] placeholder-[#8A8F98] focus:border-[#3EFFA8] outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && addComment()}
                />
                <Button onClick={addComment} disabled={!newComment.trim()} className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Candidate Profile Summary */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
            <div className="text-center mb-4">
              <Avatar className="w-16 h-16 mx-auto mb-3 bg-[#3EFFA8]">
                <AvatarFallback className="text-black font-bold text-xl">
                  {candidate.avatar}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-[#FFFFFF]">{candidate.name}</h3>
              <p className="text-[#C9CFD6]">{candidate.role}</p>
            </div>

            {/* Fit Score */}
            <div className="bg-[#111315] rounded-lg p-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3EFFA8] mb-1">{candidate.fitScore}%</div>
                <p className="text-[#C9CFD6] text-sm">Overall Fit Score</p>
                <div className="w-full bg-[#23262B] rounded-full h-2 mt-2">
                  <div
                    className="bg-[#3EFFA8] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${candidate.fitScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#C9CFD6]">Applied Date:</span>
                <span className="text-[#FFFFFF]">{candidate.appliedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9CFD6]">Experience:</span>
                <span className="text-[#FFFFFF]">{candidate.experience} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9CFD6]">Location:</span>
                <span className="text-[#FFFFFF]">{candidate.location}</span>
              </div>
            </div>
          </Card>

          {/* Assessment Scores */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Assessment Scores</h3>
            <div className="space-y-3">
              {Object.entries(candidate.assessments).map(([key, value]: [string, any]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#C9CFD6] text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-[#3EFFA8] font-medium">{value}%</span>
                  </div>
                  <div className="w-full bg-[#23262B] rounded-full h-1">
                    <div
                      className="bg-[#3EFFA8] h-1 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Resume Viewer */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume Preview
            </h3>
            <div className="bg-[#111315] border border-[#23262B] rounded-lg h-32 flex items-center justify-center mb-4">
              <div className="text-center">
                <FileText className="w-8 h-8 text-[#C9CFD6] mx-auto mb-2" />
                <p className="text-[#C9CFD6] text-sm">Resume uploaded</p>
                <p className="text-[#8A8F98] text-xs">Click to view full document</p>
              </div>
            </div>
            <Button variant="outline" className="w-full border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black w-full">
                <Eye className="w-4 h-4 mr-2" />
                Full Profile View
              </Button>
              <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] w-full">
                <Star className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Recommendation Footer */}
      <Card className="bg-gradient-to-r from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FFD700] bg-opacity-20 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-[#FFD700]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-1">AI Recommendation</h3>
            <p className="text-[#C9CFD6]">This candidate shows exceptional technical skills and strong cultural alignment. Recommended for immediate interview scheduling.</p>
          </div>
          <div className="text-right">
            <Badge className="bg-[#3EFFA8] text-black mb-2">High Priority</Badge>
            <div className="text-[#FFD700] font-bold">92% Success Rate</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
