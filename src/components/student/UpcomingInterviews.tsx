'use client'

import { Calendar, Clock, Building } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface InterviewType {
  id: number
  company: string
  position: string
  date: string
  time: string
  type: string
  status: string
}

interface UpcomingInterviewsProps {
  interviews: InterviewType[]
}

export function UpcomingInterviews({ interviews }: UpcomingInterviewsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

  const getInterviewTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'technical interview':
        return 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border-blue-400/30'
      case 'behavioral interview':
        return 'bg-gradient-to-r from-purple-500/20 to-purple-400/20 border-purple-400/30'
      case 'system design':
        return 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-400/30'
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-6 w-6 text-white" />
        <h3 className="text-xl font-bold text-white">Upcoming Interviews</h3>
      </div>

      <div className="space-y-3">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-200 hover:bg-white/10"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="h-4 w-4 text-white/60" />
                  <h4 className="font-semibold text-white text-lg">{interview.company}</h4>
                </div>
                <p className="text-white/90 font-medium mb-2">{interview.position}</p>

                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(interview.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{interview.time}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full text-white border ${getInterviewTypeColor(interview.type)}`}
                  >
                    {interview.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {interviews.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No upcoming interviews</p>
            <p className="text-sm mt-1">Keep applying to land your next opportunity!</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-white/10">
        <p className="text-center text-sm text-white/60">
          Showing all scheduled interviews
        </p>
      </div>
    </GlassCard>
  )
}
