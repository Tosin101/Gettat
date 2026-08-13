'use client'

import { useState } from 'react'
import { Menu, Clock } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import WaitingRoomCountdown from '@/components/events/WaitingRoomCountdown'

const guests: Array<'female' | 'male'> = [
  'female',
  'female',
  'male',
  'female',
  'male',
  'male',
]

export default function WaitingRoomPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [canStart, setCanStart] = useState(false)
  // Example target — a real one would come from the actual event's start
  // time. Set to 2:14 here to match the design.
  const [targetTime] = useState(() => Date.now() + 2 * 60 * 1000 + 14 * 1000)

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex items-center gap-4 px-6 py-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} className="text-ink" />
        </button>
        <h1 className="text-lg font-bold text-ink">Waiting room</h1>
      </div>

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <span className="mx-auto inline-flex items-center gap-2 rounded-pill bg-accent-soft px-4 py-2 text-sm font-semibold text-ink">
          <Clock size={16} className="text-accent-primary" />
          {canStart ? (
            'Starting now'
          ) : (
            <>
              Starts in{' '}
              <WaitingRoomCountdown
                targetTime={targetTime}
                onComplete={() => setCanStart(true)}
              />
            </>
          )}
        </span>

        <p className="mt-4 text-sm text-ink-muted">
          {guests.length} guests · everyone masked until you choose
        </p>

        <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6">
          {guests.map((gender, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  gender === 'female' ? 'bg-accent-primary' : 'bg-accent-mid'
                }`}
              >
                <Logo variant="icon" height={30} bare />
              </span>
              <span className="text-sm text-ink-muted">Guest {i + 1}</span>
            </div>
          ))}
        </div>

        {/* Improved copy per your ask — "Start meeting people" instead
            of a bare "Start" */}
        <button
          type="button"
          disabled={!canStart}
          className="btn-primary mt-10 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start meeting people
        </button>
        <p className="mt-3 text-sm text-ink-muted">
          You&apos;ll listen first, then rate on personality.
        </p>
      </main>
    </>
  )
}
