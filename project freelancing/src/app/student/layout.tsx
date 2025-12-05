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
      <div className="flex">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentTopbar />
          <main className="flex-1 px-8 py-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
