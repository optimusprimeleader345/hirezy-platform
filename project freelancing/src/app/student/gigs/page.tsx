import Link from 'next/link'
import { Suspense } from 'react'
import { Search, Filter, ChevronRight, MapPin, Clock, DollarSign } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { getTrendingCategories } from '@/lib/gigs/mockData'

async function getInitialGigs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/gigs/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: '',
        page: 1,
        pageSize: 12,
        filters: {}
      })
    })

    if (!response.ok) throw new Error('Failed to fetch gigs')

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to load gigs:', error)
    return {
      gigs: [],
      totalCount: 0,
      page: 1,
      totalPages: 0,
      filters: {}
    }
  }
}

export default async function StudentGigsPage() {
  const initialData = await getInitialGigs()
  const trendingCategories = getTrendingCategories()

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">Gig</span>
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Discover opportunities that match your skills with AI-powered matching.
            Get competitive insights, success predictions, and proposal optimization.
          </p>

          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="Search gigs by skills, company, role..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-white mb-1">{initialData.totalCount}+</div>
          <div className="text-white/70 text-sm">Active Gigs</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-green-400 mb-1">94%</div>
          <div className="text-white/70 text-sm">Success Rate</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-blue-400 mb-1">$75K</div>
          <div className="text-white/70 text-sm">Avg Salary</div>
        </GlassCard>
        <GlassCard className="text-center p-4">
          <div className="text-2xl font-bold text-purple-400 mb-1">10+</div>
          <div className="text-white/70 text-sm">Categories</div>
        </GlassCard>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <GlassCard title="Filters">
            <div className="space-y-4">
              {/* Remote Work */}
              <div>
                <label className="text-white font-medium text-sm mb-2 block">Work Type</label>
                <div className="space-y-2">
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Remote
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Hybrid
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" />
                    On-site
                  </label>
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <label className="text-white font-medium text-sm mb-2 block">Salary Range</label>
                <div className="space-y-2">
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="radio" name="salary" className="mr-2" />
                    $50K - $80K
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="radio" name="salary" className="mr-2" defaultChecked />
                    $80K - $120K
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="radio" name="salary" className="mr-2" />
                    $120K+
                  </label>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-white font-medium text-sm mb-2 block">Experience Level</label>
                <div className="space-y-2">
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" />
                    Entry Level
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Mid-Level
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Senior
                  </label>
                  <label className="flex items-center text-white/70 text-sm">
                    <input type="checkbox" className="mr-2" />
                    Lead/Principal
                  </label>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-white font-medium text-sm mb-2 block">Key Skills</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'PostgreSQL'].map(skill => (
                    <label key={skill} className="flex items-center text-white/70 text-xs">
                      <input type="checkbox" className="mr-2" />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Trending Categories */}
          <GlassCard title="Trending Categories">
            <div className="space-y-3">
              {trendingCategories.map(category => (
                <div key={category.name} className="flex items-center justify-between p-2 bg-white/5 rounded">
                  <span className="text-white/80 text-sm">{category.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400 text-xs">{category.count}</span>
                    <span className="text-green-400 text-xs">+{category.trending}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Featured Gigs */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Featured Gigs</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white/10 text-white text-sm rounded">Best Match</button>
                <button className="px-3 py-1 bg-white/10 text-white/60 text-sm rounded hover:bg-white/10 hover:text-white">Newest</button>
                <button className="px-3 py-1 bg-white/10 text-white/60 text-sm rounded hover:bg-white/10 hover:text-white">Salary</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialData.gigs.slice(0, 6).map((gig: any) => (
                <Link key={gig.id} href={`/gigs/${gig.id}`}>
                  <GlassCard className="hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{gig.title}</h3>
                          <p className="text-white/70 text-sm">{gig.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-400 font-semibold">{gig.salary}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            gig.matchScore && gig.matchScore >= 85 ? 'bg-green-500/20 text-green-400' :
                            gig.matchScore && gig.matchScore >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {gig.matchScore}% match
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {gig.skills.slice(0, 3).map((skill: string) => (
                          <span key={skill} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                        {gig.skills.length > 3 && (
                          <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded">
                            +{gig.skills.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-white/60 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {gig.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {gig.postedAt}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          gig.type === 'Remote' ? 'bg-green-500/20 text-green-400' :
                          gig.type === 'Hybrid' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {gig.type}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </section>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            <button className="px-3 py-2 bg-white/10 text-white rounded border border-white/20 hover:bg-white/20">1</button>
            <button className="px-3 py-2 bg-white/10 text-white/60 rounded border border-white/20 hover:bg-white/20">2</button>
            <button className="px-3 py-2 bg-white/10 text-white/60 rounded border border-white/20 hover:bg-white/20">3</button>
            <button className="px-3 py-2 bg-white/10 text-white/60 rounded border border-white/20 flex items-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* CTA Section */}
          <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
            <div className="text-center py-6">
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Job Matching</h3>
              <p className="text-white/70 mb-4">
                Our advanced AI analyzes thousands of opportunities to find the perfect match for your skills and career goals.
              </p>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                View AI Recommendations <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
