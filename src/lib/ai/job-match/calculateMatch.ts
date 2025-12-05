import { getStudentDataForMatching } from './aggregateStudentData'
import type { mockStudentProfile } from './mockStudentProfile'

interface JobData {
  title: string
  skills: string[]
  description: string
  experienceLevel: string // 'beginner' | 'intermediate' | 'advanced'
  budgetRange?: string
}

interface MatchResult {
  matchScore: number // 0-100
  skillMatch: {
    matched: string[]
    missing: string[]
  }
  experienceFit: string
  portfolioFit: string
  careerAlignment: string
  marketDemandFactor: number // 0-1
  summary: string
  recommendations: string[]

  // Detailed breakdown
  breakdown: {
    skillScore: number
    experienceScore: number
    portfolioScore: number
    careerScore: number
    marketScore: number
    profileScore: number
  }

  // Why this fits/doesn't fit
  fitAnalysis: {
    strengths: string[]
    weaknesses: string[]
  }
}

// Main matching algorithm
export function calculateJobMatch(jobData: JobData): MatchResult {
  const student = getStudentDataForMatching()

  // Skill matching
  const skillSimilarity = calculateSkillMatchScore(student.skills, jobData.skills)
  const skillScore = skillSimilarity.score

  // Experience level assessment
  const experienceFit = calculateExperienceLevelFit(
    student.experienceLevel,
    jobData.experienceLevel
  )
  const experienceScore = experienceFit.score

  // Portfolio relevance
  const portfolioAssessment = assessPortfolioRelevance(
    student.resumeText,
    jobData.description,
    student.skills
  )
  const portfolioScore = portfolioAssessment.score

  // Career path alignment
  const careerAlignment = calculateCareerFit(
    student.careerGoal,
    jobData.title,
    jobData.description
  )
  const careerScore = careerAlignment.score

  // Market demand factor
  const marketDemandFactor = calculateMarketRelevance(jobData.skills)
  const marketScore = Math.round(marketDemandFactor * 100)

  // Profile completeness factor
  const profileScore = student.profileCompleteness

  // Calculate overall match score
  const weights = {
    skills: 0.35,      // Most important
    experience: 0.25,  // Second most important
    portfolio: 0.20,   // Portfolio relevance
    career: 0.10,      // Career alignment
    market: 0.05,      // Market demand
    profile: 0.05      // Profile completeness
  }

  const matchScore = Math.round(
    skillScore * weights.skills +
    experienceScore * weights.experience +
    portfolioScore * weights.portfolio +
    careerScore * weights.career +
    marketScore * weights.market +
    profileScore * weights.profile
  )

  return {
    matchScore: Math.max(0, Math.min(100, matchScore)),

    skillMatch: {
      matched: skillSimilarity.matched,
      missing: skillSimilarity.missing
    },

    experienceFit: experienceFit.level,
    portfolioFit: portfolioAssessment.strength,
    careerAlignment: careerAlignment.strength,

    marketDemandFactor: Math.max(0, Math.min(1, marketDemandFactor)),

    summary: generateMatchSummary(matchScore, skillScore, experienceScore),
    recommendations: generateRecommendations(skillSimilarity.missing, experienceScore, portfolioScore),

    breakdown: {
      skillScore,
      experienceScore,
      portfolioScore,
      careerScore,
      marketScore,
      profileScore
    },

    fitAnalysis: generateFitAnalysis(skillSimilarity, experienceFit, portfolioAssessment, careerAlignment)
  }
}

// Calculate skill matching score
function calculateSkillMatchScore(studentSkills: string[], jobSkills: string[]): {
  matched: string[]
  missing: string[]
  score: number
} {
  const matched: string[] = []
  const missing: string[] = []

  studentSkills = studentSkills.map(s => s.toLowerCase())
  jobSkills = jobSkills.map(s => s.toLowerCase())

  jobSkills.forEach(skill => {
    if (studentSkills.some(studentSkill =>
      studentSkill.includes(skill) || skill.includes(studentSkill)
    )) {
      matched.push(skill)
    } else {
      missing.push(skill)
    }
  })

  const score = jobSkills.length > 0 ? Math.round((matched.length / jobSkills.length) * 100) : 0

  return { matched, missing, score }
}

// Calculate experience level compatibility
function calculateExperienceLevelFit(
  student: string,
  job: string
): { level: string; score: number } {
  const levels = { beginner: 0, intermediate: 1, advanced: 2 }

  const studentLevel = levels[student as keyof typeof levels] ?? 1
  const jobLevel = levels[job as keyof typeof levels] ?? 1

  const difference = Math.abs(studentLevel - jobLevel)

  if (difference === 0) return { level: 'Perfect Fit', score: 95 }
  if (difference === 1) return { level: 'Good Fit', score: 75 }
  return { level: 'Stretch', score: 40 }
}

// Assess portfolio relevance to the job
function assessPortfolioRelevance(
  resume: string,
  jobDescription: string,
  studentSkills: string[]
): { strength: string; score: number } {
  // Simple keyword matching logic
  const resumeLower = resume.toLowerCase()
  const jobLower = jobDescription.toLowerCase()

  let relevanceScore = 0

  // Check for skill keywords in resume
  studentSkills.forEach(skill => {
    if (resumeLower.includes(skill.toLowerCase()) &&
        jobLower.includes(skill.toLowerCase())) {
      relevanceScore += 15
    }
  })

  // Check for project-related keywords
  const projectKeywords = ['project', 'built', 'developed', 'created', 'implemented']
  if (projectKeywords.some(word => resumeLower.includes(word))) {
    relevanceScore += 20
  }

  // Experience level indicator
  const experienceKeywords = ['years', 'experience', 'developed', 'full-stack']
  if (experienceKeywords.some(word => resumeLower.includes(word))) {
    relevanceScore += 10
  }

  relevanceScore = Math.min(100, relevanceScore)

  let strength: string
  if (relevanceScore >= 80) strength = 'Strong'
  else if (relevanceScore >= 60) strength = 'Moderate'
  else if (relevanceScore >= 40) strength = 'Weak'
  else strength = 'Very Weak'

  return { strength, score: relevanceScore }
}

// Calculate career path alignment
function calculateCareerFit(
  careerGoal: string,
  jobTitle: string,
  jobDescription: string
): { strength: string; score: number } {
  const goalLower = careerGoal.toLowerCase()
  const titleLower = jobTitle.toLowerCase()
  const descLower = jobDescription.toLowerCase()

  let alignmentScore = 0

  // Check for matching career keywords
  const careerKeywords = ['developer', 'engineer', 'full-stack', 'frontend', 'backend', 'web']
  if (careerKeywords.some(word => goalLower.includes(word) &&
                                 (titleLower.includes(word) || descLower.includes(word)))) {
    alignmentScore += 70
  }

  // Check for specific technology matching
  const technologyKeywords = ['react', 'node', 'javascript', 'typescript', 'aws']
  if (technologyKeywords.some(word => goalLower.includes(word) &&
                                    (titleLower.includes(word) || descLower.includes(word)))) {
    alignmentScore += 30
  }

  // General career advancement score
  alignmentScore += 20 // Base career advancement potential

  const finalScore = Math.min(100, alignmentScore)

  let strength: string
  if (finalScore >= 80) strength = 'High'
  else if (finalScore >= 60) strength = 'Medium'
  else if (finalScore >= 40) strength = 'Low'
  else strength = 'Minimal'

  return { strength, score: finalScore }
}

// Calculate market demand relevance
function calculateMarketRelevance(jobSkills: string[]): number {
  const highDemandSkills = [
    'react', 'node.js', 'typescript', 'aws', 'docker', 'graphql',
    'kubernetes', 'python', 'machine learning', 'cloud'
  ]

  let demandScore = 0
  jobSkills.forEach(skill => {
    if (highDemandSkills.some(highDemand =>
      highDemand.includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(highDemand)
    )) {
      demandScore += 20
    }
  })

  return Math.min(1, demandScore / 100)
}

// Generate a concise match summary
function generateMatchSummary(
  overallScore: number,
  skillScore: number,
  experienceScore: number
): string {
  if (overallScore >= 90) {
    return "Excellent match! Your skills and experience perfectly align with this gig."
  } else if (overallScore >= 80) {
    return "Strong match! You have most of the required skills with good experience level."
  } else if (overallScore >= 70) {
    return "Good match! Minor skill gaps but overall strong alignment."
  } else if (overallScore >= 60) {
    return "Moderate match! Several skill gaps to address for better fit."
  } else if (overallScore >= 50) {
    return "Fair match! Significant learning required to fill skill gaps."
  } else {
    return "Limited match! This gig may stretch your current capabilities."
  }
}

// Generate actionable recommendations
function generateRecommendations(
  missingSkills: string[],
  experienceScore: number,
  portfolioScore: number
): string[] {
  const recommendations: string[] = []

  // Skills-based recommendations
  missingSkills.slice(0, 3).forEach(skill => {
    recommendations.push(`Learn ${skill} to improve your fit for similar gigs`)
  })

  // Experience-based recommendations
  if (experienceScore < 70) {
    recommendations.push('Build more experience in your preferred technology stack')
    recommendations.push('Consider taking practice projects to gain hands-on experience')
  }

  // Portfolio recommendations
  if (portfolioScore < 70) {
    recommendations.push('Add relevant projects to your portfolio demonstrating the required skills')
    recommendations.push('Create GitHub repositories showcasing your work')
  }

  // General recommendations
  recommendations.push('Update your profile with recent certifications and achievements')
  recommendations.push('Participate in open-source projects to build more experience')

  return recommendations.slice(0, 5) // Return top 5 recommendations
}

// Generate detailed fit analysis
function generateFitAnalysis(
  skillSimilarity: { matched: string[]; missing: string[] },
  experienceFit: { level: string; score: number },
  portfolioAssessment: { strength: string; score: number },
  careerAlignment: { strength: string; score: number }
): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = []
  const weaknesses: string[] = []

  // Strengths analysis
  if (skillSimilarity.matched.length > 0) {
    strengths.push(`Strong match on core skills: ${skillSimilarity.matched.slice(0, 3).join(', ')}`)
  }

  if (experienceFit.score >= 75) {
    strengths.push(`Experience level (${experienceFit.level}) is well-aligned with requirements`)
  }

  if (portfolioAssessment.score >= 80) {
    strengths.push('Portfolio demonstrates relevant project experience')
  }

  if (careerAlignment.score >= 80) {
    strengths.push('Career goals align well with this type of work')
  }

  // Weaknesses analysis
  if (skillSimilarity.missing.length > 0) {
    weaknesses.push(`Missing key skills: ${skillSimilarity.missing.slice(0, 3).join(', ')}`)
  }

  if (experienceFit.score < 70) {
    weaknesses.push(`Experience level (${experienceFit.level}) may be challenging for this project`)
  }

  if (portfolioAssessment.score < 60) {
    weaknesses.push('Limited demonstration of relevant work experience in portfolio')
  }

  if (weaknesses.length === 0) {
    weaknesses.push('Limited opportunities for growth outside core competencies')
  }

  return { strengths, weaknesses }
}
