import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { ticketId, adminId, replyMessage } = await request.json()

    if (!ticketId || !adminId || !replyMessage) {
      return NextResponse.json(
        { error: 'ticketId, adminId, and replyMessage are required' },
        { status: 400 }
      )
    }

    if (!replyMessage.trim()) {
      return NextResponse.json(
        { error: 'Reply message cannot be empty' },
        { status: 400 }
      )
    }

    // Get admin name from users table
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: { name: true, email: true, role: true }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 404 }
      )
    }

    // Verify admin role
    if (admin.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admin users can reply to support tickets' },
        { status: 403 }
      )
    }

    // Create the reply
    const reply = await prisma.supportReply.create({
      data: {
        ticketId,
        adminId,
        adminName: admin.name || `Admin (${admin.email})`,
        replyMessage: replyMessage.trim()
      },
      select: {
        id: true,
        ticketId: true,
        adminId: true,
        adminName: true,
        replyMessage: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      reply: {
        ...reply,
        createdAt: reply.createdAt.toISOString()
      }
    })

  } catch (error) {
    console.error('Error creating support reply:', error)

    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes('Foreign key constraint failed')) {
      return NextResponse.json(
        { error: 'Support ticket does not exist' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    )
  }
}
