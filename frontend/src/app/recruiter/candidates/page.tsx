'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users,
  Search,
  Filter,
  Star,
  MapPin,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  Sparkles,
  ArrowRight,
  Eye,
  MessageSquare,
  Shield,
  Award,
  TrendingUp,
  Brain,
  SlidersHorizontal,
  Plus,
  X
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface CandidateProfile {
  id: string
  name: string
  avatar: string
  title: string
  category: 'Engineering' | 'Design' | 'Data Science' | 'Product'
  experience: string
  experienceYears: number
  location: string
  skills: string[]
  hourlyRate: number
  salaryExpectation: string
  availability: 'Available now' | 'Available in 2 weeks' | 'Project-based only'
  rating: number
  projectsCompleted: number
  badge: string
  recentWork: string
  matchScore: number
  aiInsights: {
    fitLevel: string
    summary: string
    keyStrengths: string[]
  }
}

const CANDIDATE_DATABASE: CandidateProfile[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'AC',
    title: 'Senior Full Stack Engineer',
    category: 'Engineering',
    experience: '5 years',
    experienceYears: 5,
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Next.js', 'Docker'],
    hourlyRate: 85,
    salaryExpectation: '$140k - $160k',
    availability: 'Available now',
    rating: 4.9,
    projectsCompleted: 47,
    badge: 'Top Rated AI Fit',
    recentWork: 'Led React 18 micro-frontend migration at Fortune 500 company',
    matchScore: 97,
    aiInsights: {
      fitLevel: 'Exceptional Match',
      summary: 'High-leverage full-stack architect with deep React/Next.js expertise and strong leadership communication.',
      keyStrengths: ['Modern JavaScript & Architecture', 'CI/CD Cloud Infrastructure', 'High Team Velocity']
    }
  },
  {
    id: '2',
    name: 'Sarah Kumar',
    avatar: 'SK',
    title: 'Lead UX/UI Product Designer',
    category: 'Design',
    experience: '4 years',
    experienceYears: 4,
    location: 'Austin, TX (Remote)',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Adobe Suite', 'Accessibility'],
    hourlyRate: 65,
    salaryExpectation: '$120k - $135k',
    availability: 'Available in 2 weeks',
    rating: 4.8,
    projectsCompleted: 32,
    badge: 'Rising Star',
    recentWork: 'Designed fintech mobile app utilized by 1.2M+ active retail investors',
    matchScore: 93,
    aiInsights: {
      fitLevel: 'Strong Match',
      summary: 'Exceptional visual design systems thinker with rigorous user testing habits.',
      keyStrengths: ['Scalable Figma Component Libraries', 'Data-Driven User Testing', 'Cross-functional Collaboration']
    }
  },
  {
    id: '3',
    name: 'David Kim',
    avatar: 'DK',
    title: 'Principal Machine Learning & NLP Engineer',
    category: 'Data Science',
    experience: '6 years',
    experienceYears: 6,
    location: 'Seattle, WA',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLM Fine-tuning', 'NLP', 'AWS SageMaker', 'Vector DBs'],
    hourlyRate: 110,
    salaryExpectation: '$170k - $190k',
    availability: 'Available now',
    rating: 5.0,
    projectsCompleted: 61,
    badge: 'AI Specialist',
    recentWork: 'Architected RAG pipeline cutting enterprise customer query latency by 45%',
    matchScore: 96,
    aiInsights: {
      fitLevel: 'Exceptional Match',
      summary: 'Specialized AI/ML scientist with proven commercial RAG and LLM deployment track record.',
      keyStrengths: ['Large Language Model Engineering', 'PyTorch Distributed Training', 'Production AI Pipelines']
    }
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    avatar: 'ER',
    title: 'Senior Cloud & DevOps Architect',
    category: 'Engineering',
    experience: '7 years',
    experienceYears: 7,
    location: 'Remote (EST)',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Jenkins', 'Docker', 'Go', 'Prometheus'],
    hourlyRate: 95,
    salaryExpectation: '$150k - $175k',
    availability: 'Project-based only',
    rating: 4.7,
    projectsCompleted: 89,
    badge: 'Infrastructure Expert',
    recentWork: 'Spearheaded multi-cloud Kubernetes orchestration supporting 10,000 requests/sec',
    matchScore: 91,
    aiInsights: {
      fitLevel: 'Strong Match',
      summary: 'Rock-solid infrastructure architect specializing in zero-downtime deployments and cloud cost optimization.',
      keyStrengths: ['Kubernetes Cluster Mastery', 'Infrastructure as Code (Terraform)', 'Site Reliability Engineering']
    }
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    avatar: 'MJ',
    title: 'Staff Product Manager (Technical)',
    category: 'Product',
    experience: '8 years',
    experienceYears: 8,
    location: 'New York, NY',
    skills: ['Product Strategy', 'Agile Roadmapping', 'Data Analytics', 'User Stories', 'SQL', 'B2B SaaS'],
    hourlyRate: 120,
    salaryExpectation: '$165k - $185k',
    availability: 'Available in 2 weeks',
    rating: 4.9,
    projectsCompleted: 44,
    badge: 'Executive Talent',
    recentWork: 'Grew B2B SaaS ARR from $5M to $18M through targeted self-serve onboarding initiatives',
    matchScore: 94,
    aiInsights: {
      fitLevel: 'Exceptional Match',
      summary: 'Data-driven technical product leader adept at aligning engineering velocity with revenue goals.',
      keyStrengths: ['B2B Product Growth Engine', 'Agile Execution Leadership', 'Deep Technical Acumen']
    }
  },
  {
    id: '6',
    name: 'Elena Rostova',
    avatar: 'ER',
    title: 'Senior Backend Go/Rust Engineer',
    category: 'Engineering',
    experience: '5 years',
    experienceYears: 5,
    location: 'Chicago, IL (Remote)',
    skills: ['Go', 'Rust', 'PostgreSQL', 'Redis', 'Microservices', 'Kafka', 'gRPC'],
    hourlyRate: 90,
    salaryExpectation: '$145k - $165k',
    availability: 'Available now',
    rating: 4.8,
    projectsCompleted: 39,
    badge: 'High Performance',
    recentWork: 'Engineered high-throughput financial transaction engine processing 50k TPS',
    matchScore: 95,
    aiInsights: {
      fitLevel: 'Exceptional Match',
      summary: 'Systems programmer focused on ultra-low latency backend architectures and concurrency.',
      keyStrengths: ['Concurrent Go/Rust Engineering', 'High-Throughput Messaging (Kafka)', 'Distributed Database Scaling']
    }
  }
]

export default function CandidateDatabasePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all')
  const [minMatchScore, setMinMatchScore] = useState<number>(0)
  const [previewCandidate, setPreviewCandidate] = useState<CandidateProfile | null>(null)
  const [shortlistedIds, setShortlistedIds] = useState<Set<string>>(new Set(['1', '3']))

  // Filter logic
  const filteredCandidates = useMemo(() => {
    return CANDIDATE_DATABASE.filter(c => {
      const matchesSearch = searchQuery === '' || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory
      const matchesAvailability = selectedAvailability === 'all' || c.availability === selectedAvailability
      const matchesScore = c.matchScore >= minMatchScore

      return matchesSearch && matchesCategory && matchesAvailability && matchesScore
    })
  }, [searchQuery, selectedCategory, selectedAvailability, minMatchScore])

  const toggleShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setShortlistedIds(prev => {
      const next = new Set(Array.from(prev))
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 text-slate-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
            <Users className="w-8 h-8 text-[#3EFFA8]" />
            Candidate Talent Database
          </h1>
          <p className="text-slate-400 mt-1">
            Browse, filter, and shortlist pre-screened, high-match technical candidates with AI fit insights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-[#3EFFA8]/10 text-[#3EFFA8] border border-[#3EFFA8]/30 px-3 py-1.5 text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {filteredCandidates.length} Candidates Matched
          </Badge>
          <Badge className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1.5 text-sm font-semibold">
            {shortlistedIds.size} Shortlisted
          </Badge>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="p-5 bg-[#111315] border border-[#23262B] rounded-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search by candidate name, role title, or skill (e.g. React, Python, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1A1D21] border-[#23262B] text-white rounded-xl placeholder:text-slate-500 focus:border-[#3EFFA8]"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[#1A1D21] border-[#23262B] text-white rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1D21] border-[#23262B] text-white">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design & UI/UX</SelectItem>
                <SelectItem value="Data Science">Data Science & AI</SelectItem>
                <SelectItem value="Product">Product Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Availability Filter */}
          <div className="md:col-span-2">
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger className="bg-[#1A1D21] border-[#23262B] text-white rounded-xl">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1D21] border-[#23262B] text-white">
                <SelectItem value="all">Any Availability</SelectItem>
                <SelectItem value="Available now">Available Now</SelectItem>
                <SelectItem value="Available in 2 weeks">In 2 Weeks</SelectItem>
                <SelectItem value="Project-based only">Contract/Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Match Score Quick Pill */}
          <div className="md:col-span-2">
            <Select value={minMatchScore.toString()} onValueChange={(val) => setMinMatchScore(Number(val))}>
              <SelectTrigger className="bg-[#1A1D21] border-[#23262B] text-white rounded-xl">
                <SelectValue placeholder="AI Match Score" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1D21] border-[#23262B] text-white">
                <SelectItem value="0">Any Fit Score</SelectItem>
                <SelectItem value="90">90%+ Strong Fit</SelectItem>
                <SelectItem value="95">95%+ Exceptional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        {(searchQuery || selectedCategory !== 'all' || selectedAvailability !== 'all' || minMatchScore > 0) && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#23262B] flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Active Filters:</span>
            {searchQuery && (
              <Badge variant="outline" className="bg-[#1A1D21] text-slate-300 border-[#23262B] gap-1 text-xs py-0.5">
                Query: "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSearchQuery('')} />
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="outline" className="bg-[#1A1D21] text-slate-300 border-[#23262B] gap-1 text-xs py-0.5">
                {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedCategory('all')} />
              </Badge>
            )}
            {selectedAvailability !== 'all' && (
              <Badge variant="outline" className="bg-[#1A1D21] text-slate-300 border-[#23262B] gap-1 text-xs py-0.5">
                {selectedAvailability}
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setSelectedAvailability('all')} />
              </Badge>
            )}
            {minMatchScore > 0 && (
              <Badge variant="outline" className="bg-[#1A1D21] text-slate-300 border-[#23262B] gap-1 text-xs py-0.5">
                {minMatchScore}%+ Score
                <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => setMinMatchScore(0)} />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedAvailability('all')
                setMinMatchScore(0)
              }}
              className="text-xs text-[#3EFFA8] hover:text-white hover:bg-transparent h-auto p-0 ml-1"
            >
              Clear All
            </Button>
          </div>
        )}
      </Card>

      {/* Candidate Grid */}
      {filteredCandidates.length === 0 ? (
        <Card className="p-12 bg-[#111315] border border-[#23262B] rounded-2xl text-center space-y-4">
          <Users className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-xl font-bold text-white">No candidates match your filters</h3>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            Try adjusting your search criteria, clearing category filters, or lowering your minimum AI fit score threshold.
          </p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedAvailability('all')
              setMinMatchScore(0)
            }}
            className="bg-[#3EFFA8] hover:bg-[#2fe090] text-slate-950 font-bold px-6"
          >
            Reset Filters
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCandidates.map((c) => {
            const isShortlisted = shortlistedIds.has(c.id)
            return (
              <Card
                key={c.id}
                onClick={() => router.push(`/recruiter/candidates/${c.id}`)}
                className="p-6 bg-[#111315] border border-[#23262B] hover:border-[#3EFFA8]/40 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-5 hover:shadow-xl group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center text-lg font-black text-white shadow-inner flex-shrink-0">
                      {c.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-[#3EFFA8] transition-colors">
                          {c.name}
                        </h3>
                        <Badge className="bg-slate-800/80 text-slate-300 border border-slate-700 text-[10px] px-2 py-0">
                          {c.category}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-slate-300 mt-0.5">{c.title}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {c.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                          {c.experience} exp
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score & Shortlist Toggle */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-[#3EFFA8]/10 border border-[#3EFFA8]/30 text-[#3EFFA8] font-black text-sm px-3 py-1 rounded-xl shadow-sm">
                      <Sparkles className="w-3.5 h-3.5" />
                      {c.matchScore}% Fit
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => toggleShortlist(c.id, e)}
                      className={`h-7 px-2.5 rounded-lg text-xs font-semibold border ${
                        isShortlisted
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-[#1A1D21] text-slate-400 border-[#23262B] hover:text-white'
                      }`}
                    >
                      {isShortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                    </Button>
                  </div>
                </div>

                {/* AI Summary Snippet */}
                <div className="bg-[#1A1D21] p-3.5 rounded-xl border border-[#23262B]/80 text-xs text-slate-300 leading-relaxed">
                  <div className="flex items-center justify-between mb-1 text-slate-400 font-semibold">
                    <span className="flex items-center gap-1 text-[#3EFFA8]">
                      <Brain className="w-3.5 h-3.5" />
                      AI Evaluation
                    </span>
                    <span>{c.aiInsights.fitLevel}</span>
                  </div>
                  <p className="text-slate-300 line-clamp-2">{c.aiInsights.summary}</p>
                </div>

                {/* Skills Cloud */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Verified Competencies</span>
                    <span className="text-[#3EFFA8]">{c.skills.length} skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.skills.slice(0, 5).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#1A1D21] text-slate-300 border border-[#23262B] px-2.5 py-0.5 rounded-md font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {c.skills.length > 5 && (
                      <span className="text-xs bg-[#1A1D21] text-slate-500 border border-[#23262B] px-2 py-0.5 rounded-md font-medium">
                        +{c.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-[#23262B] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      {c.availability}
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 font-semibold">{c.salaryExpectation}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewCandidate(c)
                      }}
                      className="h-8 px-3 rounded-lg bg-[#1A1D21] hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-[#23262B]"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 text-[#3EFFA8]" />
                      Quick View
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/recruiter/candidates/${c.id}`)
                      }}
                      className="h-8 px-3 rounded-lg bg-[#3EFFA8] hover:bg-[#2fe090] text-slate-950 font-bold text-xs"
                    >
                      Profile
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* AI Quick Preview Modal */}
      {previewCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-0 duration-200">
          <Card className="w-full max-w-2xl bg-[#111315] border border-[#3EFFA8]/40 rounded-2xl p-6 space-y-6 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#23262B] pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 flex items-center justify-center text-xl font-black text-white">
                  {previewCandidate.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{previewCandidate.name}</h3>
                  <p className="text-slate-300 font-medium">{previewCandidate.title}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    {previewCandidate.location} • {previewCandidate.experience} experience
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPreviewCandidate(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A1D21] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Fit Analysis Box */}
            <div className="bg-[#1A1D21] p-4 rounded-xl border border-[#3EFFA8]/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#3EFFA8] flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Candidate Audit ({previewCandidate.aiInsights.fitLevel})
                </span>
                <Badge className="bg-[#3EFFA8] text-black font-black text-xs">
                  {previewCandidate.matchScore}% Match
                </Badge>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                {previewCandidate.aiInsights.summary}
              </p>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top AI-Verified Strengths:</span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {previewCandidate.aiInsights.keyStrengths.map((str, i) => (
                    <span key={i} className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-md">
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Work & Skills */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Key Career Milestone</h4>
                <p className="text-sm text-slate-200 bg-[#1A1D21] p-3 rounded-xl border border-[#23262B]">
                  {previewCandidate.recentWork}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Competency Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {previewCandidate.skills.map((skill, i) => (
                    <Badge key={i} className="bg-[#1A1D21] text-slate-200 border-[#23262B] px-3 py-1 font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#23262B] flex items-center justify-between gap-3">
              <div className="text-xs text-slate-400">
                <span>Rate: <strong className="text-white">${previewCandidate.hourlyRate}/hr</strong></span>
                <span className="mx-2">•</span>
                <span>Expected: <strong className="text-white">{previewCandidate.salaryExpectation}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPreviewCandidate(null)}
                  className="border-[#23262B] text-slate-300 hover:bg-[#1A1D21]"
                >
                  Close Preview
                </Button>
                <Button
                  onClick={() => {
                    const id = previewCandidate.id
                    setPreviewCandidate(null)
                    router.push(`/recruiter/candidates/${id}`)
                  }}
                  className="bg-[#3EFFA8] hover:bg-[#2fe090] text-slate-950 font-bold px-6"
                >
                  Open Full Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
