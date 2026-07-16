/**
 * Mock AI Service
 * Provides realistic demo responses for all AI features.
 * Used as fallback when OPENAI_API_KEY is not configured.
 */

import type { ATSResult } from './openai-service'

// ─── Resume / ATS Mocks ───────────────────────────────────────────────────────

export function getMockATSResult(resumeText: string): ATSResult {
  const wordCount = resumeText.trim().split(/\s+/).length
  const hasBullets = resumeText.includes('•') || resumeText.includes('-')
  const hasNumbers = /\d+%|\$\d+|\d+ years/i.test(resumeText)

  // Score based on basic heuristics for realism
  let score = 62
  if (wordCount > 200) score += 8
  if (hasBullets) score += 10
  if (hasNumbers) score += 12
  if (resumeText.toLowerCase().includes('experience')) score += 4
  if (resumeText.toLowerCase().includes('skills')) score += 4
  score = Math.min(score, 95)

  return {
    score,
    keywords: [
      '✅ React', '✅ JavaScript', '✅ TypeScript', '✅ Node.js',
      '✅ REST API', '✅ Git', '❌ GraphQL', '❌ Docker', '❌ AWS',
      '❌ CI/CD', '❌ Agile', '❌ Unit Testing'
    ],
    suggestions: [
      'Add quantifiable achievements (e.g., "Increased performance by 40%")',
      'Include keywords: Docker, AWS, CI/CD, GraphQL for better ATS match',
      'Use strong action verbs: Architected, Led, Delivered, Optimized',
      'Add a concise professional summary at the top',
      'List skills section clearly with proficiency levels',
      'Ensure consistent date formatting (MM/YYYY)'
    ],
    strengths: [
      'Strong technical skill set with modern JavaScript ecosystem',
      'Clear project descriptions demonstrating practical experience',
      'Good use of industry-standard technologies (React, Node.js)',
      'Professional email format and contact information included'
    ],
    weaknesses: [
      'Missing cloud/DevOps keywords (AWS, Docker, Kubernetes)',
      'No measurable achievements or impact metrics',
      'Summary section absent — recruiters spend avg 6s on first scan',
      'Skills section could be more prominent and ATS-friendly'
    ],
    optimizedContent: generateOptimizedResume(resumeText)
  }
}

function generateOptimizedResume(original: string): string {
  return `**JOHN DOE**
john.doe@email.com | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe | (555) 123-4567

---

**PROFESSIONAL SUMMARY**
Results-driven Software Engineer with 3+ years of experience building scalable web applications using React, TypeScript, and Node.js. Proven track record of delivering high-performance solutions that improve user experience by 40%+ and reduce system latency. Passionate about clean code, agile development, and continuous improvement.

---

**TECHNICAL SKILLS**
• **Frontend:** React, TypeScript, JavaScript (ES6+), Next.js, HTML5, CSS3, Tailwind CSS
• **Backend:** Node.js, Express, REST APIs, GraphQL
• **Database:** PostgreSQL, MongoDB, Redis
• **DevOps:** Git, Docker, AWS (EC2, S3), CI/CD (GitHub Actions)
• **Tools:** Jest, Webpack, Figma, Jira, VS Code

---

**PROFESSIONAL EXPERIENCE**

**Senior Frontend Developer** | TechCorp Inc. | Jan 2022 – Present
• Architected and delivered React-based dashboard serving 10,000+ daily users, reducing page load time by 45%
• Led migration from JavaScript to TypeScript, improving code reliability and reducing bugs by 30%
• Collaborated with product & design teams in agile sprints, shipping 12 features in Q1 2024
• Implemented automated testing (Jest + RTL), achieving 85% code coverage

**Full Stack Developer** | StartupXYZ | Jun 2020 – Dec 2021
• Built RESTful APIs with Node.js/Express serving 500+ API calls/min with 99.9% uptime
• Developed real-time features using WebSockets, improving user engagement by 25%
• Optimized PostgreSQL queries, reducing average query time from 800ms to 120ms

---

**EDUCATION**
Bachelor of Science in Computer Science | State University | 2020
GPA: 3.7/4.0 | Dean's List 2018, 2019

---

**PROJECTS**
• **E-Commerce Platform** – Full-stack app with React + Node.js, handling $50K+ monthly transactions
• **Task Management SaaS** – Built with Next.js + PostgreSQL, 200+ active users

${original.substring(0, 100)}...`
}

export function getMockJobMatchResult(jobDescription: string) {
  return {
    score: 78,
    matchingSkills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'REST APIs', 'Git'],
    missingSkills: ['Docker', 'AWS', 'GraphQL', 'Redis'],
    recommendations: [
      'Add Docker to your skills — mentioned 3 times in the job description',
      'Get AWS Certified Cloud Practitioner to match cloud requirements',
      'Highlight any experience with GraphQL or REST API design',
      'Emphasize team leadership experience in your bullet points'
    ]
  }
}

export function getMockGeneratedResume(jobTitle: string): string {
  return `# Professional Resume — ${jobTitle}

## JOHN DOE
john.doe@email.com | +1 (555) 123-4567 | San Francisco, CA
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

---

## PROFESSIONAL SUMMARY
Passionate ${jobTitle} with 3+ years of experience building scalable, user-centric applications. Proven ability to deliver results in fast-paced agile environments. Strong communicator who bridges technical and business requirements effectively.

---

## SKILLS
**Languages:** JavaScript, TypeScript, Python, SQL
**Frameworks:** React, Next.js, Node.js, Express
**Tools:** Git, Docker, AWS, PostgreSQL, MongoDB
**Practices:** Agile/Scrum, TDD, CI/CD, Code Review

---

## EXPERIENCE

### Software Engineer | TechCorp Inc. | 2022 – Present
- Delivered 5 major product features adopted by 15,000+ users
- Reduced API response time by 60% through query optimization
- Mentored 2 junior developers and led weekly code reviews

### Junior Developer | WebAgency | 2020 – 2022
- Built 8 client websites using React and Next.js
- Improved Lighthouse performance scores from 55 → 92 average
- Collaborated with designers to implement pixel-perfect UIs

---

## EDUCATION
**B.S. Computer Science** | University of Technology | 2020
GPA: 3.7 | Relevant Coursework: Data Structures, Algorithms, Web Development

---

## PROJECTS
- **Portfolio App** — Personal portfolio built with Next.js + Tailwind, 99 Lighthouse score
- **Chat App** — Real-time messaging with React + Socket.IO, 50+ concurrent users

---

*Generated by Hirezy AI Resume Builder — Demo Mode*`
}

export function getMockCoverLetter(companyName: string, jobTitle: string): string {
  return `Dear Hiring Manager at ${companyName},

I am excited to apply for the ${jobTitle} position at ${companyName}. With over 3 years of hands-on experience building production-grade web applications and a proven track record of delivering measurable results, I am confident I would be a strong addition to your team.

In my current role at TechCorp Inc., I led the development of a high-traffic React dashboard serving 10,000+ daily active users. By implementing performance optimizations and migrating to TypeScript, I reduced page load times by 45% and decreased bug reports by 30%. This experience has sharpened my ability to write maintainable, scalable code while collaborating effectively in cross-functional agile teams.

What excites me most about ${companyName} is your commitment to innovation and technical excellence. I've followed your engineering blog and admire how you approach complex scalability challenges — exactly the kind of environment where I thrive. I'm particularly drawn to the opportunity to work on products that directly impact users at scale.

I'd love to discuss how my skills in React, TypeScript, Node.js, and REST API design align with your team's goals. I am available for an interview at your convenience and can be reached at john.doe@email.com.

Thank you for considering my application.

Sincerely,
John Doe

---
*Generated by Hirezy AI — Demo Mode*`
}

// ─── Interview Coach Mocks ─────────────────────────────────────────────────────

export function getMockInterviewQuestions(jobTitle: string) {
  return {
    technical: [
      {
        question: `Explain how you would optimize a slow ${jobTitle}-related component or module that's causing performance issues in production.`,
        category: 'Performance',
        difficulty: 'hard',
        expectedAnswer: `I would start with profiling tools to identify bottlenecks — Chrome DevTools for frontend, or APM tools like Datadog for backend. Once I identify the hotspot, I'd look at common culprits: unnecessary re-renders, N+1 queries, missing indexes, or large bundle sizes. For example, in React I'd use React.memo, useMemo, and useCallback strategically — but only after measuring. For database issues, I'd add indexes, batch queries, or introduce caching with Redis. I always validate improvements with before/after benchmarks.`
      },
      {
        question: 'Describe the difference between REST and GraphQL. When would you choose one over the other?',
        category: 'API Design',
        difficulty: 'medium',
        expectedAnswer: `REST uses fixed endpoints, each returning a predefined data shape — simple, cacheable, and well-understood. GraphQL uses a single endpoint with a query language, allowing clients to request exactly what they need — great for avoiding over-fetching/under-fetching. I'd choose REST for simple CRUD APIs or when caching is critical. I'd choose GraphQL for complex, nested data requirements or when multiple clients (mobile vs web) need different data shapes.`
      },
      {
        question: 'Walk me through how you would design a scalable authentication system.',
        category: 'System Design',
        difficulty: 'hard',
        expectedAnswer: `I'd use JWT tokens with short expiry (15 min) paired with refresh tokens stored in httpOnly cookies — not localStorage. On login, issue both tokens. The access token is validated stateless on each request. When it expires, a silent refresh using the refresh token issues a new pair. I'd implement token rotation to prevent replay attacks. For scale, I'd use Redis to store refresh tokens with TTL, enabling instant revocation. HTTPS everywhere, rate limiting on auth endpoints, and PKCE for OAuth flows.`
      }
    ],
    behavioral: [
      {
        question: 'Tell me about a time you disagreed with a technical decision made by your team. How did you handle it?',
        category: 'Conflict Resolution',
        difficulty: 'medium',
        expectedAnswer: `STAR Method: Situation — my team chose to build a custom auth system when OAuth would have sufficed. Task — I needed to raise concerns without creating tension. Action — I prepared a concise comparison document showing development time, security risks, and maintenance cost for both approaches, then requested a 30-minute team discussion. I listened to their reasoning and found their concern was third-party vendor lock-in. Result — we agreed on a hybrid: OAuth with a thin abstraction layer. The feature shipped 2 weeks faster and required zero security patches.`
      },
      {
        question: 'Describe a situation where you had to deliver a project under a very tight deadline. What did you do?',
        category: 'Time Management',
        difficulty: 'medium',
        expectedAnswer: `When we had a critical client demo in 3 days and our lead engineer got sick, I took ownership of the release. I immediately triaged features — identifying must-haves vs nice-to-haves. I communicated scope changes to stakeholders upfront to manage expectations. I worked in focused 2-hour sprints, used pair programming with a junior dev to parallelize work, and automated our deployment pipeline to save 45 minutes per release cycle. We delivered the core demo on time — the client was impressed and signed the contract.`
      },
      {
        question: 'Give an example of when you had to learn a new technology quickly to complete a project.',
        category: 'Adaptability',
        difficulty: 'easy',
        expectedAnswer: `My team was migrating to Next.js App Router with a 2-week deadline. I had only used Pages Router before. I dedicated evenings to the official docs and built a small prototype to understand layouts, server components, and streaming. I created a cheat sheet for the team summarizing the key differences. Within 5 days I was productive and helped 2 teammates with their blockers. The migration completed on schedule with zero regressions.`
      }
    ],
    situational: [
      {
        question: `You discover a critical security vulnerability in the codebase the day before a major release. What do you do?`,
        category: 'Problem Solving',
        difficulty: 'hard',
        expectedAnswer: `I would immediately escalate to my team lead and security contact — never hide a security issue. Together we'd assess severity: Is data at risk now? Can it be exploited pre-release? If critical, we delay the release — a security breach is far costlier than a delay. I'd write a hotfix, get it reviewed promptly (security issues warrant expedited review), and document the finding. After the fix, I'd do a brief post-mortem to prevent similar issues — adding a security checklist to our PR template.`
      },
      {
        question: `A junior developer on your team keeps making the same mistakes in code reviews. How do you handle this?`,
        category: 'Mentorship',
        difficulty: 'medium',
        expectedAnswer: `I'd schedule a private 1:1 to understand their perspective — sometimes mistakes stem from unclear requirements or lack of context, not carelessness. I'd show concrete examples and explain the "why" behind best practices, not just the "what." I'd offer pair programming sessions on the areas they struggle with. I'd also suggest relevant resources and check in weekly. If the pattern continues, I'd involve their manager with documented examples, focusing on growth not blame. Most importantly, I'd make them feel safe asking questions.`
      }
    ]
  }
}

export function getMockAnswerAnalysis(userAnswer: string, question: string) {
  const wordCount = userAnswer.trim().split(/\s+/).length
  const hasExample = /for example|instance|specifically|when i|we had|i led|i built/i.test(userAnswer)
  const hasResult = /result|outcome|achieved|improved|reduced|increased|saved|delivered/i.test(userAnswer)
  const hasAction = /i did|i implemented|i decided|i created|i built|i fixed/i.test(userAnswer)

  let score = 50
  if (wordCount > 80) score += 10
  if (wordCount > 150) score += 8
  if (hasExample) score += 12
  if (hasResult) score += 12
  if (hasAction) score += 8
  score = Math.min(score, 97)

  const rating: 'poor' | 'fair' | 'good' | 'excellent' =
    score >= 85 ? 'excellent' : score >= 70 ? 'good' : score >= 55 ? 'fair' : 'poor'

  return {
    score,
    rating,
    strengths: [
      hasExample ? 'Good use of concrete examples to support your points' : 'Answer shows awareness of the topic',
      hasResult ? 'You mentioned measurable outcomes — excellent!' : 'Clear communication of your thought process',
      wordCount > 100 ? 'Thorough and detailed response' : 'Concise and to the point'
    ].slice(0, 3),
    improvements: [
      !hasExample ? 'Add a specific real-world example from your experience' : 'Consider adding more quantifiable metrics',
      !hasResult ? 'Always end with the result/impact — "As a result, X improved by Y%"' : 'Try to be even more specific about your personal contribution',
      !hasAction ? 'Use "I" statements to clarify your specific role and actions taken' : 'Structure with STAR method for more clarity'
    ].slice(0, 3),
    suggestions: [
      'Use the STAR method: Situation → Task → Action → Result',
      'Quantify your impact wherever possible (%, $, time saved)',
      'Keep answers to 90-120 seconds when spoken aloud',
      'Practice saying your answer out loud — pacing matters'
    ],
    betterAnswer: `Here's a stronger version of your answer using the STAR method:\n\n**Situation:** [Describe the context/problem in 1-2 sentences]\n\n**Task:** [Your specific responsibility in this situation]\n\n**Action:** I analyzed the problem and took the following steps: (1) [first action], (2) [second action], (3) [third action]. I chose this approach because [reasoning].\n\n**Result:** As a direct result, [measurable outcome — e.g., "performance improved by 40%", "we shipped 2 weeks early", "customer satisfaction rose from 72% to 91%"].\n\nThis structure keeps your answer focused, demonstrates impact, and is easy for interviewers to follow.\n\n*Your answer showed good awareness — just add specific metrics and the STAR framework to take it to the next level!*`
  }
}

export function getMockCompanyTips(companyName: string, jobTitle: string) {
  return {
    research: [
      `Read ${companyName}'s engineering blog or tech news for recent announcements and product launches`,
      `Review their Glassdoor interview reviews to understand the interview format (rounds, focus areas)`,
      `Study their public GitHub repos or open-source projects to understand their tech stack`,
      `Follow ${companyName} on LinkedIn to know their latest milestones and company culture`
    ],
    preparation: [
      `Practice LeetCode Medium problems — most ${jobTitle} interviews at tech companies start with coding`,
      `Prepare 3 strong "Tell me about a time..." stories using STAR format`,
      `Know your resume cold — be ready to deep-dive into any project or technology you listed`,
      `Prepare 5 thoughtful questions to ask your interviewer about the team, tech stack, and challenges`,
      `Do a mock technical interview with a peer or on Pramp.com`
    ],
    questions: [
      `"Tell me about a challenging technical problem you solved and how you approached it."`,
      `"How do you handle disagreements with teammates on technical decisions?"`,
      `"Describe your experience with ${jobTitle}-specific technologies and recent projects."`,
      `"Where do you see yourself in 2-3 years, and how does this role help you get there?"`,
      `"What's the most complex system you've designed or contributed to?"`
    ],
    avoid: [
      'Avoid speaking negatively about past employers — always frame challenges as learning opportunities',
      `Don't say "I don't know" without adding "but here's how I'd figure it out"`,
      'Avoid generic answers — be specific with real examples from your actual experience',
      'Don\'t undersell your contributions — use "I" not just "we" when describing your work'
    ],
    strategies: [
      `${companyName} values problem-solving approach as much as the answer — think aloud during coding`,
      'Start every behavioral answer with a brief context, then focus 70% of time on your specific actions',
      'Ask clarifying questions before diving into a technical problem — shows seniority',
      'Show genuine curiosity about their engineering challenges — interviewers remember enthusiasm',
      `Mention specific ${companyName} products or features and how your work relates to them`
    ]
  }
}
