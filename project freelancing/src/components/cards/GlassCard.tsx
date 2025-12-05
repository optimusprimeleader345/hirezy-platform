import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  title?: string
  children: ReactNode
  className?: string
}

export function GlassCard({ title, children, className }: GlassCardProps) {
  return (
    <div className={cn('glass-card neon-glow-purple rounded-xl border border-white/10', className)}>
      {title && (
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
