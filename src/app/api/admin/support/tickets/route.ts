import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const tickets = await prisma.supportTicket.findMany({
      include: {
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedTickets = tickets.map(ticket => ({
      id: ticket.id,
      userId: ticket.userId,
      userType: ticket.userType,
      subject: ticket.subject,
      message: ticket.message,
      status: ticket.status,
      createdAt: ticket.createdAt.toISOString(),
      replyCount: ticket._count.replies
    }))

    return NextResponse.json({
      success: true,
      tickets: formattedTickets
    })

  } catch (error) {
    console.error('Error fetching support tickets:', error)
    return NextResponse.json(
      { error: 'Failed to load support tickets' },
      { status: 500 }
    )
  }
}
