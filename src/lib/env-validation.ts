import { z } from 'zod'

// Environment variable validation for production readiness
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // AI Services (optional for demo)
  OPENAI_API_KEY: z.string().optional(),

  // Application
  NEXT_PUBLIC_API_URL: z.string().optional().default('http://localhost:3000'),
  NEXT_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),

  // Security
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),
})

type EnvSchema = z.infer<typeof envSchema>

// Validate environment on startup
function validateEnvironment(): EnvSchema {
  try {
    const validatedEnv = envSchema.parse({
      DATABASE_URL: process.env.DATABASE_URL,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_ENV: process.env.NODE_ENV,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    })

    // Log validation success
    if (typeof window === 'undefined') {
      console.log('✅ Environment variables validated successfully')
    }

    return validatedEnv
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:')
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })

      // In production, throw error. In development, warn but continue
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Invalid environment variables. Check logs for details.')
      } else {
        console.warn('⚠️ Running with invalid environment variables - not recommended for production')
      }
    }
    throw error
  }
}

// Export validated environment
export const env = validateEnvironment()

// Helper functions for environment checks
export const isProduction = () => env.NEXT_ENV === 'production'
export const isDevelopment = () => env.NEXT_ENV === 'development'
export const hasOpenAI = () => !!env.OPENAI_API_KEY

// Safe getters for optional values
export const getApiUrl = () => env.NEXT_PUBLIC_API_URL
export const getOpenAIKey = () => env.OPENAI_API_KEY
