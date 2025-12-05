'use client'

import { AnalyticsCard } from './AnalyticsCard'
import {
  Zap,
  TrendingUp,
  Star,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Wand2,
  Send
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface JobMatch {
  id: string
  title: string
  company: string
  location: string
  salary: string
  matchScore: number
  skills: string[]
  postedAgo: string
  aiRecommendation: string
  compatibilityBreakdown: {
    skills: number
    experience: number
    salary: number
    location: number
  }
  isLive: boolean
}

const mockJobMatches: JobMatch[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    matchScore: 96,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    postedAgo: '2 hours ago',
    aiRecommendation: 'Perfect match! Your React expertise aligns perfectly with their tech stack. High demand for your skills in this role.',
    compatibilityBreakdown: {
      skills: 95,
      experience: 92,
      salary: 88,
      location: 90
    },
    isLive: true
  },
  {
    id: '2',
    title: 'Full Stack Java Engineer',
    company: 'InnovateLabs',
    location: 'Austin, TX',
    salary: '$110k - $135k',
    matchScore: 91,
    skills: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    postedAgo: '4 hours ago',
    aiRecommendation: 'Excellent opportunity! Your Java background matches their requirements. Consider highlighting your Spring Boot experience.',
    compatibilityBreakdown: {
      skills: 88,
      experience: 85,
      salary: 92,
      location: 94
    },
    isLive: false
  },
  {
    id: '3',
    title: 'Frontend Developer - FinTech',
    company: 'FinanceFlow',
    location: 'New York, NY',
    salary: '$100k - $125k',
    matchScore: 87,
    skills: ['React', 'JavaScript', 'CSS', 'Financial Services'],
    postedAgo: '6 hours ago',
    aiRecommendation: 'Strong match! Your frontend skills align well. Consider gaining some FinTech domain knowledge for better positioning.',
    compatibilityBreakdown: {
      skills: 82,
      experience: 78,
      salary: 85,
      location: 98
    },
    isLive: false
  }
]

export function LiveJobMatching() {
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null)
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false)
  const [newMatchesCount, setNewMatchesCount] = useState(2)

  useEffect(() => {
    // Simulate new matches arriving
    const interval = setInterval(() => {
      setNewMatchesCount(prev => Math.max(0, prev - 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'from-green-400 to-emerald-500'
    if (score >= 80) return 'from-blue-400 to-cyan-500'
    if (score >= 70) return 'from-yellow-400 to-orange-500'
    return 'from-gray-400 to-gray-500'
  }

  const getCompatibilityIcon = (score: number) => {
    if (score >= 90) return <Star className="w-3 h-3 text-green-400" />
    if (score >= 80) return <CheckCircle className="w-3 h-3 text-blue-400" />
    return <AlertCircle className="w-3 h-3 text-orange-400" />
  }

  const handleAutoApply = (job: JobMatch) => {
    // Simulate auto-application process
    alert(`AI Auto-Appling to ${job.title} at ${job.company}... We'll tailor your resume automatically!`)
  }

  return (
    <AnalyticsCard title="🔥 Live AI Job Matching" glow={true}>
      <div className="space-y-6">
        {/* Header with Live Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-400">LIVE MATCHING</span>
            </div>
            {newMatchesCount > 0 && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300">{newMatchesCount} new matches!</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-cyan-400" />
            <label className="text-sm text-gray-300 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoApplyEnabled}
                onChange={(e) => setAutoApplyEnabled(e.target.checked)}
                className="rounded border-gray-600"
              />
              AI Auto-Apply
            </label>
          </div>
        </div>

        {/* Job Match Cards */}
        <div className="space-y-4">
          {mockJobMatches.map((job, index) => (
            <div
              key={job.id}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedJob?.id === job.id ? 'ring-2 ring-cyan-400 ring-opacity-50' : ''
              }`}
              onClick={() => setSelectedJob(job)}
            >
              {/* Live Badge */}
              {job.isLive && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500/20 border border-red-400/30 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-300 font-semibold">JUST POSTED</span>
                </div>
              )}

              {/* Match Score Badge */}
              <div className="absolute top-3 left-3">
                <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getMatchColor(job.matchScore)} text-white text-sm font-bold shadow-lg`}>
                  {job.matchScore}% Match
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-12">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.postedAgo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-3 py-1 bg-gray-500/20 border border-gray-400/30 rounded-full text-xs text-gray-300">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="mb-4">
                  <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-200">{job.aiRecommendation}</p>
                  </div>
                </div>

                {/* Compatibility Breakdown */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(job.compatibilityBreakdown).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-xs">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <div className="flex items-center gap-1">
                        {getCompatibilityIcon(value)}
                        <span className="text-white font-semibold">{value}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <Target className="w-4 h-4" />
                    Apply Now
                  </button>
                  {autoApplyEnabled && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAutoApply(job)
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Auto-Apply
                    </button>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Action Insights */}
        <div className="p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">AI Match Insights</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
            <div>
              <div className="font-semibold text-green-400">Top Skills:</div>
              <div>React, JavaScript, Node.js</div>
            </div>
            <div>
              <div className="font-semibold text-blue-400">Salary Range:</div>
              <div>$100k - $150k (ideal for your level)</div>
            </div>
            <div>
              <div className="font-semibold text-purple-400">Application Rate:</div>
              <div>Apply to 2-3/week for best results</div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
