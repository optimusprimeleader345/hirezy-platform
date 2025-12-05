'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  Download,
  Share2,
  MessageCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  User,
  Globe,
  Award,
  Brain,
  Zap,
  Target,
  AlertTriangle,
  Eye,
  Edit,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function CandidateProfilePage() {
  const [candidate, setCandidate] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStage, setSelectedStage] = useState('')
  const params = useParams()
  const router = useRouter()

  // Mock candidate data with comprehensive AI insights
  const mockCandidates = {
    '1': {
      id: 1,
      name: 'Alex Chen',
      avatar: 'AC',
      email: 'alex.chen@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      currentPosition: 'Senior Frontend Developer',
      appliedRole: 'React Developer',
      experience: 5,
      education: 'Stanford University - CS',
      appliedDate: '2024-01-15',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Jest', 'Next.js'],
      fitScore: 97,

      // AI Analysis
      aiSummary: {
        overallFit: 'Exceptional Match',
        strengths: [
          'Outstanding technical expertise in React ecosystem',
          'Strong leadership experience and communication skills',
          'Proven track record in high-growth companies',
          'Excellent problem-solving approach evident in portfolio'
        ],
        weaknesses: [
          'Limited backend development experience',
          'Presentations could benefit from more visuals'
        ],
        culturalFit: 'Strong team player with innovative mindset'
      },


      portfolio: [
        'https://portfolio-alex.com',
        'https://github.com/alexchen',
        'https://linkedin.com/in/alexchen'
      ],

      // AI Predictions
      successProbability: 92,
      retentionRisk: 'Low',
      salaryExpectation: '$140k-$160k',
      timeToJoin: '2-4 weeks',

      // Cultural fit analysis
      personality: {
        extraversion: 85,
        openness: 92,
        conscientiousness: 88,
        agreeableness: 79,
        neuroticism: 23
      },

      // Assessment scores
      assessments: {
        technical: 94,
        communication: 92,
        leadership: 88,
        culturalFit: 91
      }
    }
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const candidateId = params.id as string
      setCandidate(mockCandidates[candidateId as keyof typeof mockCandidates] || mockCandidates['1'])
      setSelectedStage('interview')
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading || !candidate) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3EFFA8]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-[#FFFFFF]">{candidate.name}</h1>
            <p className="text-[#C9CFD6]">Applied for {candidate.appliedRole}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8]">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#3EFFA8] to-[#00ff88]">
                <AvatarFallback className="text-2xl font-bold text-black">
                  {candidate.avatar}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-[#FFFFFF] mb-2">{candidate.name}</h2>
              <p className="text-[#C9CFD6] mb-4">{candidate.currentPosition}</p>

              {/* Fit Score */}
              <div className="bg-[#111315] rounded-lg p-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#3EFFA8] mb-1">{candidate.fitScore}%</div>
                  <p className="text-[#C9CFD6] text-sm">AI Fit Score</p>
                  <div className="w-full bg-[#23262B] rounded-full h-2 mt-2">
                    <div
                      className="bg-[#3EFFA8] h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${candidate.fitScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9CFD6]" />
                <span className="text-[#FFFFFF] text-sm">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9CFD6]" />
                <span className="text-[#FFFFFF] text-sm">{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C9CFD6]" />
                <span className="text-[#FFFFFF] text-sm">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#C9CFD6]" />
                <span className="text-[#FFFFFF] text-sm">Applied {candidate.appliedDate}</span>
              </div>
            </div>
          </Card>

          {/* Stage Management */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Application Stage</h3>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="bg-[#111315] border-[#23262B] text-[#E2E8F0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1D21] border-[#23262B]">
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interview">Interview Scheduled</SelectItem>
                <SelectItem value="offer">Offer Extended</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 flex gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1">
                <ThumbsDown className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </Card>

          {/* AI Predictions */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#A855F7]">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#A855F7]" />
              <h3 className="text-lg font-bold text-[#FFFFFF]">AI Predictions</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#C9CFD6] text-sm">Success Probability</span>
                <span className="text-green-400 font-medium">{candidate.successProbability}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9CFD6] text-sm">Retention Risk</span>
                <span className={`font-medium ${
                  candidate.retentionRisk === 'Low' ? 'text-green-400' :
                  candidate.retentionRisk === 'Medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {candidate.retentionRisk}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9CFD6] text-sm">Time to Join</span>
                <span className="text-[#FFFFFF] font-medium">{candidate.timeToJoin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C9CFD6] text-sm">Salary Range</span>
                <span className="text-[#FFFFFF] font-medium">{candidate.salaryExpectation}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Middle Column - AI Analysis */}
        <div className="space-y-6">
          {/* AI Summary */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#FFD700]">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#FFD700]" />
              <h3 className="text-lg font-bold text-[#FFFFFF]">AI Candidate Summary</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[#FFD700] font-medium mb-2">Overall Assessment</h4>
                <p className="text-[#C9CFD6] text-sm">{candidate.aiSummary.overallFit}</p>
              </div>

              <div>
                <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-1">
                  {candidate.aiSummary.strengths.map((strength: string, i: number) => (
                    <li key={i} className="text-[#C9CFD6] text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-orange-400 font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Areas for Development
                </h4>
                <ul className="space-y-1">
                  {candidate.aiSummary.weaknesses?.map((weakness: string, i: number) => (
                    <li key={i} className="text-[#C9CFD6] text-sm flex items-start gap-2">
                      <span className="text-orange-400 mt-0.5">•</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#111315] rounded-lg p-3">
                <h4 className="text-[#A855F7] font-medium mb-2">Cultural Fit Analysis</h4>
                <p className="text-[#C9CFD6] text-sm">{candidate.aiSummary.culturalFit}</p>
              </div>
            </div>
          </Card>

          {/* Assessment Scores */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Assessment Scores</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(candidate.assessments).map(([key, value]: [string, any]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-[#3EFFA8] mb-1">{value}</div>
                  <p className="text-[#C9CFD6] text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <div className="w-full bg-[#23262B] rounded-full h-1 mt-2">
                    <div
                      className="bg-[#3EFFA8] h-1 rounded-full"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skills Matrix */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Skills Matrix</h3>
            <div className="grid grid-cols-2 gap-2">
              {candidate.skills.map((skill: string, i: number) => (
                <Badge key={i} variant="outline" className="border-[#3EFFA8] text-[#3EFFA8] justify-center">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Experience & Actions */}
        <div className="space-y-6">
          {/* Experience Timeline */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Experience
            </h3>
            <div className="space-y-4">
              {candidate.experience.map((exp: any, i: number) => (
                <div key={i} className="relative pl-4 border-l-2 border-[#3EFFA8]">
                  <div className="absolute w-3 h-3 bg-[#3EFFA8] rounded-full -left-1.5 top-2"></div>
                  <h4 className="text-[#FFFFFF] font-medium">{exp.position}</h4>
                  <p className="text-[#3EFFA8] font-medium text-sm">{exp.company}</p>
                  <p className="text-[#C9CFD6] text-sm">{exp.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement: string, j: number) => (
                      <li key={j} className="text-[#C9CFD6] text-sm flex items-start gap-2">
                        <span className="text-[#3EFFA8] mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Links */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Portfolio & Links
            </h3>
            <div className="space-y-3">
              {candidate.portfolio.map((link: string, i: number) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] justify-start"
                  onClick={() => window.open(link, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {link.split('//')[1] || link}
                </Button>
              ))}
            </div>
          </Card>

          {/* Personality Insights */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 border-b-2 border-b-[#EC4899]">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#EC4899]" />
              Personality Profile
            </h3>
            <div className="space-y-3">
              {Object.entries(candidate.personality).map(([trait, score]: [string, any]) => (
                <div key={trait}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#C9CFD6] text-sm capitalize">{trait}</span>
                    <span className="text-[#EC4899] font-medium">{score}%</span>
                  </div>
                  <div className="w-full bg-[#23262B] rounded-full h-2">
                    <div
                      className="bg-[#EC4899] h-2 rounded-full"
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Panel */}
          <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
                <FileText className="w-4 h-4 mr-2" />
                Request More Info
              </Button>
              <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" className="border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
                <Edit className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
