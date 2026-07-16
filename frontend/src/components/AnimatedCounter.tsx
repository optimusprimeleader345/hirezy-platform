'use client'

import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 500, className = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (value !== displayValue) {
      setIsAnimating(true)
      const increment = value > displayValue ? 1 : -1
      const totalSteps = Math.abs(value - displayValue)
      const stepDuration = duration / totalSteps

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayValue(prev => {
            const next = prev + increment
            if ((increment > 0 && next >= value) || (increment < 0 && next <= value)) {
              clearInterval(interval)
              setIsAnimating(false)
              return value
            }
            return next
          })
        }, stepDuration)
      }, 50)

      return () => clearTimeout(timer)
    }
  }, [value, duration, displayValue])

  return (
    <span className={`${className} ${isAnimating ? 'text-green-400 font-semibold' : 'text-white'}`}>
      {displayValue.toLocaleString()}
    </span>
  )
}
