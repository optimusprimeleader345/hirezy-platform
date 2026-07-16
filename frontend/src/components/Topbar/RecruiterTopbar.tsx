'use client'

import { useState } from 'react'
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function RecruiterTopbar() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3) // Mock notification count
  const router = useRouter()

  const handleLogout = () => {
    try {
      // Clear any stored session/auth data
      localStorage.removeItem('hirezy_auth')
      localStorage.clear() // Clear all localStorage

      // Force redirect to login page
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback redirect
      window.location.href = '/login'
    }
  }

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b border-[#1F1F1F] bg-transparent">
      <div className="flex-1 text-center">
        <div className="font-bold text-xl text-white">
          Recruiter Dashboard
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#4F46E5] rounded-full flex items-center justify-center shadow-md">
              <User className="h-5 w-5 text-white" />
            </div>
            <span className="text-gray-900 hidden md:block font-medium">Jane Wilson</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>

          {showProfileDropdown && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
              <button
                onClick={() => {
                  setShowProfileDropdown(false)
                  window.location.href = '/account/settings'
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={() => {
                  setShowProfileDropdown(false)
                  handleLogout()
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center transition-colors"
              >
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
