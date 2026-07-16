'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Calendar,
  DollarSign,
  Activity,
  Users,
  Star,
  BookOpen,
  Code,
  MessageSquare,
  Zap,
  Flame,
  Trophy,
  Brain,
  Lightbulb,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  RefreshCw
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Treemap
} from 'recharts'

// Mock data - in real app this would come from API
const performanceData = [
  { month: 'Jan', applications: 12, accepted: 3, interviews: 2, hires: 1 },
  { month: 'Feb', applications: 15, accepted: 4, interviews: 3, hires: 2 },
  { month: 'Mar', applications: 18, accepted: 6, interviews: 4, hires: 2 },
  { month: 'Apr', applications: 22, accepted: 8, interviews: 5, hires: 3 },
  { month: 'May', applications: 25, accepted: 10, interviews: 7, hires: 4 },
  { month: 'Jun', applications: 28, accepted: 12, interviews: 8, hires: 5 }
]

const skillProgressData = [
  { month: 'Jan', react: 65, js: 70, python: 45, design: 60 },
  { month: 'Feb', react: 68, js: 75, python: 52, design: 65 },
  { month: 'Mar', react: 72, js: 80, python: 58, design: 70 },
  { month: 'Apr', react: 78, js: 85, python: 65, design: 75 },
  { month: 'May', react: 82, js: 88, python: 70, design: 80 },
  { month: 'Jun', react: 87, js: 92, python: 76, design: 85 }
]

const marketDemandData = [
  { skill: 'React', demand: 85, salary: 95000, growth: '+12%' },
  { skill: 'JavaScript', demand: 92, salary: 88000, growth: '+8%' },
  { skill: 'Python', demand: 78, salary: 92000, growth: '+15%' },
  { skill: 'Node.js', demand: 82, salary: 89000, growth: '+10%' },
  { skill: 'TypeScript', demand: 88, salary: 98000, growth: '+18%' },
]

const earningsData = [
  { month: 'Jan', earned: 2400, goal: 3000 },
  { month: 'Feb', earned: 3200, goal: 3000 },
  { month: 'Mar', earned: 2800, goal: 3500 },
  { month: 'Apr', earned: 4100, goal: 3500 },
  { month: 'May', earned: 3800, goal: 4000 },
  { month: 'Jun', earned: 5200, goal: 4000 }
]

const learningProgressData = [
  { subject: 'React', completed: 85, total: 100, color: '#8884d8' },
  { subject: 'JavaScript', completed: 92, total: 100, color: '#82ca9d' },
  { subject: 'Python', completed: 76, total: 100, color: '#ffc658' },
  { subject: 'UX Design', completed: 68, total: 100, color: '#ff7c7c' },
  { subject: 'Node.js', completed: 81, total: 100, color: '#8dd1e1' }
]

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']

const kpiData = [
  {
    title: 'Application Success Rate',
    value: '23.8%',
    change: '+5.2%',
    icon: Target,
    trend: 'up',
    color: 'from-green-500 to-emerald-600'
  },
  {
    title: 'Total Earnings',
    value: '$33,500',
    change: '+15.3%',
    icon: DollarSign,
    trend: 'up',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    title: 'Skills Mastered',
    value: '12',
    change: '+3',
    icon: Award,
    trend: 'up',
    color: 'from-purple-500 to-pink-600'
  },
  {
    title: 'Active Projects',
    value: '4',
    change: '-1',
    icon: Activity,
    trend: 'down',
    color: 'from-orange-500 to-red-600'
  }
]

export default function StudentAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('6months')
  const [isLoading, setIsLoading] = useState(false)

  // Simulate data fetching
  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-300 text-lg">Track your progress, visualize trends, and optimize your career journey</p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>

          <button
            onClick={refreshData}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative overflow-hidden bg-gradient-to-br ${kpi.color} p-1 rounded-2xl`}
          >
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <kpi.icon className="w-8 h-8 text-white/80" />
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-white/70 text-sm font-medium">{kpi.title}</p>
                <p className="text-3xl font-bold text-white">{kpi.value}</p>
                <p className={`text-sm ${kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {kpi.change} from last period
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-800/30 p-2 rounded-2xl backdrop-blur-sm">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'applications', label: 'Applications', icon: Target },
          { id: 'skills', label: 'Skills & Learning', icon: Brain },
          { id: 'market', label: 'Market Intelligence', icon: TrendingUp },
          { id: 'earnings', label: 'Earnings', icon: DollarSign },
          { id: 'achievements', label: 'Achievements', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Application Performance */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-400" />
              Application Performance
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-slate-300">Applications</span>
              <div className="w-3 h-3 bg-green-400 rounded-full ml-4"></div>
              <span className="text-slate-300">Accepted</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="applications"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="accepted"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.8}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Brain className="w-5 h-5 text-purple-400" />
              Skill Progression
            </h3>
            <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-sm text-white">
              <option>All Skills</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Python</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="react"
                stroke="#8884d8"
                strokeWidth={2}
                name="React"
              />
              <Line
                type="monotone"
                dataKey="js"
                stroke="#82ca9d"
                strokeWidth={2}
                name="JavaScript"
              />
              <Line
                type="monotone"
                dataKey="python"
                stroke="#ffc658"
                strokeWidth={2}
                name="Python"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Learning Progress
          </h3>

          <div className="space-y-4">
            {learningProgressData.map((item) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{item.subject}</span>
                  <span className="text-slate-300">{item.completed}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${item.completed}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Intelligence */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Market Demand
          </h3>

          <div className="space-y-4">
            {marketDemandData.map((skill, index) => (
              <div key={skill.skill} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-white">{skill.skill}</h4>
                  <p className="text-sm text-slate-400">${skill.salary.toLocaleString()}/year</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">{skill.growth}</div>
                  <div className="text-xs text-slate-500">demand</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 lg:col-span-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <DollarSign className="w-5 h-5 text-green-400" />
            Earnings & Goals
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Legend />
              <Bar
                dataKey="earned"
                fill="#10b981"
                name="Earned ($)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="goal"
                fill="#374151"
                name="Goal ($)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bottom Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-white">AI Insights</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Your Python skills are growing rapidly. Consider applying to ML projects to capitalize on this trend.
          </p>
          <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">
            View Details
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-bold text-white">Achievements</h3>
          </div>
          <p className="text-slate-300 text-sm mb-4">
            Congratulations! You've completed your first full-stack project. Keep up the great work!
          </p>
          <button className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-sm">
            View Badges
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Next Goals</h3>
          </div>
          <ul className="text-slate-300 text-sm space-y-2 mb-4">
            <li>✅ Apply to 3 more gigs this week</li>
            <li>📚 Complete React certification</li>
            <li>🎯 Reach $40k monthly earnings</li>
          </ul>
          <button className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm">
            Update Goals
          </button>
        </div>
      </motion.div>
    </div>
  )
}
