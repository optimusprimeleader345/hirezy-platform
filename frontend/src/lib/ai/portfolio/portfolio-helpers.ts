export interface Project {
  id: string | number
  name: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  readmeText?: string
  complexity?: string
  impact?: string
}

export interface PortfolioAssessment {
  score: number
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Job-Ready'
  strengths: string[]
  weaknesses: string[]
  missingSkillAreas: string[]
  actionItems: string[]
}

export interface ProjectSuggestion {
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  reason: string
  techStack: string[]
  features: string[]
}

/**
 * Assesses portfolio strength out of 100 based on project variety, tech diversity, and completeness.
 */
export function assessPortfolioStrength(projects: Project[]): PortfolioAssessment {
  let score = 30 // Base score
  const strengths: string[] = []
  const weaknesses: string[] = []
  const allTech = new Set<string>()

  if (projects.length === 0) {
    return {
      score: 0,
      level: 'Beginner',
      strengths: [],
      weaknesses: ['No projects added yet'],
      missingSkillAreas: ['Frontend', 'Backend', 'Database', 'Cloud & DevOps'],
      actionItems: ['Add at least 3 distinct projects to start building your portfolio score']
    }
  }

  // Count projects
  if (projects.length >= 4) {
    score += 25
    strengths.push('Great project volume (4+ projects)')
  } else if (projects.length >= 2) {
    score += 15
    strengths.push('Solid foundation (2-3 projects)')
  } else {
    score += 5
    weaknesses.push('Only 1 project added — aim for at least 3 to showcase versatility')
  }

  // Collect all tech across projects
  projects.forEach(p => {
    p.techStack.forEach(t => allTech.add(t.toLowerCase()))
  })

  // Check tech stack diversity
  const hasFrontend = ['react', 'next.js', 'vue', 'angular', 'html', 'css', 'tailwind', 'javascript', 'typescript'].some(t => allTech.has(t))
  const hasBackend = ['node.js', 'express', 'python', 'django', 'flask', 'java', 'spring', 'go', 'c#', '.net'].some(t => allTech.has(t))
  const hasDatabase = ['mongodb', 'postgresql', 'mysql', 'sqlite', 'redis', 'firebase', 'supabase', 'dynamodb', 'sql'].some(t => allTech.has(t))
  const hasDevOps = ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'github actions', 'nginx'].some(t => allTech.has(t))
  const hasTesting = ['jest', 'cypress', 'playwright', 'pytest', 'mocha', 'selenium'].some(t => allTech.has(t))

  if (hasFrontend && hasBackend) {
    score += 20
    strengths.push('Full-Stack capabilities demonstrated')
  } else if (hasFrontend) {
    score += 10
    weaknesses.push('Frontend-only portfolio — consider adding a backend API project')
  } else if (hasBackend) {
    score += 10
    weaknesses.push('Backend-only portfolio — consider adding a responsive UI project')
  }

  if (hasDatabase) {
    score += 10
    strengths.push('Database persistence integrated')
  } else {
    weaknesses.push('No database/storage technology detected across projects')
  }

  if (hasDevOps) {
    score += 10
    strengths.push('Cloud & DevOps tools included (Docker/AWS/CI-CD)')
  } else {
    weaknesses.push('Missing containerization/cloud deployment tools (e.g. Docker or AWS)')
  }

  if (hasTesting) {
    score += 5
    strengths.push('Testing framework awareness demonstrated')
  }

  // Check completeness (links, detailed descriptions)
  let linksCount = 0
  let detailedDescCount = 0
  projects.forEach(p => {
    if (p.githubUrl || p.liveUrl) linksCount++
    if (p.description && p.description.length > 80) detailedDescCount++
  })

  if (linksCount === projects.length && projects.length > 0) {
    score += 10
    strengths.push('All projects include repository or live demo URLs')
  } else if (linksCount < projects.length) {
    weaknesses.push(`${projects.length - linksCount} project(s) missing live links or GitHub repository URLs`)
  }

  if (detailedDescCount === projects.length && projects.length > 0) {
    score += 10
    strengths.push('Detailed, informative descriptions for every project')
  } else {
    weaknesses.push('Some projects have very brief descriptions — expand with problem & impact')
  }

  score = Math.min(100, Math.max(10, score))

  const missingSkillAreas: string[] = []
  if (!hasFrontend) missingSkillAreas.push('Frontend Web Development')
  if (!hasBackend) missingSkillAreas.push('Backend / REST API Design')
  if (!hasDatabase) missingSkillAreas.push('Relational / NoSQL Databases')
  if (!hasDevOps) missingSkillAreas.push('Cloud, Docker & CI/CD Pipelines')
  if (!hasTesting) missingSkillAreas.push('Unit & End-to-End Testing')

  const actionItems: string[] = []
  if (missingSkillAreas.length > 0) {
    actionItems.push(`Build or add a project utilizing: ${missingSkillAreas.slice(0, 2).join(' & ')}`)
  }
  if (linksCount < projects.length) {
    actionItems.push('Add GitHub links and live deployment URLs to boost credibility')
  }
  actionItems.push('Use the README Improver tool below to create professional documentation for your top project')

  const level = score >= 85 ? 'Job-Ready' : score >= 70 ? 'Advanced' : score >= 50 ? 'Intermediate' : 'Beginner'

  return { score, level, strengths, weaknesses, missingSkillAreas, actionItems }
}

/**
 * Suggests tailored project ideas based on existing tech stack & gaps.
 */
export function suggestNextProjects(projects: Project[]): ProjectSuggestion[] {
  const allTech = new Set<string>()
  projects.forEach(p => p.techStack.forEach(t => allTech.add(t.toLowerCase())))

  const hasBackend = ['node.js', 'express', 'python', 'django', 'java', 'go'].some(t => allTech.has(t))
  const hasCloud = ['docker', 'aws', 'kubernetes', 'gcp'].some(t => allTech.has(t))
  const hasRealtime = ['socket.io', 'websockets', 'webrtc'].some(t => allTech.has(t))
  const hasAI = ['openai', 'langchain', 'tensorflow', 'gemini', 'ai'].some(t => allTech.has(t))

  const suggestions: ProjectSuggestion[] = []

  if (!hasBackend) {
    suggestions.push({
      title: 'RESTful E-Commerce Microservice API',
      category: 'Backend & Database',
      difficulty: 'Intermediate',
      reason: 'Fills critical backend & database experience gap in your portfolio.',
      techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT Authentication', 'Swagger Docs'],
      features: [
        'Secure user registration and role-based access control (Admin vs Customer)',
        'Order processing pipeline with transactional database integrity',
        'Automated API integration testing and Swagger documentation endpoint'
      ]
    })
  }

  if (!hasCloud) {
    suggestions.push({
      title: 'Containerized CI/CD Deployment Pipeline & Monitoring',
      category: 'DevOps & Cloud Architecture',
      difficulty: 'Advanced',
      reason: 'Employers actively look for developers who can deploy and containerize applications.',
      techStack: ['Docker', 'GitHub Actions', 'AWS EC2 / ECS', 'Nginx', 'Prometheus / Grafana'],
      features: [
        'Multi-stage Dockerfile setup for optimized production container builds',
        'Automated testing and deployment workflows triggered by GitHub pull requests',
        'Reverse proxy setup with SSL/HTTPS and basic container health monitoring'
      ]
    })
  }

  if (!hasAI) {
    suggestions.push({
      title: 'AI-Powered Document Assistant & Summarizer',
      category: 'AI & Modern Full-Stack',
      difficulty: 'Intermediate',
      reason: 'AI integration is one of the highest-demand skills across engineering teams today.',
      techStack: ['React / Next.js', 'TypeScript', 'OpenAI / Gemini API', 'TailwindCSS', 'Pinecone Vector DB'],
      features: [
        'PDF document parsing and semantic chunking with vector embeddings',
        'Interactive chat interface with streaming AI responses and citations',
        'Custom prompt templates and exportable summary reports'
      ]
    })
  }

  if (!hasRealtime) {
    suggestions.push({
      title: 'Real-Time Collaborative Code Editor & Canvas',
      category: 'Real-Time Systems',
      difficulty: 'Advanced',
      reason: 'Demonstrates handling complex low-latency state synchronization across concurrent users.',
      techStack: ['React', 'TypeScript', 'WebSockets / Socket.IO', 'Node.js', 'Redis'],
      features: [
        'Multi-cursor live synchronization and instant room broadcasting',
        'Syntax highlighting with support for multiple programming languages',
        'Session recording and instant room sharing via unique URL tokens'
      ]
    })
  }

  // Ensure always at least 3 solid recommendations
  if (suggestions.length < 3) {
    suggestions.push({
      title: 'High-Performance Analytics Dashboard',
      category: 'Frontend & Data Visualization',
      difficulty: 'Intermediate',
      reason: 'Showcases your ability to handle large data sets and interactive UI charts.',
      techStack: ['Next.js', 'Recharts / D3.js', 'TailwindCSS', 'React Query', 'PostgreSQL'],
      features: [
        'Interactive filtering by date ranges, metrics, and customer segments',
        'Optimized client-side data caching and virtualization for 10k+ rows',
        'Exportable CSV and PDF reporting generation'
      ]
    })
  }

  return suggestions.slice(0, 3)
}

/**
 * Generates a professional GitHub README template for any project.
 */
export function enhanceREADME(project: Project): string {
  const { name = 'My Project', description = '', techStack = [] } = project
  const badgeTech = techStack.length > 0 ? techStack : ['React', 'TypeScript', 'Node.js']

  return `# ${name}

![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge) ![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge) ![Version](https://img.shields.io/badge/version-1.0.0-purple?style=for-the-badge)

## 📌 Overview
${description || `A robust and responsive application built to solve real-world problems. Designed with clean architecture, high performance, and exceptional user experience in mind.`}

---

## 🛠️ Built With
${badgeTech.map(t => `- **${t}**`).join('\n')}

---

## ✨ Key Features
- ⚡ **Responsive & Modern UI:** Optimized across mobile, tablet, and desktop viewports.
- 🔒 **Robust Security & Authentication:** Clean data flow and validated inputs.
- 📈 **Performance Tuned:** Fast load times and efficient state management.
- 🧪 **Maintainable Codebase:** Modular component structure following industry best practices.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm/yarn installed on your machine:
\`\`\`bash
node -v  # v18.0.0 or higher required
\`\`\`

### Installation & Setup
1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/username/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.git
   cd ${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   Create a \`.env.local\` file in the root directory and add required API keys:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architecture & Highlights
This project demonstrates modular folder organization, clean separation of concerns between presentation and business logic, and scalable state handling.

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
`
}

/**
 * Generates a standalone, beautifully styled HTML portfolio page of the projects.
 */
export function generatePortfolioHTML(projects: Project[], studentName = 'Developer Portfolio', bio = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${studentName} | Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f19;
      --card-bg: rgba(255, 255, 255, 0.05);
      --border: rgba(255, 255, 255, 0.1);
      --purple: #9333ea;
      --blue: #3b82f6;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Outfit', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 3rem 1.5rem;
    }
    .container { max-width: 1100px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 4rem; }
    h1 { font-size: 3rem; font-weight: 700; background: linear-gradient(135deg, #c084fc, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem; }
    .bio { color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 1.15rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.75rem; }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 1.75rem;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover { transform: translateY(-4px); border-color: rgba(147, 51, 234, 0.5); box-shadow: 0 10px 30px -10px rgba(147, 51, 234, 0.3); }
    .project-name { font-size: 1.4rem; font-weight: 600; margin-bottom: 0.75rem; color: #fff; }
    .project-desc { color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; flex-grow: 1; }
    .tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
    .badge {
      background: rgba(147, 51, 234, 0.18);
      color: #d8b4fe;
      border: 1px solid rgba(147, 51, 234, 0.3);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    .links { display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.25rem; }
    .btn {
      color: #60a5fa;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 600;
      transition: color 0.2s;
    }
    .btn:hover { color: #93c5fd; text-decoration: underline; }
    footer { text-align: center; margin-top: 5rem; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid var(--border); padding-top: 2rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${studentName}</h1>
      <p class="bio">${bio || 'Passionate software engineer focused on crafting high-quality, scalable web applications and intuitive user experiences.'}</p>
    </header>

    <main class="grid">
      ${projects.map(p => `
      <article class="card">
        <div>
          <h2 class="project-name">${p.name}</h2>
          <p class="project-desc">${p.description || 'Modern full-stack application demonstrating best practices and clean code architecture.'}</p>
          <div class="tech-stack">
            ${(p.techStack && p.techStack.length > 0 ? p.techStack : ['React', 'Node.js', 'TypeScript']).map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
        </div>
        <div class="links">
          ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="btn">⭐ GitHub Repository</a>` : `<span style="color: #64748b; font-size: 0.85rem;">🔒 Private Repo</span>`}
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" class="btn" style="color: #34d399;">🌐 Live Demo</a>` : ''}
        </div>
      </article>
      `).join('')}
    </main>

    <footer>
      <p>Built with Hirezy AI Portfolio Builder &copy; ${new Date().getFullYear()}</p>
    </footer>
  </div>
</body>
</html>`
}

/**
 * Generates a comprehensive PORTFOLIO.md for GitHub profile pages.
 */
export function generatePortfolioMarkdown(projects: Project[], studentName = 'Software Engineer Portfolio'): string {
  return `# 🚀 ${studentName}

Welcome to my project portfolio! Here is a curated collection of my software engineering projects, showcasing full-stack development, architectural design, and problem-solving skills.

---

## 📂 Featured Projects

${projects.map((p, i) => `### ${i + 1}. ${p.name}
${p.description || 'Full-stack application built with modern web technologies.'}

**🛠️ Tech Stack:** ${p.techStack && p.techStack.length > 0 ? p.techStack.map(t => `\`${t}\``).join(' ') : '`React` `Node.js`'}  
${p.githubUrl ? `**🔗 Repository:** [View on GitHub](${p.githubUrl})  ` : ''}
${p.liveUrl ? `**🌐 Live Demo:** [Visit Application](${p.liveUrl})  ` : ''}
${p.impact ? `**💡 Key Impact:** ${p.impact}  ` : ''}

---`).join('\n\n')}

*Generated via Hirezy AI Portfolio Builder*
`
}
