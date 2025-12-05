// Mock interview questions for AI Interview Coach
// Grouped by category and difficulty level

interface InterviewQuestion {
  id: string
  category: 'behavioral' | 'technical' | 'system-design' | 'domain-specific'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  question: string
  suggestions?: string[]
  estimatedTime: number // minutes
  tags: string[]
}

export const mockInterviewQuestions: InterviewQuestion[] = [
  // Behavioral Questions
  {
    id: 'beh-1',
    category: 'behavioral',
    difficulty: 'beginner',
    question: 'Tell me about yourself and your background.',
    suggestions: ['Keep it 1-2 minutes', 'Highlight key experiences', 'Mention career goals'],
    estimatedTime: 2,
    tags: ['introduction', 'background']
  },
  {
    id: 'beh-2',
    category: 'behavioral',
    difficulty: 'intermediate',
    question: 'Describe a challenging project you worked on. What was your role?',
    suggestions: ['Use STAR method', 'Focus on challenges and solutions', 'Quantify impact'],
    estimatedTime: 4,
    tags: ['projects', 'challenges', 'impact']
  },
  {
    id: 'beh-3',
    category: 'behavioral',
    difficulty: 'intermediate',
    question: 'Tell me about a time you received critical feedback. How did you handle it?',
    suggestions: ['Show growth mindset', 'Be specific about the feedback', 'Explain positive outcome'],
    estimatedTime: 3,
    tags: ['feedback', 'growth', 'communication']
  },

  // Technical Frontend Questions
  {
    id: 'tech-fe-1',
    category: 'technical',
    difficulty: 'beginner',
    question: 'What is the difference between let, const, and var in JavaScript?',
    suggestions: ['Explain scope and hoisting', 'Provide practical examples', 'Mention modern best practices'],
    estimatedTime: 3,
    tags: ['javascript', 'variables', 'es6']
  },
  {
    id: 'tech-fe-2',
    category: 'technical',
    difficulty: 'intermediate',
    question: 'How does React handle state management in a large application?',
    suggestions: ['Explain local vs global state', 'Mention context API vs Redux/Zustand', 'Discuss performance considerations'],
    estimatedTime: 4,
    tags: ['react', 'state-management', 'architecture']
  },

  // Technical Backend Questions
  {
    id: 'tech-be-1',
    category: 'technical',
    difficulty: 'intermediate',
    question: 'Explain how authentication works in a web application.',
    suggestions: ['Cover JWT vs session-based auth', 'Mention security considerations', 'Discuss refresh tokens'],
    estimatedTime: 4,
    tags: ['authentication', 'security', 'jwt']
  },

  // System Design Questions
  {
    id: 'sys-1',
    category: 'system-design',
    difficulty: 'intermediate',
    question: 'Design a URL shortening service like bit.ly.',
    suggestions: ['Cover database design, hash generation', 'Discuss scalability and availability', 'Mention caching strategies'],
    estimatedTime: 8,
    tags: ['system-design', 'scalability', 'database']
  },

  // Domain-Specific Questions
  {
    id: 'domain-1',
    category: 'domain-specific',
    difficulty: 'intermediate',
    question: 'What is the bias-variance tradeoff in machine learning?',
    suggestions: ['Explain underfitting vs overfitting', 'Give practical examples', 'Discuss remediation strategies'],
    estimatedTime: 4,
    tags: ['machine-learning', 'model-evaluation', 'bias-variance']
  }
]

export function getQuestionsByFilters({
  role = 'general',
  level = 'intermediate',
  category = 'technical'
}: {
  role?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
  category?: string
}) {
  return mockInterviewQuestions.filter(q =>
    q.difficulty === level &&
    (category === 'all' || q.category === category)
  )
}

export function getQuestionById(id: string): InterviewQuestion | undefined {
  return mockInterviewQuestions.find(q => q.id === id)
}

export function getRandomQuestions(
  role: string,
  level: 'beginner' | 'intermediate' | 'advanced',
  category: string,
  count: number = 3
): InterviewQuestion[] {
  const filtered = getQuestionsByFilters({ role, level, category })
  return filtered.sort(() => Math.random() - 0.5).slice(0, count)
}
