'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

const TIME_OPTIONS = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']

function getDayOptions() {
  const days = []
  for (let i = 0; i < 3; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const label =
      i === 0
        ? 'Today'
        : i === 1
          ? 'Tomorrow'
          : date.toLocaleDateString('en-US', { weekday: 'short' })
    const dateLabel = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    days.push({ id: `day-${i}`, label, dateLabel })
  }
  return days
}

export default function ScheduleCallPage() {
  const router = useRouter()
  const [days] = useState(getDayOptions)
  const [selectedDay, setSelectedDay] = useState(days[0].id)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handlePropose = () => {
    const day = days.find((d) => d.id === selectedDay)
    localStorage.setItem('call-status', 'proposed-by-you')
    localStorage.setItem(
      'call-proposed-slot',
      `${day?.label}, ${day?.dateLabel} · ${selectedTime}`
    )
    router.push('/matches')
  }

  return (
    <>
      <AuthHeader title="Schedule your call" backHref="/matches" />

      <main className="mx-auto max-w-md px-6 py-8">
        <p className="text-sm text-ink-muted">
          Pick a day within the next 3 days.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {days.map((day) => {
            const isSelected = selectedDay === day.id
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setSelectedDay(day.id)}
                className={`rounded-lg border-2 bg-white px-2 py-3 text-center transition-colors ${
                  isSelected
                    ? 'border-accent-primary bg-accent-soft'
                    : 'border-accent-mid'
                }`}
              >
                <p className="text-sm font-semibold text-ink">{day.label}</p>
                <p className="text-xs text-ink-muted">{day.dateLabel}</p>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-sm text-ink-muted">Pick a time.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {TIME_OPTIONS.map((time) => {
            const isSelected = selectedTime === time
            return (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-lg border-2 bg-white px-4 py-4 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-accent-primary bg-accent-soft text-ink'
                    : 'border-accent-mid text-ink-muted'
                }`}
              >
                {time}
              </button>
            )
          })}
        </div>

        {/* Suggestive hint, not a claim of mutual agreement — nothing is
            actually confirmed until the other person accepts */}
        <div className="mt-4 flex items-start gap-3 rounded-lg bg-white p-4 shadow-soft">
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-accent-primary" />
          <p className="text-sm text-ink-muted">
            People are mostly available around 8 PM on Fridays — a good
            bet if you&apos;re not sure.
          </p>
        </div>

        <button
          type="button"
          disabled={!selectedTime}
          onClick={handlePropose}
          className="btn-primary mt-10 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send proposed time
        </button>
      </main>
    </>
  )
}