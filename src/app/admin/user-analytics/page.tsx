'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Target, Zap, Users, Briefcase, CheckCircle, XCircle, Clock, Search, Filter, Eye, Award, Star, AlertTriangle, ThumbsUp, RefreshCw, FileText, UserCheck } from 'lucide-react'
import { AdminGlassCard } from '@/components/cards/AdminGlassCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChartWrapper } from '@/components/Chart/ChartWrapper'

interface StudentAnalytics {
  studentId: string
  name: string
  averageSkillMatch: number
  resumeQualityScore: number
  hiringSuccessPrediction: number
  skillGapCount: number
  applicationsCount: number
  interviewsAttended: number
  offersReceived: number
  trend: 'improving' | 'stable' | 'declining'
  skillGaps: Array<{
    skill: string
    currentLevel: number
    requiredLevel: number
    gap: number
  }>
  predictions: {
    jobMatchLikelihood: number
    salaryExpectation: number
    timeToHire: number
  }
}

interface RecruiterAnalytics {
  recruiterId: string
  companyName: string
  jobPostingQuality: number
  hiringEfficiency: number
  interviewToHireRatio: number
  timeToFill: number
  candidateQuality: number
  offersAccepted: number
  jobsPosted: number
  hiresMade: number
  trend: 'improving' | 'stable' | 'declining'
  performanceMetrics: {
    responseTime: number
    offerAcceptance: number
    candidateRetention: number
  }
}

export default function UserAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'student' | 'recruiter'>('student')
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<StudentAnalytics | RecruiterAnalytics | null>(null)

  const handleRefreshAnalytics = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  // Mock data for demonstration
  const studentAnalytics: StudentAnalytics[] = [
    {
      studentId: 'stu_001',
      name: 'Alex Developer',
      averageSkillMatch: 85,
      resumeQualityScore: 92,
      hiringSuccessPrediction: 78,
      skillGapCount: 2,
      applicationsCount: 45,
      interviewsAttended: 12,
      offersReceived: 3,
      trend: 'improving',
      skillGaps: [
        { skill: 'Docker', currentLevel: 25, requiredLevel: 75, gap: -50 },
        { skill: 'AWS', currentLevel: 30, requiredLevel: 70, gap: -40 },
        { skill: 'React', currentLevel: 90, requiredLevel: 85, gap: 5 }
      ],
      predictions: {
        jobMatchLikelihood: 78,
        salaryExpectation: 85000,
        timeToHire: 45
      }
    }
  ]

  const recruiterAnalytics: RecruiterAnalytics[] = [
    {
      recruiterId: 'rec_001',
      companyName: 'TechCorp Inc.',
      jobPostingQuality: 94,
      hiringEfficiency: 87,
      interviewToHireRatio: 25,
      timeToFill: 18,
      candidateQuality: 91,
      offersAccepted: 12,
      jobsPosted: 15,
      hiresMade: 8,
      trend: 'improving',
      performanceMetrics: {
        responseTime: 12,
        offerAcceptance: 75,
        candidateRetention: 85
      }
    }
  ]

  const filteredStudents = studentAnalytics.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredRecruiters = recruiterAnalytics.filter(recruiter =>
    recruiter.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const studentMetrics = {
    averageSkillMatch: Math.round(studentAnalytics.reduce((sum, s) => sum + s.averageSkillMatch, 0) / studentAnalytics.length),
    averageResumeQuality: Math.round(studentAnalytics.reduce((sum, s) => sum + s.resumeQualityScore, 0) / studentAnalytics.length),
    totalHiringPredictions: studentAnalytics.reduce((sum, s) => sum + s.hiringSuccessPrediction, 0) / studentAnalytics.length,
    skillGapsAddressed: studentAnalytics.reduce((sum, s) => sum + s.skillGapCount, 0)
  }

  const recruiterMetrics = {
    averagePostingQuality: Math.round(recruiterAnalytics.reduce((sum, r) => sum + r.jobPostingQuality, 0) / recruiterAnalytics.length) || 0,
    averageInterviewToHireRatio: Math.round(recruiterAnalytics.reduce((sum, r) => sum + r.interviewToHireRatio, 0) / recruiterAnalytics.length) || 0,
    averageTimeToFill: Math.round(recruiterAnalytics.reduce((sum, r) => sum + r.timeToFill, 0) / recruiterAnalytics.length) || 0,
    totalHires: recruiterAnalytics.reduce((sum, r) => sum + r.hiresMade, 0)
  }

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'improving': return 'text-green-400'
      case 'stable': return 'text-blue-400'
      case 'declining': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'stable': return <BarChart3 className="w-4 h-4 text-blue-400" />
      case 'declining': return <TrendingDown className="w-4 h-4 text-red-400" />
      default: return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Target className="w-10 h-10 text-blue-400" />
            Advanced User Analytics
          </h1>
          <p className="text-slate-300">Deep insights into student and recruiter performance, skill matching, and hiring efficiency</p>
        </div>
        <Button
          onClick={handleRefreshAnalytics}
          disabled={refreshing}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Analyzing...' : 'Refresh Analytics'}
        </Button>
      </div>

      {/* Tab Switcher */}
      <AdminGlassCard>
        <div className="flex gap-1">
          <Button
            onClick={() => setActiveTab('student')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'student'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Student Analytics
          </Button>
          <Button
            onClick={() => setActiveTab('recruiter')}
            className={`px-6 py-2 rounded-lg ${
              activeTab === 'recruiter'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Recruiter Analytics
          </Button>
        </div>
      </AdminGlassCard>

      {activeTab === 'student' && (
        <>
          {/* Student Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Average Skill Match</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-400">{studentMetrics.averageSkillMatch}%</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">+5.2%</span>
                    </div>
                  </div>
                </div>
                <Target className="w-8 h-8 text-blue-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${studentMetrics.averageSkillMatch}%` }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Resume Quality</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-400">{studentMetrics.averageResumeQuality}%</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">+2.1%</span>
                    </div>
                  </div>
                </div>
                <FileText className="w-8 h-8 text-green-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${studentMetrics.averageResumeQuality}%` }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Hiring Success</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-purple-400">{Math.round(studentMetrics.totalHiringPredictions)}%</span>
                    <div className="flex items-center text-yellow-400">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-xs ml-1">Stable</span>
                    </div>
                  </div>
                </div>
                <UserCheck className="w-8 h-8 text-purple-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.round(studentMetrics.totalHiringPredictions)}%` }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Skill Gaps Addressed</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-400">{studentMetrics.skillGapsAddressed}</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">Active</span>
                    </div>
                  </div>
                </div>
                <Award className="w-8 h-8 text-orange-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(studentMetrics.skillGapsAddressed * 10, 100)}%` }}
                />
              </div>
            </AdminGlassCard>
          </div>

          {/* Student Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminGlassCard title="Skill Development Overview">
              <ChartWrapper
                title=""
                data={[
                  { skill: 'React', current: 90, required: 85, color: '#10b981' },
                  { skill: 'Node.js', current: 75, required: 80, color: '#3b82f6' },
                  { skill: 'AWS', current: 30, required: 70, color: '#ef4444' },
                  { skill: 'Docker', current: 25, required: 75, color: '#f97316' },
                  { skill: 'GraphQL', current: 65, required: 70, color: '#8b5cf6' }
                ]}
                dataKey="current"
                type="bar"
                className="h-64"
              />
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-300">Matched Skills</span>
                  </div>
                  <span className="font-bold text-green-400">React (90%)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-300">Gap Skills</span>
                  </div>
                  <span className="font-bold text-orange-400">Docker, AWS</span>
                </div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard title="Performance Predictions">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Job Match Likelihood</span>
                    <span className="font-bold text-blue-400">78%</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out" style={{ width: '78%' }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Employment Ready</span>
                    <span className="font-bold text-green-400">72%</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out" style={{ width: '72%' }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Interview Success Rate</span>
                    <span className="font-bold text-purple-400">65%</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out" style={{ width: '65%' }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Estimated Salary</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">$85,000</div>
                      <div className="text-xs text-slate-500">per year</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-slate-400">Time to Hire</span>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-400">45 days</div>
                      <div className="text-xs text-slate-500">average</div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>

          {/* Detailed Student Analytics */}
          <AdminGlassCard title="Student Performance Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentAnalytics.map((student, index) => (
                <div key={student.studentId} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(student.trend)}
                      <span className={`text-xs capitalize ${getTrendColor(student.trend)}`}>
                        {student.trend}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-medium mb-2">{student.name}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Skill Match</span>
                      <span className="font-medium text-blue-400">{student.averageSkillMatch}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Resume Quality</span>
                      <span className="font-medium text-green-400">{student.resumeQualityScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hiring Prediction</span>
                      <span className="font-medium text-purple-400">{student.hiringSuccessPrediction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Applications</span>
                      <span className="font-medium text-white">{student.applicationsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Offers</span>
                      <span className="font-medium text-green-400">{student.offersReceived}</span>
                    </div>
                  </div>

                  {student.skillGapCount > 0 && (
                    <div className="mt-3 p-2 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center gap-2 text-xs text-red-300">
                        <AlertTriangle className="w-3 h-3" />
                        {student.skillGapCount} skill gaps identified
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </>
      )}

      {activeTab === 'recruiter' && (
        <>
          {/* Recruiter Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Posting Quality</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-400">{recruiterMetrics.averagePostingQuality}%</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">+3.1%</span>
                    </div>
                  </div>
                </div>
                <FileText className="w-8 h-8 text-blue-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${recruiterMetrics.averagePostingQuality}%` }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Hiring Efficiency</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-400">91%</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">+1.8%</span>
                    </div>
                  </div>
                </div>
                <Zap className="w-8 h-8 text-green-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '91%' }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Time to Fill</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-purple-400">{recruiterMetrics.averageTimeToFill} days</span>
                    <div className="flex items-center text-green-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-xs ml-1">-2.3%</span>
                    </div>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-purple-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.max(100 - recruiterMetrics.averageTimeToFill, 10)}%` }}
                />
              </div>
            </AdminGlassCard>

            <AdminGlassCard>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm">Total Hires</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-orange-400">{recruiterMetrics.totalHires}</span>
                    <div className="flex items-center text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs ml-1">+15.7%</span>
                    </div>
                  </div>
                </div>
                <UserCheck className="w-8 h-8 text-orange-400/60" />
              </div>
              <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(recruiterMetrics.totalHires * 12.5, 100)}%` }}
                />
              </div>
            </AdminGlassCard>
          </div>

          {/* Recruiter Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AdminGlassCard title="Recruiter Performance Metrics">
              <ChartWrapper
                title=""
                data={[
                  { name: 'Job Posting Quality', value: 94, target: 85, color: '#10b981' },
                  { name: 'Candidate Quality', value: 91, target: 88, color: '#3b82f6' },
                  { name: 'Response Time', value: 87, target: 85, color: '#8b5cf6' },
                  { name: 'Offer Acceptance', value: 75, target: 80, color: '#f59e0b' },
                  { name: 'Retention Rate', value: 85, target: 90, color: '#ef4444' }
                ]}
                dataKey="value"
                type="bar"
                className="h-64"
              />
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-green-400 text-2xl font-bold">94%</div>
                  <div className="text-slate-400 text-xs">Posting Quality</div>
                  <div className="mt-1 h-1 bg-slate-600 rounded-full">
                    <div className="h-full bg-green-400 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-blue-400 text-2xl font-bold">18d</div>
                  <div className="text-slate-400 text-xs">Avg Time to Fill</div>
                  <div className="mt-1 h-1 bg-slate-600 rounded-full">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>
            </AdminGlassCard>

            <AdminGlassCard title="Hiring Funnel Analysis">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Jobs Posted</span>
                    <span className="font-medium text-white">15</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Applications Received</span>
                    <span className="font-medium text-white">120</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Interviews Conducted</span>
                    <span className="font-medium text-white">32</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '53%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Offers Extended</span>
                    <span className="font-medium text-white">12</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '40%' }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Successful Hires</span>
                    <span className="font-medium text-white">8</span>
                  </div>
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" style={{ width: '27%' }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-600">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Interview → Hire Rate</div>
                      <div className="text-xl font-bold text-orange-400">25%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Offer Acceptance</div>
                      <div className="text-xl font-bold text-green-400">66.7%</div>
                    </div>
                  </div>
                </div>
              </div>
            </AdminGlassCard>
          </div>

          {/* Detailed Recruiter Analytics */}
          <AdminGlassCard title="Recruiter Performance Details">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recruiterAnalytics.map((recruiter, index) => (
                <div key={recruiter.recruiterId} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                      {recruiter.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(recruiter.trend)}
                      <span className={`text-xs capitalize ${getTrendColor(recruiter.trend)}`}>
                        {recruiter.trend}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-medium mb-2">{recruiter.companyName}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Posting Quality</span>
                      <span className="font-medium text-blue-400">{recruiter.jobPostingQuality}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Hiring Efficiency</span>
                      <span className="font-medium text-green-400">{recruiter.hiringEfficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time to Fill</span>
                      <span className="font-medium text-purple-400">{recruiter.timeToFill} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Jobs Posted</span>
                      <span className="font-medium text-white">{recruiter.jobsPosted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Successful Hires</span>
                      <span className="font-medium text-green-400">{recruiter.hiresMade}</span>
                    </div>
                  </div>

                  {recruiter.hiringEfficiency > 90 && (
                    <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded">
                      <div className="flex items-center gap-2 text-xs text-green-300">
                        <Star className="w-3 h-3" />
                        High Performance Recruiter
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AdminGlassCard>
        </>
      )}
    </div>
  )
}
