'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/home/Sidebar'
import EventCard from '@/components/events/EventCard'
import { eventListings } from '@/data/events'

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        {/* "Lagos" is hardcoded until real location data exists */}
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
            {/* Hosted-event creation screen isn't built yet */}
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

          {/* Golden Ticket — a user-hosted event with 2 seats (1 male,
              1 female) reserved for Gehtta to fill with an eligible
              stranger. Structurally different from the 3 above, so it
              skips the seats-left format entirely. */}
          <EventCard
            id="golden-ticket"
            name="Golden Ticket"
            subtitle="Gehtta invites you ❤️"
            detail="Tue 5:00 PM · limited time to accept"
            actionLabel="View"
            badgeColor="primary"
          />
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          City-locked to keep every date nearby.
        </p>
      </main>
    </>
  )
}
