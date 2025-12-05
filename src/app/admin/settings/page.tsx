'use client'

import { Settings, Save, RefreshCw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

export default function AdminSettingsPage() {
  const handleSave = () => {
    console.log('Saving settings...')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-300">Platform configuration and admin preferences</p>
      </div>

      {/* Theme Settings */}
      <AdminGlassCard title="Theme Selector">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">UI Theme</label>
            <select defaultValue="dark" className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="animations" defaultChecked className="mr-3" />
            <label htmlFor="animations" className="text-slate-300">Enable animations</label>
          </div>
        </div>
      </AdminGlassCard>

      {/* Platform Settings */}
      <AdminGlassCard title="Platform Configuration">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-300 mb-2">Commission Rate</label>
            <input
              type="number"
              defaultValue="10"
              step="0.1"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
            <span className="text-xs text-slate-500">%</span>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Free Gigs Limit</label>
            <input
              type="number"
              defaultValue="5"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
            <span className="text-xs text-slate-500">gigs per month</span>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Session Timeout</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
            <span className="text-xs text-slate-500">minutes</span>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Max File Size</label>
            <input
              type="number"
              defaultValue="10"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
            <span className="text-xs text-slate-500">MB</span>
          </div>
        </div>
      </AdminGlassCard>

      {/* Notification Settings */}
      <AdminGlassCard title="Notification Settings">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Email notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Gig approval alerts</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Fraud detection alerts</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">System alerts</span>
            <input type="checkbox" />
          </div>
        </div>
      </AdminGlassCard>

      {/* Admin Profile */}
      <AdminGlassCard title="Admin Profile Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Display Name</label>
            <input
              type="text"
              defaultValue="Super Admin"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              defaultValue="admin@hiredzy.com"
              className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Timezone</label>
            <select defaultValue="UTC+5:30" className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
              <option value="UTC+5:30">IST (UTC+5:30)</option>
              <option value="UTC+0">GMT (UTC+0)</option>
              <option value="UTC-5">EST (UTC-5)</option>
            </select>
          </div>
        </div>
      </AdminGlassCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
