'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Users, MessageSquare, Share2, Activity, Clock, UserPlus, UserMinus, Send, User, MessageCircle, Calendar, CheckCircle, XCircle } from 'lucide-react'

export default function TeamCollaborationPage() {
  const [inviteEmail, setInviteEmail] = useState('')
  const [newNote, setNewNote] = useState('')
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [showInviteForm, setShowInviteForm] = useState(false)

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Senior Recruiter', avatar: 'JD', status: 'online', lastActive: 'Now', email: 'john@hirable.com' },
    { id: 2, name: 'Jane Smith', role: 'HR Manager', avatar: 'JS', status: 'away', lastActive: '5 min ago', email: 'jane@hirable.com' },
    { id: 3, name: 'Mike Johnson', role: 'Recruiter', avatar: 'MJ', status: 'online', lastActive: 'Now', email: 'mike@hirable.com' },
    { id: 4, name: 'Sarah Wilson', role: 'Talent Acquisitions', avatar: 'SW', status: 'offline', lastActive: '2 hours ago', email: 'sarah@hirable.com' },
  ])

  const [sharedNotes, setSharedNotes] = useState([
    { id: 1, author: 'John Doe', candidate: 'Alex Chen - React Developer', content: 'Strong technical background, great communication skills. Discussed salary: $120k-$150k range.', timestamp: '2 min ago', likes: 3 },
    { id: 2, author: 'Jane Smith', candidate: 'Sara Davis - UX Designer', content: 'Exceptional portfolio, specialized in mobile UX. Last worked at a major tech company.', timestamp: '15 min ago', likes: 5 },
  ])

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Schedule interview with Alex Chen', assignee: 'John Doe', status: 'pending', dueDate: 'Tomorrow' },
    { id: 2, title: 'Prepare offer for Sara Davis', assignee: 'Jane Smith', status: 'in_progress', dueDate: 'Today' },
    { id: 3, title: 'Reference check for Robert Kim', assignee: 'Mike Johnson', status: 'completed', dueDate: 'Completed' },
  ])

  const inviteMember = () => {
    if (inviteEmail.trim()) {
      alert(`Invitation sent to ${inviteEmail}`)
      setInviteEmail('')
      setShowInviteForm(false)
    }
  }

  const removeMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const addSharedNote = () => {
    if (newNote.trim() && selectedMember) {
      const note = {
        id: sharedNotes.length + 1,
        author: 'Current User',
        candidate: selectedMember,
        content: newNote,
        timestamp: 'Just now',
        likes: 0
      }
      setSharedNotes([note, ...sharedNotes])
      setNewNote('')
    }
  }

  const updateTaskStatus = (taskId: number, status: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FFFFFF]">Team Collaboration</h1>
        <p className="text-[#C9CFD6]">Work together seamlessly on recruitment tasks</p>
      </div>

      {/* Team Actions Bar */}
      <div className="flex gap-4">
        <Button
          className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black"
          onClick={() => setShowInviteForm(!showInviteForm)}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Team Member
        </Button>
        <Button className="bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Invite Form */}
      {showInviteForm && (
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter email address..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="bg-[#111315] border-[#23262B] text-[#E2E8F0] flex-1"
            />
            <Button onClick={inviteMember} className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black">
              <Send className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
            <Button
              onClick={() => setShowInviteForm(false)}
              className="bg-transparent border-[#23262B] text-[#C9CFD6]"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Members */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#FFFFFF] flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Members ({teamMembers.length})
            </h3>
          </div>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#3EFFA8] flex items-center justify-center text-black font-bold text-lg">
                      {member.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1A1D21] ${
                      member.status === 'online' ? 'bg-green-400' :
                      member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  <div>
                    <p className="text-[#FFFFFF] font-medium">{member.name}</p>
                    <p className="text-[#C9CFD6] text-sm">{member.role}</p>
                    <p className="text-[#8A8F98] text-xs">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    member.status === 'online' ? 'bg-green-900 text-green-300' :
                    member.status === 'away' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-900 text-gray-300'
                  }`}>
                    {member.status}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeMember(member.id)}
                    className="text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                  >
                    <UserMinus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Collaboration Tools */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Collaboration Tools
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button className="w-full justify-start bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] hover:text-[#3EFFA8] hover:border-[#3EFFA8] h-12">
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
            <Button className="w-full justify-start bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] hover:text-[#3EFFA8] hover:border-[#3EFFA8] h-12">
              <Share2 className="w-4 h-4 mr-2" />
              Share File
            </Button>
            <Button className="w-full justify-start bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] hover:text-[#3EFFA8] hover:border-[#3EFFA8] h-12">
              <Users className="w-4 h-4 mr-2" />
              Group Chat
            </Button>
            <Button className="w-full justify-start bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B] hover:text-[#3EFFA8] hover:border-[#3EFFA8] h-12">
              <Activity className="w-4 h-4 mr-2" />
              Activity Log
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shared Notes */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Shared Notes
          </h3>
          <div className="space-y-4 mb-4">
            <div className="flex gap-2">
              <Input
                placeholder="Select candidate..."
                className="flex-1 bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                value={selectedMember || ''}
                onChange={(e) => setSelectedMember(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Textarea
                placeholder="Add your notes about this candidate..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 bg-[#111315] border-[#23262B] text-[#E2E8F0] resize-none"
                rows={3}
              />
              <Button
                onClick={addSharedNote}
                className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {sharedNotes.map((note) => (
              <div key={note.id} className="p-4 rounded-lg bg-[#111315] border border-[#23262B]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[#FFFFFF] font-medium">{note.author}</span>
                    <span className="text-[#3EFFA8] ml-2">→</span>
                    <span className="text-[#3EFFA8] ml-1">{note.candidate}</span>
                  </div>
                  <span className="text-[#8A8F98] text-sm">{note.timestamp}</span>
                </div>
                <p className="text-[#C9CFD6] mb-2">{note.content}</p>
                <div className="flex items-center gap-4">
                  <button className="text-[#8A8F98] hover:text-[#3EFFA8] text-sm">
                    👍 {note.likes}
                  </button>
                  <button className="text-[#8A8F98] hover:text-[#3EFFA8] text-sm">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Tasks */}
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6 shadow-[0_4px_18px_rgba(0,0,0,0.4)] border-b-2 border-b-[#3EFFA8] hover:transform hover:translate-y-[-4px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] transition-all duration-200">
          <h3 className="text-xl font-bold text-[#FFFFFF] mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Team Tasks ({tasks.filter(t => t.status !== 'completed').length})
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-lg border ${
                task.status === 'completed'
                  ? 'bg-[#111315] border-[#23262B] opacity-75'
                  : task.status === 'in_progress'
                    ? 'bg-[#1A2A1D] border-[#3EFFA8]'
                    : 'bg-[#111315] border-[#23262B]'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-[#C9CFD6]' : 'text-[#FFFFFF]'}`}>
                      {task.title}
                    </h4>
                    <p className="text-[#C9CFD6] text-sm">Assigned to: {task.assignee}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.status === 'completed'
                      ? 'bg-green-900 text-green-300'
                      : task.status === 'in_progress'
                        ? 'bg-yellow-900 text-yellow-300'
                        : 'bg-[#23262B] text-[#8A8F98]'
                  }`}>
                    {task.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#8A8F98]" />
                  <span className="text-[#8A8F98] text-sm">Due: {task.dueDate}</span>
                </div>
                {task.status !== 'completed' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'in_progress')}
                      className="bg-[#3EFFA8] hover:bg-[#00ff88] text-black hoverText-black text-xs"
                    >
                      Start Task
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateTaskStatus(task.id, 'completed')}
                      className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs"
                    >
                      Mark Complete
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-[#111315] border border-[#23262B] text-[#C9CFD6] hover:bg-[#23262B]">
            <Plus className="w-4 h-4 mr-2" />
            Add New Task
          </Button>
        </Card>
      </div>
    </div>
  )
}
