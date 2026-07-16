'use client'

import { useState, useEffect, useRef } from 'react'
import { User, MessageCircle, Target, TrendingUp, Calendar, Send, Bot, User as UserIcon, Sparkles, BookOpen, Award } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import {
  sendCareerMessage,
  updateUserProfile,
  getCareerInsights,
  getCareerPlan,
  CareerProfile,
  CareerInsight,
  CareerCoachMessage,
  CareerPlan
} from '@/lib/ai/career-coach-service'

export default function CareerCoachPage() {
  const [messages, setMessages] = useState<CareerCoachMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [insights, setInsights] = useState<CareerInsight[]>([])
  const [careerPlan, setCareerPlan] = useState<CareerPlan | null>(null)
  const [userProfile, setUserProfile] = useState<CareerProfile>({
    currentRole: '',
    experience: [],
    skills: [],
    interests: [],
    goals: [],
    education: [],
    challenges: [],
    achievements: []
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'chat' | 'insights' | 'plan'>('chat')

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Load initial insights
    loadInsights()
  }, [])

  const loadInsights = async () => {
    try {
      const insightsData = await getCareerInsights()
      setInsights(insightsData)
    } catch (error) {
      console.error('Error loading insights:', error)
    }
  }

  const loadCareerPlan = async () => {
    if (!userProfile.currentRole) return

    setIsTyping(true)
    try {
      const plan = await getCareerPlan()
      setCareerPlan(plan)
    } catch (error) {
      console.error('Error loading career plan:', error)
      alert('Failed to generate career plan. Please ensure your profile is complete.')
    } finally {
      setIsTyping(false)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMsg: CareerCoachMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'question'
    }

    setMessages(prev => [...prev, userMsg])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await sendCareerMessage(inputMessage)
      setMessages(prev => [...prev, response])

      // If user is sharing profile info, update the profile
      if (inputMessage.toLowerCase().includes('i am') || inputMessage.toLowerCase().includes('i work') || inputMessage.toLowerCase().includes('my skills')) {
        // Basic profile extraction (could be improved with AI)
        updateProfileFromMessage(inputMessage)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMsg: CareerCoachMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date(),
        type: 'advice'
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const updateProfileFromMessage = async (message: string) => {
    // Simple profile extraction - in a real app, this would use AI
    const lowerMsg = message.toLowerCase()
    if (lowerMsg.includes('developer') || lowerMsg.includes('engineer')) {
      setUserProfile(prev => ({ ...prev, currentRole: 'Software Developer' }))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const updateProfile = async () => {
    if (!userProfile.currentRole.trim()) return

    try {
      await updateUserProfile(userProfile)
      alert('Profile updated successfully!')
      loadInsights() // Reload insights with new profile
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  const predefinedMessages = [
    "How can I improve my career prospects?",
    "What skills should I learn next?",
    "How do I network effectively in tech?",
    "What's a realistic career timeline?",
    "How should I prepare for job interviews?"
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Career Coach</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Get personalized career advice from an experienced AI coach. Share your goals and challenges
            to receive tailored guidance for your professional development.
          </p>
        </div>
      </GlassCard>

      {/* Navigation Tabs */}
      <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'chat' ? 'bg-purple-500/20 text-purple-300' : 'text-white/60 hover:text-white'
          }`}
        >
          💬 Chat
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'insights' ? 'bg-purple-500/20 text-purple-300' : 'text-white/60 hover:text-white'
          }`}
        >
          🎯 Insights
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'plan' ? 'bg-purple-500/20 text-purple-300' : 'text-white/60 hover:text-white'
          }`}
        >
          📋 Career Plan
        </button>
      </div>

      {/* Chat Interface */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <GlassCard className="h-[600px] flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-white/40 mt-8">
                    <Bot className="h-12 w-12 mx-auto mb-4" />
                    <p>Hi! I'm your AI career coach. Tell me about your career goals, current role, or any challenges you're facing.</p>
                  </div>
                )}

                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-white/10 border border-white/20 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your career..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                    <span className="text-sm">Send</span>
                  </button>
                </div>

                {/* Quick Messages */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {predefinedMessages.slice(0, 3).map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(msg)
                        sendMessage()
                      }}
                      disabled={isTyping}
                      className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 text-white/60 hover:text-white transition-colors"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4">Your Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/70 text-sm mb-1">Current Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Software Developer"
                    value={userProfile.currentRole}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, currentRole: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Key Skills</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, Python"
                    value={userProfile.skills.join(', ')}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev,
                      skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-1">Career Goal</label>
                  <input
                    type="text"
                    placeholder="Senior Developer, Tech Lead"
                    value={userProfile.goals[0] || ''}
                    onChange={(e) => setUserProfile(prev => ({
                      ...prev,
                      goals: [e.target.value]
                    }))}
                    className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white placeholder-white/40 text-sm"
                  />
                </div>

                <button
                  onClick={updateProfile}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Update Profile
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.length === 0 ? (
            <GlassCard className="text-center py-12 md:col-span-full">
              <BookOpen className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Insights Yet</h3>
              <p className="text-white/70">Complete your profile and chat with your career coach to get personalized insights.</p>
            </GlassCard>
          ) : (
            insights.map((insight, index) => (
              <GlassCard key={index}>
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    insight.priority === 'high' ? 'bg-red-500/20' :
                    insight.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                  }`}>
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70 uppercase">
                        {insight.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        insight.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        insight.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {insight.priority}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{insight.description}</p>
                    {insight.actionable && (
                      <div className="mt-3 flex items-center text-blue-400 text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Actionable
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      )}

      {/* Career Plan Tab */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          {!careerPlan ? (
            <GlassCard className="text-center py-12">
              <Calendar className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Generate Your Career Plan</h3>
              <p className="text-white/70 mb-6">Complete your profile and get a personalized 12-18 month career development roadmap.</p>
              <button
                onClick={loadCareerPlan}
                disabled={!userProfile.currentRole || isTyping}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isTyping ? 'Generating...' : 'Generate Career Plan'}
              </button>
            </GlassCard>
          ) : (
            <>
              <GlassCard className="neon-glow-purple">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-6 w-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Your Career Development Roadmap</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-green-400 mb-3">Short Term (3-6 months)</h4>
                    <ul className="space-y-2">
                      {careerPlan.shortTerm.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-400 mb-3">Medium Term (6-12 months)</h4>
                    <ul className="space-y-2">
                      {careerPlan.mediumTerm.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-purple-400 mb-3">Long Term (12-18 months)</h4>
                    <ul className="space-y-2">
                      {careerPlan.longTerm.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-white/80">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              {careerPlan.milestones.length > 0 && (
                <GlassCard>
                  <h4 className="font-semibold text-white mb-4">Key Milestones</h4>
                  <div className="space-y-4">
                    {careerPlan.milestones.map((milestone, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-white">{milestone.title}</h5>
                          <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                            {milestone.timeframe}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
