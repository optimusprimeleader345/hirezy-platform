'use client'

import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react'
import { GlassCard } from '@/components/cards/GlassCard'

interface WalletTransaction {
  id: number
  type: 'earned' | 'withdrawn' | 'pending'
  amount: number
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface WalletSectionProps {
  balance: number
  transactions: WalletTransaction[]
}

export function WalletSection({ balance, transactions }: WalletSectionProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'withdrawn':
        return <TrendingDown className="h-4 w-4 text-red-400" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />
      default:
        return <Wallet className="h-4 w-4 text-white/60" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-white/60'
    }
  }

  return (
    <GlassCard className="neon-glow-purple">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Wallet className="h-6 w-6 text-white" />
          <h3 className="text-xl font-bold text-white">Wallet & Earnings</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">${balance.toLocaleString()}</div>
          <div className="text-xs text-white/60">Available Balance</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="p-4 bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-lg hover:bg-green-400/30 transition-colors">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <div className="text-left">
              <div className="text-sm font-semibold text-green-400">Withdraw</div>
              <div className="text-xs text-white/60">Transfer to bank</div>
            </div>
          </div>
        </button>
        <button className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-400/30 rounded-lg hover:bg-blue-400/30 transition-colors">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <div className="text-left">
              <div className="text-sm font-semibold text-blue-400">History</div>
              <div className="text-xs text-white/60">View all transactions</div>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-3">Recent Transactions</h4>

        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getTransactionIcon(transaction.type)}
              <div>
                <div className="text-white text-sm font-medium">{transaction.description}</div>
                <div className="text-white/60 text-xs">{transaction.date}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-semibold ${
                transaction.type === 'earned' ? 'text-green-400' :
                transaction.type === 'withdrawn' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {transaction.type === 'earned' ? '+' : transaction.type === 'withdrawn' ? '-' : ''}
                ${transaction.amount.toLocaleString()}
              </div>
              <div className={`text-xs capitalize ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </div>
            </div>
          </div>
        ))}

        {transactions.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm mt-1">Complete gigs to earn money</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-3 border-t border-white/10">
        <p className="text-sm text-white/60 text-center">
          Next payout: 2-3 business days
        </p>
      </div>
    </GlassCard>
  )
}
