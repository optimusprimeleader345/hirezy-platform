'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageSquare, X, Loader2 } from 'lucide-react'

// ChatGPT-Style Floating AI Assistant
export default function FloatingAIAssistant({
  userRole = 'student',
  position = 'bottom-right',
  size = 'small',
  theme = 'dark'
}: FloatingAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  }

  const sizeClasses = {
    small: 'w-80 h-96',
    medium: 'w-96 h-[28rem]',
    large: 'w-[32rem] h-[36rem]'
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return
    console.log('Sending message:', currentMessage)
    setCurrentMessage('')
  }

  return (
    <>
      {/* Enterprise AI Intelligence Indicator - ChatGPT Style */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {!isOpen ? (
          <div className="relative group">
            {/* ChatGPT-Style Speech Bubble Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative h-11 w-11 rounded-xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 border border-emerald-400/30 shadow-lg hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
              title={`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} AI Assistant`}
            >
              {/* ChatGPT-Style Speech Bubble Icon */}
              <div className="relative w-full h-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white/90 group-hover:text-white transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Speech bubble shape */}
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  {/* ChatGPT-style accent dots */}
                  <circle cx="9" cy="9" r="1" fill="currentColor" />
                  <circle cx="13" cy="9" r="1" fill="currentColor" />
                  <circle cx="17" cy="9" r="1" fill="currentColor" />
                </svg>
              </div>

              {/* ChatGPT-style subtle glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 shadow-sm animate-pulse"></div>
            </button>

            {/* Professional tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900/95 border border-slate-700/80 rounded-lg text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl backdrop-blur-sm">
              ChatGPT AI Assistant
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900/95"></div>
            </div>
          </div>
        ) : (
          // Chat interface
          <div className={`${sizeClasses[size]} bg-[#1A1D21] border border-[#23262B] shadow-2xl rounded-2xl flex flex-col overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#23262B] bg-gradient-to-r from-green-600 to-teal-600 text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Assistant</div>
                  <div className="text-xs opacity-90 capitalize">{userRole} Chat</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/20 h-8 w-8 p-0 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div className="bg-[#23262B] rounded-xl p-3 max-w-[80%]">
                  <p className="text-[#E2E8F0] text-sm">
                    Hello! I'm your ChatGPT-style AI assistant. How can I help you today?
                  </p>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#23262B] bg-[#111315]">
              <div className="flex gap-2">
                <input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  type="text"
                  placeholder={`Ask me anything about ${userRole}...`}
                  className="flex-1 bg-[#1A1D21] border-[#23262B] rounded-lg px-3 py-2 text-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

// Type definitions
interface FloatingAIAssistantProps {
  userRole?: string
  context?: any
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'small' | 'medium' | 'large'
  theme?: string
}
