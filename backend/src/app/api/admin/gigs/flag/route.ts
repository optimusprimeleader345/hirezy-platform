import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
  try {
    const { gigId, reason } = await request.json()

    if (!gigId) {
      return NextResponse.json(
        { error: 'gigId is required' },
        { status: 400 }
      )
    }

    if (!reason || reason.trim() === '') {
      return NextResponse.json(
        { error: 'Flag reason is required' },
        { status: 400 }
      )
    }

    // Update the gig with flagged status and reason
    const updatedGig = await prisma.gig.update({
      where: { id: gigId },
      data: {
        flagged: true,
        flagReason: reason.trim(),
        updatedAt: new Date()
      },
      select: {
        id: true,
        title: true,
        flagged: true,
        flagReason: true
      }
    })

    return NextResponse.json({
      success: true,
      gig: updatedGig
    })

  } catch (error) {
    console.error('Error flagging gig:', error)
    return NextResponse.json(
      { error: 'Failed to flag gig' },
      { status: 500 }
    )
  }
}
