'use client'

import { useState, useEffect } from 'react'
import { Brain, Users, Target, BookOpen, Sparkles, ChevronDown, CheckCircle, AlertTriangle, Lightbulb, MessageCircle, Star, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import {
  ComprehensiveAssessment,
  getComprehensiveAssessmentForCandidate
} from '@/lib/ai/recruiter/aiAssessmentData'

// Assessment detail modal component
function AssessmentModal({ candidateId, onClose }: { candidateId: string; onClose: () => void }) {
  const assessment = getComprehensiveAssessmentForCandidate(candidateId)
  const [isAnalyzing, setIsAnalyzing] = useState(!assessment)
  const [assessmentData, setAssessmentData] = useState<ComprehensiveAssessment | null>(null)

  useEffect(() => {
    if (!assessment) {
      // Simulate AI analysis
      setIsAnalyzing(true)
      const analyze = async () => {
        const response = await fetch('/api/recruiter/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidateId })
        })

        const data = await response.json()
        if (data.success) {
          setAssessmentData(data.assessment)
          setIsAnalyzing(false)
        }
      }
      analyze()
    } else {
      setAssessmentData(assessment)
    }
  }, [candidateId, assessment])

  if (isAnalyzing) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center space-y-6">
            <div className="relative">
              <Brain className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-300">Analyzing candidate profile and generating comprehensive assessment...</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (!assessmentData) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{assessmentData.name}</h2>
            <p className="text-gray-300">Comprehensive AI Assessment Report</p>
          </div>
          <Button onClick={onClose} variant="ghost" className="text-white">
            ✕
          </Button>
        </div>

        {/* Overall Score */}
        <div className="mb-8">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{assessmentData.overallScore}</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                OUT OF 100
              </div>
            </div>
            <p className="text-gray-300 mt-4">Overall Assessment Score</p>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Assessment Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(assessmentData.breakdown).map(([key, score]) => (
              <div key={key} className="text-center">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-white">{score}</span>
                </div>
                <p className="text-gray-300 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-6 mb-8">
          {/* Strengths */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Key Strengths
            </h3>
            <div className="space-y-2">
              {assessmentData.aiInsights.strengths.map((strength, index) => (
                <div key={index} className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-300">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Concerns */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Areas of Concern
            </h3>
            <div className="space-y-2">
              {assessmentData.aiInsights.concerns.map((concern, index) => (
                <div key={index} className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-300">{concern}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              Recommendations
            </h3>
            <div className="space-y-2">
              {assessmentData.aiInsights.recommendations.map((rec, index) => (
                <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-300">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Risk Assessment
            </h3>
            <div className="space-y-2">
              {assessmentData.aiInsights.riskFactors.map((risk, index) => (
                <div key={index} className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <p className="text-orange-300">{risk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interview Questions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            AI-Generated Interview Questions
          </h3>

          {/* Competency Questions */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-purple-300 mb-3">Competency Questions</h4>
            <div className="space-y-3">
              {assessmentData.interviewQuestions.competency.map((question, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Questions */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-purple-300 mb-3">Behavioral Questions</h4>
            <div className="space-y-3">
              {assessmentData.interviewQuestions.behavioral.map((question, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Questions */}
          <div>
            <h4 className="text-md font-medium text-purple-300 mb-3">Technical Questions</h4>
            <div className="space-y-3">
              {assessmentData.interviewQuestions.technical.map((question, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" onClick={onClose} className="text-white border-white/20">
            Close
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save Assessment
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function AssessmentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)

  // Sample candidates for demonstration
  const candidates = [
    { id: '1', name: 'Sarah Johnson', role: 'Senior Full Stack Developer', score: 94 },
    { id: '2', name: 'Mike Chen', role: 'Data Science Lead', score: 91 },
    { id: '3', name: 'Alex Rivera', role: 'DevOps Engineer', score: 87 },
    { id: '4', name: 'Jennifer Wu', role: 'Product Designer', score: 89 },
    { id: '5', name: 'David Kumar', role: 'Backend Developer', score: 85 }
  ]

  const filteredCandidates = candidates.filter(candidate =>
    searchQuery === '' ||
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Candidate Assessment</h1>
          <p className="text-gray-300">
            Advanced AI-powered behavioral analysis, cultural fit scoring, and skill gap assessment
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Candidates Analyzed</p>
            <p className="text-2xl font-bold text-white">{candidates.length}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Average Score</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / candidates.length)}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Target className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Top Performers</p>
              <p className="text-2xl font-bold text-white">
                {candidates.filter(c => c.score >= 90).length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">Pending Assessment</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-1">AI Confidence</p>
              <p className="text-2xl font-bold text-white">94%</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Assessment Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assessment Types */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Assessment Categories</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Behavioral Analysis</p>
                  <p className="text-gray-400 text-sm">Resume tone, communication style</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Cultural Fit</p>
                  <p className="text-gray-400 text-sm">Company values alignment</p>
                </div>
              </div>
              <ChevronDown className="7 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Skill Gap Analysis</p>
                  <p className="text-gray-400 text-sm">Learning paths & upskilling</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Personality Assessment</p>
                  <p className="text-gray-400 text-sm">MBTI & work style analysis</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </Card>

        {/* Sample Assessment Preview */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Sample Assessment Preview</h3>
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-white">94</span>
              </div>
              <p className="text-white font-medium">Sarah Johnson</p>
              <p className="text-gray-400 text-sm">Senior Full Stack Developer</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-green-400 font-bold">Leadership</p>
                <p className="text-green-300 text-sm">Exceptional potential</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-400 font-bold">Culture Fit</p>
                <p className="text-blue-300 text-sm">Very strong alignment</p>
              </div>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              View Full Assessment
            </Button>
          </div>
        </Card>
      </div>

      {/* Candidate List */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Assessments</h3>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{candidate.name}</p>
                  <p className="text-gray-400 text-sm">{candidate.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${candidate.score >= 90 ? 'text-green-400' : candidate.score >= 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {candidate.score}
                  </div>
                  <div className="text-xs text-gray-400">Assessment Score</div>
                </div>

                <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/10">
                  <Brain className="w-4 h-4 mr-2" />
                  View Assessment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Assessment Modal */}
      {selectedCandidate && (
        <AssessmentModal
          candidateId={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  )
}
