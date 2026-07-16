'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, MapPin, DollarSign, Users, Star, Clock, ArrowLeft, MessageCircle, User } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import ChatWindow from '@/components/Chat/ChatWindow'

interface Application {
  id: string
  gigId: number
  studentId: string
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired'
  appliedDate: string
  coverLetter: string
  proposalUrl?: string
  gig: {
    id: number
    title: string
    company: string
    salary: string
    skills: string[]
    location: string
    description: string
  }
  recruiterId: string
}

export default function StudentApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string

  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'details' | 'messages'>('details')

  useEffect(() => {
    const loadApplication = async () => {
      try {
        // In a real app, you'd fetch the application data by ID
        // For demo, we'll create mock data based on the ID
        const mockApplication: Application = {
          id: applicationId,
          gigId: 1,
          studentId: 'demo-student',
          status: 'pending',
          appliedDate: '2024-12-03',
          coverLetter: 'I am excited to apply for this position. With my 3+ years of React experience, I believe I would be a great fit for this role.',
          gig: {
            id: 1,
            title: 'Senior React Developer',
            company: 'TechCorp Inc',
            salary: '$70,000 - $90,000',
            skills: ['React', 'TypeScript', 'Node.js'],
            location: 'Remote',
            description: 'We are looking for a skilled React developer to join our growing team...'
          },
          recruiterId: 'demo-recruiter'
        }

        setApplication(mockApplication)
      } catch (error) {
        console.error('Failed to load application:', error)
      } finally {
        setLoading(false)
      }
    }

    loadApplication()
  }, [applicationId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'shortlisted':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'hired':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  if (!application) {
    return (
      <GlassCard className="text-center py-12">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-xl font-semibold text-white mb-2">Application Not Found</h2>
        <p className="text-white/70">The application you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-3 bg-purple-500/20 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors"
        >
          Go Back
        </button>
      </GlassCard>
    )
  }

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>
      </div>

      {/* Application Header */}
      <GlassCard className="neon-glow-purple">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-gradient">{application.gig.title}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
              </div>
            </div>
            <div className="flex items-center gap-6 text-white/70 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-bold">
                  {application.gig.company.charAt(0)}
                </div>
                <span className="font-medium">{application.gig.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>{application.gig.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{application.gig.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Applied {application.appliedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {[
          { id: 'details', label: 'Application Details', icon: User },
          { id: 'messages', label: 'Messages', icon: MessageCircle },
        ].map((tab) => {
          const IconComponent = tab.icon
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
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Details */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">Your Application</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Cover Letter</h3>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/80 leading-relaxed">{application.coverLetter}</p>
                </div>
              </div>

              {application.proposalUrl && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Additional Files</h3>
                  <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white/80">Portfolio/Resume Attached</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Application Status</h4>
                  <div className={`inline-block px-2 py-1 text-xs rounded border ${getStatusColor(application.status)}`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Applied On</h4>
                  <p className="text-white/80 text-sm">
                    {new Date(application.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Job Information */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-4">Job Information</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Job Description</h3>
                <p className="text-white/80 leading-relaxed">{application.gig.description}</p>
              </div>

              {/* Skills Required */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {application.gig.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Salary Range</h4>
                  <p className="text-white/80 text-sm">{application.gig.salary}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Location</h4>
                  <p className="text-white/80 text-sm">{application.gig.location}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'messages' && (
        <GlassCard>
          <ChatWindow
            conversationWithId={application.recruiterId}
            currentUserId="demo-student"
            partnerName={application.gig.company}
          />
        </GlassCard>
      )}
    </div>
  )
}
