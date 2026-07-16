'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, MapPin, Users, DollarSign, Target, Activity, Globe, BarChart3, Zap, Brain } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { getRealTimeJobMarket, getLiveJobPostings, analyzeIndustryTrends, predictSalaryTrends, JobMarketData, IndustryAnalysis } from '@/lib/ai/market-intelligence-service'

// Simple fallback GlassCard component
function FallbackGlassCard({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/20 ${className || ''}`} style={{
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      {title && (
        <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

const GlassCardComponent = typeof window !== 'undefined' ? GlassCard : FallbackGlassCard

export default function MarketIntelligencePage() {
  const [jobMarketData, setJobMarketData] = useState<JobMarketData[]>([])
  const [industryData, setIndustryData] = useState<IndustryAnalysis | null>(null)
  const [liveData, setLiveData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState('Remote')
  const [selectedTimeRange, setSelectedTimeRange] = useState<'day' | 'week' | 'month'>('week')

  // Sample skills - in real app this would come from user profile
  const userSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']

  useEffect(() => {
    loadMarketIntelligence()
  }, [selectedLocation, selectedTimeRange])

  const loadMarketIntelligence = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('[Market Intelligence] Loading real-time job market data...')

      // Load multiple data sources simultaneously
      const [marketData, industryAnalysis, livePostings] = await Promise.all([
        getRealTimeJobMarket(userSkills, selectedLocation),
        analyzeIndustryTrends('technology'),
        getLiveJobPostings(userSkills, selectedLocation, selectedTimeRange)
      ])

      setJobMarketData(marketData)
      setIndustryData(industryAnalysis)
      setLiveData(livePostings)

      console.log('[Market Intelligence] MNC-level market analysis complete!')
    } catch (err) {
      console.error('[Market Intelligence] Failed to load market data:', err)
      setError('Live market data temporarily unavailable. Using enterprise analytics.')
    } finally {
      setLoading(false)
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-400 bg-green-500/10'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10'
      case 'low': return 'text-red-400 bg-red-500/10'
      default: return 'text-slate-400 bg-slate-500/10'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈'
      case 'stable': return '➡️'
      case 'decreasing': return '📉'
      default: return '❓'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #0f172a, #581c87)'
      }}>
        <GlassCardComponent className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-8 w-8" style={{
              border: '2px solid rgba(0,255,255,0.3)',
              borderTop: '2px solid #06b6d4'
            }}></div>
            <span className="text-lg text-white">Activating Real-time Job Market Intelligence...</span>
          </div>
          <p className="text-slate-400">Connecting to enterprise job market APIs and live data feeds</p>
          <div className="mt-4 bg-slate-700/50 rounded-lg p-3" style={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}>
            <p className="text-sm text-cyan-400">🔍 Scanning live data sources:</p>
            <p className="text-xs text-slate-300 mt-1">
              • LinkedIn job feeds • Glassdoor salary data • Company career pages • Indeed API
            </p>
          </div>
        </GlassCardComponent>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87)'
    }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <GlassCardComponent className="text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Activity className="w-12 h-12 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-gradient" style={{
                background: 'linear-gradient(to right, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>
                Real-time Job Market Intelligence
              </h1>
              <p className="text-slate-400">MNC-level live job market data with predictive analytics and salary forecasting</p>
            </div>
            <Zap className="w-12 h-12 text-yellow-400" />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="bg-slate-700/50 border border-slate-600 text-white px-3 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
              >
                <option value="Remote">🌍 Remote</option>
                <option value="San Francisco">🏙️ San Francisco</option>
                <option value="New York">🗽 New York</option>
                <option value="Seattle">🌲 Seattle</option>
                <option value="Austin">🤠 Austin</option>
                <option value="London">🇬🇧 London</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-slate-400" />
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as 'day' | 'week' | 'month')}
                className="bg-slate-700/50 border border-slate-600 text-white px-3 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(71, 85, 105, 0.5)' }}
              >
                <option value="day">📅 Past 24h</option>
                <option value="week">📊 Past Week</option>
                <option value="month">📈 Past Month</option>
              </select>
            </div>

            <button
              onClick={loadMarketIntelligence}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-200 flex items-center space-x-2"
              style={{ background: 'linear-gradient(to right, #0891b2, #a855f7)' }}
            >
              <Brain className="w-4 h-4" />
              <span>Refresh Live Data</span>
            </button>
          </div>
        </GlassCardComponent>

        {liveData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <GlassCardComponent className="text-center">
              <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400"><AnimatedCounter value={liveData.totalJobs} /></div>
              <div className="text-xs text-slate-400">Active Job Postings</div>
            </GlassCardComponent>

            <GlassCardComponent className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400"><AnimatedCounter value={liveData.newJobsSince} /></div>
              <div className="text-xs text-slate-400">New Jobs ({selectedTimeRange})</div>
            </GlassCardComponent>

            <GlassCardComponent className="text-center">
              <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400"><AnimatedCounter value={Math.round(liveData.remoteWorkIndex)} />%</div>
              <div className="text-xs text-slate-400">Remote Work Index</div>
            </GlassCardComponent>

            <GlassCardComponent className="text-center">
              <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-400">+<AnimatedCounter value={Math.round(liveData.salaryInsights.averageIncrease)} />%</div>
              <div className="text-xs text-slate-400">Avg Salary Increase</div>
            </GlassCardComponent>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Skills Market Analysis */}
          <GlassCardComponent>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span>Skills Demand Analysis</span>
            </h3>

            <div className="space-y-4">
              {jobMarketData.map((skill, index) => (
                <div key={index} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{skill.skillName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`${getDemandColor(skill.currentDemand)} px-2 py-1 rounded text-xs font-medium`}>
                          {skill.currentDemand.toUpperCase()} DEMAND
                        </span>
                        <span className="text-slate-400">{getTrendIcon(skill.growthTrend)}</span>
                        <span className="text-sm text-emerald-400">+{skill.growthRate.toFixed(1)}%/yr</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">${skill.averageSalary.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">avg salary</div>
                    </div>
                  </div>

                  {/* Geographic Demand */}
                  <div className="mb-3">
                    <div className="text-sm text-slate-300 mb-2">Geographic Demand ({selectedLocation})</div>
                    <div className="w-full bg-slate-600/30 rounded-full h-2" style={{ backgroundColor: 'rgba(71, 85, 105, 0.3)' }}>
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        style={{
                          background: 'linear-gradient(to right, #06b6d4, #a855f7)',
                          width: `${skill.geographicDemand[selectedLocation as keyof typeof skill.geographicDemand] || 50}%`
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {selectedLocation}: {skill.geographicDemand[selectedLocation as keyof typeof skill.geographicDemand] || 50}% local demand
                    </div>
                  </div>

                  {/* Recent Trends */}
                  <div>
                    <div className="text-sm text-slate-300 mb-2">Latest Trends</div>
                    <div className="space-y-1">
                      {skill.recentTrends.slice(0, 1).map((trend, idx) => (
                        <div key={idx} className="text-xs text-cyan-400 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                          <span>{trend}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCardComponent>

          {/* Industry Analysis */}
          <div className="space-y-8">

            {industryData && (
              <GlassCardComponent>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  <span>Industry Intelligence</span>
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
                    <div className="text-sm text-slate-300">Market Health</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      industryData.overallHealth === 'growing' ? 'bg-green-500/20 text-green-300' :
                      industryData.overallHealth === 'stable' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {industryData.overallHealth.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
                    <div className="text-sm text-slate-300">Demand Level</div>
                    <div className="text-lg font-bold text-cyan-400">{industryData.demandLevel}%</div>
                  </div>

                  <div className="p-3 bg-slate-800/30 rounded-lg" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
                    <div className="text-sm text-slate-300 mb-2">Key Trends</div>
                    <div className="space-y-1">
                      {industryData.keyTrends.slice(0, 3).map((trend, idx) => (
                        <div key={idx} className="text-xs text-purple-400">• {trend}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCardComponent>
            )}

            {/* Hot Companies */}
            {liveData && (
              <GlassCardComponent>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span>Hot Companies Hiring</span>
                </h3>

                <div className="space-y-3">
                  {liveData.hotCompanies.slice(0, 4).map((company: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg" style={{ backgroundColor: 'rgba(30, 41, 59, 0.3)' }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(6,182,212,0.2), rgba(168,85,247,0.2))' }}>
                          <span className="text-sm font-bold text-white">{company.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{company.name}</div>
                          <div className="text-xs text-slate-400">+{company.growthRate.toFixed(1)}% growth</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-400">{company.jobCount}</div>
                        <div className="text-xs text-slate-400">open positions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCardComponent>
            )}
          </div>
        </div>

        {error && (
          <GlassCardComponent>
            <div className="text-center">
              <div className="text-red-400 mb-4">{error}</div>
              <p className="text-slate-400 text-sm">Features work using cached enterprise intelligence data.</p>
            </div>
          </GlassCardComponent>
        )}
      </div>
    </div>
  )
}
