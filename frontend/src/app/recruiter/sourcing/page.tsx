'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Search,
  Users,
  Globe,
  TrendingUp,
  Target,
  Zap,
  Filter,
  Download,
  Star,
  Eye,
  MessageSquare,
  Share,
  Calendar,
  MapPin,
  Building,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone
} from 'lucide-react'

export default function CandidateSourcingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin')

  // Mock data for social media prospects
  const prospects = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'Senior React Developer',
      company: 'TechStart Inc.',
      location: 'San Francisco, CA',
      experience: '6 years',
      skills: ['React', 'TypeScript', 'AWS', 'Docker'],
      hourlyRate: 85,
      availability: 'Available now',
      rating: 4.9,
      projectsCompleted: 47,
      responseTime: '< 1 hour',
      badge: 'Top Rated',
      recentWork: 'Led React migration at Fortune 500 company',
      workStyle: 'Full-time preferred',
      matchScore: 94,
      platform: 'linkedin'
    },
    {
      id: '2',
      name: 'Sarah Kumar',
      title: 'UX Designer',
      company: 'DesignLabs',
      location: 'Austin, TX',
      experience: '5 years',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      hourlyRate: 65,
      availability: 'Available in 2 weeks',
      rating: 4.8,
      projectsCompleted: 32,
      responseTime: '< 2 hours',
      badge: 'Rising Star',
      recentWork: 'Designed mobile app for 1M+ users',
      workStyle: 'Remote preferred',
      matchScore: 92,
      platform: 'linkedin'
    },
    {
      id: '3',
      name: 'David Kim',
      title: 'Data Scientist (ML/NLP)',
      company: 'DataFlow',
      location: 'Seattle, WA',
      experience: '4 years',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS'],
      hourlyRate: 95,
      availability: 'Available now',
      rating: 5.0,
      projectsCompleted: 61,
      responseTime: '< 30 min',
      badge: 'Expert',
      recentWork: 'Built ML models for healthcare tech startup',
      workStyle: 'Flexible',
      matchScore: 94,
      platform: 'linkedin'
    },
    {
      id: '4',
      name: 'Jessica Martinez',
      title: 'DevOps Engineer',
      company: 'CloudOps',
      location: 'Remote',
      experience: '7 years',
      skills: ['Kubernetes', 'Jenkins', 'Terraform', 'AWS', 'Docker'],
      hourlyRate: 90,
      availability: 'Project-based only',
      rating: 4.7,
      projectsCompleted: 89,
      responseTime: '< 3 hours',
      badge: 'Veteran',
      recentWork: 'Cloud migration for $100M revenue company',
      workStyle: 'Contract preferred',
      matchScore: 91,
      platform: 'github'
    },
    {
      id: '5',
      name: 'Marcus Johnson',
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'New York, NY',
      experience: '8 years',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'User Stories', 'Roadmapping'],
      hourlyRate: 120,
      availability: 'Consulting available',
      rating: 4.9,
      projectsCompleted: 156,
      responseTime: '< 1 hour',
      badge: 'Enterprise Expert',
      recentWork: 'Product strategy for marketplace unicorn',
      workStyle: 'Part-time available',
      matchScore: 98,
      platform: 'twitter'
    }
  ]

  const platforms = [
    { key: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5', count: 3247 },
    { key: 'github', name: 'GitHub', icon: Github, color: '#333', count: 892 },
    { key: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2', count: 1456 }
  ]

  const filteredProspects = prospects.filter(prospect =>
    (prospect.platform === selectedPlatform) &&
    (searchQuery === '' ||
     prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     prospect.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     prospect.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Search className="w-8 h-8 text-[#3EFFA8]" />
            Candidate Sourcing
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            AI-powered social media prospecting and talent discovery across LinkedIn, GitHub, and Twitter
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Zap className="w-4 h-4 mr-2" />
            AI Prospects Scan
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3EFFA8]">{platforms.reduce((sum, p) => sum + p.count, 0).toLocaleString()}</div>
            <div className="text-xs text-[#C9CFD6] mt-1">Total Prospects</div>
          </div>
        </Card>
        {platforms.map((platform, i) => (
          <Card key={i} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="text-center">
              <div className={`text-xl font-bold w-8 h-8 rounded flex items-center justify-center mx-auto mb-2`} style={{ backgroundColor: platform.color }}>
                <platform.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-xl font-bold text-[#FFD700]">{platform.count.toLocaleString()}</div>
              <div className="text-xs text-[#C9CFD6]">{platform.name}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Platform Filters */}
        <div className="xl:col-span-1 space-y-4">
          {/* Search */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8F98] w-4 h-4" />
              <Input
                type="text"
                placeholder="Search prospects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] pl-10"
              />
            </div>
          </Card>

          {/* Platform Selection */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Platforms</h3>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <button
                  key={platform.key}
                  onClick={() => setSelectedPlatform(platform.key)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                    selectedPlatform === platform.key
                      ? 'bg-[#3EFFA8] text-black'
                      : 'bg-[#111315] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <platform.icon className={`w-5 h-5 ${selectedPlatform === platform.key ? 'text-black' : ''}`} style={{ color: selectedPlatform !== platform.key ? platform.color : undefined }} />
                  <div className="text-left flex-1">
                    <div className={`font-medium text-sm ${selectedPlatform === platform.key ? 'text-black' : 'text-[#FFFFFF]'}`}>
                      {platform.name}
                    </div>
                    <div className={`text-xs ${selectedPlatform === platform.key ? 'text-black opacity-70' : 'text-[#C9CFD6]'}`}>
                      {platform.count.toLocaleString()} prospects
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Discovery Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#C9CFD6]">High Potential</span>
                <span className="text-[#3EFFA8] font-bold">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#C9CFD6]">Very High Engaged</span>
                <span className="text-[#FFD700] font-bold">346</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#C9CFD6]">AI Recommended</span>
                <span className="text-[#60A5FA] font-bold">892</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Prospects List */}
        <div className="xl:col-span-3">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF]">
                {platforms.find(p => p.key === selectedPlatform)?.name} Prospects
                <span className="text-[#C9CFD6] text-lg ml-2">({filteredProspects.length})</span>
              </h3>
              <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                <Download className="w-4 h-4 mr-2" />
                Export List ({filteredProspects.length})
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProspects.map((prospect) => (
                <Card key={prospect.id} className="bg-[#111315] border border-[#23262B] rounded-xl p-6 hover:border-[#3EFFA8] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {prospect.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-[#FFFFFF] font-bold text-lg">{prospect.name}</h4>
                          <p className="text-[#C9CFD6] text-sm">{prospect.title} • {prospect.experience}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-[#FFD700] fill-current" />
                            <span className="text-[#FFD700] font-medium text-sm">{prospect.rating}</span>
                            <span className="text-[#C9CFD6] text-sm">({prospect.projectsCompleted} completed)</span>
                          </div>
                        </div>

                        <Badge className={`px-2 py-1 text-xs ${
                          prospect.badge === 'Top Rated' ? 'bg-green-900 text-green-300' :
                          prospect.badge === 'Expert' ? 'bg-purple-900 text-purple-300' :
                          prospect.badge === 'Rising Star' ? 'bg-blue-900 text-blue-300' :
                          prospect.badge === 'Enterprise Expert' ? 'bg-orange-900 text-orange-300' :
                          'bg-gray-900 text-gray-300'
                        }`}>
                          {prospect.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {prospect.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {prospect.skills.length > 3 && (
                      <Badge className="bg-[#FFD700] text-black text-xs">
                        +{prospect.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{prospect.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{prospect.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{prospect.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{prospect.workStyle}</span>
                    </div>
                  </div>

                  {/* Recent Work */}
                  <div className="mb-4">
                    <p className="text-[#C9CFD6] text-sm mb-1">Recent Work:</p>
                    <p className="text-[#E2E8F0] text-sm">{prospect.recentWork}</p>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#C9CFD6] text-sm">Match Score: </span>
                      <span className="text-[#3EFFA8] font-bold">{prospect.matchScore}%</span>
                    </div>
                    <div className="w-20 h-2 bg-[#23262B] rounded-full">
                      <div
                        className="h-2 bg-[#3EFFA8] rounded-full"
                        style={{ width: `${prospect.matchScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reach Out
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Platform Indicator */}
                  <div className="mt-4 pt-3 border-t border-[#23262B]">
                    <p className="text-[#8A8F98] text-xs">Sourced from {platforms.find(p => p.key === selectedPlatform)?.name}</p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProspects.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-[#FFFFFF] mb-2">No Prospects Found</h3>
                <p className="text-[#C9CFD6]">
                  Try adjusting your search query or selecting a different platform.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredProspects.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                  Load More Prospects
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
