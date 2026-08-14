'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import CyclingCaption from '@/components/events/CyclingCaption'
import TraitPicker from '@/components/onboarding/TraitPicker'

const RATING_TRAITS = ['Warm', 'Funny', 'Thoughtful', 'Confident']

const EXAMPLE_CAPTION =
  "Hi, I'm someone who laughs easily and listens closely. I grew up between two cities, and I think that's why I love a conversation that goes somewhere unexpected. On weekends you'll probably find me trying a new recipe or getting lost in a bookstore. I'm looking for someone who's curious about the world and doesn't take themselves too seriously."

// Real secret names instead of "Guest 1/2/3" — same names used in the
// hosted-event guest list, for consistency across the mock data
const FEMALE_GUESTS = ['Ada', 'Zainab', 'Amara']
const MALE_GUESTS = ['Tomi', 'Kelechi', 'Chidi']

const wavebarHeights = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65, 35, 85, 55, 70,
]

export default function MeetingSessionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewingAs, setViewingAs] = useState<'male' | 'female'>('female')
  const guestGender = viewingAs === 'male' ? 'female' : 'male'
  const guestNames = guestGender === 'female' ? FEMALE_GUESTS : MALE_GUESTS

  const [guestIndex, setGuestIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [rating, setRating] = useState<number | null>(null)
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [complete, setComplete] = useState(false)

  const currentName = guestNames[guestIndex]
  const introFinished = elapsed >= 60

  useEffect(() => {
    setElapsed(0)
  }, [guestIndex])

  useEffect(() => {
    if (complete || introFinished) return
    const interval = setInterval(() => {
      setElapsed((e) => (e < 60 ? e + 1 : e))
    }, 1000)
    return () => clearInterval(interval)
  }, [guestIndex, complete, introFinished])

  const handleSaveAndNext = () => {
    if (guestIndex + 1 >= guestNames.length) {
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
          {complete ? 'Session complete' : `Now listening · "${currentName}"`}
        </h1>
      </div>

      <main className="mx-auto max-w-md px-6 py-8">
        {complete ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-ink">
              Check your Matches section.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Others are still rating — results will be out in less than 6
              hours.
            </p>
            <Link href="/matches" className="btn-primary mt-6 inline-flex">
              Go to Matches
            </Link>
          </div>
        ) : (
          <>
            {/* TEMPORARY preview toggle — remove once real auth/gender
                data exists */}
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

              <div className="mt-6 flex h-12 items-center justify-center gap-1">
                {wavebarHeights.map((height, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-accent-primary ${
                      introFinished ? '' : 'animate-wave-bar'
                    }`}
                    style={{ height: `${height}%`, animationDelay: `${i * 0.05}s` }}
                  />
                ))}
              </div>

              <p className="mt-2 text-sm font-medium text-ink-muted">
                {introFinished ? 'Intro finished' : `${formatTime(elapsed)} / 1:00`}
              </p>
            </div>

            <div className="mt-6 rounded-lg bg-white p-4 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Auto-translated caption
              </p>
              <div className="mt-2">
                <CyclingCaption text={EXAMPLE_CAPTION} paused={introFinished} />
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