'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockUser } from '@/lib/settings/mockUser'

export function AccountSection() {
  const [formData, setFormData] = useState({
    fullName: mockUser.fullName,
    email: mockUser.email,
    phone: mockUser.phone,
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Mock API call
    try {
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountInfo: formData }),
      })

      if (response.ok) {
        alert('Account information saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save:', error)
      alert('Failed to save account information')
    }

    setIsSaving(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-white">Full Name</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-white">Phone (Optional)</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter your phone number"
            className="bg-white/5 border-white/10 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="text-white">Role</Label>
          <Input
            id="role"
            value={mockUser.role}
            disabled
            className="bg-white/5 border-white/10 text-white/50 cursor-not-allowed"
          />
          <p className="text-xs text-white/50">Role cannot be changed</p>
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
