'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  MessageSquare,
  Mail,
  Phone,
  Send,
  Inbox,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Plus,
  Eye,
  Reply,
  Forward,
  Trash2,
  Zap,
  Brain,
  Calendar
} from 'lucide-react'

export default function CommunicationHubPage() {
  const [selectedTab, setSelectedTab] = useState('inbox')
  const [searchTerm, setSearchTerm] = useState('')
  const [isComposing, setIsComposing] = useState(false)

  const emailTemplates = [
    { id: 'interview-invite', name: 'Interview Invitation', category: 'Interview' },
    { id: 'offer-letter', name: 'Job Offer', category: 'Offer' },
    { id: 'follow-up', name: 'Interview Follow-up', category: 'Feedback' }
  ]

  const communicationHistory = [
    {
      id: '1',
      type: 'email',
      direction: 'outbound',
      subject: 'Interview Invitation: Senior React Developer',
      recipient: 'alex.chen@example.com',
      candidate: 'Alex Chen',
      timestamp: '2025-01-25 14:30',
      status: 'delivered',
      priority: 'high'
    },
    {
      id: '2',
      type: 'email',
      direction: 'inbound',
      subject: 'Re: Interview Availability',
      recipient: 'Internal',
      candidate: 'Sarah Kumar',
      timestamp: '2025-01-24 11:15',
      status: 'unread',
      priority: 'medium'
    }
  ]

  const quickActions = [
    { id: 'interview', name: 'Schedule Interview', color: 'bg-blue-500' },
    { id: 'offer', name: 'Send Job Offer', color: 'bg-green-500' },
    { id: 'followup', name: 'Follow-up', color: 'bg-purple-500' }
  ]

  const filteredHistory = communicationHistory.filter(item =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.candidate.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-[#FFD700]" />
            Communication Hub
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Streamlined candidate communication with AI-powered templates
          </p>
        </div>
        <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black" onClick={() => setIsComposing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Compose Message
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Card key={action.id} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4 hover:border-[#FFD700]/50 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#FFFFFF] font-medium text-sm">{action.name}</span>
            </div>
            <p className="text-[#C9CFD6] text-xs">Quick action workflow</p>
          </Card>
        ))}
      </div>

      {/* Communication Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-[#111315] border border-[#23262B] rounded-lg p-1">
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-6">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl">
            <div className="p-4 border-b border-[#23262B] flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CFD6]" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                />
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredHistory.map((message) => (
                <div key={message.id} className="p-4 border-b border-[#23262B] hover:bg-[#111315]">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-[#60A5FA]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#FFFFFF] font-medium">{message.candidate}</span>
                        <Badge className={
                          message.status === 'delivered' ? 'bg-green-900 text-green-300' :
                          message.status === 'unread' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-900 text-gray-300'
                        }>
                          {message.status}
                        </Badge>
                        {message.priority === 'high' && <Star className="w-3 h-3 text-[#FFD700] fill-current" />}
                      </div>
                      <div className="text-[#C9CFD6] text-sm mb-1">{message.subject}</div>
                      <div className="text-[#8A8F98] text-xs">{message.timestamp}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                        <Reply className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl">
            <div className="max-h-96 overflow-y-auto">
              {communicationHistory.filter(h => h.direction === 'outbound').map((message) => (
                <div key={message.id} className="p-4 border-b border-[#23262B]">
                  <div className="flex items-center gap-4">
                    <Send className="w-5 h-5 text-[#3EFFA8]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#FFFFFF] font-medium">To: {message.candidate}</span>
                        <Badge className="bg-green-900 text-green-300">delivered</Badge>
                      </div>
                      <div className="text-[#C9CFD6] text-sm">{message.subject}</div>
                      <div className="text-[#8A8F98] text-xs">{message.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emailTemplates.map((template) => (
              <Card key={template.id} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`px-2 py-1 text-xs ${
                    template.category === 'Interview' ? 'bg-blue-900 text-blue-300' :
                    template.category === 'Offer' ? 'bg-green-900 text-green-300' :
                    'bg-purple-900 text-purple-300'
                  }`}>
                    {template.category}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
                <h3 className="text-[#FFFFFF] font-bold mb-2">{template.name}</h3>
                <p className="text-[#C9CFD6] text-sm">AI-powered {template.category.toLowerCase()} communication template</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#60A5FA]" />
                Response Rates
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-[#C9CFD6]">Email</span>
                  </div>
                  <span className="text-[#FFFFFF] font-medium">68%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-400" />
                    <span className="text-[#C9CFD6]">Call</span>
                  </div>
                  <span className="text-[#FFFFFF] font-medium">85%</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-[#FFD700]" />
                AI Insights
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FFD700] mb-2">8.7</div>
                  <div className="text-[#C9CFD6] text-sm">Communication Quality Score</div>
                </div>
                <div className="space-y-2">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full flex-shrink-0"></div>
                  <span className="text-[#C9CFD6] text-sm">Send invites 48 hours in advance</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Compose Modal */}
      {isComposing && (
        <Card className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#23262B]">
              <h2 className="text-2xl font-bold text-[#FFFFFF]">Compose Message</h2>
              <Button variant="outline" size="sm" onClick={() => setIsComposing(false)} className="border-[#23262B] text-[#C9CFD6]">
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <Select>
                <SelectTrigger className="bg-[#111315] border-[#23262B]">
                  <SelectValue placeholder="Choose template..." />
                </SelectTrigger>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} - {template.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Recipient..." className="bg-[#111315] border-[#23262B] text-[#E2E8F0]" />
              <Input placeholder="Subject..." className="bg-[#111315] border-[#23262B] text-[#E2E8F0]" />
              <Textarea placeholder="Message..." className="bg-[#111315] border-[#23262B] text-[#E2E8F0] min-h-32" />
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsComposing(false)} className="border-[#23262B] text-[#C9CFD6]">
                  Cancel
                </Button>
                <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </Card>
      )}
    </div>
  )
}
