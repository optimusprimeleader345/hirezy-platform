'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  FileText,
  Briefcase,
  Package,
  Settings,
  Home,
  Target,
  Trello,
  FolderOpen,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import { cn } from '@/lib/utils'


const studentMenu = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Gigs', href: '/student/gigs', icon: Briefcase },
  { name: 'Proposals', href: '/student/proposals', icon: Package },
  { name: 'Skill Gap Analyzer', href: '/student/skill-gap', icon: Target },
  { name: 'Career Path Guidance', href: '/student/career-path', icon: Trello },
  { name: 'Market Demand Intelligence', href: '/student/market-demand', icon: BarChart3 },
  { name: 'Job-Match Scoring', href: '/student/job-match', icon: Target },
  { name: 'Profile Optimizer', href: '/student/profile-optimizer', icon: Trophy },
  { name: 'AI Interview Coach', href: '/student/interview-ai', icon: Target },
  { name: 'Performance Analytics', href: '/student/performance', icon: Target },
  { name: 'Portfolio Builder', href: '/student/portfolio', icon: FolderOpen },
  { name: 'Communication Hub', href: '/student/communication', icon: MessageCircle },
  { name: 'Resume AI', href: '/student/resume-ai', icon: FileText },
  { name: 'Settings', href: '/student/settings', icon: Settings },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 glass-card min-h-screen border-r border-white/20">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gradient">
          Hirezy
        </h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {studentMenu.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-lg transition-all duration-200 group',
                    isActive
                      ? 'bg-white/10 text-white neon-glow border border-white/20'
                      : 'text-white/70 hover:bg-white/5 hover:text-white hover:neon-glow'
                  )}
                >
                  <Icon className={cn('w-5 h-5 mr-3 transition-colors', isActive ? 'text-white' : 'group-hover:text-white')} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
