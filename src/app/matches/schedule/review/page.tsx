'use client'

import { useRouter } from 'next/navigation'
import { CalendarClock } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

// Mock — would come from real backend data once scheduling is wired up
const PROPOSED_BY = 'Tunde'
const PROPOSED_SLOT = 'Fri, Aug 16 · 8:00 PM'

export default function ReviewSchedulePage() {
  const router = useRouter()

  const handleAccept = () => {
    localStorage.setItem('call-status', 'scheduled')
    localStorage.setItem('call-scheduled-slot', PROPOSED_SLOT)
    router.push('/matches')
  }

  const handleReschedule = () => {
    router.push('/matches/schedule')
  }

  return (
    <>
      <AuthHeader title="Review call time" backHref="/matches" />

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <p className="text-sm text-ink-muted">
          {PROPOSED_BY} suggested a time for your call.
        </p>

        <div className="mt-6 rounded-lg border border-accent-mid bg-white p-6">
          <CalendarClock size={28} className="mx-auto text-accent-primary" />
          <p className="mt-3 text-lg font-bold text-ink">{PROPOSED_SLOT}</p>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="btn-primary mt-8 w-full"
        >
          Accept this time
        </button>
        <button
          type="button"
          onClick={handleReschedule}
          className="btn-secondary mt-3 w-full"
        >
          Suggest a different time
        </button>
      </main>
    </>
  )
}
