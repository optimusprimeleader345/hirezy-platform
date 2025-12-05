'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Applicant } from '@/lib/ai/recruiter/mockData'
import ApplicantTimeline from './ApplicantTimeline'
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
  PenTool
} from 'lucide-react'

interface ApplicantDetailProps {
  applicant: Applicant
  onBack?: () => void
}

export default function ApplicantDetail({ applicant, onBack }: ApplicantDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'portfolio'>('overview')

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
              <div className="text-center py-12 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Resume Preview</p>
                <p className="text-sm">Resume preview functionality would be implemented here</p>
                {applicant.resume && (
                  <Button variant="outline" size="sm" className="mt-4 border-white/20 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    View Full Resume
                  </Button>
                )}
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link href={`/recruiter/email-generator?candidateId=${applicant.id}&gigId=gig1&type=followup`}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <PenTool className="w-4 h-4 mr-2" />
                Generate Follow-up Email
              </Button>
            </Link>
            <Link href={`/recruiter/interview-scheduler?candidateId=${applicant.id}&gigId=gig1`}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
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

      {/* Timeline */}
      {applicant.timeline && applicant.timeline.length > 0 && (
        <ApplicantTimeline timeline={applicant.timeline} />
      )}
    </div>
  )
}
