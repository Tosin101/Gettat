'use client'

import { useState } from 'react'

// Only 4 traits appeared in the design, already shown as selected — this
// is my own guess at a fuller list in the same spirit, not from the
// design. Swap in the real list once you have it.
const TRAIT_OPTIONS = [
  'Kind',
  'Curious',
  'Ambitious',
  'Present',
  'Warm',
  'Confident',
  'Adventurous',
  'Thoughtful',
  'Funny',
  'Loyal',
  'Patient',
  'Driven',
]

export default function TraitPicker() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (trait: string) => {
    setSelected((prev) =>
      prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TRAIT_OPTIONS.map((trait) => {
        const isSelected = selected.includes(trait)
        return (
          <button
            key={trait}
            type="button"
            onClick={() => toggle(trait)}
            className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? 'border-accent-primary bg-accent-soft text-ink'
                : 'border-accent-mid bg-white text-ink-muted'
            }`}
          >
            {trait}
          </button>
        )
      })}
    </div>
  )
}
