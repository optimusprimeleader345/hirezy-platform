'use client'

import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { TrendingUp, TrendingDown, Zap } from 'lucide-react'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'

export function SkillsTrendChart() {
  // Mock skills trend data over 8 weeks
  const skillsTrend = [
    { week: 'Week 1', react: 35, python: 28, aws: 22, docker: 15, ml: 12 },
    { week: 'Week 2', react: 42, python: 31, aws: 28, docker: 18, ml: 14 },
    { week: 'Week 3', react: 48, python: 38, aws: 35, docker: 22, ml: 18 },
    { week: 'Week 4', react: 55, python: 45, aws: 42, docker: 28, ml: 22 },
    { week: 'Week 5', react: 62, python: 52, aws: 48, docker: 35, ml: 28 },
    { week: 'Week 6', react: 68, python: 58, aws: 55, docker: 42, ml: 32 },
    { week: 'Week 7', react: 74, python: 64, aws: 61, docker: 48, ml: 38 },
    { week: 'Week 8', react: 80, python: 70, aws: 67, docker: 55, ml: 44 }
  ]

  const topSkills = [
    { name: 'React', current: 80, change: '+12.5%', status: 'rising', color: '#61dafb' },
    { name: 'Python', current: 70, change: '+8.2%', status: 'rising', color: '#ffd343' },
    { name: 'AWS', current: 67, change: '+5.8%', status: 'rising', color: '#ff9900' },
    { name: 'Machine Learning', current: 44, change: '+15.2%', status: 'rising', color: '#ff6b6b' },
    { name: 'Docker', current: 55, change: '+3.1%', status: 'stable', color: '#2496ed' }
  ]

  return (
    <AdminGlassCard title="Skills Demand Trends (8 Weeks)">
      <div className="space-y-6">
        {/* Skills legend */}
        <div className="flex flex-wrap gap-4">
          {[
            { name: 'React', color: '#61dafb' },
            { name: 'Python', color: '#ffd343' },
            { name: 'AWS', color: '#ff9900' },
            { name: 'Docker', color: '#2496ed' },
            { name: 'ML', color: '#ff6b6b' }
          ].map(skill => (
            <div key={skill.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-sm text-slate-300">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Area Chart */}
        <ChartWrapper
          title=""
          data={skillsTrend}
          dataKey="react"
          type="area"
          className="h-64"
          colors={['#61dafb', '#ffd343', '#ff9900', '#2496ed', '#ff6b6b']}
        />

        {/* Top Skills Table */}
        <div className="border-t border-slate-600 pt-4">
          <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Top Trending Skills
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSkills.map((skill, index) => (
              <div key={skill.name} className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                  {skill.status === 'rising' && (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Demand</span>
                    <span className="text-white font-bold">{skill.current}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Growth</span>
                    <span className={`font-semibold ${
                      skill.change.startsWith('+') ? 'text-green-400' : 'text-slate-400'
                    }`}>
                      {skill.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminGlassCard>
  )
}
