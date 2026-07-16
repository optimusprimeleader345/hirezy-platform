export function generateDescription(projectData: {
  name: string
  skills?: string[]
  technologies?: string[]
  description?: string
}) {
  const { name, skills = [], technologies = [], description } = projectData

  // Mock AI description generation based on project name and skills
  let generatedDescription = ''
  let techStack: string[] = []
  let complexity = 'Beginner'
  let impact = ''

  // Analyze project name for context
  if (name.toLowerCase().includes('ecommerce') || name.toLowerCase().includes('shop')) {
    generatedDescription = `A fully functional ${name} application featuring user authentication, product catalog, shopping cart, and secure payment integration. Built as a learning project to master full-stack development concepts.`
    techStack = ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'JWT', 'Tailwind']
    complexity = 'Intermediate'
    impact = 'Demonstrates complete e-commerce workflow and payment processing'
  } else if (name.toLowerCase().includes('todo') || name.toLowerCase().includes('task')) {
    generatedDescription = `A modern task management application with drag-and-drop functionality, real-time updates, and material design. Features user authentication, project organization, and team collaboration capabilities.`
    techStack = ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI']
    complexity = 'Intermediate'
    impact = 'Shows real-time data synchronization and modern UI patterns'
  } else if (name.toLowerCase().includes('portfolio') || name.toLowerCase().includes('website')) {
    generatedDescription = `A responsive personal portfolio website showcasing modern web development skills. Includes animated components, responsive design, and contact form functionality. Deployed and optimized for performance.`
    techStack = ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'TypeScript', 'Netlify']
    complexity = 'Intermediate'
    impact = 'Highlights frontend development and UI/UX implementation'
  } else if (name.toLowerCase().includes('api') || name.toLowerCase().includes('backend')) {
    generatedDescription = `A robust backend API serving multiple client applications with authentication, data validation, and comprehensive documentation. Implements RESTful architecture and serves as foundation for full-stack applications.`
    techStack = ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger', 'Docker', 'AWS']
    complexity = 'Intermediate'
    impact = 'Demonstrates backend architecture and API design principles'
  } else if (name.toLowerCase().includes('game') || name.toLowerCase().includes('app')) {
    generatedDescription = `An interactive mobile application combining engaging user interface design with backend data management. Features responsive design, real-time updates, and cross-platform compatibility.`
    techStack = ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Redux', 'Native Base']
    complexity = 'Advanced'
    impact = 'Showcases mobile development and cross-platform app creation'
  } else if (name.toLowerCase().includes('dashboard') || name.toLowerCase().includes('admin')) {
    generatedDescription = `A comprehensive admin dashboard with data visualization, analytics, and real-time monitoring capabilities. Features modular component architecture and responsive design pattern implementation.`
    techStack = ['React', 'Chart.js', 'Axios', 'TailwindCSS', 'React Router', 'Context API']
    complexity = 'Intermediate'
    impact = 'Demonstrates data visualization and complex state management'
  } else {
    // Generic project description
    generatedDescription = `An innovative ${name} project showcasing modern web development techniques and best practices. Features clean architecture, responsive design, and efficient code organization. Built with focus on scalability and maintainability.`
    techStack = ['React', 'JavaScript', 'CSS', 'HTML', 'Git']
    complexity = 'Beginner'
    impact = 'Demonstrates fundamental web development concepts and structured project organization'
  }

  // Merge with provided skills/technologies
  if (technologies.length > 0) {
    techStack = Array.from(new Set<unknown>([...techStack, ...technologies])) as string[]
  }

  // Enhance based on input skills
  if (skills.length > 0) {
    const skillEnhancement: { [key: string]: string[] } = {
      'react': ['Redux', 'React Router', 'React Testing Library'],
      'node': ['Express', 'MongoDB', 'JWT'],
      'python': ['Flask', 'Django', 'Pandas', 'TensorFlow'],
      'aws': ['EC2', 'Lambda', 'DynamoDB', 'CloudWatch'],
      'docker': ['Kubernetes', 'Docker Compose', 'AWS ECS']
    }

    skills.forEach(skill => {
      const skillLower = skill.toLowerCase()
      for (const [key, enhances] of Object.entries(skillEnhancement)) {
        if (skillLower.includes(key)) {
          techStack = Array.from(new Set<unknown>([...techStack, ...enhances])) as string[]
        }
      }
    })
  }

  return {
    description: generatedDescription,
    techStack: techStack.slice(0, 8), // Limit to 8 technologies
    complexity,
    impact
  }
}
