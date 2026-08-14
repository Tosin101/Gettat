'use client'

import { useEffect, useState } from 'react'

const WORDS_PER_CHUNK = 10

export default function CyclingCaption({
  text,
  paused = false,
}: {
  text: string
  paused?: boolean
}) {
  const words = text.split(' ')
  const chunks: string[] = []
  for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
    chunks.push(words.slice(i, i + WORDS_PER_CHUNK).join(' '))
  }

  const [chunkIndex, setChunkIndex] = useState(0)

  useEffect(() => {
    if (paused || chunks.length <= 1) return
    const interval = setInterval(() => {
      setChunkIndex((i) => (i + 1) % chunks.length)
    }, 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks.length, paused])

  return (
    <p
      key={chunkIndex}
      className="animate-text-fade-in line-clamp-2 text-sm text-ink"
    >
      &ldquo;{chunks[chunkIndex]}&rdquo;
    </p>
  )
}