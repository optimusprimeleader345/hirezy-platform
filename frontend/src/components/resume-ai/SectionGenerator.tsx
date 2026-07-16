'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { FileEdit, Plus, Loader2 } from 'lucide-react'

interface Props {
  resumeText: string
}

export function SectionGenerator({ resumeText }: Props) {
  const [generationType, setGenerationType] = useState<string>('summary')
  const [generatedContent, setGeneratedContent] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const sectionTypes = [
    { id: 'summary', name: 'Professional Summary', description: 'Create a compelling summary highlighting your value' },
    { id: 'experience', name: 'Experience Bullet Points', description: 'Generate strong experience descriptions' },
    { id: 'education', name: 'Education Highlights', description: 'Enhance educational achievements' },
    { id: 'projects', name: 'Projects Section', description: 'Detail your project contributions' },
    { id: 'certifications', name: 'Certifications', description: 'Add professional certifications' }
  ]

  const generateContent = async () => {
    setLoading(true)

    // Simulate AI generation based on type
    setTimeout(() => {
      let content = ''

      switch (generationType) {
        case 'summary':
          content = 'Dynamic full-stack developer with 5+ years of experience building scalable web applications using modern technologies. Proven track record of delivering high-performance solutions serving millions of users, with expertise in React, Node.js, and cloud architecture. Passionate about creating exceptional user experiences and solving complex technical challenges.'
          break
        case 'experience':
          content = '- Led development of e-commerce platform serving 100K+ daily users, improving conversion rates by 35%\n- Architected microservices infrastructure reducing deployment time by 60%\n- Mentored junior developers and established code review processes'
          break
        case 'education':
          content = 'Bachelor of Computer Science - Specialized in Software Engineering and Machine Learning\nDeans List (3.8/4.0 GPA) • Relevant Coursework: Advanced Algorithms, System Design, ML Engineering'
          break
        case 'projects':
          content = 'Open Source CLI Tool (Node.js) - 2.1K GitHub stars\n- Built command-line tool automating deployment workflows\n- Features: CI/CD integration, multi-cloud support, Docker containers\n- Technologies: Node.js, Commander.js, GitHub API, Docker'
          break
        case 'certifications':
          content = 'AWS Certified Solutions Architect Associate\nGoogle Cloud Professional Cloud Architect\nCertified Kubernetes Administrator (CKA)\nCertified Scrum Master (CSM)'
          break
      }

      setGeneratedContent(content)
      setLoading(false)
    }, 1500)
  }

  return (
    <GlassCard title="AI Section Generator">
      <div className="space-y-6">
        <div className="text-center">
          <FileEdit className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <h3 className="text-lg font-bold text-white mb-2">Generate Professional Resume Sections</h3>
          <p className="text-white/70 text-sm">AI creates tailored content for specific resume sections</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-white font-medium text-sm mb-2 block">Select Section Type</label>
            <select
              value={generationType}
              onChange={(e) => setGenerationType(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"
            >
              {sectionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-white/60 text-xs mt-1">
              {sectionTypes.find(t => t.id === generationType)?.description}
            </p>
          </div>

          <button
            onClick={generateContent}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Generate Section Content
              </>
            )}
          </button>
        </div>

        {generatedContent && (
          <div className="space-y-3">
            <h4 className="text-white font-semibold">Generated Content:</h4>
            <div className="bg-white/10 border border-white/20 rounded-lg p-4">
              <pre className="text-white/90 text-sm whitespace-pre-wrap font-sans">
                {generatedContent}
              </pre>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                Copy to Resume
              </button>
              <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm">
                Regenerate
              </button>
            </div>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
