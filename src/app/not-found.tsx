'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

// Cycles every few seconds so this page isn't the same twice in a row —
// worth having some variety since it's likely to get hit a lot during dev.
const MESSAGES = [
  'This page is staying anonymous.',
  "Some connections just aren't meant to be.",
  "Looks like this one's still behind the mask.",
  'This page chose not to reveal itself.',
  "Even we're curious where this went.",
]

export default function NotFound() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent-primary/40 blur-2xl animate-glow-pulse" />
        <span className="relative animate-float-icon">
          <Logo variant="icon" height={72} />
        </span>
      </div>

      <p className="mt-8 animate-modal-pop-in font-display text-6xl font-bold text-ink">
        404
      </p>

      {/* key={index} forces React to remount this element on each change,
          which re-triggers the fade-in animation for the new message */}
      <p
        key={index}
        className="mt-4 h-6 text-ink-muted animate-text-fade-in"
      >
        {MESSAGES[index]}
      </p>

      {/* Links to the public landing page since there's no way to check
          real auth state yet to know if /home would be more appropriate */}
      <Link href="/" className="btn-primary mt-8">
        Back to safety
      </Link>
    </main>
  )
}
