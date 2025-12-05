'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Users, MessageCircle, Calendar, MapPin, ExternalLink } from 'lucide-react'

export function NetworkingOpportunities() {
  const opportunities = [
    {
      type: 'Conference',
      title: 'React India 2024',
      location: 'Bangalore',
      date: 'March 15, 2024',
      attendees: 500,
      description: 'Largest React developer conference in India with workshops and networking',
      contact: 'Organized by React India Community',
      relevance: 'Perfect for React developers'
    },
    {
      type: 'Meetup',
      title: 'Full Stack Developer Meetup',
      location: 'Online',
      date: 'Every Tuesday',
      attendees: 150,
      description: 'Weekly technical discussions and career advice sessions',
      contact: 'Local developer community',
      relevance: 'Broad networking opportunity'
    },
    {
      type: 'Hackathon',
      title: 'AI/ML Innovation Challenge',
      location: 'Mumbai',
      date: 'April 10-12, 2024',
      attendees: 300,
      description: '48-hour hackathon focused on AI/ML solutions with top prizes',
      contact: 'TechStart & AI Research Group',
      relevance: 'Great for ML engineers'
    },
    {
      type: 'Workshop',
      title: 'System Design Masterclass',
      location: 'Online',
      date: 'March 25, 2024',
      attendees: 80,
      description: 'Advanced system design concepts and interview preparation',
      contact: 'Ex-Google Senior Engineer',
      relevance: 'Essential for senior roles'
    },
    {
      type: 'Career Fair',
      title: 'Tech Recruitment Expo 2024',
      location: 'Hyderabad',
      date: 'April 5, 2024',
      attendees: 800,
      description: 'Direct interaction with hiring managers from 50+ companies',
      contact: 'TalentConnect organized',
      relevance: 'Job seeking focus'
    },
    {
      type: 'Mentorship Program',
      title: 'Women in Tech Mentorship',
      location: 'Online',
      date: 'Ongoing',
      attendees: 'N/A',
      description: '1-on-1 mentorship program for career advancement in tech',
      contact: 'WiT Network',
      relevance: 'Long-term career guidance'
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference': return '🏛️'
      case 'meetup': return '👥'
      case 'hackathon': return '💡'
      case 'workshop': return '🎓'
      case 'career fair': return '💼'
      case 'mentorship program': return '👩‍🏫'
      default: return '📅'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference': return 'text-purple-400 border-purple-400/30'
      case 'meetup': return 'text-blue-400 border-blue-400/30'
      case 'hackathon': return 'text-yellow-400 border-yellow-400/30'
      case 'workshop': return 'text-green-400 border-green-400/30'
      case 'career fair': return 'text-red-400 border-red-400/30'
      case 'mentorship program': return 'text-pink-400 border-pink-400/30'
      default: return 'text-white/70 border-white/30'
    }
  }

  return (
    <GlassCard title="Career Networking Opportunities">
      <div className="space-y-6">
        <div className="text-center">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Grow Your Professional Network</h3>
          <p className="text-white/70 text-sm">
            Connect with industry professionals, attend events, and find mentorship opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.map((opportunity, index) => (
            <div key={opportunity.title} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-400/50 transition-colors">
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl mt-1">{getTypeIcon(opportunity.type)}</span>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-white font-semibold text-sm leading-tight">
                      {opportunity.title}
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(opportunity.type)}`}>
                      {opportunity.type}
                    </span>
                  </div>
                  <div className="text-white/60 text-xs mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {opportunity.date}
                    </div>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {opportunity.location}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-3">{opportunity.description}</p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Attendees:</span>
                  <span className="text-white">{opportunity.attendees}</span>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Organizer:</div>
                  <div className="text-white text-xs">{opportunity.contact}</div>
                </div>
                <div className="text-purple-400 font-medium">
                  ✨ {opportunity.relevance}
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded text-sm font-medium transition-colors">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Connect
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium transition-colors">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Networking Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-green-400 mb-1">85%</div>
                <div className="text-white/70">Jobs found through networking</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400 mb-1">60%</div>
                <div className="text-white/70">Salary increase from connections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400 mb-1">70%</div>
                <div className="text-white/70">Industry insights gained</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-green-400/30">
              <p className="text-white/80 text-sm">
                <strong>Pro Tip:</strong> Attend 1-2 networking events per month to significantly boost
                your career opportunities and stay updated with industry trends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
