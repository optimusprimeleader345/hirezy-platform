'use client'

import { useState } from 'react'
import { Code, Upload, Brain, Shield, Zap, Star, CheckCircle, AlertTriangle, Info, Download, Eye } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface CodeAnalysis {
  overallScore: number
  readability: number
  maintainability: number
  performance: number
  security: number
  issues: CodeIssue[]
  suggestions: string[]
  strengths: string[]
  languageStats: {
    language: string
    lines: number
    files: number
  }
  complexityScore: number
}

interface CodeIssue {
  type: 'error' | 'warning' | 'info' | 'security' | 'performance'
  severity: 'high' | 'medium' | 'low'
  line: number
  message: string
  suggestion?: string
  file: string
}

export default function AICodeReviewer() {
  const [code, setCode] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<CodeAnalysis | null>(null)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'issues' | 'security' | 'performance' | 'suggestions'>('overview')

  const supportedLanguages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
    'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js'
  ]

  const analyzeCode = async () => {
    if (!code.trim() && !uploadedFile) {
      alert('Please provide code either by typing or uploading a file')
      return
    }

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: CodeAnalysis = {
        overallScore: 78,
        readability: 85,
        maintainability: 72,
        performance: 80,
        security: 75,
        issues: [
          {
            type: 'warning',
            severity: 'medium',
            line: 15,
            message: 'Consider using const instead of let for variables that are not reassigned',
            suggestion: 'Replace "let userName = ..." with "const userName = ..."',
            file: 'main.js'
          },
          {
            type: 'error',
            severity: 'high',
            line: 42,
            message: 'Potential null pointer exception - null check recommended',
            suggestion: 'Add null check: if (data) { ... }',
            file: 'api.js'
          },
          {
            type: 'security',
            severity: 'high',
            line: 23,
            message: 'SQL injection vulnerability detected',
            suggestion: 'Use parameterized queries instead of string concatenation',
            file: 'database.js'
          },
          {
            type: 'info',
            severity: 'low',
            line: 8,
            message: 'Function is longer than recommended (50+ lines)',
            suggestion: 'Consider breaking into smaller, focused functions',
            file: 'utils.js'
          }
        ],
        suggestions: [
          'Add comprehensive error handling with try-catch blocks',
          'Implement input validation for user data',
          'Consider using TypeScript for better type safety',
          'Add JSDoc comments for public APIs',
          'Implement logging for debugging and monitoring',
          'Consider using ESLint and Prettier for code consistency',
          'Add unit tests with Jest or similar framework',
          'Optimize algorithm complexity where possible'
        ],
        strengths: [
          'Good use of modern ES6+ features',
          'Consistent code formatting',
          'Proper variable naming conventions',
          'Modular code structure',
          'Clear separation of concerns'
        ],
        languageStats: {
          language: 'JavaScript',
          lines: 245,
          files: 3
        },
        complexityScore: 6.2
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'security':
        return <Shield className="h-4 w-4 text-red-400" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-400" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-400/30'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30'
      case 'low':
        return 'text-blue-400 bg-blue-500/20 border-blue-400/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    if (score >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
      }
      reader.readAsText(file)
    }
  }

  const downloadReport = () => {
    if (!analysis) return

    const report = `# Code Review Report

## Overall Score: ${analysis.overallScore}/100

### Quality Metrics
- Readability: ${analysis.readability}/100
- Maintainability: ${analysis.maintainability}/100
- Performance: ${analysis.performance}/100
- Security: ${analysis.security}/100
- Complexity Score: ${analysis.complexityScore}

### Key Findings
${analysis.issues.map(issue => `- ${issue.severity.toUpperCase()}: ${issue.message} (${issue.file}:${issue.line})`).join('\n')}

### Suggestions for Improvement
${analysis.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

### Strengths
${analysis.strengths.map(strength => `- ${strength}`).join('\n')}

Generated by Hirezy AI Code Reviewer
`

    const element = document.createElement('a')
    const file = new Blob([report], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'code-review-report.md'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">AI Code Reviewer</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Advanced AI-powered code analysis for quality, security, performance, and best practices.
            Get detailed feedback to improve your code immediately.
          </p>
        </div>
      </GlassCard>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Input */}
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-4">Code Input</h2>

          <div className="space-y-4">
            {/* File Upload */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Upload Code File</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                <input
                  type="file"
                  accept=".js,.ts,.py,.java,.cpp,.cs,.go,.rs,.html,.css,.jsx,.tsx,.vue"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="code-upload"
                />
                <label htmlFor="code-upload" className="text-white/60 cursor-pointer hover:text-white">
                  Choose code file or drag and drop
                </label>
                {uploadedFile && (
                  <p className="text-sm text-green-400 mt-2">
                    ✓ {uploadedFile.name} loaded
                  </p>
                )}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Language</label>
              <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                {supportedLanguages.map(lang => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Code Editor */}
            <div>
              <label className="block text-white/70 text-sm mb-2">Paste Your Code Here</label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Enter your code here...
function example(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr.filter(item => item.active);
}
// Or upload a file above"
                rows={15}
                className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              />
            </div>

            <button
              onClick={analyzeCode}
              disabled={isAnalyzing || (!code.trim() && !uploadedFile)}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Code...
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5" />
                  Analyze with AI
                </>
              )}
            </button>
          </div>
        </GlassCard>

        {/* Analysis Results */}
        <div className="space-y-6">
          {analysis ? (
            <>
              {/* Overall Score */}
              <GlassCard className="neon-glow-purple">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore}
                  </div>
                  <div className="text-xl text-white/60 mb-4">Overall Code Quality Score</div>

                  {/* Quality Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{analysis.readability}/100</div>
                      <div className="text-xs text-white/60">Readability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{analysis.maintainability}/100</div>
                      <div className="text-xs text-white/60">Maintainability</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{analysis.performance}/100</div>
                      <div className="text-xs text-white/60">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{analysis.security}/100</div>
                      <div className="text-xs text-white/60">Security</div>
                    </div>
                  </div>

                  {/* Complexity */}
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <div className="text-sm text-white/60">Code Complexity</div>
                    <div className="text-lg font-semibold text-white">{analysis.complexityScore}</div>
                  </div>
                </div>
              </GlassCard>

              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto">
                <button
                  onClick={() => setSelectedTab('overview')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedTab === 'overview'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  Overview
                </button>
                <button
                  onClick={() => setSelectedTab('issues')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedTab === 'issues'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  Issues
                </button>
                <button
                  onClick={() => setSelectedTab('security')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedTab === 'security'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                  Security
                  {analysis.issues.filter(i => i.type === 'security').length > 0 && (
                    <span className="bg-red-500/20 text-red-400 text-xs px-1 rounded ml-2">
                      {analysis.issues.filter(i => i.type === 'security').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedTab('performance')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedTab === 'performance'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  Performance
                  {analysis.issues.filter(i => i.type === 'performance').length > 0 && (
                    <span className="bg-red-500/20 text-red-400 text-xs px-1 rounded ml-2">
                      {analysis.issues.filter(i => i.type === 'performance').length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedTab('suggestions')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
                    selectedTab === 'suggestions'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Star className="h-4 w-4" />
                  Suggestions
                  {analysis.suggestions.length > 0 && (
                    <span className="bg-red-500/20 text-red-400 text-xs px-1 rounded ml-2">
                      {analysis.suggestions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              {selectedTab === 'overview' && (
                <div className="space-y-4">
                  {/* Language Stats */}
                  <GlassCard>
                    <h3 className="text-lg font-semibold text-white mb-3">Analysis Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">{analysis.issues.length}</div>
                        <div className="text-sm text-white/60">Total Issues</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-2xl font-bold text-white">{analysis.suggestions.length}</div>
                        <div className="text-sm text-white/60">Suggestions</div>
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="mt-4">
                      <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        Code Strengths
                      </h4>
                      {analysis.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-green-400 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                          {strength}
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <button
                    onClick={downloadReport}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Full Report
                  </button>
                </div>
              )}

              {selectedTab === 'issues' && (
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">All Issues Found</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {analysis.issues.map((issue, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-medium">{issue.message}</span>
                              <span className={`text-xs px-2 py-1 rounded border ${getSeverityColor(issue.severity)}`}>
                                {issue.severity.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-white/60 text-sm mb-2">
                              {issue.file}:{issue.line}
                            </div>
                            {issue.suggestion && (
                              <div className="text-white/80 text-sm bg-white/5 p-2 rounded border-l-2 border-purple-400/50">
                                💡 {issue.suggestion}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}

              {selectedTab === 'security' && (
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">Security Analysis</h3>
                  <div className="space-y-3">
                    {analysis.issues.filter(issue => issue.type === 'security').length > 0 ? (
                      analysis.issues.filter(issue => issue.type === 'security').map((issue, index) => (
                        <div key={index} className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-red-400 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-white font-medium">Security Risk</span>
                                <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-400/30">
                                  {issue.severity.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-white/80 text-sm mb-2">{issue.message}</p>
                              {issue.suggestion && (
                                <p className="text-purple-400 text-sm">⚠️ {issue.suggestion}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-white/60">
                        <Shield className="h-12 w-12 text-green-400 mx-auto mb-3" />
                        <p>No security issues detected!</p>
                        <p className="text-sm">Your code appears to be secure.</p>
                      </div>
                    )}
                  </div>
                </GlassCard>
              )}

              {selectedTab === 'performance' && (
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Analysis</h3>
                  <div className="text-center py-8">
                    <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                    <p className="text-white/70">Performance analysis feature coming soon!</p>
                    <p className="text-sm text-white/60">AI will analyze algorithmic complexity and optimization opportunities.</p>
                  </div>
                </GlassCard>
              )}

              {selectedTab === 'suggestions' && (
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">Improvement Suggestions</h3>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/80 text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </>
          ) : (
            <GlassCard className="text-center py-12">
              <Code className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">AI Code Analysis Ready</h3>
              <p className="text-white/40">
                Upload code or paste it in the editor on the left, then click "Analyze with AI"
                to receive comprehensive feedback from our advanced code review system.
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <div className="text-center">
            <Brain className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Analysis</h3>
            <p className="text-white/70 text-sm">Advanced machine learning code evaluation</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Security Scan</h3>
            <p className="text-white/70 text-sm">Detect vulnerabilities and security risks</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
            <p className="text-white/70 text-sm">Algorithm optimization and complexity analysis</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Star className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Best Practices</h3>
            <p className="text-white/70 text-sm">Industry standards and coding conventions</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
