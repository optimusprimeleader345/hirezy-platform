import { studentStats, recruiterStats, gigListings, chartData, notifications, upcomingInterviews, badges, careerSuggestions, walletTransactions } from './demoData'

export const getUser = async () => {
  // For demo, return user based on some logic, but assume recruiter for this
  return {
    id: 2,
    name: 'Jane Wilson',
    email: 'jane@recruiter.com',
    role: 'recruiter',
    avatar: '/avatars/jane.jpg',
    company: 'TechSolutions Inc.',
  }
}

export const getStudentUser = async () => {
  // Return student user data with profileCompleted
  return {
    id: 1,
    name: 'John Doe',
    email: 'john@student.com',
    role: 'student',
    avatar: '/avatars/john.jpg',
    profileCompleted: 78,
  }
}

export const getGigs = async () => {
  try {
    const response = await fetch('/api/gigs')
    if (!response.ok) {
      throw new Error('Failed to fetch gigs')
    }
    const gigs = await response.json()
    if (gigs.length > 0) return gigs
    // Fallback to demo data if no gigs from API
    return gigListings
  } catch (error) {
    console.error('Failed to fetch gigs from API:', error)
    // Fallback to demo data
    return gigListings
  }
}

export const getEarnings = async () => {
  return chartData.studentEarnings
}

export const getStudentStats = async () => {
  return studentStats
}

export const getNotifications = async () => {
  return notifications
}

export const getUpcomingInterviews = async () => {
  return upcomingInterviews
}

export const getBadges = async () => {
  return badges
}

export const getCareerSuggestions = async () => {
  return careerSuggestions
}

export const getWalletTransactions = async () => {
  return walletTransactions
}

export const getRecruiterStats = async () => {
  return recruiterStats
}
