import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, ArrowDown, Mic, Lock } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-accent-soft to-white px-6 pb-24 pt-16 md:pb-28 md:pt-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row">
        {/* Left: copy */}
        <div className="w-full lg:w-1/2">
          <span className="inline-flex items-center gap-2 rounded-pill bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm">
            <Sparkles size={16} className="text-accent-primary" />
            Personality-first dating
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-ink md:text-5xl">
            Choose the conversation.{' '}
            <span className="text-accent-primary">Let the connection</span>{' '}
            earn the rest.
          </h1>

          <p className="mt-6 text-lg text-ink-muted">
            Gehtta is a calm, voice-first way to meet. Join thoughtfully
            hosted events, stay anonymous at first, and reveal more only
            when you both want to.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup" className="btn-primary">
              Start your profile <ArrowDown size={16} />
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              How Gehtta works
            </a>
          </div>

          <p className="mt-4 text-sm text-ink-muted">
            Verified members · No swiping · Your privacy stays yours
          </p>
        </div>

        {/* Right: preview card */}
        <div className="relative w-full lg:w-1/2">
          <div className="overflow-hidden rounded-lg border border-white/60 bg-white shadow-soft">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-ink-muted">
                Logos · this Friday
              </span>
              <Logo variant="icon" height={32} />
            </div>

            <div className="relative h-56 md:h-72">
              <Image
                src="/images/hero-group.png"
                alt="A group of women smiling and holding green balloons at a Gehtta event"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-4">
              <Mic size={18} className="text-accent-primary" />
              <p className="text-sm text-ink">
                The first hello is voice-first.
              </p>
            </div>
          </div>

          {/* Floating privacy card */}
          <div className="absolute -bottom-6 left-6 max-w-[240px] rounded-md bg-white p-4 shadow-soft md:left-10">
            <div className="flex items-start gap-2">
              <Lock size={16} className="mt-0.5 shrink-0 text-accent-primary" />
              <div>
                <p className="text-sm font-semibold text-ink">
                  Your first hello stays private.
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  Names, photos, and contacts are protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}