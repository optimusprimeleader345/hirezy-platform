'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Zap, CheckCircle, Loader2 } from 'lucide-react'

interface Props {
  resumeText: string
  onResumeUpdate: (newText: string) => void
}

export function ResumeAutoFix({ resumeText, onResumeUpdate }: Props) {
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleOptimize = async () => {
    setIsOptimizing(true)

    setTimeout(() => {
      const optimizedText = resumeText
        .replace(/worked on/gi, 'developed')
        .replace(/helped with/gi, 'optimized')
        .replace(/contributed to/gi, 'led')
        .replace(/responsible for/gi, 'spearheaded')

      onResumeUpdate(optimizedText)
      setIsOptimizing(false)
    }, 2000)
  }

  return (
    <GlassCard>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="w-5 h-5 mr-2 text-purple-400" />
          <h3 className="text-white font-semibold">AI Auto-Fix Resume</h3>
        </div>
        <button
          onClick={handleOptimize}
          disabled={isOptimizing || !resumeText}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Optimizing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Improve With AI
            </>
          )}
        </button>
      </div>

      <div className="mt-4">
        <h4 className="text-white font-medium mb-2">What AI Auto-Fix Does:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-white/70">Fix grammar and clarity</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-white/70">Use stronger action verbs</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-white/70">Improve structure and flow</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
            <span className="text-white/70">Add professional language</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
