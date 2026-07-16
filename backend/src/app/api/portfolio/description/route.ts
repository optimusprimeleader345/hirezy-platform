import { NextRequest, NextResponse } from 'next/server'
import { generateDescription } from '@/lib/ai/portfolio/generateDescription'

export async function POST(request: NextRequest) {
  try {
    const { name, skills, technologies, existingDescription } = await request.json()

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      )
    }

    const result = generateDescription({
      name,
      skills: skills || [],
      technologies: technologies || [],
      description: existingDescription
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI description generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    )
  }
}
