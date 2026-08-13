import Link from 'next/link'
import { Check } from 'lucide-react'

export default function SuccessModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 animate-backdrop-fade-in">
      <div className="card-glass w-full max-w-sm text-center animate-modal-pop-in">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-primary animate-icon-pop">
          <Check size={28} className="text-white" />
        </span>

        <h2 className="mt-5 text-xl font-bold text-ink">
          You&apos;re all set!
        </h2>
        <p className="mt-2 text-ink-muted">
          Your profile is complete. Time to start meeting people who are
          curious about who you really are.
        </p>

        <Link href="/home" className="btn-primary mt-6 w-full">
          Go to homepage
        </Link>
      </div>
    </div>
  )
}