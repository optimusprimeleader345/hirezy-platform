'use client'

import { useState } from 'react'
import { Briefcase, CheckCircle, XCircle, Eye, DollarSign, Calendar } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { gigListings } from '@/lib/demoData'

interface GigWithStatus {
  id: number
  title: string
  description: string
  salary: string
  company: string
  skills: string[]
  location: string
  postedDate: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function AdminGigsPage() {
  const [gigs] = useState<GigWithStatus[]>(
    gigListings.map(gig => ({ ...gig, status: Math.random() > 0.7 ? 'approved' : 'pending' as 'pending' | 'approved' | 'rejected' }))
  )

  const [selectedGig, setSelectedGig] = useState<GigWithStatus | null>(null)
  const [sortBy, setSortBy] = useState('salary')

  const handleApprove = (gigId: number) => {
    console.log('Approve gig:', gigId)
  }

  const handleReject = (gigId: number) => {
    console.log('Reject gig:', gigId)
  }

  const getSalaryValue = (salary: string) => {
    const match = salary.match(/\$(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const sortedGigs = [...gigs]
    .filter(gig => gig.status === 'pending')
    .sort((a, b) => {
      if (sortBy === 'salary') return getSalaryValue(b.salary) - getSalaryValue(a.salary)
      if (sortBy === 'date') return Date.parse(b.postedDate) - Date.parse(a.postedDate)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Gig Moderation</h1>
        <p className="text-slate-300">Review and approve gig postings on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gigs.filter(g => g.status === 'pending').length}</div>
            <div className="text-slate-400">Pending Review</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gigs.filter(g => g.status === 'approved').length}</div>
            <div className="text-slate-400">Approved</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gigs.filter(g => g.status === 'rejected').length}</div>
            <div className="text-slate-400">Rejected</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">94.2%</div>
            <div className="text-slate-400">Approval Rate</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Controls */}
      <AdminGlassCard>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-white mr-2">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value="budget">Budget (High to Low)</option>
              <option value="date">Date (Newest)</option>
            </select>
          </div>
          <div className="text-slate-300">
            Total pending gigs: {sortedGigs.length}
          </div>
        </div>
      </AdminGlassCard>

      {/* Gigs Table */}
      <AdminGlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="pb-3 text-slate-300 font-semibold">Gig Details</th>
                <th className="pb-3 text-slate-300 font-semibold">Salary Range</th>
                <th className="pb-3 text-slate-300 font-semibold">Posted</th>
                <th className="pb-3 text-slate-300 font-semibold">Status</th>
                <th className="pb-3 text-slate-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedGigs.map((gig) => (
                <tr key={gig.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-4">
                    <div>
                      <div className="font-semibold text-white truncate max-w-xs">{gig.title}</div>
                      <div className="text-slate-400 text-sm">{gig.company}</div>
                      <div className="text-slate-500 text-xs line-clamp-2">{gig.description}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-white font-semibold">{gig.salary}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-blue-400 mr-1" />
                      <span className="text-slate-300">{gig.postedDate}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                        onClick={() => setSelectedGig(gig)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-600 border-green-600 text-white hover:bg-green-700"
                        onClick={() => handleApprove(gig.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-600 border-red-600 text-white hover:bg-red-700"
                        onClick={() => handleReject(gig.id)}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminGlassCard>

      {/* Gig Detail Modal */}
      {selectedGig && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{selectedGig.title}</h3>
              <button
                onClick={() => setSelectedGig(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-slate-300">Company:</span>
                <span className="text-white ml-2">{selectedGig.company}</span>
              </div>
              <div>
                <span className="text-slate-300">Salary Range:</span>
                <span className="text-green-400 ml-2 font-semibold">{selectedGig.salary}</span>
              </div>
              <div>
                <span className="text-slate-300">Location:</span>
                <span className="text-white ml-2">{selectedGig.location}</span>
              </div>
              <div>
                <span className="text-slate-300">Posted:</span>
                <span className="text-white ml-2">{selectedGig.postedDate}</span>
              </div>
              <div>
                <span className="text-slate-300">Skills:</span>
                <div className="ml-2 mt-1 flex flex-wrap gap-1">
                  {selectedGig.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-slate-300">Description:</span>
                <p className="text-white ml-2 mt-1">{selectedGig.description}</p>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove(selectedGig.id)
                    setSelectedGig(null)
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Gig
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-600 border-red-600 hover:bg-red-700"
                  onClick={() => {
                    handleReject(selectedGig.id)
                    setSelectedGig(null)
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Gig
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
