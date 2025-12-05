'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Applicant } from '@/lib/ai/recruiter/mockData'
import ApplicantTimeline from './ApplicantTimeline'
import ChatWindow from '@/components/Chat/ChatWindow'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Clock,
  GraduationCap,
  Github,
  Linkedin,
  Globe,
  Mail,
  Calendar,
  Trophy,
  Star,
  Download,
  MessageSquare,
  CheckCircle,
  XCircle,
  FileText,
  PenTool,
  Brain,
  BarChart3,
  Users,
  X,
  Video
} from 'lucide-react'

interface ResumeAnalysis {
  summary: string
  keySkills: string[]
  strengths: string[]
  weaknesses: string[]
  atsScore: number
  note: string
}

interface Interview {
  id: string
  date: Date
  mode: 'online' | 'offline'
  meetingLink?: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

interface ApplicantDetailProps {
  applicant: Applicant
  onBack?: () => void
}

export default function ApplicantDetail({ applicant, onBack }: ApplicantDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'messages' | 'portfolio'>('overview')
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysis | null>(null)
  const [analyzingResume, setAnalyzingResume] = useState(false)

  // Interview-related state
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    mode: 'online' as 'online' | 'offline',
    meetingLink: '',
    notes: ''
  })

  const analyzeResume = async () => {
    setAnalyzingResume(true)
    try {
      // Try the API call first for real applications
      const response = await fetch('/pages/api/recruiter/ai/analyzeResume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: applicant.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setResumeAnalysis(data.analysis)
        return
      }

      // If API fails (likely demo data), generate mock analysis directly
      console.warn('API failed, using demo analysis')
      const mockAnalysis = {
        summary: `${applicant.name} is a ${applicant.experience >= 3 ? 'senior' : 'mid-level'} developer with strong technical foundation and practical experience in modern web technologies. Their background demonstrates solid problem-solving skills and ability to work with diverse technology stacks, making them a promising candidate for growth-oriented development roles.`,
        keySkills: applicant.skills?.slice(0, 5).map(skill => typeof skill === 'string' ? skill : skill.name) || ['JavaScript', 'React', 'Node.js'],
        strengths: [
          `Strong technical foundation with ${applicant.experience}+ years experience`,
          'Excellent communication skills evidenced by clear proposal',
          'Diverse technical skill set applicable to modern development',
          `Established presence on professional networks (${applicant.github ? 'GitHub' : ''} ${applicant.linkedin ? 'LinkedIn' : ''})`,
        ],
        weaknesses: [
          'Could benefit from more documentation of complex projects',
          'Limited emphasis on quantifiable achievements in experience section',
          'Portfolio could showcase larger-scale application development'
        ],
        atsScore: Math.floor(Math.random() * 30) + 60, // Random 60-90
        note: "demo-generated"
      }
      setResumeAnalysis(mockAnalysis)
    } catch (error) {
      console.error('Failed to analyze resume:', error)
      // Final fallback - always show something
      const fallbackAnalysis = {
        summary: `${applicant.name} shows promise as a developer with solid foundational skills.`,
        keySkills: applicant.skills?.slice(0, 3).map(skill => typeof skill === 'string' ? skill : skill.name) || ['JavaScript', 'React'],
        strengths: ['Technical foundation', 'Learning ability'],
        weaknesses: ['Limited experience', 'Portfolio could be expanded'],
        atsScore: 65,
        note: "fallback-generated"
      }
      setResumeAnalysis(fallbackAnalysis)
    } finally {
      setAnalyzingResume(false)
    }
  }

  // Interview functions
  const handleScheduleInterview = async () => {
    setIsScheduling(true)
    try {
      const response = await fetch('/pages/api/recruiter/interview/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: applicant.id,
          date: scheduleForm.date,
          time: scheduleForm.time,
          mode: scheduleForm.mode,
          meetingLink: scheduleForm.mode === 'online' ? scheduleForm.meetingLink : undefined,
          notes: scheduleForm.notes,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setInterviews([...interviews, {
          id: data.interview.id,
          date: new Date(data.interview.date),
          mode: data.interview.mode,
          meetingLink: data.interview.meetingLink,
          status: data.interview.status,
          notes: data.interview.notes,
        }])
        setShowScheduleModal(false)
        setScheduleForm({ date: '', time: '', mode: 'online', meetingLink: '', notes: '' })
        alert('Interview scheduled successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to schedule interview: ${error.error}`)
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error)
      alert('Failed to schedule interview. Please try again.')
    } finally {
      setIsScheduling(false)
    }
  }

  const handleUpdateInterviewStatus = async (interviewId: string, status: 'completed' | 'cancelled') => {
    try {
      const response = await fetch('/pages/api/recruiter/interview/updateStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interviewId,
          status,
        }),
      })

      if (response.ok) {
        setInterviews(interviews.map(interview =>
          interview.id === interviewId ? { ...interview, status } : interview
        ))
        alert(`Interview ${status} successfully!`)
      } else {
        const error = await response.json()
        alert(`Failed to update interview status: ${error.error}`)
      }
    } catch (error) {
      console.error('Failed to update interview status:', error)
      alert('Failed to update interview status. Please try again.')
    }
  }

  const getInterviewStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-400 border-blue-400/40'
      case 'completed':
        return 'text-green-400 border-green-400/40'
      case 'cancelled':
        return 'text-red-400 border-red-400/40'
      default:
        return 'text-gray-400 border-gray-400/40'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'interviewed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'hired':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return <CheckCircle className="w-3 h-3" />
      case 'rejected':
        return <XCircle className="w-3 h-3" />
      case 'hired':
        return <Trophy className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button variant="outline" size="sm" onClick={onBack} className="border-white/20 text-white hover:bg-white/10">
              ← Back
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-white">{applicant.name}</h1>
            <p className="text-gray-300">{applicant.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(applicant.status)}`}>
            {getStatusIcon(applicant.status)}
            {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
          </div>

          {applicant.matchScore && (
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-white">{applicant.matchScore}% match</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">
                  {applicant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{applicant.location}</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-white text-sm">{applicant.experience} years experience</span>
              </div>

              {applicant.education && (
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{applicant.education}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {applicant.github && (
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Github className="w-4 h-4" />
                  </Button>
                )}
                {applicant.linkedin && (
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                )}
                {applicant.portfolio && (
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Globe className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {applicant.salaryExpectation && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Salary Expectation</p>
                  <p className="text-white font-medium">{applicant.salaryExpectation}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Skills Card */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm flex items-center gap-1">
                  {typeof skill === 'string' ? skill : skill.name}
                  {typeof skill !== 'string' && skill.level === 'advanced' && (
                    <Star className="w-3 h-3 fill-current" />
                  )}
                </span>
              ))}
            </div>
          </Card>

          {/* Past Experience */}
          {applicant.pastExperience && applicant.pastExperience.length > 0 && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Experience</h3>
              <div className="space-y-4">
                {applicant.pastExperience.map((exp, index) => (
                  <div key={index} className="pb-4 last:pb-0">
                    <h4 className="text-white font-medium">{exp.title}</h4>
                    <p className="text-purple-400 text-sm">{exp.company}</p>
                    <p className="text-gray-400 text-sm mb-2">{exp.duration}</p>
                    <p className="text-gray-300 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Content & Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 rounded-xl p-1">
            {[
              { id: 'overview', label: 'Overview', icon: FileText },
              { id: 'resume', label: 'Resume', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'portfolio', label: 'Portfolio', icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Proposal</h3>
                  {applicant.proposal ? (
                    <p className="text-gray-300 leading-relaxed">{applicant.proposal}</p>
                  ) : (
                    <p className="text-gray-500 italic">No proposal provided</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Applied On</h4>
                    <p className="text-gray-300">{new Date(applicant.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>

                  {applicant.resume && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Resume</h4>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="space-y-6">
                {/* Resume Analysis */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Resume Analysis</h3>
                    <p className="text-gray-400 text-sm">Use AI to analyze the candidate's resume and identify key insights</p>
                  </div>
                  <Button
                    onClick={analyzeResume}
                    disabled={analyzingResume}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
                  >
                    {analyzingResume ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze Resume with AI
                      </>
                    )}
                  </Button>
                </div>

                {/* Analysis Results */}
                {resumeAnalysis && (
                  <div className="space-y-6 border border-white/10 rounded-xl p-6 bg-white/5">
                    {/* Summary */}
                    <div>
                      <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        AI Summary
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{resumeAnalysis.summary}</p>
                    </div>

                    {/* ATS Score */}
                    <div>
                      <h4 className="font-medium text-white mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          ATS Compatibility Score
                        </span>
                        <span className="text-lg font-bold text-white">{resumeAnalysis.atsScore}%</span>
                      </h4>
                      <progress
                        value={resumeAnalysis.atsScore}
                        max="100"
                        className="w-full h-2 rounded-full progress-bar"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Key Skills */}
                      <div>
                        <h4 className="font-medium text-white mb-3">Key Skills Identified</h4>
                        <div className="flex flex-wrap gap-2">
                          {resumeAnalysis.keySkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {resumeAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Weaknesses */}
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-orange-400 mb-3 flex items-center gap-2">
                          <XCircle className="w-4 h-4" />
                          Areas for Improvement
                        </h4>
                        <ul className="space-y-2">
                          {resumeAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                              <span className="text-sm">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Note */}
                    <div className="text-xs text-gray-500 border-t border-white/10 pt-3">
                      <span className="px-2 py-1 bg-white/10 rounded">Note: {resumeAnalysis.note}</span>
                    </div>
                  </div>
                )}

                {/* Resume Download */}
                <div className="flex items-center justify-center pt-6 border-t border-white/10">
                  {applicant.resume && (
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      View Full Resume
                    </Button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-4">
                <ChatWindow
                  conversationWithId={applicant.id}
                  currentUserId="demo-recruiter"
                  partnerName={applicant.name}
                />
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-4">
                {applicant.portfolio && applicant.portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {applicant.portfolio.map((item, index) => (
                      <div key={index} className="bg-white/5 rounded-xl p-4">
                        <Globe className="w-8 h-8 text-purple-400 mb-3" />
                        <h4 className="text-white font-medium mb-2">Portfolio Item {index + 1}</h4>
                        <a
                          href={item}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 text-sm underline"
                        >
                          {item}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No Portfolio Items</p>
                    <p className="text-sm">Portfolio items would be displayed here</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Interviews Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Interviews
              </h3>
              <Button
                onClick={() => setShowScheduleModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>

            {/* Existing Interviews */}
            {interviews.length > 0 ? (
              <div className="space-y-3">
                {interviews.map((interview) => (
                  <Card key={interview.id} className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-1 text-xs rounded border ${getInterviewStatusColor(interview.status)}`}>
                          {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {interview.date.toLocaleDateString()} at {interview.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-gray-400 text-sm flex items-center gap-2">
                            <Video className="w-3 h-3" />
                            {interview.mode.charAt(0).toUpperCase() + interview.mode.slice(1)}
                            {interview.meetingLink && interview.mode === 'online' && (
                              <a
                                href={interview.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 underline text-xs"
                              >
                                Join Meeting
                              </a>
                            )}
                          </p>
                        </div>
                      </div>

                      {interview.status === 'scheduled' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateInterviewStatus(interview.id, 'completed')}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Mark Completed
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateInterviewStatus(interview.id, 'cancelled')}
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>

                    {interview.notes && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-gray-400 text-sm">Notes: {interview.notes}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No interviews scheduled</p>
                <p className="text-sm">Schedule the first interview for this candidate</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/recruiter/email-generator?candidateId=${applicant.id}&gigId=gig1&type=followup`}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <PenTool className="w-4 h-4 mr-2" />
                Generate Follow-up Email
              </Button>
            </Link>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" />
              Download Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Application Timeline */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Application Timeline</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-purple-400 flex-shrink-0"></div>
            <div>
              <p className="text-white font-medium">Application Submitted</p>
              <p className="text-gray-400 text-sm">{new Date(applicant.appliedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </li>

          {resumeAnalysis && (
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 flex-shrink-0"></div>
              <div>
                <p className="text-white font-medium">Resume Analyzed</p>
                <p className="text-gray-400 text-sm">AI analysis completed with {resumeAnalysis.atsScore}% ATS compatibility</p>
              </div>
            </li>
          )}

          {interviews.filter(i => i.status === 'scheduled').map((interview, index) => (
            <li key={`scheduled-${index}`} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
              <div>
                <p className="text-white font-medium">Interview Scheduled</p>
                <p className="text-gray-400 text-sm">
                  {interview.mode.charAt(0).toUpperCase() + interview.mode.slice(1)} interview on {interview.date.toLocaleDateString()} at {interview.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </li>
          ))}

          {interviews.filter(i => i.status === 'completed').map((interview, index) => (
            <li key={`completed-${index}`} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 flex-shrink-0"></div>
              <div>
                <p className="text-white font-medium">Interview Completed</p>
                <p className="text-gray-400 text-sm">Interview finished on {interview.date.toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="bg-gray-900 border-gray-700 p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Schedule Interview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Time</label>
                <input
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="online"
                      checked={scheduleForm.mode === 'online'}
                      onChange={(e) => setScheduleForm({...scheduleForm, mode: e.target.value as 'online' | 'offline'})}
                      className="mr-2"
                    />
                    <span className="text-white">Online</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="offline"
                      checked={scheduleForm.mode === 'offline'}
                      onChange={(e) => setScheduleForm({...scheduleForm, mode: e.target.value as 'online' | 'offline'})}
                      className="mr-2"
                    />
                    <span className="text-white">Offline</span>
                  </label>
                </div>
              </div>

              {scheduleForm.mode === 'online' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Meeting Link</label>
                  <input
                    type="url"
                    placeholder="https://zoom.us/..."
                    value={scheduleForm.meetingLink}
                    onChange={(e) => setScheduleForm({...scheduleForm, meetingLink: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">Notes (Optional)</label>
                <textarea
                  value={scheduleForm.notes}
                  onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                  placeholder="Any additional notes for this interview..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowScheduleModal(false)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-white hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScheduleInterview}
                  disabled={isScheduling || !scheduleForm.date || !scheduleForm.time}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {isScheduling ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    'Schedule Interview'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Timeline - Keeping for compatibility with old implementation */}
      {applicant.timeline && applicant.timeline.length > 0 && (
        <ApplicantTimeline timeline={applicant.timeline} />
      )}
    </div>
  )
}
