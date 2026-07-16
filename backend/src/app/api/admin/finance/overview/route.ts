
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock enterprise finance data - would integrate with payment processor like Stripe

    const mockFinanceData = {
      totalRevenue: 125430.75,
      monthlyRevenue: [
        { month: 'Jan', revenue: 34520.50, growth: 12.5 },
        { month: 'Feb', revenue: 38230.25, growth: 10.7 },
        { month: 'Mar', revenue: 46750.00, growth: 22.2 },
        { month: 'Apr', revenue: 41540.25, growth: -11.1 },
        { month: 'May', revenue: 51120.00, growth: 23.0 },
        { month: 'Jun', revenue: 54310.50, growth: 6.2 },
        { month: 'Jul', revenue: 58990.75, growth: 8.6 },
        { month: 'Aug', revenue: 63520.25, growth: 7.7 },
        { month: 'Sep', revenue: 67890.50, growth: 6.9 },
        { month: 'Oct', revenue: 71250.75, growth: 5.0 },
        { month: 'Nov', revenue: 78430.25, growth: 10.1 },
        { month: 'Dec', revenue: 82210.00, growth: 4.8 }
      ],
      totalCommission: 28395.50,
      totalPayouts: 96895.25,
      activeProjectsCount: 247,
      newUsersThisMonth: 1823
    }

    return NextResponse.json({
      success: true,
      data: mockFinanceData
    })

  } catch (error) {
    console.error('Error fetching finance overview:', error)
    return NextResponse.json(
      { error: 'Failed to load finance overview' },
      { status: 500 }
    )
  }
}
