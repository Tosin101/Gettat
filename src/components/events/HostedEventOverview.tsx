'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Link2,
  MessageCircle,
  Copy,
  Pencil,
  CalendarCheck,
  Plus,
} from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import EventCountdown from '@/components/events/EventCountdown'

type Guest = {
  name: string
  gender: 'male' | 'female'
}

// Only confirmed guests are shown here — people who haven't joined yet
// don't get a card, they're just counted in the "left" total below.
const guests: Guest[] = [
  { name: 'Ada', gender: 'female' },
  { name: 'Tomi', gender: 'male' },
  { name: 'Zainab', gender: 'female' },
  { name: 'Kelechi', gender: 'male' },
]
const seatsLeft = 2

// Your exact values — both already matched existing brand tokens, so no
// new colors needed: female = accent-primary, male = accent-mid
const genderBg = { female: 'bg-accent-primary', male: 'bg-accent-mid' }

export default function HostedEventOverview() {
  const [stage, setStage] = useState<'just-published' | 'live'>(
    'just-published'
  )
  const [copied, setCopied] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [targetTime] = useState(
    () => Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000
  )

  const link = 'gehtta.com/c/lila-8m2k'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${link}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can fail (permissions, unsupported browser) —
      // fails quietly rather than breaking the page
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    `Join my Gehtta event: https://${link}`
  )}`

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AuthHeader
        title="Hosted event"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <main className="mx-auto max-w-md px-6 py-8">
        {/* TEMPORARY preview toggle — delete once this page reads a real
            event's actual state instead of two hardcoded examples */}
        <div className="mb-6 flex gap-2 rounded-md bg-accent-soft/40 p-2 text-xs">
          <button
            type="button"
            onClick={() => setStage('just-published')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              stage === 'just-published'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Just published
          </button>
          <button
            type="button"
            onClick={() => setStage('live')}
            className={`flex-1 rounded-pill px-3 py-1 ${
              stage === 'live'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Live, filling up
          </button>
        </div>

        {stage === 'just-published' ? (
          <div className="text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
              <Link2 size={28} className="text-accent-primary" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-ink">
              Your unlisted link is ready
            </h2>

            <div className="mt-6 rounded-md border border-accent-mid bg-white px-4 py-3 text-left text-sm text-ink">
              {link}
            </div>

            {/* One unified card: 2-column stats on top, divider, then
                the explanatory line below — not two separate boxes */}
            <div className="mt-4 rounded-lg border border-accent-mid bg-white text-left">
              <div className="grid grid-cols-2 divide-x divide-accent-mid/30">
                <div className="p-4">
                  <p className="text-xs text-ink-muted">Places</p>
                  <p className="mt-1 font-semibold text-ink">
                    6 friends · 2 request places
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-ink-muted">Event time</p>
                  <p className="mt-1 font-semibold text-ink">
                    Sat · 7:30 PM
                  </p>
                </div>
              </div>
              <div className="border-t border-accent-mid/30 p-4">
                <p className="text-sm text-ink-muted">
                  You can update your invite list before check-in.
                  Requests must meet the event requirements.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 rounded-lg border border-accent-mid bg-white py-4 text-sm font-medium text-ink"
              >
                <MessageCircle size={20} className="text-accent-primary" />
                WhatsApp
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="flex flex-col items-center gap-2 rounded-lg border border-accent-mid bg-white py-4 text-sm font-medium text-ink"
              >
                <Copy size={20} className="text-accent-primary" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <Link
                href="/events/host"
                className="flex flex-col items-center gap-2 rounded-lg border border-accent-mid bg-white py-4 text-sm font-medium text-ink"
              >
                <Pencil size={20} className="text-accent-primary" />
                Edit
              </Link>
            </div>

            {/* Soft white card with a real shadow, not a flat gray box */}
            <div className="mt-8 rounded-lg bg-white p-5 text-center text-sm text-ink-muted shadow-soft">
              Anyone with this link can join; it&apos;s your event, so
              gate-keep it.
            </div>
          </div>
        ) : (
          <div>
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft">
              <CalendarCheck size={28} className="text-accent-primary" />
            </span>
            <h2 className="mt-5 text-center text-xl font-bold text-ink">
              Your event is live.
            </h2>

            <div className="mt-6 rounded-lg border border-accent-mid bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  ● Active
                </span>
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-medium text-ink">
                  <EventCountdown targetTime={targetTime} />
                </span>
              </div>
              <p className="mt-3 font-semibold text-ink">Sat · 7:30 PM</p>
              <p className="text-sm text-ink-muted">Lagos city.</p>
            </div>

            <div className="mt-4 rounded-lg border border-accent-mid bg-white p-4">
              <div className="flex items-center gap-2">
                {guests.map((g) => (
                  <span
                    key={g.name}
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${genderBg[g.gender]}`}
                  >
                    <Logo variant="icon" height={18} bare />
                  </span>
                ))}
                <button
                  type="button"
                  aria-label="Invite more guests"
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-dashed border-accent-mid text-accent-primary"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="mt-3 text-sm text-ink-muted">
                {guests.length} confirmed · {seatsLeft} left · 2 gehtta
              </p>
              <p className="mt-1 text-xs text-ink-muted">
                Every request is reviewed against the event requirements
                before a place is confirmed. You can invite more.
              </p>
            </div>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-ink-muted">
              Guest list
            </h3>
            <div className="rounded-lg border border-accent-mid bg-white px-4">
              {guests.map((guest) => (
                <div
                  key={guest.name}
                  className="flex items-center justify-between border-b border-accent-mid/20 py-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full ${genderBg[guest.gender]}`}
                    >
                      <Logo variant="icon" height={18} bare />
                    </span>
                    <span className="font-medium text-ink">
                      {guest.name}
                    </span>
                  </div>
                  <span className="rounded-pill bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Tap a guest to remove or replace them before check-in.
            </p>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-ink-muted">
              Event details
            </h3>
            <div className="rounded-lg border border-accent-mid bg-white p-4 text-sm">
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Start time</span>
                <span className="font-medium text-ink">Sat · 7:30 PM</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Location</span>
                <span className="font-medium text-ink">Lagos</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Age requirement</span>
                <span className="font-medium text-ink">27 and above</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Monthly salary</span>
                <span className="font-medium text-ink">₦0 – ₦100,000</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-muted">Request places</span>
                <span className="font-medium text-ink">8 people invited</span>
              </div>
              <Link
                href="/events/host"
                className="mt-2 inline-block text-sm font-semibold text-accent-primary"
              >
                Edit details →
              </Link>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 w-full"
            >
              Share invite link
            </a>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Friends with this link can RSVP; public places are filled
              through requests.
            </p>

            <button
              type="button"
              onClick={() => {
                confirm("Cancel this event? This can't be undone.")
              }}
              className="mt-4 w-full text-center text-sm font-medium text-red-500"
            >
              Cancel event
            </button>
          </div>
        )}
      </main>
    </>
  )
}