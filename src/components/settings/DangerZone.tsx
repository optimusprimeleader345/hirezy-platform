'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DeleteAccountModal } from './DeleteAccountModal'

export function DangerZone() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white/5 border border-red-500/20 rounded-lg">
        <h4 className="text-lg font-medium text-white mb-2">Delete Account</h4>
        <p className="text-white/70 text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Delete Account
        </Button>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  )
}
