'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { type Gig } from '@/lib/ai/recruiter/mockData'

interface GigEditorProps {
  gig?: Gig | null
  onSave: (gigs: Partial<Gig>) => void
  onCancel: () => void
}

const JOB_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' }
]

const SAMPLE_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
  'CSS', 'HTML', 'AWS', 'Docker', 'MongoDB', 'GraphQL',
  'Redux', 'Next.js', 'Vue.js', 'Angular'
]

export function GigEditor({ gig, onSave, onCancel }: GigEditorProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [] as string[],
    budget: '',
    type: 'remote' as 'remote' | 'hybrid' | 'onsite',
   newSkill: ''
  })

  useEffect(() => {
    if (gig) {
      setFormData({
        title: gig.title,
        description: gig.description,
        skills: [...gig.skills],
        budget: gig.budget,
        type: gig.type,
        newSkill: ''
      })
    }
  }, [gig])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      budget: formData.budget,
      type: formData.type
    })
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
        newSkill: ''
      }))
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const generateAIJobs = async () => {
    // Mock AI response
    const aiSuggestions = {
      title: 'Senior Full Stack Developer',
      description: 'We are seeking a Senior Full Stack Developer to join our innovative team. You will work on cutting-edge technologies and collaborate with a world-class engineering team.',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'],
      budget: '$140,000 - $180,000'
    }

    setFormData(prev => ({
      ...prev,
      ...aiSuggestions
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-0 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">
            {gig ? 'Edit Gig' : 'Create New Gig'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Job Details</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateAIJobs}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              placeholder="e.g., Senior React Developer"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none h-32 resize-none"
              placeholder="Describe the role, responsibilities, and requirements..."
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Required Skills
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-purple-600/30 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, newSkill: e.target.value }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSkill(formData.newSkill.trim())
                  }
                }}
                className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="Add skill..."
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addSkill(formData.newSkill.trim())}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {SAMPLE_SKILLS.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-400 text-xs hover:bg-white/10 hover:border-white/20 hover:text-white"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Budget & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Budget *
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                placeholder="e.g., $100k - $130k"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'remote' | 'hybrid' | 'onsite' }))}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              >
                {JOB_TYPES.map(type => (
                  <option key={type.value} value={type.value} className="bg-gray-800">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="text-gray-300 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {gig ? 'Update Gig' : 'Create Gig'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
