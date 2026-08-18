'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mic, Volume2 } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

const wavebarHeights = [
  40, 65, 30, 80, 50, 90, 45, 70, 35, 85, 55, 95, 40, 75, 30, 80, 50, 90, 45,
  65,
]

export default function VoiceManagePage() {
  const [playing, setPlaying] = useState(false)

  return (
    <>
      <AuthHeader title="Voice introduction" backHref="/you" />

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-primary">
          <Mic size={28} className="text-white" />
        </span>

        <h2 className="mt-5 text-xl font-bold text-ink">
          Your intro is ready.
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          This is what people hear during anonymous events — before they
          know your face.
        </p>

        <div className="mt-6 rounded-lg bg-white p-4 text-left shadow-soft">
          <div className="flex items-center gap-3">
            {/* No real stored audio yet — toggles a visual playing state
                rather than actually playing anything */}
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause preview' : 'Play preview'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft"
            >
              <Volume2 size={16} className="text-accent-primary" />
            </button>
            <div className="flex h-8 flex-1 items-center gap-0.5">
              {wavebarHeights.map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full bg-accent-primary ${
                    playing ? 'animate-wave-bar' : ''
                  }`}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
            <span className="shrink-0 text-sm font-medium text-ink">
              0:38
            </span>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            &ldquo;Hi, I&apos;m someone who laughs easily and listens
            closely...&rdquo;
          </p>
        </div>

        <Link href="/you/voice/record" className="btn-primary mt-10 w-full">
          Record a new intro
        </Link>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="btn-secondary mt-3 w-full"
        >
          Preview recording
        </button>
      </main>
    </>
  )
}
