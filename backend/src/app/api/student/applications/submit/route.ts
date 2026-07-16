import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createMockApplication } from '@/lib/student-mock-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, gigId, coverLetter, proposedRate, timeline } = body;

    if (!studentId || !gigId) {
      return NextResponse.json(
        { error: 'studentId and gigId are required' },
        { status: 400 }
      );
    }

    if (!coverLetter || coverLetter.trim().length < 20) {
      return NextResponse.json(
        { error: 'Cover letter must be at least 20 characters' },
        { status: 400 }
      );
    }

    try {
      const existing = await prisma.application.findFirst({
        where: { studentId, gigId },
      });

      if (existing) {
        return NextResponse.json(
          { error: 'You have already applied to this gig' },
          { status: 409 }
        );
      }

      const gig = await prisma.gig.findUnique({ where: { id: gigId } });
      if (!gig) {
        return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
      }

      const notes = [proposedRate && `Rate: ${proposedRate}`, timeline && `Timeline: ${timeline}`]
        .filter(Boolean)
        .join(' | ');

      const application = await prisma.application.create({
        data: {
          studentId,
          gigId,
          coverLetter,
          notes: notes || null,
          status: 'received',
          aiScore: Math.round(Math.random() * 20 + 75),
        },
        include: {
          gig: { select: { id: true, title: true, description: true, status: true } },
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully',
        application,
      });
    } catch (dbError) {
      console.warn('Using mock application submit:', dbError);
      const application = createMockApplication({ studentId, gigId, coverLetter, proposedRate });
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully (demo mode)',
        application,
      });
    }
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
