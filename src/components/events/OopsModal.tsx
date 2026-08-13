import Link from 'next/link'
import { X } from 'lucide-react'

export default function OopsModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 animate-backdrop-fade-in">
      <div className="card-glass w-full max-w-sm text-center animate-modal-pop-in">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <X size={28} className="text-red-500" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">Oops!</h2>
        <p className="mt-2 text-ink-muted">
          Your profile didn&apos;t meet all the requirements for this
          event.
        </p>
        <Link href="/events" className="btn-secondary mt-6 w-full">
          Close
        </Link>
      </div>
    </div>
  )
}
