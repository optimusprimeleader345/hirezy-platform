'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Brain,
  FileText,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  BarChart3,
  Zap,
  Upload,
  Eye,
  Download,
  Share,
  Code,
  Star,
  CheckCircle,
  AlertTriangle,
  Users,
  Award,
  Search,
  Plus,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Book,
  PenTool,
  Microscope,
  PieChart,
  Users2,
  Filter,
  X,
  Copy,
  Wand2,
  SplitSquareHorizontal,
  Tag,
  Bot,
  Lightbulb
} from 'lucide-react'

const AI_TOOLS = [
  {
    id: 'resume-analyzer',
    title: 'Resume & Skill Analyzer',
    description: 'AI-powered CV parsing with skill extraction and ATS optimization',
    icon: FileText,
    color: '#3EFFA8',
    features: [
      'NLP-based skill extraction',
      'ATS compatibility scoring',
      'Resume strength analysis',
      'Missing skills identification',
      'Behavioral insights from language'
    ],
    usageStats: { today: 247, total: 12470 }
  },
  {
    id: 'candidate-scoring',
    title: 'Candidate Scoring & Ranking',
    description: 'Intelligent evaluation and ranking based on multiple criteria',
    icon: Target,
    color: '#60A5FA',
    features: [
      'Skill match percentage calculation',
      'Experience relevance scoring',
      'Cultural fit prediction',
      'Lead scoring algorithms',
      'Automated ranking system'
    ],
    usageStats: { today: 189, total: 8925 }
  },
  {
    id: 'candidate-summary',
    title: 'AI Candidate Summary',
    description: 'Generate professional candidate profiles with insights',
    icon: Users,
    color: '#F59E0B',
    features: [
      'Professional summary generation',
      'Strengths & weaknesses analysis',
      'Team fit prediction',
      'Communication assessment',
      'Career potential evaluation'
    ],
    usageStats: { today: 156, total: 6734 }
  },
  {
    id: 'content-generator',
    title: 'Content Generators Suite',
    description: 'AI-powered creation of job descriptions and communications',
    icon: PenTool,
    color: '#EF4444',
    features: [
      'Full job description generation',
      'JD improvement suggestions',
      'Skill requirement extraction',
      'Company tone matching',
      'ATS-optimized formatting'
    ],
    usageStats: { today: 312, total: 15420 }
  },
  {
    id: 'interview-assistant',
    title: 'Interview Intelligence',
    description: 'AI-driven interview preparation and question generation',
    icon: Calendar,
    color: '#8B5CF6',
    features: [
      'Role-specific question generation',
      'Junior to senior difficulty scaling',
      'Follow-up question suggestions',
      'Answer evaluation criteria',
      'Assessment scoring system'
    ],
    usageStats: { today: 98, total: 4234 }
  },
  {
    id: 'behavioral-analytics',
    title: 'Behavioral Analytics',
    description: 'Personality and soft-skills assessment from resumes',
    icon: Microscope,
    color: '#EC4899',
    features: [
      'Leadership potential scoring',
      'Communication strength analysis',
      'Teamwork orientation prediction',
      'Problem-solving mindset evaluation',
      'Confidence level assessment'
    ],
    usageStats: { today: 78, total: 2876 }
  },
  {
    id: 'screening-assistant',
    title: 'AI Screening Assistant',
    description: 'Automated candidate filtering and decision recommendations',
    icon: Filter,
    color: '#06B6D4',
    features: [
      'Pass/fail recommendations',
      'Skill gap identification',
      'Interview necessity evaluation',
      'Role suitability matching',
      'Hiring timeline optimization'
    ],
    usageStats: { today: 234, total: 9834 }
  },
  {
    id: 'analytics-hub',
    title: 'AI Analytics & Insights',
    description: 'Advanced hiring pattern analysis and performance metrics',
    icon: PieChart,
    color: '#84CC16',
    features: [
      'Top-performing job sources',
      'Candidate quality trends',
      'Hiring cycle optimization',
      'Diversity hiring analytics',
      'Market demand forecasting'
    ],
    usageStats: { today: 56, total: 1456 }
  }
]

const QUICK_ACTIONS = [
  {
    title: 'Analyze Resume',
    description: 'Upload and analyze a candidate resume',
    icon: Upload,
    action: 'upload',
    color: '#3EFFA8'
  },
  {
    title: 'Generate Job Description',
    description: 'Create a compelling job posting from scratch',
    icon: Plus,
    action: 'generate-jd',
    color: '#60A5FA'
  },
  {
    title: 'Score Candidates',
    description: 'Compare candidates against a specific role',
    icon: Target,
    action: 'score',
    color: '#F59E0B'
  },
  {
    title: 'Get Interview Questions',
    description: 'Generate role-specific interview questions',
    icon: Search,
    action: 'questions',
    color: '#EF4444'
  }
]

const AI_METRICS = [
  { label: 'Active Sessions', value: '1,247', trend: '+12%', icon: Brain, color: '#3EFFA8' },
  { label: 'AI Accuracy', value: '94.7%', trend: '+0.3%', icon: Target, color: '#60A5FA' },
  { label: 'Processing Speed', value: '2.3s', trend: '-0.2s', icon: Zap, color: '#F59E0B' },
  { label: 'Human Validation', value: '98.2%', trend: '+1.1%', icon: CheckCircle, color: '#EF4444' }
]

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  // Tool states
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isResumeAnalyzing, setIsResumeAnalyzing] = useState(false)
  const [jdDescription, setJdDescription] = useState('')
  const [isGeneratingJD, setIsGeneratingJD] = useState(false)
  const [interviewRole, setInterviewRole] = useState('')
  const [interviewLevel, setInterviewLevel] = useState('mid')
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([])
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false)
  const [candidateScoreInput, setCandidateScoreInput] = useState('')
  const [isScoringCandidate, setIsScoringCandidate] = useState(false)

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId)
    setSelectedAction(null) // Reset quick action when opening tool
  }

  const handleQuickAction = (action: string) => {
    setSelectedAction(action)
    setSelectedTool(null) // Reset tool when using quick action

    // Auto-populate tool based on quick action
    if (action === 'upload') {
      setSelectedTool('resume-analyzer')
    } else if (action === 'generate-jd') {
      setSelectedTool('content-generator')
    } else if (action === 'score') {
      setSelectedTool('candidate-scoring')
    } else if (action === 'questions') {
      setSelectedTool('interview-assistant')
    }
  }

  const closeTool = () => {
    setSelectedTool(null)
    setSelectedAction(null)
  }

  // Resume Analysis
  const handleResumeAnalyze = async () => {
    if (!resumeFile) return
    setIsResumeAnalyzing(true)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsResumeAnalyzing(false)
    setResumeFile(null)
  }

  // JD Generation
  const handleJDGenerate = async () => {
    if (!jdDescription) return
    setIsGeneratingJD(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2500))
    setIsGeneratingJD(false)
    setJdDescription('')
  }

  // Interview Questions Generation
  const handleQuestionsGenerate = async () => {
    if (!interviewRole) return
    setIsGeneratingQuestions(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    const questions = [
      `Can you walk us through a challenging project you've worked on as a ${interviewRole}?`,
      `What technical skills do you consider most important for a ${interviewRole} role?`,
      `How do you handle tight deadlines and multiple competing priorities?`,
      `Describe your experience with code reviews and collaborative development.`,
      `How do you approach learning new technologies and staying current in ${interviewRole}-related fields?`
    ] as string[]
    setGeneratedQuestions(questions)
    setIsGeneratingQuestions(false)
  }

  // Candidate Scoring
  const handleCandidateScore = async () => {
    if (!candidateScoreInput) return
    setIsScoringCandidate(true)
    // Simulate AI scoring
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsScoringCandidate(false)
    setCandidateScoreInput('')
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#3EFFA8]" />
            AI Tools Hub
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Enterprise-grade AI intelligence suite for every phase of talent acquisition
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Plus className="w-4 h-4 mr-2" />
            New AI Workflow
          </Button>
          <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics Dashboard
          </Button>
        </div>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {AI_METRICS.map((metric, i) => (
          <Card key={i} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 rounded-full bg-[#111315]" style={{ backgroundColor: `${metric.color}20` }}>
                <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
              </div>
              <span className="text-[#C9CFD6] text-sm">This month</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
            <div className="text-[#C9CFD6] text-sm">{metric.label}</div>
            <div className={`text-sm font-medium mt-1 ${
              metric.trend.includes('+') ? 'text-green-400' : 'text-red-400'
            }`}>
              {metric.trend}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-[#FFD700]" />
          <h2 className="text-xl font-bold text-[#FFFFFF]">Quick Actions</h2>
          <p className="text-[#C9CFD6] text-sm">Jump directly into your most common AI tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleQuickAction(action.action)}
              className={`p-6 bg-[#111315] border border-[#23262B] rounded-xl hover:border-[${action.color}] transition-all duration-200 text-left`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <span className="text-[#FFFFFF] font-medium">{action.title}</span>
              </div>
              <p className="text-[#C9CFD6] text-sm">{action.description}</p>
              <div className="mt-3 flex items-center text-[#3EFFA8] text-sm font-medium">
                <span>Get Started</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* AI Tools Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Brain className="w-7 h-7 text-[#3EFFA8]" />
            AI Intelligence Suite
          </h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Models
            </Button>
            <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
              <Book className="w-4 h-4 mr-2" />
              AI Documentation
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {AI_TOOLS.map((tool) => (
            <Card
              key={tool.id}
              className={`bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 hover:border-[${tool.color}] hover:shadow-lg transition-all duration-200 cursor-pointer`}
              onClick={() => handleToolClick(tool.id)}
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${tool.color}20` }}
                  >
                    <tool.icon className="w-7 h-7" style={{ color: tool.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#FFFFFF]">{tool.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-[#3EFFA8] text-black text-xs">Active</Badge>
                      <span className="text-[#C9CFD6] text-sm">
                        {tool.usageStats.today} uses today
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#C9CFD6] text-sm mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                {tool.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#3EFFA8] flex-shrink-0" />
                    <span className="text-[#C9CFD6] text-sm">{feature}</span>
                  </div>
                ))}
                {tool.features.length > 3 && (
                  <div className="text-[#8A8F98] text-sm pl-6">
                    + {tool.features.length - 3} more features
                  </div>
                )}
              </div>

              {/* Usage Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-[#23262B]">
                <div className="text-center">
                  <div className="text-lg font-bold text-[#FFFFFF]">{tool.usageStats.today}</div>
                  <div className="text-[#C9CFD6] text-xs">Today</div>
                </div>
                <div className="w-px h-8 bg-[#23262B]" />
                <div className="text-center">
                  <div className="text-lg font-bold text-[#FFFFFF]">
                    {Number(tool.usageStats.total).toLocaleString()}
                  </div>
                  <div className="text-[#C9CFD6] text-xs">Total</div>
                </div>
                <div className="w-px h-8 bg-[#23262B]" />
                <Button
                  size="sm"
                  className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black text-xs px-3"
                >
                  Launch
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-[#FFD700]" />
            AI Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#111315] rounded-lg">
              <span className="text-[#C9CFD6]">Resume Analyzer Accuracy</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-[#23262B] rounded-full h-2">
                  <div className="bg-[#3EFFA8] h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-[#3EFFA8] font-medium text-sm">94%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#111315] rounded-lg">
              <span className="text-[#C9CFD6]">Candidate Scoring Precision</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-[#23262B] rounded-full h-2">
                  <div className="bg-[#60A5FA] h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <span className="text-[#60A5FA] font-medium text-sm">89%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#111315] rounded-lg">
              <span className="text-[#C9CFD6]">Content Generation Quality</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-[#23262B] rounded-full h-2">
                  <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
                <span className="text-[#F59E0B] font-medium text-sm">96%</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-[#EF4444]" />
            Recent AI Achievements
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-[#111315] rounded-lg">
              <CheckCircle className="w-5 h-5 text-[#3EFFA8] mt-0.5" />
              <div>
                <div className="text-[#FFFFFF] font-medium text-sm">99.7% ATS Compliance Rate</div>
                <div className="text-[#C9CFD6] text-xs">Achieved with Resume Analyzer optimization</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#111315] rounded-lg">
              <Star className="w-5 h-5 text-[#FFD700] mt-0.5" />
              <div>
                <div className="text-[#FFFFFF] font-medium text-sm">47% Time Savings in Screening</div>
                <div className="text-[#C9CFD6] text-xs">Powered by Scoring & Ranking algorithms</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#111315] rounded-lg">
              <Zap className="w-5 h-5 text-[#EF4444] mt-0.5" />
              <div>
                <div className="text-[#FFFFFF] font-medium text-sm">91% Candidate Quality Improvement</div>
                <div className="text-[#C9CFD6] text-xs">Advanced behavioral analytics integration</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Tool Modal/Interface */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D21] border border-[#23262B] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#23262B]">
              <div className="flex items-center gap-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${AI_TOOLS.find(t => t.id === selectedTool)?.color}20` }}
                >
                  {AI_TOOLS.find(t => t.id === selectedTool)?.icon && React.createElement(AI_TOOLS.find(t => t.id === selectedTool)!.icon, {
                    className: "w-6 h-6",
                    style: { color: AI_TOOLS.find(t => t.id === selectedTool)?.color }
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#FFFFFF]">
                    {AI_TOOLS.find(t => t.id === selectedTool)?.title}
                  </h2>
                  <p className="text-[#C9CFD6] mt-1">
                    {AI_TOOLS.find(t => t.id === selectedTool)?.description}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={closeTool}
                className="border-[#23262B] text-[#C9CFD6] hover:text-[#FFFFFF]"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Tool Content */}
            <div className="p-6">
              {selectedTool === 'resume-analyzer' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <Card className="bg-[#111315] border border-[#23262B] p-6">
                      <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                        <Upload className="w-6 h-6 text-[#3EFFA8]" />
                        Upload Resume
                      </h3>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-[#23262B] rounded-xl p-8 text-center">
                          {resumeFile ? (
                            <div className="space-y-2">
                              <FileText className="w-12 h-12 text-[#3EFFA8] mx-auto mb-4" />
                              <p className="text-[#FFFFFF] font-medium">{resumeFile.name}</p>
                              <p className="text-[#C9CFD6] text-sm">
                                {(resumeFile.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <Upload className="w-16 h-16 text-[#C9CFD6] mx-auto" />
                              <div>
                                <p className="text-[#FFFFFF] font-medium mb-2">Drop your resume here</p>
                                <p className="text-[#C9CFD6] text-sm">or click to browse files</p>
                              </div>
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                  const file = e.target.files?.[0]
                                  if (file) setResumeFile(file)
                                }}
                                className="hidden"
                                id="resume-upload"
                              />
                              <label htmlFor="resume-upload">
                                <Button
                                  variant="outline"
                                  className="border-[#3EFFA8] text-[#3EFFA8] hover:bg-[#3EFFA8] hover:text-black"
                                  type="button"
                                >
                                  Choose File
                                </Button>
                              </label>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={handleResumeAnalyze}
                          disabled={!resumeFile || isResumeAnalyzing}
                          className="w-full bg-[#3EFFA8] hover:bg-[#00ff88] text-black"
                        >
                          {isResumeAnalyzing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                              Analyzing Resume...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Analyze Resume
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>

                    {/* Features */}
                    <Card className="bg-[#111315] border border-[#23262B] p-6">
                      <h3 className="text-xl font-bold text-[#FFFFFF] mb-4">AI Analysis Features</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Brain className="w-5 h-5 text-[#3EFFA8]" />
                          <span className="text-[#C9CFD6]">NLP-powered skill extraction</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-[#60A5FA]" />
                          <span className="text-[#C9CFD6]">ATS compatibility scoring</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Code className="w-5 h-5 text-[#F59E0B]" />
                          <span className="text-[#C9CFD6]">Technical skill analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-[#EF4444]" />
                          <span className="text-[#C9CFD6]">Behavioral insights</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {selectedTool === 'content-generator' && (
                <div className="space-y-6">
                  <Card className="bg-[#111315] border border-[#23262B] p-6">
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                      <PenTool className="w-6 h-6 text-[#EF4444]" />
                      Job Description Generator
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[#FFFFFF] font-medium mb-2 block">
                          Describe the role and requirements
                        </label>
                        <Textarea
                          placeholder="e.g., We need a Senior React Developer with 5+ years of experience in modern JavaScript frameworks, AWS deployment, and agile development practices..."
                          value={jdDescription}
                          onChange={(e) => setJdDescription(e.target.value)}
                          className="bg-[#1A1D21] border-[#23262B] text-[#E2E8F0] min-h-[120px]"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={handleJDGenerate}
                          disabled={!jdDescription || isGeneratingJD}
                          className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
                        >
                          {isGeneratingJD ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Wand2 className="w-4 h-4 mr-2" />
                              Generate Job Description
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                          <Book className="w-4 h-4 mr-2" />
                          Templates
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {selectedTool === 'interview-assistant' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input */}
                    <Card className="bg-[#111315] border border-[#23262B] p-6">
                      <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-[#8B5CF6]" />
                        Generate Interview Questions
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[#FFFFFF] font-medium mb-2 block">Role Position</label>
                          <Input
                            placeholder="e.g., Frontend Developer, Data Scientist, Product Manager"
                            value={interviewRole}
                            onChange={(e) => setInterviewRole(e.target.value)}
                            className="bg-[#1A1D21] border-[#23262B] text-[#E2E8F0]"
                          />
                        </div>
                        <div>
                          <label className="text-[#FFFFFF] font-medium mb-2 block">Experience Level</label>
                          <select
                            value={interviewLevel}
                            onChange={(e) => setInterviewLevel(e.target.value)}
                            className="w-full p-3 bg-[#1A1D21] border border-[#23262B] rounded-lg text-[#E2E8F0]"
                          >
                            <option value="junior">Junior (0-2 years)</option>
                            <option value="mid">Mid-level (2-5 years)</option>
                            <option value="senior">Senior (5+ years)</option>
                            <option value="lead">Lead/Principal (8+ years)</option>
                          </select>
                        </div>
                        <Button
                          onClick={handleQuestionsGenerate}
                          disabled={!interviewRole || isGeneratingQuestions}
                          className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                        >
                          {isGeneratingQuestions ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Generating Questions...
                            </>
                          ) : (
                            <>
                              <Search className="w-4 h-4 mr-2" />
                              Generate Questions
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>

                    {/* Generated Questions */}
                    <Card className="bg-[#111315] border border-[#23262B] p-6">
                      <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                        <MessageSquare className="w-6 h-6 text-[#8B5CF6]" />
                        Generated Questions
                      </h3>
                      {generatedQuestions.length > 0 ? (
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {generatedQuestions.map((question, i) => (
                            <div key={i} className="p-3 bg-[#1A1D21] border border-[#23262B] rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className="bg-[#8B5CF6] text-white text-xs">Question {i + 1}</Badge>
                                <Button variant="outline" size="sm" className="border-[#23262B] text-[#C9CFD6]">
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                              <p className="text-[#E2E8F0] text-sm">{question}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Search className="w-12 h-12 text-[#C9CFD6] mx-auto mb-4 opacity-50" />
                          <p className="text-[#C9CFD6]">Questions will appear here after generation</p>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              )}

              {selectedTool === 'candidate-scoring' && (
                <div className="space-y-6">
                  <Card className="bg-[#111315] border border-[#23262B] p-6">
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                      <Target className="w-6 h-6 text-[#60A5FA]" />
                      Candidate Scoring & Ranking
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[#FFFFFF] font-medium mb-2 block">
                          Describe the candidate or paste their resume content
                        </label>
                        <Textarea
                          placeholder="Paste candidate resume content, job requirements, or candidate profile details..."
                          value={candidateScoreInput}
                          onChange={(e) => setCandidateScoreInput(e.target.value)}
                          className="bg-[#1A1D21] border-[#23262B] text-[#E2E8F0] min-h-[150px]"
                        />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={handleCandidateScore}
                          disabled={!candidateScoreInput || isScoringCandidate}
                          className="bg-[#60A5FA] hover:bg-[#3B82F6] text-white"
                        >
                          {isScoringCandidate ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Analyzing Candidate...
                            </>
                          ) : (
                            <>
                              <Target className="w-4 h-4 mr-2" />
                              Score Candidate
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                          <SplitSquareHorizontal className="w-4 h-4 mr-2" />
                          Compare Multiple
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Scoring Result (Mocked) */}
                  {candidateScoreInput && !isScoringCandidate && candidateScoreInput.length > 10 && (
                    <Card className="bg-[#111315] border border-[#23262B] p-6">
                      <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-[#3EFFA8]" />
                        AI Candidate Assessment
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-[#1A1D21] rounded-lg border border-[#23262B]">
                          <div className="text-3xl font-bold text-[#3EFFA8]">87%</div>
                          <div className="text-[#C9CFD6] text-sm">Overall Match Score</div>
                        </div>
                        <div className="text-center p-4 bg-[#1A1D21] rounded-lg border border-[#23262B]">
                          <div className="text-3xl font-bold text-[#60A5FA]">8.2</div>
                          <div className="text-[#C9CFD6] text-sm">Experience Rating</div>
                        </div>
                        <div className="text-center p-4 bg-[#1A1D21] rounded-lg border border-[#23262B]">
                          <div className="text-3xl font-bold text-[#F59E0B]">9.1</div>
                          <div className="text-[#C9CFD6] text-sm">Skills Alignment</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-[#FFFFFF] font-semibold">Key Insights:</h4>
                        <ul className="text-[#C9CFD6] text-sm space-y-1">
                          <li>• Strong technical foundation with excellent problem-solving skills</li>
                          <li>• Leadership experience shown in project management roles</li>
                          <li>• Communication skills evident from previous team collaborations</li>
                          <li>• Room for growth in advanced cloud architecture knowledge</li>
                        </ul>
                      </div>
                    </Card>
                  )}
                </div>
              )}

              {/* Placeholder for other tools */}
              {['candidate-summary', 'behavioral-analytics', 'screening-assistant', 'analytics-hub'].includes(selectedTool!) && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Lightbulb className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">Feature Coming Soon</h3>
                  <p className="text-[#C9CFD6] max-w-md mx-auto">
                    This advanced AI tool is currently in development and will be available in the next release.
                    Stay tuned for cutting-edge capabilities!
                  </p>
                  <Button
                    onClick={closeTool}
                    className="mt-6 bg-[#FFD700] hover:bg-[#FFC107] text-black"
                  >
                    Back to Tools Hub
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import React from 'react'
