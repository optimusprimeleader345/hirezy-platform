'use client'

import { Bell, Check, CheckCheck } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface NotificationType {
  id: number
  type: string
  message: string
  time: string
  read: boolean
}

interface NotificationsPanelProps {
  notifications: NotificationType[]
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'shortlisted':
        return '🎯'
      case 'interview':
        return '📅'
      case 'application':
        return '👁️'
      case 'job_match':
        return '🤖'
      default:
        return '🔔'
    }
  }

  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Notifications</h3>
        </div>
        {unreadCount > 0 && (
          <div className="px-3 py-1 bg-white/20 rounded-full">
            <span className="text-sm text-white font-semibold">{unreadCount} new</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {notifications.slice(0, 4).map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              notification.read
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-gradient-to-r from-white/10 to-white/5 border-white/20 shadow-lg'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1">
                <p className="text-sm text-white/90 leading-relaxed">
                  {notification.message}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-xs text-white/60">{notification.time}</span>
                  {notification.read ? (
                    <CheckCheck className="h-3 w-3 text-white/40" />
                  ) : (
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No notifications yet</p>
          </div>
        )}
      </div>

      {notifications.length > 4 && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <p className="text-center text-sm text-white/60">
            Showing 4 of {notifications.length} notifications
          </p>
        </div>
      )}
    </GlassCard>
  )
}
