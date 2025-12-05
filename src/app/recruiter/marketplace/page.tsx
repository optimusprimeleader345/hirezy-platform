'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Briefcase,
  Calendar,
  Search,
  Filter,
  Plus,
  Zap,
  Award,
  Heart,
  MessageSquare,
  Eye
} from 'lucide-react'

export default function TalentMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock talent profiles
  const talentProfiles = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'Full Stack Engineer',
      experience: '5 years',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
      hourlyRate: 85,
      availability: 'Available now',
      rating: 4.9,
      projectsCompleted: 47,
      responseTime: '< 1 hour',
      badge: 'Top Rated',
      recentWork: 'Led React migration at Fortune 500 company',
      workStyle: 'Full-time preferred',
      matchScore: 96
    },
    {
      id: '2',
      name: 'Sarah Kumar',
      title: 'UX/UI Designer',
      experience: '4 years',
      location: 'Austin, TX',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      hourlyRate: 65,
      availability: 'Available in 2 weeks',
      rating: 4.8,
      projectsCompleted: 32,
      responseTime: '< 2 hours',
      badge: 'Rising Star',
      recentWork: 'Designed mobile app for 1M+ users',
      workStyle: 'Remote preferred',
      matchScore: 92
    },
    {
      id: '3',
      name: 'David Kim',
      title: 'Data Scientist (ML/NLP)',
      experience: '6 years',
      location: 'Seattle, WA',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'AWS'],
      hourlyRate: 95,
      availability: 'Available now',
      rating: 5.0,
      projectsCompleted: 61,
      responseTime: '< 30 min',
      badge: 'Expert',
      recentWork: 'Built ML models for healthcare tech startup',
      workStyle: 'Flexible',
      matchScore: 94
    },
    {
      id: '4',
      name: 'Emma Rodriguez',
      title: 'DevOps Engineer',
      experience: '7 years',
      location: 'Remote',
      skills: ['Kubernetes', 'Jenkins', 'Terraform', 'AWS', 'Docker'],
      hourlyRate: 90,
      availability: 'Project-based only',
      rating: 4.7,
      projectsCompleted: 89,
      responseTime: '< 3 hours',
      badge: 'Veteran',
      recentWork: 'Cloud migration for $100M revenue company',
      workStyle: 'Contract preferred',
      matchScore: 91
    },
    {
      id: '5',
      name: 'Marcus Johnson',
      title: 'Product Manager',
      experience: '8 years',
      location: 'New York, NY',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'User Stories', 'Roadmapping'],
      hourlyRate: 120,
      availability: 'Consulting available',
      rating: 4.9,
      projectsCompleted: 156,
      responseTime: '< 1 hour',
      badge: 'Enterprise Expert',
      recentWork: 'Product strategy for marketplace unicorn',
      workStyle: 'Part-time available',
      matchScore: 98
    },
    {
      id: '6',
      name: 'Olivia Chen',
      title: 'Marketing Manager',
      experience: '5 years',
      location: 'Los Angeles, CA',
      skills: ['SEO', 'Content Marketing', 'Social Media', 'Paid Ads', 'Analytics'],
      hourlyRate: 75,
      availability: 'Available now',
      rating: 4.6,
      projectsCompleted: 28,
      responseTime: '< 4 hours',
      badge: 'Marketing Pro',
      recentWork: 'Grew startup from 5K to 100K followers',
      workStyle: 'Remote preferred',
      matchScore: 87
    }
  ]

  // Mock project opportunities
  const projectOpportunities = [
    {
      id: 'p1',
      title: 'E-Commerce Platform Redesign',
      budget: '$50K - $75K',
      duration: '3-4 months',
      type: 'Full-time hire conversion',
      skills: ['React', 'Node.js', 'Stripe API', 'UI/UX'],
      employer: 'TechStart Inc.',
      posted: '2 days ago'
    },
    {
      id: 'p2',
      title: 'ML Model Development for Healthcare',
      budget: '$80K - $120K',
      duration: '4-6 months',
      type: 'Project-based with conversion option',
      skills: ['Python', 'TensorFlow', 'NLP', 'AWS'],
      employer: 'MediTech Solutions',
      posted: '1 week ago'
    },
    {
      id: 'p3',
      title: 'Mobile App Development',
      budget: '$60K - $90K',
      duration: '3 months',
      type: 'Contract to hire',
      skills: ['React Native', 'iOS', 'Android', 'Firebase'],
      employer: 'FitLife Apps',
      posted: '3 days ago'
    }
  ]

  const categories = [
    { key: 'all', label: 'All Talent', count: talentProfiles.length },
    { key: 'engineering', label: 'Engineering', count: talentProfiles.filter(t => t.title.includes('Engineer')).length },
    { key: 'design', label: 'Design', count: 1 },
    { key: 'data', label: 'Data Science', count: 1 },
    { key: 'product', label: 'Product', count: 1 },
    { key: 'marketing', label: 'Marketing', count: 1 }
  ]

  const filteredTalent = talentProfiles.filter(talent =>
    (selectedCategory === 'all' ||
     (selectedCategory === 'engineering' && talent.title.includes('Engineer')) ||
     (selectedCategory === 'design' && talent.title.includes('Designer')) ||
     (selectedCategory === 'data' && talent.title.includes('Data')) ||
     (selectedCategory === 'product' && talent.title.includes('Product')) ||
     (selectedCategory === 'marketing' && talent.title.includes('Marketing'))) &&
    (searchQuery === '' ||
     talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-[#3EFFA8]" />
            Talent Marketplace
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Project-based hiring and freelancer-to-employee conversion platform
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Post Project
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <TrendingUp className="w-4 h-4 mr-2" />
            Marketplace Analytics
          </Button>
        </div>
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-[#3EFFA8]" />
            <span className="text-[#C9CFD6] text-sm">Active Talent</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{talentProfiles.length.toLocaleString()}</div>
          <p className="text-[#8A8F98] text-xs">+15% this month</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-[#60A5FA]" />
            <span className="text-[#C9CFD6] text-sm">Projects Posted</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">127</div>
          <p className="text-[#8A8F98] text-xs">+23% this month</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-[#F59E0B]" />
            <span className="text-[#C9CFD6] text-sm">Average Rate</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">$78</div>
          <p className="text-[#8A8F98] text-xs">Per hour</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-6 h-6 text-[#EF4444]" />
            <span className="text-[#C9CFD6] text-sm">Conversions</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">23</div>
          <p className="text-[#8A8F98] text-xs">Contract to hire</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="xl:col-span-1 space-y-4">
          {/* Search */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8F98] w-4 h-4" />
              <Input
                type="text"
                placeholder="Search talent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] pl-10"
              />
            </div>
          </Card>

          {/* Categories */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`w-full p-3 rounded-lg flex items-center justify-between transition-all ${
                    selectedCategory === category.key
                      ? 'bg-[#3EFFA8] text-black'
                      : 'bg-[#111315] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <span className={selectedCategory === category.key ? 'text-black' : 'text-[#FFFFFF]'}>
                    {category.label}
                  </span>
                  <span className={`text-sm ${selectedCategory === category.key ? 'text-black' : 'text-[#C9CFD6]'}`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          {/* Featured Projects */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Featured Projects</h3>
            <div className="space-y-3">
              {projectOpportunities.slice(0, 2).map((project, i) => (
                <div key={project.id} className="bg-[#111315] rounded-lg p-3 border border-[#23262B]">
                  <h4 className="text-[#FFFFFF] font-medium text-sm mb-2">{project.title}</h4>
                  <div className="space-y-1">
                    <p className="text-[#3EFFA8] font-bold text-xs">{project.budget}</p>
                    <p className="text-[#C9CFD6] text-xs">{project.duration}</p>
                    <p className="text-[#8A8F98] text-xs">{project.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Talent Gallery */}
        <div className="xl:col-span-3">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#FFFFFF]">
                {selectedCategory === 'all' ? 'All Available Talent' : categories.find(c => c.key === selectedCategory)?.label}
                <span className="text-[#C9CFD6] text-lg ml-2">({filteredTalent.length})</span>
              </h3>
              <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTalent.map((talent) => (
                <Card key={talent.id} className="bg-[#111315] border border-[#23262B] rounded-xl p-6 hover:border-[#3EFFA8] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {talent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-[#FFFFFF] font-bold text-lg mb-1">{talent.name}</h4>
                          <p className="text-[#C9CFD6] text-sm">{talent.title} • {talent.experience}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-4 h-4 text-[#FFD700] fill-current" />
                            <span className="text-[#FFD700] font-medium text-sm">{talent.rating}</span>
                            <span className="text-[#C9CFD6] text-sm">({talent.projectsCompleted} projects)</span>
                          </div>
                        </div>
                        <Badge className={`px-2 py-1 text-xs ${
                          talent.badge === 'Top Rated' ? 'bg-green-900 text-green-300' :
                          talent.badge === 'Expert' ? 'bg-purple-900 text-purple-300' :
                          talent.badge === 'Rising Star' ? 'bg-blue-900 text-blue-300' :
                          talent.badge === 'Enterprise Expert' ? 'bg-orange-900 text-orange-300' :
                          'bg-gray-900 text-gray-300'
                        }`}>
                          {talent.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {talent.skills.slice(0, 3).map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {talent.skills.length > 3 && (
                      <Badge className="bg-[#FFD700] text-black text-xs">
                        +{talent.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{talent.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{talent.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">${talent.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#C9CFD6]" />
                      <span className="text-[#E2E8F0]">{talent.responseTime}</span>
                    </div>
                  </div>

                  {/* Recent Work */}
                  <div className="mb-4">
                    <p className="text-[#C9CFD6] text-sm mb-1">Recent Work:</p>
                    <p className="text-[#E2E8F0] text-sm">{talent.recentWork}</p>
                  </div>

                  {/* Work Preferences */}
                  <div className="mb-4">
                    <p className="text-[#C9CFD6] text-sm">Work Style: <span className="text-[#3EFFA8]">{talent.workStyle}</span></p>
                  </div>

                  {/* Match Score */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[#C9CFD6] text-sm">Match Score: </span>
                      <span className="text-[#3EFFA8] font-bold">{talent.matchScore}%</span>
                    </div>
                    <div className="w-20 h-2 bg-[#23262B] rounded-full">
                      <div
                        className="h-2 bg-[#3EFFA8] rounded-full"
                        style={{ width: `${talent.matchScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
                      <Eye className="w-4 h-4 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Convertible to Employee */}
                  {talent.workStyle.includes('Full-time') || talent.experience.includes('5+') && (
                    <div className="mt-3 p-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg">
                      <p className="text-[#FFD700] text-xs font-medium">🚀 Candidate of Interest for Full-time Hire</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {filteredTalent.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium text-[#FFFFFF] mb-2">No Talent Found</h3>
                <p className="text-[#C9CFD6]">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}

            {/* Load More */}
            {filteredTalent.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                  Load More Talent
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
