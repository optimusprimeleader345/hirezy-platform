import { ReactNode } from 'react'

interface AnalyticsCardProps {
  title?: string
  children: ReactNode
  className?: string
  glow?: boolean
}

export function AnalyticsCard({ title, children, className = '', glow = false }: AnalyticsCardProps) {
  return (
    <div className={`
      rounded-xl p-6 text-white neon-gradient-glow ${glow ? 'hover-glow' : ''} neon-card-hover overflow-hidden
      ${className}
    `}>
      {title && (
        <h3 className="text-xl font-bold gradient-text-primary mb-4">{title}</h3>
      )}
      {children}
    </div>
  )
}
