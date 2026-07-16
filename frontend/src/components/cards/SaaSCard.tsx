import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SaaSCardProps {
  title?: string
  children: ReactNode
}

export function SaaSCard({ title, children }: SaaSCardProps) {
  return (
    <Card className="bg-white shadow-md border border-gray-200">
      {title && (
        <CardHeader>
          <CardTitle className="text-gray-900">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
