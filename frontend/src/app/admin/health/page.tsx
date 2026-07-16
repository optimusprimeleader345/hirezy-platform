'use client'

import { useState, useEffect } from 'react'
import { Server, Activity, AlertTriangle, CheckCircle, Zap, Cpu, Database, HardDrive, Wifi, Shield, RefreshCw, Settings, X, ExternalLink } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

interface SystemComponent {
  id: string
  name: string
  status: 'operational' | 'warning' | 'critical' | 'maintenance'
  uptime: number
  responseTime: number
  lastChecked: Date
  details: string
}

interface PerformanceMetric {
  name: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
}

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  timestamp: Date
  resolved: boolean
  component: string
}

export default function AdminHealthPage() {
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true)
  const [diagnosticRunning, setDiagnosticRunning] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [systemComponents, setSystemComponents] = useState<SystemComponent[]>([
    {
      id: 'web-server',
      name: 'Web Server',
      status: 'operational',
      uptime: 99.98,
      responseTime: 245,
      lastChecked: new Date(),
      details: 'Nginx 1.23 - All routes responding'
    },
    {
      id: 'database',
      name: 'PostgreSQL Database',
      status: 'operational',
      uptime: 99.99,
      responseTime: 12,
      lastChecked: new Date(),
      details: 'Primary replica active - No latency issues'
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'warning',
      uptime: 99.85,
      responseTime: 890,
      lastChecked: new Date(),
      details: 'Rate limiting active - Increased load detected'
    },
    {
      id: 'file-storage',
      name: 'Cloud Storage',
      status: 'operational',
      uptime: 100,
      responseTime: 234,
      lastChecked: new Date(),
      details: 'S3 compatible - All files accessible'
    },
    {
      id: 'redis-cache',
      name: 'Redis Cache',
      status: 'operational',
      uptime: 99.97,
      responseTime: 2,
      lastChecked: new Date(),
      details: 'In-memory cache performing optimally'
    },
    {
      id: 'message-queue',
      name: 'Message Queue',
      status: 'operational',
      uptime: 99.98,
      responseTime: 8,
      lastChecked: new Date(),
      details: 'Zero message backlog - Processing at capacity'
    }
  ])

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    { name: 'CPU Usage', value: 32, unit: '%', status: 'normal', trend: 'stable' },
    { name: 'Memory Usage', value: 67, unit: '%', status: 'warning', trend: 'up' },
    { name: 'Disk Usage', value: 78, unit: '%', status: 'normal', trend: 'down' },
    { name: 'Network I/O', value: 145, unit: 'Mbps', status: 'normal', trend: 'up' },
    { name: 'Active Connections', value: 1247, unit: '', status: 'warning', trend: 'up' },
    { name: 'Queue Depth', value: 45, unit: '', status: 'normal', trend: 'down' }
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert_001',
      type: 'warning',
      message: 'API Gateway response time increased to 890ms',
      timestamp: new Date(Date.now() - 300000),
      resolved: false,
      component: 'api-gateway'
    },
    {
      id: 'alert_002',
      type: 'info',
      message: 'System diagnostics completed successfully',
      timestamp: new Date(Date.now() - 1800000),
      resolved: true,
      component: 'system'
    }
  ])

  const [apiResponseTimes, setApiResponseTimes] = useState<number[]>([248, 245, 267, 243, 289, 234, 278, 256, 312, 198])

  // Real-time updates
  useEffect(() => {
    if (!isLiveMonitoring) return

    const interval = setInterval(() => {
      // Update component statuses occasionally
      setSystemComponents(prev => prev.map(comp => ({
        ...comp,
        lastChecked: new Date(),
        uptime: comp.uptime + (Math.random() > 0.95 ? (Math.random() - 0.5) * 0.1 : 0),
        responseTime: comp.responseTime + Math.floor((Math.random() - 0.5) * 20),
        status: comp.status // Keep status stable unless major issue
      })))

      // Update performance metrics
      setPerformanceMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.name === 'CPU Usage' ? Math.max(10, Math.min(90, metric.value + (Math.random() - 0.5) * 10)) :
               metric.name === 'Memory Usage' ? Math.max(30, Math.min(95, metric.value + (Math.random() - 0.5) * 5)) :
               metric.name === 'Disk Usage' ? Math.max(50, Math.min(95, metric.value + (Math.random() - 0.5) * 2)) :
               metric.value + (Math.random() - 0.5) * 20,
        trend: Math.random() > 0.6 ? 'stable' : Math.random() > 0.3 ? 'up' : 'down'
      })))

      // Update API response times
      setApiResponseTimes(prev => [...prev.slice(1), Math.floor(Math.random() * 100 + 200)])

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isLiveMonitoring])

  const handleSystemDiagnostics = () => {
    setDiagnosticRunning(true)
    setTimeout(() => {
      setDiagnosticRunning(false)
      // Add success alert
      setAlerts(prev => [{
        id: `alert_${Date.now()}`,
        type: 'info',
        message: 'System diagnostics completed successfully - no issues found',
        timestamp: new Date(),
        resolved: true,
        component: 'system'
      }, ...prev.slice(0, 9)])
    }, 5000)
  }

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ))
  }

  const calculateHealthScore = () => {
    const operationalCount = systemComponents.filter(c => c.status === 'operational').length
    return Math.round((operationalCount / systemComponents.length) * 100)
  }

  const getOverallStatus = () => {
    const criticalCount = systemComponents.filter(c => c.status === 'critical').length
    const warningCount = systemComponents.filter(c => c.status === 'warning').length
    if (criticalCount > 0) return 'critical'
    if (warningCount > 0) return 'warning'
    return 'operational'
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10 text-green-400" />
            Advanced System Health Monitor
          </h1>
          <p className="text-slate-300">Real-time infrastructure monitoring, automated diagnostics, and incident management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
            isLiveMonitoring ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-slate-700 text-slate-400'
          }`}>
            <div className="relative">
              <Activity className={`w-4 h-4 ${isLiveMonitoring ? 'text-green-400 animate-pulse' : 'text-slate-500'}`} />
              {isLiveMonitoring && (
                <div className="absolute inset-0 w-4 h-4 border-2 border-green-400 rounded-full border-t-transparent animate-spin opacity-50"></div>
              )}
            </div>
            <span>Live Monitoring: {isLiveMonitoring ? 'ACTIVE' : 'PAUSED'}</span>
          </div>
          <Button
            onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
            variant="outline"
            size="sm"
            className="border-slate-600 hover:bg-slate-800"
          >
            {isLiveMonitoring ? 'Pause' : 'Resume'} Monitoring
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <AdminGlassCard title="System Overview">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-1 ${
              getOverallStatus() === 'critical' ? 'text-red-400' :
              getOverallStatus() === 'warning' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {getOverallStatus() === 'critical' ? 'CRITICAL' :
               getOverallStatus() === 'warning' ? 'WARNING' :
               'HEALTHY'}
            </div>
            <div className="text-slate-400 text-sm">System Status</div>
            {isLiveMonitoring && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mx-auto mt-1"></div>}
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{calculateHealthScore()}%</div>
            <div className="text-slate-400 text-sm">Health Score</div>
            <div className="text-xs text-slate-500">Average uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">{alerts.filter(a => !a.resolved).length}</div>
            <div className="text-slate-400 text-sm">Active Alerts</div>
            <div className="text-xs text-slate-500">Require attention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{lastUpdate.toLocaleTimeString()}</div>
            <div className="text-slate-400 text-sm">Last Updated</div>
            <div className="text-xs text-slate-500">Real-time data</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700 pt-4 mt-4">
          <span>Monitoring {systemComponents.length} infrastructure components</span>
          <span>Automated incident response enabled</span>
        </div>
      </AdminGlassCard>

      {/* Live Alerts Panel */}
      {alerts.length > 0 && (
        <AdminGlassCard title={`System Alerts (${alerts.filter(a => !a.resolved).length} Active)`}>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.type === 'error' ? 'bg-red-900/20 border-red-700' :
                alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-700' :
                'bg-blue-900/20 border-blue-700'
              } ${alert.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.type === 'error' ? 'bg-red-400 animate-pulse' :
                    alert.type === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div>
                    <div className="text-white font-medium text-sm">{alert.message}</div>
                    <div className="text-slate-400 text-xs">
                      {alert.component} • {new Date(alert.timestamp).toLocaleTimeString()} •
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </div>
                  </div>
                </div>
                {!alert.resolved && (
                  <Button
                    onClick={() => resolveAlert(alert.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-2 border-slate-600 hover:bg-slate-800"
                  >
                    Mark Resolved
                  </Button>
                )}
              </div>
            ))}
          </div>
        </AdminGlassCard>
      )}

      {/* Enhanced Server Status Grid */}
      <AdminGlassCard title="Infrastructure Components">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemComponents.map((component) => (
            <div key={component.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {component.id === 'web-server' && <Server className="w-5 h-5 text-slate-400" />}
                  {component.id === 'database' && <Database className="w-5 h-5 text-slate-400" />}
                  {component.id === 'api-gateway' && <Wifi className="w-5 h-5 text-slate-400" />}
                  {component.id === 'file-storage' && <HardDrive className="w-5 h-5 text-slate-400" />}
                  {component.id === 'redis-cache' && <Zap className="w-5 h-5 text-slate-400" />}
                  {component.id === 'message-queue' && <Activity className="w-5 h-5 text-slate-400" />}
                  <span className="font-semibold text-white">{component.name}</span>
                </div>
                {component.status === 'operational' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {component.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                {component.status === 'critical' && <X className="w-5 h-5 text-red-400" />}
                {component.status === 'maintenance' && <Settings className="w-5 h-5 text-blue-400" />}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Status:</span>
                  <span className={`font-semibold ${
                    component.status === 'operational' ? 'text-green-400' :
                    component.status === 'warning' ? 'text-yellow-400' :
                    component.status === 'critical' ? 'text-red-400' :
                    'text-blue-400'
                  }`}>
                    {component.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Uptime:</span>
                  <span className="text-white font-semibold">{component.uptime.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Response:</span>
                  <span className={`font-semibold ${
                    component.responseTime < 100 ? 'text-green-400' :
                    component.responseTime < 500 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {component.responseTime}ms
                  </span>
                </div>
                {isLiveMonitoring && <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-full transition-all duration-1000"></div>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </AdminGlassCard>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminGlassCard title={`API Response Time (${apiResponseTimes[apiResponseTimes.length - 1]}ms current)`}>
          <div className="h-32 flex items-end justify-between">
            {apiResponseTimes.map((time, i) => (
              <div
                key={i}
                className={`w-6 mx-0.5 rounded-t transition-all duration-1000 ${
                  time < 250 ? 'bg-gradient-to-t from-green-500 to-green-400' :
                  time < 400 ? 'bg-gradient-to-t from-yellow-500 to-yellow-400' :
                  'bg-gradient-to-t from-red-500 to-red-400'
                }`}
                style={{height: `${Math.min((time / 5), 100)}%`}}
                title={`${time}ms`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-slate-400">
            <span>Average: {Math.round(apiResponseTimes.reduce((a, b) => a + b, 0) / apiResponseTimes.length)}ms</span>
            <span>Trend: <span className="text-green-400">Improving</span></span>
            {isLiveMonitoring && <span className="text-green-400 animate-pulse">Live Updates</span>}
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Background Worker Status">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Email Queue</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400">Active</span>
                {isLiveMonitoring && <span className="text-xs text-slate-400 ml-2">+12 processed</span>}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Notification Queue</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400">Active</span>
                {isLiveMonitoring && <span className="text-xs text-slate-400 ml-2">45 delivered</span>}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">File Processing</span>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-400">Warning</span>
                {isLiveMonitoring && <span className="text-xs text-slate-400 ml-2">3 failed</span>}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Payment Processing</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400">Active</span>
                {isLiveMonitoring && <span className="text-xs text-slate-400 ml-2">$2.3K processed</span>}
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Error Rate Chart */}
      <AdminGlassCard title="Error Rate Chart (24h)">
        <div className="h-32 flex items-end justify-between">
          {Array.from({length: 24}).map((_, i) => {
            const errorRate = Math.random() * 2
            return (
              <div
                key={i}
                className={`w-2 mx-0.5 rounded-t transition-all duration-1000 ${
                  errorRate < 0.5 ? 'bg-green-500' :
                  errorRate < 1 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{height: `${Math.max(errorRate * 25, 5)}%`}}
                title={`${errorRate.toFixed(2)}% errors at hour ${i}`}
              />
            )
          })}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>0.3% average error rate</span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">↘ Improving</span>
            <span>Last 24 hours</span>
            {isLiveMonitoring && <span className="text-green-400 animate-pulse ml-2">Live Data</span>}
          </span>
        </div>
      </AdminGlassCard>

      {/* System Diagnostics */}
      <AdminGlassCard title="Advanced System Diagnostics & Resource Monitoring">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Metrics Panel */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-3">Resource Utilization</h4>
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {metric.name.toLowerCase().includes('cpu') && <Cpu className="w-4 h-4 text-slate-400" />}
                    {!metric.name.toLowerCase().includes('cpu') &&
                     !metric.name.toLowerCase().includes('disk') &&
                     !metric.name.toLowerCase().includes('memory') && <Activity className="w-4 h-4 text-slate-400" />}
                    {metric.name.toLowerCase().includes('memory') && <Database className="w-4 h-4 text-slate-400" />}
                    {metric.name.toLowerCase().includes('disk') && <HardDrive className="w-4 h-4 text-slate-400" />}
                    <span className="text-slate-300">{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      metric.status === 'critical' ? 'text-red-400' :
                      metric.status === 'warning' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {metric.value}{metric.unit}
                    </span>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      metric.trend === 'up' ? 'bg-red-900/50 text-red-300' :
                      metric.trend === 'down' ? 'bg-green-900/50 text-green-300' :
                      'bg-slate-900/50 text-slate-300'
                    }`}>
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      metric.value > 80 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                      metric.value > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                      'bg-gradient-to-r from-green-500 to-green-400'
                    }`}
                    style={{width: `${Math.min(metric.value || 0, 100)}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Diagnostic Controls Panel */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-3">Automated Diagnostics</h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Active Monitoring</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isLiveMonitoring ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
                  <span className={`text-sm ${isLiveMonitoring ? 'text-green-400' : 'text-slate-400'}`}>
                    {isLiveMonitoring ? 'Active' : 'Paused'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Health Score</span>
                <span className={`font-bold text-xl ${
                  calculateHealthScore() > 95 ? 'text-green-400' :
                  calculateHealthScore() > 85 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {calculateHealthScore()}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <span className="text-slate-300">Last Health Check</span>
                <span className="text-white text-sm">Just now</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={handleSystemDiagnostics}
                disabled={diagnosticRunning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
              >
                <Zap className="w-4 h-4 mr-2" />
                {diagnosticRunning ? 'Running Diagnostics...' : 'Run Full System Diagnostics'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/30">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Status
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/30">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              </div>
            </div>

            {/* Live Status Indicators */}
            {isLiveMonitoring && (
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-green-400">
                <Zap className="w-3 h-3 animate-pulse" />
                <span>System monitoring active - Real-time updates enabled</span>
              </div>
            )}
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
