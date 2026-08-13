'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import OopsModal from '@/components/events/OopsModal'
import CongratsModal from '@/components/events/CongratsModal'

export type Requirement = {
  label: string
  met: boolean
}

type Props = {
  tierName: string
  price: number
  requirements: Requirement[]
}

export default function EligibilityCheck({
  tierName,
  price,
  requirements,
}: Props) {
  const [revealedCount, setRevealedCount] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (revealedCount >= requirements.length) {
      const timeout = setTimeout(() => setShowResult(true), 600)
      return () => clearTimeout(timeout)
    }
    const timeout = setTimeout(() => setRevealedCount((c) => c + 1), 800)
    return () => clearTimeout(timeout)
  }, [revealedCount, requirements.length])

  const allMet = requirements.every((r) => r.met)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 py-12 text-center">
      <span className="animate-fade-loop">
        <Logo variant="icon" height={64} />
      </span>

      <h2 className="mt-6 text-lg font-bold text-ink">
        Checking your eligibility for {tierName}
      </h2>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 text-left">
        {requirements.slice(0, revealedCount).map((req) => (
          <div
            key={req.label}
            className="flex items-center justify-between rounded-lg border border-accent-mid bg-white p-4 animate-text-fade-in"
          >
            <span className="text-ink">{req.label}</span>
            {req.met ? (
              <Check size={18} className="shrink-0 text-green-600" />
            ) : (
              <X size={18} className="shrink-0 text-red-500" />
            )}
          </div>
        ))}
      </div>

      {showResult &&
        (allMet ? (
          <CongratsModal tierName={tierName} price={price} />
        ) : (
          <OopsModal />
        ))}
    </main>
  )
}
