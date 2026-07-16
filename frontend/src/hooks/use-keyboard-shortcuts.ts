'use client'

import { useEffect } from 'react'

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K → Open AI Assistant (like Raycast or VS Code)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        document.dispatchEvent(new CustomEvent('open-ai-assistant'))
        return
      }

      // Cmd/Ctrl + / → Quick Help
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault()
        document.dispatchEvent(new CustomEvent('open-quick-help'))
        return
      }

      // Cmd/Ctrl + Shift + C → Open Communication/Chat
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault()
        window.location.href = '/communication'
        return
      }

      // Student-specific shortcuts
      if (window.location.pathname.includes('/student')) {
        // Cmd/Ctrl + G → View Gigs
        if ((event.metaKey || event.ctrlKey) && event.key === 'g') {
          event.preventDefault()
          window.location.href = '/student/gigs'
          return
        }

        // Cmd/Ctrl + R → Resume AI
        if ((event.metaKey || event.ctrlKey) && event.key === 'r') {
          event.preventDefault()
          window.location.href = '/student/resume-ai'
          return
        }

        // Cmd/Ctrl + C → Career Coach
        if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
          event.preventDefault()
          window.location.href = '/student/career-coach'
          return
        }
      }

      // Recruiter-specific shortcuts
      if (window.location.pathname.includes('/recruiter')) {
        // Cmd/Ctrl + P → Post New Gig
        if ((event.metaKey || event.ctrlKey) && event.key === 'p') {
          event.preventDefault()
          window.location.href = '/recruiter/post-gig'
          return
        }

        // Cmd/Ctrl + A → AI Tools
        if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
          event.preventDefault()
          window.location.href = '/recruiter/ai/tools'
          return
        }

        // Cmd/Ctrl + C → Candidates
        if ((event.metaKey || event.ctrlKey) && event.key === 'c') {
          event.preventDefault()
          window.location.href = '/recruiter/candidates'
          return
        }
      }

      // Admin-specific shortcuts
      if (window.location.pathname.includes('/admin')) {
        // Cmd/Ctrl + D → Dashboard
        if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
          event.preventDefault()
          window.location.href = '/admin/dashboard'
          return
        }

        // Cmd/Ctrl + H → System Health
        if ((event.metaKey || event.ctrlKey) && event.key === 'h') {
          event.preventDefault()
          window.location.href = '/admin/health'
          return
        }

        // Cmd/Ctrl + U → User Analytics
        if ((event.metaKey || event.ctrlKey) && event.key === 'u') {
          event.preventDefault()
          window.location.href = '/admin/user-analytics'
          return
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])
}

// Helper functions for external use
export const triggerAIOpen = () => {
  document.dispatchEvent(new CustomEvent('open-ai-assistant'))
}

export const triggerQuickHelp = () => {
  document.dispatchEvent(new CustomEvent('open-quick-help'))
}
