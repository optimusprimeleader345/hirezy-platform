'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, Award, TrendingUp, Brain, Book, Mic, FileText } from 'lucide-react'

export default function InterviewAIPage() {
  const [selectedRole, setSelectedRole] = useState('frontend-developer')
  const [selectedLevel, setSelectedLevel] = useState('intermediate')
  const [selectedCategory, setSelectedCategory] = useState('technical')
  const [isPracticeMode, setIsPracticeMode] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Interview Coach
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Practice professional interviews with AI-powered feedback. Master behavioral questions,
            technical challenges, and system design problems with personalized coaching.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🤖 AI Assessment & Feedback
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              ⭐ STAR Method Training
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📝 Professional Questions Library
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Practice Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Setup Panel */}
        <div className="lg:col-span-1">
          <GlassCard title="Interview Setup">
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Target Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="frontend-developer">Frontend Developer</option>
                  <option value="backend-developer">Backend Developer</option>
                  <option value="fullstack-developer">Full Stack Developer</option>
                  <option value="react-developer">React Developer</option>
                  <option value="data-engineer">Data Engineer</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Experience Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">Intermediate (2-5 years)</option>
                  <option value="advanced">Advanced (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Question Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="behavioral">Behavioral Questions</option>
                  <option value="technical">Technical Skills</option>
                  <option value="system-design">System Design</option>
                  <option value="domain-specific">Domain-Specific</option>
                </select>
              </div>

              <button
                onClick={() => setIsPracticeMode(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700"
              >
                Start Mock Interview
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Main Practice Area */}
        <div className="lg:col-span-2">
          {!isPracticeMode ? (
            <GlassCard title="Practice Your Interview Skills">
              <div className="text-center py-12">
                <Mic className="w-24 h-24 text-purple-400 mx-auto mb-6 opacity-50" />
                <h3 className="text-xl font-semibold text-white mb-4">Ready to Begin?</h3>
                <p className="text-white/70 mb-6">
                  Practice with AI-powered feedback on {selectedCategory} questions for a {selectedLevel} level {selectedRole.replace('-', ' ')} position.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">3</div>
                    <div className="text-white/70">Questions per session</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">5-10</div>
                    <div className="text-white/70">Minutes each</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">85%</div>
                    <div className="text-white/70">Average improvement</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard title="Mock Interview Session">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center bg-green-500/20 px-4 py-2 rounded-full mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <span className="text-green-400 font-medium">Session Active</span>
                  </div>
                  <p className="text-white/70">Question 1 of 3</p>
                </div>

                <div className="bg-white/10 p-6 rounded-lg">
                  <h4 className="text-white font-medium mb-4">Question:</h4>
                  <p className="text-white/80 text-lg mb-6">
                    Tell me about yourself and your background in software development.
                  </p>
                  <div className="bg-yellow-500/10 p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-yellow-400 text-sm">
                      💡 Tip: Keep your answer to 1-2 minutes. Focus on relevant experience and career goals.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <label className="block text-white font-medium mb-2">Your Answer</label>
                  <textarea
                    placeholder="Type your answer here... Use the STAR method for behavioral questions and be specific about technologies and outcomes."
                    className="w-full h-36 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                    rows={8}
                  ></textarea>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-white/60">Word count: 0</div>
                    <button
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700"
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setIsPracticeMode(false)}
                    className="px-6 py-2 bg-white/10 text-white rounded hover:bg-white/20"
                  >
                    End Practice Session
                  </button>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="text-center p-6">
          <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">AI-Powered Feedback</h3>
          <p className="text-white/70 text-sm">Get instant analysis with STAR method scoring and communication assessment.</p>
        </GlassCard>

        <GlassCard className="text-center p-6">
          <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Progress Tracking</h3>
          <p className="text-white/70 text-sm">Monitor improvement over time with detailed analytics and session history.</p>
        </GlassCard>

        <GlassCard className="text-center p-6">
          <Book className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">Expert Resources</h3>
          <p className="text-white/70 text-sm">Access curated learning materials and external resources for skill development.</p>
        </GlassCard>
      </div>
    </div>
  )
}
