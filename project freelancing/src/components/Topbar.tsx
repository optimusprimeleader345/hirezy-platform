import { User, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  role: 'student' | 'recruiter' | 'admin'
}

export function Topbar({ role }: TopbarProps) {
  return (
    <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
      <div className="font-semibold text-lg text-foreground">
        {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </div>
  )
}
