import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')

    if (!studentId) {
      return NextResponse.json(
        { message: 'studentId is required' },
        { status: 400 }
      )
    }

    const applications = await prisma.application.findMany({
      where: { studentId },
      include: {
        gig: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching student applications:', error)
    return NextResponse.json(
      { message: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}
