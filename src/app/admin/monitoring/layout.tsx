import { ReactNode } from 'react'

interface MonitoringLayoutProps {
  children: ReactNode
}

export default function MonitoringLayout({ children }: MonitoringLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Monitoring</h1>
          <p className="text-slate-300">Enterprise-level platform monitoring and insights</p>
        </div>
        {children}
      </div>
    </div>
  )
}
