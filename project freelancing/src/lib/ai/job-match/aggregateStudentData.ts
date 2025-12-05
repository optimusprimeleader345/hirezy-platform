import { getAggregatedStudentData } from './mockStudentProfile'

// This consolidates data from all student modules:
// - Resume AI content
// - Skill Gap analysis
// - Career Path insights
// - Profile Optimizer scores
// - Portfolio Builder projects
// - Market Demand alignment
// - Gig history and performance

export interface AggregatedStudentData {
  skills: string[]
  experienceLevel: string
  careerGoal: string
  certifications: string[]
  portfolioQuality: string
  marketPerformance: number
  profileCompleteness: number
  recommendedSkillGaps: string[]
  resumeText?: string
  pastPerformance?: {
    completedGigs: number
    averageRating: number
    totalEarnings: number
  }
}

// Get comprehensive student data for job matching
export function getStudentDataForMatching(): AggregatedStudentData & {
  resumeText: string
  pastPerformance: {
    completedGigs: number
    averageRating: number
    totalEarnings: number
  }
} {
  const aggregated = getAggregatedStudentData()

  return {
    ...aggregated,
    resumeText: `
      Alex Kumar - Full Stack Developer
      Passionate about building scalable web applications with modern technologies.
      3+ years of experience in frontend and backend development.
      Skills: React, Node.js, JavaScript, HTML, CSS, MongoDB, SQL, Git.
      Projects: E-commerce platform with React/Node.js, Task management app with real-time features.
      Certifications: AWS Certified Cloud Practitioner, MongoDB Certified Developer Associate, JavaScript Mastery Certificate.
      Career Goal: Full-stack Developer specializing in React and Node.js applications.
    `,
    pastPerformance: {
      completedGigs: 8,
      averageRating: 4.7,
      totalEarnings: 125000
    }
  }
}

// Calculate similarity between two skill sets
export function calculateSkillSimilarity(studentsSkills: string[], jobSkills: string[]): {
  matched: string[]
  missing: string[]
  similarity: number // 0-100
} {
  const studentSkillsLower = studentsSkills.map(s => s.toLowerCase())
  const jobSkillsLower = jobSkills.map(s => s.toLowerCase())

  const matched: string[] = []
  const missing: string[] = []

  jobSkills.forEach(skill => {
    if (studentSkillsLower.includes(skill.toLowerCase())) {
      matched.push(skill)
    } else {
      missing.push(skill)
    }
  })

  const similarity = jobSkills.length > 0
    ? (matched.length / jobSkills.length) * 100
    : 0

  return {
    matched,
    missing,
    similarity: Math.round(similarity)
  }
}

// Calculate experience level compatibility
export function calculateExperienceFit(studentLevel: string, jobLevel: string): {
  fit: string
  score: number // 0-100
} {
  const levels = ['beginner', 'intermediate', 'advanced']
  const studentIndex = levels.indexOf(studentLevel.toLowerCase())
  const jobIndex = levels.indexOf(jobLevel.toLowerCase())

  if (studentIndex === -1 || jobIndex === -1) {
    return { fit: 'Unknown', score: 50 }
  }

  const difference = Math.abs(studentIndex - jobIndex)

  let fit: string
  let score: number

  switch (difference) {
    case 0:
      fit = 'Perfect Fit'
      score = 100
      break
    case 1:
      fit = 'Good Fit'
      score = 75
      break
    case 2:
      fit = 'Stretch'
      score = 40
      break
    default:
      fit = 'Not Recommended'
      score = 20
  }

  return { fit, score }
}

// Calculate market demand alignment score
export function calculateMarketAlignment(student: AggregatedStudentData, jobSkills: string[]): number {
  const highDemandSkills = ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL']
  const studentSkillsMatched = student.skills.filter(skill =>
    highDemandSkills.some(highDemand =>
      highDemand.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(highDemand.toLowerCase())
    )
  ).length

  const jobSkillsHighDemand = jobSkills.filter(skill =>
    highDemandSkills.some(highDemand =>
      highDemand.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(highDemand.toLowerCase())
    )
  ).length

  const totalHighDemand = Math.max(highDemandSkills.length, 1)
  const alignmentScore = ((studentSkillsMatched + jobSkillsHighDemand) / totalHighDemand) * 50

  return Math.min(100, Math.round(alignmentScore))
}

// Assess portfolio quality for the job
export function assessPortfolioFit(projects: any[], jobSkills: string[]): {
  fit: string
  score: number
  relevantProjects: number
} {
  let relevantProjects = 0
  let totalTechMatches = 0

  projects.forEach(project => {
    const projectTech = project.technologies || []
    const matchedSkills = jobSkills.filter(jobSkill =>
      projectTech.some(projectSkill =>
        projectSkill.toLowerCase().includes(jobSkill.toLowerCase()) ||
        jobSkill.toLowerCase().includes(projectSkill.toLowerCase())
      )
    )
    if (matchedSkills.length > 0) {
      relevantProjects++
      totalTechMatches += matchedSkills.length
    }
  })

  let fit: string
  let score: number

  if (relevantProjects >= 2) {
    fit = 'Strong'
    score = 90
  } else if (relevantProjects === 1) {
    fit = 'Moderate'
    score = 65
  } else {
    fit = 'Weak'
    score = 30
  }

  return { fit, score, relevantProjects }
}
