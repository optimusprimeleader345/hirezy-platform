'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { mockUser } from '@/lib/settings/mockUser'

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
]

export function LanguageSection() {
  const [selectedLanguage, setSelectedLanguage] = useState(mockUser.language)
  const [isSaving, setIsSaving] = useState(false)

  const handleLanguageChange = async (language: string) => {
    setIsSaving(true)
    try {
      // In a real app, this would store in localStorage or call API
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language }),
      })

      if (response.ok) {
        setSelectedLanguage(language)
        alert('Language updated successfully! (This is a mock - language change would be implemented here)')
      }
    } catch (error) {
      console.error('Failed to update language:', error)
      alert('Failed to update language')
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {languages.map((language) => (
          <label
            key={language.code}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div>
              <span className="text-white font-medium">{language.name}</span>
              <p className="text-white/70 text-sm">{language.nativeName}</p>
            </div>
            <input
              type="radio"
              name="language"
              value={language.code}
              checked={selectedLanguage === language.code}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
            />
          </label>
        ))}
      </div>

      <div className="pt-4">
        <Button
          onClick={() => handleLanguageChange(selectedLanguage)}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full"
        >
          {isSaving ? 'Saving...' : 'Apply Language'}
        </Button>
      </div>
    </div>
  )
}
