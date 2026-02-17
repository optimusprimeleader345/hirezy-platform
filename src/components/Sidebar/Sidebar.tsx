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
  // Main Dashboard
  { name: 'Dashboard', href: '/recruiter/dashboard', icon: Home, category: 'Main' },

  // AI Tools Hub
  { name: '🤖 AI Tools Hub', href: '/recruiter/ai/tools', icon: Brain, category: 'AI Hub' },
  { name: '🧠 Hiring Recommendations', href: '/recruiter/recommendations', icon: Zap, category: 'AI Hub' },

  // NEW AI Features
  { name: '📋 AI Application Review', href: '/recruiter/ai-review', icon: Shield, category: 'AI Hub' },
  { name: '❓ Screening Questions', href: '/recruiter/screening-questions', icon: MessageSquare, category: 'AI Hub' },
  { name: '📅 Interview Scheduling', href: '/recruiter/interview-scheduling', icon: Calendar, category: 'AI Hub' },

  // Original AI Features
  { name: 'AI Assessment', href: '/recruiter/assessment', icon: Brain, category: 'AI Features' },
  { name: 'AI Email Generator', href: '/recruiter/email-generator', icon: MessageSquare, category: 'AI Features' },
  { name: 'Video Interviews', href: '/recruiter/video-interviews', icon: Video, category: 'AI Features' },

  // Hiring Workflow
  { name: 'Post Job', href: '/recruiter/post-gig', icon: Briefcase, category: 'Hiring' },
  { name: 'Applications', href: '/recruiter/applications', icon: Package, category: 'Hiring' },
  { name: 'Pipeline', href: '/recruiter/pipeline', icon: TrendingUp, category: 'Hiring' },

  // Advanced Tools
  { name: '📊 Advanced Analytics', href: '/recruiter/advanced-analytics', icon: BarChart3, category: 'AI Hub' },
  { name: 'Interview Scheduler', href: '/recruiter/interview-scheduler', icon: Calendar, category: 'Tools' },
  { name: 'Candidate Comparison', href: '/recruiter/comparison', icon: BarChart3, category: 'Tools' },
  { name: 'Remote Proctoring', href: '/recruiter/proctoring', icon: Eye, category: 'Tools' },
  { name: 'Contract Generation', href: '/recruiter/contracts', icon: FileSignature, category: 'Tools' },
  { name: 'Talent Marketplace', href: '/recruiter/marketplace', icon: ShoppingCart, category: 'Tools' },
  { name: 'Candidate Sourcing', href: '/recruiter/sourcing', icon: Search, category: 'Tools' },
  { name: 'Analytics', href: '/recruiter/analytics', icon: Activity, category: 'Tools' },
  { name: 'Communication Hub', href: '/recruiter/communication', icon: MessageSquare, category: 'Tools' },

  // Management
  { name: 'Team Collaboration', href: '/recruiter/team', icon: Users, category: 'Management' },
  { name: 'Compliance Hub', href: '/recruiter/compliance', icon: Shield, category: 'Management' },
  { name: 'Settings', href: '/recruiter/settings', icon: Settings, category: 'Management' },
  { name: 'Help & Support', href: '/help', icon: MessageSquare, category: 'Management' },
]

const adminMenu = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: Home, category: 'Management' },
  { name: '👥 User Management', href: '/admin/users', icon: Users, category: 'Management' },
  { name: '📋 Gig Moderation', href: '/admin/gig-moderation', icon: Briefcase, category: 'Content' },

  { name: '💰 Finance & Analytics', href: '/admin/finance', icon: DollarSign, category: 'Finance' },
  { name: '📊 Platform Analytics', href: '/admin/analytics/platform', icon: BarChart3, category: 'Analytics' },
  { name: '📈 User Analytics', href: '/admin/user-analytics', icon: BarChart3, category: 'Analytics' },
  { name: '🤖 AI Behavior Analysis', href: '/admin/behavior-analysis', icon: TrendingUp, category: 'Analytics' },

  { name: '🛡️ Fraud Detection', href: '/admin/fraud', icon: Shield, category: 'Security' },
  { name: '📞 Support Center', href: '/admin/support-center', icon: MessageSquare, category: 'Support' },

  { name: '📊 Monitoring Dashboard', href: '/admin/monitoring', icon: Activity, category: 'Enterprise' },
  { name: '🧠 Platform Intelligence', href: '/admin/platform-insights', icon: Zap, category: 'Enterprise' },
  { name: '📋 BI Reports Builder', href: '/admin/reports', icon: BarChart3, category: 'Enterprise' },
  { name: '🤖 AI Assistant', href: '/admin/ai-assistant', icon: MessageSquare, category: 'Enterprise' },

  { name: '🌍 Global Operations', href: '/admin/global', icon: Globe, category: 'Operations' },
  { name: '👥 Customers 360', href: '/admin/customers', icon: Users, category: 'Operations' },
  { name: '⚡ Workflow Automation', href: '/admin/workflows', icon: Zap, category: 'Operations' },

  { name: '✅ GDPR Compliance', href: '/admin/compliance', icon: Shield, category: 'Compliance' },
  { name: '📝 Audit Logs', href: '/admin/logs', icon: FileText, category: 'Compliance' },
  { name: '❤️ System Health', href: '/admin/health', icon: Heart, category: 'Compliance' },

  { name: '🔔 Notifications Center', href: '/admin/notifications', icon: Bell, category: 'Communication' },
  { name: '💬 Communication Hub', href: '/admin/communication', icon: MessageSquare, category: 'Communication' },

  { name: '🛠️ Admin Tools', href: '/admin/tools', icon: Zap, category: 'Tools' },
  { name: '⚙️ Settings', href: '/admin/settings', icon: Settings, category: 'Tools' },
  { name: '🆘 Help & Support', href: '/help', icon: Shield, category: 'Tools' },
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
        const response = await fetch('/pages/api/recruiter/chat/get-messages?user1=demo-recruiter&user2=all-messages')
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
        ? "bg-[#111315] border-r border-[#23262B] shadow-lg"
        : "backdrop-blur-md shadow-2xl bg-card border-r border-border"
    )}>
      <div className="p-6">
        <h2 className={cn(
          "text-2xl font-bold",
          role === 'admin'
            ? "text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            : role === 'recruiter'
            ? "text-white"
            : "text-primary"
        )}>
          {role === 'recruiter' ? 'Hirezy' : 'Hirezy Admin'}
        </h2>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {(() => {
            let prevCategory = ''
            return menus.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              const iconColor = role === 'recruiter' ? 'text-gray-600' : 'text-blue-400'
              const isCategoryChange = item.category !== prevCategory
              if (isCategoryChange) prevCategory = item.category
              return (
                <li key={item.href}>
                  {(role === 'recruiter' || role === 'admin' || role === 'student') && isCategoryChange && (
                    <h4 className={cn(
                      "mt-6 mb-2 px-4 text-xs font-semibold uppercase tracking-wider",
                      role === 'recruiter'
                        ? "text-gray-400"
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
                      'flex items-center px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden',
                      role === 'admin'
                        ? isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:shadow-md hover:shadow-blue-500/10 backdrop-blur-sm'
                      : role === 'recruiter'
                        ? isActive
                          ? 'bg-[rgba(62,255,168,0.08)] text-white border-l-3 border-[#3EFFA8] shadow-[0_0_10px_rgba(62,255,168,0.3)]'
                          : 'text-[#C9CFD6] hover:bg-[rgba(62,255,168,0.05)] hover:text-[#3EFFA8] transition-all duration-200'
                        : isActive
                          ? 'bg-primary text-primary-foreground glow-effect'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105'
                    )}
                  >
                    {(isActive && role === 'recruiter') || (isActive && role === 'admin') && (
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#6C63FF] to-[#4F46E5]"></div>
                    )}
                    <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
                    <span className="flex-1">{item.name}</span>

                    {/* Unread badge for recruiter communication items */}
                    {role === 'recruiter' && unreadCount > 0 && (
                      item.name === 'Communication Hub' ||
                      item.name === 'Applications' ||
                      item.href.includes('applications')
                    ) && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
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
