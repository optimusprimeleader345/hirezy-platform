'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Lightbulb, Target, MessageSquare, Settings, RotateCcw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { gigListings, users } from '@/lib/demoData'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  avatar?: string
  type?: 'text' | 'recommendation' | 'analysis'
  data?: any
}

interface GigRecommendation {
  id: number
  title: string
  company: string
  salary: string
  skills: string[]
  matchScore: number
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m Hirezy\'s AI Assistant. I can help you with:\n\n🎯 Finding perfect gig matches\n📊 Analyzing freelancer skills\n💡 Providing market insights\n📞 Managing communications\n⚡ Automating workflows\n\nWhat would you like me to help you with?',
      timestamp: new Date(),
      avatar: '🤖',
      type: 'text'
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<'general' | 'matching' | 'analytics' | 'market'>('general')
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const personas = [
    { id: 'general', name: 'General', icon: Bot, description: 'General assistance' },
    { id: 'matching', name: 'Matching', icon: Target, description: 'Gig matching & recommendations' },
    { id: 'analytics', name: 'Analytics', icon: Lightbulb, description: 'Data analysis & insights' },
    { id: 'market', name: 'Market', icon: Sparkles, description: 'Market trends & opportunities' }
  ]

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('match') || lowerMessage.includes('recommend') || lowerMessage.includes('find')) {
      // Gig matching recommendations
      const recommendations: GigRecommendation[] = gigListings.slice(0, 3).map((gig, index) => ({
        id: gig.id,
        title: gig.title,
        company: gig.company,
        salary: gig.salary,
        skills: ['React', 'TypeScript', 'Node.js'],
        matchScore: 85 + Math.floor(Math.random() * 15)
      }))

      return {
        id: `response-${Date.now()}`,
        role: 'assistant',
        content: 'Based on the profiles and skills, here are the top 3 gig recommendations I found for you:',
        timestamp: new Date(),
        avatar: '🎯',
        type: 'recommendation',
        data: { recommendations }
      }
    }

    if (lowerMessage.includes('analyze') || lowerMessage.includes('skill') || lowerMessage.includes('profile')) {
      // Skills analysis
      return {
        id: `response-${Date.now()}`,
        role: 'assistant',
        content: 'I\'ve analyzed the freelancer profiles and here are the key insights:\n\n✅ **Strengths:** High proficiency in React, Node.js, and full-stack development\n\n🔄 **Gaps:** Could benefit from more DevOps experience\n\n📈 **Market Demand:** Your core skills are in high demand!\n\n💡 **Recommendation:** Focus on adding AWS/Docker skills for 68% better matching scores',
        timestamp: new Date(),
        avatar: '📊',
        type: 'analysis',
        data: {
          skills: ['React', 'TypeScript', 'Node.js'],
          matchScore: 92,
          suggestions: ['AWS', 'Docker', 'Kubernetes']
        }
      }
    }

    if (lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('demand')) {
      // Market insights
      return {
        id: `response-${Date.now()}`,
        role: 'assistant',
        content: '🚀 **Latest Market Insights:**\n\n📈 **Trending Skills:**\n• AI/ML (+127% growth)\n• React Native (+89%)\n• DevOps (+156%)\n\n💰 **High-Paying Opportunities:**\n• Blockchain development: $150k+ avg\n• AI Solutions: $145k+ avg\n• Cloud Architecture: $155k+ avg\n\n🎯 **Hot Categories:**\n• FinTech apps (picking up)\n• Healthcare digital transformation\n• Sustainability tech\n\n💡 **Pro Tip:** Skills like TensorFlow and Kubernetes are seeing massive demand currently!',
        timestamp: new Date(),
        avatar: '📈',
        type: 'text'
      }
    }

    // Default responses
    const defaultResponses = [
      "I understand. Let me help you with that. Can you provide more details about what specifically you need assistance with?",
      "That's a great question! Let me analyze this for you. What particular aspect would you like to focus on?",
      "I'm here to help! Whether it's matching freelancers to gigs, analyzing skills, or market insights, I can assist. What would you like to work on?",
      "Perfect! I love helping with platform optimization. Shall we look at gig matching, user analytics, or market opportunities?"
    ]

    return {
      id: `response-${Date.now()}`,
      role: 'assistant',
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      timestamp: new Date(),
      avatar: '🤖',
      type: 'text'
    }
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: currentMessage.trim(),
      timestamp: new Date(),
      avatar: '👤'
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = generateAIResponse(currentMessage)
      setMessages(prev => [...prev, aiResponse])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearConversation = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Conversation cleared! Hi again! What can I help you with today?',
      timestamp: new Date(),
      avatar: '🤖',
      type: 'text'
    }])
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <AdminGlassCard>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-400" />
              AI Assistant
            </h1>
            <p className="text-slate-300">Intelligence-powered platform management and insights</p>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={clearConversation}
              className="bg-slate-700 hover:bg-slate-600"
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Chat
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Settings className="w-4 h-4 mr-2" />
              Configure AI
            </Button>
          </div>
        </div>
      </AdminGlassCard>

      <div className="flex gap-6 flex-1">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <AdminGlassCard>
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Hirezy AI Assistant</div>
                  <div className="text-slate-400 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {personas.map(persona => (
                  <Button
                    key={persona.id}
                    onClick={() => setSelectedPersona(persona.id as any)}
                    className={`${
                      selectedPersona === persona.id
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    size="sm"
                  >
                    <persona.icon className="w-4 h-4 mr-1" />
                    {persona.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm">
                      {message.avatar || '🤖'}
                    </div>
                  )}
                  <div className={`max-w-md ${message.role === 'user' ? 'order-first' : 'order-last'}`}>
                    <div className={`p-4 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-200'
                    }`}>
                      {/* Message Content */}
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content.split('\n').map((line, i) => (
                          <div key={i} className={line.startsWith('•') || line.startsWith('-') ? 'ml-2' : ''}>
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Special Message Types */}
                      {message.type === 'recommendation' && message.data?.recommendations && (
                        <div className="mt-3 space-y-2">
                          {message.data.recommendations.map((rec: GigRecommendation) => (
                            <div key={rec.id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-600">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h4 className="text-blue-400 font-semibold text-sm">{rec.title}</h4>
                                  <p className="text-slate-400 text-xs">{rec.company}</p>
                                </div>
                                <div className="text-green-400 text-sm font-bold">
                                  {rec.matchScore}% match
                                </div>
                              </div>
                              <div className="text-xs text-slate-500 flex gap-2">
                                <span>Salary: {rec.salary}</span>
                                <span>Skills: {rec.skills.join(', ')}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {message.type === 'analysis' && message.data && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-green-900/30 rounded">
                            <div className="text-green-400 text-lg font-bold">{message.data.matchScore}%</div>
                            <div className="text-green-400 text-xs">Match Score</div>
                          </div>
                          <div className="text-center p-2 bg-blue-900/30 rounded">
                            <div className="text-blue-400 text-xs">Skills:</div>
                            <div className="text-blue-400 text-sm font-semibold">{message.data.skills.join(', ')}</div>
                          </div>
                          <div className="text-center p-2 bg-purple-900/30 rounded">
                            <div className="text-purple-400 text-xs">Suggested:</div>
                            <div className="text-purple-400 text-sm font-semibold">{message.data.suggestions.join(', ')}</div>
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-200' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full flex items-center justify-center text-sm">
                      {message.avatar || '👤'}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    🤖
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-3">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything... (try 'find gigs', 'analyze skills', 'market trends')"
                  className="flex-1 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center gap-4">
                <span>💡 Try asking: "Find gigs for React developers"</span>
                <span>🎯 Or: "Analyze JavaScript skills"</span>
                <span>📈 Or: "Show market trends"</span>
              </div>
            </div>
          </AdminGlassCard>
        </div>

        {/* Quick Actions Sidebar */}
        <AdminGlassCard className="w-80">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { text: 'Find Top Freelancers', icon: User, color: 'from-green-600 to-teal-600' },
              { text: 'Generate Proposals', icon: MessageSquare, color: 'from-purple-600 to-pink-600' },
              { text: 'Skill Gap Analysis', icon: Lightbulb, color: 'from-blue-600 to-cyan-600' },
              { text: 'Market Insights', icon: Target, color: 'from-orange-600 to-red-600' },
            ].map((action, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessage(action.text.toLowerCase())}
                className={`w-full p-3 bg-gradient-to-r ${action.color} rounded-lg text-white font-medium hover:opacity-90 transition-all duration-200 flex items-center gap-3`}
              >
                <action.icon className="w-4 h-4" />
                {action.text}
              </button>
            ))}
          </div>

          <h3 className="text-white font-semibold mt-6 mb-4">AI Statistics</h3>
          <div className="space-y-3">
            {[
              { label: 'Queries Today', value: '1,247', icon: MessageSquare },
              { label: 'Matches Found', value: '892', icon: Target },
              { label: 'Insights Generated', value: '445', icon: Lightbulb },
              { label: 'Response Time', value: '< 2s', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">{stat.label}</span>
                </div>
                <span className="text-white font-semibold text-sm">{stat.value}</span>
              </div>
            ))}
          </div>
        </AdminGlassCard>
      </div>
    </div>
  )
}
