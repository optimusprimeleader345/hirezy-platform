import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, newStatus } = body

    if (!applicationId || !newStatus) {
      return NextResponse.json(
        { message: 'applicationId and newStatus are required' },
        { status: 400 }
      )
    }

    // Define valid status values based on the Prisma schema
    const validStatuses = ['received', 'shortlisted', 'interview', 'offered', 'rejected']
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { message: 'Invalid status value' },
        { status: 400 }
      )
    }

    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status: newStatus },
      include: {
        gig: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Application status updated successfully',
      application: updatedApplication
    })
  } catch (error) {
    console.error('Error updating application status:', error)

    // Handle "not found" error specifically
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { message: 'Application not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to update application status' },
      { status: 500 }
    )
  }
}
