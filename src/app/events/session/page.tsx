'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import CyclingCaption from '@/components/events/CyclingCaption'
import TraitPicker from '@/components/onboarding/TraitPicker'

const RATING_TRAITS = ['Warm', 'Funny', 'Thoughtful', 'Confident']

type SessionGuest = { name: string; caption: string }

// Each guest has their own intro now, not a shared one
const FEMALE_GUESTS: SessionGuest[] = [
  {
    name: 'Ada',
    caption:
      "Hi, I'm someone who laughs easily and listens closely. I grew up between two cities, and I think that's why I love a conversation that goes somewhere unexpected. On weekends you'll find me trying a new recipe or lost in a bookstore.",
  },
  {
    name: 'Zainab',
    caption:
      "I'm the friend who remembers small details and shows up early. I studied architecture, so I notice buildings more than most people would like. I'm looking for someone who's kind first and interesting second.",
  },
  {
    name: 'Amara',
    caption:
      "People say I'm the calm one in every group. I've lived in three countries and I still can't pick a favorite. I love long walks, longer conversations, and I'm terrible at small talk on purpose.",
  },
]

const MALE_GUESTS: SessionGuest[] = [
  {
    name: 'Tomi',
    caption:
      "I run a small logistics business and I'm probably the most organized person you'll meet tonight. I play football badly but enthusiastically every Saturday. I want someone who'll laugh at my jokes even when they're not that good.",
  },
  {
    name: 'Kelechi',
    caption:
      "I'm an architect who thinks too much about how spaces make people feel. I read more nonfiction than I probably should. Looking for someone who's curious, a little stubborn, and doesn't mind losing an argument gracefully.",
  },
  {
    name: 'Chidi',
    caption:
      "I write for a living, so I notice words more than most. I make a very good jollof rice and I will not be taking questions about the recipe. I'm looking for someone who's warm, direct, and easy to talk to.",
  },
]

const wavebarHeights = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65, 35, 85, 55, 70,
]

export default function MeetingSessionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewingAs, setViewingAs] = useState<'male' | 'female'>('female')
  const guestGender = viewingAs === 'male' ? 'female' : 'male'
  const guests = guestGender === 'female' ? FEMALE_GUESTS : MALE_GUESTS

  const [guestIndex, setGuestIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [rating, setRating] = useState<number | null>(null)
  const [selectedTraits, setSelectedTraits] = useState<string[]>([])
  const [complete, setComplete] = useState(false)

  const currentGuest = guests[guestIndex]
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
    if (guestIndex + 1 >= guests.length) {
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
          {complete ? 'Session complete' : `Now listening · ${currentGuest.name}`}
        </h1>
      </div>

      <main className="mx-auto max-w-md px-6 py-8">
        {complete ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-bold text-ink">
              Check your Matches section.
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Others are still rating — results will be out in less than 1
              hour.
            </p>
            <Link href="/matches" className="btn-primary mt-6 inline-flex">
              Go to Matches
            </Link>
          </div>
        ) : (
          <>
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
                <CyclingCaption
                  text={currentGuest.caption}
                  paused={introFinished}
                />
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