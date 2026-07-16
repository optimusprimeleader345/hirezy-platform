import { Briefcase, Brain, Target, ChevronRight, Zap } from 'lucide-react'
import { AnalyticsCard } from './AnalyticsCard'

const recommendations = {
  gigs: [
    { title: 'Senior React Developer - TechCo', company: 'TechCo Inc.' }
  ],
  skills: [
    { title: 'Advanced TypeScript', status: 'High Demand' }
  ],
  tips: [
    { title: 'Build portfolio website', desc: 'Showcase effectively' }
  ]
}

export function AIRecommendationFeed() {
  return (
    <AnalyticsCard title="AI Recommended for You">
      <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-cyan-300 z-10">
        <Zap className="w-3 h-3" />
        Powered by Hirezy AI
      </div>
      <div className="space-y-6">
        {/* Recommended Gigs */}
        <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-blue-400" />
            Recommended Gigs
          </h4>
          <div className="space-y-2">
            {recommendations.gigs.map((gig, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">{gig.title}</p>
                  <p className="text-xs text-gray-300">{gig.company}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Skills */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <Brain className="w-4 h-4 mr-2 text-green-400" />
            Recommended Skills
          </h4>
          <div className="space-y-2">
            {recommendations.skills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">{skill.title}</p>
                  <p className="text-xs text-green-300">{skill.status}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Improvement Tips */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-purple-400" />
            Improvement Tips
          </h4>
          <div className="space-y-2">
            {recommendations.tips.map((tip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-white">{tip.title}</p>
                  <p className="text-xs text-gray-300">{tip.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnalyticsCard>
  )
}
