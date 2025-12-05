'use client'

import React, { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { MetricCard } from '@/components/cards/MetricCard'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { TrendingUp, BarChart, DollarSign, Search, Target, Globe } from 'lucide-react'

export default function MarketDemandPage() {
  const [selectedIndustry, setSelectedIndustry] = useState('technology')

  const skillsData = [
    { month: 'Jan', demand: 85, salary: 15 },
    { month: 'Feb', demand: 88, salary: 16 },
    { month: 'Mar', demand: 90, salary: 17 },
    { month: 'Apr', demand: 93, salary: 18 },
    { month: 'May', demand: 95, salary: 19 },
    { month: 'Jun', demand: 98, salary: 20 }
  ]

  const industryTrends = [
    { skill: 'React.js', demand: 95, change: '+15%', salary: '₹15-25 LPA' },
    { skill: 'Node.js', demand: 90, change: '+12%', salary: '₹12-22 LPA' },
    { skill: 'Python', demand: 88, change: '+18%', salary: '₹10-20 LPA' },
    { skill: 'TypeScript', demand: 92, change: '+22%', salary: '₹14-24 LPA' },
    { skill: 'AWS', demand: 85, change: '+10%', salary: '₹18-30 LPA' }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gradient">Market Demand Intelligence</h1>
        <p className="text-white/70 mt-2">Real-time insights into skill demand and salary trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 text-center">
          <BarChart className="w-12 h-12 mx-auto text-blue-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">95%</h3>
          <p className="text-white/70">Avg. React.js Demand</p>
          <p className="text-sm text-green-400 mt-1">Top 5% in-demand</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-green-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">₹15-25 LPA</h3>
          <p className="text-white/70">React.js Salary Range</p>
          <p className="text-sm text-blue-400 mt-1">+23% year-over-year</p>
        </GlassCard>

        <GlassCard className="p-6 text-center">
          <Target className="w-12 h-12 mx-auto text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">2.1M</h3>
          <p className="text-white/70">Open Job Positions</p>
          <p className="text-sm text-orange-400 mt-1">Growing 15% monthly</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartWrapper
          title="Demand & Salary Trends"
          data={skillsData}
          dataKey="demand"
          className="h-80"
        />

        <GlassCard title="Top In-Demand Skills">
          <div className="space-y-4">
            {industryTrends.map((skill, index) => (
              <div key={skill.skill} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{skill.skill}</div>
                    <div className="text-green-400 text-sm font-medium">{skill.change}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{skill.salary}</div>
                  <div className="text-white/60 text-sm">{skill.demand}% demand</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="text-center py-12">
          <Globe className="w-16 h-16 mx-auto text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Advanced Market Intelligence</h3>
          <p className="text-white/70">Detailed skill gap analysis and market predictions coming soon...</p>
        </div>
      </GlassCard>
    </div>
  )
}
