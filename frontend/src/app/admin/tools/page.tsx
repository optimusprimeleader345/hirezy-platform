'use client'

import { Zap, Brain, Sparkles, Lightbulb } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

export default function AdminToolsPage() {
  const tools = [
    {
      name: "AI Log Analyzer",
      description: "Automatically analyzes system logs for anomalies and patterns",
      icon: Brain,
      status: "Ready"
    },
    {
      name: "AI Gig Risk Predictor",
      description: "Uses ML to predict gig success probability and risk factors",
      icon: Zap,
      status: "Ready"
    },
    {
      name: "AI Student Profile Reviewer",
      description: "Analyzes student profiles for completeness and credibility",
      icon: Sparkles,
      status: "Training"
    },
    {
      name: "AI Recruiter Quality Score",
      description: "Scores recruiter profiles based on hiring success patterns",
      icon: Lightbulb,
      status: "Ready"
    },
    {
      name: "AI Market Trend Forecaster",
      description: "Predicts skill demand trends and market changes",
      icon: Brain,
      status: "Ready"
    }
  ]

  const handleRunTool = (toolName: string) => {
    console.log(`Running ${toolName}...`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin AI Toolkit</h1>
        <p className="text-slate-300">Intelligent administrative tools powered by AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <AdminGlassCard key={tool.name} title={tool.name}>
            <div className="flex flex-col h-full">
              <tool.icon className="w-8 h-8 text-blue-400 mb-3" />
              <p className="text-slate-300 mb-4 flex-1">{tool.description}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  tool.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {tool.status}
                </span>
                <Button
                  size="sm"
                  disabled={tool.status !== 'Ready'}
                  onClick={() => handleRunTool(tool.name)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Run Tool
                </Button>
              </div>
            </div>
          </AdminGlassCard>
        ))}
      </div>

      {/* Results Panel */}
      <AdminGlassCard title="Recent AI Insights">
        <div className="space-y-4">
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Market Trend Prediction</h4>
            <p className="text-slate-300 text-sm">React developers will see 45% demand increase in Q1 2025</p>
            <span className="text-xs text-slate-500">Generated 2 hours ago</span>
          </div>
          <div className="p-4 bg-slate-800 rounded-lg">
            <h4 className="text-white font-semibold mb-2">Risk Assessment</h4>
            <p className="text-slate-300 text-sm">Gig #789 has medium risk due to budget overestimation</p>
            <span className="text-xs text-slate-500">Generated 5 minutes ago</span>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
