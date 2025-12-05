'use client'

import { useState } from 'react'
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RecruiterTopbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between relative">
      <div className="font-semibold text-lg text-purple-600">
        Recruiter Dashboard
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-900 hidden md:block">Jane Wilson</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center">
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
