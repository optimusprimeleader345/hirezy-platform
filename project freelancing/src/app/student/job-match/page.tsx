'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Target, Award, TrendingUp, Users, Building2, Briefcase } from 'lucide-react'
import { JobInput } from '@/components/job-match/JobInput'
import { MatchScoreCard } from '@/components/job-match/MatchScoreCard'
import type { JobData } from '@/components/job-match/JobInput'

export default function JobMatchPage() {
  const [jobData, setJobData] = useState<JobData | null>(null)
  const [matchResult, setMatchResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (data: JobData) => {
    setLoading(true)
    setJobData(data)

    // Simulate API call with mock data
    setTimeout(() => {
      const mockResult = {
        matchScore: 82,
        summary: "Strong match! You have most of the required skills with good experience level.",
        skillMatch: {
          matched: ['React', 'Node.js', 'HTML', 'CSS'],
          missing: ['TypeScript', 'Docker']
        },
        experienceFit: 'Good Fit',
        portfolioFit: 'Strong',
        careerAlignment: 'High',
        marketDemandFactor: 0.85,
        recommendations: [
          'Learn TypeScript to improve your fit for similar gigs',
          'Add Docker to your infrastructure skills',
          'Build a project demonstrating full-stack capabilities',
          'Create detailed GitHub repositories with READMEs',
          'Obtain AWS Certified Cloud Practitioner certification'
        ],
        breakdown: {
          skillScore: 75,
          experienceScore: 82,
          portfolioScore: 85,
          careerScore: 90,
          marketScore: 88,
          profileScore: 78
        },
        fitAnalysis: {
          strengths: [
            'Strong foundation in core frontend technologies (React, HTML, CSS)',
            'Relevant experience with backend technologies (Node.js, Express)',
            'Solid portfolio demonstrating practical application of skills',
            'Good alignment with full-stack career objectives'
          ],
          weaknesses: [
            'Missing type safety implementation with TypeScript',
            'Limited containerization and DevOps experience (Docker)',
            'Could benefit from cloud platform expertise (AWS/Azure)',
            'Room for improvement in advanced database optimization'
          ]
        }
      }
      setMatchResult(mockResult)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Target className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Job-Match Scoring AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Get instant AI-powered job matching scores based on your complete profile,
            skills, experience, and career goals. Like LinkedIn's "Top Applicant" algorithm.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🤖 AI Scoring Algorithm
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🔧 Multi-Factor Analysis
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📊 Career Insights
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Job Input Section */}
      <JobInput onAnalyze={handleAnalyze} loading={loading} />

      {/* Results Section */}
      {matchResult && (
        <div className="space-y-8">
          {/* Score Card */}
          <div className="flex justify-center">
            <div className="max-w-md">
              <MatchScoreCard
                matchScore={matchResult.matchScore}
                summary={matchResult.summary}
                breakdown={matchResult.breakdown}
              />
            </div>
          </div>

          {/* Detailed Analysis Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Skills Alignment */}
              <GlassCard title="Skills Alignment">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Matched Skills ({matchResult.skillMatch.matched.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.skillMatch.matched.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-red-400 font-medium mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Missing Skills ({matchResult.skillMatch.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {matchResult.skillMatch.missing.map((skill: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Match Breakdown */}
              <GlassCard title="Match Breakdown">
                <div className="space-y-4">
                  {[
                    { label: 'Skills Fit', score: matchResult.breakdown.skillScore, icon: TrendingUp },
                    { label: 'Experience Level', score: matchResult.breakdown.experienceScore, icon: Users },
                    { label: 'Portfolio Quality', score: matchResult.breakdown.portfolioScore, icon: Building2 },
                    { label: 'Career Alignment', score: matchResult.breakdown.careerScore, icon: Briefcase }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <item.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      <span className="text-white/70 flex-1">{item.label}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* AI Recommendations */}
              <GlassCard title="AI Recommendations">
                <div className="space-y-3">
                  {matchResult.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/70 text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Fit Analysis */}
              <GlassCard title="Why This Gig Fits You">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {matchResult.fitAnalysis.strengths.map((strength: string, i: number) => (
                        <li key={i} className="text-white/70 text-sm">• {strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Areas to Improve</h4>
                    <ul className="space-y-1">
                      {matchResult.fitAnalysis.weaknesses.map((weakness: string, i: number) => (
                        <li key={i} className="text-white/70 text-sm">• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              {/* Action Section */}
              <GlassCard title="Improve Your Match Score">
                <div className="space-y-4">
                  <p className="text-white/70 text-sm">
                    Current score: {matchResult.matchScore}/100. Focus on learning TypeScript and Docker to increase your score to 90+.
                  </p>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700">
                    Learn Recommended Skills
                  </button>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
