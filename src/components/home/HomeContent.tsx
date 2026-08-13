'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Bell, Clock, CreditCard, CalendarPlus } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import Sidebar from '@/components/home/Sidebar'
import EventCard from '@/components/events/EventCard'
import { eventListings } from '@/data/events'

type PreviewMode = 'active' | 'new-with-events' | 'new-no-events'

const actionItems = [
  {
    icon: Clock,
    text: 'Your match wants to reveal — respond soon.',
    badge: '6h left',
  },
  {
    icon: CreditCard,
    text: 'Complete your payment to lock your reservation.',
    badge: 'Pending',
  },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function HomeContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // TEMPORARY — lets you preview how the page looks for different users
  // before real auth/backend data exists. Delete this whole toggle (and
  // the branching it drives below) once the home page reads from real
  // user/event/match data instead.
  const [previewMode, setPreviewMode] = useState<PreviewMode>('active')

  const secretName = 'Lila'
  const isActive = previewMode === 'active'

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} className="text-ink" />
        </button>

        <Logo variant="full" height={26} />

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft"
        >
          <Bell size={18} className="text-accent-primary" />
          {isActive && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-400" />
          )}
        </button>
      </div>

      <main className="mx-auto max-w-md px-6 pb-12">
        {/* TEMPORARY preview toggle — delete with previewMode above */}
        <div className="mb-4 flex gap-2 overflow-x-auto rounded-md bg-accent-soft/40 p-2 text-xs">
          <button
            type="button"
            onClick={() => setPreviewMode('active')}
            className={`shrink-0 rounded-pill px-3 py-1 ${
              previewMode === 'active'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            Active user
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('new-with-events')}
            className={`shrink-0 rounded-pill px-3 py-1 ${
              previewMode === 'new-with-events'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            New user, events nearby
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('new-no-events')}
            className={`shrink-0 rounded-pill px-3 py-1 ${
              previewMode === 'new-no-events'
                ? 'bg-accent-primary text-white'
                : 'text-ink-muted'
            }`}
          >
            New user, no events
          </button>
        </div>

        <div className="card-glass">
          <p className="text-sm text-ink-muted">
            {getGreeting()}, {secretName}
          </p>
          {isActive ? (
            <>
              <h2 className="mt-1 text-xl font-bold text-ink">
                You rated 6 people last night.
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                2 people you chose also chose you.
              </p>
            </>
          ) : (
            <h2 className="mt-1 text-xl font-bold text-ink">
              Welcome to Gehtta.
            </h2>
          )}
        </div>

        {isActive && (
          <section className="mt-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
              Action
            </h3>
            <div className="flex flex-col gap-3">
              {actionItems.map((action) => (
                <button
                  key={action.text}
                  type="button"
                  className="flex items-center gap-3 rounded-lg border border-accent-mid/50 bg-white p-4 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                    <action.icon size={18} className="text-accent-primary" />
                  </span>
                  <span className="flex-1 text-sm text-ink">
                    {action.text}
                  </span>
                  <span className="shrink-0 rounded-pill bg-accent-soft px-2 py-1 text-xs font-medium text-ink">
                    {action.badge}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            {isActive ? 'Upcoming' : 'Events'}
          </h3>

          {isActive && (
            <div className="rounded-lg border border-accent-mid bg-white p-5">
              <p className="font-semibold text-ink">Classic Circle · Lagos</p>
              <p className="mt-1 text-sm text-ink-muted">
                Fri 8:00 PM · 6 guests
              </p>
              <button type="button" className="btn-primary mt-4">
                View roster
              </button>
            </div>
          )}

          {previewMode === 'new-with-events' && (
            <div className="flex flex-col gap-3">
              {/* Same real event data and card used on the full Events
                  page — just the first two tiers, as a preview */}
              {eventListings.slice(0, 2).map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}

          {previewMode === 'new-no-events' && (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-accent-mid bg-white p-6 text-center">
              <CalendarPlus size={24} className="text-accent-primary" />
              <p className="mt-3 font-semibold text-ink">
                No events near you right now.
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Be the first — host one and invite the people you want
                there.
              </p>
              <Link href="/events/host" className="btn-secondary mt-4">
                Host an event
              </Link>
            </div>
          )}
        </section>

        <section className="mt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Match status
          </h3>

          {isActive ? (
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg border border-accent-mid bg-white p-4 text-left"
            >
              <Logo variant="icon" height={40} />
              <div>
                <p className="font-semibold text-ink">
                  &ldquo;Kwame&rdquo; wants to talk
                </p>
                <p className="text-sm text-ink-muted">You chose him too</p>
              </div>
            </button>
          ) : (
            <div className="rounded-lg border border-accent-mid bg-white p-5 text-center">
              <p className="text-sm text-ink-muted">
                No matches yet — your next event could change that.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  )
}