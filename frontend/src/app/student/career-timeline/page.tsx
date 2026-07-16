'use client'

import React, { useState } from 'react'
import { Brain, Target } from 'lucide-react'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { Badge } from '@/components/ui/badge'

export default function CareerTimelinePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'salary' | 'skills'>('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Brain className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Career Intelligence Hub
              </h1>
              <p className="text-slate-400">Enterprise-grade career planning with predictive analytics</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">78%</div>
              <div className="text-xs text-slate-400">Market Readiness</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">$135k</div>
              <div className="text-xs text-slate-400">Salary Projection</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-400"><AnimatedCounter value={285} /></div>
              <div className="text-xs text-slate-400">Network Strength</div>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">82%</div>
              <div className="text-xs text-slate-400">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="bg-slate-800/50 rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 mr-2 inline" />Overview
            </button>
            <button
              onClick={() => setActiveTab('salary')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'salary'
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💰 Salary
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎓 Skills
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Career Path Overview */}
            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Career Path Overview</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 rounded-lg">
                  <h4 className="font-semibold text-white">Current Position</h4>
                  <p className="text-slate-400">Software Developer with 2 years experience</p>
                  <div className="text-2xl font-bold text-cyan-400 mt-2">$95k</div>
                </div>

                <div className="border-l-2 border-cyan-400 pl-4">
                  <h5 className="font-medium text-white">Years 0-2: Senior Developer</h5>
                  <p className="text-sm text-slate-400 mb-2">Technical leadership focus</p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400">$135k target</span>
                    <Badge variant="secondary">82% ready</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">AI Strategic Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-600/10 to-green-600/10 border border-emerald-500/20 rounded-lg">
                  <div className="font-semibold text-emerald-300 mb-2">Priority Action</div>
                  <p className="text-slate-200 text-sm">Focus on System Design skills - 85% of senior roles require this</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-white font-semibold">Your Strengths</h4>
                  {['Strong technical foundation', 'Problem solving', 'Quick learning'].map((strength, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-slate-300">
                      <span className="text-green-400">✓</span>
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Salary Projections</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current:</span>
                  <span className="text-white">$95,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">2 Years:</span>
                  <span className="text-cyan-400">$135,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">5 Years:</span>
                  <span className="text-emerald-400">$190,000</span>
                </div>
                <div className="border-t border-slate-600 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-purple-400">Growth:</span>
                    <span className="text-purple-300">+100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Compensation Strategy</h3>
              <div className="space-y-4">
                <div className="p-3 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-lg">
                  <div className="text-green-300 font-medium">Strategic Advice</div>
                  <p className="text-slate-300 text-sm">Focus on equity-heavy roles for maximum long-term compensation</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Critical Skill Gaps</h3>
              {[
                { name: 'System Design', level: 55, target: 90, priority: 'High' },
                { name: 'Team Leadership', level: 35, target: 75, priority: 'Medium' },
                { name: 'Cloud Architecture', level: 60, target: 85, priority: 'High' }
              ].map((skill, idx) => (
                <div key={idx} className="space-y-2 mb-4 last:mb-0">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{skill.name}</span>
                    <Badge variant={skill.priority === 'High' ? 'destructive' : 'secondary'}>
                      {skill.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-400">{skill.level}/{skill.target}% current</div>
                  <div className="w-full bg-slate-600/30 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r h-3 rounded-full ${
                        skill.priority === 'High' ? 'from-red-500 to-red-400' : 'from-blue-500 to-purple-500'
                      }`}
                      style={{ width: `${(skill.level / skill.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg">
              <h3 className="text-white text-lg font-semibold mb-4">Learning Roadmap</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">High-priority skills first</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">Practice with projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✓</span>
                  <span className="text-slate-300">Mentorship integration</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
