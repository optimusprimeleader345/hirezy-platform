export interface Proposal {
  id: string
  gigId: number
  gigTitle: string
  proposalText: string
  price: string
  score: number
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Accepted'
  submittedAt: string
  clientResponse?: string
  aiNotes?: string
}

export interface ProposalTemplate {
  id: string
  name: string
  industry: string
  tone: 'Professional' | 'Friendly' | 'Technical' | 'Creative'
  length: 'Short' | 'Medium' | 'Long'
  template: string
}

export const mockProposals: Proposal[] = [
  {
    id: "PROP001",
    gigId: 1,
    gigTitle: "Senior Full Stack Developer - React & Node.js",
    proposalText: "Dear Hiring Team,\n\nI'm excited to apply for the Senior Full Stack Developer position at TechFlow Solutions. With 5+ years of full stack experience and expertise in React, Node.js, TypeScript, and PostgreSQL, I bring exactly the skills your team needs.\n\nIn my previous roles, I've successfully delivered 15+ full stack applications, improving performance by 40% and maintaining 99.9% uptime in production. I specialize in scalable architecture and can immediately contribute to your development workflow.\n\nMy technical skills align perfectly with your requirements:\n- Expert in React ecosystem with 4 years experience\n- Strong Node.js backend development\n- Database design and optimization\n- Cloud deployment (AWS)\n\nI suggest an hourly rate of $85 for this ongoing project, ensuring high-quality deliverables and responsive communication throughout the engagement.\n\nI'd love to discuss how my background can contribute to your team's success. Available for a quick call this week.\n\nBest regards,\nAlex Chen\nEmail: alex.chen@example.com\nPortfolio: https://alexchen.dev\nLinkedIn: linkedin.com/in/alexchen",
    price: "$85/hour",
    score: 92,
    status: 'Accepted',
    submittedAt: '2024-01-20',
    clientResponse: 'Excellent proposal! Looking forward to working together.',
    aiNotes: 'Perfect technical alignment, professional tone, clear value proposition. High conversion potential.'
  },
  {
    id: "PROP002",
    gigId: 2,
    gigTitle: "iOS Mobile App Development - SwiftUI",
    proposalText: "Hi AppWorks Team,\n\nI've been following your innovative iOS applications and I'd love to contribute to your next project. As a senior iOS developer with 4 years of SwiftUI experience, I can deliver exceptional user experiences that your users will love.\n\nMy expertise includes:\n- Native SwiftUI development (iOS 14+)\n- Advanced animations and interactions\n- Core Data for data persistence\n- App Store deployment experience\n- UI/UX best practices\n\nI've successfully published 8 iOS apps with combined 50k+ downloads. My recent project delivered 30% increase in user engagement.\n\nFor this 4-6 month project, I suggest $78/hour with milestone-based payments to ensure quality at every stage.\n\nHappy to discuss your vision and how I can bring it to life! 🚀",
    price: "$78/hour",
    score: 88,
    status: 'Shortlisted',
    submittedAt: '2024-01-19',
    clientResponse: 'Great iOS experience, moving to interview round.',
    aiNotes: 'Strong portfolio evidence, good pricing strategy, enthusiastic tone matches creative industry.'
  },
  {
    id: "PROP003",
    gigId: 4,
    gigTitle: "DevOps Engineer - Kubernetes & Docker",
    proposalText: "Dear CloudSolutions Team,\n\nI'm interested in the DevOps Engineer role with your Kubernetes and infrastructure focus. My 6 years of DevOps experience and Kubernetes expertise would be valuable for your growing infrastructure needs.\n\nKey qualifications:\n- 5+ years Kubernetes orchestration\n- Infrastructure as Code (Terraform)\n- CI/CD pipeline design\n- Cloud platforms: AWS, Azure\n- Monitoring: Prometheus, Grafana\n- Container security best practices\n\nIn my last role, I reduced deployment time by 70% and improved system reliability from 95% to 99.9% uptime.\n\nFor this ongoing DevOps project, I recommend $95/hour with monthly deliverables and performance metrics.\n\nLooking forward to learning more about your infrastructure challenges and how I can help solve them.",
    price: "$95/hour",
    score: 94,
    status: 'Pending',
    submittedAt: '2024-01-18',
    aiNotes: 'Exceptional technical depth, quantifiable achievements, perfect for enterprise client expectations. Tier-1 candidate.'
  },
  {
    id: "PROP004",
    gigId: 6,
    gigTitle: "Machine Learning Engineer - PyTorch",
    proposalText: "Dear AI Innovations Lab,\n\nYour mission to push the boundaries of AI aligns perfectly with my passion for machine learning research and production deployment. As an ML Engineer with 4 years of PyTorch experience, I'm excited about the opportunity to contribute to cutting-edge AI projects.\n\nMy background includes:\n- PhD in Computer Science with ML specialization\n- 3 years production ML deployment\n- Published research in NeurIPS conferences\n- Expertise in distributed training\n- MLOps experience\n\nI've successfully deployed 12 ML models in production, achieving 40% performance improvements and processing 1M+ daily predictions.\n\nThe long-term nature of this project allows me to provide exceptional value. I suggest $100/hour with quarterly reviews of our progress and ROI measurements.\n\nWould love to discuss the technical challenges you're facing and how my research background can accelerate your goals.",
    price: "$100/hour",
    score: 96,
    status: 'Pending',
    submittedAt: '2024-01-17',
    aiNotes: 'Outstanding academic and research credentials, perfect technical alignment for advanced AI work. Rare talent profile.'
  },
  {
    id: "PROP005",
    gigId: 3,
    gigTitle: "Data Engineer - Python & Snowflake",
    proposalText: "Hello DataNexus Corp,\n\nThe modern data engineering challenge you're solving resonates with my 5 years of experience building robust data pipelines. I specialize in Snowflake architectures and can deliver the scalable data infrastructure you need.\n\nTechnical expertise:\n- Snowflake data warehousing\n- Python ETL orchestration\n- Apache Spark for big data\n- Airflow DAG management\n- Data quality monitoring\n- Performance optimization\n\nIn my recent role, I migrated a 2TB data warehouse to Snowflake, reducing query times by 80% and cutting costs by 60%.\n\nFor this complex data engineering project, I propose $90/hour with monthly milestone deliveries and comprehensive documentation.\n\nExcited to learn more about your data challenges and discuss how my technical approach can solve them efficiently.",
    price: "$90/hour",
    score: 89,
    status: 'Rejected',
    submittedAt: '2024-01-16',
    clientResponse: 'Thanks for your detailed proposal. We went with a local candidate due to timezone requirements.',
    aiNotes: 'Strong technical proposal, clear value propositions. Rejection due to non-skill factors (location).'
  },
  {
    id: "PROP006",
    gigId: 5,
    gigTitle: "Frontend Developer - Next.js & Tailwind",
    proposalText: "Hi WebCraft Agency,\n\nI love your design-forward approach and would be thrilled to contribute to your frontend development team. My 3 years of Next.js and modern CSS experience align perfectly with your creative projects.\n\nSkills I bring:\n- Next.js App Router architecture\n- Tailwind CSS component design\n- TypeScript for type safety\n- Responsive design expertise\n- Performance optimization\n- Figma collaboration\n\nMy recent project with a creative agency delivered a 50% faster load time and perfect design implementation.\n\nFor this front-end focused project, I suggest $65/hour with bi-weekly deliverables and design review meetings.\n\nLooking forward to bringing your creative visions to life! 🎨",
    price: "$65/hour",
    score: 87,
    status: 'Accepted',
    submittedAt: '2024-01-15',
    aiNotes: 'Excellent creative industry fit, enthusiastic tone matches agency culture, competitive pricing strategy.'
  }
]

export const proposalTemplates: ProposalTemplate[] = [
  {
    id: 'tech-enterprise',
    name: 'Enterprise Software Development',
    industry: 'Technology',
    tone: 'Professional',
    length: 'Long',
    template: 'Focus on scalability, security, and enterprise requirements...'
  },
  {
    id: 'startup-mvp',
    name: 'MVP Development',
    industry: 'Startup/SaaS',
    tone: 'Friendly',
    length: 'Medium',
    template: 'Emphasize speed, innovation, and startup culture alignment...'
  },
  {
    id: 'creative-agency',
    name: 'Creative & Design',
    industry: 'Creative',
    tone: 'Creative',
    length: 'Medium',
    template: 'Highlight portfolio diversity and design sensibility...'
  }
]

// Helper functions for mock data
export const getProposalsByGigId = (gigId: number): Proposal[] => {
  return mockProposals.filter(p => p.gigId === gigId)
}

export const getProposalById = (id: string): Proposal | undefined => {
  return mockProposals.find(p => p.id === id)
}

export const getProposalsByStatus = (status: Proposal['status']): Proposal[] => {
  return mockProposals.filter(p => p.status === status)
}

// Statistics helpers
export const getProposalStats = () => {
  return {
    total: mockProposals.length,
    pending: mockProposals.filter(p => p.status === 'Pending').length,
    shortlisted: mockProposals.filter(p => p.status === 'Shortlisted').length,
    accepted: mockProposals.filter(p => p.status === 'Accepted').length,
    rejected: mockProposals.filter(p => p.status === 'Rejected').length,
    averageScore: Math.round(mockProposals.reduce((sum, p) => sum + p.score, 0) / mockProposals.length)
  }
}
