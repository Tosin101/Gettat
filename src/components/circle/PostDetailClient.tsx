'use client'

import { useState } from 'react'
import { MoreHorizontal, PlayCircle } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import {
  type CirclePost,
  REACTION_OPTIONS,
} from '@/data/circle-posts'

// Stands in for the real signed-in user's secret name until auth exists
const CURRENT_USER_SECRET_NAME = 'Lila'

export default function PostDetailClient({ post }: { post: CirclePost }) {
  const [reactions, setReactions] = useState(post.reactions)
  const [myReaction, setMyReaction] = useState<string | null>(null)
  const [comments, setComments] = useState(post.comments)
  const [commentText, setCommentText] = useState('')

  const handleReact = (emoji: string) => {
    setReactions((prev) => {
      const next = { ...prev }
      if (myReaction) {
        next[myReaction] = Math.max(0, (next[myReaction] ?? 1) - 1)
      }
      if (myReaction === emoji) {
        setMyReaction(null)
        return next
      }
      next[emoji] = (next[emoji] ?? 0) + 1
      return next
    })
    setMyReaction((prev) => (prev === emoji ? null : emoji))
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return
    setComments([
      ...comments,
      { authorSecretName: CURRENT_USER_SECRET_NAME, text: commentText.trim() },
    ])
    setCommentText('')
  }

  return (
    <main className="mx-auto max-w-md px-6 py-6">
      {post.type !== 'text' && (
        <div className="flex h-56 items-center justify-center rounded-lg bg-accent-soft">
          {post.type === 'video' && (
            <PlayCircle size={32} className="text-accent-primary" />
          )}
          <span className="ml-2 text-sm text-ink-muted">
            [{post.type} placeholder]
          </span>
        </div>
      )}

      <span className="mt-4 inline-block rounded-pill bg-accent-soft px-3 py-1 text-xs font-medium text-ink">
        {post.category}
      </span>

      <h1 className="mt-3 text-xl font-bold text-ink">{post.title}</h1>
      <p className="mt-2 text-ink-muted">{post.body}</p>

      <div className="mt-4 flex items-center justify-between border-y border-accent-mid/30 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-mid">
            <Logo variant="icon" height={20} bare />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-ink">
                {post.authorSecretName}
              </p>
              {post.authorBadge && (
                <span className="rounded-pill bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
                  {post.authorBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-ink-muted">{post.date}</p>
          </div>
        </div>
        <button type="button" aria-label="More options">
          <MoreHorizontal size={18} className="text-ink-muted" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {REACTION_OPTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => handleReact(emoji)}
            className={`flex items-center gap-1 rounded-pill border px-3 py-1.5 text-sm ${
              myReaction === emoji
                ? 'border-accent-primary bg-accent-soft'
                : 'border-accent-mid'
            }`}
          >
            {emoji} {reactions[emoji] ?? 0}
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-sm font-semibold text-ink">
        {comments.length} Comments
      </h2>
      <div className="flex flex-col gap-4">
        {comments.map((c, i) => (
          <div key={i} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-mid">
              <Logo variant="icon" height={16} bare />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">
                {c.authorSecretName}
              </p>
              <p className="text-sm text-ink-muted">{c.text}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-ink-muted">
            No comments yet — be the first to reply.
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={`Comment as ${CURRENT_USER_SECRET_NAME}...`}
          className="input-field flex-1"
        />
        <button
          type="button"
          onClick={handleAddComment}
          className="rounded-pill bg-accent-primary px-5 py-2 text-sm font-semibold text-white shadow-glow"
        >
          Send
        </button>
      </div>
    </main>
  )
}
