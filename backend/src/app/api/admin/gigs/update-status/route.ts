import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
  try {
    const { gigId, newStatus } = await request.json()

    if (!gigId) {
      return NextResponse.json(
        { error: 'gigId is required' },
        { status: 400 }
      )
    }

    if (!['pending', 'approved', 'rejected'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be pending, approved, or rejected' },
        { status: 400 }
      )
    }

    // Update the gig status
    const updatedGig = await prisma.gig.update({
      where: { id: gigId },
      data: {
        status: newStatus,
        updatedAt: new Date()
      },
      select: {
        id: true,
        title: true,
        status: true
      }
    })

    return NextResponse.json({
      success: true,
      gig: updatedGig
    })

  } catch (error) {
    console.error('Error updating gig status:', error)
    return NextResponse.json(
      { error: 'Failed to update gig status' },
      { status: 500 }
    )
  }
}
