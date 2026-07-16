// Mock performance history data for Student Performance Analytics AI
// Tracks gig applications and their outcomes over time

interface ApplicationHistoryItem {
  date: string
  jobTitle: string
  status: 'applied' | 'shortlisted' | 'interviewed' | 'accepted' | 'rejected'
  company?: string
  proposalScore?: number
  matchScore?: number
  notes?: string
}

export const applicationHistory: ApplicationHistoryItem[] = [
  {
    date: '2024-11-25',
    jobTitle: 'Senior React Developer',
    status: 'applied',
    company: 'TechCorp',
    proposalScore: 75,
    matchScore: 78
  },
  {
    date: '2024-11-20',
    jobTitle: 'Frontend Developer',
    status: 'accepted',
    company: 'StartupXYZ',
    proposalScore: 85,
    matchScore: 82
  }
]

// Calculate performance metrics
export function calculatePerformanceMetrics() {
  const totalApplications = applicationHistory.length
  const accepted = applicationHistory.filter(app => app.status === 'accepted').length

  const winRate = totalApplications > 0 ? (accepted / totalApplications) * 100 : 0
  const averageProposalScore = applicationHistory.reduce((sum, app) => sum + (app.proposalScore || 0), 0) / totalApplications

  return {
    totalApplications,
    accepted,
    winRate: Math.round(winRate * 10) / 10,
    averageProposalScore: Math.round(averageProposalScore)
  }
}
