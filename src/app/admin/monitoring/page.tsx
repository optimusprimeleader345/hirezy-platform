'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { MonitoringSidebar } from '@/components/MonitoringSidebar'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { HeatmapComponent } from '@/components/Chart/HeatmapComponent'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Zap, TrendingUp, Activity, Shield, BarChart3, DollarSign, AlertTriangle } from 'lucide-react'
import {
  platformGrowthData,
  aiPlatformHealth,
  userActivityHeatmap,
  fraudDetectionData,
  topSkillsTrends,
  revenueOverview
} from '@/lib/demoData'

function MonitoringContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'platform-growth'

  const renderContent = () => {
    switch (activeTab) {
      case 'platform-growth':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Platform Growth Insights</h1>
              <p className="text-slate-300">Track user acquisition and platform expansion metrics</p>
            </div>
            <ChartWrapper
              title="Platform User Growth Trends (Last 6 Months)"
              data={platformGrowthData}
              dataKeys={['students', 'recruiters']}
              colors={['#3B82F6', '#EF4444']}
              type="line"
              className="w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <AdminGlassCard title="Growth Rate">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">+42.5%</div>
                  <div className="text-sm text-slate-400">Monthly Growth Rate</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Total Users">
                <div className="text-center py-6">
                  <Activity className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">27,980</div>
                  <div className="text-sm text-slate-400">Active Platform Users</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Conversion Rate">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">6.8%</div>
                  <div className="text-sm text-slate-400">Lead to User Conversion</div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'ai-health':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">AI Platform Health Monitor</h1>
              <p className="text-slate-300">Real-time monitoring of AI system performance and usage</p>
            </div>
            <AdminGlassCard title="AI Platform Health Overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <Zap className="h-8 w-8 text-yellow-400" />
                    <div>
                      <div className="text-sm text-slate-400">AI Requests Today</div>
                      <div className="text-2xl font-bold text-white">{aiPlatformHealth.aiRequestsToday.toLocaleString()}</div>
                      <div className="text-xs text-green-400">+12% from yesterday</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    High Activity
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                      <div className="text-2xl font-bold text-white">{aiPlatformHealth.aiSuccessRate}%</div>
                      <div className="text-xs text-green-400">Excellent performance</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    Excellent
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-4">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                    <div>
                      <div className="text-sm text-slate-400">Avg Latency</div>
                      <div className="text-2xl font-bold text-white">{aiPlatformHealth.latencyMs}ms</div>
                      <div className="text-xs text-green-400">Under 200ms target</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 text-xs rounded-full bg-green-600">
                    Excellent
                  </div>
                </div>
              </div>
            </AdminGlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdminGlassCard title="AI Service Uptime">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">OpenAI API</span>
                    <span className="text-green-400 font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Google AI API</span>
                    <span className="text-green-400 font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Resume Analyzer</span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Interview Coach</span>
                    <span className="text-green-400 font-semibold">99.7%</span>
                  </div>
                </div>
              </AdminGlassCard>

              <AdminGlassCard title="AI Feature Usage">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Resume AI (Today)</span>
                    <span className="text-white font-semibold">2,342 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Career Coach (Today)</span>
                    <span className="text-white font-semibold">1,856 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Interview Prep (Today)</span>
                    <span className="text-white font-semibold">987 uses</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Job Matching (Today)</span>
                    <span className="text-white font-semibold">3,421 matches</span>
                  </div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'user-heatmap':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">User Activity Heatmap</h1>
              <p className="text-slate-300">Visualize peak usage hours and activity patterns across days</p>
            </div>
            <HeatmapComponent
              title="Weekly User Activity Patterns"
              data={userActivityHeatmap}
            />
            <AdminGlassCard title="Activity Insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Peak Hours Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Peak weekday hours:</span>
                      <span className="text-white font-semibold">2-4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Peak weekend hours:</span>
                      <span className="text-white font-semibold">10 AM-1 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Lowest activity:</span>
                      <span className="text-white font-semibold">3-6 AM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">User Behavior Patterns</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg session duration:</span>
                      <span className="text-white font-semibold">18.5 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Most active day:</span>
                      <span className="text-white font-semibold">Tuesday</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Mobile vs Desktop:</span>
                      <span className="text-white font-semibold">62% / 38%</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>
        )

      case 'fraud-detection':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Fraud Detection Dashboard</h1>
              <p className="text-slate-300">AI-powered security monitoring and risk assessment</p>
            </div>
            <AdminGlassCard title="Security Overview Cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-red-900/30 rounded-lg border border-red-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-red-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-red-600">High Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-red-400">Suspicious Accounts</div>
                    <div className="text-2xl font-bold text-white">{fraudDetectionData.suspiciousAccounts}</div>
                    <div className="text-xs text-slate-400">{fraudDetectionData.lastDetection}</div>
                  </div>
                </div>
                <div className="p-6 bg-orange-900/30 rounded-lg border border-orange-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="h-8 w-8 text-orange-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-orange-600">Medium Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-orange-400">High Risk Activities</div>
                    <div className="text-2xl font-bold text-white">{fraudDetectionData.highRiskActivities}</div>
                    <div className="text-xs text-slate-400">All monitored</div>
                  </div>
                </div>
                <div className="p-6 bg-yellow-900/30 rounded-lg border border-yellow-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-yellow-400" />
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-600">Low Risk</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-yellow-400">Auto-Flagged Proposals</div>
                    <div className="text-2xl font-bold text-white">{fraudDetectionData.autoFlaggedProposals}</div>
                    <div className="text-xs text-slate-400">Under review</div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AdminGlassCard title="Security Alerts History">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-300">Login from unknown location</span>
                    <span className="text-xs text-red-400">2 min ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-300">Bulk account creation detected</span>
                    <span className="text-xs text-orange-400">15 min ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-300">Suspicious payment pattern</span>
                    <span className="text-xs text-yellow-400">1 hour ago</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-300">IP address blocked</span>
                    <span className="text-xs text-green-400">2 hours ago</span>
                  </div>
                </div>
              </AdminGlassCard>

              <AdminGlassCard title="AI Fraud Prevention Stats">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-300">False positives today:</span>
                    <span className="text-white font-semibold">0.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Accuracy rate:</span>
                    <span className="text-green-400 font-semibold">98.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Threats blocked (week):</span>
                    <span className="text-white font-semibold">47 attempts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">System uptime:</span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      case 'skills-trends':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Top Skills Trends Analysis</h1>
              <p className="text-slate-300">Track the most in-demand skills and growth trends</p>
            </div>
            <ChartWrapper
              title="Skill Growth Trends (Monthly Change %)"
              data={topSkillsTrends}
              dataKey="growth"
              type="bar"
              colors={['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444']}
              className="w-full"
            />
            <AdminGlassCard title="Skills Market Insights">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Top Growing Skills</h3>
                  <div className="space-y-3">
                    {topSkillsTrends.slice(0, 3).map((skill, index) => (
                      <div key={skill.skill} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                            index === 0 ? 'bg-purple-600' : index === 1 ? 'bg-blue-600' : 'bg-green-600'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-white font-medium">{skill.skill}</span>
                        </div>
                        <span className="text-green-400 font-semibold">+{skill.growth}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Market Demand</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Jobs posting skills:</span>
                      <span className="text-white font-semibold">1,245 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Students learning:</span>
                      <span className="text-white font-semibold">3,892 enrolled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg. salary premium:</span>
                      <span className="text-white font-semibold">+$15,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Hiring difficulty:</span>
                      <span className="text-red-400 font-semibold">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>
        )

      case 'revenue-analytics':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Revenue Analytics Overview</h1>
              <p className="text-slate-300">Platform revenue, commission income, and financial performance</p>
            </div>
            <ChartWrapper
              title="Revenue & Commission Trends (Last 6 Months)"
              data={revenueOverview}
              dataKeys={['platformRevenue', 'commission']}
              colors={['#10B981', '#06B6D4']}
              type="area"
              className="w-full"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AdminGlassCard title="Monthly Revenue">
                <div className="text-center py-6">
                  <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$55,700</div>
                  <div className="text-sm text-green-400">+23% from last month</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Total Commission">
                <div className="text-center py-6">
                  <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">$15,420</div>
                  <div className="text-sm text-blue-400">18.3% of total revenue</div>
                </div>
              </AdminGlassCard>
              <AdminGlassCard title="Growth Rate">
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">+31.8%</div>
                  <div className="text-sm text-purple-400">Year over year growth</div>
                </div>
              </AdminGlassCard>
            </div>
          </div>
        )

      default:
        return <div>Select a monitoring tab from the sidebar</div>
    }
  }

  return (
    <div className="flex min-h-screen">
      <MonitoringSidebar activeTab={activeTab} />
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  )
}

export default function MonitoringPage() {
  return (
    <Suspense fallback={<div>Loading monitoring dashboard...</div>}>
      <MonitoringContent />
    </Suspense>
  )
}
