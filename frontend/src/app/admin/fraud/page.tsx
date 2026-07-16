'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, TrendingUp, Activity, Scan, Bell, MapPin, Clock, BarChart3, Users, Zap, Eye, Search, Filter, RefreshCw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

interface RiskItem {
  id: string
  userId: string
  username: string
  email: string
  reason: string
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  location: string
  ipAddress: string
  deviceFingerprint: string
  status: 'pending' | 'investigating' | 'resolved'
  flags: string[]
  transactionCount: number
  suspiciousPatterns: string[]
}

interface LiveMetrics {
  activeScans: number
  totalScanned: number
  highRisk: number
  alertsTriggered: number
  falsePositives: number
  detectionAccuracy: number
  responseTime: number
}

interface RealTimeAlert {
  id: string
  type: 'fraud' | 'suspicious' | 'system'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
  userId?: string
  actions: string[]
}

export default function AdminFraudPage() {
  const [scanning, setScanning] = useState(false)
  const [autoScanActive, setAutoScanActive] = useState(true)
  const [selectedRiskItem, setSelectedRiskItem] = useState<RiskItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    activeScans: 0,
    totalScanned: 0,
    highRisk: 0,
    alertsTriggered: 0,
    falsePositives: 0,
    detectionAccuracy: 0,
    responseTime: 0
  })
  const [realTimeAlerts, setRealTimeAlerts] = useState<RealTimeAlert[]>([])

  const [riskItems, setRiskItems] = useState<RiskItem[]>([
    {
      id: "rsk_001",
      userId: "user_123",
      username: "john_dev2024",
      email: "john@example.com",
      reason: "Multiple failed payments",
      riskScore: 85,
      riskLevel: 'high',
      timestamp: new Date().toISOString().slice(0, 16),
      location: "New York, US",
      ipAddress: "192.168.1.100",
      deviceFingerprint: "fp_123456",
      status: 'pending',
      flags: ['payment_failure', 'rapid_attempts'],
      transactionCount: 15,
      suspiciousPatterns: ['5 failed payments in 10 minutes']
    },
    {
      id: "rsk_002",
      userId: "user_456",
      username: "sarah_free123",
      email: "sarah@test.com",
      reason: "Rapid account creation/deletion",
      riskScore: 72,
      riskLevel: 'medium',
      timestamp: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
      location: "London, UK",
      ipAddress: "10.0.0.50",
      deviceFingerprint: "fp_789012",
      status: 'investigating',
      flags: ['account_abuse', 'pattern_suspicious'],
      transactionCount: 45,
      suspiciousPatterns: ['3 accounts created in 2 hours']
    },
    {
      id: "rsk_003",
      userId: "user_789",
      username: "pro_designer",
      email: "designer@pro.com",
      reason: "Unusual login patterns",
      riskScore: 68,
      riskLevel: 'medium',
      timestamp: new Date(Date.now() - 172800000).toISOString().slice(0, 16),
      location: "Tokyo, JP",
      ipAddress: "203.0.113.10",
      deviceFingerprint: "fp_345678",
      status: 'resolved',
      flags: ['geo_anomaly', 'time_suspicious'],
      transactionCount: 28,
      suspiciousPatterns: ['Logins from 3 continents in 24 hours']
    },
  ])

  // Real-time system simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        activeScans: Math.max(0, prev.activeScans + Math.floor(Math.random() * 3 - 1)),
        totalScanned: prev.totalScanned + Math.floor(Math.random() * 5),
        highRisk: Math.max(0, prev.highRisk + Math.floor(Math.random() * 2 - 0.5)),
        alertsTriggered: prev.alertsTriggered + Math.floor(Math.random() * 2),
        falsePositives: Math.max(0, prev.falsePositives + Math.floor(Math.random() * 0.5 - 0.2)),
        detectionAccuracy: Math.min(99.9, prev.detectionAccuracy + (Math.random() - 0.5) * 0.2),
        responseTime: Math.max(0.1, prev.responseTime + (Math.random() - 0.5) * 0.1)
      }))

      // Add random alerts
      if (Math.random() > 0.7) {
        const alerts: RealTimeAlert[] = [
          {
            id: `alert_${Date.now()}`,
            type: 'fraud',
            severity: 'critical',
            message: 'Large transaction pattern detected',
            timestamp: new Date().toLocaleTimeString(),
            userId: 'user_' + Math.floor(Math.random() * 1000),
            actions: ['Block User', 'Review Transaction']
          }
        ]
        setRealTimeAlerts(prev => [...alerts, ...prev].slice(0, 10))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleFullScan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 3000)
  }

  const toggleAutoScan = () => {
    setAutoScanActive(!autoScanActive)
  }

  const dismissAlert = (alertId: string) => {
    setRealTimeAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  const updateRiskStatus = (riskId: string, newStatus: 'pending' | 'investigating' | 'resolved') => {
    setRiskItems(prev =>
      prev.map(item =>
        item.id === riskId ? { ...item, status: newStatus } : item
      )
    )
  }

  const filteredRiskItems = riskItems.filter(item => {
    const matchesSearch = item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterLevel === 'all' || item.riskLevel === filterLevel
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10 text-red-400" />
            AI-Powered Fraud Detection
          </h1>
          <p className="text-slate-300">Real-time ML-based fraud monitoring, risk assessment, and automated prevention</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
            autoScanActive ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-slate-700 text-slate-400'
          }`}>
            <div className="relative">
              <Activity className={`w-4 h-4 ${autoScanActive ? 'text-green-400' : 'text-slate-500'}`} />
              {autoScanActive && (
                <div className="absolute inset-0 w-4 h-4 border-2 border-green-400 rounded-full border-t-transparent animate-spin opacity-75"></div>
              )}
            </div>
            <span>Auto Scan: {autoScanActive ? 'ON' : 'OFF'}</span>
          </div>
          <Button
            onClick={toggleAutoScan}
            variant="outline"
            size="sm"
          >
            {autoScanActive ? 'Pause Auto' : 'Resume Auto'}
          </Button>
        </div>
      </div>

      {/* Real-time Alerts */}
      {realTimeAlerts.length > 0 && (
        <AdminGlassCard title={`Live Security Alerts (${realTimeAlerts.length})`}>
          <div className="space-y-3 max-h-32 overflow-y-auto">
            {realTimeAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.severity === 'critical' ? 'bg-red-900/20 border-red-700' :
                alert.severity === 'high' ? 'bg-orange-900/20 border-orange-700' :
                alert.severity === 'medium' ? 'bg-yellow-900/20 border-yellow-700' :
                'bg-blue-900/20 border-blue-700'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                    alert.severity === 'high' ? 'bg-orange-400' :
                    alert.severity === 'medium' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium text-sm">{alert.message}</div>
                    <div className="text-slate-400 text-xs">{alert.timestamp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {alert.actions.map((action, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="text-xs h-7 px-2 border-slate-600 hover:bg-slate-800"
                    >
                      {action}
                    </Button>
                  ))}
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-slate-400 hover:text-white text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      )}

      {/* Live Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-400">{liveMetrics.activeScans}</div>
              <div className="text-slate-400 text-sm">Active Scans</div>
            </div>
            <Scan className="w-6 h-6 text-blue-400" />
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-400">{liveMetrics.totalScanned.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Total Scanned</div>
            </div>
            <BarChart3 className="w-6 h-6 text-green-400" />
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-400">{liveMetrics.highRisk}</div>
              <div className="text-slate-400 text-sm">High Risk Items</div>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{liveMetrics.alertsTriggered}</div>
              <div className="text-slate-400 text-sm">Alerts This Hour</div>
            </div>
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
        </AdminGlassCard>
      </div>

      {/* Controls */}
      <AdminGlassCard>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleFullScan}
              disabled={scanning}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              {scanning ? 'Scanning...' : 'Run Full Fraud Scan'}
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Last updated: <span className="text-white">Just now</span>
            </span>
          </div>
        </div>
      </AdminGlassCard>

      {/* Enhanced Risk Activity Heatmap */}
      <AdminGlassCard title="Global Risk Activity Heatmap">
        <div className="grid grid-cols-10 gap-1 h-24 mb-4">
          {Array.from({length: 100}).map((_, i) => {
            const risk = Math.random()
            const opacity = 0.3 + risk * 0.7
            const color = risk > 0.8 ? 'bg-red-600' : risk > 0.6 ? 'bg-orange-500' : risk > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
            const pulse = risk > 0.8 ? 'animate-pulse' : ''
            return <div key={i} className={`${color} rounded ${pulse}`} style={{ opacity }} />
          })}
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs text-slate-400">Real-time global fraud activity monitoring</div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-slate-400">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-slate-400">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-slate-400">High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-600 rounded animate-pulse"></div>
              <span className="text-slate-400">Critical</span>
            </div>
          </div>
        </div>
      </AdminGlassCard>

      {/* Enhanced Risk Items Table */}
      <AdminGlassCard title={`Risk Assessment Queue (${filteredRiskItems.length})`}>
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search users, email, reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm w-80"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white text-sm"
            >
              <option value="all">All Risk Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="text-slate-400 text-sm">
            Showing {filteredRiskItems.length} of {riskItems.length} items
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold text-left">User</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Risk</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Location</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Status</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Last Activity</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiskItems.map((item) => (
                <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4">
                    <div>
                      <div className="font-semibold text-white">{item.username}</div>
                      <div className="text-slate-400 text-sm">{item.email}</div>
                      <div className="text-slate-500 text-xs">{item.userId}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.riskLevel === 'critical' ? 'bg-red-900/50 text-red-300 border border-red-700' :
                        item.riskLevel === 'high' ? 'bg-orange-900/50 text-orange-300 border border-orange-700' :
                        item.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                        'bg-green-900/50 text-green-300 border border-green-700'
                      }`}>
                        {item.riskLevel.toUpperCase()}
                      </div>
                      <span className={`text-sm font-bold ${
                        item.riskScore > 80 ? 'text-red-400' :
                        item.riskScore > 60 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {item.riskScore}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-300">{item.location}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <select
                      value={item.status}
                      onChange={(e) => updateRiskStatus(item.id, e.target.value as 'pending' | 'investigating' | 'resolved')}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.status === 'resolved' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                        item.status === 'investigating' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                        'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="py-4 text-slate-400">{item.timestamp}</td>
                  <td className="py-4">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-2 border-slate-600 hover:bg-slate-800"
                        onClick={() => setSelectedRiskItem(item)}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-2 border-red-600 text-red-400 hover:bg-red-900/30"
                      >
                        Block
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Enhanced Activity Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminGlassCard title="Pattern Detection Insights">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span className="text-slate-300">Failed Payment Patterns</span>
              </div>
              <span className="text-red-400 font-semibold">23 active</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">IP Tracking</span>
              </div>
              <span className="text-blue-400 font-semibold">156 IPs monitored</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">Account Abuse</span>
              </div>
              <span className="text-purple-400 font-semibold">8 detected</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">Geo-Anomalies</span>
              </div>
              <span className="text-green-400 font-semibold">12 flagged</span>
            </div>
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Real-Time Performance">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Detection Accuracy</span>
              <span className="text-green-400 font-semibold">{liveMetrics.detectionAccuracy.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">False Positives</span>
              <span className="text-yellow-400 font-semibold">{liveMetrics.falsePositives.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Avg Response Time</span>
              <span className="text-blue-400 font-semibold">{liveMetrics.responseTime.toFixed(1)} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Uptime</span>
              <span className="text-emerald-400 font-semibold">99.97%</span>
            </div>
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Risk Distribution">
          <div className="space-y-3">
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{width: '65%'}}></div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{width: '25%'}}></div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full" style={{width: '10%'}}></div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-3">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Low Risk (65%)
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Medium (25%)
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                High (10%)
              </span>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Risk Detail Modal */}
      {selectedRiskItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedRiskItem.username}</h3>
                <div className="text-slate-400">{selectedRiskItem.email} • {selectedRiskItem.userId}</div>
              </div>
              <button
                onClick={() => setSelectedRiskItem(null)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Risk Assessment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Risk Level:</span>
                      <span className={`font-semibold ${
                        selectedRiskItem.riskLevel === 'critical' ? 'text-red-400' :
                        selectedRiskItem.riskLevel === 'high' ? 'text-orange-400' :
                        selectedRiskItem.riskLevel === 'medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {selectedRiskItem.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Risk Score:</span>
                      <span className="text-white font-semibold">{selectedRiskItem.riskScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Status:</span>
                      <span className="text-blue-400">{selectedRiskItem.status}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Transactions:</span>
                      <span className="text-white">{selectedRiskItem.transactionCount}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Technical Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">IP Address:</span>
                      <span className="text-white ml-2">{selectedRiskItem.ipAddress}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Location:</span>
                      <span className="text-white ml-2">{selectedRiskItem.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Device:</span>
                      <span className="text-white ml-2 font-mono text-xs">{selectedRiskItem.deviceFingerprint}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Suspicious Patterns</h4>
                  <div className="space-y-2">
                    {selectedRiskItem.suspiciousPatterns.map((pattern, idx) => (
                      <div key={idx} className="text-sm text-yellow-300 bg-yellow-900/20 p-2 rounded border border-yellow-700/30">
                        {pattern}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Flags & Indicators</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRiskItem.flags.map((flag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-red-900/40 text-red-300 border border-red-700/50 rounded text-xs">
                        {flag.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button className="bg-red-600 hover:bg-red-700 flex-1">
                    Block User
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 flex-1">
                    Send Notification
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/30">
                    Mark Resolved
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
