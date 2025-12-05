'use client'

import React, { useState } from 'react'
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
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)

  // For simplicity, we'll create a basic date picker with a few sample dates
  const availableDates = [
    { date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], label: 'Tomorrow' },
    { date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], label: 'Day after Tomorrow' },
    { date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], label: 'In 3 days' },
    { date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], label: 'Next week' },
  ]

  const handleDateSelect = (date: string) => {
    onDateSelect(date)
    setIsCalendarVisible(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  React.useEffect(() => {
    if (preselectedDate) {
      onDateSelect(preselectedDate)
    }
  }, [preselectedDate, onDateSelect])

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative">
      <h3 className="text-lg font-semibold text-white mb-4">Select Interview Date</h3>

      {/* Date input/display */}
      <div className="relative">
        <button
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <span className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            {selectedDate ? formatDate(selectedDate) : 'Select interview date'}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isCalendarVisible ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Date picker dropdown */}
        {isCalendarVisible && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-lg z-50">
            <div className="p-3">
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {availableDates.map((dateOption) => (
                  <button
                    key={dateOption.date}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDateSelect(dateOption.date)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedDate === dateOption.date
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="font-medium">{dateOption.label}</div>
                    <div className="text-sm text-gray-400">{formatDate(dateOption.date)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isCalendarVisible && (
        <div
          className="fixed inset-0 z-40"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsCalendarVisible(false)
          }}
        />
      )}
    </div>
  )
}
