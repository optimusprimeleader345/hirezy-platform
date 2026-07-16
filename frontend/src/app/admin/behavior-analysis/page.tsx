'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Brain, AlertTriangle, Activity, Zap, Target, BarChart3, RefreshCw, Search, Filter, Eye, Clock } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { users } from '@/lib/demoData'

interface UserBehaviorProfile {
  userId: string
  username: string
  engagementScore: number
  skillGrowth: number
  activityQuality: number
  riskLevel: 'low' | 'medium' | 'high'
  lastActivity: string
  patterns: string[]
  growthTrend: 'increasing' | 'stable' | 'declining'
  skillAreas: { name: string; level: number; growth: number }[]
}

interface BehaviorMetrics {
  totalUsersAnalyzed: number
  highEngagement: number
  skillGrowthAverage: number
  riskFlagsActive: number
  behavioralAlerts: number
}

interface BehavioralInsight {
  id: string
  type: 'engagement' | 'growth' | 'risk' | 'anomaly'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  confidence: number
}

export default function BehaviorAnalysisPage() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [behavioralInsights, setBehavioralInsights] = useState<BehavioralInsight[]>([])
  const [selectedUser, setSelectedUser] = useState<UserBehaviorProfile | null>(null)

  // Mock user behavior data with AI analysis
  const [behaviorProfiles] = useState<UserBehaviorProfile[]>([
    {
      userId: 'user_001',
      username: 'alex_dev2024',
      engagementScore: 92,
      skillGrowth: 28,
      activityQuality: 88,
      riskLevel: 'low',
      lastActivity: '2 hours ago',
      patterns: ['Consistent login patterns', 'High proposal quality', 'Active skill development'],
      growthTrend: 'increasing',
      skillAreas: [
        { name: 'React', level: 85, growth: 15 },
        { name: 'Node.js', level: 78, growth: 22 },
        { name: 'TypeScript', level: 72, growth: 18 }
      ]
    },
    {
      userId: 'user_002',
      username: 'sarah_design',
      engagementScore: 78,
      skillGrowth: 12,
      activityQuality: 94,
      riskLevel: 'low',
      lastActivity: '1 day ago',
      patterns: ['Irregular activity spikes', 'High-quality submissions', 'Focus on design skills'],
      growthTrend: 'stable',
      skillAreas: [
        { name: 'UI/UX Design', level: 89, growth: 8 },
        { name: 'Figma', level: 92, growth: 12 },
        { name: 'User Research', level: 76, growth: 6 }
      ]
    },
    {
      userId: 'user_003',
      username: 'tech_recruiter',
      engagementScore: 95,
      skillGrowth: 8,
      activityQuality: 96,
      riskLevel: 'low',
      lastActivity: '30 minutes ago',
      patterns: ['Daily active recruitment', 'Consistent hiring patterns', 'High contract conversion'],
      growthTrend: 'stable',
      skillAreas: [
        { name: 'Talent Acquisition', level: 94, growth: 5 },
        { name: 'Interview Techniques', level: 91, growth: 7 },
        { name: 'HR Compliance', level: 88, growth: 3 }
      ]
    },
    {
      userId: 'user_004',
      username: 'beginner_coder',
      engagementScore: 45,
      skillGrowth: 67,
      activityQuality: 62,
      riskLevel: 'medium',
      lastActivity: '5 days ago',
      patterns: ['Steep learning curve', 'Quality improving over time', 'Needs mentorship'],
      growthTrend: 'increasing',
      skillAreas: [
        { name: 'JavaScript', level: 34, growth: 34 },
        { name: 'Python', level: 28, growth: 28 },
        { name: 'Web Development', level: 22, growth: 39 }
      ]
    },
    {
      userId: 'user_005',
      username: 'slow_responder',
      engagementScore: 32,
      skillGrowth: -5,
      activityQuality: 55,
      riskLevel: 'high',
      lastActivity: '23 days ago',
      patterns: ['Declining activity', 'Poor response rates', 'Potential churn risk'],
      growthTrend: 'declining',
      skillAreas: [
        { name: 'Marketing', level: 58, growth: -8 },
        { name: 'Content Creation', level: 62, growth: -12 }
      ]
    }
  ])

  const [behaviorMetrics] = useState<BehaviorMetrics>({
    totalUsersAnalyzed: behaviorProfiles.length,
    highEngagement: behaviorProfiles.filter(u => u.engagementScore > 80).length,
    skillGrowthAverage: Math.round(behaviorProfiles.reduce((sum, u) => sum + u.skillGrowth, 0) / behaviorProfiles.length),
    riskFlagsActive: behaviorProfiles.filter(u => u.riskLevel !== 'low').length,
    behavioralAlerts: 3
  })

  // Generate behavioral insights
  useEffect(() => {
    const insights: BehavioralInsight[] = [
      {
        id: 'insight_1',
        type: 'engagement',
        title: 'Rising Skill Development Trend',
        description: 'Users with high engagement scores are 3.2x more likely to show consistent skill growth',
        impact: 'high',
        confidence: 94
      },
      {
        id: 'insight_2',
        type: 'growth',
        title: 'Early Career Focus Group',
        description: 'Beginner users show 45% faster skill acquisition but need quality mentoring',
        impact: 'medium',
        confidence: 87
      },
      {
        id: 'insight_3',
        type: 'risk',
        title: 'Churn Prediction Alert',
        description: '15 users identified with 78% probability of platform abandonment in next 30 days',
        impact: 'high',
        confidence: 91
      },
      {
        id: 'insight_4',
        type: 'anomaly',
        title: 'Unusual Activity Pattern',
        description: 'Cluster of users showing synchronized behavior across different time zones',
        impact: 'low',
        confidence: 73
      }
    ]
    setBehavioralInsights(insights)
  }, [])

  const handleRefreshAnalysis = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const filteredUsers = behaviorProfiles.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterLevel === 'all' || user.riskLevel === filterLevel
    return matchesSearch && matchesFilter
  })

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-slate-400'
    }
  }

  const getGrowthColor = (growth: number) => {
    if (growth > 20) return 'text-green-400'
    if (growth > 0) return 'text-blue-400'
    return 'text-red-400'
  }

  // Mock engagement heatmap data
  const engagementData = [
    { hour: '00', engagement: 12 },
    { hour: '06', engagement: 25 },
    { hour: '12', engagement: 78 },
    { hour: '18', engagement: 65 },
    { hour: '24', engagement: 34 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Brain className="w-10 h-10 text-purple-400" />
            AI Behavior Analysis
          </h1>
          <p className="text-slate-300">Machine learning-powered user behavior monitoring, engagement analysis, and growth prediction</p>
        </div>
        <Button
          onClick={handleRefreshAnalysis}
          disabled={refreshing}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Analyzing...' : 'Refresh Analysis'}
        </Button>
      </div>

      {/* Behavior Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-400">{behaviorMetrics.totalUsersAnalyzed}</div>
              <div className="text-slate-400 text-sm">Users Analyzed</div>
            </div>
            <Users className="w-6 h-6 text-purple-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{behaviorMetrics.highEngagement}</div>
              <div className="text-slate-400 text-sm">High Engagement</div>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{behaviorMetrics.skillGrowthAverage}%</div>
              <div className="text-slate-400 text-sm">Avg Skill Growth</div>
            </div>
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
        </AdminGlassCard>

        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-400">{behaviorMetrics.riskFlagsActive}</div>
              <div className="text-slate-400 text-sm">Risk Flags</div>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </AdminGlassCard>
      </div>

      {/* Behavioral Insights Panel */}
      <AdminGlassCard title="🤖 AI Behavioral Insights">
        <div className="space-y-4">
          {behavioralInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg border border-slate-700 bg-slate-800/50 ${
                insight.impact === 'high' ? 'border-red-500/50 bg-red-900/10' :
                insight.impact === 'medium' ? 'border-yellow-500/50 bg-yellow-900/10' :
                'border-green-500/50 bg-green-900/10'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      insight.type === 'engagement' ? 'border-purple-500 text-purple-300' :
                      insight.type === 'growth' ? 'border-blue-500 text-blue-300' :
                      insight.type === 'risk' ? 'border-red-500 text-red-300' :
                      'border-yellow-500 text-yellow-300'
                    }`}>
                      {insight.type.toUpperCase()}
                    </span>
                    <h4 className="text-white font-semibold">{insight.title}</h4>
                  </div>
                  <p className="text-slate-300 text-sm">{insight.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className={`text-xs px-2 py-1 rounded ${
                    insight.impact === 'high' ? 'bg-red-900/50 text-red-300' :
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

      {/* Engagement Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminGlassCard title="24-Hour Engagement Pattern">
          <div className="h-64">
            <div className="grid grid-cols-5 gap-1 mb-4">
              {engagementData.map((data, index) => (
                <div
                  key={index}
                  className={`h-16 rounded transition-all duration-1000 ${data.engagement > 70 ? 'bg-green-500' : data.engagement > 50 ? 'bg-blue-500' : data.engagement > 30 ? 'bg-yellow-500' : 'bg-slate-600'}`}
                  style={{ opacity: (data.engagement / 100) + 0.2 }}
                  title={`Hour ${data.hour}: ${data.engagement}% engagement`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Midnight</span>
              <span>Morning</span>
              <span>Noon</span>
              <span>Evening</span>
              <span>Midnight</span>
            </div>
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Risk Distribution">
          <div className="h-64 flex items-center justify-center">
            <div className="w-full h-full relative flex items-end justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 h-32 w-16 rounded-t" style={{ height: `${Math.round((behaviorProfiles.filter(u => u.riskLevel === 'low').length / behaviorProfiles.length) * 200)}px` }}></div>
                <span className="text-green-400 text-xs mt-2">Low Risk</span>
                <span className="text-green-400 font-bold">{Math.round((behaviorProfiles.filter(u => u.riskLevel === 'low').length / behaviorProfiles.length) * 100)}%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-yellow-500 h-32 w-16 rounded-t" style={{ height: `${Math.round((behaviorProfiles.filter(u => u.riskLevel === 'medium').length / behaviorProfiles.length) * 200)}px` }}></div>
                <span className="text-yellow-400 text-xs mt-2">Medium Risk</span>
                <span className="text-yellow-400 font-bold">{Math.round((behaviorProfiles.filter(u => u.riskLevel === 'medium').length / behaviorProfiles.length) * 100)}%</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-red-500 h-32 w-16 rounded-t" style={{ height: `${Math.round((behaviorProfiles.filter(u => u.riskLevel === 'high').length / behaviorProfiles.length) * 200)}px` }}></div>
                <span className="text-red-400 text-xs mt-2">High Risk</span>
                <span className="text-red-400 font-bold">{Math.round((behaviorProfiles.filter(u => u.riskLevel === 'high').length / behaviorProfiles.length) * 100)}%</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* User Behavior Analysis Table */}
      <AdminGlassCard title="User Behavior Profiles">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <Input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 w-80"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
          <div className="text-slate-400 text-sm">
            Showing {filteredUsers.length} of {behaviorProfiles.length} profiles
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold text-left">User</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Engagement</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Skill Growth</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Quality</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Risk Level</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Trend</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4">
                    <div>
                      <div className="font-semibold text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        {user.username}
                      </div>
                      <div className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {user.lastActivity}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="text-white font-bold">{user.engagementScore}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${user.engagementScore > 80 ? 'bg-green-500' : user.engagementScore > 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ width: `${user.engagementScore}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <div className={`font-bold ${getGrowthColor(user.skillGrowth)}`}>
                      {user.skillGrowth > 0 ? '+' : ''}{user.skillGrowth}%
                    </div>
                    <div className="text-xs text-slate-400">{user.skillAreas.length} skills</div>
                  </td>
                  <td className="py-4 text-center">
                    <div className="text-white font-bold">{user.activityQuality}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${user.activityQuality > 80 ? 'bg-green-500' : user.activityQuality > 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                        style={{ width: `${user.activityQuality}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      user.riskLevel === 'high' ? 'bg-red-900/50 text-red-300' :
                      user.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-green-900/50 text-green-300'
                    }`}>
                      {user.riskLevel.toUpperCase()} RISK
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-4 h-4 ${
                        user.growthTrend === 'increasing' ? 'text-green-400' :
                        user.growthTrend === 'declining' ? 'text-red-400' :
                        'text-blue-400'
                      }`} />
                      <span className={`text-xs capitalize ${
                        user.growthTrend === 'increasing' ? 'text-green-400' :
                        user.growthTrend === 'declining' ? 'text-red-400' :
                        'text-blue-400'
                      }`}>
                        {user.growthTrend}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-center">
                    <Button
                      onClick={() => setSelectedUser(user)}
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 border-slate-600 hover:bg-slate-800"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Analyze
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Detailed User Behavior Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedUser.username}</h3>
                <div className="text-slate-400">User ID: {selectedUser.userId}</div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Behavior Scores */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Behavior Scores</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Engagement:</span>
                    <span className="text-white font-bold">{selectedUser.engagementScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Skill Growth:</span>
                    <span className={getGrowthColor(selectedUser.skillGrowth)}>
                      {selectedUser.skillGrowth > 0 ? '+' : ''}{selectedUser.skillGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Quality:</span>
                    <span className="text-white font-bold">{selectedUser.activityQuality}%</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-3">Risk Assessment</h4>
                <div className="space-y-3">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                      selectedUser.riskLevel === 'high' ? 'bg-red-900/50 text-red-300' :
                      selectedUser.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                      'bg-green-900/50 text-green-300'
                    }`}>
                      {selectedUser.riskLevel.toUpperCase()} RISK LEVEL
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      selectedUser.growthTrend === 'increasing' ? 'text-green-400' :
                      selectedUser.growthTrend === 'declining' ? 'text-red-400' :
                      'text-blue-400'
                    }`} />
                    <span className={`text-sm ${
                      selectedUser.growthTrend === 'increasing' ? 'text-green-400' :
                      selectedUser.growthTrend === 'declining' ? 'text-red-400' :
                      'text-blue-400'
                    }`}>
                      {selectedUser.growthTrend} trend
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Patterns */}
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-white font-semibold mb-3">AI Patterns</h4>
                <div className="space-y-2">
                  {selectedUser.patterns.map((pattern, idx) => (
                    <div key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {pattern}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Development Chart */}
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Skill Development Areas</h4>
              <div className="space-y-4">
                {selectedUser.skillAreas.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{skill.level}%</span>
                        <span className={`text-sm ${getGrowthColor(skill.growth)}`}>
                          ({skill.growth > 0 ? '+' : ''}{skill.growth}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          skill.level > 80 ? 'bg-green-500' : skill.level > 60 ? 'bg-blue-500' : skill.level > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Close Analysis
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Generate Behavior Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
