export const mockGigsList = [
  {
    gigId: 'gig-1',
    title: 'E-commerce Website Development',
    description: 'Build a modern e-commerce platform with React, Node.js, and MongoDB. Payment integration and admin dashboard required.',
    budget: 'USD3000-USD5000',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    status: 'open',
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    recruiterName: 'TechSolutions Inc.',
    applicationsCount: 12,
  },
  {
    gigId: 'gig-2',
    title: 'Mobile App UI/UX Design',
    description: 'Create stunning mobile app designs for a fitness tracking application. Figma deliverables and design system required.',
    budget: 'USD1500-USD2500',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'UI/UX'],
    status: 'open',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    recruiterName: 'DesignStudio',
    applicationsCount: 8,
  },
  {
    gigId: 'gig-3',
    title: 'Full Stack MERN Developer',
    description: 'Develop a SaaS dashboard with authentication, analytics, and real-time notifications using the MERN stack.',
    budget: 'USD4000-USD7000',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript'],
    status: 'open',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    recruiterName: 'WebSolutions Corp',
    applicationsCount: 19,
  },
  {
    gigId: 'gig-4',
    title: 'Data Analysis & Visualization',
    description: 'Analyze datasets and create interactive dashboards with Python, Pandas, and Tableau.',
    budget: 'USD2000-USD3500',
    skills: ['Python', 'Pandas', 'Tableau', 'SQL'],
    status: 'open',
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    recruiterName: 'DataCorp',
    applicationsCount: 6,
  },
];

export const mockGigsDashboard = mockGigsList.map((gig) => ({
  id: gig.gigId,
  title: gig.title,
  company: gig.recruiterName,
  salary: gig.budget.replace('USD', '$').replace('-USD', ' - $'),
  skills: gig.skills,
  location: 'Remote',
  postedDate: new Date(gig.createdAt).toISOString().split('T')[0],
  description: gig.description,
}));

type RoadmapRecord = {
  studentId: string;
  currentStage: string;
  completedSteps: string[];
  nextSteps: string[];
  notes?: string | null;
};

const defaultNextSteps = [
  'Complete 3 small React/JS projects',
  'Learn TypeScript fundamentals',
  'Publish one GitHub portfolio project',
];

const roadmapStore: Record<string, RoadmapRecord> = {
  stu_001: {
    studentId: 'stu_001',
    currentStage: 'Intermediate',
    completedSteps: [
      'Complete basic HTML/CSS course',
      'Learn JavaScript fundamentals',
      'Build 3 small React projects',
    ],
    nextSteps: [
      'Learn TypeScript for better job opportunities',
      'Study database design and normalization',
      'Build a full-stack application with authentication',
    ],
    notes: null,
  },
  'demo-student-id': {
    studentId: 'demo-student-id',
    currentStage: 'Beginner',
    completedSteps: [],
    nextSteps: defaultNextSteps,
    notes: null,
  },
};

export function getMockRoadmap(studentId: string): RoadmapRecord {
  if (!roadmapStore[studentId]) {
    roadmapStore[studentId] = {
      studentId,
      currentStage: 'Beginner',
      completedSteps: [],
      nextSteps: defaultNextSteps,
      notes: null,
    };
  }
  return roadmapStore[studentId];
}

export function updateMockRoadmap(
  studentId: string,
  updates: Partial<Pick<RoadmapRecord, 'completedSteps' | 'currentStage' | 'notes'>>
): RoadmapRecord {
  const current = getMockRoadmap(studentId);
  const completedSteps = updates.completedSteps ?? current.completedSteps;
  const remaining = defaultNextSteps.filter((step) => !completedSteps.includes(step));

  roadmapStore[studentId] = {
    ...current,
    ...updates,
    completedSteps,
    nextSteps: remaining.length > 0 ? remaining : ['Build a full-stack app with DB', 'Contribute to open-source'],
    currentStage:
      updates.currentStage ??
      (completedSteps.length >= 3 ? 'Intermediate' : completedSteps.length >= 1 ? 'Beginner+' : 'Beginner'),
  };

  return roadmapStore[studentId];
}

export function calculateLocalJobMatch(
  studentSkills: string[],
  jobSkills: string[],
  jobTitle: string
) {
  const normalizedJob = jobSkills.map((s) => s.toLowerCase());
  const matchingSkills = studentSkills.filter((skill) =>
    normalizedJob.some((jobSkill) => jobSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(jobSkill))
  );
  const missingSkills = jobSkills.filter(
    (skill) => !matchingSkills.some((match) => match.toLowerCase() === skill.toLowerCase())
  );
  const score = Math.min(
    95,
    Math.round((matchingSkills.length / Math.max(jobSkills.length, 1)) * 70 + 20)
  );

  return {
    score,
    reasoning: `Strong alignment for ${jobTitle}. ${matchingSkills.length} of ${jobSkills.length} required skills match your profile.`,
    matchingSkills,
    missingSkills,
    missing_skills: missingSkills,
    summary: `Match score ${score}/100 for ${jobTitle}. Focus on ${missingSkills.slice(0, 2).join(', ') || 'portfolio projects'} to improve.`,
    experienceFit: score >= 75 ? 'Excellent Fit' : score >= 55 ? 'Good Fit' : 'Partial Fit',
    portfolioFit: score >= 70 ? 'Strong Match' : 'Moderate Match',
    careerAlignment: score >= 65 ? 'High Compatibility' : 'Moderate Compatibility',
    marketDemandFactor: 0.88,
    recommendations: [
      'Highlight projects that use the matched skills on your profile',
      missingSkills.length
        ? `Learn or showcase: ${missingSkills.slice(0, 3).join(', ')}`
        : 'Your skill set closely matches this role',
      'Tailor your proposal to mention relevant experience',
    ],
  };
}

export const mockStudentDashboard = {
  user: {
    id: 'stu_001',
    name: 'Alex Johnson',
    email: 'student@hirezy.com',
    role: 'student',
    profileCompleted: 78,
  },
  stats: {
    totalGigs: 142,
    shortlistedCount: 28,
    interviewsScheduled: 12,
    applicationsSent: 89,
    proposalsAccepted: 23,
    averageRating: 4.8,
    earnings: 12500,
    monthlyGrowth: 15.3,
    walletBalance: 8900,
    skillScore: 78,
    badgeProgress: 65,
  },
  notifications: [
    { id: 1, type: 'shortlisted', message: 'Shortlisted for Full Stack React Developer', time: '2 hours ago', read: false },
    { id: 2, type: 'interview', message: 'Interview scheduled with TechCorp', time: '1 day ago', read: true },
  ],
  upcomingInterviews: [
    { id: 1, company: 'TechCorp', position: 'Full Stack Developer', date: '2026-07-20', time: '2:00 PM', type: 'Technical', status: 'scheduled' },
  ],
  badges: [
    { id: 1, name: 'Application Ace', description: 'Applied to 100+ gigs', progress: 65, max: 100, achieved: false, icon: '🎯' },
  ],
  careerSuggestions: [
    { id: 1, title: 'Explore React Native', reason: 'Based on your React skills', confidence: 85 },
  ],
  walletTransactions: [
    { id: 1, type: 'earned', amount: 2500, description: 'E-commerce Website Project', date: '2026-07-01', status: 'completed' },
  ],
  gigs: mockGigsDashboard,
  earnings: [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1800 },
    { month: 'Mar', earnings: 2200 },
    { month: 'Apr', earnings: 1900 },
    { month: 'May', earnings: 2800 },
    { month: 'Jun', earnings: 3200 },
  ],
};

const mockApplicationsStore: Array<{
  id: string;
  gigId: string;
  studentId: string;
  coverLetter: string | null;
  status: string;
  aiScore: number | null;
  createdAt: string;
  gig: { id: string; title: string; description: string; status: string };
}> = [];

export function getMockApplications(studentId: string) {
  return mockApplicationsStore.filter((a) => a.studentId === studentId);
}

export function createMockApplication(data: {
  studentId: string;
  gigId: string;
  coverLetter?: string;
  proposedRate?: string;
}) {
  const gig = mockGigsList.find((g) => g.gigId === data.gigId);
  const application = {
    id: `app-${Date.now()}`,
    gigId: data.gigId,
    studentId: data.studentId,
    coverLetter: data.coverLetter ?? null,
    status: 'received',
    aiScore: Math.round(Math.random() * 20 + 75),
    createdAt: new Date().toISOString(),
    gig: {
      id: data.gigId,
      title: gig?.title ?? 'Unknown Gig',
      description: gig?.description ?? '',
      status: 'open',
    },
  };
  mockApplicationsStore.unshift(application);
  return application;
}

export const mockMessages = [
  {
    id: 'msg-1',
    senderId: 'rec_001',
    receiverId: 'stu_001',
    content: 'Hi Alex! Thanks for applying to our Full Stack Developer position.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    read: true,
    sender: { id: 'rec_001', name: 'Sarah Chen', role: 'recruiter' },
  },
  {
    id: 'msg-2',
    senderId: 'stu_001',
    receiverId: 'rec_001',
    content: 'Thank you! I am excited about the opportunity.',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    read: true,
    sender: { id: 'stu_001', name: 'Alex Johnson', role: 'student' },
  },
];
