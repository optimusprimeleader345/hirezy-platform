'use client'

import { Server, Activity, AlertTriangle, CheckCircle, Zap } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

export default function AdminHealthPage() {
  const handleSystemDiagnostics = () => {
    console.log('Running system diagnostics...')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Health</h1>
        <p className="text-slate-300">Real-time monitoring of platform health and performance</p>
      </div>

      {/* Server Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">Operational</div>
            <div className="text-slate-400 text-sm">Web Server</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">Operational</div>
            <div className="text-slate-400 text-sm">Database</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">Operational</div>
            <div className="text-slate-400 text-sm">API Gateway</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-green-400">Operational</div>
            <div className="text-slate-400 text-sm">File Storage</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminGlassCard title="API Response Time">
          <div className="h-32 flex items-end justify-between">
            {Array.from({length: 10}).map((_, i) => (
              <div key={i} className="bg-gradient-to-t from-blue-500 to-blue-400 w-6 rounded-t" style={{height: `${Math.random() * 100 + 20}%`}} />
            ))}
          </div>
          <div className="mt-2 text-center text-slate-300">248ms average</div>
        </AdminGlassCard>

        <AdminGlassCard title="Background Worker Status">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Email Queue</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Notification Queue</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-green-400">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">File Processing</span>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-yellow-400">Warning</span>
              </div>
            </div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Error Rate Chart */}
      <AdminGlassCard title="Error Rate Chart (24h)">
        <div className="h-32 flex items-end justify-between">
          {Array.from({length: 24}).map((_, i) => (
            <div key={i} className={`w-2 rounded-t ${Math.random() > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} style={{height: `${Math.random() * 40 + 10}%`}} />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>0.1% error rate</span>
          <span>Last 24 hours</span>
        </div>
      </AdminGlassCard>

      {/* System Diagnostics */}
      <AdminGlassCard title="System Diagnostics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300">CPU Usage</span>
              <span className="text-green-400">32%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Memory Usage</span>
              <span className="text-yellow-400">67%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Disk Space</span>
              <span className="text-green-400">78% free</span>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleSystemDiagnostics} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Zap className="w-4 h-4 mr-2" />
              Run System Diagnostics
            </Button>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
