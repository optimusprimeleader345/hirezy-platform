'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Search, Send, Loader2, XCircle } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface Gig {
  gigId: string
  title: string
  description: string
  budget: string
  skills: string[]
  status: string
  createdAt: string
  recruiterName: string
  applicationsCount: number
}

export default function GigDiscovery() {
  const {
    data: gigs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['gigs', 'list'],
    queryFn: async () => {
      const response = await fetch('/api/gigs/list')
      if (!response.ok) throw new Error('Failed to fetch gigs')
      return response.json() as Promise<Gig[]>
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [budgetFilter, setBudgetFilter] = useState<string>('')
  const [sortBy, setSortBy] = useState('newest')

  // Filter and sort gigs
  const filteredGigs = gigs?.filter(gig => {
    // Search filter
    if (searchQuery && !gig.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Skills filter
    if (selectedSkills.length > 0 && !selectedSkills.some(skill => gig.skills.includes(skill))) return false

    // Budget filter
    if (budgetFilter) {
      const budgetNum = parseInt(gig.budget.replace(/[^0-9]/g, ''))
      switch (budgetFilter) {
        case 'under-2000': if (budgetNum >= 2000) return false; break
        case '2000-5000': if (budgetNum < 2000 || budgetNum > 5000) return false; break
        case '5000-10000': if (budgetNum < 5000 || budgetNum > 10000) return false; break
        case 'over-10000': if (budgetNum <= 10000) return false; break
      }
    }

    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'highest-paying':
        return parseInt(b.budget.replace(/[^0-9]/g, '')) - parseInt(a.budget.replace(/[^0-9]/g, ''))
      case 'lowest-paying':
        return parseInt(a.budget.replace(/[^0-9]/g, '')) - parseInt(b.budget.replace(/[^0-9]/g, ''))
      default:
        return 0
    }
  }) || []

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleApplyNow = (gigId: string) => {
    // Navigate to detail page for application
    window.location.href = `/student/gigs/${gigId}`
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedSkills([])
    setBudgetFilter('')
    setSortBy('newest')
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <GlassCard className="neon-glow-purple">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Loading Gigs</h1>
            <p className="text-white/70">Fetching latest opportunities...</p>
          </div>
        </GlassCard>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <GlassCard className="border-red-400/30 bg-red-500/10">
          <div className="text-center py-12">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Failed to Load Gigs</h1>
            <p className="text-white/70 mb-6">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors text-purple-300"
            >
              Try Again
            </button>
          </div>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">Available Gigs</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover freelance opportunities that match your skills
          </p>
        </div>
      </GlassCard>

      {/* Search and Filters */}
      <GlassCard>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-white/50" />
            <input
              type="text"
              placeholder="Search gigs by title or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/25 outline-none transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Skills:</span>
              <div className="flex flex-wrap gap-1">
                {['React', 'Node.js', 'Python', 'JavaScript', 'TypeScript'].map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <select
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value)}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
            >
              <option value="">Any Budget</option>
              <option value="under-2000">Under $2000</option>
              <option value="2000-5000">$2000-$5000</option>
              <option value="5000-10000">$5000-$10000</option>
              <option value="over-10000">Over $10000</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest-paying">Highest Paying</option>
              <option value="lowest-paying">Lowest Paying</option>
            </select>

            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors text-purple-300 text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="text-center">
        <p className="text-white/70">
          {filteredGigs.length} of {gigs?.length || 0} gigs
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Gig Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGigs.map((gig) => (
          <GigCard
            key={gig.gigId}
            gig={gig}
            onApply={() => handleApplyNow(gig.gigId)}
          />
        ))}
      </div>

      {filteredGigs.length === 0 && (gigs?.length ?? 0) > 0 && (
        <GlassCard className="text-center py-12">
          <Search className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No gigs match your filters</h3>
          <p className="text-white/70 mb-6">Try adjusting your search criteria</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors"
          >
            Clear All Filters
          </button>
        </GlassCard>
      )}
    </div>
  )
}

// Simple Gig Card Component
function GigCard({ gig, onApply }: { gig: Gig; onApply: () => void }) {
  return (
    <GlassCard className="p-6 hover:bg-white/5 transition-all duration-300">
      <div className="space-y-4">
        {/* Title and Company */}
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{gig.title}</h3>
          <p className="text-white/70 text-sm">by {gig.recruiterName}</p>
        </div>

        {/* Budget */}
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-semibold text-lg">{gig.budget}</span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {gig.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-400/30">
              {skill}
            </span>
          ))}
          {gig.skills.length > 3 && (
            <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
              +{gig.skills.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-xs text-white/60">
          <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
          <span>{gig.applicationsCount} applications</span>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm line-clamp-2">{gig.description}</p>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onApply}
            className="px-6 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Apply Now
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
