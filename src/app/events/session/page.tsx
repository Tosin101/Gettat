'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import CyclingCaption from '@/components/events/CyclingCaption'
import TraitPicker from '@/components/onboarding/TraitPicker'

const RATING_TRAITS = ['Warm', 'Funny', 'Thoughtful', 'Confident']

// Example transcript, long enough to actually show the caption cycling
const EXAMPLE_CAPTION =
  "Hi, I'm someone who laughs easily and listens closely. I grew up between two cities, and I think that's why I love a conversation that goes somewhere unexpected. On weekends you'll probably find me trying a new recipe or getting lost in a bookstore. I'm looking for someone who's curious about the world and doesn't take themselves too seriously."

// No real session/guest data yet — a small mock list stands in
const SESSION_SIZE = 3

const wavebarHeights = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65, 35, 85, 55, 70,
]

export default function MeetingSessionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TEMPORARY — stands in for the real signed-in user's gender until
  // auth exists. Determines who you're rating: each gender rates every
  // guest of the opposite gender.
  const [viewingAs, setViewingAs] = useState<'male' | 'female'>('female')
  const guestGender = viewingAs === 'male' ? 'female' : 'male'

  const [guestIndex, setGuestIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [rating, setRating] = useState<number | null>(null)
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    setElapsed(0)
  }, [guestIndex])

  useEffect(() => {
    if (complete) return
    const interval = setInterval(() => {
      setElapsed((e) => (e < 60 ? e + 1 : e))
    }, 1000)
    return () => clearInterval(interval)
  }, [guestIndex, complete])

  const handleSaveAndNext = () => {
    if (guestIndex + 1 >= SESSION_SIZE) {
      setComplete(true)
    } else {
      setGuestIndex((i) => i + 1)
      setRating(null)
      setSelectedTraits([])
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

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
        <h1 className="text-lg font-bold text-ink">
          {complete ? 'Session complete' : `Now listening · Guest ${guestIndex + 1}`}
        </h1>
      </div>

      <main className="mx-auto max-w-md px-6 py-8">
        {complete ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-ink">
              You&apos;ve rated everyone in this session.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Your matches will show up on Home once results are ready.
            </p>
            <a href="/home" className="btn-primary mt-6 inline-flex">
              Back to Home
            </a>
          </div>
        ) : (
          <>
            {/* TEMPORARY — lets you preview both rating directions before
                real auth/gender data exists. Remove once a signed-in
                user's real gender drives this instead. */}
            <div className="mb-6 flex gap-2 rounded-md bg-accent-soft/40 p-2 text-xs">
              <button
                type="button"
                onClick={() => setViewingAs('female')}
                className={`flex-1 rounded-pill px-3 py-1 ${
                  viewingAs === 'female'
                    ? 'bg-accent-primary text-white'
                    : 'text-ink-muted'
                }`}
              >
                Viewing as woman (rating men)
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
                Viewing as man (rating women)
              </button>
            </div>

            <div className="flex flex-col items-center">
              <span
                className={`flex h-24 w-24 items-center justify-center rounded-full ${
                  guestGender === 'female' ? 'bg-accent-primary' : 'bg-accent-mid'
                }`}
              >
                <Logo variant="icon" height={48} bare />
              </span>

              {/* Simulated — no real audio for other members' intros yet,
                  so this is a visual approximation of "listening in
                  progress," not actual playback */}
              <div className="mt-6 flex h-12 items-center justify-center gap-1">
                {wavebarHeights.map((height, i) => (
                  <span
                    key={i}
                    className="w-1 animate-wave-bar rounded-full bg-accent-primary"
                    style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>

              <p className="mt-2 text-sm font-medium text-ink-muted">
                {formatTime(elapsed)} / 1:00
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Auto-translated caption
              </p>
              <div className="mt-2">
                <CyclingCaption text={EXAMPLE_CAPTION} />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 text-sm font-semibold text-ink">
                Rate on personality
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      rating === num
                        ? 'bg-accent-primary text-white'
                        : 'bg-accent-soft text-ink-muted'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <TraitPicker
                  options={RATING_TRAITS}
                  selected={selectedTraits}
                  onChange={setSelectedTraits}
                />
              </div>
            </div>

            <button
              type="button"
              disabled={rating === null}
              onClick={handleSaveAndNext}
              className="btn-primary mt-10 w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save rating &amp; next
            </button>
          </>
        )}
      </main>
    </>
  )
}
