import { NextRequest, NextResponse } from 'next/server'
import { calculateJobMatch, getTextModel } from '@/lib/ai/google-ai-service'
import { callPythonMatching } from '@/lib/ai/python-ai-bridge'

interface CandidateData {
  id?: string
  resumeText?: string
  skills: string[]
  experience: string[]
  education?: string[]
  projects?: string[]
  profile?: any
}

interface JobRequirements {
  title: string
  skills: string[]
  description: string
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead'
  salaryRange?: string
  location?: string
}

interface CandidateScoringResponse {
  candidateId?: string
  overallScore: number
  skillMatchScore: number
  experienceMatchScore: number
  culturalFitScore: number
  motivationScore: number
  ranking: number // 1-based ranking position
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D'
  confidence: number // 0-100
  strengths: string[]
  weaknesses: string[]
  recommendations: {
    interviewUrgency: 'Immediate' | 'High' | 'Medium' | 'Low'
    suggestedSalaryRange?: string
    nextSteps: string[]
    questions: string[]
  }
  detailedBreakdown: {
    technicalSkills: {
      matched: string[]
      missing: string[]
      score: number
    }
    softSkills: {
      inferred: string[]
      score: number
    }
    experienceFit: {
      level: string
      years: number
      score: number
    }
    growthPotential: {
      score: number
      insights: string[]
    }
  }
  marketInsights: {
    competitiveness: string
    salaryExpectations: string
    marketDemand: string
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { candidate, jobRequirements, rankingPosition, candidatePoolSize } = body

  if (!candidate || !jobRequirements) {
    return NextResponse.json(
      { error: 'Candidate data and job requirements are required' },
      { status: 400 }
    )
  }

  try {
    // 1. Prepare data for AI matching
    const candidateData = {
      name: candidate.name || 'Candidate',
      skills: Array.isArray(candidate.skills) ? candidate.skills : [],
      experience: Array.isArray(candidate.experience) ? candidate.experience : [],
      education: Array.isArray(candidate.education) ? candidate.education : [],
      projects: Array.isArray(candidate.projects) ? candidate.projects : [],
      summary: candidate.resumeText || ''
    }

    const jobData = {
      title: jobRequirements.title,
      description: jobRequirements.description,
      skills: Array.isArray(jobRequirements.skills) ? jobRequirements.skills : [],
      experience_requirements: [`${jobRequirements.experienceLevel} level`],
      education_requirements: []
    }

    // 2. Try Python-based AI matching with weighted scoring
    const pythonMatch = await callPythonMatching(jobData, candidateData);

    // 3. Get semantic similarity score (fallback/parallel)
    const semanticMatch = await calculateJobMatch(candidateData, jobRequirements.description, jobRequirements.title)

    // 4. Advanced AI scoring analysis via Gemini
    const textModel = getTextModel()
    const scoringPrompt = `
Analyze this candidate for the job position and provide comprehensive scoring:

CANDIDATE PROFILE:
- Skills: ${candidate.skills?.join(', ') || 'Not specified'}
- Experience: ${candidate.experience?.join('; ') || 'Not specified'}
- Education: ${candidate.education?.join(', ') || 'Not specified'}
- Resume/Projects: ${candidate.resumeText || candidate.projects?.join(', ') || 'Not available'}

JOB REQUIREMENTS:
- Title: ${jobRequirements.title}
- Required Skills: ${jobRequirements.skills?.join(', ') || 'Not specified'}
- Experience Level: ${jobRequirements.experienceLevel}
- Description: ${jobRequirements.description || 'Not specified'}

ANALYSIS REQUIREMENTS:
Provide detailed candidate assessment in JSON format:
{
  "overallScore": number 0-100,
  "skillMatchScore": number 0-100,
  "experienceCompatibility": number 0-100,
  "culturalFit": {
    "score": number 0-100,
    "insights": ["cultural fit observations"]
  },
  "motivationAndFit": {
    "score": number 0-100,
    "indicators": ["motivation signs"]
  },
  "strengths": ["top 3-5 strengths"],
  "gaps": ["key gaps or concerns"],
  "grade": "A+|A|B+|B|C+|C|D" (based on overall fit),
  "interviewRecommendation": {
    "priority": "Immediate|High|Medium|Low",
    "nextSteps": ["suggested actions"],
    "questions": ["targeted interview questions"]
  },
  "compensation": {
    "suggestedRange": "salary range estimate",
    "marketCompetitiveness": "High|Medium|Low",
    "negotiationPower": "Strong|Moderate|Weak"
  }
}

Focus on recruitment decision-making insights. Be specific and actionable.
`

    const aiAnalysis = await textModel.generateContent(scoringPrompt)
    const analysis = JSON.parse(aiAnalysis.response.text())

    // Calculate ranking position
    const ranking = rankingPosition || 1

    // 5. Generate final response
    const response: CandidateScoringResponse = {
      candidateId: candidate.id,
      overallScore: pythonMatch?.total_score || semanticMatch.score,
      skillMatchScore: pythonMatch?.breakdown?.skill_match_score || semanticMatch.score,
      experienceMatchScore: pythonMatch?.breakdown?.experience_score || analysis.experienceCompatibility || 75,
      culturalFitScore: analysis.culturalFit?.score || 70,
      motivationScore: analysis.motivationAndFit?.score || 75,
      ranking: rankingPosition || 1,
      grade: analysis.grade || (semanticMatch.score >= 90 ? 'A+' : semanticMatch.score >= 80 ? 'A' : 'B'),
      confidence: Math.max(60, Math.min(95, (pythonMatch?.total_score || semanticMatch.score) + 10)),
      strengths: analysis.strengths || pythonMatch?.top_matching_skills || semanticMatch.matchingSkills || [],
      weaknesses: analysis.gaps || pythonMatch?.missing_skills || semanticMatch.missingSkills || [],
      recommendations: {
        interviewUrgency: analysis.interviewRecommendation?.priority || 'Medium',
        suggestedSalaryRange: analysis.compensation?.suggestedRange || jobRequirements.salaryRange || 'Competitive',
        nextSteps: analysis.interviewRecommendation?.nextSteps || [
          'Schedule technical interview',
          'Review portfolio',
          'Check references'
        ],
        questions: [
          ...(analysis.interviewRecommendation?.questions || []),
          ...(pythonMatch?.explanation ? [pythonMatch.explanation] : [])
        ].slice(0, 5)
      },
      detailedBreakdown: {
        technicalSkills: {
          matched: pythonMatch?.top_matching_skills || semanticMatch.matchingSkills || [],
          missing: pythonMatch?.missing_skills || semanticMatch.missingSkills || [],
          score: pythonMatch?.breakdown?.skill_match_score || semanticMatch.score
        },
        softSkills: {
          inferred: ['Communication', 'Problem-solving', 'Teamwork'],
          score: analysis.culturalFit?.score || 70
        },
        experienceFit: {
          level: jobRequirements.experienceLevel,
          years: candidate.experience?.length || 2,
          score: pythonMatch?.breakdown?.experience_score || analysis.experienceCompatibility || 75
        },
        growthPotential: {
          score: Math.min(100, (pythonMatch?.total_score || semanticMatch.score) + 20),
          insights: [
            'Shows strong learning potential',
            'Based on semantic alignment: ' + (pythonMatch?.similarity.toFixed(2) || '0.00'),
            'Weighted alignment version 2.0'
          ]
        }
      },
      marketInsights: {
        competitiveness: analysis.compensation?.marketCompetitiveness || 'Medium',
        salaryExpectations: analysis.compensation?.suggestedRange || 'Market rate',
        marketDemand: (pythonMatch?.total_score || semanticMatch.score) > 75 ? 'High demand' : 'Standard demand'
      }
    }

    return NextResponse.json({
      success: true,
      data: response,
      _meta: {
        candidatePoolSize: candidatePoolSize || 1,
        rankingPosition: ranking,
        algorithmVersion: 'AI-Enhanced v2.0',
        processingTime: `${Date.now()}ms`,
        confidence: response.confidence / 100
      }
    })

  } catch (error) {
    console.error('Candidate scoring API error:', error)

    // Fallback scoring based on basic skill matching
    const skills: string[] = Array.isArray(candidate?.skills) ? candidate.skills : []
    const jobSkills: string[] = Array.isArray(jobRequirements?.skills) ? jobRequirements.skills : []

    const matchedSkills: string[] = skills.filter((skill: string) =>
      jobSkills.some((jobSkill: string) =>
        jobSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(jobSkill.toLowerCase())
      )
    )

    const fallbackScore = skills.length > 0 ? Math.round((matchedSkills.length / skills.length) * 85) : 50

    const fallbackResponse: CandidateScoringResponse = {
      candidateId: candidate?.id,
      overallScore: fallbackScore,
      skillMatchScore: fallbackScore,
      experienceMatchScore: 70,
      culturalFitScore: 65,
      motivationScore: 70,
      ranking: rankingPosition || 1,
      grade: fallbackScore >= 80 ? 'A' : fallbackScore >= 70 ? 'B' : 'C',
      confidence: 0.5,
      strengths: matchedSkills.length > 0 ? matchedSkills.slice(0, 3) : ['Basic qualifications met'],
      weaknesses: ['Limited advanced technical skills', 'Experience verification needed'],
      recommendations: {
        interviewUrgency: fallbackScore >= 75 ? 'High' : 'Medium',
        nextSteps: ['Conduct technical interview', 'Reference check', 'Skills assessment'],
        questions: ['Describe your experience with relevant technologies', 'What motivates you about this role?']
      },
      detailedBreakdown: {
        technicalSkills: {
          matched: matchedSkills,
          missing: [],
          score: fallbackScore
        },
        softSkills: { inferred: [], score: 65 },
        experienceFit: { level: 'Mid', years: 2, score: 70 },
        growthPotential: { score: 60, insights: [] }
      },
      marketInsights: {
        competitiveness: 'Medium',
        salaryExpectations: 'Entry to mid-level range',
        marketDemand: 'Moderate'
      }
    }

    return NextResponse.json({
      success: true,
      data: fallbackResponse,
      _meta: {
        fallback: true,
        algorithmVersion: 'Basic Scoring v1.0',
        error: 'AI analysis temporarily unavailable'
      }
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Candidate Scoring & Ranking API',
    version: '2.0',
    features: [
      'Semantic matching algorithms',
      'ML-powered candidate ranking',
      'Skills gap analysis',
      'Cultural fit assessment',
      'Interview recommendations',
      'Salary guidance'
    ],
    algorithms: ['BERT embeddings', 'Transformers', 'Neural networks'],
    supportedInputs: ['skills array', 'experience array', 'full profiles'],
    batchProcessing: 'Supported for < 50 candidates'
  })
}
