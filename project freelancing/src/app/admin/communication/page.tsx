'use client'

import { useState } from 'react'
import { MessageSquare, Send, Users } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  from: string
  to: string
  content: string
  timestamp: string
  type: 'admin-to-recruiter' | 'system'
}

export default function AdminCommunicationPage() {
  const [newMessage, setNewMessage] = useState('')
  const messages: Message[] = [
    { id: "1", from: "Admin", to: "recruiter@example.com", content: "Your gig has been approved!", timestamp: "2024-11-28 14:30", type: "admin-to-recruiter" },
    { id: "2", from: "System", to: "admin@example.com", content: "New proposal submitted for gig #456", timestamp: "2024-11-28 13:15", type: "system" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Communication Hub</h1>
        <p className="text-slate-300">Admin-to-user messaging and ticket management</p>
      </div>

      {/* Message Compose */}
      <AdminGlassCard title="Send Message">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Recipient</label>
            <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
              <option>Select recipient...</option>
              <option>recruiter@example.com</option>
              <option>student@example.com</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Message</label>
            <textarea
              placeholder="Type your message..."
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white h-24"
            />
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </AdminGlassCard>

      {/* Messages */}
      <AdminGlassCard title="Recent Messages">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="p-4 bg-slate-800 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                  <span className="text-white font-semibold">{message.from} → {message.to}</span>
                </div>
                <span className="text-xs text-slate-400">{message.timestamp}</span>
              </div>
              <p className="text-slate-300">{message.content}</p>
            </div>
          ))}
        </div>
      </AdminGlassCard>
    </div>
  )
}
