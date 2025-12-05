'use client'

import { useEffect, useState } from 'react'
import { getAvailableTimeSlots } from '@/lib/ai/recruiter/interviewEngine'

interface TimeSlotPickerProps {
  selectedTimeSlot: string
  onTimeSlotSelect: (timeSlot: string) => void
  date: string
}

export default function TimeSlotPicker({
  selectedTimeSlot,
  onTimeSlotSelect,
  date
}: TimeSlotPickerProps) {
  const [timeSlots, setTimeSlots] = useState<any[]>([])

  useEffect(() => {
    // Get AI-recommended time slots for the selected date
    const slots = getAvailableTimeSlots(date)
    setTimeSlots(slots)
  }, [date])

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Available Time Slots</h3>
      <div className="space-y-2">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => onTimeSlotSelect(slot.time)}
            className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
              selectedTimeSlot === slot.time
                ? 'bg-purple-500/20 border border-purple-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{slot.time}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                slot.availability === 'High'
                  ? 'bg-green-500/20 text-green-400'
                  : slot.availability === 'Medium'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-orange-500/20 text-orange-400'
              }`}>
                {slot.availability}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{slot.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
