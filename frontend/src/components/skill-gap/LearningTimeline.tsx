'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Calendar, Clock, CheckCircle, Play, Book } from 'lucide-react'
import { useState } from 'react'

interface TimelineItem {
  week: number
  title: string
  description: string
  skills: string[]
  duration: string
  type: 'theory' | 'practice' | 'review' | 'project'
  status: 'locked' | 'available' | 'completed'
}

export function LearningTimeline() {
  const [currentWeek, setCurrentWeek] = useState(1)

  const timelineData: TimelineItem[] = [
    {
      week: 1,
      title: 'Foundations & Core Concepts',
      description: 'Build solid understanding of fundamental concepts and basic usage patterns.',
      skills: ['Basic Usage', 'Environment Setup', 'Core Features'],
      duration: '4-6 hours/week',
      type: 'theory',
      status: currentWeek >= 1 ? 'available' : 'locked'
    },
    {
      week: 2,
      title: 'Intermediate Patterns',
      description: 'Learn advanced patterns, best practices, and common implementation strategies.',
      skills: ['Design Patterns', 'Best Practices', 'Architecture'],
      duration: '6-8 hours/week',
      type: 'practice',
      status: currentWeek >= 2 ? 'available' : 'locked'
    },
    {
      week: 3,
      title: 'Real-world Projects',
      description: 'Apply knowledge through hands-on projects and real-world scenarios.',
      skills: ['Project Structure', 'Integration', 'Deployment'],
      duration: '8-10 hours/week',
      type: 'project',
      status: currentWeek >= 3 ? 'available' : 'locked'
    },
    {
      week: 4,
      title: 'Advanced Topics & Specialization',
      description: 'Deep dive into advanced concepts, optimization, and industry-specific applications.',
      skills: ['Performance', 'Security', 'Scaling'],
      duration: '6-8 hours/week',
      type: 'review',
      status: currentWeek >= 4 ? 'available' : 'locked'
    },
    {
      week: 5,
      title: 'Integration & Portfolio',
      description: 'Integrate multiple skills and create portfolio-worthy projects.',
      skills: ['Full-stack Apps', 'APIs', 'Testing'],
      duration: '8-10 hours/week',
      type: 'project',
      status: 'locked'
    },
    {
      week: 6,
      title: 'Career Preparation & Review',
      description: 'Final review, interview preparation, and career roadmap development.',
      skills: ['Interviews', 'Soft Skills', 'Networking'],
      duration: '4-6 hours/week',
      type: 'review',
      status: 'locked'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return <Book className="w-4 h-4" />
      case 'practice': return <Play className="w-4 h-4" />
      case 'project': return <CheckCircle className="w-4 h-4" />
      case 'review': return <Clock className="w-4 h-4" />
      default: return <Book className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'text-blue-400 border-blue-400/30'
      case 'practice': return 'text-green-400 border-green-400/30'
      case 'project': return 'text-purple-400 border-purple-400/30'
      case 'review': return 'text-yellow-400 border-yellow-400/30'
      default: return 'text-white/70 border-white/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 border-green-500'
      case 'available': return 'bg-purple-500/20 border-purple-500'
      case 'locked': return 'bg-white/5 border-white/20'
      default: return 'bg-white/5 border-white/20'
    }
  }

  return (
    <GlassCard title="6-Week Learning Timeline">
      <div className="space-y-6">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Accelerated Learning Plan</h3>
          <p className="text-white/70 text-sm">
            Structured 6-week program to master priority skills and bridge your skill gaps
          </p>
        </div>

        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <div key={item.week} className="relative">
              {index < timelineData.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-white/20"></div>
              )}

              <div className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                    <span className={`text-sm font-bold ${item.status === 'available' ? 'text-purple-400' : 'text-white/60'}`}>
                      {item.week}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                    <div className={`flex items-center px-2 py-1 rounded text-xs ${getTypeColor(item.type)}`}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1 capitalize">{item.type}</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3">{item.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-1">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="text-white/60 text-xs">{item.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    {item.status === 'available' && (
                      <>
                        <button className="text-purple-400 text-sm hover:underline flex items-center">
                          <Play className="w-3 h-3 mr-1" />
                          Start Week {item.week}
                        </button>
                        <button className="text-white/60 text-xs hover:text-white">
                          📚 View Resources
                        </button>
                      </>
                    )}
                    {item.status === 'completed' && (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                    {item.status === 'locked' && (
                      <div className="text-white/40 text-xs">
                        🔒 Complete previous weeks to unlock
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Expected Outcomes</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-green-400">85%</div>
                <div className="text-white/60">Skill Proficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">3</div>
                <div className="text-white/60">Projects Built</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">$15K</div>
                <div className="text-white/60">Salary Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
