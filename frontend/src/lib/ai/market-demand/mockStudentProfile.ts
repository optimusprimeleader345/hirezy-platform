// Mock student profile for Market Demand Intelligence system
// Used to determine which high-demand skills the student is missing

export const mockStudentProfile = {
  name: 'Alex Kumar',
  skills: [
    'JavaScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express',
    'MongoDB', 'SQL', 'Git', 'REST APIs', 'Python'
  ],
  experience: 'intermediate', // beginner | intermediate | advanced
  currentLocation: 'bangalore',
  education: 'Bachelor\'s in Computer Science',
  interests: ['frontend', 'backend', 'apis'],
  projects: 8,
  certifications: ['AWS Certified Developer', 'MongoDB Certified']
}

// High-demand skills that students commonly miss (based on market analysis)
export const highDemandMissingSkills = [
  {
    skill: 'TypeScript',
    category: 'Frontend',
    currentDemand: 'High',
    jobs: 32000,
    salaryPremium: '+15%',
    whyNeeded: 'TypeScript adoption is growing rapidly, with 60% of React jobs now requiring TS proficiency.',
    urgency: 'Critical',
    timeToLearn: '2-4 weeks',
    difficulty: 'Beginner'
  },
  {
    skill: 'AWS',
    category: 'Cloud',
    currentDemand: 'High',
    jobs: 28000,
    salaryPremium: '+25%',
    whyNeeded: 'Cloud infrastructure skills are essential for modern development roles.',
    urgency: 'Critical',
    timeToLearn: '4-6 weeks',
    difficulty: 'Intermediate'
  },
  {
    skill: 'Docker',
    category: 'DevOps',
    currentDemand: 'High',
    jobs: 21000,
    salaryPremium: '+20%',
    whyNeeded: 'Containerization is becoming mandatory for production deployments.',
    urgency: 'High',
    timeToLearn: '2-3 weeks',
    difficulty: 'Beginner'
  },
  {
    skill: 'Jest/Testing',
    category: 'Quality Assurance',
    currentDemand: 'Medium',
    jobs: 12000,
    salaryPremium: '+10%',
    whyNeeded: 'Testing is increasingly expected in development roles.',
    urgency: 'Medium',
    timeToLearn: '1-2 weeks',
    difficulty: 'Beginner'
  },
  {
    skill: 'GraphQL',
    category: 'Backend',
    currentDemand: 'Medium',
    jobs: 13000,
    salaryPremium: '+12%',
    whyNeeded: 'Modern API patterns require GraphQL knowledge.',
    urgency: 'Medium',
    timeToLearn: '2-3 weeks',
    difficulty: 'Intermediate'
  }
]

// Function to determine which high-demand skills the student is missing
export function getMissingHighDemandSkills() {
  const studentSkillNames = mockStudentProfile.skills.map(skill =>
    skill.toLowerCase().trim()
  )

  return highDemandMissingSkills.filter(missingSkill => {
    const missingSkillName = missingSkill.skill.toLowerCase()
    const isMissing = !studentSkillNames.some(studentSkill => {
      if (missingSkillName.includes('/')) {
        // Handle multi-part skill names like "Jest/Testing"
        const variations = missingSkillName.split('/')
        return variations.some(variation =>
          studentSkill.includes(variation.trim())
        )
      }
      return studentSkill.includes(missingSkillName)
    })
    return isMissing
  })
}

// Get market alerts for the student
export function getPersonalizedAlerts() {
  const missingSkills = getMissingHighDemandSkills()
  const top3Missing = missingSkills.slice(0, 3)

  const alerts = top3Missing.map(skill => ({
    skill: skill.skill,
    urgency: skill.urgency,
    potentialSalaryIncrease: skill.salaryPremium,
    timeToLearn: skill.timeToLearn,
    message: `High-demand skill alert: Learn ${skill.skill} to increase your earning potential by up to ${skill.salaryPremium}`,
    category: skill.category
  }))

  return alerts
}

// Get opportunity recommendations based on current skills
export function getSkillBasedRecommendations() {
  const { skills, experience } = mockStudentProfile
  const recommendations = []

  if (skills.some(skill => skill.toLowerCase().includes('react'))) {
    recommendations.push({
      title: 'Add TypeScript Proficiency',
      description: '75% of React positions now prefer TypeScript',
      action: 'Complete TypeScript official documentation and apply to 2 projects',
      timeline: '2-3 weeks',
      impact: '15K monthly salary increase'
    })
  }

  if (skills.some(skill => skill.toLowerCase().includes('node.js') || skill.toLowerCase().includes('backend'))) {
    recommendations.push({
      title: 'Learn Cloud Deployment',
      description: 'Companies expect developers to deploy applications',
      action: 'Implement AWS EC2 + S3 for your portfolio projects',
      timeline: '4-6 weeks',
      impact: '25K monthly salary premium'
    })
  }

  if (experience === 'intermediate') {
    recommendations.push({
      title: 'Build a Full-Stack Project with Modern Stack',
      description: 'Demonstrate end-to-end application development skills',
      action: 'Create an e-commerce app with React, Node.js, MongoDB, and deploy on AWS',
      timeline: '8-12 weeks',
      impact: 'Significant career advancement'
    })
  }

  return recommendations
}
