'use client'

import { Suspense, useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Briefcase, Zap, BookOpen, Trophy, Grid3X3, FileText, Download, Sparkles } from 'lucide-react'

export default function PortfolioAIPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)

  const handleProjectAdd = (project: any) => {
    setProjects([...projects, { ...project, id: Date.now() }])
  }

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setShowModal(false)
  }

  return (
    <div className="min-h-screen space-y-8">
      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Briefcase className="w-16 h-16 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio Builder AI
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto mb-8">
            Build a stunning, professional portfolio with AI-powered descriptions,
            README improvements, strength assessment, and project suggestions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-white">AI Description Generator</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Trophy className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-white">Portfolio Scoring</span>
            </div>
            <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Grid3X3 className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-white">Visual Portfolio Grid</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Portfolio Input - Placeholder */}
      <GlassCard>
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-white mb-4">Portfolio Input Section</h3>
          <p className="text-white/70 mb-6">Add project name, skills, and upload README...</p>
          <button
            onClick={() => handleProjectAdd({
              name: `Sample Project ${projects.length + 1}`,
              description: 'Sample project description',
              techStack: ['React', 'Node.js', 'MongoDB']
            })}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700"
          >
            Add Sample Project
          </button>
        </div>
      </GlassCard>

      {/* Analysis & Tools Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* AI Project Description Generator */}
          <GlassCard title="AI Description Generator">
            <div className="text-center py-8">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Generate Project Descriptions</h3>
              <p className="text-white/70 text-sm">Input project details and let AI craft compelling descriptions</p>
            </div>
          </GlassCard>

          {/* Portfolio Strength Score */}
          <GlassCard title="Portfolio Strength Score">
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Portfolio Analysis</h3>
              <p className="text-white/70 text-sm">Get detailed scoring and improvement recommendations</p>
              <div className="mt-4">
                <div className={`text-3xl font-bold ${projects.length > 2 ? 'text-green-400' :
                                                      projects.length > 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {projects.length}
                </div>
                <div className="text-white/60 text-xs">Projects Added</div>
              </div>
            </div>
          </GlassCard>

          {/* Suggested Projects */}
          <GlassCard title="AI Suggested Projects">
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Project Recommendations</h3>
              <p className="text-white/70 text-sm">AI-powered project suggestions based on your skills</p>
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* README Improver */}
          <GlassCard title="README Improver">
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Improve GitHub READMEs</h3>
              <p className="text-white/70 text-sm">AI-enhanced README with better formatting and sections</p>
            </div>
          </GlassCard>

          {/* Portfolio Export */}
          <GlassCard title="Portfolio Export">
            <div className="text-center py-8">
              <Download className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Export Portfolio</h3>
              <p className="text-white/70 text-sm">Download sections or entire portfolio</p>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm">
                  Export HTML
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm">
                  Export PDF
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Portfolio Grid */}
      {projects.length > 0 && (
        <GlassCard title="Your Portfolio Grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-purple-400/50 transition-colors cursor-pointer"
                onClick={() => handleProjectSelect(project)}
              >
                <h4 className="text-white font-semibold mb-2">{project.name}</h4>
                <p className="text-white/70 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.techStack?.map((tech: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-purple-400 text-sm hover:underline">
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <GlassCard className="text-center py-16">
          <Briefcase className="w-20 h-20 text-purple-400 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Create Your Professional Portfolio</h3>
          <p className="text-white/70 max-w-2xl mx-auto">
            Start building your portfolio by adding projects above. Our AI will help you craft
            compelling descriptions, improve your GitHub READMEs, and analyze your portfolio strength
            to make you stand out to employers.
          </p>
        </GlassCard>
      )}
    </div>
  )
}
