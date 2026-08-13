'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  options: string[]
  nextHref: string
  buttonLabel: string
}

export default function QuizOptions({ options, nextHref, buttonLabel }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        {options.map((option, index) => {
          const isSelected = selected === index
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(index)}
              className={`flex items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                isSelected
                  ? 'border-accent-primary bg-accent-soft'
                  : 'border-accent-mid bg-white'
              }`}
            >
              <span className="text-ink">{option}</span>
              <span
                className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                  isSelected
                    ? 'border-accent-primary bg-accent-primary'
                    : 'border-accent-mid bg-white'
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* Disabled until something's picked — real UX, not just decoration.
          Answers aren't saved anywhere yet (no backend/state wiring), so
          going back to a previous question will show it as unanswered
          again for now. */}
      <button
        type="button"
        disabled={selected === null}
        onClick={() => router.push(nextHref)}
        className="btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {buttonLabel}
      </button>
    </>
  )
}
