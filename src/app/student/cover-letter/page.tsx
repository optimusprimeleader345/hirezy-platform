'use client'

import { useState } from 'react'
import { FileText, Sparkles, Download, Eye, Edit3, CheckCircle, Zap, Upload, Target, Mail, Loader2 } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { generateCoverLetter, generateResumeFromProfile, optimizeResumeATS, ResumeData } from '@/lib/ai/openai-service'

interface CoverLetterData {
  title: string
  personalInfo: {
    name: string
    position: string
    company: string
  }
  content: string
  highlights: string[]
  callToAction: string
}

interface LetterAnalysis {
  score: number
  strengths: string[]
  suggestions: string[]
  keywords: string[]
  tone: string
  persuasiveness: number
}

export default function AICoverLetterGenerator() {
  const [activeMode, setActiveMode] = useState('generate')
  const [jobPosition, setJobPosition] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [yourExperience, setYourExperience] = useState('')
  const [personalStory, setPersonalStory] = useState('')
  const [keySkills, setKeySkills] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState<CoverLetterData | null>(null)
  const [letterAnalysis, setLetterAnalysis] = useState<LetterAnalysis | null>(null)

  const suggestedSkills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'MongoDB',
    'AWS', 'Docker', 'Git', 'Agile', 'Leadership', 'Communication',
    'Problem Solving', 'Team Collaboration', 'Project Management'
  ]

  const coverLetterModes = [
    {
      id: 'generate',
      title: 'Generate New',
      description: 'Create a complete cover letter from scratch',
      icon: '✨'
    },
    {
      id: 'improve',
      title: 'Improve Existing',
      description: 'Enhance your current cover letter',
      icon: '🚀'
    },
    {
      id: 'optimize',
      title: 'Job-Specific',
      description: 'Tailor for a specific job posting',
      icon: '🎯'
    },
    {
      id: 'professional',
      title: 'Professional Tone',
      description: 'Make it more formal and polished',
      icon: '👔'
    }
  ]

  const generateCoverLetterAI = async () => {
    if (!jobPosition || !companyName || keySkills.length === 0) {
      alert('Please fill in job position, company name, and at least one skill')
      return
    }

    setIsGenerating(true)

    try {
      // Prepare resume data from user inputs
      const resumeData: Partial<ResumeData> = {
        personalInfo: {
          name: '[Your Name]',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          portfolio: ''
        },
        skills: keySkills,
        experience: yourExperience ? [
          {
            title: 'Previous Position',
            company: '[Previous Company]',
            duration: '[Time Period]',
            description: [yourExperience]
          }
        ] : [],
        education: [],
        projects: []
      }

      // Determine tone based on mode
      const toneMap = {
        'generate': 'professional',
        'professional': 'professional',
        'enthusiastic': 'enthusiastic',
        'confident': 'confident'
      } as const

      const selectedTone = toneMap[activeMode] || 'professional'

      // Generate the cover letter using AI
      const generatedContent = await generateCoverLetter(
        resumeData,
        jobDescription || `We are looking for a skilled ${jobPosition} to join our team at ${companyName}.`,
        companyName,
        selectedTone as 'professional' | 'enthusiastic' | 'confident'
      )

      const coverLetterData: CoverLetterData = {
        title: `${jobPosition} Position at ${companyName}`,
        personalInfo: {
          name: '[Your Name]',
          position: jobPosition,
          company: companyName
        },
        content: generatedContent,
        highlights: [
          `Experience with ${keySkills.slice(0, 3).join(', ')}`,
          personalStory ? `Unique motivation: ${personalStory.substring(0, 50)}...` : 'Technical expertise and practical experience',
          yourExperience ? 'Track record of delivering measurable results' : 'Commitment to excellence and innovation'
        ],
        callToAction: 'I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your success.'
      }

      setGeneratedLetter(coverLetterData)

      // Generate real AI analysis of the letter
      const analysis = await optimizeResumeATS(generatedContent, jobDescription)

      setLetterAnalysis({
        score: analysis.score || 85,
        strengths: analysis.strengths || [
          'Strong opening hook',
          'Clear value proposition',
          'Professional tone maintained',
          'Compelling call to action'
        ],
        suggestions: analysis.suggestions || [
          'Add specific metrics from your achievements',
          'Mention why you\'re passionate about this company',
          'Consider requesting an interview'
        ],
        keywords: analysis.keywords || keySkills.concat(['motivated', 'experienced', 'collaborative']),
        tone: selectedTone.charAt(0).toUpperCase() + selectedTone.slice(1),
        persuasiveness: Math.max(70, analysis.score || 85)
      })

    } catch (error) {
      console.error('Error generating cover letter:', error)
      alert('Failed to generate cover letter. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateLetterContent = (mode: string): string => {
    const baseContent = `[Date]

[Hiring Manager's Name]
${companyName}
[Company Address]
[City, State, ZIP Code]

Dear Hiring Manager,

I am excited to apply for the ${jobPosition} position at ${companyName}, as advertised. With my background in ${keySkills.slice(0, 2).join(' and ')}, I am confident I can make valuable contributions to your team.

My professional journey has equipped me with a diverse skill set, including ${keySkills.join(', ')}. In my previous role, I:

${yourExperience ? `• ${yourExperience.split('.').join('.\n• ').replace(/\.$/, '')}` : '• Led cross-functional teams to deliver projects ahead of schedule\n• Implemented innovative solutions that improved system performance by 40%\n• Collaborated effectively with stakeholders to achieve business objectives'}

${personalStory ? `What sets me apart is: ${personalStory}` : 'What particularly draws me to ${companyName} is your commitment to innovation and excellence in the industry.'}

I am excited about the opportunity to bring my technical expertise and passion for problem-solving to your team. I believe my background in ${keySkills[0]} and ${keySkills[1] || keySkills[0]} would be a perfect match for the challenges and opportunities at ${companyName}.

I would welcome the opportunity to discuss how my skills and enthusiasm align with ${companyName}'s goals. Thank you for considering my application.

Sincerely,
[Your Name]`

    switch (mode) {
      case 'improve':
        return baseContent + '\n\n[Additional personalized content would be added here]'

      case 'optimize':
        return baseContent.replace('as advertised', `found on your careers page. I was particularly drawn to this opportunity because ${jobDescription.substring(0, 100)}...`)

      case 'professional':
        return baseContent.replace('excited to apply', 'writing to express my interest')
          .replace('I am confident', 'I am well-positioned')
          .replace('perfect match', 'strong foundation')

      default:
        return baseContent
    }
  }

  const toggleSkill = (skill: string) => {
    setKeySkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const copyToClipboard = () => {
    if (generatedLetter) {
      navigator.clipboard.writeText(generatedLetter.content)
    }
  }

  const downloadLetter = () => {
    if (generatedLetter) {
      const element = document.createElement('a')
      const file = new Blob([generatedLetter.content], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `${generatedLetter.title}.txt`
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
            <Mail className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Cover Letter Generator</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Create compelling, tailored cover letters that get noticed. Our AI analyzes job descriptions
            and crafts personalized content that showcases your unique value.
          </p>
        </div>
      </GlassCard>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coverLetterModes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`p-6 rounded-lg border transition-all duration-200 text-left ${
              activeMode === mode.id
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

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-6">Cover Letter Details</h2>

          <div className="space-y-6">
            {/* Job and Company */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm mb-2">Job Position *</label>
                <input
                  type="text"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  placeholder="e.g., Senior Software Developer"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Company Name *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., TechCorp Inc."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description to help AI tailor the letter..."
                rows={4}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Your Experience */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Key Achievements</label>
              <textarea
                value={yourExperience}
                onChange={(e) => setYourExperience(e.target.value)}
                placeholder="Describe your relevant experience and achievements..."
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Personal Story */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Personal Story/Why This Role</label>
              <textarea
                value={personalStory}
                onChange={(e) => setPersonalStory(e.target.value)}
                placeholder="What's your motivation? Any personal connection to this type of work?"
                rows={2}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Key Skills */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Your Key Skills *</label>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      keySkills.includes(skill)
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/60 mt-2">
                Selected: {keySkills.join(', ') || 'None selected'}
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCoverLetterAI}
              disabled={isGenerating || !jobPosition || !companyName || keySkills.length === 0}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating AI Cover Letter...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate Professional Cover Letter
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Generated Letter */}
          {generatedLetter && (
            <GlassCard className="neon-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Cover Letter
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Edit3 className="h-4 w-4 text-white" />
                  </button>
                  <button
                    onClick={downloadLetter}
                    className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="mb-4 p-4 bg-white/5 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-white/60">Position:</span> <span className="text-white">{jobPosition}</span></div>
                  <div><span className="text-white/60">Company:</span> <span className="text-white">{companyName}</span></div>
                  <div><span className="text-white/60">Mode:</span> <span className="text-white">{coverLetterModes.find(m => m.id === activeMode)?.title}</span></div>
                  <div><span className="text-white/60">Skills Used:</span> <span className="text-white">{keySkills.length}</span></div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-white whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {generatedLetter.content}
                </pre>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Email to Recruiter
                </button>
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Save Template
                </button>
              </div>
            </GlassCard>
          )}

          {/* Analysis Results */}
          {letterAnalysis && (
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Letter Analysis</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{letterAnalysis.score}</div>
                  <div className="text-xs text-white/60">Quality Score</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Strengths
                  </h4>
                  {letterAnalysis.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-green-400 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                      {strength}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-400" />
                    Suggestions
                  </h4>
                  {letterAnalysis.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-yellow-400 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0"></div>
                      {suggestion}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-sm text-white/60">Tone</div>
                    <div className="font-semibold text-white">{letterAnalysis.tone}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-sm text-white/60">Persuasiveness</div>
                    <div className="font-semibold text-white">{letterAnalysis.persuasiveness}%</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {!generatedLetter && (
            <GlassCard className="text-center py-12">
              <Mail className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Your AI Cover Letter</h3>
              <p className="text-white/40">
                Fill in the job details and click "Generate" to create a personalized cover letter
              </p>
            </GlassCard>
          )}

          {/* Templates & Saved Letters */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Saved Cover Letters</h3>
            <div className="space-y-3">
              {['Software Developer - TechCorp', 'Full Stack Engineer - StartupXYZ', 'React Developer - InnovateLabs'].map((letter, index) => (
                <button
                  key={letter}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <div className="text-white font-medium mb-1">{letter}</div>
                  <div className="text-white/60 text-sm">Last edited {['2 days', '1 week', '3 days'][index]} ago</div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Writing</h3>
            <p className="text-white/70 text-sm">Professional, persuasive content tailored to your skills</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Target className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Job-Specific</h3>
            <p className="text-white/70 text-sm">Analyzes job descriptions for perfect alignment</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Quality Analysis</h3>
            <p className="text-white/70 text-sm">Detailed feedback and improvement suggestions</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Download className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Easy Export</h3>
            <p className="text-white/70 text-sm">Download, copy, and share your cover letters</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
