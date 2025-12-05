import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const remoteAllowed = searchParams.get('remote_allowed') === 'true'

    // Simple query without complex relations first
    const gigs = await prisma.gig.findMany({
      where: { status: 'open' },
      include: {
        recruiter: {
          select: { name: true }
        }
      }
    })

    const formattedGigs = gigs.map((gig: any) => ({
      id: gig.id,
      title: gig.title,
      company: gig.recruiter?.name || 'Company',
      salary: gig.budgetMin && gig.budgetMax
        ? `$${gig.budgetMin}-$${gig.budgetMax}`
        : '$Negotiable',
      skills: JSON.parse(gig.skills || '[]'),
      location: 'Remote', // Assume remote for now
      postedDate: gig.createdAt.toISOString().split('T')[0], // YYYY-MM-DD format
      description: gig.description,
    }))

    return NextResponse.json(formattedGigs)
  } catch (error) {
    console.error('Failed to fetch gigs:', error)
    return NextResponse.json({
      error: 'Failed to fetch gigs',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 })
  }
}
