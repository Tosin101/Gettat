import { Calendar, Users } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function EventsSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/2">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-primary">
              Events with intention
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Find your place, or make the plan.
            </h2>
            <p className="mt-4 text-ink-muted">
              Every event makes its age, employment, and remaining places
              clear. Send a request when it feels like a fit — or create an
              event, invite friends, and choose whether to open two places
              to eligible guests.
            </p>
            <div className="mt-6">
              <Button variant="secondary">
                Explore events <Calendar size={16} />
              </Button>
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-1/2">
            <div className="rounded-lg bg-accent-soft p-5">
              <Calendar size={20} className="text-accent-primary" />
              <p className="mt-3 font-semibold text-ink">Join with clarity</p>
              <p className="mt-2 text-sm text-ink-muted">
                Know the requirements and whether a woman&apos;s or
                man&apos;s place is still open before you request.
              </p>
            </div>
            <div className="rounded-lg border border-accent-mid/50 bg-white p-5">
              <Users size={20} className="text-accent-primary" />
              <p className="mt-3 font-semibold text-ink">Host your way</p>
              <p className="mt-2 text-sm text-ink-muted">
                Keep it friend-led, or select strict inner circle when every
                place is for your guests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
