'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Star, ArrowUp, MapPin, Briefcase } from 'lucide-react'

export function SuccessStories() {
  const stories = [
    {
      name: 'Sarah Khan',
      role: 'Senior Frontend Developer',
      company: 'Google',
      salary: '28 LPA',
      journey: 'QA Engineer → Frontend Developer → Senior Developer',
      duration: '4 years',
      uniquePath: 'Self-taught with no CS degree through bootcamps and projects',
      advice: 'Never underestimate the power of personal projects and persistence.',
      skills: ['JavaScript', 'React', 'TypeScript', 'System Design']
    },
    {
      name: 'Ravi Sharma',
      role: 'Technical Lead',
      company: 'Microsoft',
      salary: '35 LPA',
      journey: 'Junior Developer → Mid Developer → Senior → Tech Lead',
      duration: '8 years',
      uniquePath: 'Started with small startup, built comprehensive architectural knowledge',
      advice: 'Focus on understanding why decisions are made, not just what gets built.',
      skills: ['.Net', 'Azure', 'Microservices', 'Leadership']
    },
    {
      name: 'Priya Patel',
      role: 'ML Engineering Manager',
      company: 'Meta',
      salary: '45 LPA',
      journey: 'Data Analyst → ML Engineer → Senior ML Engineer → Manager',
      duration: '7 years',
      uniquePath: 'Transitioned from data analysis to ML through self-learning and research',
      advice: 'Papers, then implementations, then production systems. Study fundamentals.',
      skills: ['Python', 'TensorFlow', 'MLOps', 'Team Leadership']
    },
    {
      name: 'Arun Kumar',
      role: 'Staff Engineer',
      company: 'Netflix',
      salary: '55 LPA',
      journey: 'Startup → Scale-up → FAANG transition through internal résignations',
      duration: '10 years',
      uniquePath: 'Built expertise in complex distributed systems at scale companies',
      advice: 'Deep system understanding trumps broad framework knowledge.',
      skills: ['Distributed Systems', 'Go', 'Kubernetes', 'Leadership']
    },
    {
      name: 'Meera Singh',
      role: 'VP Engineering',
      company: 'Stripe',
      salary: '75 LPA',
      journey: 'Individual → Team Lead → Director → VP over 12 years',
      duration: '12 years',
      uniquePath: 'Unfortunate layoffs taught resilience and methodical career progression',
      advice: 'Market downturns highlight serious companies. Use them strategically.',
      skills: ['Leadership', 'System Design', 'Recruiting', 'Strategy']
    },
    {
      name: 'Vikram Rao',
      role: 'Principal Architect',
      company: 'Uber',
      salary: '68 LPA',
      journey: 'Backend → Fullstack → Solutions → Architecture',
      duration: '9 years',
      uniquePath: 'Changed companies every 2-3 years to accelerate learning curve',
      advice: 'Map business domain deeper than anyone else on your team.',
      skills: ['System Architecture', 'Node.js', 'Databases', 'Business Acumen']
    }
  ]

  return (
    <GlassCard title="Success Stories & Career Trajectories">
      <div className="space-y-6">
        <div className="text-center">
          <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Real Career Journeys</h3>
          <p className="text-white/70 text-sm">
            Inspirational stories from professionals who've successfully navigated their career paths
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <div key={story.name} className="bg-gradient-to-r from-purple-500/5 to-blue-500/5 border border-purple-400/30 rounded-lg p-4 hover:border-purple-400/50 transition-colors">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg">{story.name}</h4>
                  <div className="text-purple-400 font-medium">{story.role}</div>
                  <div className="flex items-center text-white/60 text-sm">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {story.company} • {story.salary}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-white font-semibold text-sm mb-2 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1 text-green-400" />
                    Career Journey ({story.duration})
                  </div>
                  <p className="text-white/80 text-sm">{story.journey}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm mb-1">Unique Path</h5>
                  <p className="text-white/70 text-sm">💡 {story.uniquePath}</p>
                </div>

                <div className="bg-white/5 rounded-lg p-3">
                  <h5 className="text-white font-medium text-sm mb-1">Key Advice</h5>
                  <p className="text-white/70 text-sm italic">"{story.advice}"</p>
                </div>

                <div>
                  <div className="text-white/60 text-xs mb-2">Critical Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {story.skills.map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white/90 rounded text-xs border border-purple-400/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Key Insights from Success Stories</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">4.5-12</div>
                <div className="text-white/70">Typical career progression years</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400 mb-1">35%</div>
                <div className="text-white/70">Companies changed for growth</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400 mb-1">85%</div>
                <div className="text-white/70">Emphasized deep specialization</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-yellow-400/30">
              <p className="text-white/80 text-sm">
                <strong>Common Themes:</strong> These leaders consistently invested in deep technical knowledge,
                sought challenges regularly, and focused on business impact rather than just writing code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
