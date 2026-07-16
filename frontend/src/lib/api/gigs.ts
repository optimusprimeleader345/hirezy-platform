import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// API Base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

// Types
export interface Gig {
  id: string
  title: string
  description: string
  recruiter_id: string
  budget_min: number
  budget_max: number
  skills_required: string[]
  location: string
  remote_allowed: boolean
  experience_level: string
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
  ai_generated_content?: any
  created_at: string
  updated_at: string
  recruiter?: {
    name: string
    company?: string
    avatar?: string
  }
}

// Gigs API Hooks
export function useGigs(filters?: {
  skills?: string[]
  location?: string
  experience_level?: string
  remote_allowed?: boolean
}) {
  return useQuery({
    queryKey: ['gigs', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters) {
        if (filters.skills) params.set('skills', filters.skills.join(','))
        if (filters.location) params.set('location', filters.location)
        if (filters.experience_level) params.set('experience_level', filters.experience_level)
        if (filters.remote_allowed !== undefined) params.set('remote_allowed', filters.remote_allowed.toString())
      }

      const response = await fetch(`${API_BASE}/api/gigs?${params}`)
      if (!response.ok) throw new Error('Failed to fetch gigs')
      return response.json() as Promise<Gig[]>
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useGig(id: string) {
  return useQuery({
    queryKey: ['gig', id],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/gigs/${id}`)
      if (!response.ok) throw new Error('Failed to fetch gig')
      return response.json() as Promise<Gig>
    },
    enabled: !!id,
  })
}

export function useCreateGig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (gigData: Omit<Gig, 'id' | 'created_at' | 'updated_at'>) => {
      const response = await fetch(`${API_BASE}/api/gigs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gigData),
      })
      if (!response.ok) throw new Error('Failed to create gig')
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] })
    },
  })
}

export function useUpdateGig() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Gig> }) => {
      const response = await fetch(`${API_BASE}/api/gigs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to update gig')
      return response.json()
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gig', id] })
      queryClient.invalidateQueries({ queryKey: ['gigs'] })
    },
  })
}
