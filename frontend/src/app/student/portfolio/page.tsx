'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import {
  Briefcase, Zap, BookOpen, Trophy, Grid3X3, FileText, Download, Sparkles,
  Plus, Trash2, Edit3, CheckCircle, AlertCircle, Copy, ExternalLink, RefreshCw,
  Code, ArrowRight, Loader2, Github, Globe
} from 'lucide-react'
import { generateDescription } from '@/lib/ai/portfolio/generateDescription'
import {
  Project, PortfolioAssessment, ProjectSuggestion,
  assessPortfolioStrength, suggestNextProjects, enhanceREADME,
  generatePortfolioHTML, generatePortfolioMarkdown
} from '@/lib/ai/portfolio/portfolio-helpers'

// Initial sample projects so users immediately see how the tools work
const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'E-Commerce Cloud Platform',
    description: 'Full-stack online store with user authentication, product search, cart functionality, and Stripe checkout integration.',
    techStack: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'TailwindCSS'],
    githubUrl: 'https://github.com/alex-kumar/ecommerce-cloud',
    liveUrl: 'https://ecommerce-cloud-demo.vercel.app',
    complexity: 'Intermediate',
    impact: 'Demonstrates complete e-commerce workflow and secure payment processing'
  },
  {
    id: 2,
    name: 'Real-Time Task Management Dashboard',
    description: 'Collaborative project management board featuring drag-and-drop Kanban columns, instant web socket synchronization, and team member assignment.',
    techStack: ['React', 'TypeScript', 'Socket.IO', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/alex-kumar/task-board',
    liveUrl: 'https://task-board-live.herokuapp.com',
    complexity: 'Intermediate',
    impact: 'Shows real-time data synchronization across concurrent users'
  }
]

export default function PortfolioAIPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)
  const [activeTab, setActiveTab] = useState<'grid' | 'generator' | 'score' | 'suggest' | 'readme' | 'export'>('grid')

  // Project Form State
  const [isEditing, setIsEditing] = useState<string | number | null>(null)
  const [formData, setFormData] = useState<Project>({
    id: '',
    name: '',
    description: '',
    techStack: [],
    githubUrl: '',
    liveUrl: ''
  })
  const [techInput, setTechInput] = useState('')

  // AI Description Generator State
  const [selectedForDesc, setSelectedForDesc] = useState<string | number>(INITIAL_PROJECTS[0]?.id || '')
  const [customDescName, setCustomDescName] = useState('')
  const [customDescSkills, setCustomDescSkills] = useState('')
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false)
  const [generatedDescResult, setGeneratedDescResult] = useState<{ description: string; techStack: string[]; complexity: string; impact: string } | null>(null)

  // Assessment & Suggestions State
  const [assessment, setAssessment] = useState<PortfolioAssessment | null>(null)
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // README State
  const [selectedForReadme, setSelectedForReadme] = useState<string | number>(INITIAL_PROJECTS[0]?.id || '')
  const [generatedReadme, setGeneratedReadme] = useState('')
  const [copiedReadme, setCopiedReadme] = useState(false)

  // Export State
  const [studentName, setStudentName] = useState('Alex Kumar')
  const [bio, setBio] = useState('Full-Stack Software Engineer building scalable, intuitive web applications.')

  // Run assessment on projects load or change
  useEffect(() => {
    setAssessment(assessPortfolioStrength(projects))
  }, [projects])

  // ── Project CRUD Handlers ──
  const handleAddOrUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const techArray = techInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    if (isEditing) {
      setProjects(projects.map(p => p.id === isEditing ? { ...formData, techStack: techArray } : p))
      setIsEditing(null)
    } else {
      const newProject: Project = {
        ...formData,
        id: Date.now(),
        techStack: techArray
      }
      setProjects([...projects, newProject])
    }

    setFormData({ id: '', name: '', description: '', techStack: [], githubUrl: '', liveUrl: '' })
    setTechInput('')
  }

  const startEdit = (project: Project) => {
    setIsEditing(project.id)
    setFormData(project)
    setTechInput(project.techStack.join(', '))
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const deleteProject = (id: string | number) => {
    setProjects(projects.filter(p => p.id !== id))
    if (selectedForDesc === id) setSelectedForDesc(projects[0]?.id || '')
    if (selectedForReadme === id) setSelectedForReadme(projects[0]?.id || '')
  }

  // ── AI Description Generator Handler ──
  const handleGenerateDescription = () => {
    setIsGeneratingDesc(true)
    setTimeout(() => {
      let targetName = customDescName
      let targetSkills = customDescSkills.split(',').map(s => s.trim()).filter(Boolean)

      if (selectedForDesc !== 'custom') {
        const p = projects.find(proj => proj.id == selectedForDesc)
        if (p) {
          targetName = p.name
          targetSkills = p.techStack
        }
      }

      if (!targetName) targetName = 'Modern Web Application'

      const result = generateDescription({ name: targetName, skills: targetSkills, technologies: targetSkills })
      setGeneratedDescResult(result)
      setIsGeneratingDesc(false)
    }, 600)
  }

  const applyGeneratedDescriptionToProject = () => {
    if (!generatedDescResult || selectedForDesc === 'custom') return
    setProjects(projects.map(p => p.id == selectedForDesc ? {
      ...p,
      description: generatedDescResult.description,
      techStack: Array.from(new Set([...p.techStack, ...generatedDescResult.techStack])),
      complexity: generatedDescResult.complexity,
      impact: generatedDescResult.impact
    } : p))
    alert('✅ Description and enhanced tech stack applied to project!')
  }

  // ── Suggestions Handler ──
  const handleGenerateSuggestions = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setSuggestions(suggestNextProjects(projects))
      setIsAnalyzing(false)
    }, 500)
  }

  const addSuggestionToPortfolio = (sug: ProjectSuggestion) => {
    const newProj: Project = {
      id: Date.now(),
      name: sug.title,
      description: `${sug.reason} Key features planned:\n${sug.features.map(f => `• ${f}`).join('\n')}`,
      techStack: sug.techStack,
      complexity: sug.difficulty,
      impact: sug.reason
    }
    setProjects([...projects, newProj])
    setActiveTab('grid')
  }

  // ── README Handler ──
  const handleGenerateReadme = () => {
    const p = projects.find(proj => proj.id == selectedForReadme)
    if (!p) return
    setGeneratedReadme(enhanceREADME(p))
  }

  const copyReadmeToClipboard = () => {
    navigator.clipboard.writeText(generatedReadme)
    setCopiedReadme(true)
    setTimeout(() => setCopiedReadme(false), 2000)
  }

  const downloadReadmeFile = () => {
    const blob = new Blob([generatedReadme], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `README-${projects.find(p => p.id == selectedForReadme)?.name.replace(/\s+/g, '-') || 'project'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── Export Handlers ──
  const downloadHTML = () => {
    const html = generatePortfolioHTML(projects, studentName, bio)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${studentName.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadMarkdown = () => {
    const md = generatePortfolioMarkdown(projects, studentName)
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PORTFOLIO.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen space-y-8 pb-16">

      {/* Hero Section */}
      <GlassCard className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 border border-purple-500/30 neon-glow-purple">
        <div className="text-center py-8">
          <div className="flex justify-center mb-3">
            <Briefcase className="w-14 h-14 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-3">
            Portfolio Builder AI
          </h1>
          <p className="text-white/70 text-base max-w-2xl mx-auto mb-6">
            Add your projects and let AI generate recruiter-ready descriptions, assess your full-stack strength score, enhance your GitHub READMEs, and export standalone HTML or Markdown portfolios.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            <span className="flex items-center bg-purple-500/20 border border-purple-400/30 rounded-full px-3.5 py-1.5 text-purple-200 font-medium">
              <Sparkles className="w-4 h-4 text-purple-400 mr-2" /> AI Description Generator
            </span>
            <span className="flex items-center bg-green-500/20 border border-green-400/30 rounded-full px-3.5 py-1.5 text-green-200 font-medium">
              <Trophy className="w-4 h-4 text-green-400 mr-2" /> Strength Score Engine
            </span>
            <span className="flex items-center bg-blue-500/20 border border-blue-400/30 rounded-full px-3.5 py-1.5 text-blue-200 font-medium">
              <BookOpen className="w-4 h-4 text-blue-400 mr-2" /> GitHub README Enhancer
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-white/10">
        {[
          { id: 'grid', label: 'Projects Grid', icon: Grid3X3, badge: projects.length },
          { id: 'generator', label: 'AI Descriptions', icon: Sparkles },
          { id: 'score', label: 'Strength Score', icon: Trophy, badge: assessment?.score || 0 },
          { id: 'suggest', label: 'Project Ideas', icon: Zap },
          { id: 'readme', label: 'README Enhancer', icon: BookOpen },
          { id: 'export', label: 'Export Portfolio', icon: Download },
        ].map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-xl font-medium text-sm transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600/30 border-t-2 border-x border-purple-400 text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : ''}`} />
              {tab.label}
              {tab.badge !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/70'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── TAB 1: PROJECTS GRID & CRUD FORM ── */}
      {activeTab === 'grid' && (
        <div className="space-y-8">
          {/* Add/Edit Form Card */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {isEditing ? <Edit3 className="w-5 h-5 text-purple-400" /> : <Plus className="w-5 h-5 text-purple-400" />}
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form onSubmit={handleAddOrUpdateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Content Generator or E-Commerce App"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Tech Stack (comma separated) *</label>
                <input
                  type="text"
                  placeholder="React, Node.js, TypeScript, PostgreSQL, Docker"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={formData.githubUrl || ''}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Live Demo / Deployment URL</label>
                <input
                  type="url"
                  placeholder="https://my-project-demo.vercel.app"
                  value={formData.liveUrl || ''}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-white/70 mb-1">Project Description & Key Impact</label>
                <textarea
                  rows={3}
                  placeholder="Describe what the project does, key features built, and problems solved..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => { setIsEditing(null); setFormData({ id: '', name: '', description: '', techStack: [], githubUrl: '', liveUrl: '' }); setTechInput('') }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white/80 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium text-sm transition-all flex items-center gap-2 shadow-lg"
                >
                  {isEditing ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isEditing ? 'Save Changes' : 'Add Project to Portfolio'}
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Grid of Projects */}
          <GlassCard title="Your Portfolio Projects">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-white/50">
                <Briefcase className="w-12 h-12 mx-auto mb-3 text-white/30" />
                <p className="text-base mb-1">No projects in your portfolio yet.</p>
                <p className="text-xs mb-4">Add your first project above to start scoring and generating descriptions.</p>
                <button
                  onClick={() => setProjects(INITIAL_PROJECTS)}
                  className="px-4 py-2 bg-purple-500/20 border border-purple-400/40 rounded-lg text-purple-300 text-xs hover:bg-purple-500/30 transition-colors"
                >
                  Load Sample Projects
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                  <div
                    key={project.id || idx}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-400/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h4 className="text-white font-semibold text-lg">{project.name}</h4>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => startEdit(project)}
                            className="p-1.5 bg-white/5 hover:bg-white/15 rounded-md text-white/60 hover:text-white transition-colors"
                            title="Edit project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/25 rounded-md text-red-400 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.description || 'No description provided.'}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack?.map((tech, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-purple-500/20 border border-purple-400/30 text-purple-200 rounded-full text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-2 text-xs">
                      <div className="flex gap-4">
                        {project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/80 hover:text-purple-300 transition-colors">
                            <Github className="w-3.5 h-3.5" /> Repository
                          </a>
                        ) : (
                          <span className="text-white/30 flex items-center gap-1"><Github className="w-3.5 h-3.5" /> No repo</span>
                        )}
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-green-400 hover:underline">
                            <Globe className="w-3.5 h-3.5" /> Live Demo
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => { setSelectedForDesc(project.id); setActiveTab('generator'); handleGenerateDescription() }}
                        className="text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Enhance AI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* ── TAB 2: AI DESCRIPTION GENERATOR ── */}
      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard title="Select Project to Enhance" className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-2">Choose Project from Portfolio:</label>
                <select
                  value={selectedForDesc}
                  onChange={e => setSelectedForDesc(e.target.value)}
                  className="w-full p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.name}
                    </option>
                  ))}
                  <option value="custom" className="bg-slate-900 text-white">➕ Custom / Draft Project</option>
                </select>
              </div>

              {selectedForDesc === 'custom' && (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Crypto Portfolio Tracker"
                      value={customDescName}
                      onChange={e => setCustomDescName(e.target.value)}
                      className="w-full p-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Tailwind, CoinGecko API"
                      value={customDescSkills}
                      onChange={e => setCustomDescSkills(e.target.value)}
                      className="w-full p-2 bg-white/5 border border-white/15 rounded-lg text-white text-sm"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateDescription}
                disabled={isGeneratingDesc}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-4 shadow-lg"
              >
                {isGeneratingDesc ? <><Loader2 className="w-4 h-4 animate-spin" /> Crafting Description...</> : <><Sparkles className="w-4 h-4" /> Generate AI Description</>}
              </button>
            </div>
          </GlassCard>

          <GlassCard title="AI Generated Result" className="lg:col-span-2">
            {!generatedDescResult ? (
              <div className="text-center py-16 text-white/40">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-purple-400/40" />
                <p className="text-sm">Select a project on the left and click **Generate AI Description**.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">Generated Recruiter-Ready Description</h4>
                  <div className="p-4 bg-white/5 border border-purple-500/30 rounded-xl text-white/90 text-sm leading-relaxed">
                    {generatedDescResult.description}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-xs text-white/50 block mb-1">Recommended Tech Stack to Highlight</span>
                    <div className="flex flex-wrap gap-1.5">
                      {generatedDescResult.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-xs text-white/50 block mb-1">Project Complexity & Impact</span>
                    <span className="text-sm font-bold text-green-400 block">{generatedDescResult.complexity} Level</span>
                    <span className="text-xs text-white/70 mt-1 block">{generatedDescResult.impact}</span>
                  </div>
                </div>

                {selectedForDesc !== 'custom' && (
                  <div className="pt-3 border-t border-white/10 flex justify-end">
                    <button
                      onClick={applyGeneratedDescriptionToProject}
                      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors shadow-md"
                    >
                      <CheckCircle className="w-4 h-4" /> Apply This Description to Project
                    </button>
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* ── TAB 3: STRENGTH SCORE ENGINE ── */}
      {activeTab === 'score' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Ring Card */}
          <GlassCard className="lg:col-span-1 text-center py-8">
            <h3 className="text-white font-semibold mb-4">Overall Portfolio Score</h3>
            <div className="flex justify-center mb-4 relative">
              <svg width="150" height="150" className="-rotate-90">
                <circle cx="75" cy="75" r="60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                <circle
                  cx="75" cy="75" r="60" fill="none"
                  stroke={assessment?.score! >= 80 ? '#22c55e' : assessment?.score! >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12"
                  strokeDasharray={`${((assessment?.score || 0) / 100) * (2 * Math.PI * 60)} ${2 * Math.PI * 60}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="text-4xl font-black text-white">{assessment?.score || 0}</div>
                <div className="text-xs text-white/50">/ 100</div>
              </div>
            </div>

            <span className={`px-4 py-1.5 rounded-full font-bold text-sm inline-block mb-3 ${
              assessment?.level === 'Job-Ready' ? 'bg-green-500/20 text-green-300 border border-green-400/40' :
              assessment?.level === 'Advanced' ? 'bg-blue-500/20 text-blue-300 border border-blue-400/40' :
              assessment?.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/40' :
              'bg-red-500/20 text-red-300 border border-red-400/40'
            }`}>
              🌟 {assessment?.level || 'Beginner'} Portfolio
            </span>
            <p className="text-xs text-white/60 px-4">
              Score is calculated based on project volume, tech stack diversity (frontend, backend, cloud, DBs), and documentation completeness.
            </p>
          </GlassCard>

          {/* Detailed Breakdown */}
          <GlassCard title="Portfolio Assessment Report" className="lg:col-span-2">
            <div className="space-y-6">
              {/* Strengths */}
              <div>
                <h4 className="text-sm font-semibold text-green-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Detected Strengths
                </h4>
                {assessment?.strengths.length === 0 ? (
                  <p className="text-xs text-white/50 italic">Add more projects with rich descriptions to build strengths.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {assessment?.strengths.map((s, i) => (
                      <div key={i} className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weaknesses */}
              <div>
                <h4 className="text-sm font-semibold text-yellow-400 mb-2.5 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {assessment?.weaknesses.map((w, i) => (
                    <div key={i} className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-xs text-yellow-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1 flex-shrink-0" /> {w}
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Skills & Action Plan */}
              <div className="pt-2 border-t border-white/10">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">📋 Recommended Action Items to Boost Score</h4>
                <div className="space-y-2">
                  {assessment?.actionItems.map((item, i) => (
                    <div key={i} className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs text-purple-200 flex items-center justify-between">
                      <span>• {item}</span>
                      <button
                        onClick={() => { setActiveTab('suggest'); handleGenerateSuggestions() }}
                        className="text-purple-300 hover:underline font-semibold flex items-center gap-1 flex-shrink-0"
                      >
                        View Blueprints →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ── TAB 4: AI SUGGESTED PROJECT IDEAS ── */}
      {activeTab === 'suggest' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
            <div>
              <h3 className="text-white font-semibold">Tailored Project Blueprints</h3>
              <p className="text-xs text-white/60">Based on your current tech stack, AI recommends building these high-impact projects next to close your skill gaps.</p>
            </div>
            <button
              onClick={handleGenerateSuggestions}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0"
            >
              {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Analyze & Refresh Ideas
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(suggestions.length > 0 ? suggestions : suggestNextProjects(projects)).map((sug, i) => (
              <GlassCard key={i} className="flex flex-col justify-between border-blue-500/30">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-bold rounded uppercase">
                      {sug.category}
                    </span>
                    <span className="text-xs font-semibold text-purple-300">{sug.difficulty}</span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{sug.title}</h4>
                  <p className="text-xs text-white/70 mb-4 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-white/5">
                    💡 <strong className="text-white">Why build this:</strong> {sug.reason}
                  </p>

                  <h5 className="text-xs font-semibold text-white mb-2">Planned Tech Stack:</h5>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {sug.techStack.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white/10 text-white/80 rounded text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <h5 className="text-xs font-semibold text-white mb-1.5">Key Features:</h5>
                  <ul className="space-y-1 text-xs text-white/70 mb-6 pl-1">
                    {sug.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-purple-400 mt-0.5">•</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => addSuggestionToPortfolio(sug)}
                  className="w-full py-2.5 bg-purple-600/30 hover:bg-purple-600 border border-purple-500/50 hover:border-purple-400 text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Blueprint to My Portfolio
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: README EMPROVER ── */}
      {activeTab === 'readme' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard title="Select Project" className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-2">Choose Project for README Generation:</label>
                <select
                  value={selectedForReadme}
                  onChange={e => setSelectedForReadme(e.target.value)}
                  className="w-full p-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                >
                  {projects.map(p => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerateReadme}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <BookOpen className="w-4 h-4" /> Generate Professional README.md
              </button>
            </div>
          </GlassCard>

          <GlassCard title="README.md Preview" className="lg:col-span-2">
            {!generatedReadme ? (
              <div className="text-center py-16 text-white/40">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-400/40" />
                <p className="text-sm">Select a project on the left and click **Generate Professional README.md**.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Markdown structured following GitHub best practices
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={copyReadmeToClipboard}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-xs text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" /> {copiedReadme ? 'Copied!' : 'Copy Markdown'}
                    </button>
                    <button
                      onClick={downloadReadmeFile}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs text-white font-medium flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" /> Download .md File
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-white/10 rounded-xl p-5 max-h-[450px] overflow-y-auto font-mono text-xs text-white/85 whitespace-pre-wrap leading-relaxed">
                  {generatedReadme}
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* ── TAB 6: PORTFOLIO EXPORT ── */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard title="Customization Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">Your Full Name / Developer Title</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  placeholder="e.g. Alex Kumar | Full-Stack Developer"
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Professional Bio Header</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="A short sentence summarizing your engineering skills & passions..."
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs text-purple-200">
                💡 Currently exporting <strong className="text-white">{projects.length} project(s)</strong> with all tech badges and links included.
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard title="1. Standalone HTML Portfolio Page" className="border-purple-500/30">
              <p className="text-xs text-white/70 mb-4">
                Downloads a single, beautifully styled HTML file (`portfolio.html`) featuring dark-mode glassmorphism aesthetics, responsive project cards, and tech stack tags. Host anywhere for free (GitHub Pages, Netlify, Vercel).
              </p>
              <button
                onClick={downloadHTML}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Globe className="w-4 h-4" /> Export Standalone HTML (`portfolio.html`)
              </button>
            </GlassCard>

            <GlassCard title="2. GitHub Profile README Markdown" className="border-green-500/30">
              <p className="text-xs text-white/70 mb-4">
                Downloads a clean, structured `PORTFOLIO.md` formatted specifically for pasting directly into your main GitHub profile repository (`username/username`).
              </p>
              <button
                onClick={downloadMarkdown}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-4 h-4" /> Export GitHub Markdown (`PORTFOLIO.md`)
              </button>
            </GlassCard>
          </div>
        </div>
      )}

    </div>
  )
}
