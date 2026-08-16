'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PhoneOff } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const CALL_DURATION_SECONDS = 13 * 60

const ICEBREAKERS = [
  "What's a small thing that always makes your day better?",
  "What's something you're looking forward to this year?",
  "What's a place you'd love to visit someday?",
]

const wavebarHeights = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65, 35, 85, 55, 70,
]

export default function CallPage() {
  const router = useRouter()
  const [elapsed, setElapsed] = useState(0)
  const [isQuiet, setIsQuiet] = useState(false)
  const [icebreaker] = useState(
    () => ICEBREAKERS[Math.floor(Math.random() * ICEBREAKERS.length)]
  )

  useEffect(() => {
    if (elapsed >= CALL_DURATION_SECONDS) {
      router.push('/matches')
      return
    }
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(interval)
  }, [elapsed, router])

  useEffect(() => {
    // SIMULATED — real silence detection needs actual two-way audio and
    // voice-activity analysis through a real call provider (Twilio/
    // Daily.co per the PRD), not built yet. This fixed 60-second timer
    // stands in for "a minute of quiet" for demo purposes. Once quiet,
    // it stays that way here rather than trying to simulate talking
    // resuming, since there's no real audio to detect that from either.
    const timeout = setTimeout(() => setIsQuiet(true), 60000)
    return () => clearTimeout(timeout)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-ink px-6 py-16 text-center">
      <span className="flex h-28 w-28 items-center justify-center rounded-full bg-accent-primary">
        <Logo variant="icon" height={56} bare />
      </span>

      <p className="mt-4 text-lg font-bold text-white">Kwame</p>
      <p className="mt-1 text-sm text-white/60">
        Voice only · {formatTime(elapsed)}
      </p>

      <div
        className={`mt-8 flex h-12 items-center gap-1 transition-opacity ${
          isQuiet ? 'opacity-40' : ''
        }`}
      >
        {wavebarHeights.map((height, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-accent-primary ${
              isQuiet ? '' : 'animate-wave-bar'
            }`}
            style={{
              height: isQuiet ? '15%' : `${height}%`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {isQuiet && (
        <p className="mt-3 text-xs text-white/50 animate-text-fade-in">
          It&apos;s quiet — here&apos;s something to ask
        </p>
      )}

      <div className="flex-1" />

      {isQuiet && (
        <div className="mb-8 w-full max-w-xs rounded-lg bg-white/10 p-4 animate-text-fade-in">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
            Icebreaker
          </p>
          <p className="mt-2 text-sm text-white">
            &ldquo;{icebreaker}&rdquo;
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => router.push('/matches')}
        aria-label="End call"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500"
      >
        <PhoneOff size={26} className="text-white" />
      </button>
    </main>
  )
}