'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EyeOff } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Logo from '@/components/ui/Logo'

export default function PhotoManagePage() {
  const [hasPhoto, setHasPhoto] = useState(true)

  const handleRemove = () => {
    if (confirm('Remove your current photo? You can add a new one anytime.')) {
      setHasPhoto(false)
    }
  }

  return (
    <>
      <AuthHeader title="Photos & reveal" backHref="/you" />

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent-soft">
          <Logo variant="icon" height={44} bare />
        </span>

        <span className="mx-auto mt-6 inline-flex items-center gap-2 rounded-pill bg-accent-soft px-4 py-2 text-sm font-semibold text-ink">
          <EyeOff size={16} className="text-accent-primary" />
          Hidden until you both choose reveal
        </span>

        <p className="mt-4 text-sm text-ink-muted">
          Your photo is encrypted and does not appear in events, anonymous
          chat, or profile previews.
        </p>

        <div className="mt-6 rounded-lg border border-accent-mid bg-white text-left">
          <div className="grid grid-cols-2 divide-x divide-accent-mid/30">
            <div className="p-4">
              <p className="text-xs text-ink-muted">Current photo</p>
              <p className="mt-1 font-semibold text-ink">
                {hasPhoto ? '1 approved image' : 'No photo yet'}
              </p>
            </div>
            <div className="p-4">
              <p className="text-xs text-ink-muted">Reveal rule</p>
              <p className="mt-1 font-semibold text-ink">Mutual choice only</p>
            </div>
          </div>
          <div className="border-t border-accent-mid/30 p-4">
            <p className="text-sm text-ink-muted">
              You may replace or remove your image any time. No one can
              screenshot it through Gehtta before a reveal.
            </p>
          </div>
        </div>

        <Link href="/you/photo/replace" className="btn-primary mt-8 w-full">
          Replace photo
        </Link>
        {hasPhoto && (
          <button
            type="button"
            onClick={handleRemove}
            className="btn-secondary mt-3 w-full"
          >
            Remove photo
          </button>
        )}
      </main>
    </>
  )
}
