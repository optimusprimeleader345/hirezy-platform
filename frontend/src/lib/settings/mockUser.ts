export const mockUser = {
  id: 'user-123',
  email: 'john.doe@email.com',
  fullName: 'John Doe',
  phone: '+1-555-0123',
  role: 'student',
  avatar: '/avatars/john-doe.jpg',
  bio: 'Aspiring software developer passionate about building innovative solutions.',
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
  linkedinUrl: 'https://linkedin.com/in/johndoe',
  githubUrl: 'https://github.com/johndoe',
  portfolioUrl: 'https://johndoe.dev',
  notifications: {
    jobMatches: true,
    newGigs: true,
    interviewReminders: true,
    messageAlerts: false,
    emailNotifications: true,
  },
  security: {
    twoFactorEnabled: false,
    lastLogin: '2023-11-27T08:30:00Z',
  },
  theme: 'dark',
  language: 'en',
  connectedApps: {
    github: false,
    linkedin: true,
  },
}

export type UserProfile = typeof mockUser;
