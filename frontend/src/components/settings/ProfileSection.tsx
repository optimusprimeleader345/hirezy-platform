'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockUser } from '@/lib/settings/mockUser'

export function ProfileSection() {
  const [formData, setFormData] = useState({
    bio: mockUser.bio,
    skills: mockUser.skills,
    linkedinUrl: mockUser.linkedinUrl,
    githubUrl: mockUser.githubUrl,
    portfolioUrl: mockUser.portfolioUrl,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileInfo: formData }),
      })

      if (response.ok) {
        alert('Profile information saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save profile information')
    }

    setIsSaving(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-white">Bio/About</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Tell employers about yourself..."
          rows={4}
          className="bg-white/5 border-white/10 text-white resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Skills</Label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 text-purple-300 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="bg-white/5 border-white/10 text-white flex-1"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
          />
          <Button
            type="button"
            onClick={handleAddSkill}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl" className="text-white">LinkedIn URL</Label>
          <Input
            id="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={(e) => handleChange('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="githubUrl" className="text-white">GitHub URL</Label>
          <Input
            id="githubUrl"
            value={formData.githubUrl}
            onChange={(e) => handleChange('githubUrl', e.target.value)}
            placeholder="https://github.com/username"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioUrl" className="text-white">Portfolio Link</Label>
          <Input
            id="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={(e) => handleChange('portfolioUrl', e.target.value)}
            placeholder="https://yourportfolio.dev"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}
