import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

interface AIAssistantQuery {
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
}

interface AIAssistantResponse {
  response: string
  confidence: number
  intent: 'ask_question' | 'provide_info' | 'take_action' | 'navigate' | 'help_command' | 'clarify'
  actions: Array<{
    type: 'link' | 'action' | 'suggestion' | 'filter' | 'create' | 'update' | 'navigate'
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

export async function POST(request: NextRequest) {
  const body = await request.json() as AIAssistantQuery
  const { query, userRole, userId, context = {} } = body

  if (!query || !userRole) {
    return NextResponse.json(
      { error: 'Query and userRole are required' },
      { status: 400 }
    )
  }

  try {
    const platformContext = getPlatformContext(userRole, context)

    const aiPrompt = `
You are Hirezy's Universal AI Assistant. Respond helpfully and contextually based on user role and platform.

USER ROLE: ${userRole}
CURRENT QUERY: "${query}"

PLATFORM CONTEXT:
${JSON.stringify(platformContext, null, 2)}

CURRENT PAGE: ${context?.currentPage || 'Dashboard'}
SKILLS: ${context?.skills?.join(', ') || 'Not specified'}

Provide a clear, helpful response with specific suggestions relevant to the ${userRole}'s needs and current platform context.
`

    const aiResponse = await textModel.generateContent(aiPrompt)
    const response = JSON.parse(aiResponse.response.text())

    return NextResponse.json({
      success: true,
      data: {
        response: response.response || `I understand you're asking about "${query}". How can I assist you with your ${userRole} needs?`,
        confidence: response.confidence || 0.85,
        intent: response.intent || 'ask_question',
        actions: response.actions || [],
        suggestions: generateContextualSuggestions(userRole, context),
        metadata: {
          processingTime: 'N/A',
          modelUsed: 'Gemini-1.5-Flash',
          userRole,
          intentConfidence: 0.8,
          contextUsed: ['platform_context', userRole]
        },
        followUp: response.followUp
      },
      _meta: {
        processedBy: 'Universal AI Assistant',
        version: '2.0',
        userRole,
        responseGenerated: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Universal AI assistant error:', error)

    // Role-based fallback
    const fallbackResponse = getRoleFallback(userRole, query)
    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        reason: 'AI service temporarily unavailable',
        userRole
      }
    })
  }
}

function getPlatformContext(userRole: string, context: any): any {
  const baseContext = {
    currentTime: new Date().toLocaleTimeString(),
    platformHealth: 'Good',
    activeUsers: 150
  }

  switch (userRole) {
    case 'student':
      return {
        ...baseContext,
        availableGigs: 45,
        trendingSkills: ['React', 'TypeScript', 'AI/ML'],
        averageSalary: '$78,000',
        marketDemand: 'Strong'
      }
    case 'recruiter':
      return {
        ...baseContext,
        candidatePoolSize: 1250,
        hiringVelocity: 'High',
        aiToolsAvailable: 8,
        successRate: '87%'
      }
    case 'admin':
      return {
        ...baseContext,
        systemUptime: '99.9%',
        activeFeatures: 25,
        pendingTasks: 5,
        aiSystems: 'Operational'
      }
    default:
      return baseContext
  }
}

function generateContextualSuggestions(userRole: string, context: any): AIAssistantResponse['suggestions'] {
  switch (userRole) {
    case 'student':
      return [
        {
          id: 'profile-optimization',
          title: 'Optimize Your Profile',
          description: 'Complete skills and experience for better matches',
          type: 'task',
          priority: 'high',
          action: { type: 'navigate', path: '/account/settings' }
        },
        {
          id: 'skill-assessment',
          title: 'Take Skill Assessment',
          description: 'Get AI-powered career recommendations',
          type: 'task',
          priority: 'medium',
          action: { type: 'navigate', path: '/student/resume-ai' }
        }
      ]
    case 'recruiter':
      return [
        {
          id: 'ai-recruiter-tools',
          title: 'AI Recruiting Tools',
          description: 'Use advanced AI to streamline hiring',
          type: 'feature',
          priority: 'high',
          action: { type: 'navigate', path: '/recruiter/ai/tools' }
        },
        {
          id: 'candidate-analyzer',
          title: 'Analyze Candidates',
          description: 'Get insights on candidate compatibility',
          type: 'feature',
          priority: 'medium',
          action: { type: 'navigate', path: '/recruiter/ai/tools' }
        }
      ]
    case 'admin':
      return [
        {
          id: 'system-health',
          title: 'Check System Health',
          description: 'Monitor platform performance',
          type: 'task',
          priority: 'high',
          action: { type: 'navigate', path: '/admin/health' }
        },
        {
          id: 'user-analytics',
          title: 'User Analytics',
          description: 'Understand platform usage patterns',
          type: 'feature',
          priority: 'medium',
          action: { type: 'navigate', path: '/admin/user-analytics' }
        }
      ]
    default:
      return []
  }
}

function getRoleFallback(userRole: string, query: string): AIAssistantResponse {
  const baseResponse = {
    response: `I'm here to help with your ${userRole} needs! I understand you're asking about "${query}". Let me provide some relevant guidance.`,
    confidence: 0.7,
    intent: 'help_command' as const,
    actions: [{
      type: 'help' as const,
      label: 'Get Help',
      data: { topic: 'general' },
      description: 'Access general help resources'
    }],
    suggestions: generateContextualSuggestions(userRole, {}),
    metadata: {
      processingTime: 'N/A',
      modelUsed: 'Fallback',
      userRole,
      intentConfidence: 0.7,
      contextUsed: ['role_specific']
    }
  }

  switch (userRole) {
    case 'student':
      baseResponse.response = `I can help you with job searching, skill development, resume optimization, and career planning. For example: "How can I improve my react skills?" or "Find me junior developer jobs."`
      break
    case 'recruiter':
      baseResponse.response = `I can assist with candidate sourcing, job posting creation, interview planning, and hiring analytics. Try: "Help me create a job post" or "Analyze my candidate pool."`
      break
    case 'admin':
      baseResponse.response = `I can help with system monitoring, user management, platform analytics, and AI feature oversight. Ask about platform health, user trends, or AI performance.`
      break
  }

  return baseResponse
}

export async function GET() {
  return NextResponse.json({
    message: 'Universal AI Assistant API',
    version: '2.0',
    description: 'Context-aware AI assistant for all platform users',
    supportedRoles: ['student', 'recruiter', 'admin'],
    features: [
      'Role-based intelligent responses',
      'Context-aware suggestions',
      'Platform-wide assistance',
      'Quick actions and navigation',
      'Help and guidance',
      'Conversational interface'
    ]
  })
}
