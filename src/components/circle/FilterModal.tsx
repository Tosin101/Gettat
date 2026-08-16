'use client'

import { X } from 'lucide-react'
import { CATEGORIES } from '@/data/circle-posts'

type Props = {
  open: boolean
  onClose: () => void
  selected: string | null
  onSelect: (category: string | null) => void
}

export default function FilterModal({ open, onClose, selected, onSelect }: Props) {
  if (!open) return null

  const choose = (category: string | null) => {
    onSelect(category)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-ink/30 animate-backdrop-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-lg bg-white p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-ink">Filter by category</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <X size={20} className="text-ink-muted" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => choose(null)}
            className={`rounded-pill border px-4 py-2 text-sm font-medium ${
              selected === null
                ? 'border-accent-primary bg-accent-soft text-ink'
                : 'border-accent-mid text-ink-muted'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => choose(cat)}
              className={`rounded-pill border px-4 py-2 text-sm font-medium ${
                selected === cat
                  ? 'border-accent-primary bg-accent-soft text-ink'
                  : 'border-accent-mid text-ink-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
