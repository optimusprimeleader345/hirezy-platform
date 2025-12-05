'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Briefcase, Code, FileText, DollarSign } from 'lucide-react'

interface JobInputProps {
  onAnalyze: (jobData: JobData) => void
  loading?: boolean
}

export interface JobData {
  title: string
  skills: string[]
  description: string
  experienceLevel: string
  budgetRange?: string
}

export function JobInput({ onAnalyze, loading = false }: JobInputProps) {
  const [formData, setFormData] = useState({
    title: '',
    skills: '',
    description: '',
    experienceLevel: 'intermediate',
    budgetRange: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const jobData: JobData = {
      title: formData.title,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      description: formData.description,
      experienceLevel: formData.experienceLevel,
      budgetRange: formData.budgetRange || undefined
    }

    onAnalyze(jobData)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isValid = formData.title.trim() && formData.skills.trim() && formData.description.trim()

  return (
    <GlassCard title="Job Details">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2 flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Job Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="e.g., React Full-Stack Developer"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2 flex items-center">
            <Code className="w-4 h-4 mr-2" />
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => updateFormData('skills', e.target.value)}
            placeholder="e.g., React, Node.js, HTML, CSS, MongoDB"
            className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            required
          />
          <p className="text-white/60 text-sm mt-1">Separate skills with commas</p>
        </div>

        <div>
          <label className="block text-white font-medium mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Job Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Describe the job requirements, responsibilities, and expectations..."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            required
          />
          <p className="text-white/60 text-sm mt-1">Include key responsibilities and technologies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Experience Level</label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => updateFormData('experienceLevel', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:border-purple-400 focus:outline-none"
            >
              <option value="beginner">Beginner (0-2 years)</option>
              <option value="intermediate">Intermediate (2-5 years)</option>
              <option value="advanced">Advanced (5+ years)</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Budget Range (Optional)
            </label>
            <input
              type="text"
              value={formData.budgetRange}
              onChange={(e) => updateFormData('budgetRange', e.target.value)}
              placeholder="e.g., ₹50,000 - ₹100,000"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing Job Match...
            </>
          ) : (
            <>
              <Briefcase className="w-5 h-5 mr-2" />
              Calculate Job Match Score
            </>
          )}
        </button>
      </form>
    </GlassCard>
  )
}
