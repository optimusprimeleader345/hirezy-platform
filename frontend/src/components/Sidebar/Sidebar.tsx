"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  HelpCircle,
  Calendar,
  Users,
  Shield,
  Activity,
  AlertTriangle,
  Bell,
  Zap,
  Heart,
  Globe,
  Video,
  FileSignature,
  Search,
  Eye,
  Target,
  ShoppingCart,
  Smartphone,
  Award,
  DollarSign,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studentMenu = [
  // Dashboard
  { name: 'Dashboard', href: '/student/dashboard', icon: Home, category: 'Dashboard' },

  // Resume Features
  { name: '🤖 Resume AI', href: '/student/resume-ai', icon: FileText, category: 'Resume Features' },
  { name: '📝 Cover Letter AI', href: '/student/cover-letter', icon: FileSignature, category: 'Resume Features' },

  // AI Career Tools
  { name: '🎯 Career Coach', href: '/student/career-coach', icon: Brain, category: 'AI Career Tools' },
  { name: '🗣️ Interview AI', href: '/student/interview-ai', icon: MessageSquare, category: 'AI Career Tools' },
  { name: '📚 Learning Path', href: '/student/learning-path', icon: TrendingUp, category: 'AI Career Tools' },

  // Work Features
  { name: 'Gigs', href: '/student/gigs', icon: Briefcase, category: 'Work Features' },
  { name: 'Proposals', href: '/student/proposals', icon: Package, category: 'Work Features' },
  { name: 'Code Review', href: '/student/code-review', icon: Eye, category: 'Work Features' },
  { name: 'Assignments', href: '/student/assignments', icon: Target, category: 'Work Features' },

  // Analytics & Discovery
  { name: '🎯 Job Match', href: '/student/job-match', icon: Target, category: 'Analytics & Discovery' },
  { name: '📈 Market Intelligence', href: '/student/market-intelligence', icon: BarChart3, category: 'Analytics & Discovery' },

  // Account & Support
  { name: '💰 Wallet Section', href: '/student/wallet', icon: DollarSign, category: 'Account & Support' },
  { name: 'Settings', href: '/student/settings', icon: Settings, category: 'Account & Support' },
  { name: 'Help & Support', href: '/help', icon: Shield, category: 'Account & Support' },
]

const recruiterMenu = [
  // 1. Overview
  { name: 'Dashboard', href: '/recruiter/dashboard', icon: Home, category: 'Overview' },
  { name: 'Analytics Hub', href: '/recruiter/analytics', icon: Activity, category: 'Overview' },

  // 2. Hiring Pipeline
  { name: 'Post New Job', href: '/recruiter/post-gig', icon: Briefcase, category: 'Hiring Pipeline' },
  { name: 'Applications & Board', href: '/recruiter/applications', icon: Package, category: 'Hiring Pipeline' },
  { name: 'Candidate Database', href: '/recruiter/candidates', icon: Users, category: 'Hiring Pipeline' },

  // 3. AI Recruitment Suite
  { name: 'AI Tools Suite', href: '/recruiter/ai/tools', icon: Brain, category: 'AI Recruitment Suite' },
  { name: 'AI Assessment Tests', href: '/recruiter/assessment', icon: Target, category: 'AI Recruitment Suite' },
  { name: 'AI Video Interviews', href: '/recruiter/video-interviews', icon: Video, category: 'AI Recruitment Suite' },

  // 4. Workflow & Operations
  { name: 'Interview Scheduler', href: '/recruiter/interview-scheduling', icon: Calendar, category: 'Workflow & Operations' },
  { name: 'Communication Hub', href: '/recruiter/communication', icon: MessageSquare, category: 'Workflow & Operations' },
  { name: 'Contracts & Offers', href: '/recruiter/contracts', icon: FileSignature, category: 'Workflow & Operations' },

  // 5. Organization
  { name: 'Team Collaboration', href: '/recruiter/team', icon: Users, category: 'Organization' },
  { name: 'Company Settings', href: '/recruiter/settings', icon: Settings, category: 'Organization' },
]

const adminMenu = [
  // 1. Core Management
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home, category: 'Core Management' },
  { name: 'User Management', href: '/admin/users', icon: Users, category: 'Core Management' },
  { name: 'Gig & Content Moderation', href: '/admin/gig-moderation', icon: Briefcase, category: 'Core Management' },
  { name: 'Customers 360', href: '/admin/customers', icon: Globe, category: 'Core Management' },

  // 2. Financial & Intelligence
  { name: 'Finance & Revenue', href: '/admin/finance', icon: DollarSign, category: 'Financial & Intelligence' },
  { name: 'Platform Analytics', href: '/admin/analytics', icon: BarChart3, category: 'Financial & Intelligence' },
  { name: 'AI Behavior Analysis', href: '/admin/behavior-analysis', icon: TrendingUp, category: 'Financial & Intelligence' },
  { name: 'BI Reports Builder', href: '/admin/reports', icon: FileText, category: 'Financial & Intelligence' },
  { name: 'Enterprise AI Assistant', href: '/admin/ai-assistant', icon: Zap, category: 'Financial & Intelligence' },

  // 3. Security & Compliance
  { name: 'Fraud Detection Engine', href: '/admin/fraud', icon: Shield, category: 'Security & Compliance' },
  { name: 'GDPR Compliance', href: '/admin/compliance', icon: Heart, category: 'Security & Compliance' },
  { name: 'System Audit Logs', href: '/admin/logs', icon: FileText, category: 'Security & Compliance' },

  // 4. Operations & Settings
  { name: 'Monitoring & Health', href: '/admin/monitoring', icon: Activity, category: 'Operations & Settings' },
  { name: 'Workflow Automation', href: '/admin/workflows', icon: Zap, category: 'Operations & Settings' },
  { name: 'Support & Communications', href: '/admin/support-center', icon: MessageSquare, category: 'Operations & Settings' },
  { name: 'Platform Settings', href: '/admin/settings', icon: Settings, category: 'Operations & Settings' },
]

interface SidebarProps {
  role: 'student' | 'recruiter' | 'admin'
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [unreadCount, setUnreadCount] = useState<number>(0)

  const menus = role === 'student' ? studentMenu : role === 'recruiter' ? recruiterMenu : adminMenu

  // Fetch unread message count for recruiters
  useEffect(() => {
    if (role !== 'recruiter') return

    const fetchUnreadCount = async () => {
      try {
        // Get all conversations by fetching recent messages
        // Since we can't modify backend, we'll simulate by fetching messages
        // In a real implementation, this would be a dedicated unread count endpoint
        const response = await fetch('/api/recruiter/chat/get-messages?user1=demo-recruiter&user2=all-messages')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.messages) {
            // Count unread messages where receiver is current user
            const unread = data.messages.filter((msg: any) => msg.receiverId === 'demo-recruiter' && !msg.read).length
            setUnreadCount(unread)
          }
        }
      } catch (error) {
        console.error('Failed to fetch unread count:', error)
      }
    }

    // Initial fetch
    fetchUnreadCount()

    // Poll every 5 seconds (less frequent than chat polling to be less intrusive)
    const interval = setInterval(fetchUnreadCount, 5000)

    return () => clearInterval(interval)
  }, [role])

  return (
    <div className={cn(
      "h-full overflow-y-auto",
      role === 'admin'
        ? "backdrop-blur-md shadow-2xl bg-[#0f1324] border-r-2 border-blue-500/20"
        : role === 'recruiter'
        ? "bg-[#0B0E14] border-r border-[#1E232E] shadow-xl text-slate-200"
        : "backdrop-blur-md shadow-2xl bg-card border-r border-border"
    )}>
      <div className="p-6 pb-4">
        <h2 className={cn(
          "text-2xl font-black tracking-tight flex items-center gap-2",
          role === 'admin'
            ? "text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            : role === 'recruiter'
            ? "text-white"
            : "text-primary"
        )}>
          {role === 'recruiter' ? (
            <>
              <span className="bg-gradient-to-r from-[#3EFFA8] to-[#3B82F6] bg-clip-text text-transparent">Hirezy</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#3EFFA8]/10 text-[#3EFFA8] border border-[#3EFFA8]/30">Recruiter</span>
            </>
          ) : 'Hirezy Admin'}
        </h2>
      </div>

      {role === 'recruiter' && (
        <div className="px-4 pb-4">
          <Link
            href="/recruiter/post-gig"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#3EFFA8] to-[#25D366] text-slate-950 font-bold text-sm rounded-xl shadow-[0_4px_15px_rgba(62,255,168,0.25)] hover:shadow-[0_6px_20px_rgba(62,255,168,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            <Briefcase className="w-4 h-4 stroke-[2.5]" />
            <span>Post New Job</span>
          </Link>
        </div>
      )}

      <nav className="px-4 pb-8">
        <ul className="space-y-1.5">
          {(() => {
            let prevCategory = ''
            return menus.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              const iconColor = role === 'recruiter' 
                ? (isActive ? 'text-[#3EFFA8]' : 'text-slate-400 group-hover:text-slate-200 transition-colors') 
                : 'text-blue-400'
              const isCategoryChange = item.category !== prevCategory
              if (isCategoryChange) prevCategory = item.category
              return (
                <li key={item.href}>
                  {(role === 'recruiter' || role === 'admin' || role === 'student') && isCategoryChange && (
                    <h4 className={cn(
                      "mt-5 mb-2 px-3 text-[11px] font-bold uppercase tracking-wider",
                      role === 'recruiter'
                        ? "text-slate-400 border-t border-slate-800/60 pt-4 first:border-t-0 first:pt-0"
                        : role === 'student'
                        ? "text-slate-400"
                        : "text-slate-400"
                    )}>
                      {item.category}
                    </h4>
                  )}
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group',
                      role === 'admin'
                        ? isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-blue-500/10 backdrop-blur-sm'
                      : role === 'recruiter'
                        ? isActive
                          ? 'bg-[#3EFFA8]/10 text-[#3EFFA8] font-semibold border-l-4 border-[#3EFFA8] shadow-[0_0_15px_rgba(62,255,168,0.12)]'
                          : 'text-slate-300 hover:bg-white/[0.05] hover:text-white transition-all duration-200'
                        : isActive
                          ? 'bg-primary text-primary-foreground glow-effect'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105'
                    )}
                  >
                    {(isActive && role === 'admin') && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#6C63FF] to-[#4F46E5]"></div>
                    )}
                    <Icon className={`w-4 h-4 mr-3 ${iconColor}`} />
                    <span className="flex-1 truncate">{item.name}</span>

                    {/* Unread badge for recruiter communication items */}
                    {role === 'recruiter' && unreadCount > 0 && (
                      item.name === 'Communication Hub' ||
                      item.name === 'Applications & Board' ||
                      item.href.includes('applications')
                    ) && (
                      <span className="ml-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })
          })()}
        </ul>
      </nav>
    </div>
  )
}
