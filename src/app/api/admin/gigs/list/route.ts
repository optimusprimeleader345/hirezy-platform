import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Fetch all gigs with required fields and recruiter info
    const gigs = await prisma.gig.findMany({
      include: {
        recruiter: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Format response with company name (using recruiter name)
    const formattedGigs = gigs.map(gig => ({
      id: gig.id,
      title: gig.title,
      company: gig.recruiter.name || `User ${gig.recruiter.email}`,
      createdAt: gig.createdAt.toISOString(),
      status: gig.status,
      category: gig.category || 'Not specified',
      budgetRange: gig.budgetMin && gig.budgetMax
        ? `${gig.currency || '$'}${gig.budgetMin} - ${gig.currency || '$'}${gig.budgetMax}`
        : 'Not specified'
    }))

    return NextResponse.json({
      success: true,
      gigs: formattedGigs
    })

  } catch (error) {
    console.error('Error fetching gigs:', error)
    return NextResponse.json(
      { error: 'Failed to load gigs' },
      { status: 500 }
    )
  }
}
