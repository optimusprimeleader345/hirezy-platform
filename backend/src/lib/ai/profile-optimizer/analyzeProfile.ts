import { mockStudentProfile } from '../mockStudentProfile'

// Mock student profile data
const mockStudentData = {
  name: 'Alex Kumar',
  summary: 'Frontend developer with React experience looking to expand skills in modern web technologies.',
  about: 'I am a passionate frontend developer specialized in React, JavaScript, and modern web development...',
  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  githubUrl: 'https://github.com/alex-kumar',
  certifications: ['AWS Certified Developer', 'MongoDB Certified'],
  projects: [
    'E-commerce Platform with React',
    'Task Management App',
    'Portfolio Website'
  ]
}

export function analyzeProfile(profileData: typeof mockStudentData) {
  const { summary, about, skills, githubUrl, certifications, projects } = profileData

  // Mock AI analysis based on profile completeness and quality
  let score = 78
  const strengths = []
  const weaknesses = []
  const recommendedSkills = []
  let improvedSummary = ''
  let improvedAbout = ''
  const githubSuggestions = []
  const certificationSuggestions = []
  let impactScore = score + 4

  // Analyze summary quality
  if (summary.length > 100) {
    strengths.push('Good summary length')
  } else {
    weaknesses.push('Summary too short')
    improvedSummary = `${summary} I am focused on building scalable web applications using modern technologies and best practices. With strong problem-solving skills and continuous learning mindset, I excel in collaborative environments and am always eager to contribute to innovative projects.`
  }

  // Analyze about section
  if (about.length > 200) {
    strengths.push('Detailed about section')
  } else {
    weaknesses.push('About section needs expansion')
    improvedAbout = `${about} My journey in software development has equipped me with expertise in full-stack development, agile methodologies, and version control. I prioritize writing clean, maintainable code and staying updated with industry trends. When I'm not coding, I enjoy contributing to open-source projects and mentoring fellow developers.`
  }

  // Analyze skills
  if (skills.length >= 6) {
    strengths.push('Strong technical skills foundation')
  } else {
    weaknesses.push('Limited skill set scope')
    recommendedSkills.push('TypeScript', 'Docker')
  }

  if (!skills.some(skill => skill.toLowerCase().includes('cloud') || skill.toLowerCase().includes('aws'))) {
    weaknesses.push('Missing cloud platform skills')
    recommendedSkills.push('AWS', 'Docker')
  }

  // GitHub analysis
  githubSuggestions.push(
    'Add project README badges (build status, license, version)',
    'Improve commit frequency and consistency',
    'Add project screenshots and demos',
    'Include setup/installation instructions',
    'Create comprehensive documentation'
  )

  // Certification recommendations
  if (!certifications.some(cert => cert.toLowerCase().includes('aws'))) {
    certificationSuggestions.push('AWS Certified Cloud Practitioner')
  }
  if (!certifications.some(cert => cert.toLowerCase().includes('data'))) {
    certificationSuggestions.push('Google Data Analytics Certificate')
  }
  certificationSuggestions.push(
    'Meta Frontend Developer Certificate',
    'IBM AI Engineering Professional Certificate',
    'Google Cloud Professional Developer'
  )

  // Calculate final scores
  score = Math.max(0, Math.min(100, score + (strengths.length * 5) - (weaknesses.length * 8)))

  // Node.js projects analysis
  if (projects.length < 3) {
    weaknesses.push('Limited portfolio diversity')
  } else {
    strengths.push('Good project variety')
  }

  // Set improved versions if they weren't set above
  if (!improvedSummary) {
    improvedSummary = summary
  }
  if (!improvedAbout) {
    improvedAbout = about
  }

  return {
    score,
    strengths,
    weaknesses,
    recommendedSkills: [...new Set(recommendedSkills)], // Remove duplicates
    improvedSummary,
    improvedAbout,
    githubSuggestions,
    certificationSuggestions,
    impactScore
  }
}

// Mock improved bullet points for portfolio projects
export function generateImprovedBulletPoints(project: string) {
  const bulletTemplates = {
    'ecommerce': [
      'Developed modern responsive e-commerce platform with React, Node.js, and MongoDB',
      'Implemented secure payment integration with Stripe API and order management',
      'Applied full-stack development skills with clean architecture and best practices',
      'Deployed to AWS with Docker containerization for scalable production environment'
    ],
    'task': [
      'Built interactive task management application with real-time collaboration features',
      'Implemented drag-and-drop functionality using React DnD library for intuitive UX',
      'Integrated MongoDB for persistent data storage and user authentication',
      'Added modern UI components with TailwindCSS and responsive mobile design'
    ],
    'portfolio': [
      'Created responsive personal portfolio website showcasing development expertise',
      'Implemented contact forms with email service integration and form validation',
      'Added smooth animations and interactions using CSS transitions and JavaScript',
      'Deployed using Netlify for automatic build and hosting with custom domain'
    ]
  }

  const projectType = project.toLowerCase()
  let bullets = []

  if (projectType.includes('ecommerce')) {
    bullets = bulletTemplates.ecommerce
  } else if (projectType.includes('task')) {
    bullets = bulletTemplates.task
  } else if (projectType.includes('portfolio')) {
    bullets = bulletTemplates.portfolio
  } else {
    bullets = [
      'Developed full-stack application using modern web technologies and frameworks',
      'Implemented responsive design patterns with mobile-first development approach',
      'Applied best practices in code organization, documentation, and version control',
      'Integrated APIs and databases for data management and user interactions'
    ]
  }

  return bullets
}
