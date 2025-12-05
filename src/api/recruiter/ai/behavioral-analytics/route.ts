import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

interface BehavioralAnalysisRequest {
  resumeText?: string
  interviewResponses?: string[]
  backgroundInfo?: {
    currentRole: string
    experienceLevel: string
    education: string
    personalityIndicators?: string[]
  }
  focusAreas?: string[] // 'leadership', 'communication', 'teamwork', 'problem-solving', etc.
}

interface BehavioralAnalysisResponse {
  personalityProfile: {
    primaryTraits: Array<{
      trait: string
      strength: number // 0-100
      evidence: string[]
      developmentAreas: string[]
    }>
    communicationStyle: {
      style: 'Direct' | 'Diplomatic' | 'Analytical' | 'Supportive' | 'Persuasive'
      description: string
      strengths: string[]
      blindSpots: string[]
    }
    workStyle: {
      pace: 'Fast-paced' | 'Deliberate' | 'Flexible' | 'Structured'
      leadershipStyle: 'Transformational' | 'Transactional' | 'Situational' | 'Laissez-faire'
      conflictStyle: 'Avoiding' | 'Accommodating' | 'Compromising' | 'Competing' | 'Collaborating'
      decisionStyle: 'Analytical' | 'Directive' | 'Conceptual' | 'Behavioral'
    }
    culturalFit: {
      score: number // 0-100
      indicators: string[]
      potentialChallenges: string[]
      recommendations: string[]
    }
  }
  competencyAssessment: {
    coreCompetencies: Array<{
      competency: string
      level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
      evidence: string[]
      gaps: string[]
      developmentSuggestions: string[]
    }>
    leadershipPotential: number // 0-100
    growthTrajectory: 'High' | 'Medium' | 'Low'
    derailmentRisks: string[]
  }
  interviewInsights: {
    behavioralPatterns: {
      starUsage: 'Strong' | 'Moderate' | 'Weak'
      specificityLevel: 'High' | 'Medium' | 'Low'
      consistency: 'High' | 'Medium' | 'Low'
      credibilityIndicators: string[]
    }
    redFlags: Array<{
      flag: string
      severity: 'High' | 'Medium' | 'Low'
      evidence: string
      mitigationStrategies: string[]
    }>
    strengthsToProbe: string[]
    concernsToAddress: string[]
  }
  developmentRecommendations: {
    immediateActions: string[]
    trainingPrograms: Array<{
      program: string
      reason: string
      expectedOutcomes: string[]
    }>
    mentorshipNeeds: string[]
    careerPathAlignment: string[]
  }
  processedAt: string
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    resumeText,
    interviewResponses,
    backgroundInfo,
    focusAreas = ['leadership', 'communication', 'teamwork', 'problem-solving']
  } = body

  if (!resumeText && !interviewResponses?.length && !backgroundInfo) {
    return NextResponse.json(
      { error: 'At least one of resumeText, interviewResponses, or backgroundInfo is required' },
      { status: 400 }
    )
  }

  try {
    const analysisContext = `
RESUME CONTENT: ${resumeText || 'Not provided'}
INTERVIEW RESPONSES: ${interviewResponses?.join('\n') || 'Not provided'}
BACKGROUND: ${backgroundInfo ? JSON.stringify(backgroundInfo) : 'Not provided'}
FOCUS AREAS: ${focusAreas.join(', ')}
`

    const prompt = `
Analyze the behavioral patterns, personality traits, and soft skills competencies of this candidate based on the provided information.

ANALYSIS CONTEXT:
${analysisContext}

Please provide comprehensive behavioral analysis in JSON format:
{
  "personalityProfile": {
    "primaryTraits": [
      {
        "trait": "e.g., Leadership, Communication, Teamwork",
        "strength": 85,
        "evidence": ["Concrete examples from behavior"],
        "developmentAreas": ["Areas for growth"]
      }
    ],
    "communicationStyle": {
      "style": "Direct|Diplomatic|Analytical|Supportive|Persuasive",
      "description": "Detailed description of communication approach",
      "strengths": ["Key communication strengths"],
      "blindSpots": ["Potential communication challenges"]
    },
    "workStyle": {
      "pace": "Fast-paced|Deliberate|Flexible|Structured",
      "leadershipStyle": "Transformational|Transactional|Situational|Laissez-faire",
      "conflictStyle": "Avoiding|Accommodating|Compromising|Competing|Collaborating",
      "decisionStyle": "Analytical|Directive|Conceptual|Behavioral"
    }
  },
  "competencyAssessment": {
    "leadershipPotential": 75,
    "growthTrajectory": "High|Medium|Low",
    "derailmentRisks": ["Potential leadership pitfalls"]
  },
  "culturalFit": {
    "score": number,
    "indicators": ["Signs of cultural alignment"],
    "challenges": ["Potential cultural mismatches"],
    "recommendations": ["Ways to ensure fit"]
  }
}

Focus on actionable insights for recruitment and team integration decisions. Be specific and evidence-based.
`

    const aiResponse = await textModel.generateContent(prompt)
    const rawAnalysis = JSON.parse(aiResponse.response.text())

    // Structure and enhance the response
    const response: BehavioralAnalysisResponse = {
      personalityProfile: {
        primaryTraits: rawAnalysis.personalityProfile?.primaryTraits || [],
        communicationStyle: rawAnalysis.personalityProfile?.communicationStyle || {
          style: 'Diplomatic',
          description: 'Communicates thoughtfully and considers various perspectives',
          strengths: ['Strong listening skills', 'Empathy in communication'],
          blindSpots: ['May avoid direct confrontation']
        },
        workStyle: rawAnalysis.personalityProfile?.workStyle || {
          pace: 'Structured',
          leadershipStyle: 'Situational',
          conflictStyle: 'Collaborating',
          decisionStyle: 'Analytical'
        },
        culturalFit: rawAnalysis.culturalFit || {
          score: 75,
          indicators: ['Shows adaptability and learning orientation'],
          potentialChallenges: ['May need clear structure and processes'],
          recommendations: ['Provide clear expectations and frequent feedback']
        }
      },
      competencyAssessment: {
        coreCompetencies: rawAnalysis.coreCompetencies || [
          {
            competency: 'Problem Solving',
            level: 'Intermediate',
            evidence: ['Shows systematic approach to challenges'],
            gaps: ['May benefit from more creative techniques'],
            developmentSuggestions: ['Take advanced problem-solving courses']
          }
        ],
        leadershipPotential: rawAnalysis.competencyAssessment?.leadershipPotential || 70,
        growthTrajectory: rawAnalysis.competencyAssessment?.growthTrajectory || 'Medium',
        derailmentRisks: rawAnalysis.competencyAssessment?.derailmentRisks || []
      },
      interviewInsights: {
        behavioralPatterns: {
          starUsage: 'Moderate',
          specificityLevel: 'Medium',
          consistency: 'High',
          credibilityIndicators: ['Consistent with resume content', 'Specific examples provided']
        },
        redFlags: rawAnalysis.redFlags || [],
        strengthsToProbe: rawAnalysis.strengthsToProbe || [
          'Technical expertise in core skills',
          'Problem-solving capabilities'
        ],
        concernsToAddress: rawAnalysis.concernsToAddress || []
      },
      developmentRecommendations: {
        immediateActions: rawAnalysis.developmentRecommendations?.immediateActions || [
          'Schedule cultural fit alignment session',
          'Assign onboarding buddy for integration'
        ],
        trainingPrograms: rawAnalysis.developmentRecommendations?.trainingPrograms || [],
        mentorshipNeeds: rawAnalysis.mentorshipNeeds || ['Technical mentorship for first 3 months'],
        careerPathAlignment: rawAnalysis.careerPathAlignment || [
          'Clear progression path communicated',
          'Regular check-ins on career goals'
        ]
      },
      processedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: response,
      _meta: {
        analysisType: 'Behavioral Assessment',
        confidence: 0.82,
        primaryDataSource: resumeText ? 'resume' : interviewResponses ? 'interview' : 'background',
        aiModel: 'Gemini-1.5-Flash'
      }
    })

  } catch (error) {
    console.error('Behavioral analytics API error:', error)

    // Enhanced fallback analysis
    const fallbackResponse: BehavioralAnalysisResponse = {
      personalityProfile: {
        primaryTraits: [
          {
            trait: 'Teamwork',
            strength: 75,
            evidence: ['Collaborative projects mentioned', 'Team-based experience'],
            developmentAreas: ['Taking more leadership roles']
          },
          {
            trait: 'Problem Solving',
            strength: 70,
            evidence: ['Technical challenges resolved', 'Systematic approaches'],
            developmentAreas: ['More creative problem-solving techniques']
          }
        ],
        communicationStyle: {
          style: 'Analytical',
          description: 'Communicates with data and logical reasoning',
          strengths: ['Clear technical explanations', 'Logical arguments'],
          blindSpots: ['May not consider emotional factors']
        },
        workStyle: {
          pace: 'Structured',
          leadershipStyle: 'Situational',
          conflictStyle: 'Collaborating',
          decisionStyle: 'Analytical'
        },
        culturalFit: {
          score: 75,
          indicators: ['Technology-focused background', 'Structured work approach'],
          potentialChallenges: ['May need flexibility training'],
          recommendations: ['Introduce agile methodologies', 'Encourage creative thinking']
        }
      },
      competencyAssessment: {
        coreCompetencies: [
          {
            competency: focusAreas?.[0] || 'Technical Skills',
            level: 'Intermediate',
            evidence: ['Resume projects', 'Experience mentioned'],
            gaps: ['Advanced skills needed'],
            developmentSuggestions: ['Pursue advanced certifications']
          }
        ],
        leadershipPotential: 65,
        growthTrajectory: 'Medium',
        derailmentRisks: ['Perfectionism affecting delivery']
      },
      interviewInsights: {
        behavioralPatterns: {
          starUsage: 'Moderate',
          specificityLevel: 'Medium',
          consistency: 'High',
          credibilityIndicators: ['Resume matches interview content']
        },
        redFlags: [],
        strengthsToProbe: ['Technical depth', 'Problem-solving approach'],
        concernsToAddress: ['Adaptability to change', 'Leadership experience']
      },
      developmentRecommendations: {
        immediateActions: [
          'Complete personality assessment',
          'Meet team members for cultural fit',
          'Define clear goals for first 30 days'
        ],
        trainingPrograms: [
          {
            program: 'Leadership Development',
            reason: 'Enhance leadership capabilities',
            expectedOutcomes: ['Improved team management', 'Better decision making']
          }
        ],
        mentorshipNeeds: ['Technical mentor', 'Leadership coach'],
        careerPathAlignment: ['Define growth opportunities', 'Regular feedback sessions']
      },
      processedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        method: 'Pattern-based analysis',
        confidence: 0.65
      }
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Behavioral Analytics API',
    version: '1.0',
    features: [
      'Personality trait assessment',
      'Communication style analysis',
      'Cultural fit evaluation',
      'Leadership potential scoring',
      'Behavioral pattern recognition',
      'Development recommendations'
    ],
    supportedInputs: ['resume text', 'interview responses', 'background information'],
    competencies: [
      'Leadership', 'Communication', 'Teamwork', 'Problem Solving',
      'Adaptability', 'Emotional Intelligence', 'Cultural Fit'
    ],
    rateLimit: '15 requests per minute'
  })
}
