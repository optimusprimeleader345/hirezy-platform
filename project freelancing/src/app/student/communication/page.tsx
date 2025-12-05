'use client'

import { useState } from 'react'
import { MessageCircle, Search, Send, Sparkles, Clock } from 'lucide-react'

export default function CommunicationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConversation, setActiveConversation] = useState(0)
  const [messageInput, setMessageInput] = useState('')

  // Mock conversations data
  const conversations = [
    {
      id: 'conv-1',
      companyName: 'TechCorp Ltd.',
      gigTitle: 'Frontend Developer for E-commerce Platform',
      participant: 'Alex Kumar (Recruiter)',
      avatar: 'TC',
      lastMessage: 'Thanks for the project update. Can you send the final implementation?',
      timestamp: '2 hours ago',
      unread: 2,
      isOnline: true,
      messages: [
        { id: 1, sender: 'Alex Kumar', text: 'Hi! I seen your proposal for the frontend position.', time: '2 days ago', senderType: 'other' },
        { id: 2, sender: 'You', text: 'Thanks for reaching out! I\'m very interested.', time: '2 days ago', senderType: 'self' },
        { id: 3, sender: 'Alex Kumar', text: 'Can you share your portfolio?', time: '1 day ago', senderType: 'other' },
        { id: 4, sender: 'You', text: 'Sure! Here\'s the link to my portfolio.', time: '1 day ago', senderType: 'self' },
        { id: 5, sender: 'Alex Kumar', text: 'Looks great! When can you start?', time: '4 hours ago', senderType: 'other' },
        { id: 6, sender: 'You', text: 'I can start immediately if needed.', time: '4 hours ago', senderType: 'self' },
        { id: 7, sender: 'Alex Kumar', text: 'Thanks for the project update. Can you send the final implementation?', time: '2 hours ago', senderType: 'other' },
      ]
    },
    {
      id: 'conv-2',
      companyName: 'StartupXYZ',
      gigTitle: 'React Native Mobile Development',
      participant: 'Sarah Chen (Recruiter)',
      avatar: 'SX',
      lastMessage: 'The mobile app design is ready for review.',
      timestamp: '1 day ago',
      unread: 0,
      isOnline: false,
      messages: [
        { id: 1, sender: 'Sarah Chen', text: 'Hello! We\'re developing a mobile app and need someone experienced in React Native.', time: '3 days ago', senderType: 'other' },
        { id: 2, sender: 'You', text: 'That sounds interesting. I have 2+ years with React Native.', time: '3 days ago', senderType: 'self' },
        { id: 3, sender: 'Sarah Chen', text: 'Perfect! The mobile app design is ready for review.', time: '1 day ago', senderType: 'other' },
      ]
    }
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, this would send the message to the backend
      const newMessage = {
        id: conversations[activeConversation].messages.length + 1,
        sender: 'You',
        text: messageInput,
        time: 'Just now',
        senderType: 'self'
      }
      conversations[activeConversation].messages.push(newMessage)
      setMessageInput('')
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.gigTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Communication Hub
        </h1>
        <p className="text-white/70 text-lg">Connect with recruiters and manage your gig conversations</p>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-12 gap-6 h-[75vh]">
        {/* Left Panel - Conversations List */}
        <aside className="col-span-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-purple-500/10 p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-xl placeholder-white/40 text-white focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-white/60" />
          </div>

          {/* Conversations List */}
          <div className="space-y-2 overflow-y-auto max-h-[60vh]">
            {filteredConversations.map((conv, index) => (
              <div
                key={conv.id}
                onClick={() => setActiveConversation(index)}
                className={`p-4 rounded-xl hover:bg-white/10 transition border border-white/10 cursor-pointer ${
                  activeConversation === index ? 'bg-white/10 border-purple-500/30' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {conv.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium text-sm">{conv.companyName}</span>
                        {conv.isOnline && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                      </div>
                      <p className="text-white/60 text-xs">{conv.participant}</p>
                    </div>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div>
                  <h3 className="text-white/90 text-xs mb-1 truncate">{conv.gigTitle}</h3>
                  <p className="text-white/60 text-xs truncate">{conv.lastMessage}</p>
                  <div className="flex items-center mt-2">
                    <Clock className="w-3 h-3 text-white/40 mr-1" />
                    <span className="text-white/40 text-xs">{conv.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Panel - Active Chat */}
        <main className="col-span-8 bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between shadow-xl shadow-purple-500/10">
          {/* Chat Header */}
          <div className="border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {conversations[activeConversation]?.avatar}
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">{conversations[activeConversation]?.companyName}</h2>
                <p className="text-white/70 text-sm">{conversations[activeConversation]?.participant}</p>
              </div>
              <div className="ml-auto flex items-center">
                {conversations[activeConversation]?.isOnline && (
                  <span className="flex items-center text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    Online
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {conversations[activeConversation]?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderType === 'self' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-xl ${
                  message.senderType === 'self'
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'bg-white/10 border border-white/20 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderType === 'self' ? 'text-white/80' : 'text-white/60'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
              placeholder="Type your message..."
              className="flex-1 bg-white/10 p-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-purple-500 text-white placeholder-white/40"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
        </main>
      </div>

      {/* AI Assist Button */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full shadow-lg hover:opacity-90 transition">
        <Sparkles className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
