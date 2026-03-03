import { NextRequest, NextResponse } from 'next/server'
import { calculateJobMatch } from '@/lib/ai/google-ai-service'
import { callPythonMatching } from '@/lib/ai/python-ai-bridge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      skills,
      description,
      experienceLevel,
      budgetRange,
      studentSkills,
      studentExperience,
      studentProjects,
      studentProfile
    } = body

    // Validate required fields
    if (!title || !skills || !description || !experienceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: title, skills, description, experienceLevel' },
        { status: 400 }
      )
    }

    if (!studentSkills && !studentProfile) {
      return NextResponse.json(
        { error: 'Either studentSkills or studentProfile required for matching' },
        { status: 400 }
      )
    }

    // Prepare student data for AI matching
    let studentData: {
      skills: string[]
      experience: string[]
      education: string[]
      projects: string[]
    }

    if (studentProfile) {
      // Use complete profile data
      studentData = {
        skills: studentProfile.skills || [],
        experience: studentProfile.experience || [],
        education: studentProfile.education || [],
        projects: studentProfile.projects || []
      }
    } else {
      // Use provided arrays
      studentData = {
        skills: Array.isArray(studentSkills) ? studentSkills : [],
        experience: Array.isArray(studentExperience) ? studentExperience : [],
        education: [], // Can be enhanced later
        projects: Array.isArray(studentProjects) ? studentProjects : []
      }
    }

    // Prepare job data
    const jobData = {
      skills: Array.isArray(skills) ? skills : [],
      experience: [`${experienceLevel} level experience`],
      education: [], // Can be enhanced
      projects: [`${title} requiring: ${description}`]
    }

    // Prepare job data for Python service
    const pythonJobData = {
      title,
      description,
      skills: Array.isArray(skills) ? skills : [],
      experience_requirements: [`${experienceLevel} level experience`],
      education_requirements: []
    }

    // Try Python-based AI matching with weighted scoring first
    let matchResult;
    const pythonMatch = await callPythonMatching(pythonJobData, studentData);

    if (pythonMatch) {
      matchResult = {
        score: pythonMatch.total_score,
        reasoning: pythonMatch.explanation,
        matchingSkills: pythonMatch.top_matching_skills,
        missing_skills: pythonMatch.missing_skills,
        breakdown: pythonMatch.breakdown,
        similarity: pythonMatch.similarity
      };
    } else {
      // Fallback to original AI-powered matching if Python service is unavailable
      matchResult = await calculateJobMatch(studentData, description, title);
    }

    return NextResponse.json({
      success: true,
      data: matchResult,
      _meta: {
        processedAt: new Date().toISOString(),
        algorithmVersion: pythonMatch ? '2.0.0-python-weighted' : '1.5.0-google-semantic',
        dataSource: 'aggregated_student_modules'
      }
    })

  } catch (error) {
    console.error('Job match calculation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to calculate job match',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint for testing/health check
export async function GET() {
  return NextResponse.json({
    message: 'Job Match Scoring AI API is running',
    version: '1.0.0',
    endpoints: ['POST /api/job-match/calculate'],
    description: 'Calculate job-student matching scores based on comprehensive profile analysis'
  })
}
