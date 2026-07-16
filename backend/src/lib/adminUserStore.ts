// Shared user store for admin user management APIs
export type User = {
  id: string
  name: string | null
  email: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
  lastLogin?: string | null
  verified: boolean
  warnings: number
  lastActivity: string
  profilePicture?: string
  phone?: string
  location?: string
  bio?: string
  _count: {
    gigs: number
    applications: number
    completedInterviews: number
  }
  activity: {
    lastWeek: number
    lastMonth: number
    totalLogins: number
  }
}

// Mock user data with enhanced features
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'student@hirezy.com',
    role: 'student',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    verified: true,
    warnings: 0,
    lastActivity: 'Applied to React Developer gig',
    profilePicture: '/avatars/alex.jpg',
    phone: '+1-555-0123',
    location: 'New York, NY',
    bio: 'Frontend developer with 2+ years using React, Node.js',
    _count: { gigs: 2, applications: 5, completedInterviews: 2 },
    activity: { lastWeek: 28, lastMonth: 89, totalLogins: 145 }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'recruiter@hirezy.com',
    role: 'recruiter',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    verified: true,
    warnings: 0,
    lastActivity: 'Posted DevOps Engineer gig',
    profilePicture: '/avatars/sarah.jpg',
    phone: '+1-555-0456',
    location: 'San Francisco, CA',
    bio: 'Tech recruiter specializing in software development roles',
    _count: { gigs: 15, applications: 0, completedInterviews: 8 },
    activity: { lastWeek: 35, lastMonth: 120, totalLogins: 203 }
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@hirezy.com',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    verified: true,
    warnings: 0,
    lastActivity: 'Reviewed user analytics',
    _count: { gigs: 0, applications: 0, completedInterviews: 0 },
    activity: { lastWeek: 42, lastMonth: 150, totalLogins: 486 }
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'recruiter',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
    verified: false,
    warnings: 0,
    lastActivity: 'Account created - awaiting verification',
    _count: { gigs: 0, applications: 0, completedInterviews: 0 },
    activity: { lastWeek: 0, lastMonth: 0, totalLogins: 0 }
  },
  {
    id: '5',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'student',
    status: 'banned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    verified: false,
    warnings: 3,
    lastActivity: 'Received final warning for inappropriate content',
    _count: { gigs: 0, applications: 1, completedInterviews: 0 },
    activity: { lastWeek: 5, lastMonth: 12, totalLogins: 23 }
  },
  {
    id: '6',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    role: 'student',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    verified: true,
    warnings: 1,
    lastActivity: 'Updated profile and portfolio',
    phone: '+1-555-0789',
    location: 'Austin, TX',
    bio: 'Full-stack developer focusing on MERN stack',
    _count: { gigs: 1, applications: 3, completedInterviews: 1 },
    activity: { lastWeek: 22, lastMonth: 76, totalLogins: 112 }
  },
  {
    id: '7',
    name: 'Lisa Park',
    email: 'lisa.park@company.com',
    role: 'recruiter',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    verified: true,
    warnings: 0,
    lastActivity: 'Scheduled interview for QA position',
    phone: '+1-555-0321',
    location: 'Seattle, WA',
    bio: 'Senior recruiter at TechCorp, specializing in QA and DevOps',
    _count: { gigs: 8, applications: 0, completedInterviews: 12 },
    activity: { lastWeek: 18, lastMonth: 95, totalLogins: 167 }
  },
  {
    id: '8',
    name: 'Robert Wilson',
    email: 'r.wilson@student.org',
    role: 'student',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    verified: true,
    warnings: 0,
    lastActivity: 'Completed skill assessment',
    location: 'Chicago, IL',
    bio: 'Computer Science student seeking internship opportunities',
    _count: { gigs: 0, applications: 2, completedInterviews: 0 },
    activity: { lastWeek: 15, lastMonth: 43, totalLogins: 76 }
  }
]

export const userStore = [...MOCK_USERS]

export function updateUserStore(userId: string, updates: Partial<User>) {
  const userIndex = userStore.findIndex(user => user.id === userId)
  if (userIndex !== -1) {
    userStore[userIndex] = {
      ...userStore[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return userStore[userIndex]
  }
  return null
}

export function getUserStore() {
  return [...userStore]
}

export function getUserActivityStats() {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  return userStore.map(user => ({
    id: user.id,
    name: user.name,
    activity: user.activity,
    isActive: user.lastLogin && new Date(user.lastLogin) > weekAgo,
    isRecent: user.lastLogin && new Date(user.lastLogin) > monthAgo
  }))
}

export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  const newUser: User = {
    ...userData,
    id: (userStore.length + 1).toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  userStore.push(newUser)
  return newUser
}

export function deleteUsers(userIds: string[]) {
  const indices = userIds.map(id => userStore.findIndex(user => user.id === id))
    .filter(index => index !== -1)
    .sort((a, b) => b - a) // Sort descending to remove from end first

  indices.forEach(index => userStore.splice(index, 1))
  return indices.length
}

export function issueWarning(userId: string, reason: string) {
  const user = updateUserStore(userId, {
    warnings: (userStore.find(u => u.id === userId)?.warnings || 0) + 1,
    lastActivity: `Warning issued: ${reason}`
  })
  return user
}

export function verifyUser(userId: string) {
  updateUserStore(userId, {
    verified: true,
    status: 'active',
    lastActivity: 'Account verified'
  })
}
