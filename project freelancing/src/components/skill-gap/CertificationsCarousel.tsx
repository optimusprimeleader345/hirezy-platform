'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Award, ExternalLink, Star } from 'lucide-react'

interface Certification {
  name: string
  provider: string
  level: string
  duration: string
  cost: string
  relevanceScore: number
}

export function CertificationsCarousel() {
  const certifications: Certification[] = [
    {
      name: "AWS Certified Solutions Architect Associate",
      provider: "Amazon",
      level: "Intermediate",
      duration: "1-2 months",
      cost: "$150",
      relevanceScore: 95
    },
    {
      name: "Google Data Analytics Professional Certificate",
      provider: "Google",
      level: "Beginner",
      duration: "3-6 months",
      cost: "$49/month",
      relevanceScore: 88
    },
    {
      name: "Certified Kubernetes Administrator (CKA)",
      provider: "Cloud Native Computing Foundation",
      level: "Advanced",
      duration: "2-3 months",
      cost: "$300",
      relevanceScore: 92
    },
    {
      name: "Microsoft Azure Fundamentals",
      provider: "Microsoft",
      level: "Beginner",
      duration: "1-2 months",
      cost: "Free",
      relevanceScore: 85
    },
    {
      name: "Docker Certified Associate",
      provider: "Docker Inc",
      level: "Intermediate",
      duration: "1-2 months",
      cost: "$195",
      relevanceScore: 89
    },
    {
      name: "Certified Scrum Master (CSM)",
      provider: "Scrum Alliance",
      level: "Intermediate",
      duration: "2 days",
      cost: "$1,395",
      relevanceScore: 78
    }
  ]

  return (
    <GlassCard title="Recommended Certifications">
      <div className="space-y-6">
        <div className="text-center">
          <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Industry-Recognized Certifications</h3>
          <p className="text-white/70 text-sm">
            Add credibility to your resume with these high-impact certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-400/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-semibold text-sm leading-tight">
                  {cert.name}
                </h4>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  cert.level === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                  cert.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {cert.level}
                </span>
              </div>

              <div className="text-xs text-white/60 mb-3">{cert.provider}</div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/70">Duration:</span>
                  <span className="text-white">{cert.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Cost:</span>
                  <span className="text-white">{cert.cost}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Relevance:</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-yellow-400">{cert.relevanceScore}%</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-3 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-xs font-medium transition-colors flex items-center justify-center">
                <ExternalLink className="w-3 h-3 mr-1" />
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/10">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
            🔍 Find More Certifications
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
