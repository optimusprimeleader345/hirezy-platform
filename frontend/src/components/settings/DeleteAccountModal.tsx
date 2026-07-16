'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DeleteAccountModalProps {
  onClose: () => void
}

export function DeleteAccountModal({ onClose }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== 'delete') {
      alert('Please type "DELETE" to confirm')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/settings/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirm: true }),
      })

      if (response.ok) {
        alert('Account deleted successfully!')
        onClose()
        // In a real app, this would redirect to login or home
      } else {
        alert('Failed to delete account')
      }
    } catch (error) {
      console.error('Failed to delete account:', error)
      alert('Failed to delete account')
    }
    setIsDeleting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-red-400">Delete Account</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <h4 className="text-red-200 font-medium mb-2">Danger Zone</h4>
            <p className="text-white/80 text-sm">
              This action is permanent and cannot be undone. All your data, including profiles,
              proposals, and communications will be permanently erased.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm" className="text-white">
              Type <span className="font-bold text-red-400">DELETE</span> to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              className="bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex space-x-4">
          <Button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={confirmText.toLowerCase() !== 'delete' || isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-500"
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </div>
    </div>
  )
}
