import Link from 'next/link'
import { Check } from 'lucide-react'

export default function EventPublishedModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 animate-backdrop-fade-in">
      <div className="card-glass w-full max-w-sm text-center animate-modal-pop-in">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-primary animate-icon-pop">
          <Check size={28} className="text-white" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">
          Event published!
        </h2>
        <p className="mt-2 text-ink-muted">
          Your event is live. Share the link to start filling your seats.
        </p>
        <Link href="/events/hosted" className="btn-primary mt-6 w-full">
          View my event
        </Link>
      </div>
    </div>
  )
}
