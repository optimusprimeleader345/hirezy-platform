'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  Mail,
  CheckCircle,
  X,
  Edit,
  Plus,
  Filter,
  Search,
  Send,
  AlertCircle,
  Globe,
  Phone
} from 'lucide-react'

// Interview Scheduling Engine
const INTERVIEW_SCHEDULER = {
  // Mock data for available time slots
  generateTimeSlots: (date: string, interviewer: string) => {
    const baseSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ]

    // Simulate some slots being unavailable
    const unavailableSlots = new Set([
      '09:00', '11:00', '14:30', '16:00'
    ])

    return baseSlots.map(time => ({
      time,
      available: !unavailableSlots.has(time),
      duration: 60 // minutes
    }))
  },

  // Mock interviewer data
  interviewers: [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Frontend Lead',
      department: 'Engineering',
      availability: 'High',
      email: 'sarah.johnson@company.com',
      skills: ['React', 'TypeScript', 'UI/UX'],
      timezone: 'PST',
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Tech Lead',
      department: 'Engineering',
      availability: 'Medium',
      email: 'mike.chen@company.com',
      skills: ['Node.js', 'System Design', 'Leadership'],
      timezone: 'PST',
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Priya Patel',
      role: 'HR Business Partner',
      department: 'Human Resources',
      availability: 'High',
      email: 'priya.patel@company.com',
      skills: ['Talent Management', 'Cultural Fit', 'Onboarding'],
      timezone: 'PST',
      avatar: 'PP'
    }
  ]
}

export default function InterviewSchedulingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [interviewType, setInterviewType] = useState('video')
  const [interviewRound, setInterviewRound] = useState('technical')
  const [duration, setDuration] = useState('60')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [scheduledInterviews, setScheduledInterviews] = useState<any[]>([])
  const [showScheduler, setShowScheduler] = useState(false)

  // Mock candidate data (from existing data)
  const candidates = [
    {
      id: 'app1',
      name: 'Alex Chen',
      role: 'Senior React Developer',
      status: 'shortlisted',
      email: 'alex@example.com',
      phone: '+1-555-0123'
    },
    {
      id: 'app2',
      name: 'Sarah Kumar',
      role: 'UX Designer',
      status: 'shortlisted',
      email: 'sarah@example.com',
      phone: '+1-555-0124'
    }
  ]

  const generateAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) { // Next 14 days
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        })
      }
    }
    return dates
  }

  const availableDates = generateAvailableDates()

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')

    if (selectedInterviewers.length > 0) {
      // Find the first available interviewer for time slots
      const primaryInterviewer = INTERVIEW_SCHEDULER.interviewers.find(
        interviewer => selectedInterviewers.includes(interviewer.id)
      )

      if (primaryInterviewer) {
        const slots = INTERVIEW_SCHEDULER.generateTimeSlots(date, primaryInterviewer.id)
        setAvailableSlots(slots)
      }
    }
  }

  const handleInterviewerToggle = (interviewerId: string) => {
    setSelectedInterviewers(prev =>
      prev.includes(interviewerId)
        ? prev.filter(id => id !== interviewerId)
        : [...prev, interviewerId]
    )

    // Update time slots when interviewer changes
    if (selectedDate) {
      const slots = INTERVIEW_SCHEDULER.generateTimeSlots(selectedDate, interviewerId)
      setAvailableSlots(slots)
    }
  }

  const scheduleInterview = () => {
    if (!selectedCandidate || !selectedDate || !selectedTime || selectedInterviewers.length === 0) {
      alert('Please fill in all required fields')
      return
    }

    const interview = {
      id: Date.now().toString(),
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      interviewers: selectedInterviewers.map(id =>
        INTERVIEW_SCHEDULER.interviewers.find(int => int.id === id)
      ).filter(Boolean),
      date: selectedDate,
      time: selectedTime,
      duration: parseInt(duration),
      type: interviewType,
      round: interviewRound,
      location: interviewType === 'onsite' ? location : '',
      notes,
      status: 'scheduled',
      scheduledAt: new Date().toISOString()
    }

    setScheduledInterviews(prev => [interview, ...prev])

    // Send email notifications (mock)
    alert(`✅ Interview scheduled for ${selectedCandidate.name}!\n\nEmail invites sent to:\n${selectedInterviewers.map(id => INTERVIEW_SCHEDULER.interviewers.find(int => int.id === id)?.email).join('\n')}`)

    // Reset form
    setShowScheduler(false)
    setSelectedCandidate(null)
    setSelectedInterviewers([])
    setSelectedDate('')
    setSelectedTime('')
    setNotes('')
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#FFFFFF] flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#FFD700]" />
            Interview Scheduling
          </h1>
          <p className="text-[#C9CFD6] mt-2">
            Schedule and manage candidate interviews with automated coordination
          </p>
        </div>
        <Button
          onClick={() => setShowScheduler(!showScheduler)}
          className="bg-[#FFD700] hover:bg-[#FFC107] text-black"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#FFD700] mb-1">{scheduledInterviews.length}</div>
            <div className="text-[#C9CFD6] text-sm">Scheduled Today</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3EFFA8] mb-1">
              {scheduledInterviews.filter(i => new Date(i.date) > new Date()).length}
            </div>
            <div className="text-[#C9CFD6] text-sm">Upcoming</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#60A5FA] mb-1">
              {INTERVIEW_SCHEDULER.interviewers.length}
            </div>
            <div className="text-[#C9CFD6] text-sm">Available Interviewers</div>
          </div>
        </Card>

        <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#EF4444] mb-1">
              {candidates.filter(c => c.status === 'shortlisted').length}
            </div>
            <div className="text-[#C9CFD6] text-sm">Shortlisted Candidates</div>
          </div>
        </Card>
      </div>

      {/* Interview Scheduler Modal */}
      {showScheduler && (
        <Card className="bg-[#1A1D21] border border-[#FFD700]/50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#FFFFFF]">Schedule New Interview</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowScheduler(false)}
              className="border-[#23262B] text-[#C9CFD6]"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Interview Details */}
            <div className="space-y-6">
              {/* Candidate Selection */}
              <div>
                <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Select Candidate</label>
                <Select value={selectedCandidate?.id || ''} onValueChange={(value) => {
                  const candidate = candidates.find(c => c.id === value)
                  setSelectedCandidate(candidate)
                }}>
                  <SelectTrigger className="bg-[#111315] border-[#23262B]">
                    <SelectValue placeholder="Choose candidate..." />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.filter(c => c.status === 'shortlisted').map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          {candidate.name} - {candidate.role}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interview Type & Round */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Interview Type</label>
                  <Select value={interviewType} onValueChange={setInterviewType}>
                    <SelectTrigger className="bg-[#111315] border-[#23262B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Round</label>
                  <Select value={interviewRound} onValueChange={setInterviewRound}>
                    <SelectTrigger className="bg-[#111315] border-[#23262B]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="system-design">System Design</SelectItem>
                      <SelectItem value="cultural">Cultural Fit</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Interview Date</label>
                <Select value={selectedDate} onValueChange={handleDateChange}>
                  <SelectTrigger className="bg-[#111315] border-[#23262B]">
                    <SelectValue placeholder="Select date..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((date) => (
                      <SelectItem key={date.value} value={date.value}>
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div>
                <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Duration</label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-[#111315] border-[#23262B]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location (if on-site) */}
              {interviewType === 'onsite' && (
                <div>
                  <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="Enter office address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-[#C9CFD6] text-sm font-medium mb-2 block">Notes (Optional)</label>
                <Textarea
                  placeholder="Add any special instructions, topics to cover, etc..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-[#111315] border-[#23262B] text-[#E2E8F0]"
                />
              </div>
            </div>

            {/* Right Column - Interviewers & Time Slots */}
            <div className="space-y-6">
              {/* Interviewer Selection */}
              <div>
                <label className="text-[#C9CFD6] text-sm font-medium mb-3 block">
                  Select Interviewers ({selectedInterviewers.length} selected)
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {INTERVIEW_SCHEDULER.interviewers.map((interviewer) => (
                    <div
                      key={interviewer.id}
                      onClick={() => handleInterviewerToggle(interviewer.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedInterviewers.includes(interviewer.id)
                          ? 'border-[#3EFFA8] bg-[#3EFFA8]/10'
                          : 'border-[#23262B] bg-[#111315] hover:border-[#60A5FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            selectedInterviewers.includes(interviewer.id)
                              ? 'bg-[#3EFFA8] text-black'
                              : 'bg-[#60A5FA] text-white'
                          }`}>
                            {interviewer.avatar}
                          </div>
                          <div>
                            <div className="text-[#FFFFFF] font-medium">{interviewer.name}</div>
                            <div className="text-[#C9CFD6] text-sm">{interviewer.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            interviewer.availability === 'High' ? 'bg-green-900 text-green-300' :
                            interviewer.availability === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                          }>
                            {interviewer.availability}
                          </Badge>
                          {selectedInterviewers.includes(interviewer.id) && (
                            <CheckCircle className="w-5 h-5 text-[#3EFFA8]" />
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {interviewer.skills.map((skill, i) => (
                          <Badge key={i} className="bg-[#23262B] text-[#C9CFD6] text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && availableSlots.length > 0 && (
                <div>
                  <label className="text-[#C9CFD6] text-sm font-medium mb-3 block">
                    Available Time Slots ({selectedDate})
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        size="sm"
                        disabled={!slot.available}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`${
                          selectedTime === slot.time
                            ? 'bg-[#FFD700] hover:bg-[#FFC107] text-black'
                            : slot.available
                              ? 'border-[#23262B] text-[#C9CFD6] hover:border-[#60A5FA]'
                              : 'border-[#EF4444] text-[#ef4444] opacity-50'
                        }`}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  {!availableSlots.some(slot => slot.available) && (
                    <div className="text-[#EF4444] text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      No available slots for selected interviewers
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Schedule Button */}
          <div className="mt-8 pt-6 border-t border-[#23262B]">
            <div className="flex items-center justify-between">
              <div className="text-[#C9CFD6]">
                {selectedCandidate && selectedInterviewers.length > 0 && selectedDate && selectedTime && (
                  <span className="text-[#3EFFA8]">
                    Ready to schedule: {selectedCandidate.name} interview with {selectedInterviewers.length} interviewer{selectedInterviewers.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowScheduler(false)}
                  className="border-[#23262B] text-[#C9CFD6]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={scheduleInterview}
                  disabled={!selectedCandidate || selectedInterviewers.length === 0 || !selectedDate || !selectedTime}
                  className="bg-[#FFD700] hover:bg-[#FFC107] text-black"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Upcoming Interviews */}
      <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
        <h3 className="text-xl font-bold text-[#FFFFFF] mb-6">Upcoming Interviews</h3>

        {scheduledInterviews.length === 0 ? (
          <div className="text-center py-12 text-[#8A8F98]">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-[#C9CFD6]" />
            <h4 className="text-xl font-medium text-[#FFFFFF] mb-2">No Scheduled Interviews</h4>
            <p className="text-[#C9CFD6]">Click "Schedule Interview" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledInterviews.map((interview) => (
              <Card key={interview.id} className="bg-[#111315] border border-[#23262B] rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      interview.type === 'video' ? 'bg-[#60A5FA]' :
                      interview.type === 'phone' ? 'bg-[#3EFFA8]' :
                      'bg-[#FFD700]'
                    }`}>
                      {interview.type === 'video' ? <Video className="w-6 h-6 text-white" /> :
                       interview.type === 'phone' ? <Phone className="w-6 h-6 text-black" /> :
                       <MapPin className="w-6 h-6 text-black" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-[#FFFFFF]">{interview.candidateName}</h4>
                        <Badge className={
                          interview.round === 'technical' ? 'bg-blue-900 text-blue-300' :
                          interview.round === 'behavioral' ? 'bg-green-900 text-green-300' :
                          'bg-purple-900 text-purple-300'
                        }>
                          {interview.round}
                        </Badge>
                        <Badge className="bg-[#FFD700] text-black">
                          {interview.duration} min
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#C9CFD6] mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(interview.date).toLocaleDateString()} at {interview.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {interview.interviewers.length} interviewer{interview.interviewers.length !== 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {interview.type === 'onsite' ? interview.location || 'Office' : interview.type}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {interview.interviewers.slice(0, 3).map((interviewer: any) => (
                          <div key={interviewer.id} className="flex items-center gap-2 bg-[#23262B] rounded px-2 py-1">
                            <div className="w-5 h-5 rounded-full bg-[#60A5FA] flex items-center justify-center text-xs font-bold">
                              {interviewer.avatar}
                            </div>
                            <span className="text-[#C9CFD6] text-sm">{interviewer.name.split(' ')[0]}</span>
                          </div>
                        ))}
                        {interview.interviewers.length > 3 && (
                          <span className="text-[#C9CFD6] text-sm">+{interview.interviewers.length - 3} more</span>
                        )}
                      </div>

                      {interview.notes && (
                        <div className="text-[#C9CFD6] text-sm bg-[#0D0F11] p-2 rounded">
                          Notes: {interview.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#23262B] text-[#C9CFD6]">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#EF4444] text-[#EF4444]">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
