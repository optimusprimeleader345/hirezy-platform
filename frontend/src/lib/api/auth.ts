import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

// Types
export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'recruiter' | 'admin'
  avatar?: string
  skills?: string[]
  location?: string
  bio?: string
  experience_years?: number
  profile_completed?: boolean
  email_verified?: boolean
  created_at?: string
}

export interface AuthResponse {
  user: User
  token?: string
  message?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: 'student' | 'recruiter' | 'admin'
}

// Auth Hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: 'include' // Include cookies
      })

      if (response.status === 401) {
        return null
      }

      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json() as Promise<User | null>
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      return response.json() as Promise<AuthResponse>
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user)
      // Redirect based on role
      if (data.user.role === 'student') {
        router.push('/student/dashboard')
      } else if (data.user.role === 'recruiter') {
        router.push('/recruiter/dashboard')
      } else {
        router.push('/admin/dashboard')
      }
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      return response.json() as Promise<AuthResponse>
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['currentUser'], data.user)
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        // Continue with local logout even if API fails
        console.warn('Logout API call failed')
      }
    },
    onSuccess: () => {
      queryClient.clear() // Clear all cached data
      router.push('/') // Redirect to home page
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      if (!response.ok) throw new Error('Failed to update profile')
      return response.json() as Promise<User>
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}

// Utility hooks
export function useIsAuthenticated() {
  const { data: user } = useCurrentUser()
  return !!user
}

export function useUserRole() {
  const { data: user } = useCurrentUser()
  return user?.role || 'student'
}

// Auth context helpers
export const authRedirectMap = {
  student: '/student/dashboard',
  recruiter: '/recruiter/dashboard',
  admin: '/admin/dashboard'
}

// Helper function to get auth token from cookies
export function getAuthToken(): string | undefined {
  // This would work with proper cookie parsing
  if (typeof window !== 'undefined') {
    return document.cookie
      .split(';')
      .find(c => c.trim().startsWith('auth-token='))
      ?.split('=')[1]
  }
}
