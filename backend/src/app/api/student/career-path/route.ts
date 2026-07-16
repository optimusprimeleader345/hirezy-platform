import { NextRequest, NextResponse } from 'next/server'

interface CareerPathRequest {
  primaryGoal: string
}

interface CareerPathResponse {
  suggestedRoles: string[]
  salaryRanges: Array<{
    role: string
    entryLevel: string
    midLevel: string
    seniorLevel: string
  }>
  demandForecast: 'High' | 'Medium' | 'Low'
  emergingSkills: string[]
  timeline: string
  successFactors: string[]
  alternativePaths: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CareerPathRequest
    const { primaryGoal } = body

    if (!primaryGoal || typeof primaryGoal !== 'string') {
      return NextResponse.json(
        { error: 'Primary goal is required' },
        { status: 400 }
      )
    }

    let suggestedRoles: string[] = []
    let salaryRanges: Array<{ role: string; entryLevel: string; midLevel: string; seniorLevel: string }> = []
    let demandForecast: 'High' | 'Medium' | 'Low' = 'Medium'
    let emergingSkills: string[] = []
    let timeline: string = ''
    let successFactors: string[] = []
    let alternativePaths: string[] = []

    // Different career predictions based on primary goal
    switch (primaryGoal.toLowerCase()) {
      case 'frontend developer':
      case 'ui/ux focused':
        suggestedRoles = [
          'Frontend Developer',
          'UI/UX Engineer',
          'Product Engineer',
          'Design Systems Engineer'
        ]
        salaryRanges = [
          { role: 'Frontend Developer', entryLevel: '$60K-$75K', midLevel: '$85K-$120K', seniorLevel: '$130K-$180K' },
          { role: 'UI/UX Engineer', entryLevel: '$65K-$80K', midLevel: '$90K-$125K', seniorLevel: '$135K-$190K' },
          { role: 'Design Systems Engineer', entryLevel: '$70K-$85K', midLevel: '$95K-$130K', seniorLevel: '$140K-$200K' }
        ]
        demandForecast = 'High'
        emergingSkills = ['TypeScript', 'React Server Components', 'Design Systems', 'Web3 Integration', 'A11y']
        timeline = '6-12 months to first role'
        successFactors = [
          'Strong portfolio with real projects',
          'GitHub contributions',
          'Technical writing/blog',
          'Understanding of design principles'
        ]
        alternativePaths = ['UX Designer', 'Product Manager (Technical)', 'Technical Writing']
        break

      case 'backend developer':
      case 'system focused':
        suggestedRoles = [
          'Backend Engineer',
          'API Developer',
          'Platform Engineer',
          'DevOps Engineer'
        ]
        salaryRanges = [
          { role: 'Backend Engineer', entryLevel: '$65K-$80K', midLevel: '$90K-$130K', seniorLevel: '$140K-$200K' },
          { role: 'DevOps Engineer', entryLevel: '$70K-$85K', midLevel: '$95K-$135K', seniorLevel: '$150K-$220K' },
          { role: 'Platform Engineer', entryLevel: '$75K-$90K', midLevel: '$100K-$140K', seniorLevel: '$160K-$230K' }
        ]
        demandForecast = 'High'
        emergingSkills = ['Kubernetes', 'Cloud Architecture', 'Microservices', 'Serverless', 'Infrastructure as Code']
        timeline = '8-14 months to first role'
        successFactors = [
          'Open source contributions',
          'Understanding of system design',
          'Problem-solving skills',
          'Database design experience'
        ]
        alternativePaths = ['Data Engineer', 'Cybersecurity', 'System Administration']
        break

      case 'full stack developer':
        suggestedRoles = [
          'Full Stack Developer',
          'Product Engineer',
          'Software Engineer',
          'Engineering Manager'
        ]
        salaryRanges = [
          { role: 'Full Stack Developer', entryLevel: '$65K-$80K', midLevel: '$95K-$135K', seniorLevel: '$145K-$210K' },
          { role: 'Product Engineer', entryLevel: '$70K-$85K', midLevel: '$100K-$140K', seniorLevel: '$150K-$220K' }
        ]
        demandForecast = 'High'
        emergingSkills = ['GraphQL', 'Docker', 'CI/CD', 'Cloud Platforms', 'API Design']
        timeline = '7-13 months to first role'
        successFactors = [
          'End-to-end project experience',
          'Understanding of both frontend and backend',
          'Agile development experience',
          'Communication skills'
        ]
        alternativePaths = ['DevOps', 'Technical Lead', 'Engineering Manager']
        break

      case 'artificial intelligence':
      case 'ai/ml':
        suggestedRoles = [
          'AI Engineer',
          'Machine Learning Engineer',
          'Data Scientist',
          'AI Product Manager'
        ]
        salaryRanges = [
          { role: 'AI Engineer', entryLevel: '$75K-$95K', midLevel: '$110K-$150K', seniorLevel: '$170K-$250K' },
          { role: 'Machine Learning Engineer', entryLevel: '$85K-$110K', midLevel: '$130K-$170K', seniorLevel: '$190K-$280K' }
        ]
        demandForecast = 'High'
        emergingSkills = ['PyTorch', 'TensorFlow', 'MLOps', 'Large Language Models', 'Edge Computing']
        timeline = '12-18 months to first role'
        successFactors = [
          'Mathematics background (linear algebra, statistics)',
          'Data science projects',
          'Research experience',
          'Domain expertise'
        ]
        alternativePaths = ['Data Engineer', 'Business Analyst', 'Research Scientist']
        break

      case 'data science':
      case 'data analysis':
        suggestedRoles = [
          'Data Scientist',
          'Data Analyst',
          'Business Intelligence Analyst',
          'Machine Learning Engineer'
        ]
        salaryRanges = [
          { role: 'Data Scientist', entryLevel: '$70K-$90K', midLevel: '$100K-$135K', seniorLevel: '$150K-$200K' },
          { role: 'Data Analyst', entryLevel: '$55K-$75K', midLevel: '$80K-$105K', seniorLevel: '$115K-$150K' }
        ]
        demandForecast = 'Medium'
        emergingSkills = ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Big Data Tools']
        timeline = '9-15 months to first role'
        successFactors = [
          'Mathematics/statistics background',
          'Portfolio of data projects',
          'SQL proficiency',
          'Visualization skills'
        ]
        alternativePaths = ['Business Analytics', 'Product Analytics', 'Data Engineering']
        break

      default:
        suggestedRoles = ['Software Engineer', 'Product Engineer', 'Front End Developer']
        salaryRanges = [
          { role: 'Software Engineer', entryLevel: '$65K-$80K', midLevel: '$95K-$125K', seniorLevel: '$140K-$190K' }
        ]
        demandForecast = 'High'
        emergingSkills = ['TypeScript', 'Cloud Platforms', 'Testing', 'Agile']
        timeline = '6-12 months to first role'
        successFactors = ['Consistent coding practice', 'Project portfolio', 'Problem-solving skills']
        alternativePaths = ['UX Design', 'Product Management', 'Technical Writing']
    }

    const response: CareerPathResponse = {
      suggestedRoles,
      salaryRanges,
      demandForecast,
      emergingSkills,
      timeline,
      successFactors,
      alternativePaths
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Career Path API Error:', error)
    return NextResponse.json(
      { error: 'Failed to predict career path' },
      { status: 500 }
    )
  }
}
