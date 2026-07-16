import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'
import { gigListings, users } from '@/lib/demoData'

interface AIChatRequest {
  message: string
  persona: 'general' | 'matching' | 'analytics' | 'market'
  context?: {
    recentActivities?: any[]
    userMetrics?: any
    platformData?: any
    conversationHistory?: Array<{
      role: 'user' | 'assistant'
      content: string
      timestamp: string
    }>
  }
}

interface AIChatResponse {
  response: string
  confidence: number
  suggestedActions?: Array<{
    action: string
    reasoning: string
    priority: 'High' | 'Medium' | 'Low'
  }>
  data?: any
  metadata: {
    persona: string
    processingTime: string
    responseType: 'text' | 'analysis' | 'recommendation' | 'data'
    confidence: number
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { message, persona = 'general', context } = body

  if (!message || typeof message !== 'string') {
    return NextResponse.json(
      { error: 'Message is required' },
      { status: 400 }
    )
  }

  try {
    // Get relevant platform data based on persona
    const platformContext = getPlatformContext(persona, context)

    // Generate intelligent response based on persona and context
    const aiPrompt = generatePersonaPrompt(persona, message, platformContext)

    const aiResponse = await textModel.generateContent(aiPrompt)
    const rawResponse = JSON.parse(aiResponse.response.text())

    // Process and enhance the response
    const processedResponse: AIChatResponse = {
      response: rawResponse.response || rawResponse.mainResponse || 'I apologize, I couldn\'t process that request properly.',
      confidence: rawResponse.confidence || 0.85,
      suggestedActions: rawResponse.suggestedActions || [],
      data: rawResponse.data,
      metadata: {
        persona,
        processingTime: `${Date.now()}ms`,
        responseType: rawResponse.responseType || 'text',
        confidence: rawResponse.confidence || 0.85
      }
    }

    // Check if response contains specific data patterns and populate accordingly
    processedResponse.suggestedActions = await generateSuggestedActions(persona, message, processedResponse.response)

    return NextResponse.json({
      success: true,
      data: processedResponse,
      _meta: {
        requestProcessedAt: new Date().toISOString(),
        modelUsed: 'Gemini-1.5-Flash',
        personaEngaged: persona,
        responseConfidence: processedResponse.confidence
      }
    })

  } catch (error) {
    console.error('Admin AI chat API error:', error)

    // Generate fallback response based on persona
    const fallbackResponse = generateFallbackResponse(persona, message)

    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        fallbackReason: 'AI service temporarily unavailable',
        personaEngaged: persona
      }
    })
  }
}

function getPlatformContext(persona: string, context?: any) {
  // Provide relevant platform data based on persona
  switch (persona) {
    case 'matching':
      return {
        totalGigs: gigListings.length,
        activeUsers: users.length,
        recentApplications: 247,
        topSkillsInDemand: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
        matchingEfficiency: '78%'
      }

    case 'analytics':
      return {
        platformMetrics: {
          dailyActiveUsers: 1250,
          totalApplications: 15420,
          successfulMatches: 892,
          averageResponseTime: 4.2
        },
        userRetention: '84%',
        conversionRate: '12.5%'
      }

    case 'market':
      return {
        skillTrends: [
          { skill: 'AI/ML', growth: '+45%', demand: 'High' },
          { skill: 'Cloud Computing', growth: '+32%', demand: 'Very High' },
          { skill: 'Cybersecurity', growth: '+28%', demand: 'High' }
        ],
        marketInsights: {
          topLocations: ['San Francisco', 'New York', 'London', 'Berlin'],
          salaryIncrease: '+15% YoY',
          remoteWorkAcceptance: '72%'
        }
      }

    default: // general
      return {
        platformHealth: 'Excellent',
        activeUsers: users.length,
        recentGrowth: '+23%',
        supportTickets: 12,
        uptime: '99.9%'
      }
  }
}

function generatePersonaPrompt(persona: string, message: string, context: any): string {
  const baseContext = `
You are Hirezy's AI Assistant, helping with platform management and optimization.

PLATFORM CONTEXT:
${JSON.stringify(context, null, 2)}

USER MESSAGE: ${message}

Please provide a helpful, intelligent response in JSON format:
`

  switch (persona) {
    case 'matching':
      return `${baseContext}
{
  "response": "Detailed response about gig matching, candidate pairing, or platform matching algorithms",
  "responseType": "analysis",
  "suggestedActions": [
    {
      "action": "Specific actionable recommendation",
      "reasoning": "Why this action is recommended",
      "priority": "High"
    }
  ],
  "data": {
    "matchingMetrics": {},
    "improvementSuggestions": []
  },
  "confidence": 0.9
}

Focus on improving matching algorithms, user satisfaction, and platform efficiency.`

    case 'analytics':
      return `${baseContext}
{
  "response": "Data-driven analysis of platform metrics, user behavior, or performance indicators",
  "responseType": "analysis",
  "suggestedActions": [
    {
      "action": "Data-backed recommendation",
      "reasoning": "Based on analytical insights",
      "priority": "High"
    }
  ],
  "data": {
    "metrics": {},
    "trends": [],
    "predictions": []
  },
  "confidence": 0.88
}

Focus on actionable insights from data analysis and performance optimization.`

    case 'market':
      return `${baseContext}
{
  "response": "Market intelligence about skills demand, industry trends, and competitive landscape",
  "responseType": "analysis",
  "suggestedActions": [
    {
      "action": "Strategic market positioning move",
      "reasoning": "Based on market analysis",
      "priority": "Medium"
    }
  ],
  "data": {
    "currentTrends": [],
    "futurePredictions": [],
    "marketOpportunities": []
  },
  "confidence": 0.85
}

Focus on market opportunities, competitive advantages, and strategic positioning.`

    default: // general
      return `${baseContext}
{
  "response": "Helpful response to general platform management or operational questions",
  "responseType": "text",
  "suggestedActions": [],
  "data": {},
  "confidence": 0.9
}

Provide comprehensive assistance on any aspect of platform management, operations, or strategy.`
  }
}

async function generateSuggestedActions(persona: string, message: string, response: string): Promise<Array<{action: string, reasoning: string, priority: 'High' | 'Medium' | 'Low'}>> {
  try {
    // Analyze if we should add specific suggested actions
    const actionPrompt = `
Based on this user query and AI response, suggest 1-3 specific actionable items:

USER QUERY: ${message}
AI RESPONSE: ${response.substring(0, 200)}

Return JSON array of suggested actions, or empty array if none needed:
[
  {
    "action": "Specific actionable task",
    "reasoning": "Why this action helps",
    "priority": "High|Medium|Low"
  }
]
`

    const actionResponse = await textModel.generateContent(actionPrompt)
    return JSON.parse(actionResponse.response.text())
  } catch (error) {
    // Return default actions based on persona
    const defaultActions = {
      matching: [
        {
          action: 'Review matching algorithm parameters',
          reasoning: 'Optimize gig-to-candidate matching for better results',
          priority: 'Medium' as const
        }
      ],
      analytics: [
        {
          action: 'Export user engagement metrics',
          reasoning: 'Analyze platform usage patterns for optimization',
          priority: 'High' as const
        }
      ],
      market: [
        {
          action: 'Update trending skills database',
          reasoning: 'Keep market intelligence current',
          priority: 'Medium' as const
        }
      ]
    }

    return defaultActions[persona as keyof typeof defaultActions] || []
  }
}

function generateFallbackResponse(persona: string, message: string): AIChatResponse {
  const fallbackResponses = {
    general: {
      response: `I understand you're asking about: "${message}". While my full AI capabilities are temporarily unavailable, I can help you with basic platform management tasks. Please check your dashboard for current metrics and manually review any pending actions.`,
      confidence: 0.6,
      metadata: {
        persona: 'general',
        processingTime: 'N/A',
        responseType: 'text' as const,
        confidence: 0.6
      }
    },
    matching: {
      response: `About matching algorithms: Currently we have ${gigListings.length} active gigs and ${users.length} registered users. Please check the matching dashboard for detailed analytics. I recommend reviewing the current matching parameters manually.`,
      confidence: 0.65,
      data: {
        totalGigs: gigListings.length,
        totalUsers: users.length
      },
      metadata: {
        persona: 'matching',
        processingTime: 'N/A',
        responseType: 'analysis' as const,
        confidence: 0.65
      }
    },
    analytics: {
      response: `For analytics insights: Our platform currently shows steady growth. Key metrics include ${users.length} total users and ${gigListings.length} active gigs. Please use the analytics dashboard for detailed reporting.`,
      confidence: 0.7,
      data: {
        userCount: users.length,
        gigCount: gigListings.length
      },
      metadata: {
        persona: 'analytics',
        processingTime: 'N/A',
        responseType: 'analysis' as const,
        confidence: 0.7
      }
    },
    market: {
      response: `Market intelligence: Current trending skills include React, TypeScript, and Node.js. Market demand remains strong across tech roles. Please review our market insights section for the latest data.`,
      confidence: 0.65,
      metadata: {
        persona: 'market',
        processingTime: 'N/A',
        responseType: 'analysis' as const,
        confidence: 0.65
      }
    }
  }

  return fallbackResponses[persona as keyof typeof fallbackResponses] || fallbackResponses.general
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin AI Chat API',
    version: '1.0',
    features: [
      'Multi-persona AI assistance',
      'Platform management support',
      'Intelligent recommendations',
      'Context-aware responses',
      'Actionable suggestions'
    ],
    availablePersonas: [
      {
        id: 'general',
        name: 'General',
        description: 'General platform assistance and operations'
      },
      {
        id: 'matching',
        name: 'Matching',
        description: 'Gig-to-candidate matching algorithms and optimization'
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Platform metrics, data analysis, and insights'
      },
      {
        id: 'market',
        name: 'Market',
        description: 'Market trends, skill demand, and competitive intelligence'
      }
    ],
    supportedCapabilities: [
      'Natural language queries',
      'Context-aware responses',
      'Platform data integration',
      'Action recommendations',
      'Real-time insights'
    ],
    rateLimit: '30 requests per minute'
  })
}
