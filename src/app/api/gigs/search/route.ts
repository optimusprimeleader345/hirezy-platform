import { NextRequest, NextResponse } from 'next/server'
import { mockGigs, searchGigs, filterGigs, type GigListResponse, type GigSearchFilters } from '@/lib/gigs/mockData'

const defaultFilters: GigSearchFilters = {
  skills: [],
  salaryRange: { min: 0, max: 200000 },
  remote: null,
  experience: [],
  category: [],
  postedWithin: 'any'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query = '', page = 1, pageSize = 12, filters = {} } = body

    console.log('Search request:', { query, page, pageSize, filters })

    const itemsPerPage = Math.min(pageSize, 50)
    const currentPage = Math.max(1, page)
    const appliedFilters = { ...defaultFilters, ...filters }

    // Apply search if query provided
    let filteredGigs = mockGigs
    if (query.trim()) {
      filteredGigs = searchGigs(query, mockGigs)
    }

    // Apply filters
    filteredGigs = filterGigs(filteredGigs, appliedFilters)

    // Sort results (default: relevance/best match)
    const sortType = appliedFilters.sortBy || 'bestMatch'
    switch (sortType) {
      case 'newest':
        filteredGigs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
        break
      case 'salary':
        filteredGigs.sort((a, b) => {
          const aMatch = a.salary.match(/\$(\d{1,3}(?:,\d{3})*)/g)
          const bMatch = b.salary.match(/\$(\d{1,3}(?:,\d{3})*)/g)
          const aSalary = aMatch ? parseInt(aMatch[0].replace(/[$,]/g, '')) : 0
          const bSalary = bMatch ? parseInt(bMatch[0].replace(/[$,]/g, '')) : 0
          return bSalary - aSalary
        })
        break
      case 'bestMatch':
      default:
        filteredGigs.sort((a, b) => {
          const aScore = a.matchScore || 0
          const bScore = b.matchScore || 0
          if (bScore !== aScore) return bScore - aScore
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        })
        break
    }

    const totalCount = filteredGigs.length
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = Math.min(startIndex + itemsPerPage, totalCount)

    const paginatedGigs = filteredGigs.slice(startIndex, endIndex)

    const response: GigListResponse = {
      gigs: paginatedGigs,
      totalCount,
      page: currentPage,
      totalPages,
      filters: appliedFilters
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Gig Search API Error:', error)
    return NextResponse.json(
      { error: 'Failed to search gigs' },
      { status: 500 }
    )
  }
}

// GET endpoint for basic search without filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('limit') || '12')

    let filteredGigs = mockGigs
    if (query.trim()) {
      filteredGigs = searchGigs(query, mockGigs)
    }

    // Basic sorting by match score
    filteredGigs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

    const totalCount = filteredGigs.length
    const totalPages = Math.ceil(totalCount / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, totalCount)

    const response: GigListResponse = {
      gigs: filteredGigs.slice(startIndex, endIndex),
      totalCount,
      page,
      totalPages,
      filters: defaultFilters
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Gig Search GET API Error:', error)
    return NextResponse.json(
      { error: 'Failed to search gigs' },
      { status: 500 }
    )
  }
}
