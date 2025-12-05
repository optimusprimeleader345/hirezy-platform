'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Send, Users, Bell, AlertTriangle, Target, Calendar, Clock, CheckCircle, XCircle, TrendingUp, Mail, Smartphone, Globe, Settings, Zap, Eye, ThumbsUp } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MessageCampaign {
  id: string
  title: string
  content: string
  audience: {
    type: 'all' | 'segment' | 'individual'
    segment?: string
    count: number
  }
  type: 'announcement' | 'alert' | 'emergency' | 'marketing' | 'update'
  status: 'draft' | 'scheduled' | 'sent' | 'sending'
  scheduledFor?: string
  sentAt?: string
  deliveryStats: {
    sent: number
    delivered: number
    opened: number
    clicked: number
  }
  priority: 'low' | 'normal' | 'high' | 'critical'
  channels: ('email' | 'push' | 'in-app')[]
  template: string
}

interface UserSegment {
  id: string
  name: string
  description: string
  count: number
  criteria: string
  icon: string
}

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  content: string
  type: 'announcement' | 'alert' | 'marketing' | 'system'
  variables: string[]
}

export default function AdminCommunicationPage() {
  const [activeTab, setActiveTab] = useState<'compose' | 'campaigns' | 'templates' | 'analytics'>('compose')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [selectedAudience, setSelectedAudience] = useState<string>('all')
  const [messageType, setMessageType] = useState<'announcement' | 'alert' | 'emergency'>('announcement')
  const [scheduledDate, setScheduledDate] = useState('')
  const [messageTitle, setMessageTitle] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [isUrgent, setIsUrgent] = useState(false)
  const [channels, setChannels] = useState<('email' | 'push' | 'in-app')[]>(['email', 'push'])
  const [selectedCampaign, setSelectedCampaign] = useState<MessageCampaign | null>(null)

  // Mock data
  const userSegments: UserSegment[] = [
    { id: 'students', name: 'All Students', description: 'Active job seekers and freelancers', count: 1250, criteria: 'Role: student, Active in last 30 days', icon: '👨‍🎓' },
    { id: 'recruiters', name: 'All Recruiters', description: 'Active job posters and hiring managers', count: 890, criteria: 'Role: recruiter, Posted gigs in last 60 days', icon: '🏢' },
    { id: 'active-users', name: 'Active Users', description: 'Logged in within last 7 days', count: 1345, criteria: 'Last login: 7d, Any role', icon: '⚡' },
    { id: 'new-users', name: 'New Users', description: 'Registered within last 30 days', count: 234, criteria: 'Joined: 30d, Unverified', icon: '🆕' },
    { id: 'premium-users', name: 'Premium Users', description: 'Paid subscribers and premium members', count: 156, criteria: 'Subscription: active', icon: '⭐' }
  ]

  const notificationTemplates: NotificationTemplate[] = [
    {
      id: 'maintenance',
      name: 'Scheduled Maintenance',
      subject: 'Hirezy Platform Maintenance Notice',
      content: 'Dear {user_name},\n\nWe will be performing scheduled maintenance on {maintenance_date} from {start_time} to {end_time}. The platform will be temporarily unavailable during this period.\n\nThank you for your patience.\n\nBest regards,\nHirezy Team',
      type: 'announcement',
      variables: ['user_name', 'maintenance_date', 'start_time', 'end_time']
    },
    {
      id: 'new-feature',
      name: 'New Feature Announcement',
      subject: '🚀 New Feature Available on Hirezy!',
      content: 'Exciting news {user_name}!\n\nWe\'ve just launched {feature_name}, a powerful tool designed to {feature_benefit}.\n\nTry it out today and let us know what you think!\n\nBest,\nThe Hirezy Team',
      type: 'marketing',
      variables: ['user_name', 'feature_name', 'feature_benefit']
    },
    {
      id: 'emergency',
      name: 'Emergency Alert',
      subject: '⚠️ URGENT: Hirezy Security Update',
      content: 'ATTENTION: {user_name}\n\nDue to a potential security concern, we recommend you {action_required} immediately.\n\nOur team is actively investigating and addressing this matter.\n\nStay safe.\n\nHirezy Security Team',
      type: 'alert',
      variables: ['user_name', 'action_required']
    },
    {
      id: 'welcome',
      name: 'Welcome Message',
      subject: 'Welcome to Hirezy! 🎉',
      content: 'Welcome aboard {user_name}!\n\nThank you for joining Hirezy, the premier platform for connecting talent with opportunities.\n\nHere are some quick tips to get started:\n• Complete your profile\n• Explore available gigs\n• Network with other professionals\n\nWe\'re excited to have you here!\n\nBest regards,\nThe Hirezy Team',
      type: 'system',
      variables: ['user_name']
    }
  ]

  const recentCampaigns: MessageCampaign[] = [
    {
      id: 'camp_001',
      title: 'Q4 Platform Update',
      content: 'We\'ve added exciting new features including enhanced AI matching and improved collaboration tools.',
      audience: { type: 'all', count: 2140 },
      type: 'announcement',
      status: 'sent',
      sentAt: '2024-11-28T10:00:00Z',
      deliveryStats: { sent: 2140, delivered: 2065, opened: 1543, clicked: 432 },
      priority: 'normal',
      channels: ['email', 'push', 'in-app'],
      template: 'update'
    },
    {
      id: 'camp_002',
      title: 'Weekly Job Market Digest',
      content: 'This week\'s top trending skills: Python, React, and DevOps. New jobs available in fintech sector.',
      audience: { type: 'segment', segment: 'active-users', count: 1345 },
      type: 'marketing',
      status: 'scheduled',
      scheduledFor: '2024-12-02T09:00:00Z',
      deliveryStats: { sent: 0, delivered: 0, opened: 0, clicked: 0 },
      priority: 'normal',
      channels: ['email', 'push'],
      template: 'newsletter'
    },
    {
      id: 'camp_003',
      title: 'URGENT: Security Advisory',
      content: 'Please update your passwords immediately following recent security best practices.',
      audience: { type: 'all', count: 2140 },
      type: 'emergency',
      status: 'sent',
      sentAt: '2024-11-25T14:30:00Z',
      deliveryStats: { sent: 2140, delivered: 2140, opened: 1856, clicked: 1634 },
      priority: 'critical',
      channels: ['email', 'push', 'in-app'],
      template: 'emergency'
    }
  ]

  const campaignMetrics = {
    totalCampaigns: recentCampaigns.length,
    activeCampaigns: recentCampaigns.filter(c => c.status === 'scheduled').length,
    sentThisWeek: recentCampaigns.filter(c => c.status === 'sent' && c.sentAt && new Date(c.sentAt) > new Date(Date.now() - 7*24*60*60*1000)).length,
    totalDeliveries: recentCampaigns.reduce((sum, c) => sum + c.deliveryStats.sent, 0),
    avgOpenRate: Math.round(recentCampaigns.reduce((sum, c) => sum + (c.deliveryStats.opened / c.deliveryStats.sent * 100), 0) / recentCampaigns.length) || 0,
    avgClickRate: Math.round(recentCampaigns.reduce((sum, c) => sum + (c.deliveryStats.clicked / c.deliveryStats.sent * 100), 0) / recentCampaigns.length) || 0
  }

  const handleSendMessage = () => {
    if (!messageTitle.trim() || !messageContent.trim()) return

    const campaign: MessageCampaign = {
      id: `camp_${Date.now()}`,
      title: messageTitle,
      content: messageContent,
      audience: {
        type: selectedAudience === 'all' ? 'all' : 'segment' as any,
        segment: selectedAudience !== 'all' ? selectedAudience : undefined,
        count: selectedAudience === 'all' ? 2140 : userSegments.find(s => s.id === selectedAudience)?.count || 0
      },
      type: messageType,
      status: scheduledDate ? 'scheduled' : 'sent',
      scheduledFor: scheduledDate ? new Date(scheduledDate).toISOString() : undefined,
      sentAt: !scheduledDate ? new Date().toISOString() : undefined,
      deliveryStats: { sent: 0, delivered: 0, opened: 0, clicked: 0 },
      priority: isUrgent ? 'critical' : messageType === 'emergency' ? 'critical' : 'normal',
      channels: channels,
      template: selectedTemplate
    }

    console.log('Sending campaign:', campaign)
    // Reset form
    setMessageTitle('')
    setMessageContent('')
    setScheduledDate('')
    setIsUrgent(false)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'sent': return 'text-green-400'
      case 'sending': return 'text-blue-400'
      case 'scheduled': return 'text-yellow-400'
      case 'draft': return 'text-slate-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'sent': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'sending': return <Clock className="w-4 h-4 text-blue-400" />
      case 'scheduled': return <Calendar className="w-4 h-4 text-yellow-400" />
      default: return <Zap className="w-4 h-4 text-slate-400" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'announcement': return <Bell className="w-4 h-4 text-blue-400" />
      case 'alert': return <AlertTriangle className="w-4 h-4 text-orange-400" />
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'marketing': return <Target className="w-4 h-4 text-purple-400" />
      default: return <MessageSquare className="w-4 h-4 text-slate-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-red-900/50 border-red-700'
      case 'high': return 'bg-orange-900/50 border-orange-700'
      case 'normal': return 'bg-blue-900/50 border-blue-700'
      case 'low': return 'bg-slate-900/50 border-slate-700'
      default: return 'bg-slate-900/50 border-slate-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <MessageSquare className="w-10 h-10 text-purple-400" />
            Global Communication Hub
          </h1>
          <p className="text-slate-300">Enterprise-grade communication platform with targeted messaging, templates, and analytics</p>
        </div>
      </div>

      {/* Campaign Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Target className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-400">{campaignMetrics.totalCampaigns}</div>
            <div className="text-slate-400 text-xs">Total Campaigns</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-yellow-400">{campaignMetrics.activeCampaigns}</div>
            <div className="text-slate-400 text-xs">Scheduled</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-400">{campaignMetrics.sentThisWeek}</div>
            <div className="text-slate-400 text-xs">This Week</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Mail className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-400">{campaignMetrics.totalDeliveries.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">Deliveries</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Eye className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-400">{campaignMetrics.avgOpenRate}%</div>
            <div className="text-slate-400 text-xs">Avg Open Rate</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <ThumbsUp className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-purple-400">{campaignMetrics.avgClickRate}%</div>
            <div className="text-slate-400 text-xs">Avg Click Rate</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Tab Navigation */}
      <AdminGlassCard>
        <div className="flex gap-1">
          {[
            { id: 'compose', label: '📝 Compose Message', icon: MessageSquare },
            { id: 'campaigns', label: '📊 Campaign History', icon: TrendingUp },
            { id: 'templates', label: '📋 Templates', icon: Settings },
            { id: 'analytics', label: '📈 Analytics', icon: Target }
          ].map(tab => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-lg ${
                activeTab === tab.id ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </AdminGlassCard>

      {/* Compose Message Tab */}
      {activeTab === 'compose' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Composer */}
          <AdminGlassCard title="Compose New Message">
            <div className="space-y-4">
              {/* Message Type */}
              <div>
                <label className="block text-slate-300 mb-2">Message Type</label>
                <div className="flex gap-2">
                  {[
                    { value: 'announcement', label: '🔔 Announcement', color: 'from-blue-600 to-blue-700' },
                    { value: 'alert', label: '⚠️ Alert', color: 'from-orange-600 to-orange-700' },
                    { value: 'emergency', label: '🚨 Emergency', color: 'from-red-600 to-red-700' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => setMessageType(type.value as any)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        messageType === type.value
                          ? `bg-gradient-to-r ${type.color} text-white`
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-300 mb-2">Message Title</label>
                <Input
                  type="text"
                  placeholder="Enter message title..."
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-300 mb-2">Message Content</label>
                <textarea
                  placeholder="Compose your message..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white h-40 resize-none"
                />
              </div>

              {/* Audience Selection */}
              <div>
                <label className="block text-slate-300 mb-2">Target Audience</label>
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                >
                  <option value="all">🌐 All Users (2,140 users)</option>
                  {userSegments.map(segment => (
                    <option key={segment.id} value={segment.id}>
                      {segment.icon} {segment.name} ({segment.count} users)
                    </option>
                  ))}
                </select>
              </div>

              {/* Channels */}
              <div>
                <label className="block text-slate-300 mb-2">Delivery Channels</label>
                <div className="flex gap-3">
                  {[
                    { id: 'email', label: '📧 Email', enabled: channels.includes('email') },
                    { id: 'push', label: '📱 Push Notification', enabled: channels.includes('push') },
                    { id: 'in-app', label: '💬 In-App	Message', enabled: channels.includes('in-app') }
                  ].map(channel => (
                    <button
                      key={channel.id}
                      onClick={() => setChannels(prev =>
                        prev.includes(channel.id as any)
                          ? prev.filter(c => c !== channel.id)
                          : [...prev, channel.id as any]
                      )}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        channel.enabled ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {channel.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <label className="block text-slate-300 mb-2">Scheduling</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white"
                  />
                  <label className="flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="rounded border-slate-600"
                    />
                    Mark as Urgent
                  </label>
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!messageTitle.trim() || !messageContent.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                {scheduledDate ? 'Schedule Message' : 'Send Message'}
              </Button>
            </div>
          </AdminGlassCard>

          {/* Quick Actions & Templates */}
          <div className="space-y-6">
            <AdminGlassCard title="Quick Templates">
              <div className="space-y-2">
                {notificationTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id)
                      if (!messageTitle) setMessageTitle(template.subject)
                      if (!messageContent) setMessageContent(template.content)
                    }}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'bg-purple-900/50 border-purple-500'
                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-white font-medium">{template.name}</div>
                    <div className="text-slate-400 text-sm">{template.type}</div>
                  </button>
                ))}
              </div>
            </AdminGlassCard>

            <AdminGlassCard title="User Segments">
              <div className="grid grid-cols-1 gap-3">
                {userSegments.map(segment => (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedAudience(segment.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedAudience === segment.id
                        ? 'bg-blue-900/50 border-blue-500'
                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white font-medium">{segment.icon} {segment.name}</span>
                      <span className="text-slate-400 text-sm">{segment.count.toLocaleString()}</span>
                    </div>
                    <div className="text-slate-400 text-xs">{segment.description}</div>
                  </button>
                ))}
              </div>
            </AdminGlassCard>
          </div>
        </div>
      )}

      {/* Campaign History Tab */}
      {activeTab === 'campaigns' && (
        <AdminGlassCard title="Campaign History">
          <div className="space-y-4">
            {recentCampaigns.map(campaign => (
              <div key={campaign.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(campaign.type)}
                      <h3 className="text-white font-semibold">{campaign.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(campaign.priority)}`}>
                        {campaign.priority}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm line-clamp-2">{campaign.content}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(campaign.status)}
                    <span className={`text-sm ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span>{campaign.audience.count.toLocaleString()} recipients</span>
                    <span>{campaign.channels.join(', ')}</span>
                    {campaign.sentAt && <span>{new Date(campaign.sentAt).toLocaleDateString()}</span>}
                  </div>

                  <div className="flex items-center gap-4">
                    {campaign.deliveryStats.sent > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{Math.round((campaign.deliveryStats.opened / campaign.deliveryStats.sent) * 100)}%</span>
                      </div>
                    )}
                    <Button
                      onClick={() => setSelectedCampaign(campaign)}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 border-slate-600"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <AdminGlassCard title="Message Templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notificationTemplates.map(template => (
              <div key={template.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{template.name}</h3>
                    <span className="text-xs">Type: {template.type}</span>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedTemplate(template.id)
                      setMessageTitle(template.subject)
                      setMessageContent(template.content)
                      setActiveTab('compose')
                    }}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Use Template
                  </Button>
                </div>

                <div className="mb-3">
                  <div className="text-slate-300 text-sm font-medium mb-1">Subject:</div>
                  <div className="text-white text-sm">{template.subject}</div>
                </div>

                <div>
                  <div className="text-slate-300 text-sm font-medium mb-1">Variables:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map(variable => (
                      <span key={variable} className="px-2 py-1 text-xs bg-blue-900/50 text-blue-300 rounded">
                        {`{${variable}}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminGlassCard title="Delivery Performance">
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-1">98.7%</div>
                <div className="text-sm text-slate-400">Overall Delivery Rate</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">92.3%</div>
                  <div className="text-sm text-slate-400">Open Rate</div>
                </div>
                <div className="text-center p-3 bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">31.4%</div>
                  <div className="text-sm text-slate-400">Click Rate</div>
                </div>
              </div>
            </div>
          </AdminGlassCard>

          <AdminGlassCard title="Channel Performance">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Email</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">94.2%</div>
                  <div className="text-xs text-slate-400">Delivered</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Push Notifications</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">88.9%</div>
                  <div className="text-xs text-slate-400">Delivered</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-400" />
                  <span className="text-white">In-App Messages</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">99.1%</div>
                  <div className="text-xs text-slate-400">Delivered</div>
                </div>
              </div>
            </div>
          </AdminGlassCard>
        </div>
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedCampaign.title}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>{getTypeIcon(selectedCampaign.type)} {selectedCampaign.type}</span>
                  <span>{selectedCampaign.audience.count.toLocaleString()} recipients</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedCampaign.priority)}`}>
                    {selectedCampaign.priority} priority
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <AdminGlassCard title="Message Content">
                <div className="text-slate-300 whitespace-pre-wrap">{selectedCampaign.content}</div>
              </AdminGlassCard>

              <AdminGlassCard title="Delivery Statistics">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{selectedCampaign.deliveryStats.sent}</div>
                      <div className="text-xs text-slate-400">Sent</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{selectedCampaign.deliveryStats.delivered}</div>
                      <div className="text-xs text-slate-400">Delivered</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">{selectedCampaign.deliveryStats.opened}</div>
                      <div className="text-xs text-slate-400">Opened</div>
                    </div>
                    <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400">{selectedCampaign.deliveryStats.clicked}</div>
                      <div className="text-xs text-slate-400">Clicked</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Delivery Rate:</span>
                      <span className="text-green-400 font-bold">
                        {Math.round((selectedCampaign.deliveryStats.delivered / selectedCampaign.deliveryStats.sent) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Open Rate:</span>
                      <span className="text-blue-400 font-bold">
                        {Math.round((selectedCampaign.deliveryStats.opened / selectedCampaign.deliveryStats.sent) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Click Rate:</span>
                      <span className="text-purple-400 font-bold">
                        {Math.round((selectedCampaign.deliveryStats.clicked / selectedCampaign.deliveryStats.sent) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </AdminGlassCard>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                Close Analytics
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Duplicate Campaign
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                Export Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
