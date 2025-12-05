'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, TrendingUp, Activity, Scan } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

interface RiskItem {
  userId: string
  reason: string
  riskScore: number
  timestamp: string
}

export default function AdminFraudPage() {
  const [scanning, setScanning] = useState(false)

  const riskItems: RiskItem[] = [
    { userId: "user_123", reason: "Multiple failed payments", riskScore: 85, timestamp: "2024-11-28 10:30" },
    { userId: "user_456", reason: "Rapid account creation/deletion", riskScore: 72, timestamp: "2024-11-27 15:45" },
    { userId: "user_789", reason: "Unusual login patterns", riskScore: 68, timestamp: "2024-11-26 08:20" },
  ]

  const handleFullScan = () => {
    setScanning(true)
    setTimeout(() => setScanning(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fraud Detection Center</h1>
        <p className="text-slate-300">ML-based fraud monitoring and risk assessment</p>
      </div>

      {/* Controls */}
      <AdminGlassCard>
        <div className="flex justify-between items-center">
          <Button
            onClick={handleFullScan}
            disabled={scanning}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Scan className="w-4 h-4 mr-2" />
            {scanning ? 'Scanning...' : 'Run Full Fraud Scan'}
          </Button>
          <div className="text-slate-300">Last scan: 5 minutes ago</div>
        </div>
      </AdminGlassCard>

      {/* Heatmap */}
      <AdminGlassCard title="Risk Activity Heatmap">
        <div className="grid grid-cols-7 gap-2 h-32">
          {Array.from({length: 49}).map((_, i) => {
            const risk = Math.random()
            const color = risk > 0.7 ? 'bg-red-500' : risk > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
            return <div key={i} className={`rounded ${color} opacity-70`} />
          })}
        </div>
        <div className="mt-3 flex justify-between text-xs text-slate-400">
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </AdminGlassCard>

      {/* Risk Table */}
      <AdminGlassCard title="High Risk Items">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold text-left">User ID</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Reason</th>
                <th className="pb-3 text-slate-300 font-semibold text-center">Risk Score</th>
                <th className="pb-3 text-slate-300 font-semibold text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {riskItems.map((item) => (
                <tr key={item.userId} className="border-b border-slate-800">
                  <td className="py-3 text-white">{item.userId}</td>
                  <td className="py-3 text-slate-300">{item.reason}</td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.riskScore > 80 ? 'bg-red-100 text-red-800' :
                      item.riskScore > 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.riskScore}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Activity Patterns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminGlassCard title="Activity Pattern Insights">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Flagged Proposal Detector</span>
              <span className="text-red-400 font-semibold">23 active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">IP Address Tracking</span>
              <span className="text-blue-400 font-semibold">156 IPs monitored</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Unusual Profiles</span>
              <span className="text-purple-400 font-semibold">8 detected</span>
            </div>
          </div>
        </AdminGlassCard>

        <AdminGlassCard title="Fraud Prevention Stats">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-300">False Positives</span>
              <span className="text-green-400">1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Detection Accuracy</span>
              <span className="text-green-400">94.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Avg Response Time</span>
              <span className="text-blue-400">2.3 min</span>
            </div>
          </div>
        </AdminGlassCard>
      </div>
    </div>
  )
}
