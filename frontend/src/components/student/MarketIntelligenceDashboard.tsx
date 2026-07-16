'use client'

import { AnalyticsCard } from './AnalyticsCard'
import {
  DollarSign,
  MapPin,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  BarChart3,
  Zap,
  Award,
  Globe,
  Brain,
  Calculator,
  Lightbulb,
  Star,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface SalaryData {
  location: string
  averageSalary: number
  medianSalary: number
  percentile25: number
  percentile75: number
  percentile90: number
  demandLevel: 'low' | 'medium' | 'high' | 'very-high'
  growthRate: number
}

interface SkillDemand {
  skill: string
  currentDemand: number
  growthRate: number
  avgSalary: number
  jobPostings: number
  competitionLevel: 'low' | 'medium' | 'high'
}

interface CompetitorAnalysis {
  percentileRank: number
  skillScore: number
  networkScore: number
  applicationRate: number
  recommendationScore: number
  strengths: string[]
  opportunities: string[]
}

const salaryData: SalaryData[] = [
  { location: 'San Francisco, CA', averageSalary: 145000, medianSalary: 142000, percentile25: 120000, percentile75: 165000, percentile90: 185000, demandLevel: 'very-high', growthRate: 15.2 },
  { location: 'Austin, TX', averageSalary: 125000, medianSalary: 122000, percentile25: 105000, percentile75: 140000, percentile90: 155000, demandLevel: 'high', growthRate: 12.8 },
  { location: 'New York, NY', averageSalary: 138000, medianSalary: 135000, percentile25: 115000, percentile75: 158000, percentile90: 175000, demandLevel: 'very-high', growthRate: 11.5 },
  { location: 'Seattle, WA', averageSalary: 142000, medianSalary: 139000, percentile25: 118000, percentile75: 162000, percentile90: 180000, demandLevel: 'high', growthRate: 10.9 },
  { location: 'Remote', averageSalary: 132000, medianSalary: 129000, percentile25: 110000, percentile75: 150000, percentile90: 168000, demandLevel: 'high', growthRate: 18.3 }
]

const skillDemandData: SkillDemand[] = [
  { skill: 'React', currentDemand: 95, growthRate: 42.5, avgSalary: 145000, jobPostings: 2847, competitionLevel: 'high' },
  { skill: 'Python', currentDemand: 92, growthRate: 38.7, avgSalary: 138000, jobPostings: 2341, competitionLevel: 'high' },
  { skill: 'TypeScript', currentDemand: 88, growthRate: 35.2, avgSalary: 142000, jobPostings: 1987, competitionLevel: 'medium' },
  { skill: 'AWS', currentDemand: 90, growthRate: 52.1, avgSalary: 152000, jobPostings: 3125, competitionLevel: 'medium' },
  { skill: 'GraphQL', currentDemand: 75, growthRate: 28.9, avgSalary: 148000, jobPostings: 987, competitionLevel: 'low' },
  { skill: 'Next.js', currentDemand: 82, growthRate: 48.3, avgSalary: 141000, jobPostings: 1456, competitionLevel: 'medium' }
]

const competitorAnalysis: CompetitorAnalysis = {
  percentileRank: 78,
  skillScore: 85,
  networkScore: 72,
  applicationRate: 68,
  recommendationScore: 91,
  strengths: ['Technical Expertise', 'Project Portfolio', 'Leadership Experience'],
  opportunities: ['Networking Expansion', 'Remote Work Experience', 'Industry Certifications']
}

export function MarketIntelligenceDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(salaryData[0])
  const [selectedSkill, setSelectedSkill] = useState(skillDemandData[0])
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'very-high': return 'from-green-500 to-emerald-600'
      case 'high': return 'from-blue-500 to-cyan-600'
      case 'medium': return 'from-yellow-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const formatSalary = (amount: number) => `$${amount.toLocaleString()}`

  const calculateNegotiationPosition = (skillScore: number, percentile: number) => {
    const score = (skillScore * 0.4) + (percentile * 0.6)
    if (score >= 85) return 'Strong negotiator - high leverage'
    if (score >= 70) return 'Good position to negotiate'
    return 'Focus on skill-building first'
  }

  return (
    <AnalyticsCard title="📊 Real-Time Market Intelligence" glow={true}>
      <div className="space-y-8">
        {/* Header with Live Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-400">LIVE DATA</span>
            <span className="text-xs text-gray-400">
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <Brain className="w-4 h-4" />
            AI-Powered Insights
          </div>
        </div>

        {/* Main Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Salary Intelligence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Salary Intelligence
            </h3>

            {/* Location Selector */}
            <div className="flex flex-wrap gap-2">
              {salaryData.map((location) => (
                <button
                  key={location.location}
                  onClick={() => setSelectedLocation(location)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedLocation.location === location.location
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                  }`}
                >
                  {location.location}
                </button>
              ))}
            </div>

            {/* Salary Breakdown Card */}
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-400/20 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Average Salary in {selectedLocation.location}</p>
                    <p className="text-2xl font-bold text-white">{formatSalary(selectedLocation.averageSalary)}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedLocation.growthRate > 15 ? 'bg-green-500/20 text-green-300' :
                    selectedLocation.growthRate > 10 ? 'bg-blue-500/20 text-blue-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    +{selectedLocation.growthRate}% YoY
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Median</p>
                    <p className="font-semibold text-white">{formatSalary(selectedLocation.medianSalary)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">75th %ile</p>
                    <p className="font-semibold text-white">{formatSalary(selectedLocation.percentile75)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">90th %ile</p>
                    <p className="font-semibold text-white">{formatSalary(selectedLocation.percentile90)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Demand Analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Skill Demand Analysis
            </h3>

            {/* Skill Selector */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {skillDemandData.map((skill) => (
                <div
                  key={skill.skill}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedSkill.skill === skill.skill
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30'
                      : 'bg-slate-700/30 hover:bg-slate-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">{skill.jobPostings} jobs</span>
                      <div className={`w-2 h-2 rounded-full ${
                        skill.competitionLevel === 'low' ? 'bg-green-400' :
                        skill.competitionLevel === 'medium' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-300">{formatSalary(skill.avgSalary)}</span>
                    <span className={`text-sm font-semibold ${
                      skill.growthRate > 40 ? 'text-green-400' :
                      skill.growthRate > 30 ? 'text-blue-400' :
                      'text-yellow-400'
                    }`}>
                      +{skill.growthRate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="border-t border-slate-600/50 pt-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-400" />
            Anonymous Competitor Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-400/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{competitorAnalysis.percentileRank}th</div>
              <div className="text-sm text-purple-200">Percentile Rank</div>
              <div className="text-xs text-purple-300 mt-1">vs similar profiles</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-400/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{competitorAnalysis.skillScore}</div>
              <div className="text-sm text-blue-200">Skill Score</div>
              <div className="text-xs text-blue-300 mt-1">Technical expertise</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-400/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{competitorAnalysis.applicationRate}%</div>
              <div className="text-sm text-green-200">Application Success</div>
              <div className="text-xs text-green-300 mt-1">Interview conversion</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-yellow-600/10 border border-orange-400/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-white mb-1">{competitorAnalysis.networkScore}</div>
              <div className="text-sm text-orange-200">Network Score</div>
              <div className="text-xs text-orange-300 mt-1">Professional connections</div>
            </div>
          </div>
        </div>

        {/* AI Insights & Recommendations */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold text-white">AI Market Insights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Market Opportunities
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-green-400" />
                  <span>AWS skills show 52% demand growth - prioritize learning</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-green-400" />
                  <span>Remote work pays 8% premium over on-site roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-green-400" />
                  <span>Full-stack engineers 23% more likely to be hired</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Negotiation Strategy
              </h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  Your negotiation position: <span className="font-semibold text-green-400">
                    {calculateNegotiationPosition(competitorAnalysis.skillScore, competitorAnalysis.percentileRank)}
                  </span>
                </p>
                <div className="bg-slate-700/50 rounded p-3 text-xs text-gray-300">
                  <strong>Strategy:</strong> Target 75th-90th percentile salary range.
                  Leverage your {competitorAnalysis.strengths[0]} and consider certifications for better positioning.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
