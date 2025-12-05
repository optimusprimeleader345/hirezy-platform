import { ReactNode } from 'react'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Topbar } from '@/components/Topbar'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-theme min-h-screen bg-[#0f1324] text-white">
      <div className="fixed left-0 top-0 h-full w-72 z-40">
        <Sidebar role="admin" />
      </div>
      <div className="ml-72 flex flex-col">
        <Topbar role="admin" />
        <main className="flex-1 p-8 overflow-auto bg-[#0a0d1a]">
          {children}
        </main>
      </div>
    </div>
  )
}
