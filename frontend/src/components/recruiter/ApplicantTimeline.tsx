'use client'

import React from 'react'
import { TimelineEvent } from '@/lib/ai/recruiter/mockData'
import * as Icons from 'lucide-react'

interface ApplicantTimelineProps {
  timeline: TimelineEvent[]
}

const getTimelineColor = (type: string) => {
  switch (type) {
    case 'application_received':
      return 'text-blue-400'
    case 'ai_match_generated':
      return 'text-purple-400'
    case 'recruiter_viewed_profile':
    case 'recruiter_sent_message':
      return 'text-cyan-400'
    case 'candidate_replied':
      return 'text-green-400'
    case 'shortlisted':
      return 'text-yellow-400'
    case 'rejected':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

const getTimelineBgColor = (type: string) => {
  switch (type) {
    case 'application_received':
      return 'bg-blue-500/10'
    case 'ai_match_generated':
      return 'bg-purple-500/10'
    case 'recruiter_viewed_profile':
    case 'recruiter_sent_message':
      return 'bg-cyan-500/10'
    case 'candidate_replied':
      return 'bg-green-500/10'
    case 'shortlisted':
      return 'bg-yellow-500/10'
    case 'rejected':
      return 'bg-red-500/10'
    default:
      return 'bg-gray-500/10'
  }
}

const formatTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp.replace(' ', 'T'))
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else {
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }
      return date.toLocaleDateString('en-US', options)
    }
  } catch {
    return timestamp
  }
}

export default function ApplicantTimeline({ timeline }: ApplicantTimelineProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Application Timeline</h3>

      <div className="space-y-6">
        {timeline
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .map((event, index) => {
          const Icon = IconComponent(event.icon)
          return (
            <div key={event.id} className="flex items-start space-x-4 relative animate-fade-in">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${getTimelineBgColor(event.type)} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${getTimelineColor(event.type)}`} />
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-white/20 to-white/5 mt-2" />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{event.title}</h4>
                  <span className="text-sm text-white/60">{formatTimestamp(event.timestamp)}</span>
                </div>
                <p className="text-white/80 text-sm">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function to get the correct icon component
function IconComponent(name: string) {
  // Map of icon names to Lucide components
  const iconMap: Record<string, React.ComponentType<any>> = {
    InboxArrowDown: Icons.Download,
    Sparkles: Icons.Sparkles,
    UserCheck: Icons.UserCheck,
    MessageSquare: Icons.MessageSquare,
    Reply: Icons.Reply,
    Star: Icons.Star,
    CheckCircle: Icons.CheckCircle,
    XCircle: Icons.XCircle,
    Calendar: Icons.Calendar,
    DollarSign: Icons.DollarSign,
    Trophy: Icons.Trophy
  }

  return iconMap[name] || Icons.Clock
}
