'use client'

import { useState, useEffect } from 'react'
import { Search, X, FileText, Users, Briefcase, Shield, TrendingUp, Bug, MessageSquare, Settings } from 'lucide-react'
import { AdminGlassCard } from '../cards/AdminGlassCard'
import { Button } from '../ui/button'

interface SearchResult {
  id: string
  type: 'user' | 'gig' | 'log' | 'analytics' | 'fraud' | 'communication' | 'system'
  title: string
  description: string
  metadata: Record<string, any>
  url: string
}

const searchCategories = [
  { key: 'all', label: 'All Results', icon: Search },
  { key: 'user', label: 'Users', icon: Users },
  { key: 'gig', label: 'Gigs', icon: Briefcase },
  { key: 'log', label: 'Audit Logs', icon: FileText },
  { key: 'analytics', label: 'Analytics', icon: TrendingUp },
  { key: 'fraud', label: 'Fraud Detection', icon: Shield },
  { key: 'system', label: 'System Health', icon: Bug },
  { key: 'communication', label: 'Communications', icon: MessageSquare },
]

export default function AdminGlobalSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Mock search results - replace with real API calls
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      type: 'user',
      title: 'Sarah Chen',
      description: 'Active student with 98% reputation score',
      metadata: { role: 'student', status: 'active', location: 'San Francisco' },
      url: '/admin/users?id=1'
    },
    {
      id: '2',
      type: 'gig',
      title: 'React Developer Needed',
      description: 'High-paying gig posted 2 days ago',
      metadata: { budget: '$5000', company: 'TechCorp', status: 'approved' },
      url: '/admin/gigs?id=2'
    },
    {
      id: '3',
      type: 'log',
      title: 'Critical Security Event',
      description: 'Multiple login attempts detected',
      metadata: { severity: 'critical', ip: '192.168.1.100', time: '2 hours ago' },
      url: '/admin/logs?id=3'
    },
    {
      id: '4',
      type: 'analytics',
      title: 'Revenue Report',
      description: 'Monthly revenue increased by 15%',
      metadata: { period: 'last month', growth: '+15%', amount: '$245K' },
      url: '/admin/analytics?report=revenue'
    },
    {
      id: '5',
      type: 'fraud',
      title: 'Suspicious Transaction',
      description: 'Large transaction flagged for review',
      metadata: { amount: '$50,000', risk: 'high', company: 'StartupX' },
      url: '/admin/fraud?id=5'
    }
  ]

  useEffect(() => {
    if (query.length > 2) {
      setIsSearching(true)

      // Simulate search delay
      const timeout = setTimeout(() => {
        const filtered = mockSearchResults.filter(result => {
          const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                              result.description.toLowerCase().includes(query.toLowerCase())
          const matchesCategory = selectedCategory === 'all' || result.type === selectedCategory
          return matchesQuery && matchesCategory
        })

        setResults(filtered)
        setIsSearching(false)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timeout)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query, selectedCategory])

  const getTypeIcon = (type: string) => {
    const category = searchCategories.find(cat => cat.key === type)
    return category ? category.icon : Search
  }

  const getTypeColor = (type: string) => {
    const colors = {
      user: 'text-blue-400 bg-blue-900/20',
      gig: 'text-green-400 bg-green-900/20',
      log: 'text-purple-400 bg-purple-900/20',
      analytics: 'text-yellow-400 bg-yellow-900/20',
      fraud: 'text-red-400 bg-red-900/20',
      system: 'text-orange-400 bg-orange-900/20',
      communication: 'text-teal-400 bg-teal-900/20'
    }
    return colors[type as keyof typeof colors] || 'text-slate-400 bg-slate-900/20'
  }

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search across admin platform... (users, gigs, logs, analytics)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-3 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {isSearching && (
          <div className="absolute right-12 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {searchCategories.map(category => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.key
          return (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Icon className="w-3 h-3" />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
          <AdminGlassCard className="p-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold">
                  Search Results ({results.length})
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {results.length > 0 ? (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {results.map(result => {
                    const Icon = getTypeIcon(result.type)
                    return (
                      <div
                        key={result.id}
                        onClick={() => {
                          // Navigate to result - replace with actual navigation
                          alert(`Navigate to: ${result.url}`)
                          setIsOpen(false)
                          setQuery('')
                        }}
                        className="p-3 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors border border-slate-700 hover:border-slate-600"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-medium truncate">{result.title}</h4>
                              <span className="text-xs px-2 py-0.5 bg-slate-700 rounded capitalize">
                                {result.type}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm mb-2 line-clamp-2">{result.description}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                              {Object.entries(result.metadata).map(([key, value]) => (
                                <span key={key}>
                                  {key}: <span className="text-slate-300">{String(value)}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-400">No results found for "{query}"</p>
                  <p className="text-slate-500 text-sm">Try adjusting your search or category filter</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between items-center">
                  <p className="text-xs text-slate-500">
                    Showing top {results.length} results
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      alert('View all search results page')
                      setIsOpen(false)
                    }}
                  >
                    View All Results
                  </Button>
                </div>
              )}
            </div>
          </AdminGlassCard>
        </div>
      )}
    </div>
  )
}
