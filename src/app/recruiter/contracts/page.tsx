'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  FileSignature,
  FileText,
  CheckCircle,
  Clock,
  Send,
  Download,
  Eye,
  Edit,
  Plus,
  Users,
  Calendar,
  DollarSign,
  Zap,
  AlertTriangle,
  Mail,
  Share,
  XCircle
} from 'lucide-react'

export default function ContractsPage() {
  const [selectedContract, setSelectedContract] = useState<string | null>('1')

  // Mock contract data
  const contracts = [
    {
      id: '1',
      candidateName: 'Alex Chen',
      position: 'Senior React Developer',
      status: 'pending_signature',
      value: '$120,000',
      type: 'Employment Agreement',
      created: '2025-01-25',
      expiresAt: '2025-02-01',
      integrations: ['DocuSign', 'LinkedIn', 'ATS'],
      aiOptimizations: [
        'Salary benchmarked against 500+ similar roles',
        'Clause customization based on experience level',
        'Legal compliance checked across 12 states'
      ]
    },
    {
      id: '2',
      candidateName: 'Sarah Kumar',
      position: 'UX Designer',
      status: 'sent',
      value: '$85,000',
      type: 'Offer Letter',
      created: '2025-01-24',
      expiresAt: '2025-01-31',
      integrations: ['DocuSign', 'Workday'],
      aiOptimizations: [
        'Custom non-compete clause for design industry',
        'Equity terms optimized for startup environment',
        'Relocation assistance included'
      ]
    },
    {
      id: '3',
      candidateName: 'David Kim',
      position: 'Data Scientist',
      status: 'signed',
      value: '$145,000',
      type: 'Employment Contract',
      created: '2025-01-22',
      expiresAt: '2025-01-25',
      integrations: ['DocuSign', 'Greenhouse', 'ADP'],
      aiOptimizations: [
        'IP assignment clause tailored for ML work',
        'Bonus structure based on model performance metrics',
        'Special provisions for data privacy compliance'
      ]
    },
    {
      id: '4',
      candidateName: 'Emma Rodriguez',
      position: 'DevOps Engineer',
      status: 'draft',
      value: '$110,000',
      type: 'Contract Employment',
      created: '2025-01-25',
      expiresAt: '2025-02-05',
      integrations: ['ADP'],
      aiOptimizations: [
        'Contract-to-hire conversion clauses included',
        'Remote work policy aligned with company standards',
        'Performance metrics tied to cloud cost optimization'
      ]
    }
  ]

  // Mock contract templates
  const contractTemplates = [
    { name: 'Standard Employment Agreement', type: 'employment', usage: 450 },
    { name: 'Executive Compensation Package', type: 'executive', usage: 23 },
    { name: 'Consultant Agreement', type: 'contract', usage: 127 },
    { name: 'Internship Offer', type: 'intern', usage: 89 },
    { name: 'Remote Work Addendum', type: 'addendum', usage: 234 }
  ]

  const selectedContractData = contracts.find(c => c.id === selectedContract)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <FileSignature className="w-8 h-8 text-[#3EFFA8]" />
            Contract Generation
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            AI-powered offer letters and contracts with automated legal compliance
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Create New Contract
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <FileText className="w-4 h-4 mr-2" />
            Templates Library
          </Button>
        </div>
      </div>

      {/* Contract Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <FileSignature className="w-6 h-6 text-[#3EFFA8]" />
            <span className="text-[#C9CFD6] text-sm">Active Contracts</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{contracts.filter(c => c.status !== 'signed').length}</div>
          <p className="text-[#8A8F98] text-xs">Pending completion</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-[#60A5FA]" />
            <span className="text-[#C9CFD6] text-sm">Signed Contracts</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">{contracts.filter(c => c.status === 'signed').length}</div>
          <p className="text-[#8A8F98] text-xs">This month</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-[#F59E0B]" />
            <span className="text-[#C9CFD6] text-sm">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">$460K</div>
          <p className="text-[#8A8F98] text-xs">Contract value</p>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-[#EF4444]" />
            <span className="text-[#C9CFD6] text-sm">AI Generated</span>
          </div>
          <div className="text-2xl font-bold text-[#FFFFFF]">98%</div>
          <p className="text-[#8A8F98] text-xs">Of all contracts</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Contracts List */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Recent Contracts</h3>
            <div className="space-y-3">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  onClick={() => setSelectedContract(contract.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedContract === contract.id
                      ? 'bg-[#3EFFA8] text-black border border-[#3EFFA8]'
                      : 'bg-[#111315] border border-[#23262B] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className={`w-8 h-8 ${selectedContract === contract.id ? 'bg-black text-[#3EFFA8]' : 'bg-[#3EFFA8]'}`}>
                      <AvatarFallback className={selectedContract === contract.id ? 'text-[#3EFFA8]' : 'text-black'}>
                        {contract.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        selectedContract === contract.id ? 'text-black' : 'text-[#FFFFFF]'
                      }`}>
                        {contract.candidateName}
                      </p>
                      <Badge variant="outline" className={`text-xs ${
                        selectedContract === contract.id
                          ? 'border-black text-black'
                          : contract.status === 'signed'
                            ? 'border-green-400 text-green-400'
                            : contract.status === 'sent'
                              ? 'border-blue-400 text-blue-400'
                              : 'border-yellow-400 text-yellow-400'
                      }`}>
                        {contract.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${
                    selectedContract === contract.id ? 'text-black' : 'text-[#FFD700]'
                  }`}>
                    {contract.value}
                  </div>
                  <div className={`text-xs ${
                    selectedContract === contract.id ? 'text-black opacity-70' : 'text-[#C9CFD6]'
                  }`}>
                    {contract.type}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contract Templates */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Templates</h3>
            <div className="space-y-3">
              {contractTemplates.slice(0, 4).map((template, i) => (
                <div key={i} className="p-3 bg-[#111315] rounded-lg">
                  <p className="text-[#FFFFFF] text-sm font-medium mb-1">{template.name}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#C9CFD6]">Used {template.usage} times</span>
                    <Button size="sm" variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] text-xs h-6">
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Integration Status */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Integrations</h3>
            <div className="space-y-3">
              {['DocuSign', 'ADP', 'Greenhouse', 'LinkedIn'].map((integration, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[#C9CFD6] text-sm">{integration}</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              ))}
            </div>
            <Button className="w-full mt-3 bg-[#FFD700] hover:bg-[#FFC107] text-black text-xs">
              Manage Integrations
            </Button>
          </Card>
        </div>

        {/* Contract Details */}
        <div className="xl:col-span-3 space-y-6">
      {selectedContractData && (
            <>
              {/* Contract Header */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {selectedContractData!.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-[#FFFFFF]">{selectedContractData!.candidateName}</h2>
                      <p className="text-[#C9CFD6]">{selectedContractData!.position}</p>
                      <p className="text-[#FFD700] text-lg font-bold">{selectedContractData!.value}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={`text-sm mb-2 ${
                      selectedContractData!.status === 'signed' ? 'bg-green-900 text-green-300' :
                      selectedContractData!.status === 'sent' ? 'bg-blue-900 text-blue-300' :
                      selectedContractData!.status === 'pending_signature' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {selectedContractData!.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <div className="text-sm text-[#C9CFD6]">
                      Expires: {selectedContractData!.expiresAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">{selectedContractData!.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">Created: {selectedContractData!.created}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9CFD6]" />
                    <span className="text-[#C9CFD6]">Integrations: {selectedContractData!.integrations.join(', ')}</span>
                  </div>
                </div>

                {/* Contract Actions */}
                <div className="flex gap-3 mt-6">
                  {selectedContractData!.status === 'draft' && (
                    <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <Send className="w-4 h-4 mr-2" />
                      Send for Signature
                    </Button>
                  )}
                  {selectedContractData!.status === 'pending_signature' && (
                    <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
                      <Clock className="w-4 h-4 mr-2" />
                      Send Reminder
                    </Button>
                  )}
                  {selectedContractData!.status === 'signed' && (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Process Onboarding
                    </Button>
                  )}
                  <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA]">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Contract
                  </Button>
                  <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </Card>

              {/* Contract Preview */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#FFFFFF]">Contract Preview</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#23262B] text-[#C9CFD6]">
                      <Eye className="w-4 h-4 mr-1" />
                      Full Screen
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#23262B] text-[#C9CFD6]">
                      <FileText className="w-4 h-4 mr-1" />
                      Legal Check
                    </Button>
                  </div>
                </div>

                {/* Contract Content Simulation */}
                <div className="bg-white text-black rounded-lg p-6 max-h-[600px] overflow-y-auto font-sans text-sm leading-relaxed">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Employment Agreement</h1>
                    <p className="text-gray-600">This Employment Agreement ("Agreement") is made between TechCorp Inc. and {selectedContractData!.candidateName}</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">1. Position and Compensation</h2>
                    <p className="mb-3">You are employed as a {selectedContractData!.position} at an annual salary of {selectedContractData!.value}.</p>
                    <p className="mb-3">Your compensation includes performance-based bonuses eligible up to 25% of your base salary.</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">2. Benefits and Perks</h2>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Comprehensive health, dental, and vision insurance</li>
                      <li>Unlimited PTO policy</li>
                      <li>401(k) with 6% company match</li>
                      <li>Flexible work arrangements</li>
                      <li>Professional development budget of $3,000 annually</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-2">3. Confidentiality and IP Rights</h2>
                    <p className="mb-3">You agree to maintain confidentiality of all proprietary information and company secrets.</p>
                    <p className="mb-3">All work-related intellectual property created during employment belongs to the company.</p>
                  </div>

                  <div className="text-center text-gray-500 text-xs mt-8 pt-4 border-t border-gray-300">
                    This contract was generated and optimized using Hirezy AI Legal Assistant on {selectedContractData!.created}
                    <br />
                    AI-verified for compliance in California, New York, and Texas jurisdictions
                  </div>
                </div>
              </Card>

              {/* AI Optimizations */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#FFD700]" />
                  AI Legal Optimizations Applied
                </h3>

                <div className="space-y-4">
                  {selectedContractData!.aiOptimizations.map((optimization, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-[#111315] rounded-lg">
                      <CheckCircle className="w-5 h-5 text-[#3EFFA8] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[#E2E8F0] text-sm">{optimization}</p>
                        <p className="text-[#8A8F98] text-xs mt-1">✅ Compliance verified • 🔒 Legally binding</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-lg">
                  <h4 className="text-[#FFD700] font-medium mb-2">🤖 AI Legal Analysis</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#FFD700]">100%</div>
                      <div className="text-xs text-[#C9CFD6]">Compliance Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#FFD700]">8</div>
                      <div className="text-xs text-[#C9CFD6]">Jurisdictions Covered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#FFD700]">24hrs</div>
                      <div className="text-xs text-[#C9CFD6]">Time Saved</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Action Panel */}
              <Card className="bg-gradient-to-r from-[#1A1D21] to-[#0D0F11] border border-[#FFD700] border-opacity-30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">Contract Management Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Candidate
                  </Button>
                  <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-black">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Terms
                  </Button>
                  <Button variant="outline" className="border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                    <Share className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                  <Button variant="outline" className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                    <XCircle className="w-4 h-4 mr-2" />
                    Void Contract
                  </Button>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black">
                    <FileText className="w-4 h-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
