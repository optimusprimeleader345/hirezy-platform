'use client'

import { Suspense, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, TrendingUp, DollarSign, Book, Clock, Users, Compass } from 'lucide-react'
import { IndustryComparison } from '@/components/career-path/IndustryComparison'
import { CareerReadinessScore } from '@/components/career-path/CareerReadinessScore'
import { NetworkingOpportunities } from '@/components/career-path/NetworkingOpportunities'
import { SuccessStories } from '@/components/career-path/SuccessStories'

export default function CareerPathAIPage() {
  const [careerGoals, setCareerGoals] = useState<any>(null)
  const [careerAnalysis, setCareerAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleGoalsUpdate = (goals: any) => {
    setCareerGoals(goals)
  }

  const analyzeCareerPath = async () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setCareerAnalysis({
        bestFitRoles: ["Frontend Developer", "Fullstack Developer", "React Specialist"],
        salaryRange: "6 LPA – 18 LPA",
        industryDemand: "High",
        futureGrowth: "Strong",
        coreSkillsNeeded: ["React", "Node.js", "APIs", "Git", "JavaScript", "TypeScript"],
        missingSkills: ["Testing", "CI/CD", "System Design", "Database Design"],
        difficultyLevel: "Medium",
        aiSummary: "Based on your skills and goals, frontend and fullstack development are excellent matches. The demand for these roles is very high, with strong growth expected over the next 5-10 years. You'll need to focus on advanced JavaScript concepts and system design."
      })
      setIsAnalyzing(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Compass className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Career Path AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Discover your optimal career trajectory with AI-powered analysis of market trends,
            salary projections, skill requirements, and personalized development roadmaps.
          </p>
        </div>
      </GlassCard>

      {/* Career Goals Input */}
      <GlassCard>
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-purple-400 mr-3" />
            <h2 className="text-xl font-bold text-white">Define Your Career Goals</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-white font-medium text-sm mb-2 block">Primary Career Goal</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">
                <option value="">Select a goal...</option>
                <option value="web-dev">Web Development</option>
                <option value="ml">Machine Learning/AI</option>
                <option value="cloud">Cloud Engineering</option>
                <option value="data">Data Science & Analytics</option>
                <option value="backend">Backend Development</option>
                <option value="ui-ux">UI/UX Design</option>
              </select>
            </div>

            <div>
              <label className="text-white font-medium text-sm mb-2 block">Describe Your Career Goal</label>
              <textarea
                placeholder="E.g., I want to become a senior fullstack developer working on scalable web applications..."
                className="w-full h-24 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-white font-medium text-sm mb-2 block">Experience Level</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
              </select>
            </div>

            <div className="text-center pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700">
                Save Career Goals
              </button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Analyze Button */}
      {careerGoals && (
        <div className="flex justify-center">
          <button
            onClick={analyzeCareerPath}
            disabled={isAnalyzing}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Career Path...
              </>
            ) : (
              <>
                <Compass className="w-5 h-5 mr-2" />
                Generate AI Career Plan
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Results */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {careerAnalysis && (
          <>
            {/* Career Readiness Dashboard */}
            <CareerReadinessScore />

            {/* Career Fit Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Best Fit Roles */}
              <GlassCard title="Best-Fit Career Roles">
                <div className="space-y-4">
                  {careerAnalysis.bestFitRoles.map((role: string, index: number) => (
                    <div key={role} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-600/20 text-purple-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium">{role}</div>
                          <div className="text-white/60 text-xs">Perfect match for your profile</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm font-medium">High Match</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Salary Insights */}
              <GlassCard title="Salary Intelligence">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {careerAnalysis.salaryRange}
                    </div>
                    <div className="text-white/70 text-sm">Perfect career match salaries</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white/60 text-sm">Junior Level</span>
                      <span className="text-white font-medium">₹6-8 LPA</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white/60 text-sm">Mid-Level</span>
                      <span className="text-white font-medium">₹12-15 LPA</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                      <span className="text-white/60 text-sm">Senior Level</span>
                      <span className="text-white font-medium">₹18-25 LPA</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Industry Comparison */}
            <IndustryComparison />

            {/* Market Trends */}
            <GlassCard title="Market Demand & Trends">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    {careerAnalysis.industryDemand === 'High' ? '🔥' : careerAnalysis.industryDemand === 'Medium' ? '📈' : '📊'}
                  </div>
                  <div className="text-white font-semibold mb-1">Demand Level</div>
                  <div className="text-white/70 text-sm">{careerAnalysis.industryDemand}</div>
                </div>

                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">📈</div>
                  <div className="text-white font-semibold mb-1">Growth Rate</div>
                  <div className="text-green-400 font-medium">{careerAnalysis.futureGrowth}</div>
                </div>

                <div className="text-center p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">🎯</div>
                  <div className="text-white font-semibold mb-1">Difficulty</div>
                  <div className="text-yellow-400 font-medium">{careerAnalysis.difficultyLevel}</div>
                </div>
              </div>
            </GlassCard>

            {/* Skills Analysis */}
            <GlassCard title="Required Skills & Gaps">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <span className="w-5 h-5 bg-green-400 rounded-full mr-2"></span>
                    Core Skills Needed
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {careerAnalysis.coreSkillsNeeded.map((skill: string) => (
                      <span key={skill} className="px-3 py-2 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <span className="w-5 h-5 bg-yellow-400 rounded-full mr-2"></span>
                    Skills to Develop
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {careerAnalysis.missingSkills.map((skill: string) => (
                      <span key={skill} className="px-3 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm border border-yellow-500/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Career Development */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Career Roadmap */}
              <GlassCard title="Career Roadmap (Step-by-Step Journey)">
                <div className="space-y-6">
                  <div className="text-center">
                    <Book className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Your Personalized Development Plan</h3>
                    <p className="text-white/70 text-sm">
                      Structured learning pathway to achieve your career goals
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      'Phase 1: Master Fundamentals (3-6 months) - Build strong foundations in core technologies',
                      'Phase 2: Gain Practical Experience (6-12 months) - Create portfolio projects and contribute to open source',
                      'Phase 3: Specialize & Advance (12-24 months) - Focus on advanced topics and leadership skills',
                      'Phase 4: Career Acceleration (24+ months) - Network, interview prep, and senior-level opportunities'
                    ].map((phase, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-purple-600/20 border border-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-400 font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1 pb-4 border-l border-purple-400/30 pl-4 ml-5">
                          <p className="text-white/90">{phase}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Evolution Timeline */}
              <GlassCard title="Career Evolution Timeline">
                <div className="space-y-6">
                  <div className="text-center">
                    <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Career Progression Ladder</h3>
                    <p className="text-white/70 text-sm">
                      Typical career progression based on your goals and skills
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { level: 'Entry Level', title: 'Junior Developer', salary: '4-6 LPA', time: '0-1 year', skills: 'Basics, HTML/CSS/JS' },
                      { level: 'Mid Level', title: 'Mid-Level Developer', salary: '8-12 LPA', time: '2-4 years', skills: 'React, APIs, Testing' },
                      { level: 'Senior Level', title: 'Senior Developer', salary: '12-18 LPA', time: '4-6 years', skills: 'System Design, Leadership' },
                      { level: 'Expert Level', title: 'Technical Lead', salary: '18-25 LPA', time: '6+ years', skills: 'Architecture, Strategy' }
                    ].map((level, index) => (
                      <div key={index} className="relative">
                        {index < 3 && (
                          <div className="absolute left-6 top-16 w-0.5 h-16 bg-white/20"></div>
                        )}
                        <div className="flex items-start space-x-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-400' : 'bg-purple-400'} mt-2`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-white font-semibold">{level.title}</h4>
                              <span className="text-purple-400 text-sm">{level.time}</span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/70 text-sm">{level.level}</span>
                              <span className="text-green-400 font-medium text-sm">{level.salary}</span>
                            </div>
                            <div className="text-white/60 text-sm">
                              Key skills: {level.skills}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Professional Networking */}
            <NetworkingOpportunities />

            {/* Real Success Stories */}
            <SuccessStories />

            {/* AI Summary */}
            <GlassCard className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30">
              <div className="flex items-start">
                <Target className="w-12 h-12 text-purple-400 mr-6 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4">AI Career Guidance Summary</h3>
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {careerAnalysis.aiSummary}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700">
                      📋 Follow This Career Plan
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700">
                      🎓 Explore Courses
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700">
                      🤝 Find Networking Events
                    </button>
                    <button className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-lg">
                      💼 Find Jobs
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </>
        )}

        {/* Empty State */}
        {!careerAnalysis && (
          <GlassCard className="text-center py-16">
            <Compass className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Define Your Career Goals</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Tell us about your skills, experience, and career aspirations above, and our AI will generate
              a personalized career development plan with salary projections, market trends, and a
              step-by-step roadmap to achieve your professional goals.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  )
}
