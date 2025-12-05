import { NextRequest, NextResponse } from 'next/server'
import { textModel } from '@/lib/ai/google-ai-service'

export async function POST(request: NextRequest) {
  const { currentSkills, jobDescription, targetRole, experienceLevel } = await request.json()

  if (!currentSkills || !Array.isArray(currentSkills)) {
    return NextResponse.json(
      { error: 'Current skills array is required' },
      { status: 400 }
    )
  }

  try {
    // Use AI to analyze comprehensive skill gaps
    const prompt = `
Analyze the skill gap for a ${experienceLevel || 'professional'} level candidate targeting ${targetRole || 'developer'} roles.

CURRENT SKILLS: ${currentSkills.join(', ')}

${jobDescription ? `TARGET JOB DESCRIPTION: ${jobDescription}` : ''}

Provide a detailed skill gap analysis in JSON format with gapScore, missingSkills, recommendedSkills, difficultyLevel, prioritySkills, analysis, and learningPath.
`

    const result = await textModel.generateContent(prompt)
    const analysis = JSON.parse(result.response.text())

    return NextResponse.json({
      ...analysis,
      _metadata: {
        analyzedAt: new Date().toISOString(),
        method: "AI-powered analysis",
        inputSkills: currentSkills.length,
        targetRole: targetRole || 'general developer'
      }
    })
  } catch (error) {
    console.error('Skill gap analysis API error:', error)

    // Enhanced fallback analysis with proper variable scope
    const fallbackSkills = [
      'React', 'Node.js', 'TypeScript', 'AWS', 'Docker',
      'Python', 'System Design', 'Testing', 'Security'
    ]

    const missingSkills = fallbackSkills.filter(skill =>
      !currentSkills.some(currSkill =>
        currSkill.toLowerCase().includes(skill.toLowerCase())
      )
    )

    const gapScore = Math.max(0, 100 - (missingSkills.length * 12))

    return NextResponse.json({
      gapScore,
      missingSkills: missingSkills.slice(0, 3).map(skill => ({
        skill,
        category: 'Technical',
        priority: 'High',
        difficulty: 'Medium',
        timeToLearn: '1-2 months',
        whyImportant: `${skill} is highly demanded in today's job market`
      })),
      recommendedSkills: ['Cloud computing', 'Modern frameworks', 'DevOps practices'],
      difficultyLevel: 'Intermediate',
      prioritySkills: missingSkills.slice(0, 2),
      analysis: 'Basic skill gap analysis - AI service temporarily unavailable',
      learningPath: [{
        phase: 'Foundation',
        duration: '2-3 months',
        skills: ['React', 'Node.js'],
        resources: ['Online tutorials', 'Practice projects']
      }],
      _metadata: {
        fallback: true,
        originalSkills: currentSkills.length,
        method: 'Basic fallback analysis'
      }
    })
  }
}
