'use client'

import { useState } from 'react'
import { Shield, Users, Download, Trash2, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { users } from '@/lib/demoData'

interface DataRequest {
  id: string
  userName: string
  email: string
  requestType: 'export' | 'delete'
  status: 'pending' | 'completed' | 'processing'
  requestedAt: string
  completedAt?: string
  deadline: string
}

export default function AdminCompliancePage() {
  const [dataRequests] = useState<DataRequest[]>([
    {
      id: '1',
      userName: 'Alice Johnson',
      email: 'alice@example.com',
      requestType: 'export',
      status: 'pending',
      requestedAt: '2024-11-25 14:30',
      deadline: '2024-12-02 14:30'
    },
    {
      id: '2',
      userName: 'Bob Smith',
      email: 'bob@example.com',
      requestType: 'delete',
      status: 'processing',
      requestedAt: '2024-11-20 10:15',
      deadline: '2024-11-27 10:15'
    },
    {
      id: '3',
      userName: 'Carol Williams',
      email: 'carol@example.com',
      requestType: 'export',
      status: 'completed',
      requestedAt: '2024-11-15 09:00',
      completedAt: '2024-11-22 11:30',
      deadline: '2024-11-22 09:00'
    }
  ])

  const handleProcessRequest = (requestId: string) => {
    console.log('Processing data request:', requestId)
  }

  const handleCompleteRequest = (requestId: string) => {
    console.log('Completing data request:', requestId)
  }

  const handleDeleteRequest = (requestId: string) => {
    console.log('Deleting data request:', requestId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">GDPR Compliance Center</h1>
        <p className="text-slate-300">Manage data privacy requests and compliance monitoring</p>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{dataRequests.filter(r => r.status === 'pending').length}</div>
            <div className="text-slate-400 text-xs">Pending Requests</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{dataRequests.filter(r => r.status === 'processing').length}</div>
            <div className="text-slate-400 text-xs">In Progress</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{dataRequests.filter(r => r.status === 'completed').length}</div>
            <div className="text-slate-400 text-xs">Completed</div>
          </div>
        </AdminGlassCard>
        <AdminGlassCard>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">98.7%</div>
            <div className="text-slate-400 text-xs">Compliance Rate</div>
          </div>
        </AdminGlassCard>
      </div>

      {/* Data Retention Compliance */}
      <AdminGlassCard title="Data Retention & Compliance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-white text-xl font-bold">90</span>
            </div>
            <div className="text-white text-sm font-semibold">Days Retention</div>
            <div className="text-slate-400 text-xs">Europen Standard</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-white text-sm font-semibold">GDPR Compliant</div>
            <div className="text-slate-400 text-xs">Auto-delete old data</div>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-white text-sm font-semibold">Time-Based</div>
            <div className="text-slate-400 text-xs">Automated purging</div>
          </div>
        </div>
      </AdminGlassCard>

      {/* Data Requests Management */}
      <AdminGlassCard title="GDPR Data Requests">
        <div className="space-y-4">
          {dataRequests.map((request) => (
            <div key={request.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-white font-semibold">{request.userName}</div>
                  <div className="text-slate-400 text-sm">{request.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {request.status}
                  </span>
                  {request.requestType === 'export' ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 capitalize">
                      {request.requestType}
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 capitalize">
                      {request.requestType}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-slate-400 mb-3">
                <div>
                  <div className="font-semibold">Requested</div>
                  <div>{new Date(request.requestedAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="font-semibold">Deadline</div>
                  <div className={request.deadline < new Date().toISOString() ? 'text-red-400' : 'text-green-400'}>
                    {new Date(request.deadline).toLocaleDateString()}
                  </div>
                </div>
                {request.completedAt && (
                  <div>
                    <div className="font-semibold">Completed</div>
                    <div>{new Date(request.completedAt).toLocaleDateString()}</div>
                  </div>
                )}
                <div>
                  <div className="font-semibold">Time Left</div>
                  <div className={
                    new Date(request.deadline) < new Date() ? 'text-red-400' :
                    new Date(request.deadline) < new Date(Date.now() + 24 * 60 * 60 * 1000) ? 'text-yellow-400' :
                    'text-green-400'
                  }>
                    {request.status === 'completed' ? 'Completed' :
                     Math.ceil((new Date(request.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 0 ? 'Overdue' :
                     Math.ceil((new Date(request.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' days'}
                  </div>
                </div>
              </div>

              {request.status === 'pending' && (
                <div className="flex gap-2">
                  <Button onClick={() => handleProcessRequest(request.id)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Start Processing
                  </Button>
                  <Button onClick={() => handleDeleteRequest(request.id)} variant="outline" className="bg-red-600 border-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Request
                  </Button>
                </div>
              )}

              {request.status === 'processing' && (
                <div className="flex gap-2">
                  <Button onClick={() => handleCompleteRequest(request.id)} className="bg-gradient-to-r from-green-600 to-teal-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Complete
                  </Button>
                  <Button onClick={() => handleDeleteRequest(request.id)} variant="outline" className="bg-red-600 border-red-600 hover:bg-red-700">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}

              {request.status === 'completed' && (
                <div className="flex gap-2">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Download className="w-4 h-4 mr-1" />
                    Download Data
                  </Button>
                  <span className="text-green-400 text-sm flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Request fulfilled on time
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminGlassCard>

      {/* Compliance Monitoring */}
      <AdminGlassCard title="Compliance Monitoring">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-white font-semibold mb-3">Data Processing Activities</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Cookie Consent</span>
                <span className="text-green-400">✅ Full</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Privacy Policy</span>
                <span className="text-green-400">✅ Updated</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Data Encryption</span>
                <span className="text-green-400">✅ AES-256</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Risk Assessments</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">DPIA Completed</span>
                <span className="text-green-400">✅ Yes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Security Audit</span>
                <span className="text-green-400">✅ Q4 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Incident Response</span>
                <span className="text-amber-400">⚠️ Review Due</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Global Compliance</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">EU GDPR</span>
                <span className="text-green-400">✅ Compliant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">California CCPA</span>
                <span className="text-green-400">✅ Compliant</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">India PDPA</span>
                <span className="text-green-400">✅ Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </AdminGlassCard>
    </div>
  )
}
