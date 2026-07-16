'use client'

import { useState, useEffect } from 'react'
import { Cog, Play, Pause, Plus, Edit3, Trash2, Zap, ArrowRight, Clock, Users, TrendingUp, Target, CheckCircle2, AlertCircle, Settings2 } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'draft'
  trigger: {
    type: 'user_signup' | 'gig_completed' | 'payment_made' | 'profile_updated' | 'time_based'
    condition: string
  }
  actions: WorkflowAction[]
  executions: number
  successRate: number
  lastRun: string
  createdBy: string
}

interface WorkflowAction {
  id: string
  type: 'send_email' | 'send_notification' | 'update_profile' | 'create_task' | 'update_permissions' | 'send_webhook'
  config: {
    template?: string
    message?: string
    subject?: string
    url?: string
    permissions?: string[]
    task?: string
  }
  delay?: number // minutes
}

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Welcome Series',
      description: 'Automated onboarding emails and notifications for new users',
      status: 'active',
      trigger: {
        type: 'user_signup',
        condition: 'When a new user registers'
      },
      actions: [
        {
          id: '1',
          type: 'send_email',
          config: {
            template: 'welcome_email',
            subject: 'Welcome to Hirezy!',
            message: 'Thank you for joining our platform...'
          },
          delay: 0
        },
        {
          id: '2',
          type: 'send_notification',
          config: {
            message: 'Complete your profile to get started!',
            template: 'profile_completion_prompt'
          },
          delay: 30
        }
      ],
      executions: 1247,
      successRate: 98.5,
      lastRun: '5 minutes ago',
      createdBy: 'John Admin'
    },
    {
      id: '2',
      name: 'Freelancer Success Path',
      description: 'Guide freelancers through skill development and job application process',
      status: 'active',
      trigger: {
        type: 'profile_updated',
        condition: 'When freelancer adds new skills'
      },
      actions: [
        {
          id: '3',
          type: 'send_notification',
          config: {
            message: 'Great! Here are gigs matching your new skills',
            template: 'skill_match_notification'
          },
          delay: 5
        },
        {
          id: '4',
          type: 'create_task',
          config: {
            task: 'Browse personalized gig recommendations'
          },
          delay: 15
        }
      ],
      executions: 892,
      successRate: 95.2,
      lastRun: '12 minutes ago',
      createdBy: 'Sarah Manager'
    },
    {
      id: '3',
      name: 'Premium Upgrade Flow',
      description: 'Nurture high-performing users toward premium subscriptions',
      status: 'paused',
      trigger: {
        type: 'gig_completed',
        condition: 'When user completes 3 successful gigs'
      },
      actions: [
        {
          id: '5',
          type: 'send_email',
          config: {
            template: 'premium_nurture',
            subject: 'Unlock Premium Features',
            message: 'You\'ve completed 3 gigs successfully! Upgrade to premium for more opportunities...'
          },
          delay: 1440 // 24 hours
        },
        {
          id: '6',
          type: 'update_permissions',
          config: {
            permissions: ['premium_trial_access']
          },
          delay: 0
        }
      ],
      executions: 0,
      successRate: 0,
      lastRun: 'Never',
      createdBy: 'Mike Sales'
    }
  ])

  const toggleWorkflowStatus = (workflowId: string) => {
    setWorkflows(prev => prev.map(w =>
      w.id === workflowId
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ))
  }

  const deleteWorkflow = (workflowId: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== workflowId))
    if (selectedWorkflow?.id === workflowId) {
      setSelectedWorkflow(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-4 h-4 text-green-400" />
      case 'paused': return <Pause className="w-4 h-4 text-yellow-400" />
      case 'draft': return <Settings2 className="w-4 h-4 text-slate-400" />
      default: return null
    }
  }

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return '🎯'
      case 'gig_completed': return '✅'
      case 'payment_made': return '💳'
      case 'profile_updated': return '👤'
      case 'time_based': return '⏰'
      default: return '⚡'
    }
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'send_email': return '✉️'
      case 'send_notification': return '🔔'
      case 'update_profile': return '👤'
      case 'create_task': return '📋'
      case 'update_permissions': return '🔐'
      case 'send_webhook': return '🌐'
      default: return '⚡'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8 text-blue-400" />
            Workflow Automation Engine
          </h1>
          <p className="text-slate-300">Intelligent rule-based automation for platform operations and user engagement</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setShowCreate(true)} className="bg-gradient-to-r from-green-600 to-teal-600">
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Edit3 className="w-4 h-4 mr-2" />
            Workflow Templates
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Zap className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-blue-400">{workflows.length}</div>
            <div className="text-slate-400 text-xs">Active Workflows</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Target className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-green-400">{workflows.reduce((sum, w) => sum + w.executions, 0).toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Total Executions</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-purple-400">
              {(workflows.reduce((sum, w) => sum + (w.executions * w.successRate), 0) /
                workflows.reduce((sum, w) => sum + w.executions, 1)).toFixed(1)}%
            </div>
            <div className="text-slate-400 text-xs">Avg Success Rate</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-xl font-bold text-yellow-400">247</div>
            <div className="text-slate-400 text-xs">Executed Today</div>
          </div>
        </AdminGlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflows List */}
        <div className="lg:col-span-2">
          <AdminGlassCard title="Automation Workflows">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedWorkflow?.id === workflow.id
                      ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500/50'
                      : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold">{workflow.name}</h4>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                          workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusIcon(workflow.status)}
                          {workflow.status}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{workflow.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <span className="text-base">{getTriggerIcon(workflow.trigger.type)}</span>
                      <span>Trigger: {workflow.trigger.condition}</span>
                    </div>
                    <div>•</div>
                    <div>{workflow.actions.length} actions</div>
                    <div>•</div>
                    <div>{workflow.executions.toLocaleString()} runs</div>
                    <div>•</div>
                    <div className="text-green-400">{workflow.successRate}% success</div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div>Last ran: {workflow.lastRun}</div>
                      <div>By: {workflow.createdBy}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWorkflowStatus(workflow.id)
                        }}
                        size="sm"
                        className={`${
                          workflow.status === 'active'
                            ? 'bg-yellow-600 hover:bg-yellow-700'
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {workflow.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteWorkflow(workflow.id)
                        }}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </div>

        {/* Workflow Details / Quick Actions */}
        <div>
          {selectedWorkflow ? (
            <AdminGlassCard title="Workflow Details">
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Trigger</h4>
                  <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded">
                    <span className="text-base">{getTriggerIcon(selectedWorkflow.trigger.type)}</span>
                    <div>
                      <div className="text-slate-300 text-sm font-medium capitalize">
                        {selectedWorkflow.trigger.type.replace('_', ' ')}
                      </div>
                      <div className="text-slate-500 text-xs">{selectedWorkflow.trigger.condition}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Actions ({selectedWorkflow.actions.length})</h4>
                  <div className="space-y-2">
                    {selectedWorkflow.actions.map((action, index) => (
                      <div key={action.id} className="flex items-start gap-3 p-2 bg-slate-800/30 rounded">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs">{index + 1}.</span>
                            <span className="text-sm">{getActionIcon(action.type)}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-slate-300 text-sm font-medium capitalize">
                            {action.type.replace('_', ' ')}
                          </div>
                          {action.config.subject && (
                            <div className="text-slate-500 text-xs truncate">{action.config.subject}</div>
                          )}
                          {action.config.message && (
                            <div className="text-slate-500 text-xs truncate">{action.config.message}</div>
                          )}
                          {action.delay !== undefined && action.delay > 0 && (
                            <div className="text-slate-500 text-xs">Delay: {action.delay} minutes</div>
                          )}
                        </div>
                        {index < selectedWorkflow.actions.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-600 mt-1 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600">
                  <h4 className="text-white font-semibold mb-2">Performance</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-slate-400">Total Runs</div>
                      <div className="text-white font-semibold">{selectedWorkflow.executions.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Success Rate</div>
                      <div className="text-green-400 font-semibold">{selectedWorkflow.successRate}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          ) : (
            <AdminGlassCard title="Automation Insights">
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold mb-3">Common Triggers</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'User Signup', count: '1.2K', growth: '+12%' },
                      { name: 'Gig Completed', count: '892', growth: '+8%' },
                      { name: 'Profile Updated', count: '456', growth: '+15%' },
                      { name: 'Payment Made', count: '234', growth: '+5%' },
                    ].map((trigger) => (
                      <div key={trigger.name} className="flex justify-between items-center p-2 bg-slate-800/30 rounded">
                        <span className="text-slate-300 text-sm">{trigger.name}</span>
                        <div className="text-right">
                          <div className="text-white font-semibold">{trigger.count}</div>
                          <div className="text-green-400 text-xs">{trigger.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-3">System Health</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Active Workflows</span>
                      <span className="text-green-400 font-semibold">{workflows.filter(w => w.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Queued Executions</span>
                      <span className="text-blue-400 font-semibold">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Error Rate</span>
                      <span className="text-yellow-400 font-semibold">0.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          )}
        </div>
      </div>

      {/* Workflow Templates */}
      {!selectedWorkflow && (
        <AdminGlassCard title="Workflow Templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: 'Email Verification Flow',
                description: 'Send verification emails and welcome sequence',
                triggers: 1,
                actions: 4
              },
              {
                name: 'Engagement Booster',
                description: 'Re-engage inactive users with personalized content',
                triggers: 2,
                actions: 3
              },
              {
                name: 'Quality Assurance',
                description: 'Flag and review high-risk user activity',
                triggers: 3,
                actions: 5
              },
              {
                name: 'Success Celebration',
                description: 'Reward milestones and achievements',
                triggers: 2,
                actions: 3
              },
            ].map((template) => (
              <div key={template.name} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-all cursor-pointer">
                <div className="text-white font-semibold mb-2">{template.name}</div>
                <div className="text-slate-400 text-sm mb-3">{template.description}</div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{template.triggers} triggers</span>
                  <span>{template.actions} actions</span>
                </div>
                <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600">
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      )}
    </div>
  )
}
