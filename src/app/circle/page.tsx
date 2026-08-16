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
  const [hiddenPostIds, setHiddenPostIds] = useState<string[]>([])

  const pinnedPost = circlePosts.find((p) => p.pinned)
  const regularPosts = circlePosts.filter(
    (p) => !p.pinned && !hiddenPostIds.includes(p.id)
  )
  const visiblePosts = category
    ? regularPosts.filter((p) => p.category === category)
    : regularPosts

  const handleHide = (id: string) => {
    setHiddenPostIds((prev) => [...prev, id])
  }

  const handleReport = () => {
    // No backend yet to actually receive reports — confirms the action
    // was registered rather than silently doing nothing
    alert(
      "Thanks — we'll take a look. (No backend yet to actually route real reports to a moderation queue.)"
    )
  }

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

          {visiblePosts.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="font-semibold text-ink">
                No posts in {category} yet.
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Be the first to share something here.
              </p>
              <Link href="/circle/create" className="btn-primary mt-6 inline-flex">
                Start a post
              </Link>
            </div>
          ) : (
            visiblePosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onHide={() => handleHide(post.id)}
                onReport={handleReport}
              />
            ))
          )}
        </div>
      </main>
    </>
  )
}