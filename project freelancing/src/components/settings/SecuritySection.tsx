'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { mockUser } from '@/lib/settings/mockUser'
import { LoginActivityModal } from './LoginActivityModal'

export function SecuritySection() {
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [changeForm, setChangeForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(mockUser.security.twoFactorEnabled)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (changeForm.newPassword !== changeForm.confirmPassword) {
      alert('New password and confirmation do not match')
      return
    }

    try {
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passwordChange: changeForm }),
      })

      if (response.ok) {
        alert('Password changed successfully!')
        setChangeForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        alert('Failed to change password')
      }
    } catch (error) {
      console.error('Failed to change password:', error)
      alert('Failed to change password')
    }
  }

  const toggleTwoFactor = async () => {
    try {
      const newValue = !twoFactorEnabled
      const response = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ twoFactorEnabled: newValue }),
      })

      if (response.ok) {
        setTwoFactorEnabled(newValue)
        alert(`Two-factor authentication ${newValue ? 'enabled' : 'disabled'} successfully!`)
      }
    } catch (error) {
      console.error('Failed to update 2FA:', error)
      alert('Failed to update two-factor authentication')
    }
  }

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">Change Password</h4>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={changeForm.currentPassword}
              onChange={(e) => setChangeForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-white">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={changeForm.newPassword}
              onChange={(e) => setChangeForm(prev => ({ ...prev, newPassword: e.target.value }))}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={changeForm.confirmPassword}
              onChange={(e) => setChangeForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              required
              className="bg-white/5 border-white/10 text-white"
            />
          </div>

          <Button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Update Password
          </Button>
        </form>
      </div>

      {/* 2FA Toggle */}
      <div className="border-t border-white/10 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white text-sm font-medium">Two-Factor Authentication</Label>
            <p className="text-white/70 text-xs">Add an extra layer of security to your account</p>
          </div>
          <input
            type="checkbox"
            checked={twoFactorEnabled}
            onChange={toggleTwoFactor}
            className="ml-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
          />
        </div>
      </div>

      {/* Login Activity */}
      <div className="border-t border-white/10 pt-4 space-y-4">
        <h4 className="text-white font-medium">Login Activity</h4>
        <div className="text-white/70 text-sm">
          Last login: {new Date(mockUser.security.lastLogin).toLocaleString()}
        </div>
        <Button
          onClick={() => setShowActivityModal(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          Review Login Activity
        </Button>
      </div>

      {showActivityModal && (
        <LoginActivityModal onClose={() => setShowActivityModal(false)} />
      )}
    </div>
  )
}
