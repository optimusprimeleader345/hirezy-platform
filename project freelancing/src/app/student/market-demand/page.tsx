'use client'

import { Suspense, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { TrendingUp, TrendingDown, MapPin, Download, AlertTriangle, Target, BarChart3, Clock } from 'lucide-react'
import { trendingSkills, monthlyTrends, regionalDemand, salaryTrends, opportunityInsights, marketScores } from '@/lib/ai/market-demand/mockData'
import { getPersonalizedAlerts, getSkillBasedRecommendations } from '@/lib/ai/market-demand/mockStudentProfile'

export default function MarketDemandAIPage() {
  const [selectedTimezone, setSelectedTimezone] = useState('daily')
  const [selectedRegion, setSelectedRegion] = useState('bangalore')

  const personalizedAlerts = getPersonalizedAlerts()
  const opportunityRecs = getSkillBasedRecommendations()

  const exportToJSON = () => {
    const data = {
      trendingSkills,
      monthlyTrends,
      regionalDemand,
      salaryTrends,
      personalizedAlerts,
      opportunityRecs,
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `market-demand-insights-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    const headers = ['Skill', 'Category', 'Growth%', 'Jobs', 'Salary', 'Regions', 'Trend']
    const rows = trendingSkills.map(skill =>
      [skill.name, skill.category, skill.growth, skill.jobs, skill.salary, skill.regions.join(', '), skill.trend]
    )

    const csvContent = [headers, ...rows].map(row =>
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `market-demand-skills-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen space-y-16">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <BarChart3 className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Market Demand Intelligence AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Real-time market analysis of skill demand, salary trends, and career opportunities
            across India. Make data-driven decisions for your skill development.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              📊 200K+ Job Postings Analyzed
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🔄 Updates Hourly
            </div>
            <div className="flex items-center px-3 py-1 bg-white/10 rounded-full">
              🏆 India's Most Accurate
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Daily Market Score */}
        <GlassCard title="Daily Demand Score">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {marketScores.daily.score}
              </div>
              <div className="text-white/60 text-sm">Market Index</div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-green-400 mr-1" />
              <span className="text-green-400 text-sm font-medium">{marketScores.daily.change}</span>
            </div>
          </div>
          <div className="text-white/80 text-sm">{marketScores.daily.insights}</div>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: `${marketScores.daily.score}%` }}></div>
          </div>
        </GlassCard>

        {/* Weekly Market Score */}
        <GlassCard title="Weekly Demand Score">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {marketScores.weekly.score}
              </div>
              <div className="text-white/60 text-sm">Market Index</div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-purple-400 mr-1" />
              <span className="text-purple-400 text-sm font-medium">{marketScores.weekly.change}</span>
            </div>
          </div>
          <div className="text-white/80 text-sm">{marketScores.weekly.insights}</div>
          <div className="mt-4 w-full bg-white/10 rounded-full h-2">
            <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${marketScores.weekly.score}%` }}></div>
          </div>
        </GlassCard>
      </div>

      {/* Trending Skills List */}
      <GlassCard title="Top 10 Trending Skills (India)">
        <div className="space-y-4">
          {trendingSkills.map((skill, index) => (
            <div key={skill.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:border-purple-400/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  skill.demand === 'High' ? 'bg-green-500/20 text-green-400' :
                  skill.demand === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold text-white">{skill.name}</div>
                  <div className="text-xs text-white/60">{skill.category} • {skill.jobs.toLocaleString()} jobs</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white/80 text-sm">{skill.salary}</div>
                  <div className="flex items-center text-xs">
                    {skill.trend === 'rising' ? (
                      <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-blue-400 mr-1" />
                    )}
                    +{skill.growth}%
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 max-w-32">
                  {skill.regions.slice(0, 2).map(region => (
                    <span key={region} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs flex items-center">
                      <MapPin className="w-2 h-2 mr-1" />
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Regional Demand Heatmap */}
      <GlassCard title="Regional Demand Heatmap">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">Skill demand intensity by city (India). Darker = Higher Demand</p>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:border-purple-400"
            >
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
              <option value="pune">Pune</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(regionalDemand[selectedRegion as keyof typeof regionalDemand]).map(([skill, demand]) => (
              <div key={skill} className="text-center">
                <div
                  className="w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold mb-2 transition-all"
                  style={{
                    backgroundColor: `rgba(${demand > 95 ? '34, 197, 94' : demand > 85 ? '59, 130, 246' : demand > 80 ? '168, 85, 247' : '239, 68, 68'}, ${(demand - 75) / 25})`,
                    opacity: 0.8
                  }}
                >
                  {(Object.keys(regionalDemand[selectedRegion as keyof typeof regionalDemand]) as string[]).find(k =>
                    regionalDemand[selectedRegion as keyof typeof regionalDemand][k as keyof typeof regionalDemand[keyof typeof regionalDemand]] === demand &&
                    k.includes(skill)
                  )}
                </div>
                <div className="text-xs text-white/60 capitalize">{skill.replace('nodejs', 'Node.js').replace('typescript', 'TS')}</div>
                <div className="text-xs font-bold text-white">{demand}%</div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Time-Series Trend Chart */}
      <GlassCard title="Skill Popularity Trends (12 Months)">
        <div className="space-y-4">
          <p className="text-white/70 text-sm">Monthly demand trends for top skills (Jan-Dec 2024)</p>

          <div className="space-y-3">
            {['React', 'Python', 'TypeScript', 'AWS'].map((skill, skillIndex) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-sm">{skill}</span>
                  <span className="text-white/60 text-xs">Dec {monthlyTrends[11][skill.toLowerCase() as keyof typeof monthlyTrends[0]]}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(monthlyTrends[11][skill.toLowerCase() as keyof typeof monthlyTrends[0]] as number / 110) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-white/50 mt-4">
            Data normalized from 80 (base) to 110 (peak). Higher values = Stronger demand
          </div>
        </div>
      </GlassCard>

      {/* Salary Trend Cards */}
      <GlassCard title="Salary Evolution (3 Years)">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {salaryTrends.map(skill => (
            <div key={skill.skill} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">{skill.skill}</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">2023:</span>
                  <span className="text-white">{skill.salary2023}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">2024:</span>
                  <span className="text-white">{skill.salary2024}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-white/60">2025:</span>
                  <span className="text-green-400">{skill.projected2025}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400">+25% increase expected</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Alerts & Personalized Recommendations */}
      <GlassCard title="Your Personalized Skill Alerts">
        <div className="space-y-4">
          {personalizedAlerts.length > 0 ? (
            personalizedAlerts.map((alert, index) => (
              <div key={index} className={`border border-white/10 rounded-lg p-4 ${alert.urgency === 'Critical' ? 'bg-red-500/10' : alert.urgency === 'High' ? 'bg-yellow-500/10' : 'bg-blue-500/10'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${alert.urgency === 'Critical' ? 'text-red-400' : alert.urgency === 'High' ? 'text-yellow-400' : 'text-blue-400'}`} />
                    <div>
                      <h4 className="text-white font-medium mb-1">
                        {alert.skill} Opportunity Alert
                      </h4>
                      <p className="text-white/80 text-sm mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {alert.timeToLearn}
                        </span>
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {alert.category}
                        </span>
                        <span className="text-green-400">{alert.potentialSalaryIncrease} potential</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-sm transition-colors">
                    Learn Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">Great Profile!</h3>
              <p className="text-white/70 text-sm">You're already skilled in most high-demand areas.</p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* AI Opportunity Insights */}
      <GlassCard title="AI Opportunity Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunityInsights.map(insight => (
            <div key={insight.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                {insight.priority === 'High' ? (
                  <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0" />
                ) : (
                  <Target className="w-5 h-5 text-blue-400 flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-white font-medium mb-1">{insight.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{insight.description}</p>
                </div>
              </div>

              <div className={`px-3 py-2 rounded text-sm font-medium ${
                insight.priority === 'High' ? 'bg-green-500/20 text-green-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                🎯 {insight.action}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Export Section */}
      <GlassCard title="Export Market Intelligence">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-white font-medium mb-2">Download Complete Analysis</h3>
            <p className="text-white/70 text-sm">
              Export all market data, trends, and personalized recommendations as JSON or CSV
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={exportToJSON}
              className="flex items-center px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON Export
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center px-6 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV Export
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
