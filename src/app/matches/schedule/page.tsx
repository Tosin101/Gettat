'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarCheck, Clock } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

const SLOTS = [
  { id: 'wed-7pm', label: 'Wed 7 PM' },
  { id: 'thu-6pm', label: 'Thu 6 PM' },
  { id: 'thu-8pm', label: 'Thu 8 PM' },
  { id: 'fri-7pm', label: 'Fri 7 PM' },
]

// Mock — stands in for the other person's proposed time, which would
// come from real backend data once scheduling is wired up
const THEIR_SUGGESTED_SLOT = 'thu-6pm'

export default function ScheduleCallPage() {
  const router = useRouter()
  const [selected, setSelected] = useState(THEIR_SUGGESTED_SLOT)
  const bothConfirmed = selected === THEIR_SUGGESTED_SLOT
  const selectedLabel = SLOTS.find((s) => s.id === selected)?.label ?? ''

  const handleConfirm = () => {
    localStorage.setItem('call-status', 'scheduled')
    localStorage.setItem('call-scheduled-slot', selectedLabel)
    router.push('/matches')
  }

  return (
    <>
      <AuthHeader title="Schedule your call" backHref="/matches" />

      <main className="mx-auto max-w-md px-6 py-8">
        <p className="text-sm text-ink-muted">
          Pick a slot that works for you both.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {SLOTS.map((slot) => {
            const isSelected = selected === slot.id
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelected(slot.id)}
                className={`rounded-lg border-2 bg-white px-4 py-4 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-accent-primary bg-accent-soft text-ink'
                    : 'border-accent-mid text-ink-muted'
                }`}
              >
                {slot.label}
              </button>
            )
          })}
        </div>

        {bothConfirmed ? (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-4 shadow-soft">
            <CalendarCheck size={20} className="shrink-0 text-accent-primary" />
            <p className="text-sm text-ink">
              Both of you confirmed {selectedLabel}
            </p>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-white p-4 shadow-soft">
            <Clock size={20} className="shrink-0 text-accent-primary" />
            <p className="text-sm text-ink">
              Waiting for the other person to confirm {selectedLabel}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          className="btn-primary mt-10 w-full"
        >
          Confirm call
        </button>
      </main>
    </>
  )
}
