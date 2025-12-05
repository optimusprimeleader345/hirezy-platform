// Mock student profile data for Job-Match Scoring AI
// Simulated from existing student modules

export const mockStudentProfile = {
  id: 'student_001',
  name: 'Alex Kumar',
  email: 'alex.kumar@example.com',

  // Skills from Skill-Gap module
  skills: [
    'React', 'Node.js', 'HTML', 'CSS', 'JavaScript', 'Express.js',
    'MongoDB', 'SQL', 'Git', 'REST APIs', 'JWT', 'Responsive Design'
  ],

  // Resume content from Resume AI module
  resumeText: `
    Alex Kumar - Full Stack Developer
    Passionate about building scalable web applications with modern technologies.
    3+ years of experience in frontend and backend development.
    Skills: React, Node.js, JavaScript, HTML, CSS, MongoDB, SQL, Git.
    Projects: E-commerce platform with React/Node.js, Task management app with real-time features.
  `,

  // Portfolio from Portfolio Builder module
  portfolioProjects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce application with React frontend and Node.js backend',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      githubUrl: 'https://github.com/alex-kumar/ecommerce-platform',
      demoUrl: 'https://alex-ecommerce.netlify.app'
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features',
      technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL'],
      githubUrl: 'https://github.com/alex-kumar/task-manager',
      demoUrl: 'https://alex-tasks.herokuapp.com'
    }
  ],

  // Certifications from Profile Optimizer
  certifications: [
    'AWS Certified Cloud Practitioner',
    'MongoDB Certified Developer Associate',
    'JavaScript Mastery Certificate'
  ],

  // Experience level from Career Path analysis
  experienceLevel: 'intermediate', // beginner | intermediate | advanced

  // Career goal from Career Path module
  careerGoal: 'fullstack developer',

  // Past gig performance (simulated historical data)
  gigHistory: {
    completedGigs: 8,
    averageRating: 4.7,
    totalEarnings: 125000, // INR
    recentGigs: [
      { title: 'React Frontend Development', rating: 5.0, feedback: 'Great attention to detail' },
      { title: 'Node.js API Development', rating: 4.8, feedback: 'Delivered ahead of schedule' },
      { title: 'E-commerce Website', rating: 4.5, feedback: 'Responsive design and good UX' }
    ]
  },

  // Market demand alignment from Market Demand Intelligence
  marketDemandMatch: {
    highDemandSkills: ['React', 'Node.js', 'MongoDB'],
    lowDemandSkills: ['Ruby on Rails'], // not in their profile
    missingCriticalSkills: ['TypeScript', 'Docker', 'AWS']
  },

  // Skill gap from Skill-Gap Analyzer
  skillGaps: {
    identifiedGaps: ['算法 Docker', 'TypeScript', 'GraphQL'],
    recommendedActions: [
      'Complete TypeScript basics course',
      'Build Docker containerized app',
      'Learn GraphQL API integration'
    ]
  },

  // Profile score from Profile Optimizer
  profileScore: 78, // 0-100

  // Locations they're open to work
  preferredLocations: ['Remote', 'Bangalore', 'Mumbai', 'Delhi'],

  // Availability and preferences
  availability: 'full_time',
  hourlyRate: 800, // INR per hour
  preferredProjectSize: 'medium' // small | medium | large
}

// Function to get aggregated student data for job matching
export function getAggregatedStudentData() {
  return {
    skills: mockStudentProfile.skills,
    experienceLevel: mockStudentProfile.experienceLevel,
    careerGoal: mockStudentProfile.careerGoal,
    certifications: mockStudentProfile.certifications,
    portfolioQuality: mockStudentProfile.portfolioProjects.length > 2 ? 'high' : 'medium',
    marketPerformance:	mockStudentProfile.gigHistory.averageRating,
    profileCompleteness: mockStudentProfile.profileScore,
    recommendedSkillGaps: mockStudentProfile.skillGaps.identifiedGaps
  }
}
