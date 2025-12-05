'use client'

import { useState } from 'react'
import { FileText, Upload, MessageCircle, Clock, CheckCircle, AlertCircle, Star, Send, Paperclip, Download } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface Assignment {
  id: number
  title: string
  company: string
  description: string
  requirements: string[]
  deadline: string
  status: 'active' | 'submitted' | 'reviewed' | 'overdue'
  priority: 'low' | 'medium' | 'high'
  budget?: number
  submittedAt?: string
  grade?: number
  feedback?: string
  attachments?: Array<{
    name: string
    url: string
    type: string
  }>
}

interface Submission {
  assignmentId: number
  note: string
  files: File[]
  links: string[]
  submittedAt: Date
}

export default function AssignmentWorkspace() {
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'submitted' | 'reviewed'>('all')
  const [submissionNote, setSubmissionNote] = useState('')
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([])
  const [submissionLinks, setSubmissionLinks] = useState<string[]>([''])
  const [chatMessage, setChatMessage] = useState('')
  const [showChat, setShowChat] = useState(false)

  const mockAssignments: Assignment[] = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      company: 'TechCorp',
      description: 'Build a modern e-commerce website with React and Node.js backend',
      requirements: [
        'User authentication system',
        'Product catalog with search',
        'Shopping cart functionality',
        'Payment integration',
        'Responsive design'
      ],
      deadline: '2024-02-20',
      status: 'active',
      priority: 'high',
      budget: 2500
    },
    {
      id: 2,
      title: 'Mobile App UI/UX',
      company: 'StartupXYZ',
      description: 'Design user interface and experience for a fitness tracking mobile app',
      requirements: [
        'Wireframes for all screens',
        'High-fidelity designs',
        'Interactive prototypes',
        'Design system documentation',
        'User flow diagrams'
      ],
      deadline: '2024-02-15',
      status: 'submitted',
      priority: 'medium',
      budget: 1800,
      submittedAt: '2024-02-10'
    },
    {
      id: 3,
      title: 'Data Analytics Dashboard',
      company: 'DataCorp',
      description: 'Create a dashboard for visualizing sales data and KPIs',
      requirements: [
        'Connect to data APIs',
        'Create interactive charts',
        'Implement filtering system',
        'Export functionality',
        'Real-time data updates'
      ],
      deadline: '2024-02-10',
      status: 'reviewed',
      priority: 'medium',
      budget: 1200,
      submittedAt: '2024-02-08',
      grade: 92,
      feedback: 'Excellent work! The dashboard is very intuitive and the data visualization is clear and informative. Minor suggestions: add more export formats and consider mobile responsiveness.',
      attachments: [
        { name: 'final-dashboard.zip', url: '#', type: 'application/zip' },
        { name: 'readme.pdf', url: '#', type: 'application/pdf' }
      ]
    }
  ]

  const filteredAssignments = filter === 'all'
    ? mockAssignments
    : mockAssignments.filter(a => a.status === filter)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-yellow-400" />
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-blue-400" />
      case 'reviewed':
        return <Star className="h-5 w-5 text-green-400" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return <FileText className="h-5 w-5 text-white/60" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-500/20 border-yellow-400/30'
      case 'submitted':
        return 'bg-blue-500/20 border-blue-400/30'
      case 'reviewed':
        return 'bg-green-500/20 border-green-400/30'
      case 'overdue':
        return 'bg-red-500/20 border-red-400/30'
      default:
        return 'bg-white/10 border-white/20'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-white/60'
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setSubmissionFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSubmissionFiles(prev => prev.filter((_, i) => i !== index))
  }

  const addSubmissionLink = () => {
    setSubmissionLinks(prev => [...prev, ''])
  }

  const updateSubmissionLink = (index: number, value: string) => {
    setSubmissionLinks(prev =>
      prev.map((link, i) => i === index ? value : link)
    )
  }

  const submitAssignment = () => {
    // In a real app, this would submit to backend
    console.log('Submitting assignment:', {
      assignmentId: activeAssignment?.id,
      note: submissionNote,
      files: submissionFiles,
      links: submissionLinks.filter(link => link.trim())
    })
    alert('Assignment submitted successfully!')
    setSubmissionNote('')
    setSubmissionFiles([])
    setSubmissionLinks([''])
    setActiveAssignment(null)
  }

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return
    console.log('Sending message:', chatMessage)
    setChatMessage('')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassCard className="neon-glow-purple">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-purple-400 mr-3" />
            <h1 className="text-3xl font-bold text-gradient">Assignment Workspace</h1>
          </div>
          <p className="text-white/70 max-w-2xl mx-auto">
            Manage your project assignments, submit work, receive feedback, and track deadlines
            all in one comprehensive workspace.
          </p>
        </div>
      </GlassCard>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {mockAssignments.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-white/70">Active Assignments</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {mockAssignments.filter(a => a.status === 'submitted').length}
            </div>
            <div className="text-sm text-white/70">Submitted</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {mockAssignments.filter(a => a.status === 'reviewed').length}
            </div>
            <div className="text-sm text-white/70">Reviewed</div>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              ${mockAssignments.reduce((sum, a) => sum + (a.budget || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-white/70">Total Earnings</div>
          </div>
        </GlassCard>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Assignments</h2>
              <div className="flex gap-2">
                {['all', 'active', 'submitted', 'reviewed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-3 py-1 rounded-full capitalize text-sm transition-colors ${
                      filter === status
                        ? 'bg-purple-500/20 border border-purple-400/50 text-purple-400'
                        : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Assignment Cards */}
          {filteredAssignments.map(assignment => (
            <div
              key={assignment.id}
              className={`cursor-pointer transition-all duration-200 ${
                activeAssignment?.id === assignment.id ? '' : ''
              }`}
              onClick={() => setActiveAssignment(assignment)}
            >
              <GlassCard className={`${activeAssignment?.id === assignment.id ? 'ring-2 ring-purple-400' : ''}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${getPriorityColor(assignment.priority)}`}>
                        {assignment.priority} priority
                      </span>
                    </div>
                    <p className="text-white/70 mb-2">{assignment.company}</p>
                    <p className="text-white/60 text-sm mb-4">{assignment.description}</p>
                  </div>

                  <div className="text-right">
                    {assignment.budget && (
                      <div className="text-lg font-bold text-green-400 mb-1">
                        ${assignment.budget.toLocaleString()}
                      </div>
                    )}
                    {assignment.grade && (
                      <div className="text-sm font-medium text-yellow-400 mb-1">
                        Grade: {assignment.grade}%
                      </div>
                    )}
                    {getStatusIcon(assignment.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Due: {new Date(assignment.deadline).toLocaleDateString()}
                    </div>
                    <div className={`px-2 py-1 rounded border text-xs ${
                      getDaysUntilDeadline(assignment.deadline) > 0
                        ? getDaysUntilDeadline(assignment.deadline) <= 3
                          ? 'border-red-400/50 text-red-400'
                          : 'border-yellow-400/50 text-yellow-400'
                        : 'border-red-400/50 text-red-400'
                    }`}>
                      {getDaysUntilDeadline(assignment.deadline) > 0
                        ? `${getDaysUntilDeadline(assignment.deadline)} days left`
                        : `${Math.abs(getDaysUntilDeadline(assignment.deadline))} days overdue`
                      }
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">No assignments found</h3>
              <p className="text-white/40">
                You don't have any {filter === 'all' ? '' : filter} assignments at the moment.
              </p>
            </GlassCard>
          )}
        </div>

        {/* Details Panel */}
        <div className="space-y-6">
          {activeAssignment ? (
            <>
              {/* Assignment Details */}
              <GlassCard className="neon-glow-purple">
                <h2 className="text-xl font-semibold text-white mb-4">{activeAssignment.title}</h2>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Requirements</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      {activeAssignment.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeAssignment.description && (
                    <div>
                      <h4 className="font-medium text-white mb-2">Description</h4>
                      <p className="text-white/80 text-sm">{activeAssignment.description}</p>
                    </div>
                  )}

                  {activeAssignment.feedback && (
                    <div>
                      <h4 className="font-medium text-white mb-2">Feedback</h4>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">Grade: {activeAssignment.grade}%</span>
                        </div>
                        <p className="text-white/80 text-sm">{activeAssignment.feedback}</p>
                      </div>
                    </div>
                  )}

                  {activeAssignment.attachments && activeAssignment.attachments.length > 0 && (
                    <div>
                      <h4 className="font-medium text-white mb-2">Attachments</h4>
                      <div className="space-y-2">
                        {activeAssignment.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                            <div className="flex items-center gap-2">
                              <Paperclip className="h-4 w-4 text-white/60" />
                              <span className="text-white/80 text-sm">{file.name}</span>
                            </div>
                            <button className="p-1 hover:bg-white/10 rounded">
                              <Download className="h-4 w-4 text-white/60" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Submission Form */}
              {activeAssignment.status === 'active' && (
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-4">Submit Assignment</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Submission Note</label>
                      <textarea
                        value={submissionNote}
                        onChange={(e) => setSubmissionNote(e.target.value)}
                        placeholder="Describe your work, challenges faced, and any additional notes..."
                        rows={4}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-white/70 text-sm mb-2">Upload Files</label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                        <Upload className="h-8 w-8 text-white/40 mx-auto mb-2" />
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="text-white/60 cursor-pointer hover:text-white">
                          Click to choose files or drag and drop
                        </label>
                      </div>
                      {submissionFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {submissionFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                              <span className="text-white/80 text-sm">{file.name}</span>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-white/70 text-sm">Project Links</label>
                        <button
                          onClick={addSubmissionLink}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          + Add Link
                        </button>
                      </div>
                      {submissionLinks.map((link, index) => (
                        <input
                          key={index}
                          type="url"
                          value={link}
                          onChange={(e) => updateSubmissionLink(index, e.target.value)}
                          placeholder="https://github.com/your-repo"
                          className="w-full p-3 mb-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ))}
                    </div>

                    <button
                      onClick={submitAssignment}
                      disabled={!submissionNote.trim() && submissionFiles.length === 0}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Submit Assignment
                    </button>
                  </div>
                </GlassCard>
              )}

              {/* Chat with Employer */}
              {activeAssignment.status !== 'reviewed' && (
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Chat with {activeAssignment.company}
                    </h3>
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      {showChat ? 'Hide' : 'Show'}
                    </button>
                  </div>

                  {showChat && (
                    <div className="space-y-4">
                      <div className="h-64 bg-white/5 rounded-lg p-4 overflow-y-auto space-y-2">
                        <div className="text-left">
                          <div className="inline-block p-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-white/90 text-sm max-w-xs">
                            Hi! Do you have any questions about the assignment requirements?
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-block p-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-white/90 text-sm max-w-xs">
                            Yes, could you clarify the specific technologies you'd like me to use?
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                        />
                        <button
                          onClick={sendChatMessage}
                          disabled={!chatMessage.trim()}
                          className="px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-lg hover:bg-purple-400/40 transition-colors disabled:opacity-50"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </GlassCard>
              )}
            </>
          ) : (
            <GlassCard className="text-center py-12">
              <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/60 mb-2">Select an Assignment</h3>
              <p className="text-white/40">
                Choose an assignment from the list to view details and submit work.
              </p>
            </GlassCard>
          )}
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <div className="text-center">
            <FileText className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Project Management</h3>
            <p className="text-white/70 text-sm">Track assignment progress and deadlines</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <Upload className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">File Submissions</h3>
            <p className="text-white/70 text-sm">Upload code, documents, and project files</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <MessageCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Employer Chat</h3>
            <p className="text-white/70 text-sm">Communicate directly with project sponsors</p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Feedback & Grading</h3>
            <p className="text-white/70 text-sm">Receive detailed feedback and performance reviews</p>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
