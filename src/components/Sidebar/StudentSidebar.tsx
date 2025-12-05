'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
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
  Shield,
  Mail,
  Calendar,
  Code,
  BookOpen,
  TrendingUp,
  Clock,
  MessageSquare,
  Award,
  Star,
  Gift,
  ChevronDown,
  ChevronRight,
  Flame,
  CheckCircle,
  Circle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studentMenu = [
  // Dashboard
  { name: 'Dashboard', href: '/student/dashboard', icon: Home, category: 'Overview' },

  // Work Management
  { name: 'Gigs', href: '/student/gigs', icon: Briefcase, category: 'Work Management' },
  { name: 'Proposals', href: '/student/proposals', icon: Package, category: 'Work Management' },
  { name: 'Assignments', href: '/student/assignments', icon: Calendar, category: 'Work Management' },
  { name: 'Code Review', href: '/student/code-review', icon: Code, category: 'Work Management' },

  // Document Tools
  { name: 'Resume AI', href: '/student/resume-ai', icon: FileText, category: 'Document Tools' },
  { name: 'Cover Letters', href: '/student/cover-letter', icon: Mail, category: 'Document Tools' },

  // Career Development
  { name: 'Learning Path AI', href: '/student/learning-path', icon: BookOpen, category: 'Career Development' },
  { name: 'Career Path Guidance', href: '/student/career-path', icon: Trello, category: 'Career Development' },
  { name: 'Skill Gap Analyzer', href: '/student/skill-gap', icon: Target, category: 'Career Development' },

  // AI Assistants
  { name: 'AI Interview Coach', href: '/student/interview-ai', icon: MessageSquare, category: 'AI Assistants' },
  { name: 'AI Career Timeline Predictor', href: '/student/career-timeline', icon: Clock, category: 'AI Assistants' },

  // Analytics & Intelligence
  { name: 'Job-Match Scoring', href: '/student/job-match', icon: TrendingUp, category: 'Analytics & Intelligence' },
  { name: 'Performance Analytics', href: '/student/performance', icon: BarChart3, category: 'Analytics & Intelligence' },
  { name: 'Market Demand Intelligence', href: '/student/market-demand', icon: TrendingUp, category: 'Analytics & Intelligence' },
  { name: 'Real-time Job Market Intelligence', href: '/student/market-intelligence', icon: BarChart3, category: 'Analytics & Intelligence' },

  // Profile Management
  { name: 'Profile Optimizer', href: '/student/profile-optimizer', icon: Trophy, category: 'Profile Management' },
  { name: 'Portfolio Builder', href: '/student/portfolio', icon: FolderOpen, category: 'Profile Management' },

  // Communications & Settings
  { name: 'Communication Hub', href: '/student/communication', icon: MessageCircle, category: 'Communications & Settings' },
  { name: 'Settings', href: '/student/settings', icon: Settings, category: 'Communications & Settings' },
  { name: 'Help & Support', href: '/help', icon: Shield, category: 'Communications & Settings' },


]

export function StudentSidebar() {
  const pathname = usePathname()
  const [gameCenterExpanded, setGameCenterExpanded] = useState(false)

  // Mock game data
  const gameStats = {
    level: 12,
    xp: 2850,
    xpToNext: 1150,
    totalXp: 14750,
    rank: 247,
    activeStreaks: 7,
    multiplier: 1.5,
    questsCompleted: 2,
    questsTotal: 3,
    badgesUnlocked: 4,
    badgesTotal: 8
  }

  return (
    <div className="h-full flex flex-col bg-slate-900/90 backdrop-blur-md border-r border-white/20">
      <div className="p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gradient">
          Hirezy
        </h2>
      </div>
      <nav className="px-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <ul className="space-y-2 pb-6">
          {(() => {
            let prevCategory = ''
            return studentMenu.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              const isCategoryChange = item.category !== prevCategory
              if (isCategoryChange) prevCategory = item.category
              return (
                <li key={item.href}>
                  {isCategoryChange && (
                    <h4 className="mt-6 mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </h4>
                  )}
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-lg transition-all duration-200 group sidebar-hover-glow',
                      isActive
                        ? 'text-white sidebar-active-highlight'
                        : 'text-white/70 hover:text-white'
                    )}
                  >
                    <Icon className={cn('w-5 h-5 mr-3 transition-colors', isActive ? 'text-white' : 'group-hover:text-white')} />
                    {item.name}
                  </Link>
                </li>
              )
            })
          })()}

          {/* Game Center - Expandable Section */}
          <li className="mt-6">
            <h4 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Game Center
            </h4>
            <div className="space-y-1">
              {/* Collapsed Game Center Header */}
              <button
                onClick={() => setGameCenterExpanded(!gameCenterExpanded)}
                className="w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group sidebar-hover-glow text-white/70 hover:text-white"
              >
                <Trophy className="w-5 h-5 mr-3 transition-colors group-hover:text-yellow-400" />
                <div className="flex-1 flex items-center justify-between">
                  <span>Game Center</span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>LVL {gameStats.level}</span>
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{gameStats.activeStreaks}</span>
                  </div>
                  {gameCenterExpanded ?
                    <ChevronDown className="w-4 h-4 transition-transform" /> :
                    <ChevronRight className="w-4 h-4 transition-transform" />
                  }
                </div>
              </button>

              {/* Expanded Game Center Content */}
              {gameCenterExpanded && (
                <div className="ml-4 space-y-2 animate-in slide-in-from-top duration-300">
                  {/* Level & XP Progress */}
                  <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-yellow-400 font-semibold">⭐ Level {gameStats.level}: Rising Star</span>
                      <span className="text-xs text-cyan-400">{gameStats.xp}/{gameStats.xp + gameStats.xpToNext} XP</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-cyan-400 rounded-full transition-all duration-1000"
                        style={{ width: `${(gameStats.xp / (gameStats.xp + gameStats.xpToNext)) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 space-y-2">
                    {/* Streak Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-400" />
                        <span className="text-xs text-white">{gameStats.activeStreaks}-day streak</span>
                      </div>
                      <span className="text-xs text-orange-300">1.5x bonus</span>
                    </div>

                    {/* Quest Completion */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-white">Daily Quests</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {gameStats.questsCompleted === gameStats.questsTotal ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <div className="flex gap-1">
                            {Array.from({ length: gameStats.questsTotal }, (_, i) => (
                              i < gameStats.questsCompleted ? (
                                <CheckCircle key={i} className="w-3 h-3 text-green-400" />
                              ) : (
                                <Circle key={i} className="w-3 h-3 text-slate-500" />
                              )
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-slate-400">{gameStats.questsCompleted}/{gameStats.questsTotal}</span>
                      </div>
                    </div>

                    {/* Badge Progress */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-white">Achievements</span>
                      </div>
                      <span className="text-xs text-yellow-300">{gameStats.badgesUnlocked}/{gameStats.badgesTotal} unlocked</span>
                    </div>

                    {/* Leaderboard Rank */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-white">Leaderboard</span>
                      </div>
                      <span className="text-xs text-red-300">#{gameStats.rank} (Great!)</span>
                    </div>

                    {/* Reward Available */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-white">Rewards</span>
                      </div>
                      <span className="text-xs text-purple-300">+50 XP available</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 space-y-1">
                    <Link
                      href="/student/achievements"
                      className="flex items-center px-3 py-2 text-xs rounded-md bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-white/80 hover:text-white"
                    >
                      <Award className="w-4 h-4 mr-2 text-yellow-400" />
                      View Achievements
                    </Link>
                    <Link
                      href="/student/leaderboards"
                      className="flex items-center px-3 py-2 text-xs rounded-md bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-white/80 hover:text-white"
                    >
                      <TrendingUp className="w-4 h-4 mr-2 text-red-400" />
                      View Leaderboards
                    </Link>
                    <Link
                      href="/student/rewards"
                      className="flex items-center px-3 py-2 text-xs rounded-md bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors text-yellow-300 hover:text-yellow-200"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Claim Rewards
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}
