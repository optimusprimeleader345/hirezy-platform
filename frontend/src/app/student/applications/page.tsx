'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import {
  Briefcase, Clock, CheckCircle, XCircle, Star, Search,
  Filter, Calendar, DollarSign, ChevronRight, Loader2, Eye
} from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface Application {
  id: string
  gigTitle: string
  company: string
  salary: string
  status: 'pending' | 'shortlisted' | 'rejected' | 'hired'
  appliedDate: string
  skills: string[]
  location: string
}

const mockApplications: Application[] = [
  {
    id: '1',
    gigTitle: 'Senior React Developer',
    company: 'TechCorp Inc.',
    salary: '$120k – $150k',
    status: 'shortlisted',
    appliedDate: '2024-07-10',
    skills: ['React', 'TypeScript', 'Node.js'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    gigTitle: 'Full Stack Engineer',
    company: 'InnovateLabs',
    salary: '$110k – $135k',
    status: 'pending',
    appliedDate: '2024-07-08',
    skills: ['Java', 'Spring Boot', 'PostgreSQL'],
    location: 'Austin, TX'
  },
  {
    id: '3',
    gigTitle: 'Frontend Developer – FinTech',
    company: 'FinanceFlow',
    salary: '$100k – $125k',
    status: 'rejected',
    appliedDate: '2024-07-05',
    skills: ['React', 'JavaScript', 'CSS'],
    location: 'New York, NY'
  },
  {
    id: '4',
    gigTitle: 'Backend Engineer',
    company: 'CloudBase',
    salary: '$115k – $140k',
    status: 'hired',
    appliedDate: '2024-06-28',
    skills: ['Node.js', 'AWS', 'Docker'],
    location: 'Remote'
  },
  {
    id: '5',
    gigTitle: 'React Native Developer',
    company: 'MobileFirst',
    salary: '$95k – $120k',
    status: 'pending',
    appliedDate: '2024-07-12',
    skills: ['React Native', 'TypeScript', 'Redux'],
    location: 'Seattle, WA'
  }
]

const statusConfig = {
  pending: { label: 'Under Review', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-400/30', icon: Clock },
  shortlisted: { label: 'Shortlisted', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-400/30', icon: Star },
  rejected: { label: 'Not Selected', color: 'text-red-400', bg: 'bg-red-500/20 border-red-400/30', icon: XCircle },
  hired: { label: 'Hired! 🎉', color: 'text-green-400', bg: 'bg-green-500/20 border-green-400/30', icon: CheckCircle },
}

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data: applications, isLoading } = useQuery({
    queryKey: ['student-applications'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/student/applications')
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        return data.length > 0 ? data : mockApplications
      } catch {
        return mockApplications
      }
    }
  })

  const filtered = (applications ?? []).filter((app: Application) => {
    const matchesSearch = !searchQuery ||
      app.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: (applications ?? []).length,
    pending: (applications ?? []).filter((a: Application) => a.status === 'pending').length,
    shortlisted: (applications ?? []).filter((a: Application) => a.status === 'shortlisted').length,
    hired: (applications ?? []).filter((a: Application) => a.status === 'hired').length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">My Applications</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Track all your job applications, interview status, and progress in one place.
          </p>
        </div>
      </GlassCard>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Applied', value: stats.total, color: 'from-blue-500/20 to-purple-500/20 border-blue-400/30', icon: Briefcase },
          { label: 'Under Review', value: stats.pending, color: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30', icon: Clock },
          { label: 'Shortlisted', value: stats.shortlisted, color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30', icon: Star },
          { label: 'Hired', value: stats.hired, color: 'from-green-500/20 to-emerald-500/20 border-green-400/30', icon: CheckCircle },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border rounded-xl p-5`}>
            <stat.icon className="h-6 w-6 text-white/60 mb-2" />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-white/60 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <GlassCard>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search by role or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400/50"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-white/50" />
            {['all', 'pending', 'shortlisted', 'hired', 'rejected'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {s === 'all' ? 'All' : statusConfig[s as keyof typeof statusConfig]?.label ?? s}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Results Count */}
      <div className="text-white/50 text-sm">
        Showing {filtered.length} of {stats.total} applications
      </div>

      {/* Application Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      ) : filtered.length === 0 ? (
        <GlassCard className="text-center py-16">
          <Briefcase className="h-16 w-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white/60 mb-2">No applications found</h3>
          <p className="text-white/40 mb-6">Try adjusting your search or explore new gigs.</p>
          <Link
            href="/student/gigs"
            className="inline-flex items-center gap-2 px-6 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg text-purple-300 hover:bg-purple-500/40 transition-colors"
          >
            Browse Gigs
          </Link>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {filtered.map((app: Application) => {
            const cfg = statusConfig[app.status]
            const Icon = cfg.icon
            return (
              <GlassCard key={app.id} className="hover:bg-white/5 transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{app.gigTitle}</h3>
                        <p className="text-white/60 text-sm">{app.company} · {app.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-white/50 mb-3">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {app.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Applied {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {app.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-white/10 text-white/70 text-xs rounded-full border border-white/10">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Status + Action */}
                  <div className="flex flex-row md:flex-col items-center gap-3 md:items-end">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {cfg.label}
                    </div>
                    <Link
                      href={`/student/applications/${app.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}

      {/* CTA */}
      <GlassCard className="text-center py-8">
        <h3 className="text-lg font-semibold text-white mb-2">Looking for more opportunities?</h3>
        <p className="text-white/60 text-sm mb-4">Browse our latest gigs matching your skill profile</p>
        <Link
          href="/student/gigs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border border-purple-400/50 rounded-lg text-purple-300 font-medium transition-all"
        >
          <Briefcase className="h-4 w-4" />
          Browse Available Gigs
        </Link>
      </GlassCard>
    </div>
  )
}
