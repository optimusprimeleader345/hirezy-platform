'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Search,
  Eye,
  Download,
  Calendar,
  Users,
  Globe,
  Lock,
  Key,
  BarChart3,
  Target,
  TrendingUp,
  XCircle,
  Clock,
  MessageSquare
} from 'lucide-react'

export default function ComplianceHubPage() {
  const [selectedCheck, setSelectedCheck] = useState<string | null>('1')

  // Mock compliance data
  const complianceChecks = [
    {
      id: '1',
      candidateName: 'Alex Chen',
      position: 'Senior React Developer',
      status: 'passed',
      backgroundCheck: 'completed',
      criminalCheck: 'clear',
      creditCheck: 'approved',
      referenceCheck: 'verified',
      lastUpdated: '2025-01-20',
      riskScore: 'low',
      complianceScore: 98,
      flags: []
    },
    {
      id: '2',
      candidateName: 'Sarah Kumar',
      position: 'UX Designer',
      status: 'in-progress',
      backgroundCheck: 'processing',
      criminalCheck: 'pending',
      creditCheck: 'completed',
      referenceCheck: 'in-review',
      lastUpdated: '2025-01-18',
      riskScore: 'medium',
      complianceScore: 87,
      flags: ['Reference verification pending']
    },
    {
      id: '3',
      candidateName: 'David Kim',
      position: 'Data Scientist',
      status: 'attention',
      backgroundCheck: 'completed',
      criminalCheck: 'minor_finding',
      creditCheck: 'approved',
      referenceCheck: 'failed',
      lastUpdated: '2025-01-15',
      riskScore: 'high',
      complianceScore: 65,
      flags: ['Criminal background requires review', 'Reference verification failed']
    }
  ]

  const selectedCheckData = complianceChecks.find(c => c.id === selectedCheck)

  // Compliance metrics
  const metrics = [
    { label: 'Background Checks Completed', value: '475', trend: '+12%', color: '#3EFFA8' },
    { label: 'Regulatory Compliance Rate', value: '98.7%', trend: '+0.5%', color: '#60A5FA' },
    { label: 'Risk Assessments', value: '2,340', trend: '+25%', color: '#F59E0B' },
    { label: 'Legal Approvals Pending', value: '18', trend: '-5%', color: '#EF4444' }
  ]

  // Compliance requirements by jurisdiction
  const jurisdictions = [
    { country: 'United States', laws: ['FCRA', 'EEOC', 'GDPR'], status: 'fully_compliant' },
    { country: 'European Union', laws: ['GDPR', 'EU AI Act'], status: 'fully_compliant' },
    { country: 'Canada', laws: ['PIPEDA', 'Law Society Rules'], status: 'monitoring' },
    { country: 'Singapore', laws: ['PDPA', 'Employment Act'], status: 'fully_compliant' }
  ]

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#3EFFA8]" />
            Compliance Hub
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Enterprise-grade background verification and regulatory compliance management
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <FileCheck className="w-4 h-4 mr-2" />
            Run New Check
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <Download className="w-4 h-4 mr-2" />
            Compliance Report
          </Button>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <Card key={i} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-[#C9CFD6] mb-1">{metric.label}</p>
                <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</p>
              </div>
              <div className="p-3 rounded-full bg-[#111315]">
                <TrendingUp className="w-6 h-6" style={{ color: metric.color }} />
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-sm font-medium ${
                metric.trend.includes('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {metric.trend}
              </span>
              <span className="text-[#8A8F98] text-sm ml-1">this month</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Compliance Check List */}
        <div className="xl:col-span-1 space-y-4">
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Background Checks</h3>
            <div className="space-y-3">
              {complianceChecks.map((check) => (
                <div
                  key={check.id}
                  onClick={() => setSelectedCheck(check.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCheck === check.id
                      ? 'bg-[#3EFFA8] text-black border border-[#3EFFA8]'
                      : 'bg-[#111315] border border-[#23262B] text-[#E2E8F0] hover:bg-[#23262B]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className={`w-8 h-8 ${selectedCheck === check.id ? 'bg-black text-[#3EFFA8]' : 'bg-[#3EFFA8]'}`}>
                      <AvatarFallback className={selectedCheck === check.id ? 'text-[#3EFFA8]' : 'text-black'}>
                        {check.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        selectedCheck === check.id ? 'text-black' : 'text-[#FFFFFF]'
                      }`}>
                        {check.candidateName}
                      </p>
                      <Badge variant="outline" className={`text-xs ${
                        selectedCheck === check.id
                          ? 'border-black text-black'
                          : check.status === 'passed'
                            ? 'border-green-400 text-green-400'
                            : check.status === 'failed'
                              ? 'border-red-400 text-red-400'
                              : 'border-yellow-400 text-yellow-400'
                      }`}>
                        {check.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${
                      selectedCheck === check.id
                        ? 'text-black opacity-70'
                        : 'text-[#8A8F98]'
                    }`}>
                      Score: {check.complianceScore}%
                    </span>
                    <span className={`text-xs ${
                      selectedCheck === check.id
                        ? 'text-black opacity-70'
                        : 'text-[#C9CFD6]'
                    }`}>
                      {check.lastUpdated}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Regulatory Compliance */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Regulatory Status</h3>
            <div className="space-y-3">
              {jurisdictions.map((jurisdiction, i) => (
                <div key={i} className="p-3 bg-[#111315] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#FFFFFF] font-medium text-sm">{jurisdiction.country}</span>
                    <CheckCircle className={`w-4 h-4 ${
                      jurisdiction.status === 'fully_compliant' ? 'text-green-400' :
                      'text-yellow-400'
                    }`} />
                  </div>
                  <div className="space-y-1">
                    {jurisdiction.laws.map((law, j) => (
                      <Badge key={j} variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] text-xs mr-1">
                        {law}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Compliance Panel */}
        <div className="xl:col-span-3 space-y-6">
          {selectedCheckData && (
            <>
              {/* Compliance Overview */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#3EFFA8]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 bg-[#3EFFA8]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {selectedCheckData.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-[#FFFFFF]">
                        {selectedCheckData.candidateName}
                      </h2>
                      <p className="text-[#C9CFD6]">{selectedCheckData.position}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#FFD700] mb-1">
                      {selectedCheckData.complianceScore}%
                    </div>
                    <Badge className={`text-sm ${
                      selectedCheckData.riskScore === 'low' ? 'bg-green-900 text-green-300' :
                      selectedCheckData.riskScore === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {selectedCheckData.riskScore.toUpperCase()} RISK
                    </Badge>
                  </div>
                </div>

                {/* Check Status Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { name: 'Background Check', status: selectedCheckData.backgroundCheck, color: 'blue' },
                    { name: 'Criminal Records', status: selectedCheckData.criminalCheck, color: 'green' },
                    { name: 'Credit History', status: selectedCheckData.creditCheck, color: 'yellow' },
                    { name: 'References', status: selectedCheckData.referenceCheck, color: 'purple' }
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#FFFFFF] text-sm font-medium">{item.name}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          item.status === 'completed' || item.status === 'clear' || item.status === 'approved' || item.status === 'verified'
                            ? 'bg-green-400' : item.status === 'processing' || item.status === 'pending' || item.status === 'in-review'
                              ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                      </div>
                      <Badge className={`text-xs w-full justify-center ${
                        item.status === 'completed' || item.status === 'clear' || item.status === 'approved' || item.status === 'verified'
                          ? 'bg-green-900 text-green-300' : item.status === 'processing' || item.status === 'pending' || item.status === 'in-review'
                            ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Flags & Alerts */}
                {selectedCheckData.flags.length > 0 && (
                  <Card className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                    <h3 className="text-yellow-400 font-medium mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Compliance Flags
                    </h3>
                    <div className="space-y-2">
                      {selectedCheckData.flags.map((flag, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-yellow-900/10 rounded">
                          <XCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-300 text-sm">{flag}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </Card>

              {/* Detailed Reports */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Background Check Details */}
                <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-[#3EFFA8]" />
                    Background Verification Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#111315] rounded-lg">
                        <div className="text-[#C9CFD6] text-sm">SSN Verification</div>
                        <div className="text-green-400 font-medium">Valid</div>
                      </div>
                      <div className="p-3 bg-[#111315] rounded-lg">
                        <div className="text-[#C9CFD6] text-sm">Address History</div>
                        <div className="text-green-400 font-medium">Confirmed</div>
                      </div>
                      <div className="p-3 bg-[#111315] rounded-lg">
                        <div className="text-[#C9CFD6] text-sm">Identity Match</div>
                        <div className="text-green-400 font-medium">Verified</div>
                      </div>
                      <div className="p-3 bg-[#111315] rounded-lg">
                        <div className="text-[#C9CFD6] text-sm">Right to Work</div>
                        <div className="text-green-400 font-medium">Approved</div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Background Report
                    </Button>
                  </div>
                </Card>

                {/* Compliance Actions */}
                <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                    <Lock className="w-6 h-6 text-[#FFD700]" />
                    Compliance Actions
                  </h3>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve for Hire
                    </Button>

                    {selectedCheckData.status === 'attention' && (
                      <>
                        <Button variant="outline" className="w-full border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black">
                          <Eye className="w-4 h-4 mr-2" />
                          Review Findings Manually
                        </Button>

                        <Button variant="outline" className="w-full border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Candidate
                        </Button>
                      </>
                    )}

                    <Button variant="outline" className="w-full border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-black">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Compliance Notification
                    </Button>

                    <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-black">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Follow-up Check
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Regulatory Information */}
              <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-[#60A5FA]" />
                  Regulatory Compliance Framework
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                    <h4 className="text-[#FFFFFF] font-medium mb-2">GDPR Compliance</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Data Processing Consent</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Right to Work Verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Data Subject Rights</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                    <h4 className="text-[#FFFFFF] font-medium mb-2">EEOC Standards</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Diverse Hiring Practices</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Bias-Free Assessments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Accommodation Support</span>
                    </div>
                  </div>

                  <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                    <h4 className="text-[#FFFFFF] font-medium mb-2">FCRA Compliance</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Consumer Rights Notice</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Adverse Action Letters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">Credit Report Compliance</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="border-[#3EFFA8] text-[#3EFFA8]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Compliance Report
                  </Button>
                  <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA]">
                    <Key className="w-4 h-4 mr-2" />
                    Audit Trail
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
