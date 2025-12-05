'use client'

import { useState, useEffect } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import {
  MessageSquare,
  Brain,
  Target,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Loader2,
  Mic,
  MicOff,
  Volume2
} from 'lucide-react'
import {
  generateInterviewQuestions,
  analyzeInterviewAnswer,
  generateCompanyInterviewTips
} from '@/lib/ai/openai-service'

interface InterviewQuestion {
  question: string
  category: string
  difficulty: string
  expectedAnswer: string
}

interface AnswerAnalysis {
  score: number
  rating: 'poor' | 'fair' | 'good' | 'excellent'
  strengths: string[]
  improvements: string[]
  suggestions: string[]
  betterAnswer: string
}

interface CompanyTips {
  research: string[]
  preparation: string[]
  questions: string[]
  avoid: string[]
  strategies: string[]
}

export default function InterviewAIPage() {
  const [activeTab, setActiveTab] = useState<'questions' | 'practice' | 'company'>('questions')

  // Question generation state
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<'entry' | 'mid' | 'senior'>('mid')
  const [questions, setQuestions] = useState<{
    technical: InterviewQuestion[]
    behavioral: InterviewQuestion[]
    situational: InterviewQuestion[]
  }>({ technical: [], behavioral: [], situational: [] })
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)

  // Practice mode state
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [practiceMode, setPracticeMode] = useState(false)

  // Company tips state
  const [companyName, setCompanyName] = useState('')
  const [companyTips, setCompanyTips] = useState<CompanyTips | null>(null)
  const [isGeneratingTips, setIsGeneratingTips] = useState(false)

  useEffect(() => {
    if (!practiceMode) {
      setUserAnswer('')
      setAnalysis(null)
      setCurrentQuestion(null)
    }
  }, [practiceMode])

  const generateQuestions = async () => {
    if (!jobTitle.trim()) {
      alert('Please enter a job title')
      return
    }

    setIsGeneratingQuestions(true)
    try {
      const result = await generateInterviewQuestions(jobTitle, jobDescription, experienceLevel)
      setQuestions(result)
    } catch (error) {
      console.error('Error generating questions:', error)
      alert('Failed to generate interview questions. Please try again.')
    } finally {
      setIsGeneratingQuestions(false)
    }
  }

  const startPracticeMode = (question: InterviewQuestion) => {
    setCurrentQuestion(question)
    setPracticeMode(true)
    setUserAnswer('')
    setAnalysis(null)
  }

  const analyzeUserAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return

    setIsAnalyzing(true)
    try {
      const result = await analyzeInterviewAnswer(
        currentQuestion.question,
        userAnswer,
        jobTitle,
        currentQuestion.expectedAnswer
      )
      setAnalysis(result)
    } catch (error) {
      console.error('Error analyzing answer:', error)
      alert('Failed to analyze answer. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateCompanyTipsHandler = async () => {
    if (!companyName.trim() || !jobTitle.trim()) {
      alert('Please enter company name and job title')
      return
    }

    setIsGeneratingTips(true)
    try {
      const tips = await generateCompanyInterviewTips(companyName, jobTitle)
      setCompanyTips(tips)
    } catch (error) {
      console.error('Error generating company tips:', error)
      alert('Failed to generate company tips. Please try again.')
    } finally {
      setIsGeneratingTips(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      case 'hard': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-500/20 text-green-400'
      case 'good': return 'bg-blue-500/20 text-blue-400'
      case 'fair': return 'bg-yellow-500/20 text-yellow-400'
      case 'poor': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const tabs = [
    { id: 'questions' as const, label: 'Question Generator', icon: '🧠', desc: 'AI-generated interview questions' },
    { id: 'practice' as const, label: 'Practice Mode', icon: '🎯', desc: 'Answer questions & get feedback' },
    { id: 'company' as const, label: 'Company Prep', icon: '🏢', desc: 'Company-specific interview tips' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Interview Coach</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Master your next interview with AI-powered preparation, personalized questions,
            and real-time feedback on your answers.
          </p>
        </div>
      </GlassCard>

      {/* Navigation Tabs */}
      <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-500/20 text-purple-300'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{tab.icon}</div>
              <div className="font-semibold">{tab.label}</div>
              <div className="text-xs opacity-70 mt-1">{tab.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Question Generator Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-8">
          {/* Input Section */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-6">Generate Interview Questions</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior React Developer"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Experience Level</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as 'entry' | 'mid' | 'senior')}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (2-5 years)</option>
                    <option value="senior">Senior Level (5+ years)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-2">Job Description (Optional)</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description for more tailored questions..."
                  rows={3}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={generateQuestions}
                disabled={!jobTitle.trim() || isGeneratingQuestions}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingQuestions ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating Questions...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Generate Interview Questions
                  </>
                )}
              </button>
            </div>
          </GlassCard>

          {/* Generated Questions */}
          {(questions.technical.length > 0 || questions.behavioral.length > 0 || questions.situational.length > 0) && (
            <div className="space-y-6">
              {/* Technical Questions */}
              {questions.technical.length > 0 && (
                <GlassCard>
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-blue-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Technical Questions</h3>
                  </div>

                  <div className="space-y-4">
                    {questions.technical.map((q, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-2">{q.question}</h4>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                                {q.category}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded capitalize ${getDifficultyColor(q.difficulty)}`}>
                                {q.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => startPracticeMode(q)}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-colors text-purple-300 text-sm"
                          >
                            Practice
                          </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <h5 className="text-sm font-medium text-white/80 mb-2">Sample Strong Answer:</h5>
                          <p className="text-white/70 text-sm leading-relaxed">{q.expectedAnswer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Behavioral Questions */}
              {questions.behavioral.length > 0 && (
                <GlassCard>
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-6 w-6 text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Behavioral Questions</h3>
                  </div>

                  <div className="space-y-4">
                    {questions.behavioral.map((q, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-2">{q.question}</h4>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                                {q.category}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded capitalize ${getDifficultyColor(q.difficulty)}`}>
                                {q.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => startPracticeMode(q)}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-colors text-purple-300 text-sm"
                          >
                            Practice
                          </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <h5 className="text-sm font-medium text-white/80 mb-2">STAR Method Example:</h5>
                          <p className="text-white/70 text-sm leading-relaxed">{q.expectedAnswer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {/* Situational Questions */}
              {questions.situational.length > 0 && (
                <GlassCard>
                  <div className="flex items-center mb-4">
                    <TrendingUp className="h-6 w-6 text-orange-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Situational Questions</h3>
                  </div>

                  <div className="space-y-4">
                    {questions.situational.map((q, index) => (
                      <div key={index} className="border border-white/10 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-2">{q.question}</h4>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                                {q.category}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded capitalize ${getDifficultyColor(q.difficulty)}`}>
                                {q.difficulty}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => startPracticeMode(q)}
                            className="px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-lg hover:bg-purple-500/30 transition-colors text-purple-300 text-sm"
                          >
                            Practice
                          </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                          <h5 className="text-sm font-medium text-white/80 mb-2">Problem-Solving Example:</h5>
                          <p className="text-white/70 text-sm leading-relaxed">{q.expectedAnswer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          )}
        </div>
      )}

      {/* Practice Mode Tab */}
      {activeTab === 'practice' && (
        <div className="space-y-8">
          {practiceMode && currentQuestion ? (
            <div className="space-y-6">
              {/* Current Question */}
              <GlassCard className="neon-glow-purple">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-purple-400" />
                    Practice Question
                  </h2>
                  <button
                    onClick={() => setPracticeMode(false)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-white text-sm"
                  >
                    End Practice
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{currentQuestion.question}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">
                        {currentQuestion.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${getDifficultyColor(currentQuestion.difficulty)}`}>
                        {currentQuestion.difficulty}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm mb-2">Your Answer</label>
                    <textarea
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here... Use the STAR method (Situation, Task, Action, Result)"
                      rows={8}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <button
                    onClick={analyzeUserAnswer}
                    disabled={!userAnswer.trim() || isAnalyzing}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Analyzing Your Answer...
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Get AI Feedback
                      </>
                    )}
                  </button>
                </div>
              </GlassCard>

              {/* Analysis Results */}
              {analysis && (
                <GlassCard className="neon-glow-purple">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                      Answer Analysis
                    </h2>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{analysis.score}</div>
                      <div className="text-xs text-white/60">out of 100</div>
                      <span className={`text-xs px-2 py-1 rounded capitalize mt-1 inline-block ${getRatingColor(analysis.rating)}`}>
                        {analysis.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {analysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-green-400">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {analysis.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-yellow-400">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-blue-400 mb-3">Actionable Suggestions</h4>
                    <ul className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-400">
                          <span className="text-blue-400 font-bold mr-1">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-white mb-3">Improved Answer Example</h4>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white/70 text-sm leading-relaxed">{analysis.betterAnswer}</p>
                    </div>
                  </div>
                </GlassCard>
              )}

              {/* Expected Answer Reference */}
              <GlassCard>
                <h4 className="font-semibold text-white mb-3">Reference Answer (for comparison)</h4>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-white/70 text-sm leading-relaxed">{currentQuestion.expectedAnswer}</p>
                </div>
              </GlassCard>
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Ready to Practice?</h3>
              <p className="text-white/40">
                Generate interview questions first, then practice answering them with AI feedback.
              </p>
              <button
                onClick={() => setActiveTab('questions')}
                className="mt-4 px-6 py-3 bg-purple-500/20 border border-purple-400/50 rounded-lg hover:bg-purple-500/40 transition-colors text-purple-300"
              >
                Go to Question Generator
              </button>
            </GlassCard>
          )}
        </div>
      )}

      {/* Company Prep Tab */}
      {activeTab === 'company' && (
        <div className="space-y-8">
          {/* Input Section */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-white mb-6">Company-Specific Interview Prep</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google, Amazon, Microsoft"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <button
                onClick={generateCompanyTipsHandler}
                disabled={!companyName.trim() || !jobTitle.trim() || isGeneratingTips}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingTips ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing Company...
                  </>
                ) : (
                  <>
                    <Star className="h-5 w-5 mr-2" />
                    Generate Company Prep Tips
                  </>
                )}
              </button>
            </div>
          </GlassCard>

          {/* Company Tips Results */}
          {companyTips && (
            <div className="space-y-6">
              <GlassCard className="neon-glow-purple">
                <div className="flex items-center mb-6">
                  <Star className="h-6 w-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">
                    Interview Prep: {companyName} - {jobTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Research These
                    </h4>
                    <ul className="space-y-2">
                      {companyTips.research.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Preparation Steps
                    </h4>
                    <ul className="space-y-2">
                      {companyTips.preparation.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-400">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                  <h4 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Expected Questions
                  </h4>
                  <ul className="space-y-2">
                    {companyTips.questions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-orange-400">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                <GlassCard>
                  <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Avoid These Mistakes
                  </h4>
                  <ul className="space-y-2">
                    {companyTips.avoid.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-red-400">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>

              <GlassCard>
                <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Success Strategies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companyTips.strategies.map((strategy, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <span className="text-purple-400 font-semibold text-sm">#{index + 1}</span>
                      <p className="text-white/80 text-sm mt-1">{strategy}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {!companyTips && (
            <GlassCard className="text-center py-12">
              <Star className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Company-Specific Preparation</h3>
              <p className="text-white/40">
                Get tailored interview tips for specific companies like Google, Amazon, Meta, and more.
              </p>
            </GlassCard>
          )}
        </div>
      )}
    </div>
  )
}
