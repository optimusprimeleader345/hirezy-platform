'use client'

import { GlassCard } from '@/components/cards/GlassCard'
import { Folder, ExternalLink, Code } from 'lucide-react'

interface PortfolioSuggestion {
  title: string
  description: string
  techStack: string[]
  difficulty: string
  impact: string
}

interface Props {
  resumeText: string
}

export function PortfolioSuggestions({ resumeText }: Props) {
  const suggestions: PortfolioSuggestion[] = [
    {
      title: "AI-Powered Task Management App",
      description: "Build a React app with AI task prioritization using machine learning algorithms",
      techStack: ["React", "Python", "TensorFlow", "Node.js"],
      difficulty: "Advanced",
      impact: "High"
    },
    {
      title: "Real-Time Collaboration Platform",
      description: "Create a WebSocket-based platform for remote team collaboration with video and text",
      techStack: ["Next.js", "Socket.io", "MongoDB", "WebRTC"],
      difficulty: "Intermediate",
      impact: "High"
    },
    {
      title: "E-commerce Analytics Dashboard",
      description: "Build a comprehensive analytics dashboard for e-commerce platforms with data visualization",
      techStack: ["React", "D3.js", "Node.js", "PostgreSQL"],
      difficulty: "Intermediate",
      impact: "Medium"
    },
    {
      title: "Mobile Health Tracker",
      description: "Develop a React Native app for tracking fitness goals and nutrition with ML recommendations",
      techStack: ["React Native", "Firebase", "TensorFlow Lite"],
      difficulty: "Advanced",
      impact: "High"
    },
    {
      title: "Open Source CLI Tool",
      description: "Create a command-line tool that automates common development tasks with scripting",
      techStack: ["Node.js", "Commander.js", "GitHub API"],
      difficulty: "Beginner",
      impact: "Medium"
    },
    {
      title: "Blockchain Voting System",
      description: "Implement a secure voting system using blockchain technology with smart contracts",
      techStack: ["Solidity", "Web3.js", "React", "Ethereum"],
      difficulty: "Advanced",
      impact: "High"
    }
  ]

  return (
    <GlassCard title="Portfolio Project Suggestions">
      <div className="space-y-6">
        <div className="text-center py-6">
          <Folder className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h3 className="text-xl font-bold text-white mb-2">Build Your Dream Portfolio</h3>
          <p className="text-white/70">Custom project suggestions based on your skills and market trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((project, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-purple-400/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-white font-semibold text-sm">{project.title}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-1 rounded ${
                    project.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                    project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    project.impact === 'High' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {project.impact} Impact
                  </span>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.techStack.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <button className="text-purple-400 text-sm hover:underline flex items-center">
                  <Code className="w-3 h-3 mr-1" />
                  View Details
                </button>
                <button className="text-green-400 text-sm hover:underline flex items-center">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Start Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
