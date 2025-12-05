'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { Button } from '@/components/ui/button'
import { Plus, X, Upload, Brain } from 'lucide-react'

interface Props {
  onSkillsUpdate: (skills: string[]) => void
  currentSkills: string[]
}

const PREDEFINED_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++',
  'HTML/CSS', 'Tailwind CSS', 'Bootstrap', 'SQL', 'PostgreSQL', 'MongoDB', 'Redis',
  'AWS', 'Docker', 'Kubernetes', 'Git', 'REST APIs', 'GraphQL', 'CI/CD', 'Linux'
]

export function UserSkillsInput({ onSkillsUpdate, currentSkills }: Props) {
  const [inputSkill, setInputSkill] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleAddSkill = (skill: string) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !currentSkills.includes(trimmedSkill)) {
      const updatedSkills = [...currentSkills, trimmedSkill]
      onSkillsUpdate(updatedSkills)
    }
    setInputSkill('')
    setSuggestions([])
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = currentSkills.filter(skill => skill !== skillToRemove)
    onSkillsUpdate(updatedSkills)
  }

  const handleInputChange = (value: string) => {
    setInputSkill(value)

    if (value.length > 0) {
      const filtered = PREDEFINED_SKILLS.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase()) &&
        !currentSkills.includes(skill)
      )
      setSuggestions(filtered.slice(0, 8))
    } else {
      setSuggestions([])
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Mock resume parsing - in real app, this would parse the PDF/text
      const mockExtractedSkills = ['JavaScript', 'React', 'Node.js', 'Python']
      const newSkills = [...new Set([...currentSkills, ...mockExtractedSkills])]
      onSkillsUpdate(newSkills)

      alert(`Skills extracted from ${file.name}: ${mockExtractedSkills.join(', ')}`)
    }
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-purple-400 mr-3" />
          <h2 className="text-xl font-bold text-white">Tell Us Your Skills</h2>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputSkill}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type a skill (e.g., React, Python, Docker)"
                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(inputSkill)
                  }
                }}
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && inputSkill.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleAddSkill(suggestion)}
                      className="w-full text-left px-3 py-2 text-white hover:bg-white/10 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={() => handleAddSkill(inputSkill)} disabled={!inputSkill.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* Upload Section */}
          <div className="text-center">
            <label className="inline-flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg cursor-pointer transition-colors">
              <Upload className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-white/70">Upload Resume (Auto-extract Skills)</span>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-white/50 text-xs mt-2">
              Supports PDF, DOC, DOCX, TXT files
            </p>
          </div>
        </div>

        {/* Current Skills */}
        {currentSkills.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-white font-semibold">
              Your Skills ({currentSkills.length} added)
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-2 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 hover:bg-white/10 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skill Categories */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold">Popular Skill Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { category: 'Frontend', skills: ['React', 'Vue.js', 'Angular'] },
              { category: 'Backend', skills: ['Node.js', 'Python', 'Java'] },
              { category: 'Database', skills: ['SQL', 'MongoDB', 'PostgreSQL'] },
              { category: 'Cloud', skills: ['AWS', 'Azure', 'Docker'] }
            ].map((cat) => (
              <div key={cat.category} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h4 className="text-white font-medium text-sm mb-2">{cat.category}</h4>
                <div className="text-xs text-white/70 space-y-1">
                  {cat.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleAddSkill(skill)}
                      className="block hover:text-purple-400 transition-colors disabled:opacity-50"
                      disabled={currentSkills.includes(skill)}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
