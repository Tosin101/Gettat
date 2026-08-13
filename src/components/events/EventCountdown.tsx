'use client'

import { useEffect, useState } from 'react'

export default function EventCountdown({ targetTime }: { targetTime: number }) {
  const [remainingMs, setRemainingMs] = useState(targetTime - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(targetTime - Date.now())
    }, 60000) // minute-level precision is enough here
    return () => clearInterval(interval)
  }, [targetTime])

  if (remainingMs <= 0) return <span>Starting now</span>

  const hours = Math.floor(remainingMs / (1000 * 60 * 60))
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <span>
      Starts in {hours}h {minutes}m
    </span>
  )
}
