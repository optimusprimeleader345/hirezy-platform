'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { mockUser } from '@/lib/settings/mockUser'

export function ConnectedApps() {
  const [connections, setConnections] = useState(mockUser.connectedApps)

  const connect = async (app: 'github' | 'linkedin') => {
    try {
      const response = await fetch('/api/settings/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'connect', app }),
      })

      if (response.ok) {
        setConnections(prev => ({ ...prev, [app]: true }))
        alert(`${app.charAt(0).toUpperCase() + app.slice(1)} connected successfully!`)
      }
    } catch (error) {
      console.error('Failed to connect:', error)
      alert(`Failed to connect to ${app}`)
    }
  }

  const disconnect = async (app: 'github' | 'linkedin') => {
    try {
      const response = await fetch('/api/settings/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disconnect', app }),
      })

      if (response.ok) {
        setConnections(prev => ({ ...prev, [app]: false }))
        alert(`${app.charAt(0).toUpperCase() + app.slice(1)} disconnected successfully!`)
      }
    } catch (error) {
      console.error('Failed to disconnect:', error)
      alert(`Failed to disconnect from ${app}`)
    }
  }

  return (
    <div className="space-y-4">
      {/* GitHub */}
      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
        <div>
          <span className="text-white font-medium">GitHub</span>
          <p className="text-white/70 text-sm">Connect your GitHub account</p>
        </div>
        {connections.github ? (
          <Button
            onClick={() => disconnect('github')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={() => connect('github')}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Connect
          </Button>
        )}
      </div>

      {/* LinkedIn */}
      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
        <div>
          <span className="text-white font-medium">LinkedIn</span>
          <p className="text-white/70 text-sm">Connect your LinkedIn profile</p>
        </div>
        {connections.linkedin ? (
          <Button
            onClick={() => disconnect('linkedin')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={() => connect('linkedin')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  )
}
