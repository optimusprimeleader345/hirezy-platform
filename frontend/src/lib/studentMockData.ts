import { gigListings } from '@/lib/demoData';

export const studentGigsList = [
  {
    gigId: 'gig-1',
    title: 'E-commerce Website Development',
    description: 'Build a modern e-commerce platform with React, Node.js, and MongoDB.',
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
    description: 'Create mobile app designs for a fitness tracking application.',
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
    description: 'Develop a SaaS dashboard with authentication and analytics.',
    budget: 'USD4000-USD7000',
    skills: ['React', 'Node.js', 'Express', 'MongoDB'],
    status: 'open',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    recruiterName: 'WebSolutions Corp',
    applicationsCount: 19,
  },
];

export const defaultRoadmap = {
  studentId: 'demo-student-id',
  currentStage: 'Beginner',
  completedSteps: [] as string[],
  nextSteps: [
    'Complete 3 small React/JS projects',
    'Learn TypeScript fundamentals',
    'Publish one GitHub portfolio project',
  ],
};

export const defaultRecommendations = {
  recommendations: [
    {
      id: 1,
      title: 'Frontend Developer - React/TypeScript',
      matchPercentage: 95,
      salaryRange: '$60,000 - $80,000/year',
      tags: ['React', 'TypeScript', 'JavaScript', 'CSS'],
      whyRecommended: 'Your React and TypeScript experience aligns with this role.',
      company: 'TechStart Inc.',
      location: 'New York, NY',
      remote: true,
    },
    {
      id: 2,
      title: 'Full Stack Engineer - MERN Stack',
      matchPercentage: 88,
      salaryRange: '$70,000 - $90,000/year',
      tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      whyRecommended: 'Your MERN stack experience matches this position well.',
      company: 'WebSolutions Corp',
      location: 'San Francisco, CA',
      remote: false,
    },
  ],
  totalCount: 2,
  timestamp: new Date().toISOString(),
};

export const dashboardGigsFallback = gigListings;
