import Image from 'next/image'
import { Mic, Heart, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Mic,
    title: 'Voice before face',
    description: 'Meet the person in the conversation, not in a photo.',
  },
  {
    icon: Heart,
    title: 'Mutual choice',
    description:
      'A connection moves forward only when both people choose it.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    description:
      'Identity, contact details, and photos stay protected until you agree.',
  },
]

export default function ValueProps() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
          <div className="relative w-full max-w-sm lg:w-1/2">
            <div className="relative h-80 overflow-hidden rounded-lg border border-accent-mid md:h-96">
              <Image
                src="/images/value-props-portrait.png"
                alt="Woman in a purple gown — you set the pace on Gettat"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <span className="absolute right-4 top-4 rounded-pill bg-white px-3 py-1 text-xs font-medium text-ink shadow-sm">
              You set the pace
            </span>
          </div>

          <div className="w-full lg:w-1/2">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-primary">
              A different starting point
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Built for the part that actually matters.
            </h2>
            <p className="mt-4 text-ink-muted">
              There is no race to a photo, no public score, and no pressure
              to reveal. Gehtta gives curiosity room to do its work — so you
              can meet with confidence, warmth, and agency.
            </p>

            <div className="mt-6 rounded-md bg-accent-soft p-5">
              <p className="font-semibold text-ink">The details you control</p>
              <p className="mt-2 text-sm text-ink-muted">
                Choose when to join an event, who to continue with, and
                whether a connection ever moves past voice. Nothing changes
                until you want it to.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-accent-mid/50 bg-white p-6 shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                <Icon size={18} className="text-accent-primary" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}