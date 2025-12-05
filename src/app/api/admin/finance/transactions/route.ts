import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Mock transaction data - would query Transaction model in production

    const mockTransactions = [
      {
        id: 'tx_001',
        userId: 'user_101',
        userName: 'John Smith',
        type: 'commission',
        amount: 250.00,
        commission: 15.00,
        status: 'success',
        createdAt: '2024-12-03T14:30:00Z'
      },
      {
        id: 'tx_002',
        userId: 'user_102',
        userName: 'Sarah Johnson',
        type: 'deposit',
        amount: 500.00,
        commission: null,
        status: 'success',
        createdAt: '2024-12-03T12:15:00Z'
      },
      {
        id: 'tx_003',
        userId: 'user_103',
        userName: 'Mike Wilson',
        type: 'commission',
        amount: 180.00,
        commission: 18.00,
        status: 'success',
        createdAt: '2024-12-03T10:45:00Z'
      },
      {
        id: 'tx_004',
        userId: 'user_104',
        userName: 'Emily Davis',
        type: 'withdrawal',
        amount: 300.00,
        commission: 5.00,
        status: 'pending',
        createdAt: '2024-12-03T09:20:00Z'
      },
      {
        id: 'tx_005',
        userId: 'user_105',
        userName: 'David Brown',
        type: 'deposit',
        amount: 750.00,
        commission: null,
        status: 'success',
        createdAt: '2024-12-02T16:00:00Z'
      },
      {
        id: 'tx_006',
        userId: 'user_106',
        userName: 'Lisa Chen',
        type: 'commission',
        amount: 320.00,
        commission: 32.00,
        status: 'success',
        createdAt: '2024-12-02T14:30:00Z'
      },
      {
        id: 'tx_007',
        userId: 'user_107',
        userName: 'Alex Rodriguez',
        type: 'deposit',
        amount: 200.00,
        commission: null,
        status: 'failed',
        createdAt: '2024-12-02T11:15:00Z'
      },
      {
        id: 'tx_008',
        userId: 'user_108',
        userName: 'Jessica Taylor',
        type: 'withdrawal',
        amount: 150.00,
        commission: 2.50,
        status: 'success',
        createdAt: '2024-12-01T15:45:00Z'
      },
      {
        id: 'tx_009',
        userId: 'user_109',
        userName: 'Tom Anderson',
        type: 'commission',
        amount: 450.00,
        commission: 45.00,
        status: 'success',
        createdAt: '2024-12-01T13:20:00Z'
      },
      {
        id: 'tx_010',
        userId: 'user_110',
        userName: 'Maria Garcia',
        type: 'deposit',
        amount: 620.00,
        commission: null,
        status: 'pending',
        createdAt: '2024-12-01T10:30:00Z'
      }
    ]

    return NextResponse.json({
      success: true,
      transactions: mockTransactions,
      pagination: {
        page: 1,
        limit: 10,
        total: mockTransactions.length,
        pages: 1
      }
    })

  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to load transactions' },
      { status: 500 }
    )
  }
}
