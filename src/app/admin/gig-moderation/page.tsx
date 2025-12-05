'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Search, Filter, Eye, Shield, Clock, RefreshCw } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

interface Gig {
  id: string
  title: string
  company: string
  category: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
  budgetRange: string
}

export default function GigModerationPage() {
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null)
  const [flagReason, setFlagReason] = useState('')
  const [updatingGigs, setUpdatingGigs] = useState<Set<string>>(new Set())

  const fetchGigs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/gigs/list')
      if (!response.ok) throw new Error('Failed to fetch gigs')

      const data = await response.json()
      setGigs(data.gigs || [])
    } catch (error) {
      toast.error('Failed to load gigs')
      console.error('Error fetching gigs:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateGigStatus = async (gigId: string, newStatus: 'approved' | 'rejected') => {
    if (updatingGigs.has(gigId)) return

    try {
      setUpdatingGigs(prev => new Set(prev).add(gigId))

      const response = await fetch('/api/admin/gigs/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gigId, newStatus })
      })

      if (!response.ok) throw new Error('Failed to update gig status')

      // Update local state
      setGigs(prev => prev.map(gig =>
        gig.id === gigId ? { ...gig, status: newStatus } : gig
      ))

      toast.success(`Gig ${newStatus} successfully`)
    } catch (error) {
      toast.error(`Failed to ${newStatus} gig`)
      console.error('Error updating status:', error)
    } finally {
      setUpdatingGigs(prev => {
        const next = new Set(prev)
        next.delete(gigId)
        return next
      })
    }
  }

  const flagGig = async (gigId: string) => {
    if (!flagReason.trim()) {
      toast.error('Please provide a reason for flagging')
      return
    }

    if (updatingGigs.has(gigId)) return

    try {
      setUpdatingGigs(prev => new Set(prev).add(gigId))

      const response = await fetch('/api/admin/gigs/flag', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gigId, reason: flagReason.trim() })
      })

      if (!response.ok) throw new Error('Failed to flag gig')

      // Remove flagged gig from list (or update status if keeping visible)
      setGigs(prev => prev.filter(gig => gig.id !== gigId))

      toast.success('Gig flagged for review')
      setSelectedGig(null)
      setFlagReason('')
    } catch (error) {
      toast.error('Failed to flag gig')
      console.error('Error flagging gig:', error)
    } finally {
      setUpdatingGigs(prev => {
        const next = new Set(prev)
        next.delete(gigId)
        return next
      })
    }
  }

  const handleViewGig = (gig: Gig) => {
    // In a real app, this would open a modal or navigate to gig details
    toast.info(`Viewing: ${gig.title}`)
  }

  useEffect(() => {
    fetchGigs()
  }, [])

  const getFilteredGigs = () => {
    if (!searchTerm) return gigs.filter(gig => gig.status === 'pending')

    const searchLower = searchTerm.toLowerCase()
    return gigs.filter(gig =>
      gig.title.toLowerCase().includes(searchLower) ||
      gig.company.toLowerCase().includes(searchLower)
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-300'
      case 'rejected': return 'bg-red-500/20 text-red-300'
      case 'pending': return 'bg-yellow-500/20 text-yellow-300'
      default: return 'bg-slate-500/20 text-slate-300'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <AdminGlassCard>
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Loading Gigs</h2>
            <p className="text-slate-400">Fetching gigs for moderation...</p>
          </div>
        </AdminGlassCard>
      </div>
    )
  }

  const filteredGigs = getFilteredGigs()
  const pendingCount = gigs.filter(gig => gig.status === 'pending').length
  const approvedCount = gigs.filter(gig => gig.status === 'approved').length
  const rejectedCount = gigs.filter(gig => gig.status === 'rejected').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-400" />
            Gig Moderation
          </h1>
          <p className="text-slate-300">Review and approve gig postings for quality and compliance</p>
        </div>
        <Button onClick={fetchGigs} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
            <div className="text-slate-400 text-xs">Pending Review</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-green-400">{approvedCount}</div>
            <div className="text-slate-400 text-xs">Approved</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <XCircle className="w-6 h-6 text-red-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-red-400">{rejectedCount}</div>
            <div className="text-slate-400 text-xs">Rejected</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <div className="text-2xl font-bold text-blue-400">{filteredGigs.length}</div>
            <div className="text-slate-400 text-xs">Showing</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Search */}
      <AdminGlassCard>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search gig titles or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </AdminGlassCard>

      {/* Gigs Table */}
      <AdminGlassCard>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Gig Reviews ({filteredGigs.length})</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-3 text-slate-300 font-semibold text-left">Gig Title</th>
                  <th className="pb-3 text-slate-300 font-semibold text-left">Posted By</th>
                  <th className="pb-3 text-slate-300 font-semibold text-left">Category</th>
                  <th className="pb-3 text-slate-300 font-semibold text-left">Posted On</th>
                  <th className="pb-3 text-slate-300 font-semibold text-center">Status</th>
                  <th className="pb-3 text-slate-300 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGigs.map((gig) => (
                  <tr key={gig.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-white text-sm truncate">
                          {gig.title}
                        </div>
                        <div className="text-slate-400 text-xs mt-1">
                          Budget: {gig.budgetRange}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-slate-300 text-sm">{gig.company}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-slate-300 text-sm">{gig.category}</div>
                    </td>
                    <td className="py-4">
                      <div className="text-slate-300 text-xs">
                        {new Date(gig.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <Badge className={getStatusColor(gig.status)}>
                        {gig.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => updateGigStatus(gig.id, 'approved')}
                          size="sm"
                          disabled={updatingGigs.has(gig.id) || gig.status === 'approved'}
                          className="bg-green-600 hover:bg-green-700 h-7 px-2"
                        >
                          <CheckCircle className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => updateGigStatus(gig.id, 'rejected')}
                          size="sm"
                          disabled={updatingGigs.has(gig.id) || gig.status === 'rejected'}
                          className="bg-red-600 hover:bg-red-700 h-7 px-2"
                        >
                          <XCircle className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => setSelectedGig(gig)}
                          size="sm"
                          disabled={updatingGigs.has(gig.id)}
                          className="bg-orange-600 hover:bg-orange-700 h-7 px-2"
                        >
                          <AlertTriangle className="w-3 h-3" />
                        </Button>
                        <Button
                          onClick={() => handleViewGig(gig)}
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 border-slate-600 hover:bg-slate-800"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGigs.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              {searchTerm ? 'No gigs match your search.' : 'No gigs to moderate at this time.'}
            </div>
          )}
        </div>
      </AdminGlassCard>

      {/* Flag Reason Modal */}
      {selectedGig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Flag Gig for Review</h3>
            </div>

            <div className="mb-4">
              <p className="text-slate-300 text-sm mb-1">Gig: <span className="text-white">{selectedGig.title}</span></p>
              <p className="text-slate-400 text-xs">by {selectedGig.company}</p>
            </div>

            <div className="mb-4">
              <label className="block text-slate-300 text-sm mb-2">Reason for flagging:</label>
              <textarea
                value={flagReason}
                onChange={(e) => setFlagReason(e.target.value)}
                placeholder="Enter reason for flagging this gig..."
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedGig(null)
                  setFlagReason('')
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => flagGig(selectedGig.id)}
                disabled={!flagReason.trim() || updatingGigs.has(selectedGig.id)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {updatingGigs.has(selectedGig.id) ? 'Flagging...' : 'Flag Gig'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
