'use client'

import { useState, useRef, useCallback } from 'react'
import {
  FileText, Sparkles, Download, CheckCircle, Zap, Upload,
  Target, AlertCircle, Loader2, X, FileScan, Copy, RefreshCw
} from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'
import { optimizeResumeATS, generateResumeFromProfile, ATSResult, ResumeData } from '@/lib/ai/openai-service'
import { getMockATSResult, getMockGeneratedResume, getMockJobMatchResult } from '@/lib/ai/mock-ai-service'
import { extractTextFromPDF } from '@/lib/pdf-extractor'

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = 'improve' | 'ats-optimize' | 'job-tailor' | 'generate'

const MODES: { id: Mode; title: string; description: string; icon: string; color: string }[] = [
  { id: 'improve',      title: 'Improve Resume',        description: 'Upload PDF & get AI suggestions', icon: '✨', color: 'from-blue-500/20 to-purple-500/20 border-blue-400' },
  { id: 'ats-optimize', title: 'ATS Optimization',      description: 'Score & optimize for ATS bots',   icon: '🎯', color: 'from-green-500/20 to-teal-500/20 border-green-400' },
  { id: 'job-tailor',   title: 'Job-Specific Tailoring', description: 'Match resume to a job posting',   icon: '📋', color: 'from-orange-500/20 to-red-500/20 border-orange-400' },
  { id: 'generate',     title: 'Generate New',           description: 'Create a professional resume',    icon: '📝', color: 'from-indigo-500/20 to-pink-500/20 border-indigo-400' },
]

// ─── Score Ring Component ─────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const filled = ((score / 100) * circumference)
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex flex-col items-center">
      <svg width="130" height="130" className="-rotate-90">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={radius} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="absolute">
        <div className="text-4xl font-black text-white mt-1">{score}</div>
        <div className="text-xs text-white/50 text-center">/ 100</div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIResumeBuilder() {
  const [activeMode, setActiveMode] = useState<Mode>('improve')

  // Upload / PDF state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [isParsing, setIsParsing] = useState(false)
  const [parseError, setParseError] = useState('')
  const dropRef = useRef<HTMLDivElement>(null)

  // Text inputs
  const [userResumeText, setUserResumeText] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [targetPosition, setTargetPosition] = useState('')
  const [achievements, setAchievements] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'mid' | 'senior'>('mid')

  // Results
  const [atsResults, setAtsResults] = useState<ATSResult | null>(null)
  const [optimizedResume, setOptimizedResume] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [copied, setCopied] = useState(false)

  // ── PDF Parsing ─────────────────────────────────────────────────────────────
  const parsePDF = async (file: File) => {
    setIsParsing(true)
    setParseError('')
    setExtractedText('')
    try {
      const text = await extractTextFromPDF(file)
      if (!text.trim()) {
        setParseError('Could not extract text from this PDF. It may be image-based. Try copy-pasting the text instead.')
      } else {
        setExtractedText(text)
        setUserResumeText(text)  // Also populate the text area
      }
    } catch (err) {
      console.error('PDF parse error:', err)
      setParseError('Failed to parse PDF. Please try a different file or paste your resume text manually.')
    } finally {
      setIsParsing(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setParseError('Please upload a PDF file.')
      return
    }
    setUploadedFile(file)
    await parsePDF(file)
  }

  // Drag and drop
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setParseError('Please drop a PDF file.')
      return
    }
    setUploadedFile(file)
    await parsePDF(file)
  }, [])

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  // ── AI Actions ───────────────────────────────────────────────────────────────
  const getResumeText = () => extractedText || userResumeText

  const runATSAnalysis = async (text: string, jobDesc?: string) => {
    setIsGenerating(true)
    setIsDemoMode(false)
    setAtsResults(null)
    setOptimizedResume('')
    try {
      let result: ATSResult
      try {
        result = await optimizeResumeATS(text, jobDesc)
      } catch {
        result = getMockATSResult(text)
        setIsDemoMode(true)
      }
      setAtsResults(result)
      if (result.optimizedContent) setOptimizedResume(result.optimizedContent)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImprove = () => {
    const text = getResumeText()
    if (!text.trim()) return
    runATSAnalysis(text)
  }

  const handleATSOptimize = () => {
    const text = getResumeText()
    if (!text.trim()) return
    runATSAnalysis(text)
  }

  const handleJobTailor = async () => {
    const text = getResumeText()
    if (!text.trim() || !jobDescription.trim()) return
    setIsGenerating(true)
    setIsDemoMode(false)
    setAtsResults(null)
    setOptimizedResume('')
    try {
      let matchResult
      try {
        matchResult = await getMockJobMatchResult(jobDescription) // use mock since calculateJobMatch needs Google key
        setIsDemoMode(true)
      } catch {
        matchResult = getMockJobMatchResult(jobDescription)
        setIsDemoMode(true)
      }
      setAtsResults({
        score: matchResult.score,
        keywords: matchResult.matchingSkills.map((s: string) => `✅ ${s}`).concat(matchResult.missingSkills.map((s: string) => `❌ ${s}`)),
        suggestions: matchResult.recommendations,
        strengths: matchResult.matchingSkills.map((s: string) => `${s} matches job requirements`),
        weaknesses: matchResult.missingSkills.map((s: string) => `${s} required but not in resume`),
      })
      // Also generate tailored resume
      try {
        const opt = await optimizeResumeATS(text, jobDescription)
        if (opt.optimizedContent) setOptimizedResume(opt.optimizedContent)
      } catch {
        const mock = getMockATSResult(text)
        if (mock.optimizedContent) setOptimizedResume(mock.optimizedContent)
        setIsDemoMode(true)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerate = async () => {
    if (!targetPosition.trim()) return
    setIsGenerating(true)
    setIsDemoMode(false)
    setOptimizedResume('')
    setAtsResults(null)
    try {
      const resumeData: ResumeData = {
        personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', portfolio: '' },
        skills: achievements.split(',').map(s => s.trim()).filter(Boolean),
        experience: [],
        education: [],
        projects: []
      }
      let generated = ''
      try {
        generated = await generateResumeFromProfile(resumeData, targetPosition)
      } catch {
        generated = getMockGeneratedResume(targetPosition)
        setIsDemoMode(true)
      }
      setOptimizedResume(generated)
    } catch (e) {
      console.error(e)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedResume)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsText = () => {
    const blob = new Blob([optimizedResume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-${targetPosition || 'optimized'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetAll = () => {
    setUploadedFile(null)
    setExtractedText('')
    setUserResumeText('')
    setParseError('')
    setAtsResults(null)
    setOptimizedResume('')
    setIsDemoMode(false)
  }

  const resumeTextForMode = getResumeText()

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">

      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-400/30 rounded-xl">
          <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-amber-300 font-semibold">Demo Mode</span>
            <span className="text-amber-200/70 text-sm ml-2">— No API key set. Showing realistic AI-like output. Add <code className="bg-amber-900/40 px-1 rounded">OPENAI_API_KEY</code> to <code className="bg-amber-900/40 px-1 rounded">.env.local</code> for live AI.</span>
          </div>
        </div>
      )}

      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center py-2">
          <div className="flex items-center justify-center mb-3">
            <Sparkles className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Resume Builder</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto text-sm">
            Upload your PDF resume or paste text — get AI-powered ATS scoring, tailoring, and optimization in seconds.
          </p>
        </div>
      </GlassCard>

      {/* Mode Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => { setActiveMode(mode.id); setAtsResults(null); setOptimizedResume('') }}
            className={`p-5 rounded-xl border-2 transition-all duration-200 text-left ${
              activeMode === mode.id
                ? `bg-gradient-to-br ${mode.color} shadow-lg scale-[1.02]`
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.01]'
            }`}
          >
            <div className="text-2xl mb-2">{mode.icon}</div>
            <h3 className="font-semibold text-white text-sm mb-1">{mode.title}</h3>
            <p className="text-xs text-white/60">{mode.description}</p>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── LEFT: Inputs ── */}
        <div className="space-y-6">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <FileScan className="h-5 w-5 text-purple-400" />
              {activeMode === 'improve' || activeMode === 'ats-optimize' || activeMode === 'job-tailor'
                ? 'Your Resume'
                : 'Resume Details'}
            </h2>

            {/* ── IMPROVE mode: PDF Upload + extracted text ── */}
            {(activeMode === 'improve' || activeMode === 'ats-optimize') && (
              <div className="space-y-5">

                {/* Drop zone */}
                <div
                  ref={dropRef}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    uploadedFile ? 'border-green-400/50 bg-green-500/5' : 'border-white/20 hover:border-purple-400/40 hover:bg-white/3'
                  }`}
                >
                  {isParsing ? (
                    <div className="space-y-3">
                      <Loader2 className="h-10 w-10 text-purple-400 mx-auto animate-spin" />
                      <p className="text-white/70 text-sm">Extracting text from PDF…</p>
                    </div>
                  ) : uploadedFile ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-green-400">
                        <CheckCircle className="h-6 w-6" />
                        <span className="font-semibold">{uploadedFile.name}</span>
                      </div>
                      {extractedText && (
                        <p className="text-green-300/70 text-xs">{extractedText.split(' ').length} words extracted successfully</p>
                      )}
                      <button
                        onClick={resetAll}
                        className="mt-2 flex items-center gap-1 text-xs text-white/40 hover:text-white/70 mx-auto transition-colors"
                      >
                        <X className="h-3 w-3" /> Remove & start over
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="h-10 w-10 text-white/30 mx-auto" />
                      <div>
                        <p className="text-white/70 text-sm font-medium">Drop your PDF resume here</p>
                        <p className="text-white/40 text-xs mt-1">or click to browse files</p>
                      </div>
                      <label
                        htmlFor="resume-upload"
                        className="inline-block px-5 py-2 bg-purple-500/30 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors cursor-pointer text-sm text-purple-300"
                      >
                        Choose PDF File
                      </label>
                    </div>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                </div>

                {/* Parse error */}
                {parseError && (
                  <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-400/30 rounded-lg text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    {parseError}
                  </div>
                )}

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs">or paste text directly</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Text area (auto-filled from PDF) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/70 text-sm">Resume Text</label>
                    {userResumeText && (
                      <span className="text-white/30 text-xs">{userResumeText.split(' ').length} words</span>
                    )}
                  </div>
                  <textarea
                    value={userResumeText}
                    onChange={e => setUserResumeText(e.target.value)}
                    rows={8}
                    placeholder="Your resume text will appear here after PDF upload, or paste it directly…"
                    className="w-full p-3 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                <button
                  onClick={activeMode === 'improve' ? handleImprove : handleATSOptimize}
                  disabled={!resumeTextForMode.trim() || isGenerating}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing…</> : <><Zap className="h-5 w-5" /> {activeMode === 'improve' ? 'Analyze & Improve Resume' : 'Run ATS Score Check'}</>}
                </button>
              </div>
            )}

            {/* ── JOB TAILOR mode ── */}
            {activeMode === 'job-tailor' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Job Description *</label>
                  <textarea
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    rows={5}
                    placeholder="Paste the full job description here…"
                    className="w-full p-3 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                {/* PDF upload for job-tailor too */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-all duration-200 ${
                    uploadedFile ? 'border-green-400/40 bg-green-500/5' : 'border-white/15 hover:border-orange-400/40'
                  }`}
                >
                  {isParsing ? (
                    <><Loader2 className="h-6 w-6 text-orange-400 mx-auto animate-spin mb-1" /><p className="text-white/50 text-xs">Reading PDF…</p></>
                  ) : uploadedFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4" /> {uploadedFile.name}
                    </div>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 text-white/30 mx-auto mb-1" />
                      <label htmlFor="jt-upload" className="text-xs text-white/50 cursor-pointer hover:text-white/70">Upload resume PDF or paste below</label>
                      <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="jt-upload" />
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Your Resume Text *</label>
                  <textarea
                    value={userResumeText}
                    onChange={e => setUserResumeText(e.target.value)}
                    rows={6}
                    placeholder="Paste your resume here (auto-filled if PDF uploaded)…"
                    className="w-full p-3 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>

                <button
                  onClick={handleJobTailor}
                  disabled={!jobDescription.trim() || !userResumeText.trim() || isGenerating}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> Tailoring…</> : <><Target className="h-5 w-5" /> Tailor Resume for This Job</>}
                </button>
              </div>
            )}

            {/* ── GENERATE mode ── */}
            {activeMode === 'generate' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Target Job Title *</label>
                  <input
                    type="text"
                    value={targetPosition}
                    onChange={e => setTargetPosition(e.target.value)}
                    placeholder="e.g., Senior React Developer"
                    className="w-full p-3 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Your Key Skills & Achievements</label>
                  <textarea
                    value={achievements}
                    onChange={e => setAchievements(e.target.value)}
                    rows={5}
                    placeholder="List key skills, e.g: React, Node.js, 3 years experience, built e-commerce platform with 10k users…"
                    className="w-full p-3 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Experience Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['entry', 'mid', 'senior'] as const).map(level => (
                      <button
                        key={level}
                        onClick={() => setExperienceLevel(level)}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          experienceLevel === level
                            ? 'bg-indigo-500/30 border border-indigo-400/50 text-indigo-300'
                            : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {level === 'entry' ? '🌱 Entry' : level === 'mid' ? '💼 Mid' : '🚀 Senior'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!targetPosition.trim() || isGenerating}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isGenerating ? <><Loader2 className="h-5 w-5 animate-spin" /> Generating…</> : <><Sparkles className="h-5 w-5" /> Generate Professional Resume</>}
                </button>
              </div>
            )}
          </GlassCard>

          {/* Quick nav */}
          <div className="grid grid-cols-2 gap-3">
            <a href="/student/cover-letter" className="p-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-400/20 rounded-xl hover:border-green-400/40 transition-all group">
              <div className="text-xl mb-1">📝</div>
              <div className="text-white font-medium text-sm group-hover:text-green-300 transition-colors">Cover Letter AI</div>
              <div className="text-white/50 text-xs">Generate tailored cover letters</div>
            </a>
            <a href="/student/interview-ai" className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-xl hover:border-blue-400/40 transition-all group">
              <div className="text-xl mb-1">🎯</div>
              <div className="text-white font-medium text-sm group-hover:text-blue-300 transition-colors">Interview Coach</div>
              <div className="text-white/50 text-xs">Practice AI interview questions</div>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Results ── */}
        <div className="space-y-6">

          {/* Placeholder */}
          {!atsResults && !optimizedResume && !isGenerating && (
            <GlassCard className="text-center py-16">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold text-white/60 mb-2">AI Results Appear Here</h3>
              <p className="text-white/30 text-sm max-w-xs mx-auto">
                {activeMode === 'improve' ? 'Upload your PDF or paste resume text, then click Analyze.' :
                 activeMode === 'ats-optimize' ? 'Paste your resume and click Run ATS Score Check.' :
                 activeMode === 'job-tailor' ? 'Paste job description + resume, then click Tailor.' :
                 'Enter your target job title and click Generate.'}
              </p>
            </GlassCard>
          )}

          {/* Loading spinner */}
          {isGenerating && (
            <GlassCard className="text-center py-16">
              <Loader2 className="h-12 w-12 text-purple-400 mx-auto animate-spin mb-4" />
              <p className="text-white/70 font-medium">AI is working on your resume…</p>
              <p className="text-white/40 text-sm mt-1">This takes 5–15 seconds</p>
            </GlassCard>
          )}

          {/* ATS Score Card */}
          {atsResults && !isGenerating && (
            <GlassCard className="neon-glow-purple">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                ATS Analysis Report
              </h2>

              {/* Score Ring */}
              <div className="flex justify-center mb-6 relative">
                <ScoreRing score={atsResults.score} />
              </div>

              <div className="space-y-5">
                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-1.5"><CheckCircle className="h-4 w-4" /> Strengths</h4>
                  <div className="space-y-1.5">
                    {atsResults.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center gap-1.5"><AlertCircle className="h-4 w-4" /> Improvements</h4>
                  <div className="space-y-1.5">
                    {atsResults.suggestions.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {atsResults.keywords.map(kw => (
                      <span
                        key={kw}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          kw.startsWith('✅') ? 'bg-green-500/15 border-green-400/30 text-green-300' : 'bg-red-500/15 border-red-400/30 text-red-300'
                        }`}
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Optimized Resume Output */}
          {optimizedResume && !isGenerating && (
            <GlassCard className="neon-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  {activeMode === 'generate' ? 'Generated Resume' : 'Optimized Resume'}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white/80 text-xs transition-colors"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={downloadAsText}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/30 hover:bg-purple-500/40 border border-purple-400/50 rounded-lg text-purple-300 text-xs transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button
                    onClick={resetAll}
                    className="p-1.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                    title="Start over"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 max-h-[500px] overflow-y-auto">
                <pre className="text-white/85 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                  {optimizedResume}
                </pre>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  )
}
