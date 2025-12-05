'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { mockUser } from '@/lib/settings/mockUser'

export function NotificationSettings() {
  const [settings, setSettings] = useState(mockUser.notifications)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notifications: settings }),
      })

      if (response.ok) {
        alert('Notification preferences saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save notification preferences')
    }
    setIsSaving(false)
  }

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-white text-sm font-medium">Job Match Notifications</Label>
            <p className="text-white/70 text-xs">Get notified about job opportunities that match your profile</p>
          </div>
          <input
            type="checkbox"
            checked={settings.jobMatches}
            onChange={(e) => updateSetting('jobMatches', e.target.checked)}
            className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-white text-sm font-medium">New Gig Notifications</Label>
            <p className="text-white/70 text-xs">Receive alerts when new gigs are posted</p>
          </div>
          <input
            type="checkbox"
            checked={settings.newGigs}
            onChange={(e) => updateSetting('newGigs', e.target.checked)}
            className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-white text-sm font-medium">Interview Reminders</Label>
            <p className="text-white/70 text-xs">Get reminded about upcoming interviews</p>
          </div>
          <input
            type="checkbox"
            checked={settings.interviewReminders}
            onChange={(e) => updateSetting('interviewReminders', e.target.checked)}
            className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-white text-sm font-medium">Message Alerts</Label>
            <p className="text-white/70 text-xs">Notifications for messages from recruiters</p>
          </div>
          <input
            type="checkbox"
            checked={settings.messageAlerts}
            onChange={(e) => updateSetting('messageAlerts', e.target.checked)}
            className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-white font-medium mb-3">Notification Method</h4>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label className="text-white text-sm font-medium">Email Notifications</Label>
              <p className="text-white/70 text-xs">Send notifications via email in addition to in-app</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
              className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  )
}
