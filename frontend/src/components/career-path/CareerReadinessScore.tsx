'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Trophy, Target, Briefcase, Users, Award, Star } from 'lucide-react'

export function CareerReadinessScore() {
  const readinessFactors = [
    {
      category: 'Technical Skills',
      score: 78,
      weight: 40,
      status: 'Strong',
      description: 'Your technical foundation is solid with room for specialized skills'
    },
    {
      category: 'Professional Experience',
      score: 65,
      weight: 25,
      status: 'Developing',
      description: 'Build more hands-on projects and consider internships'
    },
    {
      category: 'Career Goals Clarity',
      score: 85,
      weight: 10,
      status: 'Excellent',
      description: 'Clear understanding of desired career trajectory'
    },
    {
      category: 'Market Awareness',
      score: 72,
      weight: 10,
      status: 'Good',
      description: 'Understanding of industry trends and job market dynamics'
    },
    {
      category: 'Networking & Presence',
      score: 45,
      weight: 15,
      status: 'Needs Work',
      description: 'Build your professional network and online presence'
    }
  ]

  const overallScore = Math.round(
    readinessFactors.reduce((total, factor) => total + (factor.score * factor.weight / 100), 0)
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 65) return 'text-yellow-400'
    if (score >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-400 border-green-400/30'
      case 'Strong': return 'text-green-400 border-green-400/30'
      case 'Good': return 'text-yellow-400 border-yellow-400/30'
      case 'Developing': return 'text-yellow-400 border-yellow-400/30'
      case 'Needs Work': return 'text-red-400 border-red-400/30'
      default: return 'text-white/70 border-white/30'
    }
  }

  return (
    <GlassCard title="Career Readiness Assessment">
      <div className="space-y-6">
        <div className="text-center">
          <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Professional Preparedness Score</h3>
          <p className="text-white/70 text-sm">
            Comprehensive evaluation of your career readiness across key dimensions
          </p>
        </div>

        {/* Overall Score */}
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#readiness)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: `${2 * Math.PI * 50}`,
                  strokeDashoffset: `${2 * Math.PI * 50 * (1 - overallScore / 100)}`
                }}
              />
              <defs>
                <linearGradient id="readiness" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}
                </div>
                <div className="text-xs text-white/60">Readiness</div>
              </div>
            </div>
          </div>

          <div className={`text-lg font-bold ${getScoreColor(overallScore)} mb-2`}>
            {overallScore >= 80 ? 'Highly Prepared' :
             overallScore >= 65 ? 'Well Prepared' :
             overallScore >= 50 ? 'Moderately Prepared' :
             'Needs Advancement'}
          </div>

          <p className="text-white/60 text-sm max-w-md mx-auto">
            Your overall career readiness score considers technical skills, experience,
            professional development, and industry awareness.
          </p>
        </div>

        {/* Readiness Factors */}
        <div className="space-y-4">
          {readinessFactors.map((factor) => (
            <div key={factor.category} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold">{factor.category}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">{factor.score}/100</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(factor.status)}`}>
                    {factor.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/70">Weight:</span>
                  <span className="text-white font-medium">{factor.weight}%</span>
                </div>

                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getScoreColor(factor.score)}`}
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>

                <p className="text-white/60 text-sm">{factor.description}</p>

                {factor.score < 65 && (
                  <div className="mt-2 text-yellow-400 text-xs">
                    💡 <strong>Priority Improvement:</strong> Focus here for biggest impact on career readiness
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-lg p-4">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-400" />
            Recommended Next Steps
          </h4>
          <div className="space-y-3">
            {overallScore < 50 && (
              <div className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-white/80 text-sm">Urgent: Build technical skills portfolio and gain hands-on experience</p>
              </div>
            )}
            {overallScore < 70 && (
              <div className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-white/80 text-sm">Complete specialized certifications and increase professional networking</p>
              </div>
            )}
            {overallScore >= 70 && (
              <div className="flex items-start space-x-3">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-white/80 text-sm">Ready to apply! Focus on job search strategy and personal branding</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
