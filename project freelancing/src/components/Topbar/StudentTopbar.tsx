'use client'

import { useState } from 'react'
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function StudentTopbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  return (
    <div className="h-16 glass-card border-b border-white/20 flex items-center justify-between px-6 relative">
      <div className="font-semibold text-lg text-gradient">
        Student Dashboard
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-white/70 hover:bg-white/5 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-black" />
            </div>
            <span className="text-white hidden md:block">John Doe</span>
            <ChevronDown className="h-4 w-4 text-white/70" />
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 glass-card border border-white/20 rounded-lg py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-white/70 hover:bg-white/5 hover:text-white flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <div className="border-t border-white/10 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-white/70 hover:bg-red-500/20 hover:text-red-400 flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </div>
  )
}
