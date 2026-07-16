import { ReactNode } from 'react'

interface AnalyticsHubLayoutProps {
  children: ReactNode
}

export default function AnalyticsHubLayout({ children }: AnalyticsHubLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Recruiter Analytics Hub</h1>
          <p className="text-slate-300">Comprehensive hiring analytics and AI-powered insights</p>
        </div>
        {children}
      </div>
    </div>
  )
}
