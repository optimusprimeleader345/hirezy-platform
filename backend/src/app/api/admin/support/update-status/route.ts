import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: NextRequest) {
  try {
    const { ticketId, newStatus } = await request.json()

    if (!ticketId) {
      return NextResponse.json(
        { error: 'ticketId is required' },
        { status: 400 }
      )
    }

    if (!['open', 'in_progress', 'resolved'].includes(newStatus)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be open, in_progress, or resolved' },
        { status: 400 }
      )
    }

    const updatedTicket = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: newStatus,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      ticket: {
        id: updatedTicket.id,
        status: updatedTicket.status,
        updatedAt: updatedTicket.updatedAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Error updating ticket status:', error)

    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Ticket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update ticket status' },
      { status: 500 }
    )
  }
}
