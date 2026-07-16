'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCircle, XCircle, Eye, Send, Plus, Settings, Clock, Users, AlertTriangle, Info, Zap, Mail, MessageSquare, Smartphone, Calendar, Filter, Search, Trash2, Archive, Star, ThumbsUp } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Notification {
  id: string
  type: string
  channel: 'email' | 'sms' | 'push' | 'in-app'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  title: string
  message: string
  recipient: string
  recipientId: string
  timestamp: string
  read: boolean
  delivered: boolean
  status: 'sent' | 'delivered' | 'failed' | 'scheduled'
  template?: string
  metadata?: Record<string, any>
}

interface NotificationTemplate {
  id: string
  name: string
  category: string
  subject: string
  content: string
  variables: string[]
  lastUsed?: string
  useCount: number
}

export default function AdminNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [channelFilter, setChannelFilter] = useState('all')
  const [realTimeNotifications, setRealTimeNotifications] = useState(0)
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Rich notification data
  const initialNotifications: Notification[] = [
    {
      id: "NTF001",
      type: "system",
      channel: "email",
      priority: "urgent",
      title: "Critical: Database Maintenance Completed",
      message: "Scheduled database maintenance has been successfully completed. All services have been restored and are operating normally.",
      recipient: "Admin Team",
      recipientId: "ADMIN_TEAM",
      timestamp: new Date(Date.now() - 300000).toISOString().slice(0, 16).replace('T', ' '),
      read: false,
      delivered: true,
      status: "delivered",
      template: "system-maintenance-complete",
      metadata: {
        maintenanceType: "database-optimization",
        duration: 45,
        impactLevel: "minimal",
        nextMaintenance: "2024-12-15"
      }
    },
    {
      id: "NTF002",
      type: "moderation",
      channel: "push",
      priority: "high",
      title: "New Gig Moderation Queue",
      message: "47 new gig submissions are awaiting moderation. High priority items include React and Python development projects.",
      recipient: "Moderation Team",
      recipientId: "MOD_TEAM",
      timestamp: new Date(Date.now() - 600000).toISOString().slice(0, 16).replace('T', ' '),
      read: false,
      delivered: true,
      status: "sent",
      template: "moderation-queue-alert",
      metadata: {
        queueSize: 47,
        highPriority: 12,
        urgentCount: 3,
        oldestInQueue: 45
      }
    },
    {
      id: "NTF003",
      type: "user",
      channel: "sms",
      priority: "low",
      title: "Premium User Signup",
      message: "VIP freelancer Sarah Johnson has upgraded to premium tier. Her profile now includes AI-powered recommendations.",
      recipient: "Customer Success",
      recipientId: "CS_TEAM",
      timestamp: new Date(Date.now() - 900000).toISOString().slice(0, 16).replace('T', ' '),
      read: true,
      delivered: true,
      status: "delivered",
      template: "premium-upgrade-success",
      metadata: {
        userTier: "Premium",
        signupValue: 29.99,
        referralSource: "direct",
        satisfactionScore: 9.2
      }
    },
    {
      id: "NTF004",
      type: "security",
      channel: "push",
      priority: "urgent",
      title: "Security Alert: Unusual Login Activity",
      message: "Multiple login attempts detected from unusual geographic locations for guest user account.",
      recipient: "Security Team",
      recipientId: "SEC_TEAM",
      timestamp: new Date(Date.now() - 1500000).toISOString().slice(0, 16).replace('T', ' '),
      read: false,
      delivered: false,
      status: "failed",
      template: "security-threat-alert",
      metadata: {
        ipAddresses: ["203.0.113.10", "141.101.75.142"],
        locations: ["Tokyo, JP", "London, UK"],
        attempts: 7,
        riskScore: 0.85
      }
    },
    {
      id: "NTF005",
      type: "finance",
      channel: "email",
      priority: "normal",
      title: "Weekly Payment Report",
      message: "Payment processing completed for this week. Total transactions: $156,789.45 across 2,341 payments.",
      recipient: "Finance Department",
      recipientId: "FIN_TEAM",
      timestamp: new Date(Date.now() - 2100000).toISOString().slice(0, 16).replace('T', ' '),
      read: true,
      delivered: true,
      status: "delivered",
      template: "weekly-payment-summary",
      metadata: {
        totalAmount: 156789.45,
        transactionCount: 2341,
        averageAmount: 66.98,
        successRate: 99.8
      }
    },
    {
      id: "NTF006",
      type: "marketing",
      channel: "push",
      priority: "high",
      title: "VIP Client Acquisition",
      message: "TechCorp Industries signed up for our enterprise pricing plan. $49,999 annual contract secured.",
      recipient: "Sales & Marketing",
      recipientId: "SALES_TEAM",
      timestamp: new Date(Date.now() - 2700000).toISOString().slice(0, 16).replace('T', ' '),
      read: false,
      delivered: true,
      status: "delivered",
      template: "enterprise-client-win",
      metadata: {
        contractValue: 49999,
        planType: "Enterprise",
        clientSize: "Enterprise",
        dealTimeline: "3 months",
        closeDate: "2024-11-25"
      }
    }
  ]

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  // Notification templates
  const [templates] = useState<NotificationTemplate[]>([
    {
      id: "TPL001",
      name: "System Maintenance Complete",
      category: "system",
      subject: "System Maintenance Completed Successfully",
      content: "Scheduled {{maintenanceType}} maintenance has been successfully completed. All services are now operational.",
      variables: ["maintenanceType", "duration", "impactLevel"],
      lastUsed: "2024-11-28T14:30:00",
      useCount: 12
    },
    {
      id: "TPL002",
      name: "New Moderation Queue Alert",
      category: "moderation",
      subject: "New Submissions Awaiting Moderation",
      content: "{{queueSize}} new submissions are waiting for your review. {{highPriority}} high-priority items require immediate attention.",
      variables: ["queueSize", "highPriority", "urgentCount"],
      lastUsed: "2024-11-28T13:15:00",
      useCount: 8
    },
    {
      id: "TPL003",
      name: "Security Threat Alert",
      category: "security",
      subject: "Security Alert: Unusual Activity Detected",
      content: "Security alert triggered for {{locations}}. Risk score: {{riskScore}}. Require immediate investigation.",
      variables: ["locations", "riskScore", "attackType"],
      lastUsed: "2024-11-27T16:45:00",
      useCount: 23
    },
    {
      id: "TPL004",
      name: "User Premium Upgrade",
      category: "user",
      subject: "Welcome to Premium! 🎉",
      content: "Congratulations! You've successfully upgraded to {{userTier}} tier. Enjoy your new {{benefits}}.",
      variables: ["userTier", "benefits", "features"],
      lastUsed: "2024-11-27T12:00:00",
      useCount: 156
    }
  ])

  // Real-time notification generation
  useEffect(() => {
    if (!isAutoRefresh) return

    const interval = setInterval(() => {
      const eventTypes = ['security', 'system', 'user', 'finance', 'moderation', 'marketing']
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
      const priorities = ['low', 'normal', 'high', 'urgent'] as const
      const randomPriority = priorities[Math.floor(Math.random() * priorities.length)]

      const newNotification: Notification = {
        id: `NTF${Date.now()}`,
        type: randomType,
        channel: ['email', 'push', 'sms'][Math.floor(Math.random() * 3)] as any,
        priority: randomPriority,
        title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Alert`,
        message: generateRandomMessage(randomType),
        recipient: 'Admin Team',
        recipientId: 'ADMIN_TEAM',
        timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
        read: false,
        delivered: Math.random() > 0.1,
        status: 'delivered',
        template: Math.random() > 0.5 ? `tpl-${randomType}` : undefined
      }

      setNotifications(prev => [newNotification, ...prev.slice(0, 49)])
      setRealTimeNotifications(prev => prev + 1)
      setLastUpdate(new Date())
    }, 12000)

    return () => clearInterval(interval)
  }, [isAutoRefresh])

  const generateRandomMessage = (type: string): string => {
    const messages = {
      security: ["Unusual login pattern detected", "Security scan completed", "Account verification required"],
      system: ["Database optimization complete", "Server backup successful", "Cache cleared successfully"],
      user: ["New premium subscriber", "User profile updated", "Account verification complete"],
      finance: ["Payment processed successfully", "Weekly payout issued", "Subscription renewed"],
      moderation: ["New content submitted for review", "Gig approved automatically", "Content flagged for review"],
      marketing: ["Campaign goal achieved", "New lead conversion", "Marketing email sent"]
    }
    const options = messages[type as keyof typeof messages] || ["Event occurred"]
    return options[Math.floor(Math.random() * options.length)]
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesPriority = priorityFilter === 'all' || notification.priority === priorityFilter
    const matchesChannel = channelFilter === 'all' || notification.channel === channelFilter

    return matchesSearch && matchesType && matchesPriority && matchesChannel
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-900/20'
      case 'high': return 'text-orange-400 bg-orange-900/20'
      case 'normal': return 'text-blue-400 bg-blue-900/20'
      case 'low': return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />
      case 'sms': return <Smartphone className="w-4 h-4" />
      case 'push': return <Bell className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const notificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    urgent: notifications.filter(n => n.priority === 'urgent').length,
    delivered: notifications.filter(n => n.delivered).length
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Bell className="w-10 h-10 text-blue-400" />
            Advanced Notifications Center
          </h1>
          <p className="text-slate-300">Enterprise-grade communication hub with automated templates, multi-channel delivery, and real-time tracking</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
            isAutoRefresh ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-slate-700 text-slate-400'
          }`}>
            <div className="relative">
              <Zap className={`w-4 h-4 ${isAutoRefresh ? 'text-green-400 animate-pulse' : 'text-slate-500'}`} />
              {isAutoRefresh && (
                <div className="absolute inset-0 w-4 h-4 border-2 border-green-400 rounded-full border-t-transparent animate-spin opacity-50"></div>
              )}
            </div>
            <span>Live Stream: {isAutoRefresh ? 'ACTIVE' : 'PAUSED'}</span>
          </div>
          <Button onClick={() => setIsAutoRefresh(!isAutoRefresh)}>
            {isAutoRefresh ? 'Pause' : 'Resume'} Live Updates
          </Button>
        </div>
      </div>

      {/* Notification Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{notificationStats.total}</div>
            <div className="text-slate-400 text-sm">Total Notifications</div>
            {isAutoRefresh && <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse mx-auto mt-1"></div>}
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">{notificationStats.unread}</div>
            <div className="text-slate-400 text-sm">Unread Messages</div>
            {notificationStats.unread > 0 && <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse mx-auto mt-1"></div>}
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{notificationStats.urgent}</div>
            <div className="text-slate-400 text-sm">Urgent Alerts</div>
            {notificationStats.urgent > 0 && <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse mx-auto mt-1"></div>}
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{notificationStats.delivered}%</div>
            <div className="text-slate-400 text-sm">Delivery Rate</div>
            <div className="text-xs text-slate-500">Last 24h</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Advanced Filtering & Controls */}
      <AdminGlassCard title="Real-time Notification Hub">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search notifications, recipients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">All Types</option>
            <option value="system">System</option>
            <option value="security">Security</option>
            <option value="user">User</option>
            <option value="finance">Finance</option>
            <option value="moderation">Moderation</option>
            <option value="marketing">Marketing</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
          >
            <option value="all">All Channels</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
            <option value="in-app">In-App</option>
          </select>
          <div className="flex gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-400">
              <Settings className="w-4 h-4 mr-1" />
              Templates
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700 pt-4 mt-4">
          <span>Real-time updates: {isAutoRefresh ? 'Active' : 'Paused'} • {realTimeNotifications} events received</span>
          <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </AdminGlassCard>

      {/* Enhanced Notifications Grid */}
      <AdminGlassCard title="Notification Feed">
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-slate-800/50 ${
                notification.read ? 'bg-slate-900/30 border-slate-700' :
                notification.priority === 'urgent' ? 'bg-red-900/20 border-red-600' :
                notification.priority === 'high' ? 'bg-orange-900/20 border-orange-600' :
                'bg-blue-900/20 border-blue-600'
              }`}
              onClick={() => setSelectedNotification(notification)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {index === 0 && isAutoRefresh ? <Zap className="w-5 h-5 text-green-400 animate-pulse" /> : getChannelIcon(notification.channel)}
                    <span className="text-sm font-semibold text-white">{notification.title}</span>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(notification.priority)}`}>
                    {notification.priority.toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    {notification.type}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{notification.timestamp}</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{notification.recipient}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    notification.delivered ? 'bg-green-400' :
                    notification.status === 'failed' ? 'bg-red-400' :
                    'bg-yellow-400'
                  }`} />
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${
                notification.read ? 'text-slate-400' : 'text-slate-300'
              }`}>
                {notification.message}
              </p>

              {notification.metadata && Object.keys(notification.metadata).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(notification.metadata).slice(0, 3).map(([key, value]) => (
                    <span key={key} className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
                      {key}: {Array.isArray(value) ? value.length : String(value)}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded text-xs ${
                    notification.status === 'delivered' ? 'bg-green-900/50 text-green-400' :
                    notification.status === 'failed' ? 'bg-red-900/50 text-red-400' :
                    'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {notification.status.toUpperCase()}
                  </span>
                  {notification.template && (
                    <span className="text-slate-500">
                      Template: {notification.template}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!notification.read && (
                    <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="text-xs h-7 px-2">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-2 border-red-600 text-red-400"
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto mb-4 text-slate-600" />
            <p className="text-slate-400">No notifications match your current filters.</p>
          </div>
        )}
      </AdminGlassCard>

      {/* Notification Composer/Modal */}
      {(selectedNotification || selectedTemplate) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedNotification ? 'Notification Details' : 'Notification Template'}
                </h3>
                <div className="text-slate-400 flex items-center gap-4">
                  {selectedNotification && (
                    <>
                      {getChannelIcon(selectedNotification.channel)}
                      <span>{selectedNotification.channel.toUpperCase()}</span>
                      <span>•</span>
                      <AlertTriangle className={`w-4 h-4 ${
                        selectedNotification.priority === 'urgent' ? 'text-red-400' : 'text-yellow-400'
                      }`} />
                      <span>{selectedNotification.priority.toUpperCase()}</span>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedNotification(null)
                  setSelectedTemplate(null)
                }}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            {selectedNotification && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className="text-white">{selectedNotification.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Delivered:</span>
                        <span className={selectedNotification.delivered ? 'text-green-400' : 'text-red-400'}>
                          {selectedNotification.delivered ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Recipient:</span>
                        <span className="text-white">{selectedNotification.recipient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Channel:</span>
                        <span className="text-white">{selectedNotification.channel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Event Details</h4>
                    <div className="text-slate-300 text-sm leading-relaxed">{selectedNotification.message}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedNotification.metadata && Object.keys(selectedNotification.metadata).length > 0 && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">Metadata</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(selectedNotification.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-slate-400 capitalize">{key}:</span>
                            <span className="text-white">
                              {Array.isArray(value) ? value.join(', ') :
                               typeof value === 'number' ? value.toLocaleString() :
                               String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Resend Notification
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                    <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {selectedTemplate && (
              <div className="space-y-6">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white font-semibold">{selectedTemplate.name}</h4>
                      <p className="text-slate-400 text-sm">Category: {selectedTemplate.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-400">{selectedTemplate.useCount}</div>
                      <div className="text-xs text-slate-500">Uses</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 text-sm">Subject Template</label>
                      <div className="text-white font-mono text-sm bg-slate-900 p-2 rounded mt-1">
                        {selectedTemplate.subject}
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 text-sm">Content Template</label>
                      <div className="text-white font-mono text-sm bg-slate-900 p-3 rounded mt-1 whitespace-pre-wrap">
                        {selectedTemplate.content}
                      </div>
                    </div>

                    {selectedTemplate.variables.length > 0 && (
                      <div>
                        <label className="text-slate-400 text-sm">Variables</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedTemplate.variables.map(variable => (
                            <span key={variable} className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded">
                              {variable}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-400">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Template
                  </Button>
                  <Button variant="outline" className="border-yellow-600 text-yellow-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
