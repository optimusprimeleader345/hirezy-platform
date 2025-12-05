'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { FileText, Sparkles, Upload, ArrowRight, FileUp } from 'lucide-react'

interface ResumeResponse {
  enhancedText: string
  improvements: string[]
  wordCount: number
  originalWordCount: number
  suggestions: string[]
}

export function ResumeAIEnhancer() {
  const [originalText, setOriginalText] = useState('')
  const [enhancedText, setEnhancedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [improvements, setImprovements] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>('')

  const handleEnhanceResume = async () => {
    if (!originalText.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/student/resume-enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText })
      })

      if (!response.ok) throw new Error('Failed to enhance resume')

      const data: ResumeResponse = await response.json()
      setEnhancedText(data.enhancedText)
      setImprovements(data.improvements)
      setSuggestions(data.suggestions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enhancement failed')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      // In real implementation, this would parse the file
      // For now, we'll just show the file name
    }
  }

  return (
    <GlassCard title="AI Resume Enhancer">
      <div className="space-y-6">
        <p className="text-white/80 text-sm">
          Upload your resume or paste your content below, and let AI enhance it for better job applications.
        </p>

        {/* File Upload Section */}
        <div className="space-y-3">
          <label className="text-white font-medium text-sm">Upload Resume (Optional)</label>
          <div className="border-2 border-dashed border-white/20 rounded-lg p-4">
            <input
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-colors p-4 rounded-lg"
            >
              <FileUp className="w-8 h-8 text-white/60 mb-2" />
              <p className="text-white/80 text-sm text-center">
                {fileName ? `Uploaded: ${fileName}` : 'Click to upload PDF/TXT resume'}
              </p>
            </label>
          </div>
        </div>

        {/* Original Resume Text */}
        <div className="space-y-3">
          <label className="text-white font-medium text-sm">Original Resume Content</label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste your resume content here or upload a file above..."
            className="w-full h-40 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 text-sm resize-none focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
          />
          <div className="flex justify-between items-center text-sm text-white/60">
            <span>{originalText.split(/\s+/).filter(word => word.length > 0).length} words</span>
            <button
              onClick={handleEnhanceResume}
              disabled={loading || !originalText.trim()}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Enhance with AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Resume Section */}
        {enhancedText && (
          <div className="space-y-3">
            <label className="text-white font-medium text-sm flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              AI Enhanced Resume
            </label>
            <textarea
              value={enhancedText}
              readOnly
              className="w-full h-64 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 text-white text-sm resize-none overflow-y-auto font-mono leading-relaxed"
            />

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Original: {originalText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                <span>Enhanced: {enhancedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                <button className="flex items-center text-purple-400 hover:text-purple-300">
                  <ArrowRight className="w-4 h-4 ml-2" />
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Improvements & Suggestions */}
        {(improvements.length > 0 || suggestions.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvements.length > 0 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="text-green-400 font-medium mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Improvements Made
                </h4>
                <ul className="text-sm text-white/80 space-y-1">
                  {improvements.slice(0, 4).map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1 h-1 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="text-blue-400 font-medium mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  AI Suggestions
                </h4>
                <ul className="text-sm text-white/80 space-y-1">
                  {suggestions.slice(0, 4).map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
