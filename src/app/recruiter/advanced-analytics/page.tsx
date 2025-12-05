'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserPlus,
  UserMinus,
  Activity,
  Zap,
  Award,
  Timer,
  PieChart,
  LineChart,
  BarChart,
  Globe,
  UserCheck,
  Brain
} from 'lucide-react'

// Advanced Analytics Engine
const ANALYTICS_ENGINE = {
  // Recruitment funnel data
  getFunnelData: (period: string) => {
    const data = {
      'this-month': {
        totalApplications: 1247,
        shortlisted: 237,
        interviewed: 145,
        offered: 42,
        hired: 31,
        conversion: 2.5,
        avgTimeToHire: 18,
        costPerHire: 8500
      },
      'last-month': {
        totalApplications: 1089,
        shortlisted: 198,
        interviewed: 118,
        offered: 35,
        hired: 27,
        conversion: 2.5,
        avgTimeToHire: 21,
        costPerHire: 9200
      }
    }
    return data[period as keyof typeof data] || data['this-month']
  },

  // Job posting performance
  getJobPerformance: () => [
    {
      jobTitle: 'Senior React Developer',
      views: 2840,
      applications: 87,
      avgTime: 8.2,
      conversionRate: 3.1,
      averageSalary: 180000,
      status: 'active'
    },
    {
      jobTitle: 'UX/UI Designer',
      views: 2156,
      applications: 65,
      avgTime: 12.5,
      conversionRate: 3.0,
      averageSalary: 95000,
      status: 'active'
    },
    {
      jobTitle: 'Product Manager',
      views: 1890,
      applications: 52,
      avgTime: 15.8,
      conversionRate: 2.7,
      averageSalary: 145000,
      status: 'expired'
    }
  ],

  // Interview success rates
  getInterviewAnalytics: () => [
    {
      stage: 'Phone Screen',
      conducted: 157,
      passed: 89,
      successRate: 56.7,
      avgDuration: 32,
      avgRating: 7.8
    },
    {
      stage: 'Technical Interview',
      conducted: 89,
      passed: 52,
      successRate: 58.4,
      avgDuration: 95,
      avgRating: 8.2
    },
    {
      stage: 'Final Interview',
      conducted: 52,
      passed: 31,
      successRate: 59.6,
      avgDuration: 75,
      avgRating: 8.6
    }
  ],

  // Performance trends (last 12 months)
  getPerformanceTrends: () => [
    { month: 'Dec', hires: 28, timeToHire: 18 },
    { month: 'Jan', hires: 32, timeToHire: 16 },
    { month: 'Feb', hires: 41, timeToHire: 14 },
    { month: 'Mar', hires: 38, timeToHire: 15 },
    { month: 'Apr', hires: 35, timeToHire: 17 },
    { month: 'May', hires: 42, timeToHire: 13 },
    { month: 'Jun', hires: 39, timeToHire: 14 },
    { month: 'Jul', hires: 45, timeToHire: 12 },
    { month: 'Aug', hires: 48, timeToHire: 11 },
    { month: 'Sep', hires: 52, timeToHire: 10 },
    { month: 'Oct', hires: 55, timeToHire: 9 },
    { month: 'Nov', hires: 48, timeToHire: 11 }
  ],

  // AI insights and predictions
  getAIPredictions: () => ({
    nextMonthPrediction: {
      hires: 52,
      confidence: 87,
      marketTrend: 'positive',
      recommendations: [
        'Increase salary budget by 8% for top roles',
        'Focus on senior developer pipeline',
        'Reduce time-to-interview by 3 days'
      ]
    },
    skillDemandShift: {
      inDemand: ['AI/ML', 'React 18', 'TypeScript', 'Kubernetes'],
      declining: ['Angular', 'jQuery', 'MongoDB (traditional)'],
      emerging: ['Rust', 'Edge Computing', 'Web3']
    },
    recruitmentEfficiency: {
      currentScore: 8.7,
      potential: 9.2,
      improvementAreas: ['candidate experience', 'interview scheduling']
    }
  })
}

// Custom chart components (simplified for React UI)
const FunnelChart = ({ data }: { data: any }) => (
  <div className="space-y-4">
    {[
      { label: 'Applications', count: data.totalApplications, percentage: 100, color: 'bg-blue-500' },
      { label: 'Shortlisted', count: data.shortlisted, percentage: (data.shortlisted / data.totalApplications) * 100, color: 'bg-yellow-500' },
      { label: 'Interviewed', count: data.interviewed, percentage: (data.interviewed / data.totalApplications) * 100, color: 'bg-purple-500' },
      { label: 'Offered', count: data.offered, percentage: (data.offered / data.totalApplications) * 100, color: 'bg-orange-500' },
      { label: 'Hired', count: data.hired, percentage: (data.hired / data.totalApplications) * 100, color: 'bg-green-500' }
    ].map((stage, index) => (
      <div key={stage.label} className="flex items-center gap-4">
        <div className="w-24 text-sm text-[#C9CFD6] font-medium">{stage.label}</div>
        <div className="flex-1">
          <div className={`h-8 rounded ${stage.color} transition-all`} style={{
            width: `${Math.max(stage.percentage, 8)}%`,
            marginLeft: `${(100 - stage.percentage) * 0.6}%`
          }}></div>
        </div>
        <div className="w-16 text-right text-[#FFFFFF] font-bold">{stage.count}</div>
        <div className="w-12 text-right text-[#C9CFD6] text-sm">{stage.percentage.toFixed(1)}%</div>
      </div>
    ))}
  </div>
)

const TrendChart = ({ data }: { data: any[] }) => (
  <div className="flex items-end gap-2 h-32">
    {data.map((point, index) => (
      <div key={index} className="flex flex-col items-center gap-1 flex-1">
        <div
          className="bg-[#FFD700] rounded-t w-full transition-all hover:bg-[#FFC107]"
          style={{ height: `${(point.hires / 60) * 100}%` }}
        ></div>
        <span className="text-xs text-[#C9CFD6] transform -rotate-45">{point.month}</span>
      </div>
    ))}
  </div>
)

export default function AdvancedAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month')
  const [selectedChart, setSelectedChart] = useState('funnel')
  const [isAIEnabled, setIsAIEnabled] = useState(true)

  const funnelData = ANALYTICS_ENGINE.getFunnelData(selectedPeriod)
  const jobPerformance = ANALYTICS_ENGINE.getJobPerformance()
  const interviewAnalytics = ANALYTICS_ENGINE.getInterviewAnalytics()
  const performanceTrends = ANALYTICS_ENGINE.getPerformanceTrends()
  const aiPredictions = ANALYTICS_ENGINE.getAIPredictions()

  const getChangePercentage = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return change.toFixed(1)
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ?
      <TrendingUp className="w-4 h-4 text-green-500" /> :
      <TrendingDown className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#FFD700]" />
            Advanced Analytics Dashboard
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Data-driven insights for recruitment optimization and predictive hiring analytics
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-[#60A5FA] text-[#60A5FA]"
            onClick={() => setIsAIEnabled(!isAIEnabled)}
          >
            {isAIEnabled ? <Zap className="w-4 h-4 mr-2" /> : <Activity className="w-4 h-4 mr-2" />}
            AI {isAIEnabled ? 'Enabled' : 'Disabled'}
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-[#3EFFA8]" />
            <Badge className="bg-green-900 text-green-300 text-xs">
              +{getChangePercentage(funnelData.totalApplications, ANALYTICS_ENGINE.getFunnelData('last-month').totalApplications)}%
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{funnelData.totalApplications}</div>
          <div className="text-[#C9CFD6] text-sm">Applications</div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-5 h-5 text-[#60A5FA]" />
            <Badge className="bg-green-900 text-green-300 text-xs">
              +{getChangePercentage(funnelData.hired, ANALYTICS_ENGINE.getFunnelData('last-month').hired)}%
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{funnelData.hired}</div>
          <div className="text-[#C9CFD6] text-sm">Hired This Month</div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-5 h-5 text-[#FFD700]" />
            <Badge className="bg-green-900 text-green-300 text-xs">
              {funnelData.conversion}% conversion
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{funnelData.conversion}%</div>
          <div className="text-[#C9CFD6] text-sm">Conversion Rate</div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-[#EF4444]" />
            <Badge className="bg-green-900 text-green-300 text-xs">
              -{getChangePercentage(funnelData.avgTimeToHire, ANALYTICS_ENGINE.getFunnelData('last-month').avgTimeToHire)} days
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{funnelData.avgTimeToHire}</div>
          <div className="text-[#C9CFD6] text-sm">Days to Hire</div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-[#27AE60]" />
            <Badge className="bg-green-900 text-green-300 text-xs">
              -${(-funnelData.costPerHire + ANALYTICS_ENGINE.getFunnelData('last-month').costPerHire).toLocaleString()}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">${funnelData.costPerHire.toLocaleString()}</div>
          <div className="text-[#C9CFD6] text-sm">Cost per Hire</div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-5 h-5 text-[#9B59B6]" />
            <Badge className="bg-blue-900 text-blue-300 text-xs">
              Score {aiPredictions.recruitmentEfficiency.currentScore}/10
            </Badge>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{aiPredictions.recruitmentEfficiency.currentScore}</div>
          <div className="text-[#C9CFD6] text-sm">Efficiency Score</div>
        </Card>
      </div>

      {/* Time Period & Filters */}
      <div className="flex gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="bg-[#111315] border-[#23262B] w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedChart} onValueChange={setSelectedChart}>
          <SelectTrigger className="bg-[#111315] border-[#23262B] w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="funnel">Recruitment Funnel</SelectItem>
            <SelectItem value="trends">Performance Trends</SelectItem>
            <SelectItem value="efficiency">Efficiency Metrics</SelectItem>
            <SelectItem value="predictions">AI Predictions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="w-full">
        <TabsList className="grid grid-cols-4 bg-[#111315] border border-[#23262B] rounded-lg p-1">
          <TabsTrigger value="funnel" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
            Recruitment Funnel
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
            Performance Trends
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
            Efficiency Metrics
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-black">
            AI Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funnel" className="mt-6">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">Recruitment Funnel Analysis</h3>
            <FunnelChart data={funnelData} />
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <BarChart className="w-5 h-5 text-[#FFD700]" />
                Hiring Trends (Last 12 Months)
              </h3>
              <TrendChart data={performanceTrends} />
            </Card>

            <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <Timer className="w-5 h-5 text-[#60A5FA]" />
                Time-to-Hire Trends
              </h3>
              <div className="space-y-4">
                {performanceTrends.slice(-6).map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-[#C9CFD6]">{trend.month}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[#23262B] rounded-full h-2">
                        <div className="bg-[#60A5FA] h-2 rounded-full" style={{
                          width: `${Math.max(100 - (trend.timeToHire / 20) * 100, 10)}%`
                        }}></div>
                      </div>
                      <span className="text-[#60A5FA] text-sm font-medium w-8">{trend.timeToHire}d</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="efficiency" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#3EFFA8]" />
                Interview Stage Performance
              </h3>
              <div className="space-y-4">
                {interviewAnalytics.map((stage, index) => (
                  <div key={index} className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#FFFFFF] font-medium">{stage.stage}</span>
                      <Badge className={stage.successRate > 55 ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}>
                        {stage.successRate}% pass rate
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-[#C9CFD6]">Conducted</div>
                        <div className="text-[#FFFFFF] font-bold">{stage.conducted}</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Duration</div>
                        <div className="text-[#FFFFFF] font-bold">{stage.avgDuration}min</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Rating</div>
                        <div className="text-[#FFFFFF] font-bold">{stage.avgRating}/10</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#FFD700]" />
                Job Posting Performance
              </h3>
              <div className="space-y-4">
                {jobPerformance.map((job, index) => (
                  <div key={index} className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#FFFFFF] font-medium">{job.jobTitle}</span>
                      <Badge className={job.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-gray-900 text-gray-300'}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-[#C9CFD6]">Views</div>
                        <div className="text-[#FFFFFF] font-bold">{job.views.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Applications</div>
                        <div className="text-[#FFFFFF] font-bold">{job.applications}</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Conversion</div>
                        <div className="text-[#FFFFFF] font-bold">{job.conversionRate}%</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Avg Time</div>
                        <div className="text-[#FFFFFF] font-bold">{job.avgTime}d</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="mt-6">
          {isAIEnabled ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-[#FFD700]" />
                  AI Predictive Analytics
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
                    <h4 className="text-[#FFD700] font-bold mb-2">Next Month Prediction</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-[#C9CFD6]">Expected Hires</div>
                        <div className="text-[#FFFFFF] font-bold text-xl">{aiPredictions.nextMonthPrediction.hires}</div>
                      </div>
                      <div>
                        <div className="text-[#C9CFD6]">Confidence</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-[#23262B] rounded-full h-2">
                            <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: `${aiPredictions.nextMonthPrediction.confidence}%` }}></div>
                          </div>
                          <span className="text-[#FFFFFF] font-bold">{aiPredictions.nextMonthPrediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        aiPredictions.nextMonthPrediction.marketTrend === 'positive' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {aiPredictions.nextMonthPrediction.marketTrend} market trend
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#FFFFFF] font-medium mb-3">AI Recommendations</h4>
                    <div className="space-y-2">
                      {aiPredictions.nextMonthPrediction.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-[#C9CFD6] text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#1A1D21] border border-[#60A5FA]/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#60A5FA]" />
                  Skill Demand Insights
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-[#3EFFA8] font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      In High Demand
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aiPredictions.skillDemandShift.inDemand.map((skill, index) => (
                        <Badge key={index} className="bg-green-900 text-green-300 px-3 py-1">
                          +{skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#EF4444] font-medium mb-3 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Declining Demand
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aiPredictions.skillDemandShift.declining.map((skill, index) => (
                        <Badge key={index} className="bg-red-900 text-red-300 px-3 py-1">
                          -{skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#FFD700] font-medium mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Emerging Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {aiPredictions.skillDemandShift.emerging.map((skill, index) => (
                        <Badge key={index} className="bg-blue-900 text-blue-300 px-3 py-1">
                          🔥{skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="bg-[#1A1D21] border border-[#EF4444]/50 rounded-2xl p-12 text-center">
              <Brain className="w-16 h-16 text-[#EF4444] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">AI Analytics Disabled</h3>
              <p className="text-[#C9CFD6] mb-6">
                Enable AI features to see predictive analytics, skill demand trends, and recruitment optimization recommendations.
              </p>
              <Button
                onClick={() => setIsAIEnabled(true)}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
              >
                <Zap className="w-4 h-4 mr-2" />
                Enable AI Analytics
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
