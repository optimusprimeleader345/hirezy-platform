'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Zap, TrendingUp, Activity, Shield, Users, BarChart3, Timer, Star, Award, DollarSign, CheckCircle } from 'lucide-react'
import {
  recruiterHiringAnalytics,
  candidateQualityMetrics,
  timeToHire,
  positionDemand,
  recruiterPerformance,
  aiEfficiencyGains
} from '@/lib/demoData'

function AnalyticsHubContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'hiring-overview'

  const tabButtons = [
    { id: 'hiring-overview', label: 'Hiring Overview', icon: BarChart3 },
    { id: 'candidate-quality', label: 'Candidate Quality', icon: Users },
    { id: 'time-to-hire', label: 'Time to Hire', icon: Timer },
    { id: 'job-demand', label: 'Job Demand', icon: TrendingUp },
    { id: 'recruiter-performance', label: 'Performance', icon: Star },
    { id: 'ai-efficiency', label: 'AI Efficiency', icon: Zap },
  ]

  const renderHiringOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hiring Analytics Overview</h1>
        <p className="text-slate-300">Comprehensive data-driven recruiting insights and hiring performance metrics</p>
      </div>
      <ChartWrapper
        title="Hiring Pipeline Performance (6 Months)"
        data={recruiterHiringAnalytics}
        dataKeys={['interviews', 'hired', 'submitted', 'offers']}
        colors={['#10B981', '#3B82F6', '#F59E0B', '#EF4444']}
        type="line"
        className="w-full"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminGlassCard title="Success Metrics">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-sm text-slate-400">Hires This Quarter</div>
                <div className="text-2xl font-bold text-white">234</div>
                <div className="text-xs text-green-400">+18% from last quarter</div>
              </div>
            </div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard title="Interview Rate">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Timer className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-sm text-slate-400">Interviews Conducted</div>
                <div className="text-2xl font-bold text-white">1,652</div>
                <div className="text-xs text-blue-400">98% candidate satisfaction</div>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'hiring-overview':
        return renderHiringOverview()
      case 'candidate-quality':
        return <div>Recruiter Candidate Quality Tab Content</div>
      case 'time-to-hire':
        return <div>Time to Hire Tab Content</div>
      case 'job-demand':
        return <div>Job Demand Tab Content</div>
      case 'recruiter-performance':
        return <div>Recruiter Performance Tab Content</div>
      case 'ai-efficiency':
        return <div>AI Efficiency Tab Content</div>
      default:
        return renderHiringOverview()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-2">Recruiter Analytics Hub</h1>
        <p className="text-slate-300 mb-8">Data-driven insights to optimize your recruitment strategy and hiring outcomes</p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.set('tab', id)
                window.history.pushState({}, '', url)
                window.location.reload()
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  )
}

export default function AnalyticsHubPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading analytics hub...</div>
      </div>
    }>
      <AnalyticsHubContent />
    </Suspense>
  )
}
