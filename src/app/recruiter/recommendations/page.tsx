// 8 Best AI Features Implementation - Clean Version
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Brain,
  FileText,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  Zap,
  Star,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Target,
  Award,
  ArrowUp,
  Upload,
  BarChart3,
  X,
  DollarSign,
  UserCheck,
  TrendingUp
} from 'lucide-react'

// Mock candidate data with comprehensive AI analysis
const CANDIDATES_DATA = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Senior React Developer',
    location: 'Bangalore',
    experience: 6,
    matchScore: 92,
    currentState: 'Interview Scheduled',
    avatar: 'AC',
    resumeAnalysis: {
      technicalSkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL'],
      softSkills: ['Leadership', 'Problem Solving', 'Communication', 'Team Collaboration'],
      tools: ['VS Code', 'Git', 'Jenkins', 'Webpack', 'Figma'],
      experience: 6.2,
      domains: ['Frontend Development', 'Full Stack', 'Cloud Architecture'],
      education: 'BS Computer Science, Stanford University',
      certifications: ['AWS Certified Solutions Architect', 'React Developer Certification'],
      achievements: ['Led team of 8 developers', 'Improved performance by 40%', 'Published 2 React libraries'],
      atsScore: 95,
      readabilityScore: 92,
      resumeStrength: 94,
      redFlags: []
    },
    matchDetails: {
      skillSimilarity: 91,
      experienceStrength: 89,
      culturalFit: 85,
      leadScoring: 93,
      overall: 92
    },
    ranking: {
      category: 'Highest Fit',
      score: 97,
      position: 1
    },
    potential: {
      score: 88,
      learningCurve: 'Fast',
      projectVariety: 'Excellent',
      growthMindset: 'High'
    },
    capability: {
      technical: 95,
      problemSolving: 90,
      adaptability: 87,
      communication: 92,
      leadership: 88
    },
    resumeStrength: {
      atsCompatibility: 94,
      overallScore: 92,
      formattingGrade: 'A',
      readabilityScore: 96,
      keywordOptimization: 88,
      impactStatements: 90,
      quantifiableAchievements: 85
    },
    redFlags: {
      detected: [],
      severity: 'Low',
      securityIssues: [],
      complianceConcerns: [],
      riskLevel: 'Green',
      recommendations: [
        'Resume appears clean and professional',
        'No red flags detected',
        'Resume meets industry standards'
      ]
    },
    jdMatch: {
      titleAlignment: 95,
      requirementsMatch: 88,
      responsibilitiesFit: 91,
      companyValues: 86
    },
    screening: {
      recommendation: 'Shortlist',
      confidence: 89,
      reasoning: 'Strong technical background, excellent leadership experience, great company culture fit',
      strengths: ['Technical expertise', 'Team leadership', 'Problem solving', 'Communication'],
      weaknesses: ['Limited mobile development experience'],
      improvements: ['Consider mobile development training', 'Database architecture certification']
    },
    preInterview: {
      keyStrengths: ['React ecosystem expertise', 'Team leadership', 'Problem solving mindset'],
      weakAreas: ['Mobile development', 'DevOps practices'],
      suggestedQuestions: [
        'Can you walk us through your most challenging project?',
        'How do you handle disagreement in team settings?',
        'Describe your approach to mentoring junior developers.'
      ],
      communicationExpectations: 'Professional, articulate, thoughtful responses expected',
      overallFit: 'Excellent (9.2/10)'
    },
    talentCategory: {
      level: 'Senior',
      specialization: 'Full-Stack Development',
      maturityLevel: 'Expert',
      leadershipPotential: 'High',
      innovationCapacity: 'Very High',
      adaptabilityRating: 'Excellent'
    },
    stagePrediction: {
      currentStage: 'Applied',
      predictedNext: 'Interview',
      predictedOffer: 73,
      expectedDate: '2025-02-10',
      factors: ['Strong technical fit', 'Positive screening results', 'Company growth alignment'],
      timeline: ['Application Review (2 days)', 'Initial Screening (5 days)', 'Technical Interview (10 days)', 'Final Round (15 days)', 'Offer (18 days)']
    },
    duplicateCheck: {
      unique: true,
      similarProfiles: 0,
      confidence: '100%',
      status: 'No duplicates found',
      recommendations: 'This is a unique candidate'
    },
    hiringAnalytics: {
      companyHiringTrends: 'Growing in React development',
      salaryBenchmark: 'Competitive market range',
      timeToHire: 'Average is 22 days',
      offerAcceptanceRate: '78% for similar roles'
    },
    fitExplanation: {
      whyFits: [
        'Perfect technical skill match with React and full-stack expertise',
        'Demonstrated leadership experience matches team structure',
        'Location preference aligns with Bangalore office',
        'Salary expectations reasonable for experience level'
      ],
      whyDoesnt: [
        'Limited experience with our specific mobile tech stack',
        'Less exposure to our preferred DevOps pipeline'
      ],
      whatMissing: [
        'React Native development experience',
        'Kubernetes production exposure',
        'Experience with our internal design system'
      ],
      focusAreas: [
        'Discuss mobile development learning plan',
        'Explore Kubernetes training opportunities',
        'Review design system documentation'
      ]
    },
    workloadCapacity: {
      largeProjects: 95,
      teamWork: 92,
      independentWork: 88,
      multitasking: 91,
      overall: 92
    },
    salaryPrediction: {
      predictedRange: '₹18-22 LPA',
      confidence: 87,
      factors: ['6+ years experience', 'Senior developer role', 'Bangalore location', 'Strong tech stack alignment'],
      marketComparison: '10% above average for experience level'
    },
    softSkills: {
      communication: 92,
      leadership: 88,
      attentionToDetail: 90,
      learningAbility: 94,
      problemSolving: 90,
      average: 91
    },
    peerComparison: {
      rankingPosition: 1,
      percentile: 95,
      betterThanPeers: 'Top 5% of candidates',
      strengthsVsPeers: ['Experience level', 'Technical depth', 'Leadership background'],
      gapsVsPeers: ['Mobile development', 'DevOps experience']
    },
    appliedDate: '2025-01-15',
    lastActivity: 'Interview scheduled for 2025-02-05'
  }
]

export default function HiringRecommendationsPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [batchFiles, setBatchFiles] = useState<File[]>([])
  const [isProcessingBatch, setIsProcessingBatch] = useState(false)
  const [filterByRank, setFilterByRank] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleBatchUpload = async () => {
    if (batchFiles.length === 0) return
    setIsProcessingBatch(true)
    // Simulate AI processing all 25 features for batch
    await new Promise(resolve => setTimeout(resolve, 5000))
    setIsProcessingBatch(false)
    setBatchFiles([])
  }

  const filteredCandidates = CANDIDATES_DATA.filter(candidate => {
    const matchesRank = filterByRank === 'all' || candidate.ranking.category.toLowerCase().includes(filterByRank.toLowerCase())
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRank && matchesSearch
  })

  const [selectedComparisonCandidates, setSelectedComparisonCandidates] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const remainingCandidatesForComparison = CANDIDATES_DATA.filter(c => !selectedComparisonCandidates.includes(c.id))

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#FFD700]" />
            Hiring Recommendations
          </h1>
      <p className="text-[#C9CFD6] mt-2">
            AI-powered candidate evaluation using 17 advanced intelligence features
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
            <Upload className="w-4 h-4 mr-2" />
            Batch Upload
          </Button>
          <Button
            variant="outline"
            className="border-[#60A5FA] text-[#60A5FA] hover:bg-[#60A5FA] hover:text-white"
            onClick={() => setShowComparison(!showComparison)}
          >
            <Users className="w-4 h-4 mr-2" />
            {showComparison ? 'Hide Comparison' : 'Compare Candidates'}
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* AI Recommendations Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">247</div>
            <div className="text-[#C9CFD6] text-sm">AI-Analyzed Candidates</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3EFFA8] mb-1">89%</div>
            <div className="text-[#C9CFD6] text-sm">Avg Match Score</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#EF4444] mb-1">47%</div>
            <div className="text-[#C9CFD6] text-sm">Top Talent Identified</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#60A5FA] mb-1">12x</div>
            <div className="text-[#C9CFD6] text-sm">Efficiency Boost</div>
          </div>
        </Card>
      </div>

      {/* Top Recommendations */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <h3 className="text-xl font-bold text-[#FFFFFF] mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-[#FFD700]" />
          AI-Powered Hiring Recommendations
        </h3>

        <div className="space-y-6">
          {filteredCandidates.map((candidate, index) => (
            <Card
              key={candidate.id}
              className="bg-[#111315] border border-[#23262B] hover:border-[#FFD700]/50 transition-all cursor-pointer"
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="p-6">
                {/* Header - Basic Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-[#FFD700]">#{index + 1}</div>
                    <Avatar className="w-14 h-14 bg-[#FFD700]">
                      <AvatarFallback className="text-black font-bold text-lg">
                        {candidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-[#FFFFFF]">{candidate.name}</h3>
                      <p className="text-[#C9CFD6]">{candidate.role} • {candidate.location} • {candidate.experience} years exp</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge className={`px-4 py-2 ${
                      candidate.screening.recommendation === 'Shortlist' ? 'bg-green-900 text-green-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {candidate.screening.recommendation}
                    </Badge>
                    <Badge className={`px-4 py-2 ${
                      candidate.ranking.category === 'Highest Fit' ? 'bg-green-900 text-green-300' :
                      candidate.ranking.category === 'Strong Fit' ? 'bg-blue-900 text-blue-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {candidate.ranking.category}
                    </Badge>
                  </div>
                </div>

                {/* AI Insights - Key Features Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* Resume Intelligence */}
                  <div className="bg-[#0D0F11] rounded-lg border border-[#23262B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-[#3EFFA8]" />
                      <span className="font-medium text-[#FFFFFF]">Resume Analysis</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#C9CFD6] text-sm">ATS Score</span>
                        <span className="text-[#3EFFA8] font-medium">{candidate.resumeAnalysis.atsScore}%</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {candidate.resumeAnalysis.technicalSkills.slice(0, 3).map((skill, i) => (
                          <Badge key={i} className="bg-[#3EFFA8] text-black text-xs">{skill}</Badge>
                        ))}
                        {candidate.resumeAnalysis.technicalSkills.length > 3 && (
                          <Badge className="bg-[#23262B] text-[#C9CFD6] text-xs">
                            +{candidate.resumeAnalysis.technicalSkills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Cultural Fit Predictor */}
                  <div className="bg-[#0D0F11] rounded-lg border border-[#23262B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-5 h-5 text-[#FF6B6B]" />
                      <span className="font-medium text-[#FFFFFF]">Cultural Fit</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#C9CFD6] text-sm">Alignment</span>
                        <span className="text-[#FF6B6B] font-medium">{candidate.matchDetails.culturalFit}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#C9CFD6] text-sm">Work Style</span>
                        <Badge className="bg-green-900 text-green-300 text-xs">Collaborative</Badge>
                      </div>
                      <div className="text-xs text-[#C9CFD6] flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#FF6B6B]" />
                        Team player fit
                      </div>
                    </div>
                  </div>

                  {/* Red Flags Preview */}
                  <div className="bg-[#0D0F11] rounded-lg border border-[#23262B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-[#EF4444]" />
                      <span className="font-medium text-[#FFFFFF]">Security Check</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[#C9CFD6] text-sm">Background</span>
                        <Badge className="bg-green-900 text-green-300 text-xs">Clear</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#C9CFD6] text-sm">References</span>
                        <Badge className="bg-green-900 text-green-300 text-xs">Verified</Badge>
                      </div>
                      <div className="text-[#EF4444] text-sm flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Minor gap concerns
                      </div>
                    </div>
                  </div>

                  {/* Talent Level Assessment */}
                  <div className="bg-[#0D0F11] rounded-lg border border-[#23262B] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-[#FFD700]" />
                      <span className="font-medium text-[#FFFFFF]">Talent Level</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#C9CFD6] text-sm">Experience</span>
                        <span className="text-[#FFD700] font-medium">{candidate.talentCategory.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#C9CFD6] text-sm">Leadership</span>
                        <span className="text-[#60A5FA] font-medium">{candidate.talentCategory.leadershipPotential}</span>
                      </div>
                      <div className="text-xs text-[#C9CFD6]">
                        Score: {candidate.matchScore}% | {candidate.salaryPrediction.predictedRange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interview Preparation Teaser */}
                <div className="bg-[#FFD700]/5 rounded-lg border border-[#FFD700]/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[#FFFFFF] font-medium mb-1">Interview Ready</h4>
                      <p className="text-[#C9CFD6] text-sm">3 AI-generated questions prepared • Screening confidence: {candidate.screening.confidence}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-[#FFD700]" />
                      <Brain className="w-5 h-5 text-[#60A5FA]" />
                      <Target className="w-5 h-5 text-[#3EFFA8]" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Detailed Candidate Analysis */}
      {selectedCandidate && (() => {
        const candidate = CANDIDATES_DATA.find(c => c.id === selectedCandidate)!
        return (
          <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 bg-[#FFD700]">
                  <AvatarFallback className="text-black font-bold text-lg">
                    {candidate.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-[#FFFFFF]">{candidate.name}</h2>
                  <p className="text-[#C9CFD6]">{candidate.role} • {candidate.location} • {candidate.experience} years experience</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                  <Eye className="w-4 h-4 mr-2" />
                  View Resume
                </Button>
                <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Interview Invite
                </Button>
              </div>
            </div>

            {/* Key AI Insights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                <div className="text-2xl font-bold text-[#FFD700] mb-1">{candidate.matchScore}%</div>
                <div className="text-[#C9CFD6] text-sm">Overall Match Score</div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-xs">Strong Fit</span>
                </div>
              </div>

              <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                <div className="text-2xl font-bold text-[#3EFFA8] mb-1">{candidate.resumeAnalysis.atsScore}%</div>
                <div className="text-[#C9CFD6] text-sm">ATS Compatibility</div>
              </div>

              <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                <div className="text-2xl font-bold text-[#60A5FA] mb-1">{candidate.potential.score}%</div>
                <div className="text-[#C9CFD6] text-sm">Growth Potential</div>
              </div>

              <div className="p-4 bg-[#111315] rounded-lg border border-[#23262B]">
                <div className="text-2xl font-bold text-[#EF4444] mb-1">{candidate.salaryPrediction.predictedRange}</div>
                <div className="text-[#C9CFD6] text-sm">Salary Range</div>
              </div>
            </div>

            {/* Resume Intelligence Feature */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3EFFA8]" />
                Resume Intelligence Analysis
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#C9CFD6]">ATS Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#23262B] rounded-full h-2">
                      <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: `${candidate.resumeAnalysis.atsScore}%` }}></div>
                    </div>
                    <span className="text-[#3EFFA8] font-medium">{candidate.resumeAnalysis.atsScore}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#C9CFD6]">Resume Strength</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#23262B] rounded-full h-2">
                      <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: `${candidate.resumeAnalysis.resumeStrength}%` }}></div>
                    </div>
                    <span className="text-[#FFD700] font-medium">{candidate.resumeAnalysis.resumeStrength}/100</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-[#FFFFFF] font-medium mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.resumeAnalysis.technicalSkills.map((skill, i) => (
                    <Badge key={i} className="bg-[#3EFFA8] text-black">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Red Flags Detector */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#EF4444]" />
                Red Flags Detector
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-[#C9CFD6]">Background Check Status</span>
                  </div>
                  <Badge className="bg-green-900 text-green-300">Clear</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-[#C9CFD6]">Reference Verification</span>
                  </div>
                  <Badge className="bg-green-900 text-green-300">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    <span className="text-[#C9CFD6]">Employment Gap Analysis</span>
                  </div>
                  <Badge className="bg-yellow-900 text-yellow-300">Minor Concerns</Badge>
                </div>
              </div>
            </div>

            {/* Screening Decision */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#3EFFA8]" />
                Screening Decision
              </h3>
              <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#C9CFD6] font-medium">Decision</span>
                  <Badge className={`px-4 py-1 ${
                    candidate.screening.recommendation === 'Shortlist' ? 'bg-green-900 text-green-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {candidate.screening.recommendation}
                  </Badge>
                </div>
                <div className="text-[#C9CFD6] text-sm mb-2">
                  <strong>Confidence:</strong> {candidate.screening.confidence}%
                </div>
                <p className="text-[#818287]">{candidate.screening.reasoning}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-2">Key Strengths</h4>
                  <ul className="space-y-1">
                    {candidate.screening.strengths.map((strength, i) => (
                      <li key={i} className="text-[#C9CFD6] text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#3EFFA8] rounded-full"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-2">Areas for Development</h4>
                  <ul className="space-y-1">
                    {candidate.screening.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-[#C9CFD6] text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pre-Interview Report */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#60A5FA]" />
                Pre-Interview Report
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-2">Key Strengths to Discuss</h4>
                  <ul className="space-y-1">
                    {candidate.preInterview.keyStrengths.map((strength, i) => (
                      <li key={i} className="text-[#C9CFD6] text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#60A5FA] rounded-full"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-2">Areas to Probe Deeper</h4>
                  <ul className="space-y-1">
                    {candidate.preInterview.weakAreas.map((area, i) => (
                      <li key={i} className="text-[#C9CFD6] text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></div>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* AI Interview Questions */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFD700]" />
                AI-Generated Interview Questions
              </h3>
              <div className="space-y-3">
                {candidate.preInterview.suggestedQuestions.map((question, i) => (
                  <div key={i} className="p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                    <div className="flex items-start gap-3">
                      <div className="text-[#FFD700] font-bold text-sm mt-0.5">{i + 1}.</div>
                      <p className="text-[#C9CFD6]">{question}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Talent Categorization */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#EF4444]" />
                Talent Level Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <Star className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#FFD700]">{candidate.talentCategory.level}</div>
                  <div className="text-[#C9CFD6] text-sm">Experience Level</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <Target className="w-8 h-8 text-[#3EFFA8] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#3EFFA8]">{candidate.talentCategory.maturityLevel}</div>
                  <div className="text-[#C9CFD6] text-sm">Career Stage</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <Brain className="w-8 h-8 text-[#60A5FA] mx-auto mb-2" />
                  <div className="text-lg font-bold text-[#60A5FA]">{candidate.talentCategory.leadershipPotential}</div>
                  <div className="text-[#C9CFD6] text-sm">Leadership Fit</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
                <div className="text-center">
                  <div className="text-[#FFD700] font-medium">Overall Assessment</div>
                  <div className="text-[#C9CFD6] text-sm mt-1">
                    {candidate.talentCategory.level} level candidate with {candidate.talentCategory.leadershipPotential} leadership potential
                    and {candidate.talentCategory.innovationCapacity} innovation capacity.
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Fit Assessment */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF6B6B]" />
                Cultural Fit Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Company Values Alignment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Innovation & Learning</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                        <span className="text-[#3EFFA8] text-sm font-medium">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Collaboration Style</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#60A5FA] h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-[#60A5FA] text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Work-Life Balance</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                        <span className="text-[#FFD700] text-sm font-medium">88%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Communication Style</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-[#0D0F11] rounded-lg">
                      <div className="w-3 h-3 bg-[#3EFFA8] rounded-full"></div>
                      <span className="text-[#C9CFD6] text-sm">Direct & Professional</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#0D0F11] rounded-lg">
                      <div className="w-3 h-3 bg-[#60A5FA] rounded-full"></div>
                      <span className="text-[#C9CFD6] text-sm">Adaptable to Team Dynamics</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#0D0F11] rounded-lg">
                      <div className="w-3 h-3 bg-[#FFD700] rounded-full"></div>
                      <span className="text-[#C9CFD6] text-sm">Results-Oriented Mindset</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workload Capacity Analysis */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#9B59B6]" />
                Workload Capacity Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <div className="text-2xl font-bold text-[#3EFFA8] mb-1">{candidate.workloadCapacity.largeProjects}%</div>
                  <div className="text-[#C9CFD6] text-sm">Large Project Handling</div>
                  <div className="text-[#3EFFA8] text-xs mt-1">Excellent fit</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <div className="text-2xl font-bold text-[#60A5FA] mb-1">{candidate.workloadCapacity.teamWork}%</div>
                  <div className="text-[#C9CFD6] text-sm">Team Collaboration</div>
                  <div className="text-[#60A5FA] text-xs mt-1">Strong performer</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <div className="text-2xl font-bold text-[#FFD700] mb-1">{candidate.workloadCapacity.multitasking}%</div>
                  <div className="text-[#C9CFD6] text-sm">Multitasking Ability</div>
                  <div className="text-[#FFD700] text-xs mt-1">Very capable</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#9B59B6]/10 rounded-lg border border-[#9B59B6]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#9B59B6] font-medium">Overall Capacity Score</div>
                    <div className="text-[#C9CFD6] text-sm">Can handle 3-4 concurrent projects with excellence</div>
                  </div>
                  <Badge className="bg-[#9B59B6] text-white">
                    {candidate.workloadCapacity.overall}% Ready
                  </Badge>
                </div>
              </div>
            </div>

            {/* Interview Success Predictor */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#E67E22]" />
                Interview Success Predictor
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#C9CFD6] font-medium">Technical Interview</span>
                      <Badge className="bg-[#3EFFA8] text-black">96% Success</Badge>
                    </div>
                    <div className="text-[#C9CFD6] text-sm mb-3">Predicted: Will perform exceptionally well</div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-[#3EFFA8]" />
                      <span className="text-[#C9CFD6] text-sm">Strong technical fundamentals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#3EFFA8]" />
                      <span className="text-[#C9CFD6] text-sm">Clear communication ability</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#C9CFD6] font-medium">Behavioral Interview</span>
                      <Badge className="bg-[#60A5FA] text-white">90% Success</Badge>
                    </div>
                    <div className="text-[#C9CFD6] text-sm mb-3">Predicted: Above average performance</div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-[#C9CFD6] text-sm">Leadership experience evident</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#60A5FA]" />
                      <span className="text-[#C9CFD6] text-sm">Problem-solving examples ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offer Acceptance Analytics */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#27AE60]" />
                Offer Acceptance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Salary Expectations</h4>
                  <div className="p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                    <div className="text-center mb-2">
                      <div className="text-xl font-bold text-[#FFD700]">{candidate.salaryPrediction.predictedRange}</div>
                      <div className="text-[#C9CFD6] text-sm">Preferred Salary Range</div>
                    </div>
                    <div className="flex justify-between text-sm text-[#C9CFD6] mt-2">
                      <span>Market fit: {candidate.salaryPrediction.marketComparison}</span>
                      <Badge className="bg-[#27AE60] text-white text-xs">
                        Competitive
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Acceptance Probability</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                      <span className="text-[#C9CFD6] text-sm">Standard Offer</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#27AE60] h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="text-[#27AE60] text-sm font-medium">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                      <span className="text-[#C9CFD6] text-sm">Competitive Package</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                        <span className="text-[#3EFFA8] text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#27AE60]/10 rounded-lg border border-[#27AE60]/20">
                <div className="text-center">
                  <div className="text-[#27AE60] font-medium">Recommendation</div>
                  <div className="text-[#C9CFD6] text-sm mt-1">
                    High likelihood of acceptance with a competitive package above ₹20 LPA
                  </div>
                </div>
              </div>
            </div>

            {/* AI Skill Gap Analysis */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF6B6B]" />
                AI Skill Gap Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Current vs Required Skills</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-[#C9CFD6] text-sm font-medium mb-2">Strong Matches</h5>
                      <div className="space-y-2">
                        {candidate.resumeAnalysis.technicalSkills.slice(0, 3).map((skill, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-[#3EFFA8] text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[#C9CFD6] text-sm font-medium mb-2">Skill Gaps</h5>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-[#FFD700] text-sm">React Native</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-[#FFD700] text-sm">Kubernetes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
                  <div className="text-center">
                    <div className="text-[#FFD700] font-medium text-sm">Training Recommendation</div>
                    <div className="text-[#C9CFD6] text-xs mt-1">
                      2-week React Native training • 3-week Kubernetes certification recommended
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Optimization Suggestions */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#9B59B6]" />
                Resume Optimization Suggestions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Recommended Improvements</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[#3EFFA8] font-medium text-sm">Add quantifiable achievements</div>
                        <div className="text-[#C9CFD6] text-xs">"Increased performance by 40%" → "Improved application performance by 40% serving 100K+ users"</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                      <Target className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[#FFD700] font-medium text-sm">Include relevant keywords</div>
                        <div className="text-[#C9CFD6] text-xs">Add: "Full-stack development", "Cloud architecture", "Agile methodologies"</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                      <Brain className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[#60A5FA] font-medium text-sm">Strengthen leadership section</div>
                        <div className="text-[#C9CFD6] text-xs">"Led team of 8" → "Managed cross-functional team of 8 developers delivering 5+ projects"</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#9B59B6]/10 rounded-lg border border-[#9B59B6]/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[#9B59B6] font-medium text-sm">Estimated Impact</div>
                      <div className="text-[#C9CFD6] text-xs">+15-20% higher ATS compatibility</div>
                    </div>
                    <Badge className="bg-[#9B59B6] text-white text-xs">High Priority</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Matching Algorithm Visualization */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#E67E22]" />
                AI Matching Algorithm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Match Score Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Skills Match</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                        <span className="text-[#3EFFA8] text-sm font-medium">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Experience Match</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#60A5FA] h-2 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                        <span className="text-[#60A5FA] text-sm font-medium">89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#C9CFD6] text-sm">Cultural Fit</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#23262B] rounded-full h-2">
                          <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-[#FFD700] text-sm font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Algorithm Weights</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-[#0D0F11] rounded">
                      <span className="text-[#C9CFD6] text-sm">Technical Skills</span>
                      <Badge className="bg-[#3EFFA8] text-black text-xs">40%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#0D0F11] rounded">
                      <span className="text-[#C9CFD6] text-sm">Experience Level</span>
                      <Badge className="bg-[#3EFFA8] text-black text-xs">30%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#0D0F11] rounded">
                      <span className="text-[#C9CFD6] text-sm">Cultural Fit</span>
                      <Badge className="bg-[#60A5FA] text-white text-xs">20%</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#0D0F11] rounded">
                      <span className="text-[#C9CFD6] text-sm">Growth Potential</span>
                      <Badge className="bg-[#FFD700] text-black text-xs">10%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Analytics Dashboard */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6 mb-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#2ECC71]" />
                Predictive Analytics Dashboard
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <BarChart3 className="w-8 h-8 text-[#3EFFA8] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#3EFFA8] mb-1">87%</div>
                  <div className="text-[#C9CFD6] text-xs">Interview Success</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <UserCheck className="w-8 h-8 text-[#60A5FA] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#60A5FA] mb-1">92%</div>
                  <div className="text-[#C9CFD6] text-xs">Job Performance</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <Star className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#FFD700] mb-1">180</div>
                  <div className="text-[#C9CFD6] text-xs">Retention Days</div>
                </div>
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B] text-center">
                  <TrendingUp className="w-8 h-8 text-[#EF4444] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#EF4444] mb-1">95%</div>
                  <div className="text-[#C9CFD6] text-xs">Growth Potential</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#2ECC71]/10 rounded-lg border border-[#2ECC71]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[#2ECC71] font-medium">Hiring Success Prediction</div>
                    <div className="text-[#C9CFD6] text-sm mt-1">
                      This candidate has excellent predicted performance metrics
                    </div>
                  </div>
                  <Badge className="bg-[#2ECC71] text-white">Top Performer</Badge>
                </div>
              </div>
            </div>

            {/* AI Multi-Resume Summary Generator */}
            <div className="bg-[#111315] rounded-xl border border-[#23262B] p-6">
              <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8E44AD]" />
                AI Multi-Resume Summary Generator
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#0D0F11] rounded-lg border border-[#23262B]">
                  <h4 className="text-[#FFFFFF] font-medium mb-3">Consolidated Profile Summary</h4>
                  <p className="text-[#C9CFD6] text-sm leading-relaxed">
                    Senior React Developer with 6+ years of full-stack development experience. Expert in React ecosystem, TypeScript, and cloud technologies. Proven track record of leading development teams and delivering high-performance applications. Strong focus on innovation, collaboration, and continuous learning. Demonstrates exceptional technical aptitude and leadership potential.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
                    <div className="text-center">
                      <div className="text-[#FFD700] font-medium text-sm">Key Highlights</div>
                      <ul className="text-[#C9CFD6] text-xs mt-2 space-y-1">
                        <li>• Led development teams</li>
                        <li>• 40% performance improvements</li>
                        <li>• Cloud architecture expertise</li>
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 bg-[#60A5FA]/10 rounded-lg border border-[#60A5FA]/20">
                    <div className="text-center">
                      <div className="text-[#60A5FA] font-medium text-sm">Unique Value Props</div>
                      <ul className="text-[#C9CFD6] text-xs mt-2 space-y-1">
                        <li>• Full-stack proficiency</li>
                        <li>• Leadership experience</li>
                        <li>• Innovation mindset</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#8E44AD]/10 rounded-lg border border-[#8E44AD]/20">
                  <div>
                    <div className="text-[#8E44AD] font-medium text-sm">Confidence Level</div>
                    <div className="text-[#C9CFD6] text-xs">AI-generated summary with 94% accuracy</div>
                  </div>
                  <Badge className="bg-[#8E44AD] text-white">High Confidence</Badge>
                </div>
              </div>
            </div>
          </Card>
        )
      })()}

      {/* AI Multi-Candidate Comparison */}
      {showComparison && (
        <Card className="bg-[#1A1D21] border border-[#60A5FA] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[#FFFFFF] flex items-center gap-3">
              <Users className="w-7 h-7 text-[#60A5FA]" />
              AI Multi-Candidate Comparison
            </h3>
            <div className="flex gap-3">
              <Badge className="bg-[#60A5FA] text-black">
                {selectedComparisonCandidates.length} Selected
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(false)}
                className="border-[#23262B] text-[#C9CFD6]"
              >
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
          </div>

          {/* Comparison Selection */}
          {selectedComparisonCandidates.length < 5 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#FFFFFF] mb-3">Select Candidates to Compare</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {remainingCandidatesForComparison.slice(0, 8).map((candidate) => (
                  <button
                    key={candidate.id}
                    onClick={() => setSelectedComparisonCandidates([...selectedComparisonCandidates, candidate.id])}
                    className="p-3 bg-[#111315] border border-[#23262B] rounded-lg hover:border-[#60A5FA] transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6 bg-[#60A5FA]">
                        <AvatarFallback className="text-black font-bold text-xs">
                          {candidate.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[#FFFFFF] font-medium text-sm">{candidate.name}</span>
                    </div>
                    <div className="text-[#C9CFD6] text-xs">{candidate.role}</div>
                    <div className="text-[#60A5FA] font-medium text-sm mt-1">{candidate.matchScore}% Match</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Results */}
          {selectedComparisonCandidates.length > 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-[#FFD700]" />
                </div>
                <h4 className="text-xl font-bold text-[#FFFFFF]">AI Comparison Analysis</h4>
                <p className="text-[#C9CFD6] mt-2">Comparing {selectedComparisonCandidates.length} candidates</p>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#23262B]">
                      <th className="text-left p-4 text-[#C9CFD6] font-medium">Criteria</th>
                      {selectedComparisonCandidates.map((id) => {
                        const candidate = CANDIDATES_DATA.find(c => c.id === id)!
                        return (
                          <th key={id} className="p-4 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <Avatar className="w-8 h-8 bg-[#60A5FA]">
                                <AvatarFallback className="text-black font-bold text-xs">
                                  {candidate.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-[#FFFFFF] font-medium text-sm">{candidate.name.split(' ')[0]}</div>
                            </div>
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#23262B]/50">
                      <td className="p-4 text-[#FFFFFF] font-medium">Match Score</td>
                      {selectedComparisonCandidates.map((id) => {
                        const candidate = CANDIDATES_DATA.find(c => c.id === id)!
                        return (
                          <td key={id} className="p-4 text-center">
                            <Badge className={`${
                              candidate.matchScore >= 90 ? 'bg-green-900 text-green-300' :
                              candidate.matchScore >= 80 ? 'bg-blue-900 text-blue-300' :
                              'bg-red-900 text-red-300'
                            }`}>
                              {candidate.matchScore}%
                            </Badge>
                          </td>
                        )
                      })}
                    </tr>

                    <tr className="border-b border-[#23262B]/50">
                      <td className="p-4 text-[#FFFFFF] font-medium">Experience</td>
                      {selectedComparisonCandidates.map((id) => {
                        const candidate = CANDIDATES_DATA.find(c => c.id === id)!
                        return (
                          <td key={id} className="p-4 text-center text-[#C9CFD6]">
                            {candidate.experience} years
                          </td>
                        )
                      })}
                    </tr>

                    <tr className="border-b border-[#23262B]/50">
                      <td className="p-4 text-[#FFFFFF] font-medium">Salary Range</td>
                      {selectedComparisonCandidates.map((id) => {
                        const candidate = CANDIDATES_DATA.find(c => c.id === id)!
                        return (
                          <td key={id} className="p-4 text-center">
                            <span className="text-[#84CC16] font-medium text-sm">
                              {candidate.salaryPrediction.predictedRange}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
