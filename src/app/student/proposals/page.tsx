'use client'

import { useState } from 'react'
import { FileText, Sparkles, DollarSign, Clock, Send, Download, Copy, Zap } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface ProposalData {
  title: string
  description: string
  skills: string[]
  timeline: string
  budget: string
}

export default function AIProposalGenerator() {
  const [activeMode, setActiveMode] = useState('basic')
  const [clientName, setClientName] = useState('')
  const [projectDetails, setProjectDetails] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState('')
  const [timeline, setTimeline] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedProposal, setGeneratedProposal] = useState<ProposalData | null>(null)

  const availableSkills = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB',
    'PostgreSQL', 'AWS', 'Docker', 'GraphQL', 'Figma', 'Adobe XD'
  ]

  const proposalModes = {
    basic: {
      title: 'Basic Proposal',
      description: 'Simple, professional proposal for most projects',
      icon: '📄'
    },
    technical: {
      title: 'Technical Proposal',
      description: 'Detailed technical specifications and architecture',
      icon: '⚙️'
    },
    client: {
      title: 'Client-Focused Pitch',
      description: 'Business-focused with ROI emphasis',
      icon: '🎯'
    },
    short: {
      title: 'Short Proposal',
      description: 'Concise version for quick reviews',
      icon: '⚡'
    }
  }

  const generateProposal = async () => {
    if (!clientName || !projectDetails || selectedSkills.length === 0) {
      alert('Please fill in all required fields')
      return
    }

    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const mockProposal: ProposalData = {
        title: `${projectDetails.substring(0, 50)}... - Development Proposal`,
        description: generateProposalText(activeMode),
        skills: selectedSkills,
        timeline: timeline || '2-4 weeks',
        budget: budgetRange || '$3000 - $6000'
      }

      setGeneratedProposal(mockProposal)
      setIsGenerating(false)
    }, 2000)
  }

  const generateProposalText = (mode: string): string => {
    const baseText = `Dear ${clientName},

I am excited to submit this proposal for your project: ${projectDetails}

With my expertise in ${selectedSkills.join(', ')}, I can deliver a high-quality solution that meets your requirements.

**Project Overview:**
${projectDetails}

**Technical Approach:**
I will use modern development practices including ${selectedSkills.slice(0, 3).join(', ')} to ensure scalability and maintainability.

**Timeline:**
${timeline || '2-4 weeks'}

**Budget:**
${budgetRange || '$3000 - $6000'}

**Why Choose Me:**
- ${selectedSkills.length}+ years of experience
- Proven track record with similar projects
- Agile development methodology
- Regular communication and progress updates

I look forward to discussing this project with you and answering any questions you may have.`

    switch (mode) {
      case 'technical':
        return baseText + `\n\n**Technical Specifications:**
- Frontend: ${selectedSkills.filter(s => ['React', 'JavaScript', 'TypeScript'].includes(s)).join(', ')}
- Backend: ${selectedSkills.filter(s => ['Node.js', 'Python', 'MongoDB'].includes(s)).join(', ')}
- Deployment: AWS/Heroku with CI/CD pipeline`

      case 'client':
        return baseText + `\n\n**Business Benefits:**
- Increased efficiency by 40-60%
- Scalable solution for future growth
- Modern UI/UX that engages users
- ROI within ${selectedSkills.includes('React') ? '3' : '6'} months`

      case 'short':
        return `Proposal for ${projectDetails}

Skills: ${selectedSkills.join(', ')}
Timeline: ${timeline || '2-4 weeks'}
Budget: ${budgetRange || '$3000 - $6000'}

I'm an experienced developer ready to deliver your project with quality and efficiency.`

      default:
        return baseText
    }
  }

  const copyToClipboard = () => {
    if (generatedProposal) {
      navigator.clipboard.writeText(generatedProposal.description)
      // You could add a toast notification here
    }
  }

  const downloadProposal = () => {
    if (generatedProposal) {
      const element = document.createElement('a')
      const file = new Blob([generatedProposal.description], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${generatedProposal.title}.txt`
      document.body.appendChild(element)
      element.click()
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Proposal Generator</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Generate professional, customized proposals using AI. Choose from different modes
            to create the perfect pitch for your clients.
          </p>
        </div>
      </GlassCard>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(proposalModes).map(([key, mode]) => (
          <button
            key={key}
            onClick={() => setActiveMode(key)}
            className={`p-6 rounded-lg border transition-all duration-200 text-left ${
              activeMode === key
                ? 'bg-purple-500/20 border-purple-400 shadow-lg neon-glow-purple'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-3">{mode.icon}</div>
            <h3 className="font-semibold text-white mb-1">{mode.title}</h3>
            <p className="text-sm text-white/70">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6">Project Details</h2>

          <div className="space-y-6">
            {/* Client Name */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Client/Company Name *</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., TechCorp Inc."
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Project Description *</label>
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Describe the project requirements, goals, and any specific features needed..."
                rows={4}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Your Skills & Technologies *</label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkills(prev =>
                      prev.includes(skill)
                        ? prev.filter(s => s !== skill)
                        : [...prev, skill]
                    )}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Timeline</label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  placeholder="e.g., 3-4 weeks"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Budget Range</label>
                <input
                  type="text"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  placeholder="e.g., $3000 - $6000"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateProposal}
              disabled={isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating AI Proposal...
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  Generate AI Proposal
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Right Column - Generated Proposal */}
        <div className="space-y-6">
          {generatedProposal ? (
            <GlassCard className="neon-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Proposal
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={downloadProposal}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="mb-4 p-4 bg-white/5 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-white/60">Type:</span> <span className="text-white">{proposalModes[activeMode as keyof typeof proposalModes].title}</span></div>
                  <div><span className="text-white/60">Client:</span> <span className="text-white">{clientName}</span></div>
                  <div><span className="text-white/60">Timeline:</span> <span className="text-white">{generatedProposal.timeline}</span></div>
                  <div><span className="text-white/60">Budget:</span> <span className="text-white">{generatedProposal.budget}</span></div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {generatedProposal.description}
                </pre>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Email to Client
                </button>
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Save Template
                </button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Your AI Proposal Will Appear Here</h3>
              <p className="text-white/40">
                Fill in the project details above and click "Generate AI Proposal"
              </p>
            </GlassCard>
          )}

          {/* Templates Section */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Saved Templates</h3>
            <div className="space-y-3">
              {['E-commerce Website', 'Mobile App', 'Data Analytics', 'API Development'].map((template, index) => (
                <button
                  key={template}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <div className="text-white font-medium">{template}</div>
                  <div className="text-white/60 text-sm">Last used 2 days ago</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Content</h3>
            <p className="text-white/70 text-sm">Advanced AI generates customized, professional proposals</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Pricing</h3>
            <p className="text-white/70 text-sm">AI suggests competitive pricing based on project complexity</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Time Estimation</h3>
            <p className="text-white/70 text-sm">Accurate timeline predictions using historical data</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
