import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { status = 'open' } = req.query

    const gigs = await prisma.gig.findMany({
      where: {
        status: status as string,
      },
      include: {
        applications: true,
        recruiter: {
          select: {
            name: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedGigs = gigs.map(gig => ({
      gigId: gig.id,
      title: gig.title,
      description: gig.description,
      budget: gig.budgetMin && gig.budgetMax
        ? `${gig.currency}${gig.budgetMin}-${gig.currency}${gig.budgetMax}`
        : `${gig.currency}${gig.budgetMin || gig.budgetMax || 'Negotiable'}`,
      skills: gig.skills ? JSON.parse(gig.skills) : [],
      status: gig.status,
      createdAt: gig.createdAt.toISOString(),
      recruiterName: gig.recruiter?.name || 'Verified Recruiter',
      applicationsCount: gig.applications?.length || 0
    }))

    res.status(200).json(formattedGigs)
  } catch (error) {
    console.error('Error fetching gigs:', error)
    res.status(500).json({ message: 'Failed to fetch gigs' })
  }
}
