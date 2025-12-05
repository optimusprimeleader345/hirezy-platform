'use client'

import React from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { MetricCard } from '@/components/cards/MetricCard'
import { TrendingUp, Target, Award, BarChart3 } from 'lucide-react'

export default function PerformancePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient">Performance Analytics</h1>
        <p className="text-white/70 mt-2">Detailed insights into your career progress and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 text-center">
          <Award className="w-12 h-12 mx-auto text-yellow-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">4.8</h3>
          <p className="text-white/70">Overall Rating</p>
          <p className="text-sm text-blue-300 mt-1">Worldwide ranking</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <Target className="w-12 h-12 mx-auto text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">92%</h3>
          <p className="text-white/70">Success Rate</p>
          <p className="text-sm text-blue-300 mt-1">Application acceptance rate</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">+23%</h3>
          <p className="text-white/70">Growth Rate</p>
          <p className="text-sm text-blue-300 mt-1">Monthly improvement</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-orange-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">15 days</h3>
          <p className="text-white/70">Active Streaks</p>
          <p className="text-sm text-blue-300 mt-1">Consistent performance</p>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 mx-auto text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Performance Dashboard</h3>
          <p className="text-white/70">Detailed analytics and performance insights coming soon...</p>
        </div>
      </GlassCard>
    </div>
  )
}
