'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  read?: boolean
}

interface ChatWindowProps {
  conversationWithId: string
  currentUserId: string
  partnerName?: string
}

export default function ChatWindow({ conversationWithId, currentUserId, partnerName }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(true)
  const refScroll = useRef<HTMLDivElement | null>(null)
  const pollRef = useRef<NodeJS.Timeout>()

  async function loadMessages() {
    try {
      const res = await fetch(`/pages/api/recruiter/chat/get-messages?user1=${currentUserId}&user2=${conversationWithId}`)
      const json = await res.json()
      if (json.success) {
        setMessages(json.messages)
        // Mark messages as read
        await fetch('/pages/api/recruiter/chat/mark-read', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ user1: currentUserId, user2: conversationWithId })
        })
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)

    // Scroll to bottom
    setTimeout(() => {
      if (refScroll.current) {
        refScroll.current.scrollTop = refScroll.current.scrollHeight
      }
    }, 50)
  }

  useEffect(() => {
    loadMessages()
    pollRef.current = setInterval(loadMessages, 2500)

    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current)
      }
    }
  }, [conversationWithId, currentUserId])

  async function sendMessage() {
    if (!inputText.trim()) return

    const body = {
      senderId: currentUserId,
      receiverId: conversationWithId,
      content: inputText
    }

    // Optimistic UI
    const newMsg: Message = {
      id: `local-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      read: false
    }

    setMessages(prev => [...prev, newMsg])
    setInputText('')

    try {
      const res = await fetch('/pages/api/recruiter/chat/send-message', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      const j = await res.json()

      if (j.success && j.message) {
        // Reload to get the correct server message
        loadMessages()
      }
    } catch (err) {
      console.error(err)
      // Remove optimistic message on failure
      setMessages(prev => prev.filter(m => m.id !== newMsg.id))
      setInputText(inputText) // Restore text
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-96 bg-gray-900/50 rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <h3 className="text-white text-sm font-medium">
            {partnerName || conversationWithId}
          </h3>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={refScroll}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: '300px' }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400 text-sm">No messages yet. Start a conversation!</div>
          </div>
        ) : (
          messages.map(m => {
            const isOwn = m.senderId === currentUserId
            return (
              <div
                key={m.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    isOwn
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}
                >
                  <div className="break-words">{m.content}</div>
                  <div className={`text-xs mt-1 ${
                    isOwn ? 'text-purple-200' : 'text-gray-400'
                  }`}>
                    {new Date(m.createdAt).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={!conversationWithId}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  )
}
