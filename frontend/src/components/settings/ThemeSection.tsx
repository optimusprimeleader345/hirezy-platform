'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { mockUser } from '@/lib/settings/mockUser'

const themeOptions = [
  { id: 'light', name: 'Light', description: 'Clean and bright theme' },
  { id: 'dark', name: 'Dark', description: 'Easy on the eyes in low light' },
  { id: 'system', name: 'System Default', description: 'Follows your system preference' },
]

export function ThemeSection() {
  const [selectedTheme, setSelectedTheme] = useState(mockUser.theme)
  const [isSaving, setIsSaving] = useState(false)

  const handleThemeChange = async (theme: string) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme }),
      })

      if (response.ok) {
        setSelectedTheme(theme)
        alert('Theme updated successfully! (This is a mock - theme toggle would be implemented here)')
      }
    } catch (error) {
      console.error('Failed to update theme:', error)
      alert('Failed to update theme')
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {themeOptions.map((theme) => (
          <label
            key={theme.id}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div>
              <span className="text-white font-medium">{theme.name}</span>
              <p className="text-white/70 text-sm">{theme.description}</p>
            </div>
            <input
              type="radio"
              name="theme"
              value={theme.id}
              checked={selectedTheme === theme.id}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
            />
          </label>
        ))}
      </div>

      <div className="pt-4">
        <Button
          onClick={() => handleThemeChange(selectedTheme)}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full"
        >
          {isSaving ? 'Saving...' : 'Apply Theme'}
        </Button>
      </div>
    </div>
  )
}
