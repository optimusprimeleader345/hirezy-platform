'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Button as ShadcnButton } from '@/components/ui/button'
import { Loader2, Copy, RotateCcw, Send } from 'lucide-react'
import { EMAIL_TYPES, generateEmail } from '@/lib/ai/recruiter/emailGenerator'

interface EmailGeneratorFormProps {
  initialCandidateName?: string
  initialGigTitle?: string
  initialType?: string
}

export default function EmailGeneratorForm({
  initialCandidateName = '',
  initialGigTitle = '',
  initialType = 'followup'
}: EmailGeneratorFormProps) {
  const [selectedType, setSelectedType] = useState(initialType)
  const [context, setContext] = useState('')
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  // Auto-fill context when initial props are provided
  useEffect(() => {
    const recruiterName = 'John Smith'
    let initialContext = `candidateName: ${initialCandidateName || '[Candidate Name]'}, gigTitle: ${initialGigTitle || '[Gig Title]'}, recruiterName: ${recruiterName}`

    if (initialCandidateName && initialGigTitle) {
      initialContext += `\n\nContext: Follow up with ${initialCandidateName} regarding their application for the ${initialGigTitle} position.`
    }

    setContext(initialContext)
  }, [initialCandidateName, initialGigTitle])

  const handleGenerateEmail = async () => {
    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      // Parse context to extract variables
      const contextLines = context.split('\n')
      const contextObj: any = {}

      contextLines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(s => s.trim())
          contextObj[key] = value
        }
      })

      const email = generateEmail(selectedType, contextObj)
      setGeneratedEmail(email)
    } catch (error) {
      console.error('Error generating email:', error)
      setGeneratedEmail('Error generating email. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  const handleRegenerate = () => {
    handleGenerateEmail()
  }

  const selectedEmailType = EMAIL_TYPES.find(type => type.id === selectedType)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          AI Email Generator
        </h1>
        <p className="text-white/80 text-lg">
          Generate professional recruitment emails instantly with AI
        </p>
      </div>

      {/* Main Form Card */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl">
        <div className="space-y-6">
          {/* Email Type Selection */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Email Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {EMAIL_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            {selectedEmailType && (
              <p className="text-sm text-gray-300 mt-2">{selectedEmailType.description}</p>
            )}
          </div>

          {/* Context Input */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">
              Context & Details
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="candidateName: [Name], gigTitle: [Position], recruiterName: [Your Name]

Add any special instructions, tone preferences, or additional context here..."
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 h-44 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleGenerateEmail}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Email...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Email
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Generated Email Output */}
      {generatedEmail && (
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Generated {selectedEmailType?.label}
              </h3>
              <div className="flex gap-2">
                <ShadcnButton
                  onClick={handleCopyEmail}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </ShadcnButton>
                <ShadcnButton
                  onClick={handleRegenerate}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                  disabled={isGenerating}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </ShadcnButton>
              </div>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <pre className="text-white/90 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {generatedEmail}
              </pre>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
