"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  FileText,
  Briefcase,
  Package,
  Settings,
  Home,
  Brain,
  TrendingUp,
  MessageSquare,
  Calendar,
  Users,
  Shield,
  Activity,
  AlertTriangle,
  Bell,
  Zap,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studentMenu = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Gigs', href: '/student/gigs', icon: Briefcase },
  { name: 'Proposals', href: '/student/proposals', icon: Package },
  { name: 'Resume AI', href: '/student/resume', icon: FileText },
  { name: 'Settings', href: '/student/settings', icon: Settings },
]

const recruiterMenu = [
  { name: 'Dashboard', href: '/recruiter/dashboard', icon: Home },
  { name: 'Post Gig', href: '/recruiter/post-gig', icon: Briefcase },
  { name: 'Applications', href: '/recruiter/applications', icon: Package },
  { name: 'AI Email Generator', href: '/recruiter/email-generator', icon: Brain },
  { name: 'Interview Scheduler', href: '/recruiter/interview-scheduler', icon: Calendar },
  { name: 'Communication Hub', href: '/recruiter/communication', icon: MessageSquare },
  { name: 'Settings', href: '/recruiter/settings', icon: Settings },
]

const adminMenu = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Gig Moderation', href: '/admin/gigs', icon: Briefcase },
  { name: 'Analytics Suite', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Fraud Detection', href: '/admin/fraud', icon: Shield },
  { name: 'GDPR Compliance', href: '/admin/compliance', icon: Shield },
  { name: 'Audit Logs', href: '/admin/logs', icon: FileText },
  { name: 'System Health', href: '/admin/health', icon: Heart },
  { name: 'Notifications Center', href: '/admin/notifications', icon: Bell },
  { name: 'Communication Hub', href: '/admin/communication', icon: MessageSquare },
  { name: 'Admin Tools', href: '/admin/tools', icon: Zap },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

interface SidebarProps {
  role: 'student' | 'recruiter' | 'admin'
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const menus = role === 'student' ? studentMenu : role === 'recruiter' ? recruiterMenu : adminMenu

  return (
    <div className={cn(
      "h-full overflow-y-auto backdrop-blur-md shadow-2xl",
      role === 'admin'
        ? "bg-[#0f1324] border-r-2 border-blue-500/20"
        : "bg-card border-r border-border"
    )}>
      <div className="p-6">
        <h2 className={cn(
          "text-2xl font-bold",
          role === 'admin'
            ? "text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            : "text-primary"
        )}>
          Hirezy Admin
        </h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {menus.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden',
                    role === 'admin'
                      ? isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-blue-500/10 backdrop-blur-sm'
                      : isActive
                        ? 'bg-primary text-primary-foreground glow-effect'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3 text-blue-400" />
                  {item.name}
                  {isActive && role === 'admin' && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-400 to-purple-500"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
