'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { BookOpen, ArrowRight, Target } from 'lucide-react'

interface Props {
  analysis: {
    prioritySkills: string[]
  }
}

export function PriorityRoadmap({ analysis }: Props) {
  const roadmapSteps = [
    {
      title: "Focus on Priority Skills First",
      description: "Start with the highest-impact skills that are currently missing from your profile.",
      skills: analysis.prioritySkills,
      duration: "2-4 weeks"
    },
    {
      title: "Build Practical Projects",
      description: "Create portfolio projects that showcase your new skills and demonstrate real-world application.",
      skills: ["GitHub Project", "Live Demo", "Code Review"],
      duration: "4-6 weeks"
    },
    {
      title: "Verify & Measure Progress",
      description: "Test your new skills through assessments and measure improvement in job matching scores.",
      skills: ["Skill Assessment", "Job Matching", "Feedback Review"],
      duration: "1-2 weeks"
    },
    {
      title: "Advanced Specialization",
      description: "Deep dive into specific technologies and frameworks once you have the fundamentals.",
      skills: ["Advanced Frameworks", "Master Classes", "Industry Certification"],
      duration: "3-6 months"
    }
  ]

  return (
    <GlassCard title="Priority Learning Roadmap">
      <div className="space-y-6">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Your Personalized Learning Path</h3>
          <p className="text-white/70 text-sm">
            Follow this structured roadmap to systematically bridge your skill gaps and advance your career.
          </p>
        </div>

        <div className="space-y-4">
          {roadmapSteps.map((step, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600/20 border border-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 font-bold">{index + 1}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold">{step.title}</h4>
                    <span className="text-purple-400 text-sm font-medium">
                      {step.duration}
                    </span>
                  </div>

                  <p className="text-white/70 text-sm mb-3">{step.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {step.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button className="text-purple-400 text-sm hover:underline flex items-center">
                    <Target className="w-3 h-3 mr-1" />
                    View Detailed Plan
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/10">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
            🔄 Regenerate Learning Plan
          </button>
        </div>
      </div>
    </GlassCard>
  )
}
