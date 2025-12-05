'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  Square,
  Camera,
  Mic,
  Monitor,
  Shield,
  Users,
  Zap,
  BarChart3,
  TrendingUp,
  Flag,
  MessageSquare,
  Settings,
  Download,
  ExternalLink
} from 'lucide-react'

export default function ProctoringPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>('1')

  // Mock proctoring sessions
  const proctoringSessions = [
    {
      id: '1',
      candidateName: 'Alex Chen',
      testName: 'React Developer Assessment',
      status: 'in-progress',
      startTime: '2025-01-25T10:30:00Z',
      duration: '90 minutes',
      incidents: 2,
      riskLevel: 'low',
      verificationStatus: {
        identity: 'verified',
        environment: 'verified',
        browser: 'verified',
        integrity: 'active'
      },
      flags: [
        { time: '00:15:30', type: 'tab_switch', severity: 'low', description: 'Brief tab switch detected' },
        { time: '00:42:15', type: 'audio_anomaly', severity: 'medium', description: 'Background noise spike' }
      ],
      metrics: {
        focus: 92,
        integrity: 89,
        behavior: 94,
        attention: 87
      },
      videoUrl: '/api/proctoring/session/1/video'
    },
    {
      id: '2',
      candidateName: 'Sarah Kumar',
      testName: 'UX Design Challenge',
      status: 'completed',
      startTime: '2025-01-24T14:00:00Z',
      duration: '60 minutes',
      incidents: 0,
      riskLevel: 'very_low',
      verificationStatus: {
        identity: 'verified',
        environment: 'verified',
        browser: 'verified',
        integrity: 'verified'
      },
      flags: [],
      metrics: {
        focus: 97,
        integrity: 98,
        behavior: 96,
        attention: 95
      },
      videoUrl: '/api/proctoring/session/2/video'
    },
    {
      id: '3',
      candidateName: 'David Kim',
      testName: 'Data Science Assessment',
      status: 'monitoring',
      startTime: '2025-01-25T16:45:00Z',
      duration: '75 minutes',
      incidents: 5,
      riskLevel: 'high',
      verificationStatus: {
        identity: 'verified',
        environment: 'flagged',
        browser: 'verified',
        integrity: 'suspicious'
      },
      flags: [
        { time: '00:08:22', type: 'face_not_visible', severity: 'high', description: 'Candidate moved away from camera for 2 minutes' },
        { time: '00:15:10', type: 'multiple_tabs', severity: 'high', description: '3+ browser tabs detected' },
        { time: '00:28:45', type: 'second_face', severity: 'critical', description: 'Additional person detected in room' }
      ],
      metrics: {
        focus: 65,
        integrity: 45,
        behavior: 72,
        attention: 58
      },
      videoUrl: '/api/proctoring/session/3/video'
    }
  ]

  const selectedSessionData = proctoringSessions.find(s => s.id === selectedSession)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Eye className="w-8 h-8 text-[#3EFFA8]" />
            Remote Proctoring
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            AI-powered assessment security with real-time monitoring and integrity verification
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Play className="w-4 h-4 mr-2" />
            Start New Session
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <Settings className="w-4 h-4 mr-2" />
            Proctoring Settings
          </Button>
        </div>
      </div>

      {/* Proctoring Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-[#3EFFA8]" />
            <span className="text-[#C9CFD6] text-sm">Active Sessions</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{proctoringSessions.filter(s => s.status === 'in-progress').length}</div>
          <p className="text-[#8A8F98] text-xs">Real-time monitoring</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-6 h-6 text-[#60A5FA]" />
            <span className="text-[#C9CFD6] text-sm">Security Issues</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{proctoringSessions.filter(s => s.riskLevel === 'high').length}</div>
          <p className="text-[#8A8F98] text-xs">Requiring attention</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-6 h-6 text-[#F59E0B]" />
            <span className="text-[#C9CFD6] text-sm">Avg Integrity Score</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">91%</div>
          <p className="text-[#8A8F98] text-xs">+5% from last week</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-[#EF4444]" />
            <span className="text-[#C9CFD6] text-sm">Completion Rate</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">96%</div>
          <p className="text-[#8A8F98] text-xs">Industry standard</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sessions List */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Active Sessions</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {proctoringSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSession === session.id
                      ? 'bg-[#3EFFA8] text-black border border-[#3EFFA8]'
                      : 'bg-[#111315] border border-[#23262B] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className={`w-8 h-8 ${selectedSession === session.id ? 'bg-black text-[#3EFFA8]' : 'bg-[#3EFFA8]'}`}>
                      <AvatarFallback className={selectedSession === session.id ? 'text-[#3EFFA8]' : 'text-black'}>
                        {session.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        selectedSession === session.id ? 'text-black' : 'text-[#FFFFFF]'
                      }`}>
                        {session.candidateName}
                      </p>
                      <Badge variant="outline" className={`text-xs ${
                        selectedSession === session.id
                          ? 'border-black text-black'
                          : session.status === 'in-progress'
                            ? 'border-green-400 text-green-400'
                            : session.status === 'completed'
                              ? 'border-blue-400 text-blue-400'
                              : 'border-yellow-400 text-yellow-400'
                      }`}>
                        {session.status}
                      </Badge>
                    </div>
                  </div>

                  <div className={`text-xs mb-2 ${
                    selectedSession === session.id ? 'text-black opacity-70' : 'text-[#C9CFD6]'
                  }`}>
                    {session.testName.slice(0, 25)}...
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className={
                      selectedSession === session.id ? 'text-black opacity-70' : 'text-[#8A8F98]'
                    }>
                      {session.incidents} alerts
                    </span>
                    <Badge className={`text-xs ${
                      session.riskLevel === 'very_low' ? 'bg-green-900 text-green-300' :
                      session.riskLevel === 'low' ? 'bg-blue-900 text-blue-300' :
                      session.riskLevel === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {session.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Real-time Monitoring */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">AI Monitoring</h3>
            <div className="space-y-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3EFFA8] rounded-full mx-auto flex items-center justify-center mb-2">
                  <Eye className="w-8 h-8 text-black" />
                </div>
                <p className="text-[#C9CFD6] text-sm">All {proctoringSessions.length} sessions</p>
                <p className="text-green-400 font-bold">MONITORED</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Cheating Prevention</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Face Recognition</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Browser Lockdown</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#C9CFD6]">Audio Analysis</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Session Details & Video */}
        <div className="xl:col-span-3 space-y-6">
          {selectedSessionData && (
            <>
              {/* Session Overview */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {selectedSessionData!.candidateName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-[#FFFFFF]">{selectedSessionData!.candidateName}</h2>
                      <p className="text-[#C9CFD6]">{selectedSessionData!.testName}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={`text-sm mb-2 ${
                      selectedSessionData!.status === 'in-progress' ? 'bg-green-900 text-green-300' :
                      selectedSessionData!.status === 'completed' ? 'bg-blue-900 text-blue-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {selectedSessionData!.status.charAt(0).toUpperCase() + selectedSessionData!.status.slice(1)}
                    </Badge>
                    <div className="text-sm text-[#C9CFD6]">
                      Risk Level: <span className={`font-bold ${
                        selectedSessionData!.riskLevel === 'very_low' ? 'text-green-400' :
                        selectedSessionData!.riskLevel === 'low' ? 'text-blue-400' :
                        selectedSessionData!.riskLevel === 'medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {selectedSessionData!.riskLevel.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedSessionData!.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedSessionData!.incidents} incidents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9CFD6]">Started:</span>
                    <span className="text-[#FFFFFF]">{new Date(selectedSessionData!.startTime).toLocaleString()}</span>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex gap-3 mt-6">
                  {selectedSessionData!.status === 'in-progress' ? (
                    <>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Session
                      </Button>
                      <Button variant="outline" className="border-[#F59E0B] text-[#F59E0B]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Warning
                      </Button>
                      <Button variant="outline" className="border-[#EF4444] text-[#EF4444]">
                        <XCircle className="w-4 h-4 mr-2" />
                        Terminate Test
                      </Button>
                    </>
                  ) : (
                    <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <Play className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  )}
                </div>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-[#FFD700]" />
                  Performance & Security Metrics
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-[#111315] rounded-lg">
                    <div className="text-2xl font-bold text-[#3EFFA8]">{selectedSessionData!.metrics.focus}%</div>
                    <div className="text-xs text-[#C9CFD6]">Focus Score</div>
                  </div>
                  <div className="text-center p-3 bg-[#111315] rounded-lg">
                    <div className="text-2xl font-bold text-[#60A5FA]">{selectedSessionData!.metrics.integrity}%</div>
                    <div className="text-xs text-[#C9CFD6]">Integrity Rating</div>
                  </div>
                  <div className="text-center p-3 bg-[#111315] rounded-lg">
                    <div className="text-2xl font-bold text-[#F59E0B]">{selectedSessionData!.metrics.behavior}%</div>
                    <div className="text-xs text-[#C9CFD6]">Behavior Score</div>
                  </div>
                  <div className="text-center p-3 bg-[#111315] rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{selectedSessionData!.metrics.attention}%</div>
                    <div className="text-xs text-[#C9CFD6]">Attention Level</div>
                  </div>
                </div>

                {/* Security Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedSessionData!.verificationStatus).map(([key, status]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-[#111315] rounded-lg">
                      <span className="text-[#C9CFD6] capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <CheckCircle className={`w-5 h-5 ${
                        status === 'verified' ? 'text-[#3EFFA8]' :
                        status === 'active' ? 'text-[#60A5FA]' :
                        status === 'flagged' ? 'text-[#F59E0B]' :
                        'text-[#EF4444]'
                      }`} />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Incident Log */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />
                  Security Incidents ({selectedSessionData!.flags.length})
                </h3>

                {selectedSessionData!.flags.length > 0 ? (
                  <div className="space-y-3">
                    {selectedSessionData!.flags.map((flag: any, i: any) => (
                      <div key={i} className={`p-4 rounded-lg border-l-4 ${
                        flag.severity === 'critical' ? 'border-red-500 bg-red-900/20' :
                        flag.severity === 'high' ? 'border-orange-500 bg-orange-900/20' :
                        flag.severity === 'medium' ? 'border-yellow-500 bg-yellow-900/20' :
                        'border-blue-500 bg-blue-900/20'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[#FFD700] font-mono text-sm">{flag.time}</span>
                            <Badge className={`text-xs ${
                              flag.severity === 'critical' ? 'bg-red-900 text-red-300' :
                              flag.severity === 'high' ? 'bg-orange-900 text-orange-300' :
                              flag.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                              'bg-blue-900 text-blue-300'
                            }`}>
                              {flag.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6] text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Review
                          </Button>
                        </div>
                        <p className="text-[#E2E8F0] text-sm">{flag.description}</p>
                        <p className="text-[#8A8F98] text-xs mt-1">Type: {flag.type.replace('_', ' ')}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-[#3EFFA8] mx-auto mb-4 opacity-70" />
                    <h4 className="text-xl font-medium text-[#FFFFFF] mb-2">No Security Issues</h4>
                    <p className="text-[#C9CFD6]">
                      This session has maintained full integrity with zero security flags.
                    </p>
                  </div>
                )}
              </Card>

              {/* Video Monitoring (Placeholder) */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <div className="text-center">
                  <div className="aspect-video bg-[#111315] rounded-lg relative mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Monitor className="w-16 h-16 text-[#3EFFA8] mx-auto mb-4 opacity-70" />
                        <p className="text-[#C9CFD6]">Video Monitoring Feed</p>
                        <p className="text-[#8A8F98] text-sm">Real-time candidate monitoring active</p>
                      </div>
                    </div>
                    {/* Live indicator */}
                    {selectedSessionData!.status === 'in-progress' && (
                      <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  <div className="flex justify-center gap-3">
                    <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                      <Download className="w-4 h-4 mr-2" />
                      Download Session
                    </Button>
                    <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA]">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Detailed Report
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
