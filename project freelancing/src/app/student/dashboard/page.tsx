'use client'

import { useEffect, useState } from 'react'
import { DollarSign, Star, Briefcase, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { MetricCard } from '@/components/cards/MetricCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { GigCard } from '@/components/GigCard'
import { AIGigRecommendations } from '@/components/student/AIGigRecommendations'
import { ResumeAIEnhancer } from '@/components/student/ResumeAIEnhancer'
import { SkillGapAnalyzer } from '@/components/student/SkillGapAnalyzer'
import { CareerPathPredictor } from '@/components/student/CareerPathPredictor'
import { getUser, getGigs, getEarnings, getStudentStats } from '@/lib/apiClient'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  profileCompleted: number
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

interface RevenueData {
  month: string
  earnings: number
}

interface StudentStats {
  totalGigs: number
  applicationsSent: number
  proposalsAccepted: number
  averageRating: number
  earnings: number
  monthlyGrowth: number
}

export default function StudentDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [gigs, setGigs] = useState<Gig[]>([])
  const [earnings, setEarnings] = useState<RevenueData[]>([])
  const [stats, setStats] = useState<StudentStats | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, gigsData, earningsData, statsData] = await Promise.all([
          getUser(),
          getGigs(),
          getEarnings(),
          getStudentStats()
        ])
        setUser({ ...userData, profileCompleted: (userData as any).profileCompleted ?? 0 } as User)
        setGigs(gigsData)
        setEarnings(earningsData)
        setStats(statsData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      }
    }

    loadData()
  }, [])

  if (!user || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-8 text-white">
          Loading your dashboard...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <GlassCard className="neon-glow-purple">
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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Gigs Applied"
          value={stats.totalGigs}
          icon={<Briefcase className="h-8 w-8 text-white" />}
          change={15.3}
        />
        <MetricCard
          title="Applications Sent"
          value={stats.applicationsSent}
          icon={<TrendingUp className="h-8 w-8 text-white" />}
          change={8.2}
        />
        <MetricCard
          title="Proposals Accepted"
          value={stats.proposalsAccepted}
          icon={<Star className="h-8 w-8 text-white" />}
          change={12.5}
        />
        <MetricCard
          title="Total Earnings"
          value={`$${stats.earnings.toLocaleString()}`}
          icon={<DollarSign className="h-8 w-8 text-white" />}
          change={stats.monthlyGrowth}
        />
      </div>

      {/* Charts and Recent Gigs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2">
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

      {/* Recommended Gigs */}
      <GlassCard title="Recommended Gigs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <GigCard key={gig.id} gig={gig} />
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
