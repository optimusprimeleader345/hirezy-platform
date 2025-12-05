import { ReactNode } from 'react'

interface AdminGlassCardProps {
  title?: string
  children: ReactNode
}

export function AdminGlassCard({ title, children }: AdminGlassCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl">
      {title && (
        <div className="mb-4">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  )
}
