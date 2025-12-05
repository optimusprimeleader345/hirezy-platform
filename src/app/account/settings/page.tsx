'use client'

import { useState } from 'react'
import { Settings, User, Shield, Bell } from 'lucide-react'

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'advanced', label: 'Advanced', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/admin/dashboard" className="text-slate-500 hover:text-slate-700">
              Dashboard
            </a>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Account Settings</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-8">
            <div className="text-center py-16">
              <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Account Settings
              </h2>
              <p className="text-slate-600 mb-6">
                Manage your account preferences, security settings, and personal information.
              </p>

              {activeTab === 'profile' && (
                <div className="max-w-md mx-auto text-left mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Settings</h3>
                  <p className="text-slate-600 text-sm">
                    Profile settings functionality will be implemented here.
                    You'll be able to update your name, bio, and contact information.
                  </p>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="max-w-md mx-auto text-left mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Settings</h3>
                  <p className="text-slate-600 text-sm">
                    Security settings will include password changes, two-factor authentication,
                    and login session management.
                  </p>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="max-w-md mx-auto text-left mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h3>
                  <p className="text-slate-600 text-sm">
                    Manage your notification preferences, theme settings, and other platform preferences.
                  </p>
                </div>
              )}

              {activeTab === 'advanced' && (
                <div className="max-w-md mx-auto text-left mt-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Advanced Settings</h3>
                  <p className="text-slate-600 text-sm">
                    Advanced options including data export, account deletion, and API access.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
