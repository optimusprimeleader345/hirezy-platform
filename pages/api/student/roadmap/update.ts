import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { studentId, currentStage, completedSteps, nextSteps, notes } = req.body

    if (!studentId || typeof studentId !== 'string') {
      return res.status(400).json({ message: 'Student ID is required' })
    }

    // Update or create roadmap
    const roadmap = await prisma.careerRoadmap.upsert({
      where: { studentId },
      update: {
        currentStage,
        completedSteps: JSON.stringify(completedSteps || []),
        nextSteps: JSON.stringify(nextSteps || []),
        notes,
        updatedAt: new Date()
      },
      create: {
        studentId,
        currentStage: currentStage || 'Beginner',
        completedSteps: JSON.stringify(completedSteps || []),
        nextSteps: JSON.stringify(nextSteps || []),
        notes: notes || 'Keep applying to gigs and building your portfolio',
        updatedAt: new Date()
      }
    })

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
    console.error('Error updating roadmap:', error)
    res.status(500).json({ message: 'Failed to update roadmap' })
  }
}
