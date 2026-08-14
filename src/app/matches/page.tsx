'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Heart } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'

type Match = {
  name: string
  gender: 'male' | 'female'
  yourRating: number
  traits: string[]
  callStatus: 'not-scheduled' | 'scheduled'
  scheduledSlot?: string
}

// Example data — no backend yet to compute real mutual matches from
// actual session ratings
const matches: Match[] = [
  {
    name: 'Kwame',
    gender: 'male',
    yourRating: 9,
    traits: ['Funny', 'Confident'],
    callStatus: 'scheduled',
    scheduledSlot: 'Thu 6 PM',
  },
  {
    name: 'Zainab',
    gender: 'female',
    yourRating: 8,
    traits: ['Warm', 'Thoughtful'],
    callStatus: 'not-scheduled',
  },
]

export default function MatchesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // TEMPORARY preview toggle — remove once this reads a real result
  // instead of two hardcoded example outcomes
  const [hasMatches, setHasMatches] = useState(true)
  const ratedCount = 3

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
        <h1 className="text-lg font-bold text-ink">Matches</h1>
      </div>

      <main className="mx-auto max-w-md px-6 pb-12">
        {/* TEMPORARY preview toggle */}
        <div className="mb-6 flex gap-2 rounded-md bg-accent-soft/40 p-2 text-xs">
          <button
            type="button"
            onClick={() => setHasMatches(true)}
            className={`flex-1 rounded-pill px-3 py-1 ${
              hasMatches ? 'bg-accent-primary text-white' : 'text-ink-muted'
            }`}
          >
            Has mutual matches
          </button>
          <button
            type="button"
            onClick={() => setHasMatches(false)}
            className={`flex-1 rounded-pill px-3 py-1 ${
              !hasMatches ? 'bg-accent-primary text-white' : 'text-ink-muted'
            }`}
          >
            No mutual match
          </button>
        </div>

        {!hasMatches ? (
          <div className="mt-16 text-center">
            <Heart size={40} className="mx-auto text-accent-mid" />
            <h2 className="mt-6 text-xl font-bold text-ink">
              No mutual choice this time.
            </h2>
            <p className="mt-3 text-ink-muted">
              That&apos;s completely okay — the right Circle is worth
              waiting for. You rated {ratedCount} people tonight.
            </p>
            <Link href="/events" className="btn-primary mt-8 inline-flex">
              Find my next event
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {matches.map((match) => (
              <div
                key={match.name}
                className="rounded-lg border border-accent-mid bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      match.gender === 'female'
                        ? 'bg-accent-primary'
                        : 'bg-accent-mid'
                    }`}
                  >
                    <Logo variant="icon" height={24} bare />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">
                      &ldquo;{match.name}&rdquo;
                    </p>
                    <p className="text-xs text-ink-muted">
                      {match.callStatus === 'scheduled'
                        ? `Call: ${match.scheduledSlot}`
                        : 'Call: Not scheduled'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-ink-muted">
                  <span>Your rating: {match.yourRating}/10</span>
                  <span>{match.traits.join(', ')}</span>
                </div>

                {match.callStatus === 'scheduled' ? (
                  <Link
                    href="/matches/call"
                    className="btn-primary mt-4 w-full"
                  >
                    Join call
                  </Link>
                ) : (
                  <Link
                    href="/matches/schedule"
                    className="btn-primary mt-4 w-full"
                  >
                    Schedule call
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
