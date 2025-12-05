'use client'

import { Bell, CheckCircle, XCircle, Eye } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'

interface Notification {
  id: string
  type: string
  message: string
  timestamp: string
  read: boolean
}

export default function AdminNotificationsPage() {
  const notifications: Notification[] = [
    { id: "1", type: "system", message: "Database maintenance completed", timestamp: "2024-11-28 14:30", read: false },
    { id: "2", type: "moderation", message: "New gig moderation tickets", timestamp: "2024-11-28 13:15", read: false },
    { id: "3", type: "user", message: "VIP user signup", timestamp: "2024-11-28 12:00", read: true },
  ]

  const handleMarkRead = (id: string) => {
    console.log('Mark as read:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete notification:', id)
  }

  const filteredNotifications = notifications

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Notifications Center</h1>
        <p className="text-slate-300">System alerts and administrative notifications</p>
      </div>

      {/* Filters */}
      <AdminGlassCard>
        <div className="flex gap-4 mb-4">
          <select className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white">
            <option value="all">All Types</option>
            <option value="system">System</option>
            <option value="moderation">Moderation</option>
            <option value="user">User</option>
          </select>
        </div>
      </AdminGlassCard>

      {/* Notifications List */}
      <AdminGlassCard>
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'bg-slate-800 border-slate-700' : 'bg-blue-900/20 border-blue-600'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Bell className={`w-4 h-4 mr-2 ${notification.read ? 'text-slate-400' : 'text-blue-400'}`} />
                  <span className="text-sm text-slate-400 capitalize">{notification.type}</span>
                </div>
                <div className="text-xs text-slate-500">{notification.timestamp}</div>
              </div>
              <p className={`mb-3 ${notification.read ? 'text-slate-300' : 'text-white'}`}>{notification.message}</p>
              <div className="flex gap-2">
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMarkRead(notification.id)}
                    className="bg-slate-800 border-slate-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(notification.id)}
                  className="bg-red-600 border-red-600 hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>
      </AdminGlassCard>
    </div>
  )
}
