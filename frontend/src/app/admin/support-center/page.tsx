'use client'

import { useState } from 'react'
import { MessageSquare, AlertCircle, CheckCircle2, Clock, Search, Filter, Send, User, Shield, Zap, Sparkles, Phone, Mail } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Ticket {
  id: string
  subject: string
  user: { name: string; email: string; role: 'student' | 'recruiter' }
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved'
  category: 'Billing' | 'Dispute' | 'Technical' | 'Account'
  createdAt: string
  lastUpdate: string
  messages: { sender: string; role: string; text: string; time: string }[]
  aiSuggestion?: string
}

export default function AdminSupportCenterPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TICK-901',
      subject: 'Milestone payment escrow dispute on React gig #401',
      user: { name: 'Alex Chen', email: 'alex.chen@email.com', role: 'recruiter' },
      priority: 'urgent',
      status: 'open',
      category: 'Dispute',
      createdAt: '2 hours ago',
      lastUpdate: '15 mins ago',
      messages: [
        { sender: 'Alex Chen', role: 'recruiter', text: 'The freelancer submitted deliverables late and without responsive testing. Requesting escrow refund review.', time: '2 hours ago' },
        { sender: 'AI Triage Bot', role: 'system', text: 'Ticket automatically flagged for high-priority escrow arbitration. Milestone history verified.', time: '2 hours ago' }
      ],
      aiSuggestion: 'Escrow verification check indicates 2 out of 3 milestones completed successfully. Recommend offering a 33% partial refund or scheduling an automated mediator review.'
    },
    {
      id: 'TICK-902',
      subject: 'Unable to connect Stripe bank account for withdrawal',
      user: { name: 'Sarah Kumar', email: 'sarah.k@design.io', role: 'student' },
      priority: 'high',
      status: 'in_progress',
      category: 'Billing',
      createdAt: '5 hours ago',
      lastUpdate: '1 hour ago',
      messages: [
        { sender: 'Sarah Kumar', role: 'student', text: 'Getting a webhook signature verification error when saving bank routing numbers.', time: '5 hours ago' }
      ],
      aiSuggestion: 'Stripe API logs show TLS handshake timeout from user region. Recommend instructing user to clear cache or re-verify payout token.'
    },
    {
      id: 'TICK-903',
      subject: 'Request to upgrade organization recruiter limit to Enterprise',
      user: { name: 'David Kim', email: 'david.kim@ai-labs.org', role: 'recruiter' },
      priority: 'medium',
      status: 'resolved',
      category: 'Account',
      createdAt: '1 day ago',
      lastUpdate: '4 hours ago',
      messages: [
        { sender: 'David Kim', role: 'recruiter', text: 'We are expanding our engineering team to 15 recruiters. Need bulk pricing.', time: '1 day ago' },
        { sender: 'Admin Team', role: 'admin', text: 'Upgraded seat tier to Enterprise 25-Seat Pack and applied annual discount.', time: '4 hours ago' }
      ],
      aiSuggestion: 'Resolved - Account upgraded successfully.'
    }
  ])

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(tickets[0])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [replyText, setReplyText] = useState('')

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return
    const newMsg = {
      sender: 'Admin Support',
      role: 'admin',
      text: replyText.trim(),
      time: 'Just now'
    }
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? {
      ...t,
      status: t.status === 'open' ? 'in_progress' : t.status,
      lastUpdate: 'Just now',
      messages: [...t.messages, newMsg]
    } : t))
    setSelectedTicket(prev => prev ? {
      ...prev,
      status: prev.status === 'open' ? 'in_progress' : prev.status,
      lastUpdate: 'Just now',
      messages: [...prev.messages, newMsg]
    } : null)
    setReplyText('')
  }

  const handleApplyAISuggestion = () => {
    if (selectedTicket?.aiSuggestion) {
      setReplyText(`Hi ${selectedTicket.user.name},\n\nBased on our investigation: ${selectedTicket.aiSuggestion}\n\nPlease let us know if you would like us to proceed with this solution.`)
    }
  }

  const handleResolveTicket = (id: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t))
    if (selectedTicket?.id === id) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'resolved' } : null)
    }
  }

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus
    const matchesSearch = t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            Support Center & Dispute Desk
          </h1>
          <p className="text-slate-400 mt-1">
            Resolve student/recruiter tickets, arbitrate escrow disputes, and leverage AI Auto-Triage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setFilterStatus('all')}
            className={`border-white/10 ${filterStatus === 'all' ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-300'}`}
          >
            All ({tickets.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterStatus('open')}
            className={`border-white/10 ${filterStatus === 'open' ? 'bg-amber-600 text-white border-amber-500' : 'text-slate-300'}`}
          >
            Open ({tickets.filter(t => t.status === 'open').length})
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterStatus('resolved')}
            className={`border-white/10 ${filterStatus === 'resolved' ? 'bg-emerald-600 text-white border-emerald-500' : 'text-slate-300'}`}
          >
            Resolved ({tickets.filter(t => t.status === 'resolved').length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search tickets or users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-[#111424] border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredTickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedTicket?.id === ticket.id
                    ? 'bg-blue-600/20 border-blue-500/60 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">{ticket.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full ${
                      ticket.priority === 'urgent' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      ticket.priority === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      ticket.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                      ticket.status === 'in_progress' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white line-clamp-1 mb-1">{ticket.subject}</h4>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-400" />
                    {ticket.user.name} ({ticket.user.role})
                  </span>
                  <span className="text-[11px] text-slate-500">{ticket.lastUpdate}</span>
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="text-center py-12 text-slate-500">No matching support tickets.</div>
            )}
          </div>
        </div>

        {/* Ticket Details & Chat Pane */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <AdminGlassCard className="h-full flex flex-col justify-between p-6">
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-blue-400">{selectedTicket.id}</span>
                      <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded font-medium">{selectedTicket.category}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{selectedTicket.subject}</h2>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-4">
                      <span>Reported by: <strong className="text-slate-200">{selectedTicket.user.name}</strong> ({selectedTicket.user.email})</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Created {selectedTicket.createdAt}</span>
                    </p>
                  </div>

                  {selectedTicket.status !== 'resolved' && (
                    <Button
                      onClick={() => handleResolveTicket(selectedTicket.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Mark Resolved
                    </Button>
                  )}
                </div>

                {/* AI Resolution Assistant */}
                {selectedTicket.aiSuggestion && selectedTicket.status !== 'resolved' && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        AI Auto-Triage Recommended Solution
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleApplyAISuggestion}
                        className="text-xs h-7 bg-blue-600/20 text-blue-200 border-blue-400/30 hover:bg-blue-600/40"
                      >
                        Insert Suggestion into Reply
                      </Button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{selectedTicket.aiSuggestion}</p>
                  </div>
                )}

                {/* Thread Messages */}
                <div className="mt-6 space-y-4 max-h-[340px] overflow-y-auto pr-2">
                  {selectedTicket.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3.5 rounded-xl border text-sm ${
                        msg.role === 'admin'
                          ? 'bg-blue-600/10 border-blue-500/30 ml-8 text-blue-100'
                          : msg.role === 'system'
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 text-xs italic'
                          : 'bg-white/5 border-white/10 mr-8 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                        <span className={msg.role === 'admin' ? 'text-blue-400 font-bold' : 'text-slate-300'}>{msg.sender}</span>
                        <span className="text-[11px] text-slate-500 font-normal">{msg.time}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              {selectedTicket.status !== 'resolved' ? (
                <div className="pt-4 mt-4 border-t border-white/10 flex gap-3">
                  <Input
                    type="text"
                    placeholder="Type official admin response or resolution..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                    className="flex-1 bg-[#111424] border-white/10 text-white placeholder-slate-500 focus:ring-blue-500"
                  />
                  <Button
                    onClick={handleSendReply}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-white/10 text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  This support ticket is closed and resolved.
                </div>
              )}
            </AdminGlassCard>
          ) : (
            <AdminGlassCard className="h-full flex items-center justify-center text-center p-12">
              <p className="text-slate-500">Select a support ticket from the left to view thread details.</p>
            </AdminGlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
