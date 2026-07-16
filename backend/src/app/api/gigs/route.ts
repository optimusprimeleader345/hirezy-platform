import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mockGigsDashboard } from '@/lib/student-mock-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const remoteAllowed = searchParams.get('remote_allowed') === 'true'

    const gigs = await prisma.gig.findMany({
      where: { status: 'open' },
      include: {
        recruiter: {
          select: { name: true }
        }
      }
    })

    if (gigs.length === 0) {
      return NextResponse.json(mockGigsDashboard)
    }

    const formattedGigs = gigs.map((gig: any) => ({
      id: gig.id,
      title: gig.title,
      company: gig.recruiter?.name || 'Company',
      salary: gig.budgetMin && gig.budgetMax
        ? `$${gig.budgetMin}-$${gig.budgetMax}`
        : '$Negotiable',
      skills: JSON.parse(gig.skills || '[]'),
      location: remoteAllowed ? 'Remote' : 'Remote',
      postedDate: gig.createdAt.toISOString().split('T')[0],
      description: gig.description,
    }))

    return NextResponse.json(formattedGigs)
  } catch (error) {
    console.warn('Using mock gigs (database unavailable):', error)
    return NextResponse.json(mockGigsDashboard)
  }
}
