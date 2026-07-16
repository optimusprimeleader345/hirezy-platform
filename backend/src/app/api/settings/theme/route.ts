import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { theme } = await request.json()

    // In a real application, you would save this to a database
    console.log('Setting theme to:', theme)

    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Theme updated successfully',
      theme
    })
  } catch (error) {
    console.error('Error updating theme:', error)
    return NextResponse.json({
      success: false,
      message: 'Failed to update theme'
    }, { status: 500 })
  }
}
