'use client'

import { useState } from 'react'
import { FileText, Sparkles, Download, Eye, Edit3, CheckCircle, Zap, Upload, Target, AlertCircle, Loader2 } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { generateResumeFromProfile, optimizeResumeATS, generateCoverLetter, ATSResult, ResumeData } from '@/lib/ai/openai-service'
import { calculateJobMatch } from '@/lib/ai/google-ai-service'

export default function AIResumeBuilder() {
  const [activeMode, setActiveMode] = useState('improve')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    },
    skills: [],
    experience: [],
    education: [],
    projects: []
  })
  const [atsResults, setAtsResults] = useState<ATSResult | null>(null)
  const [resumeContent, setResumeContent] = useState('')
  const [userResumeText, setUserResumeText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [jobDescription, setJobDescription] = useState('')
  const [optimizedResume, setOptimizedResume] = useState<string>('')

  const modes = [
    {
      id: 'improve',
      title: 'Improve Resume',
      description: 'Enhance existing resume with AI suggestions',
      icon: '✨'
    },
    {
      id: 'ats-optimize',
      title: 'ATS Optimization',
      description: 'Make resume ATS-friendly',
      icon: '🎯'
    },
    {
      id: 'job-tailor',
      title: 'Job-Specific Tailoring',
      description: 'Customize for specific job opportunities',
      icon: '📋'
    },
    {
      id: 'generate',
      title: 'Generate New',
      description: 'Create resume from scratch',
      icon: '📝'
    }
  ]

  const generateATSReport = async () => {
    setIsGenerating(true)
    try {
      if (activeMode === 'improve') {
        // For PDF processing, we'd need a separate service
        alert('PDF parsing coming soon! Please use text-based resume for now.')
        return
      }

      const result = await optimizeResumeATS(resumeContent || userResumeText)
      setAtsResults(result)
    } catch (error) {
      console.error('Error analyzing resume:', error)
      alert('Failed to analyze resume. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const optimizeForJob = async () => {
    if (!jobDescription || !userResumeText) return

    setIsGenerating(true)
    try {
      // First get job matching analysis
      const matchResult = await calculateJobMatch(
        {
          skills: resumeData.skills,
          experience: resumeData.experience.map(exp => exp.title + ' ' + exp.description),
          education: resumeData.education.map(edu => edu.degree + ' - ' + edu.school),
          projects: resumeData.projects.map(proj => proj.name + ': ' + proj.description)
        },
        jobDescription,
        'Software Developer'
      )

      // Display match score as part of ATS results
      setAtsResults({
        score: matchResult.score,
        keywords: matchResult.matchingSkills.map(skill => `✅ ${skill}`).concat(
          matchResult.missingSkills.map(skill => `❌ ${skill}`)
        ),
        suggestions: matchResult.recommendations,
        strengths: matchResult.matchingSkills.map(skill => `${skill} matches job requirements`),
        weaknesses: matchResult.missingSkills.map(skill => `${skill} mentioned in job but not found in resume`)
      })

      // Generate optimized resume
      const optimizedResult = await optimizeResumeATS(userResumeText, jobDescription)
      if (optimizedResult.optimizedContent) {
        setOptimizedResume(optimizedResult.optimizedContent)
      }

    } catch (error) {
      console.error('Error optimizing for job:', error)
      alert('Failed to optimize resume for job. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Resume Builder</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Supercharge your resume with AI-powered enhancements. Optimize for ATS,
            tailor for specific jobs, and create professional resumes that get results.
          </p>
        </div>
      </GlassCard>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map(mode => (
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
          <h2 className="text-xl font-semibold text-white mb-6">Resume Input</h2>

          {activeMode === 'improve' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Upload Current Resume (PDF)</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                  <p className="text-white/60 mb-2">Drop your resume here or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block px-4 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
                {uploadedFile && (
                  <p className="text-sm text-green-400 mt-2">✓ {uploadedFile.name} uploaded</p>
                )}
              </div>

              <button
                onClick={generateATSReport}
                disabled={!uploadedFile}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5" />
                  Analyze & Improve Resume
                </div>
              </button>
            </div>
          )}

          {activeMode === 'ats-optimize' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Paste Resume Text</label>
                <textarea
                  value={userResumeText}
                  onChange={(e) => setUserResumeText(e.target.value)}
                  rows={10}
                  placeholder="Paste your current resume content here..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={generateATSReport}
                disabled={!userResumeText.trim() || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5 mr-2" />
                    Optimize for ATS
                  </>
                )}
              </button>
            </div>
          )}

          {activeMode === 'job-tailor' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={6}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Your Current Resume</label>
                <textarea
                  placeholder="Paste your resume content here..."
                  value={userResumeText}
                  onChange={(e) => setUserResumeText(e.target.value)}
                  rows={8}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={optimizeForJob}
                disabled={!jobDescription || !userResumeText || isGenerating}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Tailoring Resume...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5 mr-2" />
                    Tailor for This Job
                  </>
                )}
              </button>
            </div>
          )}

          {activeMode === 'generate' && (
            <div className="space-y-6">
              <div>
                <label className="block text-white/70 text-sm mb-2">Target Position</label>
                <input
                  type="text"
                  placeholder="e.g., Senior Software Developer"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Key Achievements</label>
                <textarea
                  placeholder="List your major achievements, projects, and skills..."
                  rows={6}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Experience Level</label>
                <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (2-5 years)</option>
                  <option value="senior">Senior Level (5+ years)</option>
                </select>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg text-white font-semibold transition-all duration-200">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Generate Professional Resume
                </div>
              </button>
            </div>
          )}
        </GlassCard>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* ATS Results */}
          {atsResults && (
            <GlassCard className="neon-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  ATS Analysis Results
                </h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{atsResults.score}</div>
                  <div className="text-xs text-white/60">out of 100</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Key Strengths</h4>
                  {atsResults.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-green-400 mb-1">
                      <CheckCircle className="h-4 w-4" />
                      {strength}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Improvement Suggestions</h4>
                  {atsResults.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-yellow-400 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                      {suggestion}
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Keywords Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {atsResults.keywords.map((keyword: string) => (
                      <span key={keyword} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Download Optimized
                </button>
                <button className="flex-1 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm">
                  Share Link
                </button>
              </div>
            </GlassCard>
          )}

          {/* Optimized Resume */}
          {optimizedResume && (
            <GlassCard className="neon-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Job-Tailored Resume
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                    <Download className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {optimizedResume}
                </pre>
              </div>
            </GlassCard>
          )}

          {!atsResults && !optimizedResume && (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Results Will Appear Here</h3>
              <p className="text-white/40">
                Fill in the form on the left and click to generate your optimized resume
              </p>
            </GlassCard>
          )}

          {/* Quick Actions */}
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              <a
                href="/student/cover-letter"
                className="p-3 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-lg hover:bg-green-400/30 transition-colors cursor-pointer block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    📝
                  </div>
                  <div>
                    <div className="text-white font-medium">AI Cover Letter Generator</div>
                    <div className="text-white/60 text-sm">Generate job-specific cover letters</div>
                  </div>
                </div>
              </a>
              <a
                href="/student/interview-ai"
                className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-400/30 rounded-lg hover:bg-blue-400/30 transition-colors cursor-pointer block"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/30 rounded-lg">
                    🎯
                  </div>
                  <div>
                    <div className="text-white font-medium">Interview Preparation</div>
                    <div className="text-white/60 text-sm">Practice with AI-generated questions</div>
                  </div>
                </div>
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
