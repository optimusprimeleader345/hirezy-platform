import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { studentId } = req.query

    if (!studentId || typeof studentId !== 'string') {
      return res.status(400).json({ message: 'Student ID is required' })
    }

    // Get existing roadmap or create a default one
    let roadmap = await prisma.careerRoadmap.findUnique({
      where: { studentId }
    })

    // Always return a roadmap - either from DB or default
    if (!roadmap) {
      console.warn(`Student ${studentId} not found in database, returning default roadmap`)
      return res.status(200).json({
        id: 'demo-id',
        studentId,
        currentStage: 'Beginner',
        completedSteps: ['create-profile', 'upload-resume'],
        nextSteps: ['apply-first-gig', 'complete-job-match', 'network-recruiters', 'prepare-interviews'],
        notes: 'Keep applying to gigs and building your portfolio',
        updatedAt: new Date()
      })
    }

    // Return existing roadmap
    res.status(200).json({
      id: roadmap.id,
      studentId: roadmap.studentId,
      currentStage: roadmap.currentStage,
      completedSteps: JSON.parse(roadmap.completedSteps as string),
      nextSteps: JSON.parse(roadmap.nextSteps as string),
      notes: roadmap.notes,
      updatedAt: roadmap.updatedAt
    })
  } catch (error) {
    console.error('Error fetching roadmap:', error)
    res.status(500).json({ message: 'Failed to fetch roadmap' })
  }
}
