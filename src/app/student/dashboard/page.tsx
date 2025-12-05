'use client'

import { useEffect, useState, useRef } from 'react'
import { DollarSign, Star, Briefcase, TrendingUp, Users, Calendar, Award, Wallet, Zap, Target, Zap as Lightning, Sparkles } from 'lucide-react'
import { SkeletonStats, SkeletonCard, SkeletonList, SkeletonLoader } from '@/components/ui/SkeletonLoader'
import { GlassCard } from '@/components/cards/GlassCard'
import { MetricCard } from '@/components/cards/MetricCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { GigCard } from '@/components/GigCard'
import { AIGigRecommendations } from '@/components/student/AIGigRecommendations'
import { ResumeAIEnhancer } from '@/components/student/ResumeAIEnhancer'
import { SkillGapAnalyzer } from '@/components/student/SkillGapAnalyzer'
import { CareerPathPredictor } from '@/components/student/CareerPathPredictor'
import { NotificationsPanel } from '@/components/student/NotificationsPanel'
import { UpcomingInterviews } from '@/components/student/UpcomingInterviews'
import { BadgeProgress } from '@/components/student/BadgeProgress'
import { CareerSuggestions } from '@/components/student/CareerSuggestions'
import { SkillScoreVisualization } from '@/components/student/SkillScoreVisualization'
import { WalletSection } from '@/components/student/WalletSection'
import { AIPerformanceScore } from '@/components/student/AIPerformanceScore'
import { SkillGrowthTrend } from '@/components/student/SkillGrowthTrend'
import { WeeklyActivityHeatmap } from '@/components/student/WeeklyActivityHeatmap'
import { AIWeeklySuggestions } from '@/components/student/AIWeeklySuggestions'
import { SkillMatchRadar } from '@/components/student/SkillMatchRadar'
import { CareerRoadmapVisualizer } from '@/components/student/CareerRoadmapVisualizer'
import { AIRecommendationFeed } from '@/components/student/AIRecommendationFeed'
import { LiveJobMatching } from '@/components/student/LiveJobMatching'
import { MarketIntelligenceDashboard } from '@/components/student/MarketIntelligenceDashboard'
import CareerRoadmap from './components/CareerRoadmap'
import { AnalyticsCard } from '@/components/student/AnalyticsCard'
import {
  getStudentUser,
  getGigs,
  getEarnings,
  getStudentStats,
  getNotifications,
  getUpcomingInterviews,
  getBadges,
  getCareerSuggestions,
  getWalletTransactions
} from '@/lib/apiClient'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  profileCompleted: number
}

interface Gig {
  id: number | string
  title: string
  company: string
  salary: string
  skills: string[]
  location: string
  postedDate: string
  description: string
}

interface RevenueData {
  month: string
  earnings: number
}

interface StudentStats {
  totalGigs: number
  shortlistedCount: number
  interviewsScheduled: number
  applicationsSent: number
  proposalsAccepted: number
  averageRating: number
  earnings: number
  monthlyGrowth: number
  walletBalance: number
  skillScore: number
  badgeProgress: number
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [gigs, setGigs] = useState<Gig[]>([])
  const [earnings, setEarnings] = useState<RevenueData[]>([])
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [upcomingInterviews, setUpcomingInterviews] = useState<any[]>([])
  const [badges, setBadges] = useState<any[]>([])
  const [careerSuggestions, setCareerSuggestions] = useState<any[]>([])
  const [walletTransactions, setWalletTransactions] = useState<any[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          userData,
          gigsData,
          earningsData,
          statsData,
          notificationsData,
          interviewsData,
          badgesData,
          suggestionsData,
          walletData
        ] = await Promise.all([
          getStudentUser(),
          getGigs(),
          getEarnings(),
          getStudentStats(),
          getNotifications(),
          getUpcomingInterviews(),
          getBadges(),
          getCareerSuggestions(),
          getWalletTransactions()
        ])
        setUser(userData)
        setGigs(gigsData)
        setEarnings(earningsData)
        setStats(statsData)
        setNotifications(notificationsData)
        setUpcomingInterviews(interviewsData)
        setBadges(badgesData)
        setCareerSuggestions(suggestionsData)
        setWalletTransactions(walletData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }

    loadData()
  }, [])

  if (!user || !stats || !notifications || !upcomingInterviews || !badges || !careerSuggestions || !walletTransactions) {
    return (
      <div className="min-h-screen backdrop-radial">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Loading Welcome Section */}
          <div className="scroll-reveal">
            <SkeletonCard className="p-8 text-center" />
          </div>

          {/* Loading Hero Metrics */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 p-1">
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-xl p-8">
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <SkeletonLoader variant="title" className="w-80 mx-auto" />
                </div>
                <SkeletonStats count={4} />
                <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              </div>
            </div>
          </div>

          {/* Loading AI Features */}
          <div className="scroll-reveal">
            <SkeletonCard className="h-96" />
          </div>

          {/* Loading Market Intelligence */}
          <div className="scroll-reveal">
            <SkeletonCard className="h-80" />
          </div>

          {/* Loading Analytics Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }, (_, i) => (
                <SkeletonCard key={i} className="h-64" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }, (_, i) => (
                <SkeletonCard key={i} className="h-64" />
              ))}
            </div>
          </div>

          {/* Loading Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SkeletonCard className="h-80" />
            </div>
            <SkeletonCard className="h-80" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen backdrop-radial">
      {/* Floating Quick Actions */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-3">
          <button className="neon-gradient-glow p-4 rounded-xl hover:scale-110 transition-all duration-300 group">
            <Target className="w-6 h-6 text-white group-hover:text-cyan-200" />
          </button>
          <button className="neon-gradient-glow p-4 rounded-xl hover:scale-110 transition-all duration-300 group">
            <TrendingUp className="w-6 h-6 text-white group-hover:text-cyan-200" />
          </button>
          <button className="neon-gradient-glow p-4 rounded-xl hover:scale-110 transition-all duration-300 group">
            <Zap className="w-6 h-6 text-white group-hover:text-cyan-200" />
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Welcome Section */}
        <GlassCard className="neon-glow-purple scroll-reveal">
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold text-gradient mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-white/70 text-lg">Ready to discover new opportunities and boost your career?</p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="glass-card px-4 py-2 text-sm text-white/80">
                Profile: {user.profileCompleted}% complete
              </div>
            </div>
          </div>
        </GlassCard>

      </div>

      {/* Hero Metrics Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 p-1">
        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-xl p-8">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Your Performance Overview</h2>

          {/* Primary Metrics Row - Large Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="dashboard-card-hover group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <Briefcase className="h-8 w-8 text-blue-400" />
                    <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +15.3%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stats.totalGigs}</div>
                  <div className="text-blue-200 text-sm">Total Applications</div>
                  <div className="mt-3 h-1 bg-blue-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 w-3/4" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card-hover group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-400/30 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-8 w-8 text-emerald-400" />
                    <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +23.1%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stats.shortlistedCount}</div>
                  <div className="text-emerald-200 text-sm">Shortlisted</div>
                  <div className="mt-3 h-1 bg-emerald-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000 w-2/3" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card-hover group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar className="h-8 w-8 text-orange-400" />
                    <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +28.7%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stats.interviewsScheduled}</div>
                  <div className="text-orange-200 text-sm">Interviews Scheduled</div>
                  <div className="mt-3 h-1 bg-orange-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-1000 w-1/2" />
                  </div>
                </div>
              </div>

              <div className="dashboard-card-hover group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-600/20 border border-cyan-400/30 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <Wallet className="h-8 w-8 text-cyan-400" />
                    <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +18.4%
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">${stats.walletBalance.toLocaleString()}</div>
                  <div className="text-cyan-200 text-sm">Wallet Balance</div>
                  <div className="mt-3 h-1 bg-cyan-900/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transition-all duration-1000 w-5/6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics Row - Smaller Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/70 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-green-400 text-xs font-semibold">+12.2%</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.skillScore}/100</div>
                <div className="text-slate-300 text-sm">Skill Score</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/70 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Star className="h-6 w-6 text-amber-400" />
                  <span className="text-green-400 text-xs font-semibold">+8.9%</span>
                </div>
                <div className="text-2xl font-bold text-white">{stats.badgeProgress}%</div>
                <div className="text-slate-300 text-sm">Badge Progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live AI Job Matching - FEATURED SECTION */}
      <LiveJobMatching />

      {/* Real-Time Market Intelligence Dashboard */}
      <MarketIntelligenceDashboard />

      {/* Analytics Dashboard */}
      <div className="space-y-6">
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <AIPerformanceScore />
          <WeeklyActivityHeatmap />
          <AIWeeklySuggestions />
          <CareerRoadmap />
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkillGrowthTrend />
          <SkillMatchRadar />
          <AIRecommendationFeed />
        </div>
      </div>

      {/* Charts and Recent Gigs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 chart-lift">
          <ChartWrapper
            title="Earnings Overview"
            data={earnings}
            dataKey="earnings"
            className="h-full"
          />
        </div>

        {/* Recent Gigs */}
        <GlassCard title="Recent Gigs">
          <div className="space-y-4">
            <p className="text-white/80 text-sm mb-4">
              Here are some gigs that match your skills. Apply now to increase your chances!
            </p>
            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {gigs.slice(0, 3).map((gig) => (
                <div key={gig.id} className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">
                  <h4 className="font-semibold text-white text-sm mb-1">{gig.title}</h4>
                  <p className="text-white/60 text-xs mb-1">{gig.company}</p>
                  <p className="text-gradient text-xs font-semibold">{gig.salary}</p>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-white/60 text-xs text-center">
                Showing {Math.min(gigs.length, 3)} of {gigs.length} available gigs
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Dashboard Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications && <NotificationsPanel notifications={notifications} />}
        {upcomingInterviews && <UpcomingInterviews interviews={upcomingInterviews} />}
        {stats && <SkillScoreVisualization skillScore={stats.skillScore} />}
      </div>

      {/* Wallet Section */}
      <div className="grid grid-cols-1 gap-8">
        {stats && walletTransactions && (
          <WalletSection
            balance={stats.walletBalance}
            transactions={walletTransactions}
          />
        )}
      </div>

      {/* Additional Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {badges && <BadgeProgress badges={badges} />}
        {careerSuggestions && <CareerSuggestions suggestions={careerSuggestions} />}
      </div>

      {/* Recommended Gigs */}
      <GlassCard title="Recommended Gigs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig.id} gig={{
              ...gig,
              id: typeof gig.id === 'string' ? parseInt(gig.id) || 0 : gig.id
            }} />
          ))}
        </div>
      </GlassCard>

      {/* AI-Powered Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        <SkillGapAnalyzer />
        <AIGigRecommendations />
        <CareerPathPredictor />
        <ResumeAIEnhancer />
      </section>

    </div>
  )
}
