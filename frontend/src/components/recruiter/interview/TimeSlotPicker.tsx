'use client'

import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

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
  // Mock time slots for different times of day
  const morningSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
  const afternoonSlots = ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM']
  const eveningSlots = ['4:00 PM', '4:30 PM', '5:00 PM']

  const allSlots = [
    ...morningSlots.map(slot => ({ time: slot, period: 'morning' })),
    ...afternoonSlots.map(slot => ({ time: slot, period: 'afternoon' })),
    ...eveningSlots.map(slot => ({ time: slot, period: 'evening' }))
  ]

  return (
    <Card className="bg-[#1A1D21] border border-[#23262B] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-[#3EFFA8]" />
        <h3 className="text-lg font-medium text-[#FFFFFF]">Available Time Slots</h3>
      </div>

      {/* Morning slots */}
      <div className="mb-4">
        <h4 className="text-[#FFD700] text-sm font-medium mb-3">Morning (9 AM - 12 PM)</h4>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {morningSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeSlotSelect(time)}
              className={`p-2 rounded-lg border text-sm transition-all ${
                selectedTimeSlot === time
                  ? 'bg-[#3EFFA8] text-black border-[#3EFFA8]'
                  : 'bg-[#111315] hover:bg-[#23262B] border-[#23262B] text-[#E2E8F0]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Afternoon slots */}
      <div className="mb-4">
        <h4 className="text-[#FFD700] text-sm font-medium mb-3">Afternoon (1 PM - 4 PM)</h4>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {afternoonSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeSlotSelect(time)}
              className={`p-2 rounded-lg border text-sm transition-all ${
                selectedTimeSlot === time
                  ? 'bg-[#3EFFA8] text-black border-[#3EFFA8]'
                  : 'bg-[#111315] hover:bg-[#23262B] border-[#23262B] text-[#E2E8F0]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Evening slots */}
      <div>
        <h4 className="text-[#FFD700] text-sm font-medium mb-3">Evening (4 PM - 6 PM)</h4>
        <div className="grid grid-cols-3 gap-2">
          {eveningSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeSlotSelect(time)}
              className={`p-2 rounded-lg border text-sm transition-all ${
                selectedTimeSlot === time
                  ? 'bg-[#3EFFA8] text-black border-[#3EFFA8]'
                  : 'bg-[#111315] hover:bg-[#23262B] border-[#23262B] text-[#E2E8F0]'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {selectedTimeSlot && (
        <div className="mt-6 p-4 bg-[#111315] border border-[#3EFFA8] border-opacity-30 rounded-lg">
          <div className="text-sm text-[#C9CFD6]">Selected Interview Time:</div>
          <div className="text-[#3EFFA8] font-medium text-lg">
            {selectedTimeSlot}
          </div>
          <div className="text-[#8A8F98] text-sm mt-1">
            Duration: 60 minutes (with 15 min buffer)
          </div>
        </div>
      )}
    </Card>
  )
}
