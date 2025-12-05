// Mock data for Market Demand Intelligence AI system

export const trendingSkills = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    growth: 28,
    demand: 'High',
    jobs: 45000,
    salary: '₹12-18 LPA',
    regions: ['Bangalore', 'Mumbai', 'Delhi'],
    trend: 'rising'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    growth: 32,
    demand: 'High',
    jobs: 38000,
    salary: '₹8-15 LPA',
    regions: ['Bangalore', 'Hyderabad', 'Pune'],
    trend: 'rising'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    growth: 35,
    demand: 'High',
    jobs: 32000,
    salary: '₹10-17 LPA',
    regions: ['Bangalore', 'Delhi', 'Chennai'],
    trend: 'rising'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    growth: 45,
    demand: 'High',
    jobs: 28000,
    salary: '₹15-25 LPA',
    regions: ['Bangalore', 'Hyderabad', 'Mumbai'],
    trend: 'rising'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    growth: 25,
    demand: 'Medium',
    jobs: 24000,
    salary: '₹8-14 LPA',
    regions: ['Bangalore', 'Delhi', 'Pune'],
    trend: 'steady'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    growth: 30,
    demand: 'Medium',
    jobs: 21000,
    salary: '₹12-20 LPA',
    regions: ['Bangalore', 'Hyderabad', 'Mumbai'],
    trend: 'rising'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'DevOps',
    growth: 40,
    demand: 'Medium',
    jobs: 18000,
    salary: '₹18-28 LPA',
    regions: ['Bangalore', 'Delhi', 'Chennai'],
    trend: 'rising'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    growth: 22,
    demand: 'Medium',
    jobs: 15000,
    salary: '₹8-14 LPA',
    regions: ['Bangalore', 'Hyderabad', 'Pune'],
    trend: 'steady'
  },
  {
    id: 'jest',
    name: 'Jest',
    category: 'Testing',
    growth: 18,
    demand: 'Low',
    jobs: 12000,
    salary: '₹7-12 LPA',
    regions: ['Bangalore', 'Delhi', 'Chennai'],
    trend: 'growing'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'Backend',
    growth: 27,
    demand: 'Medium',
    jobs: 13000,
    salary: '₹10-16 LPA',
    regions: ['Bangalore', 'Mumbai', 'Delhi'],
    trend: 'rising'
  }
]

// Monthly trend data for past 12 months (relative to current date)
export const monthlyTrends = [
  { month: 'Jan 2024', react: 85, python: 78, typescript: 75, aws: 82 },
  { month: 'Feb 2024', react: 87, python: 79, typescript: 78, aws: 85 },
  { month: 'Mar 2024', react: 89, python: 80, typescript: 81, aws: 88 },
  { month: 'Apr 2024', react: 90, python: 82, typescript: 85, aws: 90 },
  { month: 'May 2024', react: 92, python: 85, typescript: 88, aws: 93 },
  { month: 'Jun 2024', react: 95, python: 87, typescript: 92, aws: 96 },
  { month: 'Jul 2024', react: 93, python: 89, typescript: 94, aws: 98 },
  { month: 'Aug 2024', react: 97, python: 91, typescript: 96, aws: 100 },
  { month: 'Sep 2024', react: 98, python: 92, typescript: 98, aws: 102 },
  { month: 'Oct 2024', react: 100, python: 95, typescript: 100, aws: 105 },
  { month: 'Nov 2024', react: 101, python: 97, typescript: 102, aws: 108 },
  { month: 'Dec 2024', react: 105, python: 98, typescript: 107, aws: 110 }
]

// Regional demand data (skills heat map data)
export const regionalDemand = {
  bangalore: {
    react: 95, python: 92, typescript: 90, aws: 98, docker: 87, nodejs: 89
  },
  mumbai: {
    react: 88, python: 85, typescript: 84, aws: 92, docker: 82, nodejs: 85
  },
  delhi: {
    react: 85, python: 80, typescript: 83, aws: 88, docker: 80, nodejs: 82
  },
  hyderabad: {
    react: 82, python: 87, typescript: 80, aws: 94, docker: 85, nodejs: 84
  },
  chennai: {
    react: 78, python: 85, typescript: 81, aws: 86, docker: 78, nodejs: 80
  },
  pune: {
    react: 83, python: 88, typescript: 85, aws: 85, docker: 82, nodejs: 83
  }
}

// Salary trend data over time
export const salaryTrends = [
  { skill: 'React', salary2023: '₹8-12 LPA', salary2024: '₹10-16 LPA', projected2025: '₹12-20 LPA' },
  { skill: 'Python', salary2023: '₹6-10 LPA', salary2024: '₹8-14 LPA', projected2025: '₹10-18 LPA' },
  { skill: 'TypeScript', salary2023: '₹8-13 LPA', salary2024: '₹10-17 LPA', projected2025: '₹12-22 LPA' },
  { skill: 'AWS', salary2023: '₹12-18 LPA', salary2024: '₹15-24 LPA', projected2025: '₹18-28 LPA' },
  { skill: 'Docker', salary2023: '₹10-16 LPA', salary2024: '₹12-20 LPA', projected2025: '₹15-24 LPA' }
]

// Opportunity insights (AI-generated actionable advice)
export const opportunityInsights = [
  {
    id: 1,
    title: 'Cloud-Native Development Boom',
    description: 'Kubernetes and Docker skills are seeing unprecedented demand. Companies are moving towards containerization and microservices architecture.',
    action: 'Complete a Docker/Kubernetes certification within 2-3 months',
    priority: 'High'
  },
  {
    id: 2,
    title: 'TypeScript Jobs Surpassing JavaScript',
    description: 'TypeScript now represents 60% of frontend job postings. Strong typing and modern development practices are essential.',
    action: 'Convert your existing JavaScript projects to TypeScript',
    priority: 'High'
  },
  {
    id: 3,
    title: 'AI/ML Skills Premium',
    description: 'Companies willing to pay 40% premium for AI/ML expertise. Python remains the dominant language.',
    action: 'Build 2-3 AI/ML projects using TensorFlow or PyTorch',
    priority: 'Medium'
  },
  {
    id: 4,
    title: 'Quality Assurance Renaissance',
    description: 'Test automation and QA engineering gaining traction. DevOps integration creating specialized roles.',
    action: 'Learn Jest/Mocha testing frameworks and CI/CD practices',
    priority: 'Medium'
  }
]

// Daily/Weekly market scores
export const marketScores = {
  daily: {
    score: 78,
    change: '+2.3',
    trend: 'rising',
    insights: 'React and AWS demand continues strong surge'
  },
  weekly: {
    score: 82,
    change: '+5.1',
    trend: 'rising',
    insights: 'Cloud technologies showing 15% growth this week'
  }
}
