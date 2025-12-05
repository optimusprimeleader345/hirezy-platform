'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, Award, BarChart, Flame, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

export default function PerformancePage() {
  const [stats, setStats] = useState({
    winRate: 25.0,
    avgMatchScore: 77,
    activity: 'Active',
    readiness: 82
  })

  useEffect(() => {
    // Mock API call simulation
    setTimeout(() => {
      setStats({
        winRate: 25.0,
        avgMatchScore: 77,
        activity: 'Active',
        readiness: 82
      })
    }, 500)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <BarChart className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Performance Analytics AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Comprehensive insights into your career progression, job application success,
            skill development, and market readiness. Track your professional growth with AI-powered analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📊 Career Analytics & KPI Tracking
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📈 Skill Growth Visualization
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🎯 Improvement Recommendations
            </div>
          </div>
        </div>
      </GlassCard>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.winRate}%</div>
            <div className="text-white/70 text-sm mb-4">Win Rate</div>
            <div className="flex items-center justify-center">
              {stats.winRate >= 25 ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : (
                <BarChart className="w-5 h-5 text-yellow-400" />
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.avgMatchScore}</div>
            <div className="text-white/70 text-sm mb-4">Avg Match Score</div>
            <div className="flex items-center justify-center">
              {stats.avgMatchScore >= 80 ? (
                <Award className="w-5 h-5 text-green-400" />
              ) : (
                <Target className="w-5 h-5 text-blue-400" />
              )}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.activity}</div>
            <div className="text-white/70 text-sm mb-4">Activity Streak</div>
            <div className="flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">{stats.readiness}</div>
            <div className="text-white/70 text-sm mb-4">Market Readiness</div>
            <div className="flex items-center justify-center">
              {stats.readiness >= 80 ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <XCircle className="w-5 h-5 text-yellow-400" />
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Application History */}
      <GlassCard title="Application History">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70">Success Rate</span>
            <span className="text-white font-medium">25% (1 won out of 4 applied)</span>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="text-white/70 text-sm mb-2">Recent Applications</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Senior React Developer</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Applied</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Frontend Developer</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Accepted</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Skill Growth */}
      <GlassCard title="Skill Development">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-white mb-2">6</div>
            <div className="text-white/70 text-sm">Skills Developed</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">React</span>
              <div className="flex-1 mx-4">
                <div className="bg-white/10 h-2 rounded-full">
                  <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <span className="text-white text-sm">75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Node.js</span>
              <div className="flex-1 mx-4">
                <div className="bg-white/10 h-2 rounded-full">
                  <div className="bg-yellow-400 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              <span className="text-white text-sm">50%</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* AI Insights */}
      <GlassCard title="AI Performance Insights">
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-green-400 font-medium mb-2">Strengths</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Strong technical foundation in React and JavaScript</li>
              <li>• Good proposal quality scores (75-85 range)</li>
              <li>• Consistent application activity</li>
            </ul>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">Areas for Improvement</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Focus on TypeScript and advanced React concepts</li>
              <li>• Improve interview preparation for technical roles</li>
              <li>• Build portfolio examples showcasing production work</li>
            </ul>
          </div>
        </div>
      </GlassCard>

      {/* Export Options */}
      <div className="flex justify-center space-x-4">
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700">
          Export as TXT
        </button>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700">
          Export as JSON
        </button>
      </div>
    </div>
  )
}
