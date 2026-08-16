'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, SlidersHorizontal, Plus } from 'lucide-react'
import Sidebar from '@/components/home/Sidebar'
import PostCard from '@/components/circle/PostCard'
import WeeklyPromptCard from '@/components/circle/WeeklyPromptCard'
import FilterModal from '@/components/circle/FilterModal'
import { circlePosts } from '@/data/circle-posts'

export default function CirclePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [category, setCategory] = useState<string | null>(null)

  const pinnedPost = circlePosts.find((p) => p.pinned)
  const regularPosts = circlePosts.filter((p) => !p.pinned)
  const visiblePosts = category
    ? regularPosts.filter((p) => p.category === category)
    : regularPosts

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selected={category}
        onSelect={setCategory}
      />

      <div className="flex items-center gap-3 px-6 py-4">
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} className="text-ink" />
          </button>
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1 rounded-pill bg-accent-soft px-3 py-1.5 text-sm font-medium text-ink"
          >
            <SlidersHorizontal size={14} />
            {category ?? 'Filter'}
          </button>
        </div>

        <p className="flex-1 truncate text-center text-xs text-ink-muted">
          A safe space to share, freely
        </p>

        <Link
          href="/circle/create"
          className="flex shrink-0 items-center gap-1 rounded-pill bg-accent-primary px-4 py-2 text-sm font-semibold text-white shadow-glow"
        >
          <Plus size={16} /> Post
        </Link>
      </div>

      <main className="mx-auto max-w-md px-6 pb-12">
        <div className="flex flex-col gap-3">
          {!category && pinnedPost && <WeeklyPromptCard post={pinnedPost} />}
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  )
}
