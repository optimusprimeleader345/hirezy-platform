'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  MessageCircle,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Paperclip,
  Send,
  X,
  BookOpen,
  MessageSquare,
  Users,
  Zap,
  Sparkles,
  Filter,
  SortAsc,
  Grid,
  List
} from 'lucide-react'
import Link from 'next/link'

// Mock data - in real app this would come from API
const faqs = [
  {
    id: 'getting-started',
    question: "How do I get started as a student on Hirezy?",
    answer: "Complete your profile with your skills, experience, and portfolio. Browse available gigs, submit applications, and track your progress. Our AI assistant will guide you through the process.",
    category: "Getting Started"
  },
  {
    id: 'find-gigs',
    question: "How do I find gigs that match my skills?",
    answer: "Use the search and filter options on the Gigs page. Apply filters by skills, experience level, and location. Our AI matching engine will also suggest personalized opportunities.",
    category: "Finding Work"
  },
  {
    id: 'application-process',
    question: "What's the application process like?",
    answer: "Submit your application directly on the gig page. Our AI will help optimize your application and provide ATS-friendly suggestions. Recruiters will review your application and respond within 3-5 business days.",
    category: "Applications"
  },
  {
    id: 'payments',
    question: "How and when do I get paid?",
    answer: "Payments are processed through our secure platform. Funds are released upon project completion and approval. Payment timelines vary by project but typically occur within 1-2 weeks after acceptance.",
    category: "Payments"
  },
  {
    id: 'account-security',
    question: "How do I secure my account?",
    answer: "Enable two-factor authentication, use strong passwords, and keep your contact information up to date. Never share your login credentials with anyone.",
    category: "Security"
  },
  {
    id: 'disputes',
    question: "What should I do if there's a problem with a project?",
    answer: "Contact the recruiter directly first. If the issue persists, submit a dispute through our support system with all relevant details and evidence.",
    category: "Disputes"
  }
]

const categories = [
  { id: 'getting-started', name: 'Getting Started', icon: Sparkles, count: 12 },
  { id: 'finding-work', name: 'Finding Work', icon: Eye, count: 8 },
  { id: 'applications', name: 'Applications', icon: FileText, count: 15 },
  { id: 'payments', name: 'Payments', icon: Clock, count: 6 },
  { id: 'technical', name: 'Technical Issues', icon: AlertTriangle, count: 10 },
  { id: 'account', name: 'Account & Security', icon: Zap, count: 7 }
]

const knowledgeBase = [
  {
    id: 'building-profile',
    title: 'Building a Strong Student Profile',
    category: 'Getting Started',
    readTime: 3,
    views: 1234
  },
  {
    id: 'resume-tips',
    title: 'Resume Optimization for Freelance Work',
    category: 'Career Development',
    readTime: 5,
    views: 2156
  },
  {
    id: 'interview-prep',
    title: 'AI-Powered Interview Preparation',
    category: 'Applications',
    readTime: 7,
    views: 1890
  },
  {
    id: 'gig-search-strategies',
    title: 'Advanced Gig Search Strategies',
    category: 'Finding Work',
    readTime: 4,
    views: 987
  }
]

interface SupportTicket {
  id: string
  subject: string
  status: string
  priority: string
  createdAt: string
  messages: number
}

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState(faqs)
  const [showTicketForm, setShowTicketForm] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [userTickets, setUserTickets] = useState<SupportTicket[]>([])
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards')
  const [sortBy, setSortBy] = useState<'relevance' | 'recent'>('relevance')

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId)
  }

  // Smart search with AI-like filtering
  useEffect(() => {
    let results = faqs

    if (searchTerm) {
      results = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      results = results.filter(faq => faq.category.toLowerCase().replace(' ', '-').includes(selectedCategory))
    }

    setSearchResults(results)
  }, [searchTerm, selectedCategory])

  // Mock user tickets - in real app fetch from API
  useEffect(() => {
    // Simulate fetching user tickets
    const mockTickets = [
      {
        id: '1',
        subject: 'Payment delay issue',
        status: 'open',
        priority: 'high',
        createdAt: '2024-01-15',
        messages: 3
      },
      {
        id: '2',
        subject: 'Profile verification',
        status: 'resolved',
        priority: 'normal',
        createdAt: '2024-01-10',
        messages: 1
      }
    ]
    setUserTickets(mockTickets)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <HelpCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-3xl" />
        <div className="relative z-10 container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Advanced Support
              <span className="block text-4xl md:text-5xl text-blue-200 mt-2">
                & Knowledge Center
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant answers, submit support tickets, and access our comprehensive knowledge base.
              Our AI assistant is here to help you succeed.
            </p>

            {/* Enhanced Search */}
            <div className="max-w-md mx-auto relative mb-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search help articles, FAQs, or ask anything..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 rounded-2xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 shadow-2xl backdrop-blur-sm bg-white/95"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTicketForm(true)}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Submit Support Ticket
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLiveChat(true)}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm flex items-center gap-3 font-semibold"
              >
                <MessageCircle className="w-5 h-5" />
                Live Chat Support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                Browse by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl backdrop-blur-sm border cursor-pointer transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-300 shadow-lg'
                        : 'bg-white/80 border-slate-200 hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                  >
                    <category.icon className={`w-8 h-8 mb-3 ${selectedCategory === category.id ? 'text-white' : 'text-blue-600'}`} />
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className={`text-sm ${selectedCategory === category.id ? 'text-blue-100' : 'text-slate-600'}`}>
                      {category.count} articles
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Knowledge Base Articles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-green-600" />
                  Knowledge Base
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('cards')}
                      className={`p-2 rounded ${viewMode === 'cards' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'relevance' | 'recent')}
                    className="px-4 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="recent">Recently Added</option>
                  </select>
                </div>
              </div>

              <div className={viewMode === 'cards' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
                {knowledgeBase.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all cursor-pointer ${
                      viewMode === 'list' ? 'flex items-center justify-between' : ''
                    }`}
                  >
                    {viewMode === 'cards' ? (
                      <>
                        <div className="flex items-start justify-between mb-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime} min read
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>{article.category}</span>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {article.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime} min
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-purple-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {searchResults.map((faq) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left hover:bg-slate-50/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {faq.question}
                        </h3>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-slate-100"
                        >
                          <div className="p-6 text-slate-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {searchResults.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-slate-600 mb-4">
                    We couldn't find anything matching "{searchTerm}".
                  </p>
                  <button
                    onClick={() => setShowTicketForm(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ask Our Support Team
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Your Support Tickets */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-blue-600" />
                Your Support Tickets
              </h3>
              <div className="space-y-4">
                {userTickets.length > 0 ? (
                  userTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {getStatusIcon(ticket.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">
                          {ticket.createdAt}
                        </span>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1 truncate">
                        {ticket.subject}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{ticket.messages} messages</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                          ticket.priority === 'normal' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">
                      No support tickets yet
                    </p>
                    <button
                      onClick={() => setShowTicketForm(true)}
                      className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create your first ticket
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-600" />
                Contact Support
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowLiveChat(true)}
                  className="w-full flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-blue-50 border border-blue-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div className="text-left flex-1">
                    <div className="font-semibold text-slate-900">Live Chat</div>
                    <div className="text-sm text-slate-600">Get instant help</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </button>

                <button
                  onClick={() => setShowTicketForm(true)}
                  className="w-full flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-purple-50 border border-purple-200 transition-colors"
                >
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div className="text-left flex-1">
                    <div className="font-semibold text-slate-900">Submit Ticket</div>
                    <div className="text-sm text-slate-600">For complex issues</div>
                  </div>
                </button>

                <div className="pt-4 border-t border-blue-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        📧
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Email</div>
                        <div className="text-sm text-slate-600">support@hirezy.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">Phone</div>
                        <div className="text-sm text-slate-600">1-800-HIREZY (24/7)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Assistant Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="mt-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white"
            >
              <Sparkles className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-3">AI Assistant</h3>
              <p className="text-purple-100 mb-4">
                Get instant answers and personalized support from our AI assistant.
              </p>
              <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
                Start Chat
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showTicketForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTicketForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Create Support Ticket</h2>
                  <button
                    onClick={() => setShowTicketForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account & Security</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Priority
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="priority" value="low" className="mr-2" />
                        <span className="text-slate-700">Low</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="priority" value="normal" className="mr-2" defaultChecked />
                        <span className="text-slate-700">Normal</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="priority" value="high" className="mr-2" />
                        <span className="text-slate-700">High</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Provide detailed information about your issue..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Attachments
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600">
                        Drag files here or <span className="text-blue-600 font-medium">browse</span>
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        PNG, JPG, PDF up to 10MB each
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowTicketForm(false)}
                      className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showLiveChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLiveChat(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-green-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Support</h3>
                      <p className="text-sm opacity-90">Online now • 1 minute avg respond time</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLiveChat(false)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <div className="space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-slate-900">Hi! How can I help you today? 👋</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p>I'm having trouble with my account settings...</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-slate-900">I'd be happy to help you with that! Can you tell me more about the specific issue?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-100 py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/help?category=getting-started" className="block text-slate-600 hover:text-blue-600">
                  Getting Started Guide
                </Link>
                <Link href="/help?category=technical" className="block text-slate-600 hover:text-blue-600">
                  Technical Support
                </Link>
                <Link href="/help?category=account" className="block text-slate-600 hover:text-blue-600">
                  Account Help
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Contact Info</h4>
              <div className="space-y-2 text-slate-600">
                <p>📧 support@hirezy.com</p>
                <p>📞 1-800-HIREZY (24/7)</p>
                <p>💬 Live Chat (Mon-Fri 9AM-6PM EST)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
              <div className="space-y-2">
                <Link href="/blog" className="block text-slate-600 hover:text-blue-600">
                  Blog & Tutorials
                </Link>
                <Link href="/webinars" className="block text-slate-600 hover:text-blue-600">
                  Webinars
                </Link>
                <Link href="/community" className="block text-slate-600 hover:text-blue-600">
                  Community Forum
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200">
            <p className="text-slate-600 text-sm">
              Need more help?{' '}
              <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Return to Dashboard
              </Link>{' '}
              or{' '}
              <button
                onClick={() => setShowTicketForm(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Start a Support Ticket
              </button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
