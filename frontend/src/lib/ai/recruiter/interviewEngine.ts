interface InterviewPlan {
  candidateName: string
  candidateEmail: string
  gigTitle: string
  date: string
  recommendedSlot: string
  alternativeSlots: string[]
  meetingLink: string
  agenda: string[]
  recruiterNotes: string
  estimatedDuration: number
  prepRequired: string[]
}

interface TimeSlot {
  time: string
  availability: string
  description: string
}

// Mock function to generate interview plans
export function generateInterviewPlan(candidateId: string, gigId: string, date: string): InterviewPlan {
  // Mock candidates and gigs data
  const candidates = [
    { id: 'app1', name: 'Rohan Sinha', email: 'rohan@example.com' },
    { id: 'app2', name: 'Neha Patil', email: 'neha@example.com' },
    { id: 'app3', name: 'Arjun Sharma', email: 'arjun@example.com' }
  ]

  const gigs = [
    { id: 'gig1', title: 'Senior React Developer' },
    { id: 'gig2', title: 'Fullstack JavaScript Developer' },
    { id: 'gig3', title: 'Frontend UI/UX Developer' }
  ]

  const candidate = candidates.find(c => c.id === candidateId) || candidates[0]
  const gig = gigs.find(g => g.id === gigId) || gigs[0]

  // Mock time slots based on candidate availability
  const availableSlots = [
    { time: '10:00–10:30 AM', availability: 'High', description: 'High availability - candidate prefers morning slots' },
    { time: '12:30–1:00 PM', availability: 'Balanced', description: 'Balanced availability - good for lunch breaks' },
    { time: '3:00–3:30 PM', availability: 'Low', description: 'Low load time - end of business day' },
    { time: '11:15–11:45 AM', availability: 'Medium', description: 'Medium availability - good general slot' }
  ]

  const recommendedSlot = availableSlots[0].time
  const alternativeSlots = availableSlots.slice(1).map(slot => slot.time)

  // Generate contextual agenda based on gig
  const agendas: Record<string, string[]> = {
    'gig1': [ // Senior React Developer
      '5 min: Introductions & background overview',
      '10 min: Technical questions (React, Next.js, performance optimization)',
      '8 min: Code review - React architecture assessment',
      '10 min: Portfolio walkthrough & project discussion',
      '7 min: Behavioral questions & team fit assessment',
      '5 min: Candidate Q&A and next steps'
    ],
    'gig2': [ // Fullstack JavaScript Developer
      '5 min: Introductions & background overview',
      '8 min: Frontend questions (React, TypeScript, UI/UX)',
      '8 min: Backend questions (Node.js, APIs, databases)',
      '6 min: Architecture & performance discussion',
      '10 min: Portfolio review & improvement suggestions',
      '3 min: Salary expectations & timeline'
    ],
    'gig3': [ // Frontend UI/UX Developer
      '5 min: Introductions & background overview',
      '12 min: UI/UX design process & methodology',
      '8 min: Frontend technologies (React, styling systems)',
      '8 min: Portfolio review & design critique',
      '7 min: Collaborative work style & team dynamics',
      '5 min: Next steps & timeline discussion'
    ]
  }

  // Generate recruiter notes based on candidate profile
  const notes: Record<string, string> = {
    'app1': 'Strong React fundamentals with 2 years experience. Good Next.js knowledge but could improve TypeScript skills. Ready for senior level with some mentorship.',
    'app2': '4 years experience, strong technical foundation. Excellent problem-solving skills. May need cultural fit discussion regarding team dynamics.',
    'app3': 'Junior level but highly motivated. Good basic skills, eager to learn. May need 3-6 months ramp-up time for senior development practices.'
  }

  const prepItems = [
    'Review candidate\'s portfolio and LinkedIn',
    'Prepare technical assessment questions based on resume',
    'Set up meeting call with screen sharing enabled',
    'Prepare job description and team overview',
    'Have product roadmap questions ready'
  ]

  return {
    candidateName: candidate.name,
    candidateEmail: candidate.email,
    gigTitle: gig.title,
    date: date,
    recommendedSlot: recommendedSlot,
    alternativeSlots: alternativeSlots,
    meetingLink: `https://meet.hirezy.ai/interview/${candidateId}-${gigId}`,
    agenda: agendas[gigId] || agendas.gig1,
    recruiterNotes: notes[candidateId] || 'Well-qualified candidate with relevant experience. Focus on technical assessment and problem-solving skills.',
    estimatedDuration: 45,
    prepRequired: prepItems
  }
}

// Helper function to get available time slots
export function getAvailableTimeSlots(date: string): TimeSlot[] {
  return [
    {
      time: '10:00–10:30 AM',
      availability: 'High',
      description: 'High availability - candidate prefers morning slots'
    },
    {
      time: '12:30–1:00 PM',
      availability: 'Balanced',
      description: 'Balanced availability - good for lunch breaks'
    },
    {
      time: '3:00–3:30 PM',
      availability: 'Low',
      description: 'Low load time - end of business day'
    },
    {
      time: '11:15–11:45 AM',
      availability: 'Medium',
      description: 'Medium availability - good general slot'
    },
    {
      time: '2:00–2:30 PM',
      availability: 'High',
      description: 'High availability - afternoon preferred'
    }
  ]
}
