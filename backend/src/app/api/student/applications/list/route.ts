import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getMockApplications } from '@/lib/student-mock-data';

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  try {
    const applications = await prisma.application.findMany({
      where: { studentId },
      include: {
        gig: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            budgetMin: true,
            budgetMax: true,
            createdAt: true,
            recruiter: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.warn('Using mock applications list:', error);
    return NextResponse.json(getMockApplications(studentId));
  }
}
