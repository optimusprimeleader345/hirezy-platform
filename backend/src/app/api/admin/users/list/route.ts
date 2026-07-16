// @see src/lib/adminUserStore.ts for shared data
import { NextRequest, NextResponse } from 'next/server'
import { userStore } from '@/lib/adminUserStore'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const role = searchParams.get('role')
    const status = searchParams.get('status')

    let users = [...userStore]

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase()
      users = users.filter(user =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      )
    }

    if (role && role !== '') {
      users = users.filter(user => user.role === role)
    }

    if (status && status !== '') {
      users = users.filter(user => user.status === status)
    }

    return NextResponse.json({
      success: true,
      users
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to load users' },
      { status: 500 }
    )
  }
}
