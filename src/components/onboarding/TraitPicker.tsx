'use client'

import { useState } from 'react'

const DEFAULT_TRAITS = [
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

type Props = {
  options?: string[]
  /** Pass both selected + onChange to control this from a parent (used on
   * the rating page, which needs to read the selection). Omit both to let
   * the component manage its own state (used on the profile page). */
  selected?: string[]
  onChange?: (selected: string[]) => void
}

export default function TraitPicker({
  options = DEFAULT_TRAITS,
  selected: controlledSelected,
  onChange,
}: Props) {
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const selected = controlledSelected ?? internalSelected

  const toggle = (trait: string) => {
    const next = selected.includes(trait)
      ? selected.filter((t) => t !== trait)
      : [...selected, trait]

    if (onChange) {
      onChange(next)
    } else {
      setInternalSelected(next)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((trait) => {
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