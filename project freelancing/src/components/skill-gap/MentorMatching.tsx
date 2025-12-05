'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { User, Users, Star, MessageCircle, ExternalLink } from 'lucide-react'

interface MentorData {
  name: string
  role: string
  company: string
  experience: string
  skills: string[]
  rating: number
  availability: string
  matchedSkills: number
}

export function MentorMatching() {
  const mentors: MentorData[] = [
    {
      name: 'Sarah Chen',
      role: 'Senior Full Stack Developer',
      company: 'Google',
      experience: '8 years',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Python'],
      rating: 4.9,
      availability: 'Available',
      matchedSkills: 4
    },
    {
      name: 'Mike Rodriguez',
      role: 'DevOps Architect',
      company: 'Netflix',
      experience: '10 years',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      rating: 4.8,
      availability: 'Limited',
      matchedSkills: 3
    },
    {
      name: 'Priya Sharma',
      role: 'Data Science Lead',
      company: 'Meta',
      experience: '7 years',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'AWS'],
      rating: 4.7,
      availability: 'Available',
      matchedSkills: 2
    },
    {
      name: 'James Wilson',
      role: 'Senior Cloud Architect',
      company: 'Amazon',
      experience: '12 years',
      skills: ['AWS', 'Cloud Architecture', 'Kubernetes', 'Terraform', 'Python'],
      rating: 5.0,
      availability: 'Weekly',
      matchedSkills: 3
    },
    {
      name: 'Elena Kim',
      role: 'Mobile Development Manager',
      company: 'Spotify',
      experience: '9 years',
      skills: ['React Native', 'iOS', 'Android', 'JavaScript', 'TypeScript'],
      rating: 4.6,
      availability: 'Monthly',
      matchedSkills: 2
    },
    {
      name: 'David Kumar',
      role: 'VP of Engineering',
      company: 'Stripe',
      experience: '15 years',
      skills: ['System Design', 'Leadership', 'Python', 'Node.js', 'Postgres'],
      rating: 4.9,
      availability: 'Limited',
      matchedSkills: 3
    }
  ]

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'text-green-400 border-green-400/30'
      case 'Limited': return 'text-yellow-400 border-yellow-400/30'
      case 'Weekly': return 'text-blue-400 border-blue-400/30'
      case 'Monthly': return 'text-purple-400 border-purple-400/30'
      default: return 'text-white/70 border-white/30'
    }
  }

  return (
    <GlassCard title="Mentor Matching">
      <div className="space-y-6">
        <div className="text-center">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Connect with Industry Experts</h3>
          <p className="text-white/70 text-sm">
            Get personalized guidance from senior professionals who have walked similar career paths
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-white font-semibold">Skill Match Algorithm</span>
            </div>
            <span className="text-white/70 text-sm">{mentors.length} mentors available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mentors.map((mentor, index) => (
            <div key={mentor.name} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-400/50 transition-colors">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold">{mentor.name}</h4>
                  <div className="text-white/70 text-sm">{mentor.role}</div>
                  <div className="text-white/60 text-sm">{mentor.company}</div>
                </div>

                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getAvailabilityColor(mentor.availability)}`}>
                    {mentor.availability}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white font-semibold">{mentor.rating}</span>
                  </div>
                  <span className="text-white/70 text-sm">{mentor.experience} experience</span>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded p-2">
                  <div className="text-green-400 text-sm font-medium mb-1">
                    {mentor.matchedSkills} skill matches found
                  </div>
                  <div className="text-white/70 text-xs">
                    Perfect alignment with your learning goals
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-sm font-medium transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Connect
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium transition-colors">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">How Mentor Matching Works</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div className="text-white/70">AI matches you with mentors based on your skills and goals</div>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-400 font-bold">2</span>
                </div>
                <div className="text-white/70">Schedule 1:1 calls or send questions through our platform</div>
              </div>
              <div>
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-400 font-bold">3</span>
                </div>
                <div className="text-white/70">Get personalized career advice and skill guidance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
