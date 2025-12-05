'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { RecruiterTopbar } from '@/components/Topbar/RecruiterTopbar'
import FloatingAIAssistant from '@/components/FloatingAIAssistant'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'

interface RecruiterLayoutProps {
  children: ReactNode
}

export default function RecruiterLayout({ children }: RecruiterLayoutProps) {
  const pathname = usePathname()

  // Enable keyboard shortcuts for recruiters
  useKeyboardShortcuts()

  return (
    <div className="min-h-screen bg-[#0D0F11] overflow-x-hidden">
      <div className="fixed top-0 left-0 w-[260px] h-screen bg-[#111315] p-6 overflow-y-auto border-r border-[#1A1D21] z-50">
        <Sidebar role="recruiter" />
      </div>
      <main className="ml-[260px] p-8 w-[calc(100%-260px)] overflow-x-hidden">
        <div className="mb-6">
          <RecruiterTopbar />
        </div>
        <div className="max-w-full">
          {children}
        </div>
      </main>

      {/* Universal AI Assistant - Always accessible for recruiters */}
      <FloatingAIAssistant
        userRole="recruiter"
        context={{
          currentPage: pathname,
          skills: ['recruiting', 'talent acquisition', 'hiring'],
          location: 'Corporate'
        }}
        position="bottom-left"
        size="medium"
      />
    </div>
  )
}
