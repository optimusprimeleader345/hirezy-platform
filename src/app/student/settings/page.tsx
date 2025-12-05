'use client'

import { Settings, User, Bell, Shield, Palette, Users, Trash2 } from 'lucide-react'
import { AccountSection } from '@/components/settings/AccountSection'
import { ProfileSection } from '@/components/settings/ProfileSection'
import { NotificationSettings } from '@/components/settings/NotificationSettings'
import { SecuritySection } from '@/components/settings/SecuritySection'
import { ThemeSection } from '@/components/settings/ThemeSection'
import { LanguageSection } from '@/components/settings/LanguageSection'
import { ConnectedApps } from '@/components/settings/ConnectedApps'
import { DangerZone } from '@/components/settings/DangerZone'

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 space-y-12">
      <div className="text-center mb-12">
        <Settings className="w-16 h-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-4">
          Settings
        </h1>
        <p className="text-white/70">Manage your account preferences and settings</p>
      </div>

      {/* Account Information */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Account Information</h2>
        </div>
        <AccountSection />
      </div>

      {/* Profile Settings */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
        </div>
        <ProfileSection />
      </div>

      {/* Notification Settings */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
        </div>
        <NotificationSettings />
      </div>

      {/* Security Settings */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Security</h2>
        </div>
        <SecuritySection />
      </div>

      {/* Theme & Personalization */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <Palette className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Theme & Personalization</h2>
        </div>
        <div className="space-y-8">
          <ThemeSection />
          <LanguageSection />
        </div>
      </div>

      {/* Connected Apps */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">Connected Apps</h2>
        </div>
        <ConnectedApps />
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 shadow-xl shadow-purple-500/10">
        <div className="flex items-center gap-3 mb-8">
          <Trash2 className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
        </div>
        <DangerZone />
      </div>
    </div>
  )
}
