import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data structure as specified
    const mockData = {
      totalUsers: 2400,
      activeUsers: 1780,
      monthlyGrowth: 12,
      studentCount: 1800,
      recruiterCount: 550,
      adminCount: 5,
      dau: [100, 230, 180, 240, 300, 320, 290],
      mau: [1200, 1400, 1550, 1600, 1780],
      signupTrend: [
        { date: "2024-12-01", count: 32 },
        { date: "2024-12-02", count: 51 },
        { date: "2024-12-03", count: 67 }
      ]
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Error fetching platform analytics:', error)
    // Fallback data as specified
    const fallbackData = {
      totalUsers: 2400,
      activeUsers: 1780,
      monthlyGrowth: 12,
      studentCount: 1800,
      recruiterCount: 550,
      adminCount: 5,
      dau: [100, 230, 180, 240, 300, 320, 290],
      mau: [1200, 1400, 1550, 1600, 1780],
      signupTrend: [
        { date: "2024-12-01", count: 32 },
        { date: "2024-12-02", count: 51 },
        { date: "2024-12-03", count: 67 }
      ]
    }
    return NextResponse.json(fallbackData)
  }
}
