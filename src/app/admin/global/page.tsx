'use client'

import { useState, useEffect } from 'react'
import { Globe, Server, Users, Activity, Shield, Clock, MapPin, TrendingUp, AlertTriangle, CheckCircle, Zap } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

interface GlobalRegion {
  name: string
  code: string
  flag: string
  users: number
  servers: number
  responseTime: number
  status: 'operational' | 'degraded' | 'maintenance'
  uptime: number
  traffic: number
  compliance: 'gdpr' | 'ccpa' | 'both' | 'none'
}

interface GlobalMetrics {
  totalUsers: number
  activeRegions: number
  globalTraffic: number
  avgResponseTime: number
  systemUptime: number
  incidentsResolved: number
  complianceScore: number
}

interface Incident {
  id: string
  region: string
  type: 'server' | 'network' | 'security' | 'capacity'
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'active' | 'resolved' | 'mitigation' | 'monitoring'
  description: string
  started: Date
  resolved?: Date
}

export default function GlobalOperationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const globalMetrics: GlobalMetrics = {
    totalUsers: 1578412,
    activeRegions: 12,
    globalTraffic: 892.4,
    avgResponseTime: 145,
    systemUptime: 99.97,
    incidentsResolved: 1247,
    complianceScore: 98.4
  }

  const globalRegions: GlobalRegion[] = [
    {
      name: 'North America',
      code: 'NA',
      flag: '🇺🇸',
      users: 584750,
      servers: 147,
      responseTime: 89,
      status: 'operational',
      uptime: 99.98,
      traffic: 245.6,
      compliance: 'ccpa'
    },
    {
      name: 'Europe',
      code: 'EU',
      flag: '🇪🇺',
      users: 423189,
      servers: 89,
      responseTime: 145,
      status: 'operational',
      uptime: 99.95,
      traffic: 189.2,
      compliance: 'gdpr'
    },
    {
      name: 'Asia Pacific',
      code: 'APAC',
      flag: '🌏',
      users: 691473,
      servers: 203,
      responseTime: 234,
      status: 'operational',
      uptime: 99.97,
      traffic: 345.8,
      compliance: 'gdpr'
    },
    {
      name: 'South America',
      code: 'SA',
      flag: '🇧🇷',
      users: 89423,
      servers: 34,
      responseTime: 189,
      status: 'operational',
      uptime: 99.91,
      traffic: 67.3,
      compliance: 'both'
    },
    {
      name: 'Middle East',
      code: 'ME',
      flag: '🇦🇪',
      users: 45678,
      servers: 18,
      responseTime: 167,
      status: 'degraded',
      uptime: 99.87,
      traffic: 28.9,
      compliance: 'gdpr'
    },
    {
      name: 'Africa',
      code: 'AF',
      flag: '🇿🇦',
      users: 78999,
      servers: 22,
      responseTime: 223,
      status: 'operational',
      uptime: 99.93,
      traffic: 15.6,
      compliance: 'gdpr'
    }
  ]

  const [activeIncidents] = useState<Incident[]>([
    {
      id: '1',
      region: 'Middle East',
      type: 'network',
      severity: 'high',
      status: 'mitigation',
      description: 'Intermittent connectivity issues due to regional fiber cut',
      started: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: '2',
      region: 'North America',
      type: 'capacity',
      severity: 'medium',
      status: 'mitigation',
      description: 'Auto-scaling triggered for increased user load',
      started: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
    }
  ])

  useEffect(() => {
    // Simulate real-time updates every 5 seconds
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Could update metrics here for real implementation
        console.log('Updating global metrics...')
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400'
      case 'degraded': return 'text-yellow-400'
      case 'maintenance': return 'text-blue-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-900/30 border-green-700'
      case 'degraded': return 'bg-yellow-900/30 border-yellow-700'
      case 'maintenance': return 'bg-blue-900/30 border-blue-700'
      default: return 'bg-slate-800 border-slate-700'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-700 bg-red-900/20'
      case 'high': return 'text-orange-400 border-orange-700 bg-orange-900/20'
      case 'medium': return 'text-yellow-400 border-yellow-700 bg-yellow-900/20'
      default: return 'text-slate-400 border-slate-700 bg-slate-900/20'
    }
  }

  const getComplianceIcon = (compliance: string) => {
    switch (compliance) {
      case 'gdpr': return '🇪🇺'
      case 'ccpa': return '🇺🇸'
      case 'both': return '🌐'
      default: return '❓'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-400" />
            Global Operations Center
          </h1>
          <p className="text-slate-300">Real-time global infrastructure monitoring and management</p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`${autoRefresh ? 'bg-green-600' : 'bg-slate-600'} hover:opacity-90`}
          >
            {autoRefresh ? 'Pause' : 'Resume'} Auto-Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Zap className="w-4 h-4 mr-2" />
            Emergency Controls
          </Button>
        </div>
      </div>

      {/* Global Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Globe className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-blue-400">{globalMetrics.totalUsers.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Global Users</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Server className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-green-400">{globalMetrics.activeRegions}</div>
            <div className="text-slate-400 text-xs">Active Regions</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Activity className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-purple-400">{globalMetrics.globalTraffic} TB</div>
            <div className="text-slate-400 text-xs">Global Traffic</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-yellow-400">{globalMetrics.avgResponseTime}ms</div>
            <div className="text-slate-400 text-xs">Avg Response</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-teal-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-teal-400">{globalMetrics.systemUptime}%</div>
            <div className="text-slate-400 text-xs">System Uptime</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-indigo-400">{globalMetrics.incidentsResolved}</div>
            <div className="text-slate-400 text-xs">Incidents Resolved</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Shield className="w-6 h-6 text-pink-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-pink-400">{globalMetrics.complianceScore}%</div>
            <div className="text-slate-400 text-xs">Compliance Score</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* World Map Visualization Placeholder */}
      <AdminGlassCard title="Global Infrastructure Map">
        <div className="bg-slate-900/50 rounded-lg p-8 text-center border-2 border-dashed border-slate-600">
          <Globe className="w-24 h-24 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">Interactive World Map</h3>
          <p className="text-slate-500 mb-6">Real-time global infrastructure visualization with active regions and load balancing</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {globalRegions.slice(0, 4).map(region => (
              <div key={region.code} className="bg-slate-800/50 rounded p-3">
                <div className="text-lg mb-1">{region.flag}</div>
                <div className="text-white text-sm font-semibold">{region.name}</div>
                <div className="text-slate-400 text-xs">{region.servers} servers</div>
                <div className={`text-xs font-medium ${getStatusColor(region.status)}`}>
                  {region.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminGlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Status Grid */}
        <div className="lg:col-span-2">
          <AdminGlassCard title="Regional Operations Dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {globalRegions.map((region) => (
                <div
                  key={region.code}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    getStatusBg(region.status)
                  } ${selectedRegion === region.code ? 'ring-2 ring-blue-500/50' : ''}`}
                  onClick={() => setSelectedRegion(selectedRegion === region.code ? null : region.code)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{region.flag}</span>
                      <span className="text-white font-semibold">{region.name}</span>
                      <span className="text-xs text-slate-400">({region.code})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-medium capitalize ${getStatusColor(region.status)}`}>
                        {region.status}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        region.status === 'operational' ? 'bg-green-400' :
                        region.status === 'degraded' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-slate-400">Users</div>
                      <div className="text-white font-semibold">{region.users.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Servers</div>
                      <div className="text-white font-semibold">{region.servers}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Response</div>
                      <div className="text-white font-semibold">{region.responseTime}ms</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Uptime</div>
                      <div className="text-white font-semibold">{region.uptime}%</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-slate-400">Traffic:</div>
                        <div className="text-purple-400 text-xs">{region.traffic} GB/d</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span>{getComplianceIcon(region.compliance)}</span>
                        <span className="text-slate-400">{region.compliance.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </div>

        {/* Active Incidents Panel */}
        <AdminGlassCard title="Active Incidents">
          <div className="space-y-3">
            {activeIncidents.map((incident) => (
              <div key={incident.id} className={`p-4 rounded-lg border ${getSeverityColor(incident.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-white font-semibold text-sm">{incident.region}</div>
                    <div className="text-slate-400 text-xs">{incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} Issue</div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded capitalize ${
                    incident.status === 'active' ? 'bg-red-100 text-red-800' :
                    incident.status === 'mitigation' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {incident.status}
                  </div>
                </div>
                <p className="text-slate-300 text-xs mb-2">{incident.description}</p>
                <div className="text-xs text-slate-500">
                  Started: {new Date(incident.started).toLocaleString()}
                </div>
              </div>
            ))}
            {activeIncidents.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                <div>All systems operational</div>
                <div className="text-xs">No active incidents</div>
              </div>
            )}
          </div>
        </AdminGlassCard>
      </div>

      {/* Global Compliance & Security */}
      <AdminGlassCard title="Global Compliance & Security Status">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-white text-lg font-semibold">GDPR</div>
            <div className="text-slate-400 text-sm">Compliance: EU Regions</div>
            <div className="text-green-400 text-xs font-medium">98.7% Score</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-white text-lg font-semibold">CCPA</div>
            <div className="text-slate-400 text-sm">Compliance: US Regions</div>
            <div className="text-green-400 text-xs font-medium">97.9% Score</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-white text-lg font-semibold">ISO 27001</div>
            <div className="text-slate-400 text-sm">Security Framework</div>
            <div className="text-green-400 text-xs font-medium">Certified</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-white text-lg font-semibold">SOC 2</div>
            <div className="text-slate-400 text-sm">Compliance Status</div>
            <div className="text-yellow-400 text-xs font-medium">In Progress</div>
          </div>
        </div>
      </AdminGlassCard>

      {/* Traffic Distribution & Performance */}
      <AdminGlassCard title="Global Performance & Traffic Distribution">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-4">Traffic Distribution by Region</h4>
            <div className="space-y-3">
              {globalRegions
                .sort((a, b) => b.traffic - a.traffic)
                .slice(0, 5)
                .map((region, index) => {
                const maxTraffic = globalRegions[0].traffic
                const percentage = (region.traffic / maxTraffic) * 100
                return (
                  <div key={region.code} className="flex items-center gap-3">
                    <div className="w-8 h-8 border border-slate-600 rounded flex items-center justify-center text-sm">
                      {region.flag}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 text-sm">{region.name}</span>
                        <span className="text-slate-400 text-xs">{region.traffic} GB/d</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm font-semibold min-w-12">
                      #{index + 1}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Response Time & SLA Monitoring</h4>
            <div className="space-y-4">
              {globalRegions.map((region) => (
                <div key={region.code} className="bg-slate-800/30 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2 text-white">
                      <span>{region.flag}</span>
                      {region.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      region.responseTime < 100 ? 'bg-green-100 text-green-800' :
                      region.responseTime < 200 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {region.responseTime}ms
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">SLA Target: 200ms</span>
                    <span className={`font-semibold ${
                      region.responseTime < 200 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {region.responseTime < 200 ? '✅ Within SLA' : '❌ SLA Breach'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
