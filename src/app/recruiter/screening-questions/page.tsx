'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  MessageSquare,
  Brain,
  Lightbulb,
  Target,
  Zap,
  Copy,
  Edit,
  CheckCircle,
  Clock,
  Star,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  RefreshCw
} from 'lucide-react'

// AI Screening Questions Engine
const SCREENING_AI = {
  generateQuestions: (filters: {
    skillLevel: string
    seniority: string
    roleType: string
    experience: string
    focusAreas: string[]
  }) => {
    const questionSets = {
      // Technical Questions
      technical: {
        'junior': [
          'Can you walk me through how you would build a simple React component?',
          'How do you handle state management in a small application?',
          'What is the difference between var, let, and const in JavaScript?',
          'How would you debug a JavaScript error in the browser?',
          'What is a REST API and how have you used one?',
          'Can you explain what responsive design means?',
          'How do you handle errors in JavaScript?'
        ],
        'mid': [
          'How would you optimize a React component that re-renders frequently?',
          'Can you explain the React component lifecycle?',
          'How do you manage state across multiple components?',
          'What are React hooks and why are they useful?',
          'How would you implement authentication in a web application?',
          'Can you walk me through designing a scalable state management solution?',
          'How do you handle API calls and error handling in React?'
        ],
        'senior': [
          'How would you architect a large-scale React application?',
          'Can you discuss performance optimization strategies?',
          'How do you approach code splitting and lazy loading?',
          'What are your thoughts on micro-frontends?',
          'How would you handle complex state management in a large team?',
          'Can you discuss your experience with testing strategies?',
          'How do you ensure code quality in a large codebase?'
        ]
      },

      // Behavioral Questions
      behavioral: {
        'junior': [
          'Tell me about a challenging project you worked on',
          'How do you approach learning new technologies?',
          'Describe a time when you received constructive feedback',
          'How do you handle tight deadlines?',
          'Tell me about a time you had to ask for help',
          'How do you stay updated with industry trends?',
          'Describe your ideal work environment'
        ],
        'mid': [
          'Tell me about a technical decision you made and its impact',
          'How do you handle disagreements within a team?',
          'Describe leading a small project or initiative',
          'How do you balance technical debt and delivering features?',
          'Tell me about mentoring a junior developer',
          'How do you handle competing priorities?',
          'Describe your approach to code reviews'
        ],
        'senior': [
          'How have you influenced technical direction in past roles?',
          'Tell me about scaling a team or system you built',
          'How do you approach technical leadership?',
          'Describe handling a high-stakes technical decision',
          'How do you balance innovation with delivery?',
          'Tell me about managing stakeholder expectations',
          'How do you foster a culture of continuous improvement?'
        ]
      },

      // Scenario-based Questions
      scenario: {
        'junior': [
          'You find a bug in production, how do you approach fixing it?',
          'A team member is stuck, how do you help them?',
          'You disagree with your assigned task, what do you do?',
          'How do you handle multiple feature requests at once?',
          'A deadline is approaching and you\'re not ready, what now?',
          'You discover a security vulnerability, what\'s your process?',
          'How do you handle unclear requirements?'
        ],
        'mid': [
          'You need to refactor a complex component, how do you approach it?',
          'Two team members have conflicting solutions, how do you mediate?',
          'You need to implement a feature but lack domain knowledge',
          'How do you handle a production incident under pressure?',
          'You need to estimate a complex feature request',
          'A junior team member submits poor code, how do you respond?',
          'How do you handle changing requirements mid-project?'
        ],
        'senior': [
          'You need to modernize a legacy system, how do you approach it?',
          'Team productivity is declining, what do you investigate?',
          'You need to make a company-wide architectural decision',
          'How do you handle conflicting stakeholder requirements?',
          'You need to scale your team rapidly, what\'s your strategy?',
          'A critical system failure occurs, how do you manage the crisis?',
          'You must reduce technical debt without halting feature delivery'
        ]
      }
    }

    const questions = []
    const { skillLevel, seniority, roleType, focusAreas } = filters

    // Map skill levels to seniority (simplified)
    const seniorityMap = {
      'beginner': 'junior',
      'intermediate': 'mid',
      'advanced': 'mid',
      'expert': 'senior'
    }

    const mappedSeniority = seniorityMap[skillLevel as keyof typeof seniorityMap] || seniorityMap['beginner']

    // Generate mix of question types
    if (focusAreas.includes('technical') || focusAreas.length === 0) {
      const techQuestions = questionSets.technical[mappedSeniority as keyof typeof questionSets.technical]
      questions.push(...techQuestions.slice(0, 3).map((q, i) => ({
        text: q,
        category: 'technical',
        difficulty: skillLevel,
        type: 'screening'
      })))
    }

    if (focusAreas.includes('behavioral') || focusAreas.length === 0) {
      const behavioralQuestions = questionSets.behavioral[mappedSeniority as keyof typeof questionSets.behavioral]
      questions.push(...behavioralQuestions.slice(0, 3).map((q, i) => ({
        text: q,
        category: 'behavioral',
        difficulty: skillLevel,
        type: 'screening'
      })))
    }

    if (focusAreas.includes('scenario') || focusAreas.length === 0) {
      const scenarioQuestions = questionSets.scenario[mappedSeniority as keyof typeof questionSets.scenario]
      questions.push(...scenarioQuestions.slice(0, 2).map((q, i) => ({
        text: q,
        category: 'scenario',
        difficulty: skillLevel,
        type: 'screening'
      })))
    }

    // If no focus areas specified, provide balanced mix
    if (questions.length === 0) {
      const techQ = questionSets.technical[mappedSeniority as keyof typeof questionSets.technical]?.[0] || ''
      const behavioralQ = questionSets.behavioral[mappedSeniority as keyof typeof questionSets.behavioral]?.[0] || ''
      const scenarioQ = questionSets.scenario[mappedSeniority as keyof typeof questionSets.scenario]?.[0] || ''

      questions.push(
        { text: techQ, category: 'technical', difficulty: skillLevel, type: 'screening' },
        { text: behavioralQ, category: 'behavioral', difficulty: skillLevel, type: 'screening' },
        { text: scenarioQ, category: 'scenario', difficulty: skillLevel, type: 'screening' }
      )
    }

    return questions.filter(q => q.text)
  }
}

export default function ScreeningQuestionsPage() {
  const [filters, setFilters] = useState({
    skillLevel: 'intermediate',
    seniority: 'mid',
    roleType: 'frontend',
    experience: '2-4 years',
    focusAreas: [] as string[]
  })

  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [customQuestions, setCustomQuestions] = useState<any[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['technical']))
  const [isGenerating, setIsGenerating] = useState(false)
  const [newCustomQuestion, setNewCustomQuestion] = useState('')
  const [customCategory, setCustomCategory] = useState('technical')

  const handleGenerate = async () => {
    setIsGenerating(true)
    const jobDescription = `A ${filters.skillLevel} ${filters.roleType} developer position requiring ${filters.seniority} level experience with ${filters.experience}, focusing on ${filters.focusAreas.join(', ') || 'technical skills'}.`
    const res = await fetch("/api/recruiter/ai/screening-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobDescription,
        seniority: filters.seniority
      })
    });
    const data = await res.json();
    setIsGenerating(false)
    if (data.success && data.questions) {
      const questions: any[] = []
      const categories = ['technical', 'behavioral', 'scenario']
      categories.forEach(cat => {
        if (data.questions[cat]) {
          data.questions[cat].forEach((q: string, i: number) => {
            questions.push({
              text: q,
              category: cat,
              difficulty: filters.skillLevel,
              type: 'screening'
            })
          })
        }
      })
      setGeneratedQuestions(questions)
      setExpandedCategories(new Set(['technical', 'behavioral', 'scenario']))
    }
  }

  const handleAddCustom = () => {
    if (newCustomQuestion.trim()) {
      const custom = {
        text: newCustomQuestion,
        category: customCategory,
        difficulty: filters.skillLevel,
        type: 'custom',
        id: Date.now()
      }
      setCustomQuestions([...customQuestions, custom])
      setNewCustomQuestion('')
    }
  }

  const toggleSelection = (index: number) => {
    const newSelection = new Set(selectedQuestions)
    if (newSelection.has(index)) {
      newSelection.delete(index)
    } else {
      newSelection.add(index)
    }
    setSelectedQuestions(newSelection)
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-900 text-blue-300'
      case 'behavioral': return 'bg-green-900 text-green-300'
      case 'scenario': return 'bg-purple-900 text-purple-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-900 text-green-300'
      case 'intermediate': return 'bg-yellow-900 text-yellow-300'
      case 'advanced': return 'bg-orange-900 text-orange-300'
      case 'expert': return 'bg-red-900 text-red-300'
      default: return 'bg-gray-900 text-gray-300'
    }
  }

  const groupedQuestions = [...generatedQuestions, ...customQuestions].reduce((acc, question) => {
    const category = question.category as string
    if (!acc[category]) acc[category] = []
    acc[category].push(question)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Brain className="w-8 h-8 text-[#FFD700]" />
            AI Screening Questions Generator
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Generate tailored screening questions for candidate interviews and assessments
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#60A5FA] text-[#60A5FA]">
            <Save className="w-4 h-4 mr-2" />
            Save Question Bank
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#FFD700] hover:bg-[#FFC107] text-black"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                AI Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-[#FFFFFF] mb-4">Configure Question Generation</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <label className="text-[#C9CFD6] text-sm font-medium">Skill Level</label>
            <Select value={filters.skillLevel} onValueChange={(value) => setFilters({...filters, skillLevel: value})}>
              <SelectTrigger className="bg-[#111315] border-[#23262B]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#C9CFD6] text-sm font-medium">Seniority</label>
            <Select value={filters.seniority} onValueChange={(value) => setFilters({...filters, seniority: value})}>
              <SelectTrigger className="bg-[#111315] border-[#23262B]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead/Principal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#C9CFD6] text-sm font-medium">Role Type</label>
            <Select value={filters.roleType} onValueChange={(value) => setFilters({...filters, roleType: value})}>
              <SelectTrigger className="bg-[#111315] border-[#23262B]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="fullstack">Full-Stack</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#C9CFD6] text-sm font-medium">Experience</label>
            <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
              <SelectTrigger className="bg-[#111315] border-[#23262B]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1 years">0-1 years</SelectItem>
                <SelectItem value="2-4 years">2-4 years</SelectItem>
                <SelectItem value="5-8 years">5-8 years</SelectItem>
                <SelectItem value="8+ years">8+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-[#C9CFD6] text-sm font-medium">Focus Areas</label>
            <div className="space-y-2">
              {['technical', 'behavioral', 'scenario'].map((area) => (
                <label key={area} className="flex items-center gap-2 text-sm text-[#C9CFD6]">
                  <input
                    type="checkbox"
                    checked={filters.focusAreas.includes(area)}
                    onChange={(e) => {
                      const newAreas = e.target.checked
                        ? [...filters.focusAreas, area]
                        : filters.focusAreas.filter(a => a !== area)
                      setFilters({...filters, focusAreas: newAreas})
                    }}
                    className="rounded bg-[#111315] border-[#23262B]"
                  />
                  {area.charAt(0).toUpperCase() + area.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Add Custom Question */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Custom Question
        </h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <Textarea
              placeholder="Enter your custom screening question..."
              value={newCustomQuestion}
              onChange={(e) => setNewCustomQuestion(e.target.value)}
              className="bg-[#111315] border-[#23262B] text-[#E2E8F0]"
            />
          </div>
          <Select value={customCategory} onValueChange={setCustomCategory}>
            <SelectTrigger className="w-48 bg-[#111315] border-[#23262B]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="scenario">Scenario</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddCustom} className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </Card>

      {/* Generated Questions */}
      {(generatedQuestions.length > 0 || customQuestions.length > 0) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#FFFFFF]">Screening Question Bank</h3>
            <Badge className="bg-[#FFD700] text-black">
              {[...generatedQuestions, ...customQuestions].length} Questions Selected
            </Badge>
          </div>

          {Object.entries(groupedQuestions).map(([category, questions]) => (
            <Card key={category} className="bg-[#1A1D21] border border-[#23262B] rounded-2xl overflow-hidden">
              <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#23262B] transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <div className="flex items-center gap-3">
                  <Badge className={getCategoryColor(category)}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                  <span className="text-[#FFFFFF] font-medium">
                    {questions.length} Questions
                  </span>
                </div>
                {expandedCategories.has(category) ? (
                  <ChevronUp className="w-5 h-5 text-[#C9CFD6]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C9CFD6]" />
                )}
              </div>

              {expandedCategories.has(category) && (
                <div className="border-t border-[#23262B]">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className="p-4 border-b border-[#23262B] last:border-b-0 hover:bg-[#111315] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.has(index)}
                          onChange={() => toggleSelection(index)}
                          className="mt-1 w-4 h-4 bg-[#111315] border-[#23262B] rounded"
                        />

                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={getCategoryColor(question.category)}>
                              {question.category}
                            </Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge className="bg-gray-900 text-gray-300">
                              {question.type}
                            </Badge>
                          </div>

                          <p className="text-[#E2E8F0] text-lg leading-relaxed">
                            {question.text}
                          </p>

                          <div className="flex items-center gap-2 text-sm text-[#C9CFD6]">
                            <Target className="w-4 h-4" />
                            <span>Expected Answer Length: 3-5 minutes</span>
                            <span>•</span>
                            <span>Follow-up Potential: High</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}

          {selectedQuestions.size > 0 && (
            <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-bold text-[#FFFFFF]">Selected Questions</h4>
                  <p className="text-[#C9CFD6]">
                    {selectedQuestions.size} question{selectedQuestions.size !== 1 ? 's' : ''} ready for interview
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Generate Follow-ups
                  </Button>
                  <Button className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Send to Interviewer
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {generatedQuestions.length === 0 && customQuestions.length === 0 && !isGenerating && (
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-12 text-center">
          <Brain className="w-16 h-16 text-[#FFD700] mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-2">No Questions Generated</h3>
          <p className="text-[#C9CFD6] mb-6">
            Configure your parameters above and click "AI Generate" to create tailored screening questions
          </p>
          <Button onClick={handleGenerate} className="bg-[#FFD700] hover:bg-[#FFC107] text-black">
            <Zap className="w-4 h-4 mr-2" />
            Generate AI Questions
          </Button>
        </Card>
      )}
    </div>
  )
}
