'use client'

import { useState } from 'react'
import { Download, Settings2, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import {
  getCurrentMonthMetrics,
  predictiveMetrics,
  budgetAnalytics,
  recruitmentFunnelData,
  sourceOfHireData,
  teamPerformanceData
} from '@/lib/ai/recruiter/advancedAnalyticsData'

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('12 months')
  const { currentMonth, trends } = getCurrentMonthMetrics()

  const exportData = () => {
    alert('Analytics data exported successfully!')
  }

  const getKPIColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-green-400'
      case 'down': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getKPIIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="w-4 h-4" />
      case 'down': return <TrendingDown className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Recruitment Analytics</h1>
          <p className="text-gray-300">
            Advanced insights and predictive metrics for data-driven hiring decisions
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white/5 border-white/20 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="3 months" className="bg-gray-800">Last 3 months</option>
            <option value="6 months" className="bg-gray-800">Last 6 months</option>
            <option value="12 months" className="bg-gray-800">Last 12 months</option>
            <option value="24 months" className="bg-gray-800">Last 24 months</option>
          </select>

          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Settings2 className="w-4 h-4 mr-2" />
            Customize
          </Button>

          <Button
            onClick={exportData}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards Row - with trend indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Total Hires</p>
              <p className="text-2xl font-bold text-white">{currentMonth.hired}</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${getKPIColor(trends.hires.direction)}`}>
                {getKPIIcon(trends.hires.direction)}
                <span>{trends.hires.formatted} from last month</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Time to Fill</p>
              <p className="text-2xl font-bold text-white">{currentMonth.timeToFill}d</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${getKPIColor(trends.timeToFill.direction)}`}>
                {getKPIIcon(trends.timeToFill.direction)}
                <span>{trends.timeToFill.formatted} vs industry avg</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Cost per Hire</p>
              <p className="text-2xl font-bold text-white">${currentMonth.costPerHire.toLocaleString()}</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${getKPIColor(trends.costPerHire.direction)}`}>
                {getKPIIcon(trends.costPerHire.direction)}
                <span>{trends.costPerHire.formatted} efficiency</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-300">Quality Score</p>
              <p className="text-2xl font-bold text-white">{currentMonth.qualityOfHire}%</p>
              <div className={`flex items-center gap-1 mt-2 text-sm ${getKPIColor('up')}`}>
                <TrendingUp className="w-4 h-4" />
                <span>Above target benchmarks</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Prediction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Monthly Forecast</p>
              <p className="text-2xl font-bold text-white">
                {predictiveMetrics.avgTimeToFillForecast} days
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Predicted time to fill next month
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-300">Talent Market</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                predictiveMetrics.talentMarketTrend === 'hot'
                  ? 'bg-red-500/20 text-red-400'
                  : predictiveMetrics.talentMarketTrend === 'cold'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {predictiveMetrics.talentMarketTrend.toUpperCase()}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Confidence</span>
                <span className="text-green-400 font-medium">{predictiveMetrics.confidenceLevel}%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Recommended Hiring</p>
              <p className="text-2xl font-bold text-white">
                {predictiveMetrics.recommendedGigsNextMonth}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                New positions for January
              </p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-xs text-gray-400">Based on:</div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-300">Department growth targets</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Historical attrition rates</span>
            </div>
          </div>
        </Card>

        {/* Budget ROI Card */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Budget Efficiency</p>
              <p className="text-2xl font-bold text-white">${budgetAnalytics.avgCostPerHire.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">
                Average cost per hire this month
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-300">Utilization</span>
              <span className="text-green-400 font-medium">
                {((budgetAnalytics.spent / budgetAnalytics.totalBudget) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${(budgetAnalytics.spent / budgetAnalytics.totalBudget) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>${budgetAnalytics.spent.toLocaleString()} spent</span>
              <span>${budgetAnalytics.remaining.toLocaleString()} left</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section - Simplified */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recruitment Funnel */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recruitment Funnel</h3>
          <div className="space-y-4">
            {recruitmentFunnelData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div
                  className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden"
                  style={index === 0 ? {} : { opacity: 0.7 }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: stage.color,
                      width: `${stage.percentage}%`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="text-white font-medium text-sm">{stage.stage}</span>
                    <span className="text-white font-semibold">{stage.count}</span>
                  </div>
                </div>
                <span className="text-gray-400 text-sm w-12">{stage.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Source of Hire */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Source of Hire</h3>
          <div className="space-y-3">
            {sourceOfHireData.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-300 font-semibold text-sm">
                      {source.source.charAt(0)}
                    </span>
                  </div>
                  <span className="text-white font-medium">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{source.count}</div>
                  <div className="text-gray-400 text-sm">{source.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Team Performance Table */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Team Performance</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            View Details
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 text-gray-300 font-medium">Recruiter</th>
                <th className="text-center py-3 text-gray-300 font-medium">Hires</th>
                <th className="text-center py-3 text-gray-300 font-medium">Avg Time to Fill</th>
                <th className="text-center py-3 text-gray-300 font-medium">Quality Score</th>
                <th className="text-center py-3 text-gray-300 font-medium">Efficiency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {teamPerformanceData.map((recruiter, index) => (
                <tr key={index} className="hover:bg-white/5">
                  <td className="py-4 text-white font-medium">{recruiter.recruiter}</td>
                  <td className="py-4 text-center text-white">{recruiter.hires}</td>
                  <td className="py-4 text-center">
                    <span className="text-white">{recruiter.timeToFill}d</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className="text-green-400 font-medium">{recruiter.qualityScore}%</span>
                  </td>
                  <td className="py-4 text-center">
                    <span className={`${recruiter.efficiency >= 0.20 ? 'text-green-400' : recruiter.efficiency >= 0.15 ? 'text-yellow-400' : 'text-red-400'} font-medium`}>
                      {recruiter.efficiency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
