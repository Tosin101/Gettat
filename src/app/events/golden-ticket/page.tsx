'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Ticket } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import InviteCountdown from '@/components/events/InviteCountdown'

const ACCEPT_WINDOW_MS = 2 * 60 * 60 * 1000 // 2 hours, per your rule

// Alternating for the small avatar row — real data would come from who's
// actually already in the circle
const previewGuests: Array<'female' | 'male'> = ['male', 'female', 'male', 'female']

export default function GoldenTicketPage() {
  const router = useRouter()
  const [deadline] = useState(() => Date.now() + ACCEPT_WINDOW_MS)

  // No backend yet — using localStorage as a stand-in so the Events page
  // can reflect accept/decline status across page loads. Replace with a
  // real API call once one exists.
  const handleAccept = () => {
    localStorage.setItem('golden-ticket-status', 'accepted')
    router.push('/events')
  }

  const handleReject = () => {
    if (confirm('Reject this invite? You can lose your place in this circle.')) {
      localStorage.setItem('golden-ticket-status', 'declined')
      router.push('/events')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-accent-soft via-accent-mid to-accent-primary px-6 py-12 text-center">
      <Ticket size={40} className="text-ink/70" />

      <h1 className="mt-4 text-2xl font-bold text-ink">
        Golden Ticket Circle
      </h1>

      <div className="card-glass mt-6 w-full max-w-sm">
        <p className="text-ink-muted">
          An invite-only evening for members with a standout inner-circle.
        </p>

        <div className="mt-5 flex justify-center gap-2">
          {previewGuests.map((gender, i) => (
            <span
              key={i}
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                gender === 'female' ? 'bg-accent-primary' : 'bg-accent-mid'
              }`}
            >
              <Logo variant="icon" height={20} bare />
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm text-ink-muted">
          Sat 7:30 PM · 4 seats left
        </p>
      </div>

      {/* The 2-hour deadline itself is built and live below. The 3
          reminder notifications during this window need a backend job
          scheduler — can't be faked in frontend-only code, since it has
          to fire even if the app isn't open. */}
      <p className="mt-4 text-sm text-ink/70">
        <InviteCountdown deadline={deadline} />
      </p>

      <button
        type="button"
        onClick={handleAccept}
        className="btn-primary mt-6 w-full max-w-sm"
      >
        Accept your invite
      </button>
      <button
        type="button"
        onClick={handleReject}
        className="mt-3 text-sm font-medium text-red-500"
      >
        Reject Invite
      </button>
    </main>
  )
}
