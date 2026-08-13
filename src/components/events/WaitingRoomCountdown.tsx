'use client'

import { useEffect, useState } from 'react'

type Props = {
  targetTime: number
  onComplete?: () => void
}

export default function WaitingRoomCountdown({ targetTime, onComplete }: Props) {
  const [remaining, setRemaining] = useState(Math.max(0, targetTime - Date.now()))

  useEffect(() => {
    const interval = setInterval(() => {
      const next = targetTime - Date.now()
      if (next <= 0) {
        setRemaining(0)
        onComplete?.()
        clearInterval(interval)
      } else {
        setRemaining(next)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [targetTime, onComplete])

  const totalSeconds = Math.ceil(remaining / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <span>
      {minutes}:{seconds.toString().padStart(2, '0')}
    </span>
  )
}
