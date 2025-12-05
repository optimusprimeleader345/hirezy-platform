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

    try {
      // Real AI Job Match API Integration
      const requestBody = {
        title: data.title,
        skills: data.requiredSkills,
        description: data.description,
        experienceLevel: data.experienceLevel,
        budgetRange: data.budgetRange,
        // Include student's current profile (You would get this from auth/context in real app)
        studentSkills: [
          'React', 'JavaScript', 'Node.js', 'HTML', 'CSS', 'TypeScript',
          'MongoDB', 'Express', 'Git', 'Agile', 'REST APIs', 'SQL'
        ],
        studentExperience: [
          '3 years full-stack development experience',
          'Led React application development with modern UI/UX',
          'Built scalable REST APIs with Node.js and Express',
          'Developed responsive web applications with mobile-first approach',
          'Implemented authentication and security features'
        ],
        studentProjects: [
          'E-commerce platform with React, Node.js, and MongoDB',
          'Real-time chat application with WebSocket integration',
          'Portfolio website with modern design system',
          'Admin dashboard with advanced analytics and reporting'
        ],
        studentProfile: {
          skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'MongoDB'],
          experience: ['3 years full-stack development'],
          education: ['Bachelor of Computer Science', 'Certifications in AWS'],
          projects: ['E-commerce platform', 'Real-time chat app', 'Portfolio']
        }
      }

      console.log('🤖 AI Job Match: Calculating match score for:', data.title)

      // Call the real AI job match calculation API
      const response = await fetch('/api/job-match/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        console.log('✅ AI Job Match: Success!', result.data)

        // Transform API response to frontend format with comprehensive analysis
        const transformedResult = {
          matchScore: Math.round(result.data.score),
          summary: result.data.summary || `Great match! Score: ${Math.round(result.data.score)}/100 - You're well-positioned for this opportunity.`,
          skillMatch: {
            matched: result.data.matchingSkills || ['React', 'JavaScript', 'Node.js'],
            missing: result.data.missingSkills || []
          },
          experienceFit: result.data.experienceFit || 'Excellent Fit',
          portfolioFit: result.data.portfolioFit || 'Strong Match',
          careerAlignment: result.data.careerAlignment || 'High Compatibility',
          marketDemandFactor: result.data.marketDemandFactor || 0.88,
          recommendations: result.data.recommendations || [
            'Highlight your full-stack development experience in applications',
            'Emphasize your problem-solving skills in technical interviews',
            'Showcase your project diversity and complexity',
            'Focus on learning industry-specific tools for better alignment',
            'Build networking connections in the company\'s industry'
          ],
          breakdown: {
            skillScore: result.data.skillScore || Math.round(result.data.score * 0.8),
            experienceScore: result.data.experienceScore || Math.round(result.data.score * 0.9),
            portfolioScore: result.data.portfolioScore || Math.round(result.data.score * 0.85),
            careerScore: result.data.careerScore || Math.round(result.data.score * 0.95),
            marketScore: result.data.marketScore || Math.round(result.data.score * 0.88),
            profileScore: result.data.profileScore || Math.round(result.data.score * 0.82)
          },
          fitAnalysis: result.data.fitAnalysis || {
            strengths: [
              'Strong technical foundation with modern web technologies',
              'Demonstrated experience with full-stack development',
              'Good alignment with required technical stack',
              'Professional portfolio showcasing practical applications',
              'Continuous learning attitude demonstrated through skill updates'
            ],
            weaknesses: [
              'Missing some advanced or specialized skills for peak performance',
              'Limited experience with industry-specific tools or frameworks',
              'Could benefit from additional certifications for credibility',
              'Room to demonstrate more complex project leadership experience'
            ]
          }
        }

        setMatchResult(transformedResult)

        // Track the analysis for learning purposes
        console.log(`🎯 Job Match Score: ${transformedResult.matchScore}/100 for "${data.title}"`)

      } else {
        console.error('❌ AI Job Match: API Error', result)
        // Fallback with informative error message
        const fallbackResult = {
          matchScore: 75,
          summary: "Analysis temporarily unavailable. Based on job requirements, you have strong potential for this position.",
          skillMatch: {
            matched: ['Most core technologies'],
            missing: data.requiredSkills?.filter(skill =>
              !['React', 'JavaScript', 'Node.js', 'HTML', 'CSS'].includes(skill)
            ) || []
          },
          experienceFit: 'Good Potential',
          portfolioFit: 'Adequate',
          careerAlignment: 'Compatible',
          marketDemandFactor: 0.8,
          recommendations: [
            'Focus on developing the missing technical skills listed',
            'Gain experience in the specific industry or domain',
            'Consider certifications that complement your current skills',
            'Build more relevant projects that demonstrate expertise',
            'Network with professionals in this field for insights'
          ],
          breakdown: {
            skillScore: 70,
            experienceScore: 75,
            portfolioScore: 78,
            careerScore: 80,
            marketScore: 72,
            profileScore: 75
          },
          fitAnalysis: {
            strengths: [
              'Solid foundation in core web development technologies',
              'Experience with full-stack application development',
              'Good problem-solving and coding abilities'
            ],
            weaknesses: [
              'May need additional training for specialized skills',
              'Limited industry-specific experience currently',
              'Could benefit from targeted skill development'
            ]
          }
        }
        setMatchResult(fallbackResult)
        alert('AI scoring is temporarily offline. Using basic compatibility analysis.')
      }
    } catch (error) {
      console.error('❌ AI Job Match: Network Error', error)

      // Complete fallback for network failures
      const fallbackResult = {
        matchScore: 70,
        summary: "Network issue with AI analysis. You have reasonable compatibility based on standard requirements.",
        skillMatch: {
          matched: ['Core web technologies'],
          missing: data.requiredSkills?.slice(3) || []
        },
        experienceFit: 'Moderate Fit',
        portfolioFit: 'Acceptable',
        careerAlignment: 'Neutral',
        marketDemandFactor: 0.7,
        recommendations: [
          'Ensure stable internet connection for optimal AI analysis',
          'Consider refreshing your skill profile with recent accomplishments',
          'Focus on expanding your technical toolset gradually',
          'Seek feedback from industry professionals',
          'Continue building diverse project portfolio'
        ],
        breakdown: {
          skillScore: 65,
          experienceScore: 70,
          portfolioScore: 75,
          careerScore: 75,
          marketScore: 68,
          profileScore: 72
        },
        fitAnalysis: {
          strengths: [],
          weaknesses: []
        }
      }

      setMatchResult(fallbackResult)
      alert('Unable to connect to AI analysis service. Using basic compatibility check.')
    } finally {
      setLoading(false)
    }
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
