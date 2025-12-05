import { studentStats, recruiterStats, gigListings, chartData } from './demoData'

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

export const getGigs = async () => {
  return gigListings
}

export const getEarnings = async () => {
  return chartData.studentEarnings
}

export const getStudentStats = async () => {
  return studentStats
}

export const getRecruiterStats = async () => {
  return recruiterStats
}
