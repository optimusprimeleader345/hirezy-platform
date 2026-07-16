// Demo data for the application - replace with backend API calls

export const studentStats = {
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
};

export const notifications = [
  {
    id: 1,
    type: 'shortlisted',
    message: 'Congratulations! You were shortlisted for Full Stack Developer position',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'interview',
    message: 'Interview scheduled with TechCorp for Backend Engineer role',
    time: '1 day ago',
    read: true,
  },
  {
    id: 3,
    type: 'application',
    message: 'Your application was viewed by InnovateLabs',
    time: '2 days ago',
    read: true,
  },
  {
    id: 4,
    type: 'job_match',
    message: 'New AI-matched job opportunity: UI/UX Designer',
    time: '3 days ago',
    read: false,
  },
];

export const upcomingInterviews = [
  {
    id: 1,
    company: 'TechCorp',
    position: 'Backend Developer',
    date: '2024-02-15',
    time: '11:00 AM',
    type: 'Technical Interview',
    status: 'scheduled',
  },
  {
    id: 2,
    company: 'StartupXYZ',
    position: 'Frontend Engineer',
    date: '2024-02-18',
    time: '2:30 PM',
    type: 'Behavioral Interview',
    status: 'scheduled',
  },
];

export const badges = [
  {
    id: 1,
    name: 'Application Ace',
    description: 'Applied to 100+ gigs',
    progress: 65,
    max: 100,
    achieved: false,
    icon: '🎯',
  },
  {
    id: 2,
    name: 'Interview Hero',
    description: 'Scheduled 25+ interviews',
    progress: 48,
    max: 25,
    achieved: false,
    icon: '💼',
  },
  {
    id: 3,
    name: 'Skill Master',
    description: 'Reach skill score of 90',
    progress: 78,
    max: 90,
    achieved: false,
    icon: '⭐',
  },
];

export const careerSuggestions = [
  {
    id: 1,
    title: 'Explore React Native Development',
    reason: 'Based on your React skills and mobile app interest',
    confidence: 85,
  },
  {
    id: 2,
    title: 'Consider DevOps Career Path',
    reason: 'Strong systems knowledge and deployment experience',
    confidence: 72,
  },
  {
    id: 3,
    title: 'Specialize in AI/ML Engineering',
    reason: 'Excellent Python skills and data processing projects',
    confidence: 68,
  },
];

export const walletTransactions = [
  {
    id: 1,
    type: 'earned',
    amount: 2500,
    description: 'E-commerce Website Project',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    type: 'earned',
    amount: 1800,
    description: 'Mobile App UI/UX Design',
    date: '2024-01-10',
    status: 'completed',
  },
  {
    id: 3,
    type: 'withdrawn',
    amount: 3200,
    description: 'Bank Transfer',
    date: '2024-01-08',
    status: 'completed',
  },
  {
    id: 4,
    type: 'earned',
    amount: 1200,
    description: 'Data Analysis Project',
    date: '2024-01-05',
    status: 'pending',
  },
];

export const recruiterStats = {
  postedGigs: 45,
  receivedApplications: 267,
  hiredFreelancers: 18,
  successRate: 94.2,
  budgetSpent: 85500,
  avgProjectCost: 2810,
};

export const adminStats = {
  totalUsers: 15420,
  activeUsers: 8730,
  totalGigs: 1267,
  completedProjects: 892,
  platformRevenue: 245670,
  monthlyGrowth: 8.7,
};

export const gigListings = [
  {
    id: 1,
    title: "E-commerce Website Development",
    company: "TechSolutions Inc.",
    salary: "$3000 - $5000",
    skills: ["React", "Node.js", "MongoDB"],
    location: "Remote",
    postedDate: "2 days ago",
    description: "Looking for a full-stack developer to build a modern e-commerce platform.",
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    company: "DesignStudio",
    salary: "$1500 - $2500",
    skills: ["Figma", "Sketch", "Adobe XD"],
    location: "New York",
    postedDate: "1 week ago",
    description: "Create stunning mobile app designs for our fitness tracking application.",
  },
  {
    id: 3,
    title: "Data Analysis Project",
    company: "DataCorp",
    salary: "$2000 - $3500",
    skills: ["Python", "Pandas", "Tableau"],
    location: "Remote",
    postedDate: "3 days ago",
    description: "Analyze large datasets and create comprehensive reports with visualizations.",
  },
];

export const proposals = [
  {
    id: 1,
    gigId: 1,
    freelancer: "Alice Johnson",
    rate: 50,
    deliveryTime: "10 days",
    coverLetter: "I have 5+ years experience building e-commerce platforms...",
    skills: ["React", "Express", "MongoDB"],
    rating: 4.9,
  },
  {
    id: 2,
    gigId: 1,
    freelancer: "Bob Smith",
    rate: 45,
    deliveryTime: "12 days",
    coverLetter: "Specialized in MERN stack development...",
    skills: ["React", "Node.js", "MySQL"],
    rating: 4.7,
  },
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    avatar: "/avatars/john.jpg",
    joinedDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Wilson",
    email: "jane@example.com",
    role: "recruiter",
    avatar: "/avatars/jane.jpg",
    joinedDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    avatar: "/avatars/admin.jpg",
    joinedDate: "2022-12-01",
  },
];

export const reports = [
  {
    id: 1,
    title: "Monthly User Engagement",
    type: "analytics",
    data: {
      users: [1200, 1350, 1180, 1420, 1680, 1520],
      gigs: [145, 162, 138, 178, 195, 172],
      applications: [892, 945, 823, 1089, 1245, 1123],
    },
    generatedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Platform Revenue Report",
    type: "financial",
    data: {
      revenue: [125000, 148000, 132000, 162000, 175000, 189000],
      transactions: [234, 267, 245, 289, 312, 298],
      refunds: [12, 8, 15, 6, 10, 7],
    },
    generatedAt: "2024-01-15",
  },
];

export const chartData = {
  studentEarnings: [
    { month: "Jan", earnings: 2300 },
    { month: "Feb", earnings: 2800 },
    { month: "Mar", earnings: 3100 },
    { month: "Apr", earnings: 3600 },
    { month: "May", earnings: 4200 },
    { month: "Jun", earnings: 4800 },
  ],
  recruiterExpenses: [
    { month: "Jan", expenses: 8500 },
    { month: "Feb", expenses: 9200 },
    { month: "Mar", expenses: 10100 },
    { month: "Apr", expenses: 11800 },
    { month: "May", expenses: 13500 },
    { month: "Jun", expenses: 15200 },
  ],
  adminUsers: [
    { month: "Jan", activeUsers: 1200 },
    { month: "Feb", activeUsers: 1350 },
    { month: "Mar", activeUsers: 1180 },
    { month: "Apr", activeUsers: 1420 },
    { month: "May", activeUsers: 1680 },
    { month: "Jun", activeUsers: 1520 },
  ],
};

// NEW ENHANCED ADMIN DASHBOARD DATA
export const platformGrowthData = [
  { month: 'Jul', students: 12500, recruiters: 2200, total: 14700 },
  { month: 'Aug', students: 14200, recruiters: 2480, total: 16680 },
  { month: 'Sep', students: 16800, recruiters: 2870, total: 19670 },
  { month: 'Oct', students: 19100, recruiters: 3200, total: 22300 },
  { month: 'Nov', students: 21500, recruiters: 3720, total: 25220 },
  { month: 'Dec', students: 23800, recruiters: 4180, total: 27980 },
];

export const aiPlatformHealth = {
  aiRequestsToday: 18430,
  aiSuccessRate: 97.3,
  latencyMs: 158,
  status: 'excellent'
};

export const userActivityHeatmap = [
  {
    day: 'Mon',
    hours: [3, 4, 6, 8, 12, 25, 38, 35, 52, 68, 82, 95, 78, 85, 72, 58, 42, 28, 18, 12, 8, 6, 4, 3]
  },
  {
    day: 'Tue',
    hours: [4, 5, 7, 9, 15, 28, 42, 48, 62, 75, 88, 92, 85, 78, 65, 52, 38, 25, 15, 10, 7, 5, 4, 3]
  },
  {
    day: 'Wed',
    hours: [2, 3, 5, 7, 11, 22, 35, 42, 58, 72, 85, 88, 82, 75, 68, 55, 38, 28, 16, 11, 7, 5, 3, 2]
  },
  {
    day: 'Thu',
    hours: [5, 6, 8, 12, 18, 32, 45, 52, 68, 79, 88, 92, 86, 78, 72, 58, 42, 32, 20, 14, 9, 6, 5, 4]
  },
  {
    day: 'Fri',
    hours: [6, 8, 12, 18, 25, 42, 58, 68, 82, 88, 95, 92, 88, 75, 62, 48, 32, 22, 14, 10, 7, 6, 4, 3]
  },
  {
    day: 'Sat',
    hours: [8, 12, 18, 25, 32, 45, 62, 72, 85, 78, 65, 52, 42, 35, 28, 22, 16, 12, 9, 7, 5, 4, 3, 2]
  },
  {
    day: 'Sun',
    hours: [5, 7, 10, 15, 22, 35, 48, 55, 68, 62, 55, 45, 38, 32, 25, 18, 14, 11, 8, 6, 5, 4, 3, 2]
  }
];

export const fraudDetectionData = {
  suspiciousAccounts: 28,
  highRiskActivities: 67,
  autoFlaggedProposals: 15,
  lastDetection: '3 min ago',
  status: 'monitoring'
};

export const topSkillsTrends = [
  { skill: 'React', growth: 42, current: 1850 },
  { skill: 'Python', growth: 38, current: 1420 },
  { skill: 'TypeScript', growth: 35, current: 1250 },
  { skill: 'AWS', growth: 52, current: 960 },
  { skill: 'Next.js', growth: 48, current: 780 }
];

export const revenueOverview = [
  { month: 'Jan', platformRevenue: 18500, commission: 6200, transactions: 1560, total: 24700 },
  { month: 'Feb', platformRevenue: 22100, commission: 7450, transactions: 1820, total: 29550 },
  { month: 'Mar', platformRevenue: 26800, commission: 8920, transactions: 2150, total: 35720 },
  { month: 'Apr', platformRevenue: 31200, commission: 10500, transactions: 2480, total: 41700 },
  { month: 'May', platformRevenue: 35800, commission: 12200, transactions: 1890, total: 48000 },
  { month: 'Jun', platformRevenue: 41200, commission: 14500, transactions: 2150, total: 55700 }
];

// Recruiter Analytics Data
export const recruiterHiringAnalytics = [
  { month: 'Jan', interviews: 45, hired: 12, submitted: 120, offers: 18 },
  { month: 'Feb', interviews: 52, hired: 15, submitted: 135, offers: 22 },
  { month: 'Mar', interviews: 48, hired: 14, submitted: 142, offers: 20 },
  { month: 'Apr', interviews: 58, hired: 18, submitted: 158, offers: 25 },
  { month: 'May', interviews: 62, hired: 20, submitted: 165, offers: 28 },
  { month: 'Jun', interviews: 68, hired: 22, submitted: 180, offers: 32 },
];

export const candidateQualityMetrics = {
  averageScore: 87.5,
  topPerformers: 34,
  needsImprovement: 12,
  trend: 'up'
};

export const timeToHire = {
  averageDays: 12.5,
  fastest: 3,
  slowest: 28,
  trend: 'down'
};

export const positionDemand = [
  { position: 'Full Stack Developer', demand: 95, growth: 15 },
  { position: 'UI/UX Designer', demand: 88, growth: 22 },
  { position: 'Data Scientist', demand: 82, growth: 18 },
  { position: 'DevOps Engineer', demand: 78, growth: 12 },
];

export const recruiterPerformance = {
  efficiency: 92.5,
  satisfaction: 4.8,
  responseTime: 2.3,
  successRate: 88.2
};

export const aiEfficiencyGains = {
  timeSaved: 45,
  costReduction: 32,
  accuracy: 94.5,
  automation: 78
};