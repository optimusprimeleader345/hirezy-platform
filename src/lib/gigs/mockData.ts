export interface Gig {
  id: number
  title: string
  company: string
  salary: string
  type: 'Remote' | 'Onsite' | 'Hybrid'
  location: string
  skills: string[]
  description: string
  postedAt: string
  matchScore?: number
  totalBidders?: number
  requirements: string[]
  responsibilities: string[]
  preferredQualifications: string[]
  companyLogo?: string
  category: string
  experience: string
  duration: string
}

export interface GigSearchFilters {
  skills: string[]
  salaryRange: {
    min: number
    max: number
  }
  remote: boolean | null
  experience: string[]
  category: string[]
  postedWithin: string
}

export interface GigListResponse {
  gigs: Gig[]
  totalCount: number
  page: number
  totalPages: number
  filters: GigSearchFilters
}

export const mockGigs: Gig[] = [
  {
    id: 1,
    title: "Senior Full Stack Developer - React & Node.js",
    company: "TechFlow Solutions",
    salary: "$85,000 - $110,000",
    type: "Remote",
    location: "New York, NY",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    matchScore: 92,
    totalBidders: 27,
    category: "Full Stack Development",
    experience: "Senior",
    duration: "6-8 weeks",
    description: "Join our innovative team to build cutting-edge web applications using modern technologies. We're looking for a senior developer who can lead frontend architecture and backend API development.",
    requirements: [
      "5+ years of full stack development experience",
      "Expert knowledge of React ecosystem and Node.js",
      "Experience with cloud platforms (AWS/GCP/Azure)",
      "Strong understanding of RESTful API design"
    ],
    responsibilities: [
      "Lead frontend architecture design and implementation",
      "Develop scalable backend APIs and microservices",
      "Collaborate with UI/UX team for seamless integration",
      "Mentor junior developers and conduct code reviews",
      "Implement CI/CD pipelines and deployment automation"
    ],
    preferredQualifications: [
      "Experience with GraphQL and Apollo",
      "Knowledge of containerization (Docker/Kubernetes)",
      "Familiarity with DevOps practices",
      "Experience with agile methodologies"
    ],
    postedAt: "2024-01-15"
  },
  {
    id: 2,
    title: "iOS Mobile App Development - SwiftUI",
    company: "AppWorks Studio",
    salary: "$70,000 - $95,000",
    type: "Hybrid",
    location: "San Francisco, CA",
    skills: ["Swift", "SwiftUI", "iOS", "UIKit", "Core Data"],
    matchScore: 88,
    totalBidders: 19,
    category: "Mobile Development",
    experience: "Mid-Level",
    duration: "4-6 months",
    description: "Create exceptional iOS applications with modern SwiftUI framework. Work on consumer-facing apps with millions of users.",
    requirements: [
      "3+ years iOS development experience with Swift",
      "Proficiency in SwiftUI and UIKit",
      "Experience with Core Data or Realm",
      "Understanding of iOS design guidelines"
    ],
    responsibilities: [
      "Develop iOS applications using SwiftUI framework",
      "Implement responsive UI designs",
      "Integrate RESTful APIs and handle data persistence",
      "Optimize app performance and user experience",
      "Work with product managers to define requirements"
    ],
    preferredQualifications: [
      "Published apps in App Store",
      "Experience with Combine framework",
      "Knowledge of CI/CD for iOS",
      "Understanding of app store optimization"
    ],
    postedAt: "2024-01-14"
  },
  {
    id: 3,
    title: "Data Engineer - Python & Snowflake",
    company: "DataNexus Corp",
    salary: "$90,000 - $115,000",
    type: "Remote",
    location: "Austin, TX",
    skills: ["Python", "SQL", "Snowflake", "Apache Spark", "Airflow", "AWS"],
    matchScore: 76,
    totalBidders: 31,
    category: "Data Engineering",
    experience: "Senior",
    duration: "3-4 months",
    description: "Build robust data pipelines and infrastructure for our analytics platform. Modern cloud-native data engineering role.",
    requirements: [
      "4+ years data engineering experience",
      "Strong SQL and Python programming skills",
      "Experience with Snowflake or similar data warehouses",
      "Worked with ETL/ELT pipelines and orchestration"
    ],
    responsibilities: [
      "Design and implement data pipelines in Snowflake",
      "Build data warehouse schemas and optimize queries",
      "Create monitoring and alerting for data quality",
      "Collaborate with data scientists and analysts",
      "Ensure data security and compliance"
    ],
    preferredQualifications: [
      "Experience with dbt for data transformation",
      "Knowledge of data lake architectures",
      "Experience with Apache Kafka or similar streaming",
      "Familiarity with data governance practices"
    ],
    postedAt: "2024-01-13"
  },
  {
    id: 4,
    title: "DevOps Engineer - Kubernetes & Docker",
    company: "CloudSolutions Inc",
    salary: "$95,000 - $125,000",
    type: "Remote",
    location: "Seattle, WA",
    skills: ["Kubernetes", "Docker", "Terraform", "AWS", "GitLab CI", "Prometheus"],
    matchScore: 94,
    totalBidders: 15,
    category: "DevOps",
    experience: "Senior",
    duration: "Ongoing",
    description: "Manage and optimize our cloud infrastructure. Lead DevOps initiatives including CI/CD pipelines and infrastructure as code.",
    requirements: [
      "5+ years DevOps/Infrastructure experience",
      "Expert knowledge of Kubernetes and containerization",
      "Experience with infrastructure as code (Terraform)",
      "Proficient in AWS and cloud architectures"
    ],
    responsibilities: [
      "Maintain and scale Kubernetes clusters",
      "Implement infrastructure automation with Terraform",
      "Build and maintain CI/CD pipelines",
      "Monitor system performance and reliability",
      "Ensure security best practices across infrastructure"
    ],
    preferredQualifications: [
      "Experience with service mesh (Istio/Linkerd)",
      "Knowledge of chaos engineering",
      "Certifications in AWS or Kubernetes",
      "Experience with multi-cloud environments"
    ],
    postedAt: "2024-01-12"
  },
  {
    id: 5,
    title: "Frontend Developer - Next.js & Tailwind",
    company: "WebCraft Agency",
    salary: "$65,000 - $85,000",
    type: "Remote",
    location: "Portland, OR",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "GraphQL"],
    matchScore: 89,
    totalBidders: 23,
    category: "Frontend Development",
    experience: "Mid-Level",
    duration: "2-3 months",
    description: "Build beautiful, fast websites and web applications. Join our creative team that values design and user experience.",
    requirements: [
      "2-4 years frontend development experience",
      "Strong React and Next.js skills",
      "Experience with Tailwind CSS and responsive design",
      "Understanding of TypeScript and modern ES6+"
    ],
    responsibilities: [
      "Build responsive frontend applications",
      "Integrate with GraphQL APIs and backend services",
      "Optimize application performance and loading times",
      "Work closely with designers for pixel-perfect implementation",
      "Maintain clean, maintainable codebases"
    ],
    preferredQualifications: [
      "Experience with Framer Motion animations",
      "Knowledge of SEO and web accessibility",
      "Worked with headless CMS systems",
      "Understanding of web performance metrics"
    ],
    postedAt: "2024-01-11"
  },
  {
    id: 6,
    title: "Machine Learning Engineer - PyTorch",
    company: "AI Innovations Lab",
    salary: "$100,000 - $130,000",
    type: "Hybrid",
    location: "Cambridge, MA",
    skills: ["Python", "PyTorch", "TensorFlow", "AWS", "Docker", "FastAPI"],
    matchScore: 68,
    totalBidders: 41,
    category: "Machine Learning",
    experience: "Senior",
    duration: "Long-term",
    description: "Work on cutting-edge AI research and ML applications. Join our team that's pushing the boundaries of artificial intelligence.",
    requirements: [
      "3+ years machine learning experience",
      "Strong Python programming and PyTorch expertise",
      "Experience deploying ML models to production",
      "Understanding of MLOps practices"
    ],
    responsibilities: [
      "Develop and train machine learning models",
      "Deploy ML models to production environments",
      "Collaborate with research team on novel AI algorithms",
      "Optimize model performance and resource usage",
      "Create tools for model monitoring and maintenance"
    ],
    preferredQualifications: [
      "PhD in Computer Science or related field",
      "Experience with distributed training",
      "Knowledge of deep learning architectures",
      "Published research in AI/ML conferences"
    ],
    postedAt: "2024-01-10"
  },
  {
    id: 7,
    title: "Product Designer - User Research Focus",
    company: "UXCraft Studios",
    salary: "$75,000 - $98,000",
    type: "Remote",
    location: "Denver, CO",
    skills: ["Figma", "User Research", "Prototyping", "Sketch", "Adobe XD"],
    matchScore: 82,
    totalBidders: 18,
    category: "Design",
    experience: "Mid-Level",
    duration: "3-5 months",
    description: "Create amazing user experiences through thoughtful design. Work on diverse projects spanning web, mobile, and emerging platforms.",
    requirements: [
      "3+ years product design experience",
      "Expert in design tools (Figma preferred)",
      "Strong portfolio demonstrating user-centered design",
      "Experience with user research and usability testing"
    ],
    responsibilities: [
      "Conduct user research and analysis",
      "Create user flows, wireframes, and high-fidelity designs",
      "Prototype interactive concepts for testing",
      "Present design solutions to stakeholders",
      "Collaborate with engineering teams for implementation"
    ],
    preferredQualifications: [
      "Experience with Quantitive/Qualitative research methods",
      "Knowledge of accessibility standards",
      "Worked in agile development environments",
      "Graphic design background (typography, color theory)"
    ],
    postedAt: "2024-01-09"
  },
  {
    id: 8,
    title: "React Native Mobile Developer",
    company: "CrossPlatform Apps",
    salary: "$78,000 - $102,000",
    type: "Remote",
    location: "Miami, FL",
    skills: ["React Native", "JavaScript", "TypeScript", "iOS", "Android", "Redux"],
    matchScore: 91,
    totalBidders: 22,
    category: "Mobile Development",
    experience: "Mid-Level",
    duration: "4-6 months",
    description: "Build cross-platform mobile applications used by thousands. Outstanding opportunity for mobile developers.",
    requirements: [
      "2-4 years React Native development experience",
      "Strong JavaScript/TypeScript skills",
      "Experience with iOS/Android app deployment",
      "Understanding of mobile UI/UX principles"
    ],
    responsibilities: [
      "Develop mobile applications for iOS and Android",
      "Integrate with RESTful APIs and handle offline functionality",
      "Optimize app performance and user experience",
      "Collaborate with design team for pixel-perfect implementations",
      "Write unit tests and integration tests"
    ],
    preferredQualifications: [
      "Experience with React Native CLI",
      "Knowledge of native modules and bridging",
      "Understanding of app store submission processes",
      "Worked with code-push for over-the-air updates"
    ],
    postedAt: "2024-01-08"
  },
  {
    id: 9,
    title: "Security Engineer - Cloud Security",
    company: "SecureCloud Solutions",
    salary: "$110,000 - $145,000",
    type: "Hybrid",
    location: "Washington, DC",
    skills: ["AWS", "Azure", "Kubernetes", "Python", "Terraform", "CIS Benchmarks"],
    matchScore: 85,
    totalBidders: 12,
    category: "Security",
    experience: "Senior",
    duration: "6 months +",
    description: "Secure cloud infrastructure for enterprise clients. Critical role in cybersecurity and compliance implementation.",
    requirements: [
      "5+ years security engineering experience",
      "Expert knowledge of cloud security (AWS/Azure/GCP)",
      "Experience with infrastructure as code",
      "Understanding of compliance frameworks"
    ],
    responsibilities: [
      "Design and implement cloud security architectures",
      "Conduct security assessments and vulnerability testing",
      "Implement monitoring and incident response systems",
      "Ensure compliance with industry standards",
      "Develop security training programs for dev teams"
    ],
    preferredQualifications: [
      "CISSP or similar certifications",
      "Experience with container security",
      "Knowledge of DevSecOps practices",
      "Worked in regulated industries (finance, healthcare)"
    ],
    postedAt: "2024-01-07"
  },
  {
    id: 10,
    title: "QA Automation Engineer - Cypress",
    company: "QualityAssured Labs",
    salary: "$75,000 - $95,000",
    type: "Remote",
    location: "Chicago, IL",
    skills: ["JavaScript", "Cypress", "Selenium", " Node.js", "Jest", "API Testing"],
    matchScore: 87,
    totalBidders: 16,
    category: "Quality Assurance",
    experience: "Mid-Level",
    duration: "3 months",
    description: "Build comprehensive test automation frameworks. Ensure product quality through automated testing strategies.",
    requirements: [
      "3+ years QA automation experience",
      "Strong JavaScript programming skills",
      "Experience with Cypress or similar testing frameworks",
      "Understanding of test-driven development"
    ],
    responsibilities: [
      "Develop and maintain automated test suites",
      "Create API and integration tests",
      "Implement CI/CD testing pipelines",
      "Write comprehensive test documentation",
      "Collaborate with dev teams for test strategy"
    ],
    preferredQualifications: [
      "Experience with visual testing tools",
      "Knowledge of accessibility testing",
      "Familiarity with Docker for testing",
      "Understanding of QA metrics and KPIs"
    ],
    postedAt: "2024-01-06"
  }
]

export const gigCategories = [
  "All Categories",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "Data Engineering",
  "Machine Learning",
  "DevOps",
  "Design",
  "Security",
  "Quality Assurance"
]

export const experienceLevels = [
  "Entry Level",
  "Mid-Level",
  "Senior",
  "Lead/Principal"
]

export const gigSkills = [
  "React", "Node.js", "JavaScript", "TypeScript", "Python", "Java", "Go",
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
  "Redis", "GraphQL", "REST APIs", "REST", "Git", "CI/CD", "Jest", "Cypress",
  "Tailwind CSS", "Sass", "Figma", "Adobe XD", "Sketch", "Swift", "SwiftUI",
  "React Native", "Flutter", "Kotlin", "TensorFlow", "PyTorch", "Apache Spark",
  "Airflow", "Terraform", "Ansible", "Prometheus", "Grafana", "ELK Stack"
]

// Helper function to get trending categories
export const getTrendingCategories = () => [
  { name: "React Development", count: 45, trending: "+23%" },
  { name: "Full Stack Dev", count: 38, trending: "+15%" },
  { name: "Python & ML", count: 29, trending: "+31%" },
  { name: "DevOps & Cloud", count: 22, trending: "+18%" },
  { name: "UI/UX Design", count: 19, trending: "+12%" },
  { name: "Mobile Apps", count: 15, trending: "+8%" }
]

// Helper function to search gigs
export const searchGigs = (query: string, gigs: Gig[] = mockGigs): Gig[] => {
  const searchTerm = query.toLowerCase()
  return gigs.filter(gig =>
    gig.title.toLowerCase().includes(searchTerm) ||
    gig.company.toLowerCase().includes(searchTerm) ||
    gig.description.toLowerCase().includes(searchTerm) ||
    gig.skills.some(skill => skill.toLowerCase().includes(searchTerm))
  )
}

// Helper function to filter gigs
export const filterGigs = (gigs: Gig[], filters: Partial<GigSearchFilters>): Gig[] => {
  return gigs.filter(gig => {
    if (filters.skills?.length && !filters.skills.some(skill =>
      gig.skills.some(gigSkill => gigSkill.toLowerCase().includes(skill.toLowerCase()))
    )) return false

    if (filters.salaryRange) {
      const gigSalaryMatch = gig.salary.match(/\$(\d{1,3}(?:,\d{3})*)/g)
      if (gigSalaryMatch) {
        const salaries = gigSalaryMatch.map(s => parseInt(s.replace(/[$,]/g, '')))
        const avgSalary = salaries.reduce((a, b) => a + b) / salaries.length
        if (avgSalary < filters.salaryRange.min || avgSalary > filters.salaryRange.max) {
          return false
        }
      }
    }

    if (filters.remote !== null && filters.remote !== undefined) {
      if (filters.remote && gig.type !== 'Remote') return false
      if (!filters.remote && gig.type === 'Remote') return false
    }

    if (filters.experience?.length && !filters.experience.includes(gig.experience)) {
      return false
    }

    if (filters.category?.length && !filters.category.includes(gig.category)) {
      return false
    }

    return true
  })
}
