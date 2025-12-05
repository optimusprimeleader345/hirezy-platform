'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Users, Briefcase, BarChart3, RefreshCw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Badge } from '@/components/ui/badge'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'
import { toast } from 'sonner'

interface FinanceOverview {
  totalRevenue: number
  monthlyRevenue: Array<{ month: string; revenue: number; growth: number }>
  totalCommission: number
  totalPayouts: number
  activeProjectsCount: number
  newUsersThisMonth: number
}

interface Transaction {
  id: string
  userId: string
  userName: string
  type: string
  amount: number
  commission: number | null
  status: string
  createdAt: string
}

interface ForecastData {
  nextMonthPrediction: number
  quarterlyGrowth: number
  riskScore: number
  recommendationText: string
}

export default function FinancePage() {
  const [overviewData, setOverviewData] = useState<FinanceOverview | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [forecastData, setForecastData] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState({
    overview: true,
    transactions: true,
    forecast: true
  })

  const fetchOverview = async () => {
    try {
      setLoading(prev => ({ ...prev, overview: true }))
      const response = await fetch('/api/admin/finance/overview')
      if (!response.ok) throw new Error('Failed to fetch overview')

      const data = await response.json()
      setOverviewData(data.data)
    } catch (error) {
      toast.error('Failed to load finance overview')
      console.error('Error fetching overview:', error)
    } finally {
      setLoading(prev => ({ ...prev, overview: false }))
    }
  }

  const fetchTransactions = async () => {
    try {
      setLoading(prev => ({ ...prev, transactions: true }))
      const response = await fetch('/api/admin/finance/transactions')
      if (!response.ok) throw new Error('Failed to fetch transactions')

      const data = await response.json()
      setTransactions(data.transactions || [])
    } catch (error) {
      toast.error('Failed to load transactions')
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }))
    }
  }

  const fetchForecast = async () => {
    try {
      setLoading(prev => ({ ...prev, forecast: true }))
      const response = await fetch('/api/admin/finance/forecast')
      if (!response.ok) throw new Error('Failed to fetch forecast')

      const data = await response.json()
      setForecastData(data.forecast)
    } catch (error) {
      toast.error('Failed to load revenue forecast')
      console.error('Error fetching forecast:', error)
    } finally {
      setLoading(prev => ({ ...prev, forecast: false }))
    }
  }

  useEffect(() => {
    fetchOverview()
    fetchTransactions()
    fetchForecast()
  }, [])

  const getRiskColor = (score: number): string => {
    if (score <= 3) return 'text-green-400'
    if (score <= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getRiskLevel = (score: number): string => {
    if (score <= 3) return 'Low Risk'
    if (score <= 6) return 'Medium Risk'
    return 'High Risk'
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatPercent = (value: number): string => {
    return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`
  }

  const chartData = overviewData ? overviewData.monthlyRevenue.map(item => ({
    month: item.month,
    revenue: item.revenue
  })) : [
    { month: 'Jan', revenue: 34520.50 },
    { month: 'Feb', revenue: 38230.25 },
    { month: 'Mar', revenue: 46750.00 },
    { month: 'Apr', revenue: 41540.25 },
    { month: 'May', revenue: 51120.00 },
    { month: 'Jun', revenue: 54310.50 },
    { month: 'Jul', revenue: 58990.75 },
    { month: 'Aug', revenue: 63520.25 },
    { month: 'Sep', revenue: 67890.50 },
    { month: 'Oct', revenue: 71250.75 },
    { month: 'Nov', revenue: 78430.25 },
    { month: 'Dec', revenue: 82210.00 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-400" />
            Finance & Analytics
          </h1>
          <p className="text-slate-300">Monitor revenue, transactions, and growth forecasting</p>
        </div>
        <button
          onClick={() => {
            fetchOverview()
            fetchTransactions()
            fetchForecast()
          }}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Key Metrics Cards */}
      {loading.overview ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <AdminGlassCard key={i}>
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-8 bg-slate-700 rounded mb-1"></div>
                <div className="h-3 bg-slate-700 rounded"></div>
              </div>
            </AdminGlassCard>
          ))}
        </div>
      ) : overviewData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <AdminGlassCard>
            <div className="text-center">
              <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(overviewData.totalRevenue)}
              </div>
              <div className="text-slate-400 text-xs">Total Revenue</div>
            </div>
          </AdminGlassCard>

          <AdminGlassCard>
            <div className="text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(overviewData.totalCommission)}
              </div>
              <div className="text-slate-400 text-xs">Total Commission</div>
            </div>
          </AdminGlassCard>

          <AdminGlassCard>
            <div className="text-center">
              <TrendingDown className="w-6 h-6 text-red-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white mb-1">
                {formatCurrency(overviewData.totalPayouts)}
              </div>
              <div className="text-slate-400 text-xs">Total Payouts</div>
            </div>
          </AdminGlassCard>

          <AdminGlassCard>
            <div className="text-center">
              <Briefcase className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white mb-1">
                {overviewData.activeProjectsCount.toLocaleString()}
              </div>
              <div className="text-slate-400 text-xs">Active Projects</div>
            </div>
          </AdminGlassCard>

          <AdminGlassCard>
            <div className="text-center">
              <Users className="w-6 h-6 text-orange-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-white mb-1">
                {overviewData.newUsersThisMonth.toLocaleString()}
              </div>
              <div className="text-slate-400 text-xs">New Users This Month</div>
            </div>
          </AdminGlassCard>
        </div>
      ) : null}

      {/* Revenue Graph and Transaction Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Graph */}
        <AdminGlassCard title="Revenue Trend (12 Months)">
          <div className="h-64">
            {!chartData ? (
              <div className="flex items-center justify-center h-full text-slate-400">
                {loading.overview ? 'Loading chart data...' : 'No chart data available'}
              </div>
            ) : (
              <ChartWrapper
                type="line"
                data={chartData ? [{
                  month: 'Jan', revenue: 34520.50
                }, {
                  month: 'Feb', revenue: 38230.25
                }, {
                  month: 'Mar', revenue: 46750.00
                }, {
                  month: 'Apr', revenue: 41540.25
                }, {
                  month: 'May', revenue: 51120.00
                }, {
                  month: 'Jun', revenue: 54310.50
                }, {
                  month: 'Jul', revenue: 58990.75
                }, {
                  month: 'Aug', revenue: 63520.25
                }, {
                  month: 'Sep', revenue: 67890.50
                }, {
                  month: 'Oct', revenue: 71250.75
                }, {
                  month: 'Nov', revenue: 78430.25
                }, {
                  month: 'Dec', revenue: 82210.00
                }] : []}
                dataKey="revenue"
                colors={['#3b82f6']}
              />
            )}
          </div>
        </AdminGlassCard>

        {/* Transaction Table */}
        <AdminGlassCard title="Recent Transactions">
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-2 text-slate-300 text-left">User</th>
                  <th className="pb-2 text-slate-300 text-left">Type</th>
                  <th className="pb-2 text-slate-300 text-right">Amount</th>
                  <th className="pb-2 text-slate-300 text-center">Status</th>
                  <th className="pb-2 text-slate-300 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {loading.transactions ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="py-2">
                        <div className="animate-pulse">
                          <div className="h-4 bg-slate-700 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : transactions.length > 0 ? transactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id}>
                    <td className="py-2">
                      <div className="text-white font-medium">{tx.userName}</div>
                    </td>
                    <td className="py-2">
                      <Badge className={`text-xs capitalize ${tx.type === 'deposit' ? 'bg-green-900/50 text-green-300' : tx.type === 'withdrawal' ? 'bg-red-900/50 text-red-300' : tx.type === 'commission' ? 'bg-blue-900/50 text-blue-300' : 'bg-gray-900/50 text-gray-300'}`}>
                        {tx.type}
                      </Badge>
                    </td>
                    <td className="py-2 text-right">
                      <div className="text-white">{formatCurrency(tx.amount)}</div>
                      {tx.commission && (
                        <div className="text-slate-400 text-xs">Fee: {formatCurrency(tx.commission)}</div>
                      )}
                    </td>
                    <td className="py-2 text-center">
                      <Badge className={`text-xs ${tx.status === 'success' ? 'bg-green-900/50 text-green-300' : tx.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' : tx.status === 'failed' ? 'bg-red-900/50 text-red-300' : 'bg-gray-900/50 text-gray-300'}`}>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-2 text-slate-400 text-xs">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </AdminGlassCard>
      </div>

      {/* AI Revenue Forecast Widget */}
      <AdminGlassCard title="AI Revenue Forecast">
        {loading.forecast ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-20 bg-slate-700 rounded"></div>
          </div>
        ) : forecastData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-white mb-1">
                  {formatCurrency(forecastData.nextMonthPrediction)}
                </div>
                <div className="text-slate-400 text-sm">Next Month Prediction</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <div className={`text-2xl font-bold mb-1 ${forecastData.quarterlyGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPercent(forecastData.quarterlyGrowth)}
                </div>
                <div className="text-slate-400 text-sm">Quarterly Growth</div>
              </div>
              <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                <div className={`text-2xl font-bold mb-1 ${getRiskColor(forecastData.riskScore)}`}>
                  {forecastData.riskScore}/10
                </div>
                <div className="text-slate-400 text-sm">Risk Score</div>
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2">AI Recommendation</h4>
              <p className="text-slate-300 leading-relaxed">{forecastData.recommendationText}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">
            Unable to load forecast data
          </div>
        )}
      </AdminGlassCard>
    </div>
  )
}
