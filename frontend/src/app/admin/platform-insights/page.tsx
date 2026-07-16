'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Target, Zap, Globe, Search, RefreshCw, Calendar, Clock } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { users, chartData } from '@/lib/demoData'

interface SkillDemand {
  skill: string
  demandScore: number
  supplyScore: number
  growth: number
  predictions: {
    shortageRisk: 'low' | 'medium' | 'high' | 'critical'
    hiringSurge: number
    marketGrowth: number
  }
}

interface MarketInsight {
  id: string
  type: 'trend' | 'bottleneck' | 'prediction' | 'opportunity'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  data: any
}

interface HiringPrediction {
  timeframe: string
  sectors: Array<{
    name: string
    growth: number
    hiringSurge: number
  }>
  skillShortages: Array<{
    skill: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    projectedGap: number
  }>
}

export default function PlatformInsightsPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('3m')
  const [searchTerm, setSearchTerm] = useState('')
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([])
  const [hiringPredictions, setHiringPredictions] = useState<HiringPrediction | null>(null)

  // AI-generated skill demand data
  const [skillDemands] = useState<SkillDemand[]>([
    {
      skill: 'AI/ML',
      demandScore: 95,
      supplyScore: 72,
      growth: 127,
      predictions: {
        shortageRisk: 'high',
        hiringSurge: 45,
        marketGrowth: 89
      }
    },
    {
      skill: 'React',
      demandScore: 88,
      supplyScore: 85,
      growth: 23,
      predictions: {
        shortageRisk: 'low',
        hiringSurge: 12,
        marketGrowth: 34
      }
    },
    {
      skill: 'Python',
      demandScore: 92,
      supplyScore: 78,
      growth: 67,
      predictions: {
        shortageRisk: 'medium',
        hiringSurge: 28,
        marketGrowth: 56
      }
    },
    {
      skill: 'DevOps',
      demandScore: 87,
      supplyScore: 69,
      growth: 98,
      predictions: {
        shortageRisk: 'high',
        hiringSurge: 52,
        marketGrowth: 73
      }
    },
    {
      skill: 'Cloud Architecture',
      demandScore: 89,
      supplyScore: 76,
      growth: 84,
      predictions: {
        shortageRisk: 'medium',
        hiringSurge: 35,
        marketGrowth: 67
      }
    },
    {
      skill: 'Blockchain',
      demandScore: 78,
      supplyScore: 65,
      growth: 156,
      predictions: {
        shortageRisk: 'high',
        hiringSurge: 68,
        marketGrowth: 112
      }
    },
    {
      skill: 'Cybersecurity',
      demandScore: 93,
      supplyScore: 71,
      growth: 115,
      predictions: {
        shortageRisk: 'critical',
        hiringSurge: 61,
        marketGrowth: 94
      }
    },
    {
      skill: 'UI/UX Design',
      demandScore: 86,
      supplyScore: 83,
      growth: 29,
      predictions: {
        shortageRisk: 'low',
        hiringSurge: 8,
        marketGrowth: 41
      }
    }
  ])

  const [marketMetrics] = useState({
    totalSkillsTracked: skillDemands.length,
    criticalShortages: skillDemands.filter(s => s.predictions.shortageRisk === 'critical').length,
    predictedGrowth: Math.round(skillDemands.reduce((sum, s) => sum + s.predictions.marketGrowth, 0) / skillDemands.length),
    hiringSurgeIndex: Math.round(skillDemands.reduce((sum, s) => sum + s.predictions.hiringSurge, 0) / skillDemands.length)
  })

  // Generate AI market insights
  useEffect(() => {
    const insights: MarketInsight[] = [
      {
        id: 'insight_1',
        type: 'trend',
        title: 'AI Talent Boom Accelerating',
        description: 'AI/ML skills showing unprecedented 127% growth with critical talent shortage. Blockchain and DevOps also surging.',
        impact: 'critical',
        confidence: 96,
        data: { topSkills: ['AI/ML', 'Blockchain', 'DevOps'] }
      },
      {
        id: 'insight_2',
        type: 'bottleneck',
        title: 'Cybersecurity Gap Widening',
        description: 'Critical shortage of cybersecurity professionals. Projected gap of 2.3M qualified candidates by 2025.',
        impact: 'high',
        confidence: 92,
        data: { currentGap: '1.8M', projectedGap: '2.3M' }
      },
      {
        id: 'insight_3',
        type: 'prediction',
        title: 'Q1 2025 Hiring Surge Predicted',
        description: 'Tech sector expected 35% increase in hiring activity. AI, cloud, and green tech driving demand.',
        impact: 'high',
        confidence: 89,
        data: { sectors: ['AI', 'Cloud', 'Green Tech'], increase: 35 }
      },
      {
        id: 'insight_4',
        type: 'opportunity',
        title: 'Emerging Skills Demand',
        description: 'Quantum computing, AI ethics, and sustainable tech showing early but rapidly growing demand patterns.',
        impact: 'medium',
        confidence: 87,
        data: { emergingSkills: ['Quantum Computing', 'AI Ethics', 'Sustainable Tech'] }
      }
    ]
    setMarketInsights(insights)

    const predictions: HiringPrediction = {
      timeframe: 'Next 6 months',
      sectors: [
        { name: 'Technology', growth: 35, hiringSurge: 28 },
        { name: 'Healthcare', growth: 22, hiringSurge: 15 },
        { name: 'Finance', growth: 18, hiringSurge: 12 },
        { name: 'Green Energy', growth: 67, hiringSurge: 42 },
        { name: 'E-commerce', growth: 31, hiringSurge: 25 }
      ],
      skillShortages: [
        { skill: 'Cybersecurity', severity: 'critical', projectedGap: 23 },
        { skill: 'AI/ML Engineers', severity: 'high', projectedGap: 31 },
        { skill: 'DevOps Specialists', severity: 'high', projectedGap: 28 },
        { skill: 'Cloud Architects', severity: 'medium', projectedGap: 19 },
        { skill: 'Data Scientists', severity: 'medium', projectedGap: 22 }
      ]
    }
    setHiringPredictions(predictions)
  }, [])

  const handleRefreshInsights = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 3000)
  }

  const filteredSkills = skillDemands.filter(skill =>
    skill.skill.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-slate-400'
    }
  }

  const getRiskBg = (risk: string) => {
    switch(risk) {
      case 'critical': return 'bg-red-900/50 border-red-700'
      case 'high': return 'bg-orange-900/50 border-orange-700'
      case 'medium': return 'bg-yellow-900/50 border-yellow-700'
      case 'low': return 'bg-green-900/50 border-green-700'
      default: return 'bg-slate-900/50 border-slate-700'
    }
  }

  const demandSupplyData = skillDemands.map(skill => ({
    skill: skill.skill,
    demand: skill.demandScore,
    supply: skill.supplyScore,
    gap: skill.demandScore - skill.supplyScore
  }))

  const growthTrendData = skillDemands.map(skill => ({
    skill: skill.skill,
    growth: skill.predictions.marketGrowth
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Globe className="w-10 h-10 text-purple-400" />
            AI Platform Intelligence
          </h1>
          <p className="text-slate-300">Predictive market analysis, demand forecasting, and opportunity identification</p>
        </div>
        <Button
          onClick={handleRefreshInsights}
          disabled={refreshing}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Analyzing Market...' : 'Refresh Intelligence'}
        </Button>
      </div>

      {/* Market Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-400">{marketMetrics.totalSkillsTracked}</div>
              <div className="text-slate-400 text-sm">Skills Tracked</div>
            </div>
            <Target className="w-6 h-6 text-purple-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-400">{marketMetrics.criticalShortages}</div>
              <div className="text-slate-400 text-sm">Critical Shortages</div>
            </div>
            <Zap className="w-6 h-6 text-red-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{marketMetrics.predictedGrowth}%</div>
              <div className="text-slate-400 text-sm">Avg Market Growth</div>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{marketMetrics.hiringSurgeIndex}%</div>
              <div className="text-slate-400 text-sm">Hiring Surge Index</div>
            </div>
            <BarChart3 className="w-6 h-6 text-blue-400" />
          </div>
        </AdminGlassCard>
      </div>

      {/* AI Market Insights */}
      <AdminGlassCard title="🤖 AI Market Intelligence">
        <div className="space-y-4">
          {marketInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border border-slate-700 bg-slate-800/50 ${
                insight.impact === 'critical' ? 'border-red-500/50 bg-red-900/10' :
                insight.impact === 'high' ? 'border-orange-500/50 bg-orange-900/10' :
                insight.impact === 'medium' ? 'border-yellow-500/50 bg-yellow-900/10' :
                'border-green-500/50 bg-green-900/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      insight.type === 'trend' ? 'border-blue-500 text-blue-300' :
                      insight.type === 'bottleneck' ? 'border-red-500 text-red-300' :
                      insight.type === 'prediction' ? 'border-purple-500 text-purple-300' :
                      'border-green-500 text-green-300'
                    }`}>
                      {insight.type.toUpperCase()}
                    </span>
                    <h4 className="text-white font-semibold">{insight.title}</h4>
                  </div>
                  <p className="text-slate-300 text-sm">{insight.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`text-xs px-2 py-1 rounded ${
                    insight.impact === 'critical' ? 'bg-red-900/50 text-red-300' :
                    insight.impact === 'high' ? 'bg-orange-900/50 text-orange-300' :
                    insight.impact === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {insight.impact} impact
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {insight.confidence}% confidence
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminGlassCard>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand vs Supply Gap */}
        <AdminGlassCard title="Demand vs Supply Analysis">
          <div className="h-80">
            <div className="space-y-4">
              {demandSupplyData.slice(0, 6).map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white text-sm">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-xs">D:{skill.demand}%</span>
                        <span className="text-blue-400 text-xs">S:{skill.supply}%</span>
                        <span className={`text-xs ${skill.gap > 15 ? 'text-red-400' : skill.gap > 5 ? 'text-orange-400' : 'text-green-400'}`}>
                          Gap:{skill.gap > 0 ? '+' : ''}{skill.gap}%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full transition-all duration-1000"
                        style={{ width: `${skill.demand}%` }}
                        title={`Demand: ${skill.demand}%`}
                      ></div>
                      <div
                        className="bg-blue-500 h-full transition-all duration-1000"
                        style={{ width: `${Math.max(0, skill.supply - skill.demand)}%` }}
                        title={`Supply: ${skill.supply}%`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-slate-400">Demand</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-slate-400">Supply</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>

        {/* Market Growth Predictions */}
        <AdminGlassCard title="Market Growth Predictions (6 Months)">
          <div className="h-80">
            <div className="space-y-4">
              {growthTrendData.slice(0, 6).map((skill, index) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white text-sm">{skill.skill}</span>
                      <span className={`text-sm font-bold ${skill.growth > 80 ? 'text-green-400' : skill.growth > 40 ? 'text-blue-400' : 'text-slate-400'}`}>
                        +{skill.growth}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          skill.growth > 80 ? 'bg-green-500' :
                          skill.growth > 40 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, skill.growth)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Skill Shortages & Hiring Predictions */}
      {hiringPredictions && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminGlassCard title="Critical Skill Shortages">
            <div className="space-y-4">
              {hiringPredictions.skillShortages.map((shortage, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{shortage.skill}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-bold ${getRiskBg(shortage.severity)}`}>
                        {shortage.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Projected Gap:</span>
                      <span className={getRiskColor(shortage.severity)}>
                        +{shortage.projectedGap}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminGlassCard>

          <AdminGlassCard title="Sector Hiring Predictions">
            <div className="space-y-4">
              {hiringPredictions.sectors.map((sector, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{sector.name}</span>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-400">Growth: +{sector.growth}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Hiring Surge:</span>
                      <span className="text-blue-400 font-bold">
                        +{sector.hiringSurge}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </div>
      )}

      {/* Comprehensive Skills Analysis Table */}
      <AdminGlassCard title="Skills Demand Intelligence">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 w-80"
              />
            </div>
          </div>
          <div className="text-slate-400 text-sm">
            Showing {filteredSkills.length} of {skillDemands.length} skills
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold text-left">Skill</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Demand</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Supply</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Gap</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Growth</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Shortage Risk</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Hiring Surge</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => (
                <tr key={skill.skill} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className={`w-5 h-5 ${skill.growth > 80 ? 'text-green-400' : skill.growth > 40 ? 'text-blue-400' : 'text-slate-400'}`} />
                      <span className="font-semibold text-white">{skill.skill}</span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-white font-bold">{skill.demandScore}%</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-white font-bold">{skill.supplyScore}%</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className={`font-bold ${
                      skill.demandScore - skill.supplyScore > 15 ? 'text-red-400' :
                      skill.demandScore - skill.supplyScore > 5 ? 'text-orange-400' :
                      'text-green-400'
                    }`}>
                      {skill.demandScore - skill.supplyScore > 0 ? '+' : ''}{skill.demandScore - skill.supplyScore}%
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span className={`font-bold ${
                      skill.predictions.marketGrowth > 80 ? 'text-green-400' :
                      skill.predictions.marketGrowth > 40 ? 'text-blue-400' :
                      'text-slate-400'
                    }`}>
                      +{skill.predictions.marketGrowth}%
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-bold ${getRiskBg(skill.predictions.shortageRisk)}`}>
                      {skill.predictions.shortageRisk.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-blue-400 font-bold">+{skill.predictions.hiringSurge}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>
    </div>
  )
}
