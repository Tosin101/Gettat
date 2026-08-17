'use client'

import { useState } from 'react'
import { MoreHorizontal, Flag, EyeOff, UserX } from 'lucide-react'

type Props = {
  onReport: () => void
  onHide: () => void
  onBlock: () => void
}

export default function PostOptionsMenu({ onReport, onHide, onBlock }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        aria-label="More options"
      >
        <MoreHorizontal size={16} className="text-ink-muted" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          />
          <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-lg border border-accent-mid bg-white py-1 shadow-soft">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onHide()
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft"
            >
              <EyeOff size={14} /> Hide post
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onReport()
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink hover:bg-accent-soft"
            >
              <Flag size={14} /> Report post
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onBlock()
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
            >
              <UserX size={14} /> Block writer
            </button>
          </div>
        </>
      )}
    </div>
  )
}