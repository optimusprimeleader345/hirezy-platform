'use client'

import { useState } from 'react'
import { Search, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RecruiterCommunicationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [conversations] = useState([
    {
      id: 'conv1',
      gigTitle: 'Frontend Developer for E-commerce Platform',
      studentName: 'John Doe',
      lastMessage: 'Thanks, I\'ll share the files shortly!',
      updatedAt: '2025-11-05 12:30',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: 'conv2',
      gigTitle: 'React Native Mobile Development',
      studentName: 'Sarah Johnson',
      lastMessage: 'Looking forward to your portfolio review.',
      updatedAt: '2025-11-04 16:45',
      unreadCount: 0,
      isOnline: false,
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)

  const filteredConversations = conversations.filter(conv =>
    conv.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.gigTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Communication Hub
        </h1>
        <p className="text-white/80 text-lg">Manage conversations with applicants</p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-12 gap-6 h-[75vh]">
        {/* Left Panel - Conversations List */}
        <aside className="col-span-4 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl shadow-purple-500/10 p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl placeholder-white/50 text-white focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-white/70" />
          </div>

          {/* Conversations List */}
          <div className="space-y-2 overflow-y-auto max-h-[60vh]">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`p-4 rounded-xl hover:bg-white/15 transition border border-white/20 cursor-pointer ${
                  selectedConversation === conv.id ? 'bg-white/15 border-purple-500/50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {conv.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium text-sm">{conv.studentName}</span>
                        {conv.isOnline && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                      </div>
                    </div>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-white text-sm mb-1 truncate font-medium">{conv.gigTitle}</h3>
                  <p className="text-white/90 text-sm truncate">{conv.lastMessage}</p>
                  <div className="flex items-center mt-2 justify-end">
                    <span className="text-white/70 text-xs">{conv.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel - Chat Area */}
        <main className="col-span-8 bg-black/25 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col justify-center items-center shadow-xl shadow-purple-500/10">
          <MessageSquare className="w-16 h-16 text-white/80 mb-4" />
          <h3 className="text-white font-semibold text-lg mb-2">Select a conversation</h3>
          <p className="text-white/90 text-center max-w-md">
            Choose an applicant conversation from the list to view messages and continue communication
          </p>
        </main>
      </div>
    </div>
  )
}
