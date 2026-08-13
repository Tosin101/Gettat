'use client'

import { useEffect, useState } from 'react'

export default function InviteCountdown({ deadline }: { deadline: number }) {
  const [remaining, setRemaining] = useState(deadline - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(deadline - Date.now())
    }, 30000)
    return () => clearInterval(interval)
  }, [deadline])

  if (remaining <= 0) return <span>This invite has expired.</span>

  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <span>
      Expires in {hours}h {minutes}m — respond soon.
    </span>
  )
}
