import { NextRequest, NextResponse } from 'next/server'
import { calculateJobMatch } from '@/lib/ai/job-match/calculateMatch'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, skills, description, experienceLevel, budgetRange } = body

    // Validate required fields
    if (!title || !skills || !description || !experienceLevel) {
      return NextResponse.json(
        { error: 'Missing required fields: title, skills, description, experienceLevel' },
        { status: 400 }
      )
    }

    // Ensure skills is an array of strings
    if (!Array.isArray(skills)) {
      return NextResponse.json(
        { error: 'Skills must be an array of strings' },
        { status: 400 }
      )
    }

    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate AI processing

    const jobData = {
      title,
      skills,
      description,
      experienceLevel,
      budgetRange
    }

    const matchResult = calculateJobMatch(jobData)

    return NextResponse.json({
      success: true,
      data: matchResult,
      _meta: {
        processedAt: new Date().toISOString(),
        algorithmVersion: '1.0.0',
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
