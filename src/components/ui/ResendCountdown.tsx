'use client'

import { useEffect, useState } from 'react'

export default function ResendCountdown({ seconds = 24 }: { seconds?: number }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return
    const timer = setInterval(() => setRemaining((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [remaining])

  if (remaining <= 0) {
    return (
      <button type="button" className="text-sm font-semibold text-accent-primary">
        Resend code
      </button>
    )
  }

  return (
    <p className="text-sm text-ink-muted">
      Resend code in 0:{remaining.toString().padStart(2, '0')}
    </p>
  )
}
