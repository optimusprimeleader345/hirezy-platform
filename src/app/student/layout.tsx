import { ReactNode } from 'react'
import '../../styles/theme-student.css'
import { StudentSidebar } from '@/components/Sidebar/StudentSidebar'
import { StudentTopbar } from '@/components/Topbar/StudentTopbar'

interface StudentLayoutProps {
  children: ReactNode
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="theme-student student-bg min-h-screen" style={{ backgroundImage: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2d2d2d 100%)' }}>
      <div className="fixed left-0 top-0 h-screen w-64 z-50">
        <StudentSidebar />
      </div>
      <div className="ml-64 flex flex-col min-h-screen">
        <StudentTopbar />
        <main className="flex-1 px-8 py-6 overflow-auto">
          <div className="space-y-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
