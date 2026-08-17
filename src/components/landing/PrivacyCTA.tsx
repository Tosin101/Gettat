import Link from 'next/link'
import { ShieldCheck, ArrowDown, ArrowRight } from 'lucide-react'

export default function PrivacyCTA() {
  return (
    <section className="bg-ink px-6 py-20 text-center text-white md:py-28">
      <div className="mx-auto max-w-2xl">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
          <ShieldCheck size={20} />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white/60">
          Privacy is not a feature. It is the foundation.
        </p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">
          Your identity stays in your hands.
        </h2>
        <p className="mt-4 text-white/70">
          Verification helps keep events safe, but your private details do
          not become event details. Your real name, face, phone number, and
          exact location are never part of the first hello.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/signup" className="btn-primary">
            Begin onboarding <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
