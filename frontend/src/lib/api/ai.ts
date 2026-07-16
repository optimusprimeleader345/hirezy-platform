import { useQuery, useMutation } from '@tanstack/react-query'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

// Types
export interface AIAssistantQuery {
  query: string
  userRole: 'student' | 'recruiter' | 'admin'
  userId?: string
  context?: {
    currentPage?: string
    recentActions?: string[]
    skills?: string[]
    location?: string
    industryPreferences?: string[]
    platformData?: any
  }
  conversationContext?: {
    previousQueries?: string[]
    preferences?: any
    userHistory?: any
  }
}

export interface AIAssistantResponse {
  response: string
  confidence: number
  intent: 'ask_question' | 'provide_info' | 'take_action' | 'navigate' | 'help_command' | 'clarify'
  actions: Array<{
    type: 'link' | 'action' | 'suggestion' | 'filter' | 'create' | 'update'
    label: string
    data: any
    description?: string
  }>
  suggestions: Array<{
    id: string
    title: string
    description: string
    type: 'task' | 'feature' | 'learning'
    priority: 'high' | 'medium' | 'low'
    action?: {
      type: 'navigate' | 'execute' | 'display' | 'help'
      path?: string
      command?: string
    }
  }>
  metadata: {
    processingTime: string
    modelUsed: string
    userRole: string
    intentConfidence: number
    contextUsed: string[]
  }
  followUp?: {
    question: string
    options?: string[]
  }
}

// AI Assistant Hooks
export function useAIAssistant() {
  return useMutation({
    mutationFn: async (data: AIAssistantQuery) => {
      const response = await fetch(`${API_BASE}/api/ai-assistant/universal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('AI service temporarily unavailable')
      }

      return response.json() as Promise<AIAssistantResponse>
    },
    retry: 1,
    retryDelay: 1000,
  })
}

// Resume Analysis Hooks
export function useResumeAnalysis() {
  return useMutation({
    mutationFn: async (resumeData: FormData) => {
      const response = await fetch(`${API_BASE}/api/resume/analyze`, {
        method: 'POST',
        body: resumeData,
      })

      if (!response.ok) throw new Error('Failed to analyze resume')
      return response.json()
    },
  })
}

// ATS Check Hook
export function useATSCheck() {
  return useMutation({
    mutationFn: async ({ resume, jobDescription }: { resume: string; jobDescription: string }) => {
      const response = await fetch(`${API_BASE}/api/resume/ats-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) throw new Error('Failed to check ATS compatibility')
      return response.json()
    },
  })
}

// Resume Strength Score Hook
export function useResumeStrength() {
  return useMutation({
    mutationFn: async (resume: string) => {
      const response = await fetch(`${API_BASE}/api/resume/strength-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      })

      if (!response.ok) throw new Error('Failed to calculate resume strength')
      return response.json()
    },
  })
}

// Missing Skills Analysis Hook
export function useMissingSkills() {
  return useMutation({
    mutationFn: async ({ currentSkills, targetJob }: { currentSkills: string[]; targetJob: string }) => {
      const response = await fetch(`${API_BASE}/api/resume/missing-skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentSkills, targetJob }),
      })

      if (!response.ok) throw new Error('Failed to analyze missing skills')
      return response.json()
    },
  })
}

// Job Matching Hook
export function useJobMatching() {
  return useMutation({
    mutationFn: async ({ skills, experience, preferences }: {
      skills: string[]
      experience: number
      preferences: any
    }) => {
      const response = await fetch(`${API_BASE}/api/job-match/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, experience, preferences }),
      })

      if (!response.ok) throw new Error('Failed to calculate job matches')
      return response.json()
    },
  })
}

// Market Demand Insights Hook
export function useMarketInsights() {
  return useQuery({
    queryKey: ['market-insights'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/market-demand/insights`)
      if (!response.ok) throw new Error('Failed to fetch market insights')
      return response.json()
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  return useMutation({
    mutationFn: async ({ skills, location }: { skills: string[]; location?: string }) => {
      const response = await fetch(`${API_BASE}/api/market-demand/personalized`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, location }),
      })

      if (!response.ok) throw new Error('Failed to get personalized insights')
      return response.json()
    },
  })
}

// Career Coaching Hooks
export function useCareerCoach() {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch(`${API_BASE}/api/ai/career-coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) throw new Error('Career coach temporarily unavailable')
      return response.json()
    },
  })
}

// Interview Preparation Hook
export function useInterviewPrep() {
  return useMutation({
    mutationFn: async ({ role, experience }: { role: string; experience: string }) => {
      const response = await fetch(`${API_BASE}/api/ai/interview-prep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, experience }),
      })

      if (!response.ok) throw new Error('Interview prep temporarily unavailable')
      return response.json()
    },
  })
}

// Recruiter AI Tools
export function useResumeAnalyzer() {
  return useMutation({
    mutationFn: async (resumeData: FormData) => {
      const response = await fetch(`${API_BASE}/api/recruiter/ai/resume-analyzer`, {
        method: 'POST',
        body: resumeData,
      })

      if (!response.ok) throw new Error('Failed to analyze resume')
      return response.json()
    },
  })
}

export function useCandidateScoring() {
  return useMutation({
    mutationFn: async (candidateData: any) => {
      const response = await fetch(`${API_BASE}/api/recruiter/ai/candidate-scoring`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidateData),
      })

      if (!response.ok) throw new Error('Candidate scoring temporarily unavailable')
      return response.json()
    },
  })
}

export function useContentGenerator() {
  return useMutation({
    mutationFn: async (contentRequest: any) => {
      const response = await fetch(`${API_BASE}/api/recruiter/ai/content-generator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentRequest),
      })

      if (!response.ok) throw new Error('Content generation temporarily unavailable')
      return response.json()
    },
  })
}

export function useInterviewAssistant() {
  return useMutation({
    mutationFn: async (interviewRequest: any) => {
      const response = await fetch(`${API_BASE}/api/recruiter/ai/interview-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interviewRequest),
      })

      if (!response.ok) throw new Error('Interview assistant temporarily unavailable')
      return response.json()
    },
  })
}

// Admin AI Hooks
export function useAdminChat() {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch(`${API_BASE}/api/admin/ai-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) throw new Error('Admin AI temporarily unavailable')
      return response.json()
    },
  })
}

// Utility function to check AI service health
export function useAIHealth() {
  return useQuery({
    queryKey: ['ai-health'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/ai-assistant/health`)
      if (!response.ok) {
        throw new Error('AI health check failed')
      }
      return response.json()
    },
    refetchInterval: 30000, // Check every 30 seconds
  })
}
