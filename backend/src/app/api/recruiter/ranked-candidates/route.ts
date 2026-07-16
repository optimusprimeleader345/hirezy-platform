import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { callPythonMatching } from '@/lib/ai/python-ai-bridge'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')

    if (!jobId) {
        return NextResponse.json({ error: 'jobId is required' }, { status: 400 })
    }

    try {
        // 1. Fetch Job details
        const gig = await prisma.gig.findUnique({
            where: { id: jobId },
            include: { applications: { include: { student: true } } }
        })

        if (!gig) {
            return NextResponse.json({ error: 'Gig not found' }, { status: 404 })
        }

        // 2. Prepare Job Data for AI
        const jobData = {
            title: gig.title,
            description: gig.description,
            skills: JSON.parse(gig.skills || '[]'),
            experience_requirements: ['Entry-Mid level'], // Heuristic or from gig data if available
            education_requirements: []
        }

        // 3. Process each candidate through AI matching
        const rankedCandidates = await Promise.all(
            gig.applications.map(async (app) => {
                // Mocking student profile data as it's not fully in the prisma schema
                // In a real app, this would come from a StudentProfile model
                const candidateData = {
                    name: app.student.name,
                    email: app.student.email,
                    skills: ['React', 'JavaScript', 'Node.js'], // Placeholder
                    experience: ['2 years of experience'], // Placeholder
                    summary: app.coverLetter || ''
                }

                const aiResult = await callPythonMatching(jobData, candidateData)

                return {
                    id: app.id,
                    studentId: app.student.id,
                    name: app.student.name,
                    email: app.student.email,
                    match_score: aiResult?.total_score || 0,
                    similarity: aiResult?.similarity || 0,
                    breakdown: aiResult?.breakdown,
                    explanation: aiResult?.explanation,
                    top_matching_skills: aiResult?.top_matching_skills || [],
                    missing_skills: aiResult?.missing_skills || [],
                    status: app.status,
                    appliedAt: app.createdAt
                }
            })
        )

        // 4. Sort by total_score descending
        const sortedCandidates = rankedCandidates.sort((a, b) => b.match_score - a.match_score)

        return NextResponse.json({
            success: true,
            jobTitle: gig.title,
            candidates: sortedCandidates,
            _meta: {
                totalCount: sortedCandidates.length,
                processedAt: new Date().toISOString()
            }
        })

    } catch (error) {
        console.error('Error fetching ranked candidates:', error)
        return NextResponse.json(
            { error: 'Failed to fetch ranked candidates', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
