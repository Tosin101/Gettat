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
  callStatus: 'not-scheduled' | 'proposed-by-them' | 'scheduled'
  scheduledSlot?: string
}

// Split by the match's own gender so it's structurally impossible to
// show a same-gender match — each list only ever gets shown to the
// opposite-gender viewer below.
const matchesForWomen: Match[] = [
  {
    name: 'Kwame',
    gender: 'male',
    yourRating: 9,
    traits: ['Funny', 'Confident'],
    callStatus: 'scheduled',
    scheduledSlot: 'Thu 6 PM',
  },
  {
    name: 'Tunde',
    gender: 'male',
    yourRating: 7,
    traits: ['Thoughtful'],
    callStatus: 'proposed-by-them',
  },
  {
    name: 'Chidi',
    gender: 'male',
    yourRating: 8,
    traits: ['Warm'],
    callStatus: 'not-scheduled',
  },
]

const matchesForMen: Match[] = [
  {
    name: 'Zainab',
    gender: 'female',
    yourRating: 9,
    traits: ['Warm', 'Thoughtful'],
    callStatus: 'scheduled',
    scheduledSlot: 'Thu 6 PM',
  },
  {
    name: 'Amara',
    gender: 'female',
    yourRating: 7,
    traits: ['Curious'],
    callStatus: 'proposed-by-them',
  },
  {
    name: 'Ada',
    gender: 'female',
    yourRating: 8,
    traits: ['Funny'],
    callStatus: 'not-scheduled',
  },
]

type ViewState = 'new-user' | 'no-mutual' | 'has-matches'

export default function MatchesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TEMPORARY — stands in for the real signed-in user's gender until
  // auth exists. Matches shown are always the opposite gender of this.
  const [viewingAs, setViewingAs] = useState<'male' | 'female'>('female')
  const matches = viewingAs === 'female' ? matchesForWomen : matchesForMen

  // Default is 'new-user' — a brand new user who hasn't attended an
  // event or matched with anyone yet sees this same no-mutual layout,
  // per your note. The toggle lets you preview all 3 real scenarios.
  const [viewState, setViewState] = useState<ViewState>('new-user')
  const ratedCount = viewState === 'no-mutual' ? 3 : 0

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
        <div className="mb-3 flex gap-2 rounded-md bg-accent-soft/40 p-2 text-xs">
          <button
            type="button"
            onClick={() => setViewingAs('female')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              viewingAs === 'female'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Viewing as woman
          </button>
          <button
            type="button"
            onClick={() => setViewingAs('male')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              viewingAs === 'male'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Viewing as man
          </button>
        </div>

        <div className="mb-6 flex gap-2 rounded-md bg-accent-soft/40 p-2 text-xs">
          <button
            type="button"
            onClick={() => setViewState('new-user')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              viewState === 'new-user'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            New user (default)
          </button>
          <button
            type="button"
            onClick={() => setViewState('no-mutual')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              viewState === 'no-mutual'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Attended, no mutual
          </button>
          <button
            type="button"
            onClick={() => setViewState('has-matches')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              viewState === 'has-matches'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Has matches
          </button>
        </div>

        {viewState !== 'has-matches' ? (
          <div className="mt-16 text-center">
            <Heart size={40} className="mx-auto text-accent-mid" />
            <h2 className="mt-6 text-xl font-bold text-ink">
              No mutual choice this time.
            </h2>
            <p className="mt-3 text-ink-muted">
              {ratedCount > 0
                ? `That's completely okay — the right Circle is worth waiting for. You rated ${ratedCount} people tonight.`
                : "That's completely okay — the right Circle is worth waiting for. Join your first event to get started."}
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
                    <p className="font-semibold text-ink">{match.name}</p>
                    <p className="text-xs text-ink-muted">
                      {match.callStatus === 'scheduled' && `Call: ${match.scheduledSlot}`}
                      {match.callStatus === 'proposed-by-them' && 'Call: They suggested a time'}
                      {match.callStatus === 'not-scheduled' && 'Call: Not scheduled'}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-ink-muted">
                  <span>Your rating: {match.yourRating}/10</span>
                  <span>{match.traits.join(', ')}</span>
                </div>

                {match.callStatus === 'scheduled' && (
                  <Link href="/matches/call" className="btn-primary mt-4 w-full">
                    Join call
                  </Link>
                )}
                {match.callStatus === 'proposed-by-them' && (
                  <Link
                    href="/matches/schedule/review"
                    className="btn-primary mt-4 w-full"
                  >
                    Review & respond
                  </Link>
                )}
                {match.callStatus === 'not-scheduled' && (
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