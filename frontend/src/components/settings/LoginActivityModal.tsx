'use client'

import { X } from 'lucide-react'

interface LoginActivityModalProps {
  onClose: () => void
}

const mockLoginActivities = [
  {
    id: '1',
    device: 'Chrome on Windows',
    location: 'New York, USA',
    ip: '192.168.1.1',
    timestamp: '2023-11-27T08:30:00Z',
    current: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone',
    location: 'New York, USA',
    ip: '192.168.1.1',
    timestamp: '2023-11-26T15:45:00Z',
    current: false,
  },
  {
    id: '3',
    device: 'Firefox on Linux',
    location: 'California, USA',
    ip: '10.0.0.1',
    timestamp: '2023-11-25T09:20:00Z',
    current: false,
  },
]

export function LoginActivityModal({ onClose }: LoginActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Login Activity</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {mockLoginActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{activity.device}</span>
                {activity.current && (
                  <span className="text-green-400 text-sm bg-green-500/20 px-2 py-1 rounded">
                    Current
                  </span>
                )}
              </div>
              <div className="text-white/70 text-sm space-y-1">
                <div>{activity.location}</div>
                <div>IP: {activity.ip}</div>
                <div>{new Date(activity.timestamp).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
