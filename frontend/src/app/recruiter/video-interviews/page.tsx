'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Video,
  Calendar,
  Clock,
  User,
  Play,
  Square,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share,
  Download,
  Zap,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Settings,
  Star,
  BarChart3
} from 'lucide-react'

export default function VideoInterviewsPage() {
  const [selectedInterview, setSelectedInterview] = useState<string | null>('1')

  // Mock interview data
  const interviews = [
    {
      id: '1',
      candidateName: 'Alex Chen',
      position: 'Senior React Developer',
      status: 'scheduled',
      date: '2025-01-25',
      time: '2:00 PM EST',
      duration: '60 minutes',
      avatars: 'AC',
      type: 'Technical Interview',
      aiInsights: [
        'High engagement predicted - candidate profile matches strong',
        'Technical skills assessment recommended',
        'Culture fit scoring enabled'
      ],
      questions: [
        'How do you approach optimizing React application performance?',
        'Can you walk us through a complex state management scenario?',
        'How do you handle code reviews and feedback?'
      ],
      recordings: 2,
      analysis: {
        sentiment: 85,
        technicalProficiency: 92,
        communicationSkills: 88,
        culturalFit: 91
      }
    },
    {
      id: '2',
      candidateName: 'Sarah Kumar',
      position: 'UX Designer',
      status: 'completed',
      date: '2025-01-24',
      time: '10:00 AM EST',
      duration: '45 minutes',
      avatars: 'SK',
      type: 'Portfolio Review',
      aiInsights: [
        'Excellent portfolio presentation skills',
        'Strong user-centered design thinking',
        'Creative communication style'
      ],
      questions: [
        'Can you walk us through your design process?',
        'How do you handle design feedback?',
        'What\'s your approach to user research?'
      ],
      recordings: 1,
      analysis: {
        sentiment: 94,
        technicalProficiency: 96,
        communicationSkills: 92,
        culturalFit: 88
      }
    },
    {
      id: '3',
      candidateName: 'David Kim',
      position: 'Data Scientist',
      status: 'in-progress',
      date: '2025-01-25',
      time: '3:00 PM EST',
      duration: '45 minutes',
      avatars: 'DK',
      type: 'Technical Assessment',
      aiInsights: [
        'Live coding challenge in progress',
        'Problem-solving approach being analyzed',
        'ML expertise assessment active'
      ],
      questions: [],
      recordings: 0,
      analysis: {
        sentiment: 72,
        technicalProficiency: 89,
        communicationSkills: 85,
        culturalFit: 86
      }
    }
  ]

  const selectedInterviewData = interviews.find(i => i.id === selectedInterview)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Video className="w-8 h-8 text-[#3EFFA8]" />
            Video Interviews
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            AI-powered video interviews with real-time analysis and automated insights
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Interview
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <Settings className="w-4 h-4 mr-2" />
            Interview Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Interview List */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Upcoming Interviews</h3>
            <div className="space-y-3">
              {interviews.map((interview) => (
                <div
                  key={interview.id}
                  onClick={() => setSelectedInterview(interview.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedInterview === interview.id
                      ? 'bg-[#3EFFA8] text-black border border-[#3EFFA8]'
                      : 'bg-[#111315] border border-[#23262B] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className={`w-10 h-10 ${selectedInterview === interview.id ? 'bg-black text-[#3EFFA8]' : 'bg-[#3EFFA8]'}`}>
                      <AvatarFallback className={selectedInterview === interview.id ? 'text-[#3EFFA8]' : 'text-black'}>
                        {interview.avatars}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        selectedInterview === interview.id ? 'text-black' : 'text-[#FFFFFF]'
                      }`}>
                        {interview.candidateName}
                      </p>
                      <Badge variant="outline" className={`text-xs ${
                        selectedInterview === interview.id
                          ? 'border-black text-black'
                          : 'border-[#3EFFA8] text-[#3EFFA8]'
                      }`}>
                        {interview.status}
                      </Badge>
                    </div>
                  </div>
                  <div className={`text-xs ${
                    selectedInterview === interview.id
                      ? 'text-black opacity-70'
                      : 'text-[#C9CFD6]'
                  }`}>
                    {interview.date} • {interview.time}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3EFFA8]">{interviews.length}</div>
                <div className="text-xs text-[#C9CFD6]">Total Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#60A5FA]">
                  {interviews.filter(i => i.status === 'completed').length}
                </div>
                <div className="text-xs text-[#C9CFD6]">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">
                  {interviews.filter(i => i.analysis.sentiment >= 85).length}
                </div>
                <div className="text-xs text-[#C9CFD6]">High Scoring</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Interview Panel */}
        <div className="xl:col-span-3 space-y-6">
          {selectedInterviewData && (
            <>
              {/* Interview Header */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {selectedInterviewData.avatars}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-[#FFFFFF]">
                        {selectedInterviewData.candidateName}
                      </h2>
                      <p className="text-[#C9CFD6]">{selectedInterviewData.position}</p>
                    </div>
                  </div>
                  <Badge className={`text-sm px-3 py-1 rounded-full font-medium ${
                    selectedInterviewData.status === 'scheduled' ? 'bg-blue-900 text-blue-300' :
                    selectedInterviewData.status === 'completed' ? 'bg-green-900 text-green-300' :
                    'bg-purple-900 text-purple-300'
                  }`}>
                    {selectedInterviewData.status.charAt(0).toUpperCase() + selectedInterviewData.status.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedInterviewData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedInterviewData.time} • {selectedInterviewData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedInterviewData.type}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  {selectedInterviewData.status === 'scheduled' && (
                    <>
                      <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                        <Video className="w-4 h-4 mr-2" />
                        Join Interview
                      </Button>
                      <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-black">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                    </>
                  )}
                  {selectedInterviewData.status === 'in-progress' && (
                    <Button className="bg-[#EF4444] hover:bg-red-600">
                      <Square className="w-4 h-4 mr-2" />
                      End Interview
                    </Button>
                  )}
                  {selectedInterviewData.recordings > 0 && (
                    <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Download className="w-4 h-4 mr-2" />
                      Download Recording ({selectedInterviewData.recordings})
                    </Button>
                  )}
                </div>
              </Card>

              {/* Video Playback Area */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <div className="text-center">
                  {selectedInterviewData.status === 'scheduled' ? (
                    <div className="py-16">
                      <Video className="w-24 h-24 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-medium text-[#FFFFFF] mb-2">Interview Scheduled</h3>
                      <p className="text-[#C9CFD6] mb-6">
                        Join the video call at the scheduled time. Make sure your camera and microphone are properly configured.
                      </p>
                      <div className="flex justify-center gap-4">
                        <div className="text-center">
                          <Camera className="w-8 h-8 text-green-400 mx-auto" />
                          <p className="text-xs text-[#C9CFD6] mt-1">Camera</p>
                        </div>
                        <div className="text-center">
                          <Mic className="w-8 h-8 text-green-400 mx-auto" />
                          <p className="text-xs text-[#C9CFD6] mt-1">Microphone</p>
                        </div>
                        <div className="text-center">
                          <BarChart3 className="w-8 h-8 text-green-400 mx-auto" />
                          <p className="text-xs text-[#C9CFD6] mt-1">AI Analysis</p>
                        </div>
                      </div>
                    </div>
                  ) : selectedInterviewData.recordings > 0 ? (
                    <div className="aspect-video bg-[#111315] rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-[#3EFFA8] mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform" />
                          <p className="text-[#C9CFD6]">Click to play interview recording</p>
                          <p className="text-[#8A8F98] text-sm">Duration: {selectedInterviewData.duration}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16">
                      <Video className="w-24 h-24 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-medium text-[#FFFFFF] mb-2">Interview In Progress</h3>
                      <p className="text-[#C9CFD6] mb-6">
                        Live AI analysis is currently active. The interview will be automatically recorded and analyzed.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Square className="w-4 h-4 mr-1" />
                          Pause Recording
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* AI Insights & Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Analysis */}
                <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-[#FFD700]" />
                    AI Performance Analysis
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[#111315] rounded-lg">
                        <div className="text-2xl font-bold text-[#3EFFA8]">{selectedInterviewData.analysis.sentiment}%</div>
                        <div className="text-xs text-[#C9CFD6]">Sentiment</div>
                      </div>
                      <div className="text-center p-3 bg-[#111315] rounded-lg">
                        <div className="text-2xl font-bold text-[#60A5FA]">{selectedInterviewData.analysis.technicalProficiency}%</div>
                        <div className="text-xs text-[#C9CFD6]">Technical Skills</div>
                      </div>
                      <div className="text-center p-3 bg-[#111315] rounded-lg">
                        <div className="text-2xl font-bold text-[#F59E0B]">{selectedInterviewData.analysis.communicationSkills}%</div>
                        <div className="text-xs text-[#C9CFD6]">Communication</div>
                      </div>
                      <div className="text-center p-3 bg-[#111315] rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">{selectedInterviewData.analysis.culturalFit}%</div>
                        <div className="text-xs text-[#C9CFD6]">Culture Fit</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[#FFFFFF] font-medium">Key Insights:</h4>
                      <div className="space-y-2">
                        {selectedInterviewData.aiInsights.map((insight, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 bg-[#111315] rounded">
                            <CheckCircle className="w-4 h-4 text-[#3EFFA8] mt-0.5 flex-shrink-0" />
                            <p className="text-[#C9CFD6] text-sm">{insight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Interview Questions */}
                <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#60A5FA]" />
                    Interview Questions
                  </h3>

                  {selectedInterviewData.questions.length > 0 ? (
                    <div className="space-y-3">
                      {selectedInterviewData.questions.map((question, i) => (
                        <div key={i} className="p-3 bg-[#111315] rounded-lg border-l-4 border-[#3EFFA8]">
                          <p className="text-[#E2E8F0] text-sm font-medium mb-1">Question {i + 1}</p>
                          <p className="text-[#C9CFD6] text-sm">{question}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                      <p className="text-[#C9CFD6]">Questions will be generated during live interview</p>
                      <p className="text-[#8A8F98] text-sm mt-2">AI will adapt questions based on candidate responses</p>
                    </div>
                  )}

                  {selectedInterviewData.status === 'scheduled' && (
                    <Button className="w-full mt-4 bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <Zap className="w-4 h-4 mr-2" />
                      Generate AI Questions
                    </Button>
                  )}
                </Card>
              </div>

              {/* Action Panel */}
              <Card className="bg-gradient-to-r from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">Interview Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-black">
                    <Share className="w-4 h-4 mr-2" />
                    Share Recording
                  </Button>
                  <Button variant="outline" className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                  <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
