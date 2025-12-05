// Mock data for Recruiter Dashboard - All deterministic

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
}

export interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  years?: number;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  type: 'application_received' | 'ai_match_generated' | 'recruiter_viewed_profile' | 'recruiter_sent_message' | 'candidate_replied' | 'proposal_reviewed' | 'shortlisted' | 'interview_scheduled' | 'offer_made' | 'hired' | 'rejected';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  location: string;
  experience: number; // years
  skills: Skill[];
  pastExperience?: Experience[];
  education?: string;
  portfolio?: string[];
  github?: string;
  linkedin?: string;
  resume?: string;
  proposal?: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'interviewed' | 'hired';
  matchScore?: number;
  salaryExpectation?: string;
  timeline?: TimelineEvent[];
}

export interface Gig {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  budget: string;
  deadline?: string;
  type: 'remote' | 'hybrid' | 'onsite';
  status: 'draft' | 'active' | 'paused' | 'completed';
  createdAt: string;
  applicants?: Applicant[];
  shortlistedCount?: number;
}

export interface AnalyticsData {
  totalGigs: number;
  activeApplicants: number;
  averageMatchScore: number;
  hires: number;
  avgTimeToFill: string;
  topSkills: { skill: string; count: number }[];
  candidateSources: { source: string; count: number }[];
  hireFunnel: { stage: string; count: number }[];
  gigPerformance: { name: string; applications: number; hires: number }[];
}

export const mockCompanies: Company[] = [
  { id: '1', name: 'TechSolutions Inc.', website: 'https://techsolutions.com' },
  { id: '2', name: 'Digital Innovations', website: 'https://digitalinnovations.com' },
  { id: '3', name: 'ModernWeb Corp', website: 'https://modernweb.com' },
  { id: '4', name: 'CloudFirst Solutions', website: 'https://cloudfirst.com' },
  { id: '5', name: 'DevOps Masters', website: 'https://devopsmasters.com' },
];

export const mockApplicants: Applicant[] = [
  {
    id: 'app-1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    location: 'San Francisco, CA',
    experience: 5,
    skills: [
      { name: 'React', level: 'advanced', years: 4 },
      { name: 'TypeScript', level: 'intermediate', years: 2 },
      { name: 'Node.js', level: 'intermediate', years: 3 },
      { name: 'Python', level: 'beginner', years: 1 },
    ],
    pastExperience: [
      { title: 'Senior Frontend Developer', company: 'TechSolutions Inc.', duration: '2020 - Present', description: 'Led frontend development for enterprise applications' }
    ],
    education: 'BS Computer Science, Stanford University',
    portfolio: ['https://alexchen.dev', 'https://github.com/alexchen'],
    github: 'alexchen',
    linkedin: 'alexchen',
    appliedDate: '2025-01-20',
    status: 'shortlisted',
    salaryExpectation: '120k-140k USD',
  },
  {
    id: 'app-2',
    name: 'Sofia Rodriguez',
    email: 'sofia.dev@example.com',
    location: 'Madrid, Spain',
    experience: 4,
    skills: [
      { name: 'React', level: 'advanced', years: 4 },
      { name: 'JavaScript', level: 'advanced', years: 5 },
      { name: 'CSS', level: 'advanced', years: 4 },
      { name: 'HTML', level: 'advanced', years: 5 },
      { name: 'Node.js', level: 'intermediate', years: 2 },
      { name: 'MongoDB', level: 'intermediate', years: 3 },
    ],
    pastExperience: [
      { title: 'Full Stack Developer', company: 'Digital Innovations', duration: '2021 - Present', description: 'Built responsive web applications and REST APIs' }
    ],
    education: 'MS Computer Science, Universidad Politécnica de Madrid',
    proposal: 'I am very interested in this position and believe my background aligns perfectly with your requirements. I have 4+ years of experience with React and modern JavaScript frameworks.',
    appliedDate: '2025-01-18',
    status: 'applied',
    salaryExpectation: '80k-100k EUR',
  },
  {
    id: 'app-3',
    name: 'David Kumar',
    email: 'david.kumar@example.com',
    location: 'London, UK',
    experience: 6,
    skills: [
      { name: 'React', level: 'advanced', years: 5 },
      { name: 'Next.js', level: 'advanced', years: 3 },
      { name: 'GraphQL', level: 'advanced', years: 2 },
      { name: 'AWS', level: 'intermediate', years: 3 },
      { name: 'Docker', level: 'intermediate', years: 2 },
    ],
    pastExperience: [
      { title: 'Lead Frontend Engineer', company: 'ModernWeb Corp', duration: '2019 - Present', description: 'Led a team of 3 developers, architected scalable React applications' }
    ],
    education: 'PhD Computer Science, University College London',
    portfolio: ['https://davidkumar.co.uk', 'https://behance.net/davidkumar'],
    appliedDate: '2025-01-15',
    status: 'interviewed',
    salaryExpectation: '100k-130k GBP',
  },
  {
    id: 'app-4',
    name: 'Maria Silva',
    email: 'maria.silva@example.com',
    location: 'Rio de Janeiro, Brazil',
    experience: 3,
    skills: [
      { name: 'React', level: 'intermediate', years: 3 },
      { name: 'Vue.js', level: 'advanced', years: 2 },
      { name: 'JavaScript', level: 'advanced', years: 4 },
      { name: 'CSS', level: 'advanced', years: 3 },
    ],
    proposal: 'I love the company mission and would love to contribute my frontend skills to this project.',
    appliedDate: '2025-01-12',
    status: 'applied',
    salaryExpectation: '6k-8k BRL/month',
  },
  {
    id: 'app-5',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    location: 'Sydney, Australia',
    experience: 7,
    skills: [
      { name: 'React', level: 'advanced', years: 5 },
      { name: 'TypeScript', level: 'advanced', years: 4 },
      { name: 'Next.js', level: 'advanced', years: 3 },
      { name: 'Redux', level: 'advanced', years: 4 },
      { name: 'Testing', level: 'intermediate', years: 3 },
    ],
    pastExperience: [
      { title: 'Senior Full Stack Developer', company: 'CloudFirst Solutions', duration: '2018 - Present', description: 'Developed cloud-native applications and led frontend team' }
    ],
    education: 'BS Software Engineering, University of Technology Sydney',
    github: 'jwilson-dev',
    appliedDate: '2025-01-10',
    status: 'shortlisted',
    salaryExpectation: '180k-220k AUD',
  },
  {
    id: 'app-6',
    name: 'Anna Lee',
    email: 'anna.lee@example.com',
    location: 'Seoul, South Korea',
    experience: 2,
    skills: [
      { name: 'React', level: 'intermediate', years: 2 },
      { name: 'JavaScript', level: 'intermediate', years: 3 },
      { name: 'Figma', level: 'advanced', years: 1 },
      { name: 'UI/UX', level: 'intermediate', years: 2 },
    ],
    proposal: 'I am passionate about creating beautiful user experiences and would love to contribute to your frontend team.',
    appliedDate: '2025-01-08',
    status: 'rejected',
    salaryExpectation: '30M-40M KRW/month',
  },
];

export const realApplicants: Applicant[] = [
  {
    id: "app1",
    name: "Rohan Sinha",
    email: "rohan.sinha@example.com",
    location: "Bangalore, India",
    experience: 2,
    skills: [
      { name: "React", level: "intermediate", years: 2 },
      { name: "Next.js", level: "intermediate", years: 1 },
      { name: "JavaScript", level: "advanced", years: 2 },
      { name: "CSS", level: "intermediate", years: 2 }
    ],
    portfolio: ["https://rohan-dev.vercel.app"],
    education: "BTech Computer Science",
    proposal: "I can deliver a clean UI with pixel-perfect accuracy using modern React patterns and responsive design principles.",
    appliedDate: "2025-11-20",
    status: "applied",
    salaryExpectation: "₹25k-35k/month",
    matchScore: 4.6,
    timeline: [
      {
        id: "t1",
        type: "application_received",
        title: "Application Received",
        description: "The candidate applied for the Frontend React Developer gig.",
        timestamp: "2025-11-20 09:15",
        icon: "InboxArrowDown"
      },
      {
        id: "t2",
        type: "ai_match_generated",
        title: "AI Match Score Calculated",
        description: "AI evaluated skills and generated an 87% match score.",
        timestamp: "2025-11-20 09:15",
        icon: "Sparkles"
      }
    ]
  },
  {
    id: "app2",
    name: "Neha Patil",
    email: "neha.patil@example.com",
    location: "Mumbai, India",
    experience: 1,
    skills: [
      { name: "React", level: "intermediate", years: 1.5 },
      { name: "Tailwind", level: "advanced", years: 1 },
      { name: "TypeScript", level: "intermediate", years: 1 }
    ],
    portfolio: ["https://neha-ui.vercel.app"],
    education: "BS Computer Applications",
    proposal: "I will provide high-quality UI with animations and charts, meeting all design specifications and performance requirements.",
    appliedDate: "2025-11-18",
    status: "applied",
    salaryExpectation: "₹15k-25k/month",
    matchScore: 4.8,
    timeline: [
      {
        id: "t1",
        type: "application_received",
        title: "Application Received",
        description: "The candidate applied for the Frontend React Developer gig.",
        timestamp: "2025-11-18 10:30",
        icon: "InboxArrowDown"
      },
      {
        id: "t2",
        type: "ai_match_generated",
        title: "AI Match Score Calculated",
        description: "AI evaluated skills and generated an 87% match score.",
        timestamp: "2025-11-18 10:30",
        icon: "Sparkles"
      },
      {
        id: "t3",
        type: "recruiter_viewed_profile",
        title: "Recruiter Viewed Profile",
        description: "You opened the candidate's portfolio and resume.",
        timestamp: "2025-11-18 11:45",
        icon: "UserCheck"
      }
    ]
  },
  {
    id: "app3",
    name: "Aditya Kumar",
    email: "aditya.kumar@example.com",
    location: "Delhi, India",
    experience: 0,
    skills: [
      { name: "JavaScript", level: "intermediate", years: 1 },
      { name: "HTML", level: "advanced", years: 1 },
      { name: "CSS", level: "advanced", years: 1 }
    ],
    portfolio: ["https://aditya-web.vercel.app"],
    education: "Full Stack Development Bootcamp",
    proposal: "Motivated to deliver high-performing components with modern coding standards and best practices.",
    appliedDate: "2025-11-15",
    status: "shortlisted",
    salaryExpectation: "₹10k-15k/month",
    matchScore: 4.2
  },
  {
    id: "app4",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    location: "Pune, India",
    experience: 4,
    skills: [
      { name: "Node.js", level: "advanced", years: 3 },
      { name: "Express", level: "advanced", years: 4 },
      { name: "MongoDB", level: "intermediate", years: 3 },
      { name: "JWT", level: "intermediate", years: 2 }
    ],
    github: "priya-backend",
    education: "MCA Computer Applications",
    proposal: "I have extensive experience building scalable backend APIs and would love to contribute to your secure application architecture.",
    appliedDate: "2025-11-22",
    status: "applied",
    salaryExpectation: "₹35k-55k/month",
    matchScore: 4.7
  },
  {
    id: "app5",
    name: "Kavita Jain",
    email: "kavita.jain@example.com",
    location: "Chennai, India",
    experience: 2,
    skills: [
      { name: "Figma", level: "advanced", years: 2 },
      { name: "UI/UX", level: "advanced", years: 1.5 },
      { name: "Prototyping", level: "intermediate", years: 1 }
    ],
    portfolio: ["https://kavita-designs.vercel.app", "https://behance.net/kavitadesigns"],
    education: "BDes Interaction Design",
    proposal: "Passionate about creating beautiful user experiences and ready to design the perfect UI solutions for your platform.",
    appliedDate: "2025-11-12",
    status: "interviewed",
    salaryExpectation: "₹12k-18k/month",
    matchScore: 4.9
  }
];

export const mockGigs: Gig[] = [
  {
    id: "gig1",
    title: "Frontend React Developer",
    company: "StartupXYZ",
    description: "We are looking for a React developer to build interactive dashboards using Next.js, Tailwind, and Chart.js. The candidate must understand component-based design and responsive UI. You'll work on our SaaS platform, collaborating with designers and backend engineers to create seamless user experiences.",
    skills: ["React", "Next.js", "Tailwind", "JavaScript", "TypeScript"],
    budget: "₹25,000 - ₹40,000",
    deadline: "2025-12-10",
    type: "remote",
    status: "active",
    createdAt: "2025-11-15",
    applicants: [realApplicants[0], realApplicants[1], realApplicants[2]],
    shortlistedCount: 1
  },
  {
    id: "gig2",
    title: "Backend Node.js Engineer",
    company: "TechCorp",
    description: "Develop secure backend APIs using Node.js, Express, and MongoDB. Knowledge of authentication, REST design, and deployment required. Experience with microservices architecture and cloud deployment is a plus.",
    skills: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    budget: "₹30,000 - ₹60,000",
    deadline: "2025-12-20",
    type: "hybrid",
    status: "active",
    createdAt: "2025-11-20",
    applicants: [realApplicants[3]],
    shortlistedCount: 0
  },
  {
    id: "gig3",
    title: "AI Resume Analyzer",
    company: "HireAI",
    description: "Build an LLM-powered resume analysis tool that extracts skills, ranks candidates, and predicts job match scores using embeddings. Experience with NLP and machine learning frameworks required.",
    skills: ["Python", "FastAPI", "LLMs", "Embeddings", "NLP"],
    budget: "₹50,000 - ₹85,000",
    deadline: "2026-01-05",
    type: "onsite",
    status: "draft",
    createdAt: "2025-11-25"
  },
  {
    id: "gig4",
    title: "UI/UX Designer",
    company: "DesignHub",
    description: "Design beautiful, clean, and responsive web UI using Figma. Should have understanding of user flow, components, and branding. Experience with design systems and prototyping required.",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
    budget: "₹15,000 - ₹25,000",
    deadline: "2025-12-15",
    type: "remote",
    status: "completed",
    createdAt: "2025-11-10",
    applicants: [realApplicants[4]],
    shortlistedCount: 1
  }
];

export const mockAnalytics: AnalyticsData = {
  totalGigs: 4,
  activeApplicants: 15,
  averageMatchScore: 78,
  hires: 3,
  avgTimeToFill: '12 days',
  topSkills: [
    { skill: 'React', count: 8 },
    { skill: 'JavaScript', count: 6 },
    { skill: 'TypeScript', count: 4 },
    { skill: 'Node.js', count: 4 },
    { skill: 'Next.js', count: 3 },
    { skill: 'CSS', count: 4 },
  ],
  candidateSources: [
    { source: 'LinkedIn', count: 8 },
    { source: 'Company Website', count: 4 },
    { source: 'GitHub', count: 2 },
    { source: 'Referrals', count: 1 },
  ],
  hireFunnel: [
    { stage: 'Applied', count: 15 },
    { stage: 'Shortlisted', count: 7 },
    { stage: 'Interviewed', count: 4 },
    { stage: 'Hired', count: 3 },
  ],
  gigPerformance: [
    { name: 'Senior React Developer', applications: 5, hires: 2 },
    { name: 'Full Stack Developer', applications: 3, hires: 1 },
    { name: 'Frontend Engineer', applications: 0, hires: 0 },
    { name: 'Senior Full Stack Developer', applications: 7, hires: 0 },
  ],
};
