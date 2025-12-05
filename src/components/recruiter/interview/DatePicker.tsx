'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

interface DatePickerProps {
  selectedDate: string
  onDateSelect: (date: string) => void
  preselectedDate?: string
}

export default function DatePicker({
  selectedDate,
  onDateSelect,
  preselectedDate
}: DatePickerProps) {
  // Generate next 14 days as options
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i + 1) // Start from tomorrow
    return date.toISOString().split('T')[0]
  })

  const getDayName = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const getMonthDay = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-5 h-5 text-[#3EFFA8]" />
        <h3 className="text-lg font-medium text-[#FFFFFF]">Choose Date</h3>
      </div>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {availableDates.map((date) => (
          <button
            key={date}
            onClick={() => onDateSelect(date)}
            className={`w-full p-3 rounded-lg border transition-all text-left ${
              selectedDate === date
                ? 'bg-[#3EFFA8] text-black border-[#3EFFA8]'
                : 'bg-[#111315] hover:bg-[#23262B] border-[#23262B] text-[#E2E8F0]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{getDayName(date)}</div>
                <div className="text-sm opacity-70">{getMonthDay(date)}</div>
              </div>
              <div className="text-sm opacity-70">
                {date}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-4 p-3 bg-[#111315] border border-[#3EFFA8] border-opacity-30 rounded-lg">
          <div className="text-sm text-[#C9CFD6]">Selected Date:</div>
          <div className="text-[#3EFFA8] font-medium">
            {getDayName(selectedDate)}, {getMonthDay(selectedDate)}, {selectedDate}
          </div>
        </div>
      )}
    </Card>
  )
}
