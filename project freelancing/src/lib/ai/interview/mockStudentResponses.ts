// Mock past interview sessions for AI Interview Coach
// Used for practice history and progress tracking

interface InterviewSession {
  id: string
  date: string
  role: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  duration: number // minutes
  totalScore: number
  questionsCount: number
  questionsAnswered: number
  summary: string
  strengths: string[]
  improvements: string[]
  status: 'completed' | 'in_progress'
}

export const mockInterviewSessions: InterviewSession[] = [
  {
    id: 'session-1',
    date: '2024-11-20T10:30:00Z',
    role: 'Frontend Developer',
    level: 'intermediate',
    category: 'technical',
    duration: 25,
    totalScore: 75,
    questionsCount: 3,
    questionsAnswered: 3,
    summary: 'Good technical knowledge but could improve on communication structure.',
    strengths: ['Solid React and JavaScript fundamentals', 'Clear explanation of concepts'],
    improvements: ['Use STAR method for behavioral answers', 'Practice time management'],
    status: 'completed'
  },
  {
    id: 'session-2',
    date: '2024-11-18T14:15:00Z',
    role: 'Full Stack Developer',
    level: 'intermediate',
    category: 'behavioral',
    duration: 18,
    totalScore: 82,
    questionsCount: 3,
    questionsAnswered: 3,
    summary: 'Strong performance on behavioral questions with good storytelling.',
    strengths: ['Excellent project examples', 'Clear communication skills'],
    improvements: ['More specific metrics in achievements', 'Practice system design questions'],
    status: 'completed'
  },
  {
    id: 'session-3',
    date: '2024-11-15T09:45:00Z',
    role: 'React Developer',
    level: 'advanced',
    category: 'system-design',
    duration: 35,
    totalScore: 68,
    questionsCount: 2,
    questionsAnswered: 2,
    summary: 'Good technical depth but struggled with system design trade-offs.',
    strengths: ['Deep technical knowledge', 'Analytical thinking'],
    improvements: ['Study scalability patterns', 'Practice architectural decisions', 'More focus on data flow'],
    status: 'completed'
  }
]

export function getInterviewSessions() {
  return mockInterviewSessions
}

export function getSessionById(id: string) {
  return mockInterviewSessions.find(session => session.id === id)
}

export function getRecentSessions(limit: number = 5) {
  return mockInterviewSessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getAverageScore() {
  const scores = mockInterviewSessions.map(s => s.totalScore)
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
}

export function getProgressOverTime() {
  return mockInterviewSessions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(session => ({
      date: new Date(session.date).toLocaleDateString(),
      score: session.totalScore,
      category: session.category
    }))
}
