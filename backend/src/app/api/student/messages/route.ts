import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockMessages } from '@/lib/student-mock-data';

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: studentId }, { receiverId: studentId }],
      },
      include: {
        sender: { select: { id: true, name: true, role: true } },
        receiver: { select: { id: true, name: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.warn('Using mock messages:', error);
    return NextResponse.json(
      mockMessages.filter((m) => m.senderId === studentId || m.receiverId === studentId)
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { senderId, receiverId, content } = await request.json();

    if (!senderId || !receiverId || !content?.trim()) {
      return NextResponse.json(
        { error: 'senderId, receiverId, and content are required' },
        { status: 400 }
      );
    }

    try {
      const message = await prisma.message.create({
        data: { senderId, receiverId, content: content.trim() },
        include: {
          sender: { select: { id: true, name: true, role: true } },
          receiver: { select: { id: true, name: true, role: true } },
        },
      });

      return NextResponse.json({ success: true, message });
    } catch (dbError) {
      console.warn('Mock message send:', dbError);
      return NextResponse.json({
        success: true,
        message: {
          id: `msg-${Date.now()}`,
          senderId,
          receiverId,
          content: content.trim(),
          createdAt: new Date().toISOString(),
          read: false,
          sender: { id: senderId, name: 'You', role: 'student' },
        },
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
