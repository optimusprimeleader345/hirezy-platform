'use client'

import { useEffect, useState } from 'react'
import {
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Brain,
  MapPin,
  Award,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Star,
  CheckCircle,
  AlertCircle,
  Eye,
  Calendar,
  Globe,
  Shield,
  MessageSquare
} from 'lucide-react'
import { MetricCard } from '@/components/MetricCard'
import { getUser, getRecruiterStats, getGigs } from '@/lib/apiClient'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  company: string
}

interface RecruiterStats {
  postedGigs: number
  receivedApplications: number
  hiredFreelancers: number
  successRate: number
  budgetSpent: number
  avgProjectCost: number
}

interface Gig {
  id: number
  title: string
  company: string
  salary: string
  skills: string[]
  location: string
  postedDate: string
  description: string
}

export default function RecruiterDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<RecruiterStats | null>(null)
  const [gigs, setGigs] = useState<Gig[]>([])
  const [isLoadingGigs, setIsLoadingGigs] = useState(true)
  const [gigsError, setGigsError] = useState<string | null>(null)

  // MNC-Level Mock Analytics Data
  const aiInsights = [
    { id: 1, insight: 'Python Developers have 23% higher retention rate', impact: 'High', trend: 'up' },
    { id: 2, insight: 'Remote positions reduce time-to-fill by 18%', impact: 'Medium', trend: 'up' },
    { id: 3, insight: 'Open roles funding should increase for Q1', impact: 'High', trend: 'neutral' },
  ]

  const hiringFunnelData = [
    { stage: 'Applied', count: 120, percentage: 100, color: '#3EFFA8' },
    { stage: 'Screened', count: 95, percentage: 79, color: '#60A5FA' },
    { stage: 'Interviewed', count: 42, percentage: 35, color: '#F59E0B' },
    { stage: 'Offered', count: 18, percentage: 15, color: '#EF4444' },
    { stage: 'Accepted', count: 12, percentage: 10, color: '#10B981' }
  ]

  const timeToFillData = [
    { month: 'Jan', days: 18, target: 14 },
    { month: 'Feb', days: 22, target: 14 },
    { month: 'Mar', days: 16, target: 14 },
    { month: 'Apr', days: 19, target: 14 },
    { month: 'May', days: 12, target: 14 },
    { month: 'Jun', days: 25, target: 14 }
  ]

  const sourceEffectivenessData = [
    { name: 'LinkedIn', hires: 45, costPerHire: 2800, roi: 145 },
    { name: 'Indeed', hires: 32, costPerHire: 3200, roi: 118 },
    { name: 'Company Website', hires: 18, costPerHire: 1200, roi: 325 },
    { name: 'Referrals', hires: 12, costPerHire: 400, roi: 980 },
    { name: 'Job Fairs', hires: 8, costPerHire: 1800, roi: 212 }
  ]

  const diversityData = [
    { category: 'Gender Diversity', women: 48, men: 52, target: 50 },
    { category: 'Ethnic Diversity', underrepresented: 23, represented: 77, target: 30 },
    { category: 'Senior Experience', senior: 15, midLevel: 55, junior: 30, target: 25 }
  ]

  const predictiveHiringData = [
    { month: 'Jul', predicted: 28, actual: 25 },
    { month: 'Aug', predicted: 32, actual: 30 },
    { month: 'Sep', predicted: 35, actual: 0 },
    { month: 'Oct', predicted: 38, actual: 0 },
    { month: 'Nov', predicted: 42, actual: 0 },
    { month: 'Dec', predicted: 45, actual: 0 }
  ]

  const geographicData = [
    { city: 'Bangalore', hires: 125, remote: 78, onsite: 47 },
    { city: 'Mumbai', hires: 89, remote: 45, onsite: 44 },
    { city: 'Delhi', hires: 67, remote: 32, onsite: 35 },
    { city: 'Chennai', hires: 54, remote: 28, onsite: 26 },
    { city: 'Pune', hires: 43, remote: 25, onsite: 18 }
  ]

  const complianceData = [
    { metric: 'OFCCP Compliance', status: 'Green', score: 98 },
    { metric: 'GDPR Readiness', status: 'Green', score: 95 },
    { metric: 'ADA Compliance', status: 'Yellow', score: 87 },
    { metric: 'Background Checks', status: 'Green', score: 100 }
  ]

  const realTimeActivity = [
    { action: 'New application received', user: 'Sarah Johnson', role: 'Data Scientist', time: '2 min ago', type: 'application' },
    { action: 'Interview scheduled', user: 'Mike Chen', role: 'React Developer', time: '15 min ago', type: 'interview' },
    { action: 'Candidate offer accepted', user: 'Lisa Wang', role: 'UX Designer', time: '1 hour ago', type: 'success' },
    { action: 'Hiring manager feedback updated', user: 'John Smith', role: 'Full Stack Developer', time: '2 hours ago', type: 'update' },
    { action: 'Compliance audit completed', user: 'System', role: 'Automated', time: '3 hours ago', type: 'system' }
  ]

  // Advanced AI Features Data
  const aiAdvancedFeatures = {
    resumeParsing: [
      { name: 'John Smith', match: 94, skills: ['React', 'Node.js', 'AWS'], experience: '3-5 years', score: 88 },
      { name: 'Alice Chen', match: 91, skills: ['Python', 'ML', 'TensorFlow'], experience: '4-6 years', score: 92 },
      { name: 'Bob Wilson', match: 87, skills: ['Java', 'Spring', 'PostgreSQL'], experience: '2-4 years', score: 85 }
    ],
    culturalFit: [
      { name: 'Sarah Kumar', culture_score: 94, growth: 'High Growth Potential', adaptability: 'Excellent', collaboration: 'Strong Team Player' },
      { name: 'Mike Rodriguez', culture_score: 88, growth: 'Leadership Potential', adaptability: 'Flexible', collaboration: 'Independent Contributor' },
      { name: 'Emma Davis', culture_score: 92, growth: 'Continuous Learner', adaptability: 'Highly Adaptable', collaboration: 'Team Builder' }
    ],
    flightRisk: [
      { name: 'Alex Johnson', risk: 'Low', factors: '3-year tenure stability', mitigation: 'Retention bonus recommended' },
      { name: 'Priya Patel', risk: 'Medium', factors: 'New market opportunity', mitigation: 'Career development plan' },
      { name: 'David Kim', risk: 'High', factors: 'Multiple offers received', mitigation: 'Immediate compensation review' }
    ],
    interviewQuestions: [
      { role: 'Frontend Developer', category: 'Technical', question: 'How do you optimize React app performance?', difficulty: 'Intermediate' },
      { role: 'Backend Engineer', category: 'System Design', question: 'Design a scalable microservices architecture', difficulty: 'Advanced' },
      { role: 'Product Manager', category: 'Strategic', question: 'How do you prioritize features with limited resources?', difficulty: 'Senior' }
    ],
    salaryOptimization: [
      { role: 'Software Engineer', marketRate: '$85k-$110k', recommended: '$95k', equity: '0.1%', factors: 'Location + Experienced' },
      { role: 'UX Designer', marketRate: '$70k-$95k', recommended: '$82k', equity: '0.08%', factors: 'Senior level + Portfolio quality' },
      { role: 'Data Scientist', marketRate: '$90k-$130k', recommended: '$105k', equity: '0.12%', factors: 'ML expertise + Python strong' }
    ]
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingGigs(true)
        setGigsError(null)

        const [userData, statsData] = await Promise.all([
          getUser(),
          getRecruiterStats()
        ])
        setUser(userData)
        setStats(statsData)

        // Fetch gigs from real API only if we have a user
        if (userData?.id) {
          const gigsResponse = await fetch('/pages/api/recruiter/gig/list?recruiterId=' + userData.id)
          if (!gigsResponse.ok) {
            throw new Error(`Failed to fetch gigs: ${gigsResponse.status}`)
          }
          const gigsData = await gigsResponse.json()

          // Map API response to component format
          const mappedGigs = gigsData.gigs.map((gig: any) => ({
            id: gig.id,
            title: gig.title,
            company: gig.company,
            salary: gig.salary,
            skills: Array.isArray(gig.skills) ? gig.skills : gig.skills.split(',').map((s: string) => s.trim()),
            location: gig.location,
            postedDate: gig.postedDate,
            description: gig.description,
            applications: gig.applications?.length || 0
          }))

          setGigs(mappedGigs)
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
        setGigsError('Unable to load gigs. Please try again.')
        // Try to show toast notification (though we don't have toast library set up)
        alert('Unable to load gigs. Please try again.')
      } finally {
        setIsLoadingGigs(false)
      }
    }

    loadData()
  }, [])

  if (!user || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-800">Loading your dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recruiter Header */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3EFFA8] to-[#00ff88] flex items-center justify-center">
              <span className="text-2xl font-bold text-black">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FFFFFF]">Welcome back, {user.name}!</h1>
              <p className="text-[#C9CFD6] text-lg">{user.company}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-[#C9CFD6]">Live Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3EFFA8]" />
                  <span className="text-sm text-[#C9CFD6]">Last updated: 2 min ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
              <Zap className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
            <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Review
            </Button>
          </div>
        </div>
      </Card>

      {/* Enhanced KPI Cards with Spark Lines */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#3EFFA8] bg-opacity-20 rounded-lg">
                <Briefcase className="h-6 w-6 text-[#3EFFA8]" />
              </div>
              <div>
                <p className="text-[#C9CFD6] text-sm font-medium">Active Gigs</p>
                <p className="text-3xl font-bold text-[#FFFFFF]">{stats.postedGigs}</p>
              </div>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-sm text-[#C9CFD6]">+12.5% from last month</div>
          <div className="mt-3 w-full h-8 bg-[#111315] rounded flex items-end gap-1 p-1">
            {[60, 45, 75, 80, 90, 85, 100].map((height, i) => (
              <div key={i} className="flex-1 bg-[#3EFFA8] rounded" style={{ height: `${height}%` }} />
            ))}
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#60A5FA] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#60A5FA] bg-opacity-20 rounded-lg">
                <Users className="h-6 w-6 text-[#60A5FA]" />
              </div>
              <div>
                <p className="text-[#C9CFD6] text-sm font-medium">Active Applicants</p>
                <p className="text-3xl font-bold text-[#FFFFFF]">{stats.receivedApplications}</p>
              </div>
            </div>
            <Users className="w-5 h-5 text-[#60A5FA]" />
          </div>
          <div className="text-sm text-[#C9CFD6]">+8.2% application rate</div>
          <div className="mt-3 w-full h-8 bg-[#111315] rounded flex items-end gap-1 p-1">
            {[40, 65, 55, 75, 80, 70, 95].map((height, i) => (
              <div key={i} className="flex-1 bg-[#60A5FA] rounded" style={{ height: `${height}%` }} />
            ))}
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#F59E0B] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#F59E0B] bg-opacity-20 rounded-lg">
                <Target className="h-6 w-6 text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-[#C9CFD6] text-sm font-medium">Shortlisted</p>
                <p className="text-3xl font-bold text-[#FFFFFF]">{stats.hiredFreelancers}</p>
              </div>
            </div>
            <Target className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="text-sm text-[#C9CFD6]">+15.3% conversion rate</div>
          <div className="mt-3 w-full h-8 bg-[#111315] rounded flex items-end gap-1 p-1">
            {[30, 45, 60, 50, 70, 80, 85].map((height, i) => (
              <div key={i} className="flex-1 bg-[#F59E0B] rounded" style={{ height: `${height}%` }} />
            ))}
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 text-[#E2E8F0] shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#EF4444] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#EF4444] bg-opacity-20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-[#EF4444]" />
              </div>
              <div>
                <p className="text-[#C9CFD6] text-sm font-medium">Time to Hire</p>
                <p className="text-3xl font-bold text-[#FFFFFF]">{stats.successRate}<span className="text-lg text-[#C9CFD6]"> days</span></p>
              </div>
            </div>
            <Clock className="w-5 h-5 text-[#EF4444]" />
          </div>
          <div className="text-sm text-[#C9CFD6]">+2.1% improvement</div>
          <div className="mt-3 w-full h-8 bg-[#111315] rounded flex items-end gap-1 p-1">
            {[55, 40, 65, 50, 45, 60, 50].map((height, i) => (
              <div key={i} className="flex-1 bg-[#EF4444] rounded" style={{ height: `${height}%` }} />
            ))}
          </div>
        </Card>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Hiring Funnel Analysis */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8]">
          <div className="flex items-center gap-3 mb-6">
            <PieChart className="w-6 h-6 text-[#3EFFA8]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Hiring Funnel</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={hiringFunnelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {hiringFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {hiringFunnelData.map((stage, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ background: stage.color }}></div>
                <div>
                  <p className="text-sm text-[#FFFFFF] font-medium">{stage.stage}</p>
                  <p className="text-xs text-[#C9CFD6]">{stage.count} ({stage.percentage}%)</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Time-to-Fill Trends */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#60A5FA]">
          <div className="flex items-center gap-3 mb-6">
            <LineChart className="w-6 h-6 text-[#60A5FA]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Time-to-Fill Trends</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={timeToFillData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#23262B" />
                <XAxis dataKey="month" stroke="#C9CFD6" />
                <YAxis stroke="#C9CFD6" />
                <Tooltip contentStyle={{ background: '#1A1D21', border: '1px solid #23262B' }} />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="#60A5FA"
                  strokeWidth={3}
                  dot={{ fill: '#60A5FA', strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#3EFFA8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#A855F7]">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-[#A855F7]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, i) => (
              <div key={i} className="p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className={`w-4 h-4 ${insight.impact === 'High' ? 'text-[#EF4444]' : 'text-[#F59E0B]'}`} />
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    insight.impact === 'High' ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]' :
                    'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                  }`}>
                    {insight.impact} Impact
                  </span>
                  <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
                </div>
                <p className="text-[#C9CFD6] text-sm">{insight.insight}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Effectiveness */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#F59E0B]">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-[#F59E0B]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Source Effectiveness</h3>
          </div>
          <div className="space-y-4">
            {sourceEffectivenessData.map((source, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#FFFFFF] font-medium">{source.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[#C9CFD6] text-sm">{source.hires} hires</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      source.roi > 150 ? 'bg-green-900 text-green-300' :
                      source.roi > 120 ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      ROI: {source.roi}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#111315] rounded-full h-2">
                  <div
                    className="bg-[#F59E0B] h-2 rounded-full"
                    style={{ width: `${(source.hires / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Predictive Hiring */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#EF4444]">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#EF4444]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Predictive Hiring (Q4 2025)</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictiveHiringData}>
                <defs>
                  <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3EFFA8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3EFFA8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#C9CFD6" />
                <YAxis stroke="#C9CFD6" />
                <Tooltip contentStyle={{ background: '#1A1D21', border: '1px solid #23262B' }} />
                <Area type="monotone" dataKey="predicted" stroke="#3EFFA8" fillOpacity={1} fill="url(#predictedGradient)" />
                <Area type="monotone" dataKey="actual" stroke="#EF4444" fillOpacity={1} fill="url(#actualGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#3EFFA8] rounded"></div>
              <span className="text-[#C9CFD6]">Predicted Hires</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#EF4444] rounded"></div>
              <span className="text-[#C9CFD6]">Actual Hires</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Diversity & Compliance Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Diversity Metrics */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#EC4899]">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#EC4899]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Diversity Metrics</h3>
          </div>
          <div className="space-y-6">
    {diversityData.map((metric, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#FFFFFF] font-medium">{(metric as any).category}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    (metric as any).women >= (metric as any).target ? 'bg-green-900 text-green-300' :
                    (metric as any).women >= (metric as any).target - 5 ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    Target: {(metric as any).target}%
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#C9CFD6]">Women: {(metric as any).women}%</span>
                    <span className="text-[#C9CFD6]">Men: {(metric as any).men}%</span>
                  </div>
                  <div className="w-full bg-[#111315] rounded-full h-2">
                    <div
                      className="bg-[#EC4899] h-2 rounded-full"
                      style={{ width: `${(metric as any).women}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Dashboard */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#10B981]">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#10B981]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Compliance Status</h3>
          </div>
          <div className="space-y-4">
            {complianceData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'Green' ? 'bg-green-400' :
                    item.status === 'Yellow' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="text-[#FFFFFF] font-medium">{item.metric}</p>
                    <p className="text-[#C9CFD6] text-sm">Score: {item.score}%</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'Green' ? 'bg-green-900 text-green-300' :
                  item.status === 'Yellow' ? 'bg-yellow-900 text-yellow-300' :
                  'bg-red-900 text-red-300'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-time Activity Feed */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#8B5CF6]">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#8B5CF6]" />
            <h3 className="text-xl font-bold text-[#FFFFFF]">Live Activity Feed</h3>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {realTimeActivity.map((activity, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg ${
                activity.type === 'success' ? 'bg-green-900 bg-opacity-20 border-l-4 border-green-400' :
                activity.type === 'interview' ? 'bg-blue-900 bg-opacity-20 border-l-4 border-blue-400' :
                activity.type === 'update' ? 'bg-yellow-900 bg-opacity-20 border-l-4 border-yellow-400' :
                'bg-[#111315] border-l-4 border-[#3EFFA8]'
              }`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'interview' ? 'bg-blue-400' :
                  activity.type === 'update' ? 'bg-yellow-400' :
                  'bg-[#3EFFA8]'
                }`}></div>
                <div className="flex-1">
                  <p className="text-[#FFFFFF] text-sm font-medium">{activity.action}</p>
                  <p className="text-[#C9CFD6] text-xs">{activity.user} • {activity.role}</p>
                  <p className="text-[#8A8F98] text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Geographic Talent Map */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#06B6D4]">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-[#06B6D4]" />
          <h3 className="text-xl font-bold text-[#FFFFFF]">Talent Distribution</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {geographicData.map((location, i) => (
            <div key={i} className="text-center p-4 rounded-lg bg-[#111315] border border-[#23262B]">
              <div className="text-2xl font-bold text-[#FFFFFF] mb-1">{location.hires}</div>
              <div className="text-[#C9CFD6] font-medium">{location.city}</div>
              <div className="flex justify-center gap-2 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#3EFFA8] rounded"></div>
                  <span className="text-[#8A8F98]">{location.remote}R</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#EF4444] rounded"></div>
                  <span className="text-[#8A8F98]">{location.onsite}O</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* AI-Powered Recommendations */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#8B5CF6]">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-[#8B5CF6]" />
          <h3 className="text-xl font-bold text-[#FFFFFF]">AI Talent Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Alex Chen', role: 'Senior React Developer', match: 97, skills: ['React', 'TypeScript', 'Node.js'], insights: 'Strong technical background, recent projects match requirements perfectly' },
            { name: 'Sarah Kumar', role: 'UX/UI Designer', match: 94, skills: ['Figma', 'Sketch', 'Design Systems'], insights: 'Creative portfolio, excellent communication skills, team player' },
            { name: 'Mike Rodriguez', role: 'Full Stack Engineer', match: 91, skills: ['React', 'Python', 'AWS'], insights: 'Experienced developer, great problem-solving skills, remote work ready' }
          ].map((candidate, i) => (
            <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-[#111315] to-[#0D0F11] border border-[#23262B] hover:border-[#8B5CF6]">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium">{candidate.name}</h4>
                  <p className="text-[#C9CFD6] text-sm">{candidate.role}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    candidate.match >= 95 ? 'text-green-400' :
                    candidate.match >= 90 ? 'text-yellow-400' :
                    'text-[#8B5CF6]'
                  }`}>
                    {candidate.match}%
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {candidate.skills.slice(0, 3).map((skill, j) => (
                  <span key={j} className="px-2 py-1 bg-[#8B5CF6] bg-opacity-20 text-[#8B5CF6] text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-[#C9CFD6] text-xs mb-4">{candidate.insights}</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white flex-1">
                  Shortlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Next-Generation AI Features */}
      <div className="mt-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-8 h-8 text-[#FFD700]" />
          <div>
            <h2 className="text-3xl font-bold text-[#FFFFFF]">Next-Generation AI Suite</h2>
            <p className="text-[#C9CFD6] text-lg">Cutting-edge AI capabilities for intelligent hiring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Smart Resume Intelligence */}
          <Card className="bg-gradient-to-br from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-6 shadow-[0_4px_18px_rgba(255,215,0,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-[#FFD700]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">Smart Resume Intelligence</h3>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#FFD700] font-medium">Automatic Skill Extraction</h4>
              {aiAdvancedFeatures.resumeParsing.map((candidate, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#111315] border border-[#FFD700] border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FFFFFF] font-medium">{candidate.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      candidate.score >= 90 ? 'bg-green-900 text-green-300' :
                      candidate.score >= 85 ? 'bg-yellow-900 text-yellow-300' :
                      'bg-[#FFD700] bg-opacity-20 text-[#FFD700]'
                    }`}>
                      Score: {candidate.score}
                    </span>
                  </div>
                  <p className="text-[#C9CFD6] text-sm mb-2">Skills: {candidate.skills.join(', ')}</p>
                  <p className="text-[#8A8F98] text-xs">Experience: {candidate.experience}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Cultural Fit Prediction */}
          <Card className="bg-gradient-to-br from-[#1A1D21] to-[#0D0F11] border border-[#EC4899] border-opacity-30 rounded-2xl p-6 shadow-[0_4px_18px_rgba(236,72,153,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[#EC4899]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">Cultural Fit Prediction</h3>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#EC4899] font-medium">Personality Assessment</h4>
              {aiAdvancedFeatures.culturalFit.map((candidate, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#111315] border border-[#EC4899] border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FFFFFF] font-medium">{candidate.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#EC4899] font-bold">{candidate.culture_score}%</span>
                      <TrendingUp className="w-4 h-4 text-[#EC4899]" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#C9CFD6]">{candidate.growth}</span>
                      <span className="text-[#C9CFD6]">{candidate.adaptability}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#C9CFD6]">{candidate.collaboration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Flight Risk Analysis */}
          <Card className="bg-gradient-to-br from-[#1A1D21] to-[#0D0F11] border border-[#DC2626] border-opacity-30 rounded-2xl p-6 shadow-[0_4px_18px_rgba(220,38,38,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-[#EF4444]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">Flight Risk Analysis</h3>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#EF4444] font-medium">Retention Intelligence</h4>
              {aiAdvancedFeatures.flightRisk.map((candidate, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#111315] border border-[#EF4444] border-opacity-20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FFFFFF] font-medium">{candidate.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      candidate.risk === 'Low' ? 'bg-green-900 text-green-300' :
                      candidate.risk === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {candidate.risk} Risk
                    </span>
                  </div>
                  <p className="text-[#C9CFD6] text-sm mb-2">{candidate.factors}</p>
                  <p className="text-[#8A8F98] text-xs">💡 {candidate.mitigation}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* AI Interview Question Generator */}
          <Card className="bg-gradient-to-br from-[#1A1D21] to-[#0D0F11] border border-[#8B5CF6] border-opacity-30 rounded-2xl p-6 shadow-[0_4px_18px_rgba(139,92,246,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-[#8B5CF6]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">AI Interview Questions</h3>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#8B5CF6] font-medium">Smart Question Generation</h4>
              {aiAdvancedFeatures.interviewQuestions.map((question, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#111315] border border-[#8B5CF6] border-opacity-20">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8B5CF6] bg-opacity-20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#8B5CF6] font-bold">Q{i+1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          question.difficulty === 'Advanced' ? 'bg-red-900 text-red-300' :
                          question.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-green-900 text-green-300'
                        }`}>
                          {question.difficulty}
                        </span>
                        <span className="text-[#C9CFD6] text-sm">{question.category}</span>
                      </div>
                      <p className="text-[#FFFFFF] font-medium mb-2">{question.question}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[#8A8F98] text-sm">For: {question.role}</span>
                        <Button size="sm" variant="outline" className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white ml-auto">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Smart Compensation Intelligence */}
          <Card className="bg-gradient-to-br from-[#1A1D21] to-[#0D0F11] border border-[#10B981] border-opacity-30 rounded-2xl p-6 shadow-[0_4px_18px_rgba(16,185,129,0.15)]">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-[#10B981]" />
              <h3 className="text-xl font-bold text-[#FFFFFF]">Compensation Intelligence</h3>
            </div>
            <div className="space-y-4">
              <h4 className="text-[#10B981] font-medium">Market-Based Offer Optimization</h4>
              {aiAdvancedFeatures.salaryOptimization.map((offer, i) => (
                <div key={i} className="p-4 rounded-lg bg-[#111315] border border-[#10B981] border-opacity-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#FFFFFF] font-medium">{offer.role}</span>
                    <div className="text-right">
                      <div className="text-[#10B981] font-bold">${offer.recommended}k</div>
                      <div className="text-[#C9CFD6] text-xs">Range: {offer.marketRate}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#C9CFD6]">Equity: {offer.equity}</span>
                      <span className="text-[#10B981] font-medium">Offer Score: 94%</span>
                    </div>
                    <div className="w-full bg-[#23262B] rounded-full h-2">
                      <div className="bg-[#10B981] h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <p className="text-[#8A8F98] text-xs">📊 {offer.factors}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI Workflow Automation */}
        <Card className="bg-gradient-to-br from-[#0D0F11] to-[#000000] border-2 border-[#FFD700] rounded-2xl p-6 shadow-[0_8px_32px_rgba(255,215,0,0.2)] mt-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#FFD700] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-2xl font-bold text-[#FFFFFF] mb-2">Automated Hiring Workflows</h3>
            <p className="text-[#C9CFD6]">AI-powered recruitment automation with smart triggers and decision support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-[#1A1D21] border border-[#FFD700] border-opacity-20">
              <Calendar className="w-8 h-8 text-[#FFD700] mx-auto mb-3" />
              <h4 className="text-[#FFFFFF] font-medium mb-2">Interview Scheduling</h4>
              <p className="text-[#C9CFD6] text-sm">AI finds optimal times based on calendars and preferences</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#1A1D21] border border-[#FFD700] border-opacity-20">
              <Shield className="w-8 h-8 text-[#FFD700] mx-auto mb-3" />
              <h4 className="text-[#FFFFFF] font-medium mb-2">Background Checks</h4>
              <p className="text-[#C9CFD6] text-sm">Automated verification with risk assessment scoring</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#1A1D21] border border-[#FFD700] border-opacity-20">
              <CheckCircle className="w-8 h-8 text-[#FFD700] mx-auto mb-3" />
              <h4 className="text-[#FFFFFF] font-medium mb-2">Offer Generation</h4>
              <p className="text-[#C9CFD6] text-sm">Smart offer letters with market benchmarking</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black font-bold px-8 py-3">
              <Zap className="w-5 h-5 mr-2" />
              Activate AI Workflows
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
