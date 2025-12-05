// Demo data for the application - replace with backend API calls

export const studentStats = {
  totalGigs: 142,
  applicationsSent: 89,
  proposalsAccepted: 23,
  averageRating: 4.8,
  earnings: 12500,
  monthlyGrowth: 15.3,
};

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
