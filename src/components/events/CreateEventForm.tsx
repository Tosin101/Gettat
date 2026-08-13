'use client'

import { useState } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import EventPublishedModal from '@/components/events/EventPublishedModal'

// Same options as the profile setup page — reused for consistency
const incomeOptions = [
  { label: 'Below ₦100,000', value: 'below-100k' },
  { label: '₦100,000 - ₦500,000', value: '100k-500k' },
  { label: '₦500,000 - ₦1,000,000', value: '500k-1m' },
  { label: '₦1,000,000 and above', value: '1m-above' },
]

export default function CreateEventForm() {
  const [eventName, setEventName] = useState('')
  const [seats, setSeats] = useState('')
  const [startTime, setStartTime] = useState('')
  const [minAge, setMinAge] = useState('')
  const [maxAge, setMaxAge] = useState('')
  const [income, setIncome] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const seatsNumber = Number(seats)
  const seatsIsEven = seats !== '' && seatsNumber > 0 && seatsNumber % 2 === 0
  const seatsError = seats !== '' && !seatsIsEven

  const isValid =
    eventName.trim() !== '' &&
    seatsIsEven &&
    startTime !== '' &&
    minAge !== '' &&
    income !== ''

  return (
    <>
      <AuthHeader title="Create an event" backHref="/events" />

      <main className="mx-auto max-w-md px-6 py-8">
        <p className="text-sm text-ink-muted">
          Host a night for your circle. You can create one event a
          month — you can still view and edit this one anytime before it
          starts.
        </p>

        <div className="mt-6 flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Event name
            </label>
            <Input
              type="text"
              placeholder="Hunt-Game show"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Total seats
            </label>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="12"
              value={seats}
              onChange={(e) => setSeats(e.target.value.replace(/\D/g, ''))}
            />
            {seatsError ? (
              <p className="mt-2 text-sm text-red-500">
                Needs to be an even number, so it can split evenly between
                men and women.
              </p>
            ) : (
              seatsIsEven && (
                <p className="mt-2 text-sm text-ink-muted">
                  = {seatsNumber / 2} men + {seatsNumber / 2} women
                </p>
              )
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Start time
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Age requirement
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Min (e.g. 18)"
                  value={minAge}
                  onChange={(e) =>
                    setMinAge(e.target.value.replace(/\D/g, ''))
                  }
                />
              </div>
              <span className="text-ink-muted">to</span>
              <div className="flex-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Max (optional)"
                  value={maxAge}
                  onChange={(e) =>
                    setMaxAge(e.target.value.replace(/\D/g, ''))
                  }
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-ink-muted">
              Leave the max blank for no upper limit — e.g. 18 and above.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Employment / salary status
            </label>
            <Select
              options={incomeOptions}
              placeholder="Select an income range"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div className="rounded-lg border border-accent-mid bg-accent-soft p-4">
            <p className="font-semibold text-ink">
              Default · 2 Gehtta guest places
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              One woman and one man who meet your requirements can send a
              request for these places.
            </p>
          </div>

          {/* No backend to actually publish to yet — just shows the
              success state so the flow can be seen end to end */}
          <button
            type="button"
            disabled={!isValid}
            onClick={() => setShowSuccess(true)}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            Publish event
          </button>
        </div>
      </main>

      {showSuccess && <EventPublishedModal />}
    </>
  )
}