import { Briefcase, MapPin, Calendar, Bookmark, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GigCardProps {
  gig: {
    id: number
    title: string
    company: string
    salary: string
    skills: string[]
    location: string
    postedDate: string
    description: string
  }
  className?: string
}

export function GigCard({ gig, className }: GigCardProps) {
  return (
    <div className={cn('glass-card neon-glow-purple rounded-xl p-6 hover:scale-[1.02] transition-all duration-200', className)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{gig.title}</h3>
          <p className="text-sm text-white/70">{gig.company}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gradient">{gig.salary}</p>
        </div>
      </div>

      <p className="text-white/80 mb-4 line-clamp-2">{gig.description}</p>

      <div className="flex items-center justify-between text-sm text-white/70 mb-4">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {gig.location}
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {gig.postedDate}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {gig.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs border border-white/20">
            {skill}
          </span>
        ))}
        {gig.skills.length > 3 && (
          <span className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-xs">
            +{gig.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        <Button className="flex-1 glass-card neon-glow bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all duration-200 border-0">
          <Send className="h-4 w-4 mr-2" />
          Apply Now
        </Button>
        <Button variant="outline" size="icon" className="glass-card border-white/20 text-white/70 hover:neon-glow hover:text-white">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
