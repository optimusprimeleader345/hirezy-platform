import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { RecruiterTopbar } from '@/components/Topbar/RecruiterTopbar'

interface RecruiterLayoutProps {
  children: ReactNode
}

export default function RecruiterLayout({ children }: RecruiterLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex">
        <Sidebar role="recruiter" />
        <div className="flex-1 flex flex-col">
          <RecruiterTopbar />
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
