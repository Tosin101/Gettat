'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/home/Sidebar'
import EventCard from '@/components/events/EventCard'
import { eventListings } from '@/data/events'

type GoldenTicketStatus = 'pending' | 'accepted' | 'declined'

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [goldenTicketStatus, setGoldenTicketStatus] =
    useState<GoldenTicketStatus>('pending')

  // localStorage only exists in the browser, so this has to run after
  // mount rather than during the initial render
  useEffect(() => {
    const stored = localStorage.getItem('golden-ticket-status')
    if (stored === 'accepted' || stored === 'declined') {
      setGoldenTicketStatus(stored)
    }
  }, [])

  // Real event data would say whether the event has actually started —
  // hardcoded false here since this card's data is still an example
  const eventHasStarted = false

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
        <h1 className="text-lg font-bold text-ink">Events · Lagos</h1>
      </div>

      <main className="mx-auto max-w-md px-6 pb-12">
        <div className="rounded-lg border border-accent-primary/40 bg-accent-soft p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-ink">Host your own event</p>
              <p className="mt-1 text-sm text-ink-muted">
                Invite your circle — 2 spots stay open for other Gehtta
                members, unless you go fully private.
              </p>
            </div>
            <Link
              href="/events/host"
              className="shrink-0 rounded-pill bg-accent-primary px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              Create event
            </Link>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-muted">
          Every request is reviewed against the event requirements before a
          place is confirmed.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {eventListings.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}

          {goldenTicketStatus !== 'declined' && (
            <EventCard
              id={
                goldenTicketStatus === 'accepted'
                  ? eventHasStarted
                    ? 'waiting-room' // would be a live "meeting in progress" route once built
                    : 'waiting-room'
                  : 'golden-ticket'
              }
              name="Golden Ticket"
              subtitle="Gehtta invites you ❤️"
              detail="Tue 5:00 PM · limited time to accept"
              actionLabel={
                goldenTicketStatus === 'accepted'
                  ? eventHasStarted
                    ? 'Start'
                    : 'Join'
                  : 'View'
              }
              badgeColor="primary"
            />
          )}
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          City-locked to keep every date nearby.
        </p>
      </main>
    </>
  )
}