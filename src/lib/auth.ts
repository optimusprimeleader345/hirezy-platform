// Authentication utilities and types for Hirezy platform

export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'recruiter' | 'admin'
  avatar?: string
  company?: string
  verified: boolean
  joinedAt: string
  lastLogin?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

// Mock user database
const mockUsers: Record<string, User & { password: string }> = {
  'admin@hirezy.com': {
    id: 'admin_001',
    email: 'admin@hirezy.com',
    name: 'Hirezy Admin',
    role: 'admin',
    verified: true,
    joinedAt: '2024-01-01T00:00:00Z',
    password: 'admin123' // In real app, this would be hashed
  },
  'recruiter@techcorp.com': {
    id: 'rec_001',
    email: 'recruiter@techcorp.com',
    name: 'Sarah Johnson',
    role: 'recruiter',
    company: 'TechCorp Inc.',
    verified: true,
    joinedAt: '2024-02-15T00:00:00Z',
    password: 'recruiter123'
  },
  'student@example.com': {
    id: 'stu_001',
    email: 'student@example.com',
    name: 'Alex Developer',
    role: 'student',
    verified: true,
    joinedAt: '2024-03-10T00:00:00Z',
    password: 'student123'
  }
}

// Auth store (in real app, use Zustand, Redux, or Context)
class AuthStore {
  private listeners: Array<(state: AuthState) => void> = []
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }

  getState(): AuthState {
    return { ...this.state }
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.getState()))
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.state.isLoading = true
    this.state.error = null
    this.notify()

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = Object.values(mockUsers).find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      this.state.user = userWithoutPassword
      this.state.isAuthenticated = true
      this.state.isLoading = false
      this.state.error = null

      // Save to localStorage for persistence
      localStorage.setItem('hirezy_auth', JSON.stringify(userWithoutPassword))
      this.notify()

      return { success: true }
    } else {
      this.state.isLoading = false
      this.state.error = 'Invalid email or password'
      this.notify()

      return { success: false, error: 'Invalid email or password' }
    }
  }

  logout(): void {
    this.state.user = null
    this.state.isAuthenticated = false
    this.state.error = null
    localStorage.removeItem('hirezy_auth')
    this.notify()
  }

  init(): void {
    // Check for saved auth in localStorage
    const savedAuth = localStorage.getItem('hirezy_auth')
    if (savedAuth) {
      try {
        const user = JSON.parse(savedAuth)
        this.state.user = user
        this.state.isAuthenticated = true
      } catch (error) {
        localStorage.removeItem('hirezy_auth')
      }
    }
  }
}

export const authStore = new AuthStore()

// Initialize auth state
authStore.init()

// Helper functions
export function useAuth() {
  const [state, setState] = React.useState(authStore.getState())

  React.useEffect(() => {
    const unsubscribe = authStore.subscribe(setState)
    return unsubscribe
  }, [])

  return {
    ...state,
    login: authStore.login.bind(authStore),
    logout: authStore.logout.bind(authStore)
  }
}

export function getRedirectPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'
    case 'recruiter':
      return '/recruiter/dashboard'
    case 'student':
      return '/student/dashboard'
    default:
      return '/'
  }
}

export function requireAuth(user: User | null, allowedRoles: string[]): boolean {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

// React import for useAuth hook
import React from 'react'
