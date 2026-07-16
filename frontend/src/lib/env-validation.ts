// Environment variable validation and access for production and development readiness
export interface EnvSchema {
  DATABASE_URL?: string
  OPENAI_API_KEY?: string
  NEXT_PUBLIC_API_URL: string
  NEXT_ENV: string
  NEXTAUTH_SECRET?: string
  NEXTAUTH_URL?: string
}

function getEnvironment(): EnvSchema {
  const envConfig: EnvSchema = {
    DATABASE_URL: process.env.DATABASE_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_ENV: process.env.NODE_ENV || 'development',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }

  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
    if (!envConfig.DATABASE_URL) {
      console.warn('⚠️ DATABASE_URL not set in environment (using offline/demo fallback mode)')
    }
  }

  return envConfig
}

export const env = getEnvironment()
