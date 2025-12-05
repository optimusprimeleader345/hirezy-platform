'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Book, Play, ExternalLink, Star, Clock } from 'lucide-react'

interface LearningResource {
  title: string
  platform: string
  type: 'course' | 'tutorial' | 'certificate' | 'book'
  skill: string
  duration: string
  rating: number
  students: string
  cost: string
  url: string
}

export function LearningResourcesRecommender() {
  const resources: LearningResource[] = [
    {
      title: 'Advanced React Development',
      platform: 'Udemy',
      type: 'course',
      skill: 'React',
      duration: '22 hours',
      rating: 4.7,
      students: '150K',
      cost: '$89',
      url: '#'
    },
    {
      title: 'AWS Certified Developer Associate',
      platform: 'Coursera (Amazon Authorized)',
      type: 'certificate',
      skill: 'AWS',
      duration: '6 months',
      rating: 4.8,
      students: '250K',
      cost: '$49/month',
      url: '#'
    },
    {
      title: 'Docker & Kubernetes Fundamentals',
      platform: 'A Cloud Guru',
      type: 'course',
      skill: 'Docker',
      duration: '8 hours',
      rating: 4.9,
      students: '80K',
      cost: '$199',
      url: '#'
    },
    {
      title: 'System Design Interview Guide',
      platform: 'LearnIn',
      type: 'book',
      skill: 'System Design',
      duration: 'N/A',
      rating: 4.6,
      students: '15K',
      cost: '$29',
      url: '#'
    },
    {
      title: 'TypeScript Advanced Patterns',
      platform: 'freeCodeCamp',
      type: 'tutorial',
      skill: 'TypeScript',
      duration: '3 hours',
      rating: 4.8,
      students: '500K',
      cost: 'Free',
      url: '#'
    },
    {
      title: 'Python for Data Science',
      platform: 'DataCamp',
      type: 'course',
      skill: 'Python',
      duration: '25 hours',
      rating: 4.5,
      students: '300K',
      cost: '$25/month',
      url: '#'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <Play className="w-4 h-4" />
      case 'certificate': return <Star className="w-4 h-4" />
      case 'tutorial': return <Clock className="w-4 h-4" />
      case 'book': return <Book className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'text-blue-400 border-blue-400/30'
      case 'certificate': return 'text-green-400 border-green-400/30'
      case 'tutorial': return 'text-purple-400 border-purple-400/30'
      case 'book': return 'text-yellow-400 border-yellow-400/30'
      default: return 'text-white/70 border-white/30'
    }
  }

  const getPlatformColor = (platform: string) => {
    if (platform.includes('Udemy')) return 'bg-red-500/20 text-red-400'
    if (platform.includes('Coursera')) return 'bg-blue-500/20 text-blue-400'
    if (platform.includes('freeCodeCamp')) return 'bg-green-500/20 text-green-400'
    if (platform.includes('DataCamp')) return 'bg-purple-500/20 text-purple-400'
    return 'bg-white/20 text-white/70'
  }

  return (
    <GlassCard title="Recommended Learning Resources">
      <div className="space-y-6">
        <div className="text-center">
          <Book className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Curated Learning Paths</h3>
          <p className="text-white/70 text-sm">
            Hand-picked courses, tutorials, and resources tailored to your skill gaps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => (
            <div key={resource.title} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-400/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-1 leading-tight">
                    {resource.title}
                  </h4>
                  <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(resource.platform)}`}>
                    <span className="mr-1">🏢</span>
                    {resource.platform.split(' ')[0]}
                  </div>
                </div>

                <div className={`flex items-center px-2 py-1 rounded text-xs font-medium border ml-2 ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Target Skill:</span>
                  <span className="text-purple-400 font-medium">{resource.skill}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-yellow-400 mr-1">{resource.rating}</span>
                    <span className="text-white/70">({resource.students} learners)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-white/70 mr-1" />
                    <span className="text-white/70">{resource.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/70">Cost:</span>
                  <span className={`font-semibold ${resource.cost === 'Free' ? 'text-green-400' : 'text-white'}`}>
                    {resource.cost}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10">
                <button className="w-full flex items-center justify-center px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-sm font-medium transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Learning Platforms Partnership</h4>
            <p className="text-white/70 text-sm mb-4">
              Access premium courses at discounted rates through our partnerships
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="flex items-center justify-center">
                <span className="text-red-400 font-semibold text-sm">Udemy</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-blue-400 font-semibold text-sm">Coursera</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-green-400 font-semibold text-sm">freeCodeCamp</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-purple-400 font-semibold text-sm">DataCamp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
