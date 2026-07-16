'use client'

import { useState, useRef, DragEvent, useEffect } from 'react'
import { BarChart3, Download, Palette, Filter, Calendar, Settings, Plus, X, TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { adminStats, chartData, users } from '@/lib/demoData'

interface Widget {
  id: string
  type: 'metric' | 'chart' | 'table'
  title: string
  x: number
  y: number
  width: number
  height: number
  config: any
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  widgets: Widget[]
  theme: 'professional' | 'minimal' | 'enterprise'
}

export default function AdminReportsPage() {
  const [selectedWidgets, setSelectedWidgets] = useState<Widget[]>([])
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)
  const [filterDateRange, setFilterDateRange] = useState('30days')
  const [filterRole, setFilterRole] = useState('all')
  const [selectedTheme, setSelectedTheme] = useState<'professional' | 'minimal' | 'enterprise'>('professional')
  const canvasRef = useRef<HTMLDivElement>(null)

  const availableWidgets = [
    { id: 'user-metric', type: 'metric', title: 'Total Users', icon: Users },
    { id: 'revenue-metric', type: 'metric', title: 'Revenue', icon: DollarSign },
    { id: 'activity-metric', type: 'metric', title: 'Active Sessions', icon: Activity },
    { id: 'growth-chart', type: 'chart', title: 'Growth Trends', icon: TrendingUp },
    { id: 'user-table', type: 'table', title: 'User Analytics', icon: BarChart3 }
  ]

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level business metrics for leadership',
      theme: 'professional',
      widgets: []
    },
    {
      id: 'operational',
      name: 'Operations Dashboard',
      description: 'Daily operational metrics and KPIs',
      theme: 'minimal',
      widgets: []
    },
    {
      id: 'financial',
      name: 'Financial Reports',
      description: 'Revenue, costs, and financial forecasts',
      theme: 'enterprise',
      widgets: []
    }
  ]

  const handleDragStart = (e: DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId)
    e.dataTransfer.setData('text/plain', widgetId)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const widgetId = draggedWidget
    if (widgetId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const widget = availableWidgets.find(w => w.id === widgetId)
      if (widget) {
        const newWidget: Widget = {
          id: `${widget.id}-${Date.now()}`,
          type: widget.type as 'metric' | 'chart' | 'table',
          title: widget.title,
          x,
          y,
          width: 300,
          height: 200,
          config: { filterDateRange, filterRole }
        }
        setSelectedWidgets(prev => [...prev, newWidget])
      }
    }
    setDraggedWidget(null)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const removeWidget = (widgetId: string) => {
    setSelectedWidgets(prev => prev.filter(w => w.id !== widgetId))
  }

  const exportReport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting report as ${format} with ${selectedWidgets.length} widgets`)
    // Simulate export
    alert(`Report exported as ${format.toUpperCase()} with ${selectedWidgets.length} widgets!`)
  }

  const saveTemplate = () => {
    const template: ReportTemplate = {
      id: `custom-${Date.now()}`,
      name: `Custom Report ${new Date().toLocaleDateString()}`,
      description: 'Custom dashboard configuration',
      theme: selectedTheme,
      widgets: selectedWidgets
    }
    console.log('Template saved:', template)
    alert('Report template saved!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Advanced BI Reports Builder</h1>
          <p className="text-slate-300">Create custom enterprise dashboards with drag-drop analytics</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => exportReport('pdf')} className="bg-gradient-to-r from-green-600 to-teal-600">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={() => exportReport('excel')} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button onClick={saveTemplate} className="bg-gradient-to-r from-orange-600 to-red-600">
            <Settings className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Report Builder Tools */}
      <AdminGlassCard title="Dashboard Configuration">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-slate-300 mb-2 font-semibold">Date Range</label>
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-2 font-semibold">Filter Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="all">All Roles</option>
              <option value="students">Students Only</option>
              <option value="recruiters">Recruiters Only</option>
              <option value="premium">Premium Users</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-2 font-semibold">Theme</label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as 'professional' | 'minimal' | 'enterprise')}
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="professional">Professional</option>
              <option value="minimal">Minimal</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-2 font-semibold">Auto Update</label>
            <div className="flex items-center pt-2">
              <input type="checkbox" defaultChecked className="mr-3" />
              <span className="text-slate-300 text-sm">5-minute refresh</span>
            </div>
          </div>
        </div>
      </AdminGlassCard>

      {/* Widget Palette & Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Widget Palette */}
        <AdminGlassCard title="Widget Library">
          <div className="space-y-3">
            <h4 className="text-white font-semibold mb-4">Drag widgets onto the canvas</h4>
            {availableWidgets.map((widget) => (
              <div
                key={widget.id}
                draggable
                onDragStart={(e) => handleDragStart(e, widget.id)}
                className="flex items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700 cursor-move hover:bg-slate-800 transition-colors"
              >
                <widget.icon className="w-5 h-5 text-blue-400 mr-3" />
                <span className="text-slate-300 font-medium">{widget.title}</span>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t border-slate-700">
              <h4 className="text-white font-semibold mb-4">Report Templates</h4>
              <div className="space-y-2">
                {reportTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTheme(template.theme)
                      setSelectedWidgets(template.widgets)
                    }}
                    className="w-full text-left p-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
                  >
                    <div className="text-white font-medium">{template.name}</div>
                    <div className="text-slate-400 text-sm">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AdminGlassCard>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <AdminGlassCard title="Interactive Dashboard Canvas">
            <div
              ref={canvasRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="min-h-96 bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg p-8 text-center"
              style={{ backgroundImage: selectedWidgets.length === 0 ? 'radial-gradient(circle, #334155 1px, transparent 1px)' : 'none', backgroundSize: '30px 30px' }}
            >
              {selectedWidgets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <BarChart3 className="w-16 h-16 text-slate-600 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">Drop widgets here</h3>
                  <p className="text-slate-500">Drag and drop metrics, charts, and tables from the library to build your custom dashboard</p>
                  <Button
                    onClick={() => setSelectedWidgets([
                      {
                        id: 'demo-metric',
                        type: 'metric',
                        title: 'Sample Metric',
                        x: 100,
                        y: 50,
                        width: 280,
                        height: 160,
                        config: {}
                      }
                    ])}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Demo Widget
                  </Button>
                </div>
              ) : (
                <div className="relative h-full min-h-96">
                  {selectedWidgets.map((widget) => (
                    <div
                      key={widget.id}
                      className="absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden"
                      style={{
                        left: widget.x,
                        top: widget.y,
                        width: widget.width,
                        height: widget.height
                      }}
                    >
                      {/* Widget Header */}
                      <div className="flex items-center justify-between p-3 border-b border-slate-700">
                        <h4 className="text-white font-semibold text-sm">{widget.title}</h4>
                        <button
                          onClick={() => removeWidget(widget.id)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Widget Content */}
                      <div className="p-4 h-full flex items-center justify-center">
                        {widget.type === 'metric' && (
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                              {widget.title === 'Total Users' ? adminStats.totalUsers.toLocaleString() :
                               widget.title === 'Revenue' ? `$${adminStats.platformRevenue.toLocaleString()}` :
                               widget.title === 'Active Sessions' ? '1,247' : 'N/A'}
                            </div>
                            <div className="text-slate-400 text-sm">{widget.title}</div>
                          </div>
                        )}
                        {widget.type === 'chart' && (
                          <div className="w-full h-20 flex items-end justify-around">
                            {[40, 60, 80, 50, 70, 90, 60].map((height, i) => (
                              <div
                                key={i}
                                className="bg-gradient-to-t from-blue-500 to-blue-400 w-4 rounded-t"
                                style={{ height: `${height}%` }}
                              />
                            ))}
                          </div>
                        )}
                        {widget.type === 'table' && (
                          <div className="w-full text-xs">
                            <div className="flex justify-between border-b border-slate-700 py-1">
                              <span className="text-slate-300">Type</span>
                              <span className="text-white font-semibold">Count</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-slate-300">Students</span>
                              <span className="text-green-400">875</span>
                            </div>
                            <div className="flex justify-between py-1">
                              <span className="text-slate-300">Recruiters</span>
                              <span className="text-blue-400">243</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AdminGlassCard>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AdminGlassCard title="Advanced Analytics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-4">Cohort Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Week 1 Retention</span>
                <span className="text-green-400">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Week 4 Retention</span>
                <span className="text-yellow-400">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Lifetime Value</span>
                <span className="text-green-400">$1,247</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Funnel Analysis</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-20 h-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded"></div>
                <span className="text-slate-300">Signups (100%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-2 bg-gradient-to-r from-green-500 to-green-400 rounded"></div>
                <span className="text-slate-300">Profile Complete (85%)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded"></div>
                <span className="text-slate-300">First Gig (28%)</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Performance Benchmarks</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Avg Session Time</span>
                <span className="text-blue-400">12.4 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Bounce Rate</span>
                <span className="text-red-400">3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Conversion Rate</span>
                <span className="text-green-400">24.7%</span>
              </div>
            </div>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
