'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent } from 'react'
import { Bell, Shield, User, Palette, Mail, Key, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function RecruiterSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  })

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FFFFFF]">Settings</h1>
        <p className="text-[#C9CFD6]">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-[#3EFFA8]" />
            <h2 className="text-xl font-bold text-[#FFFFFF]">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Full Name</label>
              <Input
                type="text"
                defaultValue="Jane Wilson"
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Company</label>
              <Input
                type="text"
                defaultValue="Tech Solutions Inc."
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Email</label>
              <Input
                type="email"
                defaultValue="jane.wilson@techsolutions.com"
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[#3EFFA8]" />
            <h2 className="text-xl font-bold text-[#FFFFFF]">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Current Password</label>
              <div className="relative">
                <Input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-[#111315] border-[#23262B] text-[#E2E8F0] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8] pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8A8F98] hover:text-[#3EFFA8]"
                >
                  {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">New Password</label>
              <Input
                type={showPasswords ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#111315] border-[#23262B] text-[#E2E8F0] placeholder-[#8A8F98] focus:ring-[#3EFFA8] focus:border-[#3EFFA8]"
                placeholder="Enter new password"
              />
            </div>
            <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
              <Key className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#3EFFA8]" />
            <h2 className="text-xl font-bold text-[#FFFFFF]">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FFFFFF] font-medium">Email Notifications</p>
                <p className="text-[#C9CFD6] text-sm">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                className="w-5 h-5 rounded border-[#23262B] bg-[#111315] text-[#3EFFA8] focus:ring-[#3EFFA8]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FFFFFF] font-medium">Push Notifications</p>
                <p className="text-[#C9CFD6] text-sm">Get push notifications</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                className="w-5 h-5 rounded border-[#23262B] bg-[#111315] text-[#3EFFA8] focus:ring-[#3EFFA8]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FFFFFF] font-medium">SMS Alerts</p>
                <p className="text-[#C9CFD6] text-sm">Critical alerts via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                className="w-5 h-5 rounded border-[#23262B] bg-[#111315] text-[#3EFFA8] focus:ring-[#3EFFA8]"
              />
            </div>
          </div>
        </Card>

        {/* Theme & Preferences */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-[#3EFFA8]" />
            <h2 className="text-xl font-bold text-[#FFFFFF]">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Default View</label>
              <select className="w-full bg-[#111315] border-[#23262B] text-[#E2E8F0] rounded-lg px-3 py-2 focus:ring-[#3EFFA8] focus:border-[#3EFFA8]">
                <option>Dashboard</option>
                <option>Applications</option>
                <option>Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Items Per Page</label>
              <select className="w-full bg-[#111315] border-[#23262B] text-[#E2E8F0] rounded-lg px-3 py-2 focus:ring-[#3EFFA8] focus:border-[#3EFFA8]">
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#FFFFFF] font-medium">Compact Mode</p>
                <p className="text-[#C9CFD6] text-sm">More data per screen</p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-[#23262B] bg-[#111315] text-[#3EFFA8] focus:ring-[#3EFFA8]"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black px-8 py-3 text-lg font-semibold"
        >
          <Mail className="w-5 h-5 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
