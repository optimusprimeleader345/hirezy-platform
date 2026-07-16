'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'

export function IndustryComparison() {
  const industries = [
    {
      name: 'Tech/Mobile Development',
      jobs: 45000,
      growth: 28,
      avgSalary: '14 LPA',
      demand: '🔥 High',
      risk: 'Low',
      description: 'Stable growth with strong future prospects'
    },
    {
      name: 'Data Science & AI',
      jobs: 32000,
      growth: 45,
      avgSalary: '16 LPA',
      demand: '🚀 Explosive',
      risk: 'Medium',
      description: 'Rapidly growing field with high earning potential'
    },
    {
      name: 'Cloud & DevOps',
      jobs: 38000,
      growth: 35,
      avgSalary: '15 LPA',
      demand: '🌟 High',
      risk: 'Low',
      description: 'Essential infrastructure roles with steady demand'
    },
    {
      name: 'Blockchain & Web3',
      jobs: 12000,
      growth: 65,
      avgSalary: '18 LPA',
      demand: '💎 Emerging',
      risk: 'High',
      description: 'Cutting-edge technology with volatile market'
    },
    {
      name: 'Cybersecurity',
      jobs: 29000,
      growth: 30,
      avgSalary: '13 LPA',
      demand: '🛡️ Strong',
      risk: 'Low',
      description: 'Critical security roles with guaranteed demand'
    },
    {
      name: 'IoT & Hardware',
      jobs: 21000,
      growth: 25,
      avgSalary: '12 LPA',
      demand: '⚙️ Steady',
      risk: 'Medium',
      description: 'Specialized hardware development and integration'
    }
  ]

  return (
    <GlassCard title="Industry Comparison Analysis">
      <div className="space-y-6">
        <div className="text-center">
          <Activity className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Career-Specific Industry Insights</h3>
          <p className="text-white/70 text-sm">
            Compare career paths across different industries with real-time market data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industries.map((industry, index) => (
            <div key={industry.name} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold text-sm">{industry.name}</h4>
                <span className="text-purple-400 font-medium">{industry.demand}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Job Market:</span>
                  <span className="text-white">{industry.jobs.toLocaleString()}+ openings</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Growth Rate:</span>
                  <div className="flex items-center text-green-400">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{industry.growth}%
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Avg Salary:</span>
                  <span className="text-green-400 font-medium">{industry.avgSalary}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/70">Risk Level:</span>
                  <span className={`font-medium ${
                    industry.risk === 'Low' ? 'text-green-400' :
                    industry.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {industry.risk}
                  </span>
                </div>

                <div className="border-t border-white/10 pt-2 mt-3">
                  <p className="text-white/60 text-xs">{industry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Career Trends by Industry</h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="bg-green-500/20 rounded-lg p-2">
                <div className="text-green-400 font-bold">+35%</div>
                <div className="text-white/70">Tech Growth Rate</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-2">
                <div className="text-purple-400 font-bold">$18 LPA</div>
                <div className="text-white/70">Data Science Avg</div>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-2">
                <div className="text-yellow-400 font-bold">12 LPA</div>
                <div className="text-white/70">Specialized Medians</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
