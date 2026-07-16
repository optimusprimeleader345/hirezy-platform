import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockGigsDashboard, mockStudentDashboard } from '@/lib/student-mock-data';

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get('studentId');

  if (!studentId) {
    return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
  }

  try {
    const [user, applications, interviews, roadmap, gigs] = await Promise.all([
      prisma.user.findUnique({ where: { id: studentId } }),
      prisma.application.findMany({ where: { studentId } }),
      prisma.interview.findMany({ where: { studentId, status: 'scheduled' }, take: 5 }),
      prisma.careerRoadmap.findUnique({ where: { studentId } }),
      prisma.gig.findMany({
        where: { status: 'open' },
        include: { recruiter: { select: { name: true } } },
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const shortlisted = applications.filter((a) =>
      ['shortlisted', 'interview', 'offered'].includes(a.status)
    ).length;

    const formattedGigs = gigs.map((gig) => ({
      id: gig.id,
      title: gig.title,
      company: gig.recruiter?.name || 'Company',
      salary:
        gig.budgetMin && gig.budgetMax
          ? `$${gig.budgetMin}-$${gig.budgetMax}`
          : '$Negotiable',
      skills: JSON.parse(gig.skills || '[]'),
      location: 'Remote',
      postedDate: gig.createdAt.toISOString().split('T')[0],
      description: gig.description,
    }));

    let completedSteps: string[] = [];
    try {
      completedSteps = JSON.parse(roadmap?.completedSteps || '[]');
    } catch {
      completedSteps = [];
    }

    return NextResponse.json({
      user: {
        id: user?.id ?? studentId,
        name: user?.name ?? 'Student',
        email: user?.email ?? '',
        role: 'student',
        profileCompleted: Math.min(100, 50 + completedSteps.length * 8),
      },
      stats: {
        totalGigs: applications.length,
        shortlistedCount: shortlisted,
        interviewsScheduled: interviews.length,
        applicationsSent: applications.length,
        proposalsAccepted: applications.filter((a) => a.status === 'offered').length,
        averageRating: 4.8,
        earnings: 12500,
        monthlyGrowth: 15.3,
        walletBalance: 8900,
        skillScore: Math.min(100, 60 + completedSteps.length * 5),
        badgeProgress: Math.min(100, applications.length * 10),
      },
      gigs: formattedGigs.length > 0 ? formattedGigs : mockGigsDashboard,
      upcomingInterviews: interviews.map((i) => ({
        id: i.id,
        company: 'Recruiter',
        position: 'Interview',
        date: i.scheduledAt.toISOString().split('T')[0],
        time: i.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: i.mode,
        status: i.status,
      })),
      notifications: applications.slice(0, 4).map((a, idx) => ({
        id: idx + 1,
        type: a.status,
        message: `Application status: ${a.status}`,
        time: a.createdAt.toISOString(),
        read: false,
      })),
      badges: mockStudentDashboard.badges,
      careerSuggestions: mockStudentDashboard.careerSuggestions,
      walletTransactions: mockStudentDashboard.walletTransactions,
      earnings: mockStudentDashboard.earnings,
    });
  } catch (error) {
    console.warn('Using mock student dashboard:', error);
    return NextResponse.json({
      ...mockStudentDashboard,
      user: { ...mockStudentDashboard.user, id: studentId },
    });
  }
}
