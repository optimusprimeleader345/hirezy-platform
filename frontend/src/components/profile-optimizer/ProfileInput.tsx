'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { FileText, Github } from 'lucide-react'

interface ProfileInputProps {
  onUpdate: (data: any) => void
}

export function ProfileInput({ onUpdate }: ProfileInputProps) {
  const [formData, setFormData] = useState({
    summary: '',
    about: '',
    skills: '',
    githubUrl: '',
    certifications: '',
    projects: ''
  })

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdate(updated)
  }

  return (
    <GlassCard title="Profile Information">
      <div className="space-y-6">
        <div>
          <label className="block text-white font-medium mb-2">Professional Summary</label>
          <textarea
            value={formData.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Enter your professional summary..."
            className="w-full h-24 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2">About Section</label>
          <textarea
            value={formData.about}
            onChange={(e) => handleChange('about', e.target.value)}
            placeholder="Describe yourself..."
            className="w-full h-32 bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Skills (comma-separated)</label>
            <input
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder="React, Node.js, Python..."
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2 flex items-center">
              <Github className="w-4 h-4 mr-2" />
              GitHub URL
            </label>
            <input
              value={formData.githubUrl}
              onChange={(e) => handleChange('githubUrl', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Certifications</label>
            <input
              value={formData.certifications}
              onChange={(e) => handleChange('certifications', e.target.value)}
              placeholder="AWS Certified, Google Analytics..."
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Projects</label>
            <input
              value={formData.projects}
              onChange={(e) => handleChange('projects', e.target.value)}
              placeholder="E-commerce app, Task manager..."
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
