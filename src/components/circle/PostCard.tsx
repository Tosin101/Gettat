'use client'

import { useState, MouseEvent, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, PlayCircle, ThumbsDown } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import PostOptionsMenu from '@/components/circle/PostOptionsMenu'
import { type CirclePost, getLikes, getDislikes } from '@/data/circle-posts'

const TRENDING_THRESHOLD = 100

type Props = {
  post: CirclePost
  onHide: () => void
  onReport: () => void
  onBlock: () => void
}

export default function PostCard({ post, onHide, onReport, onBlock }: Props) {
  const router = useRouter()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const goToPost = () => router.push(`/circle/${post.id}`)

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation()
    setLiked((prev) => !prev)
    if (disliked) setDisliked(false)
  }

  const handleDislike = (e: MouseEvent) => {
    e.stopPropagation()
    setDisliked((prev) => !prev)
    if (liked) setLiked(false)
  }

  const likeCount = getLikes(post) + (liked ? 1 : 0)
  const dislikeCount = getDislikes(post) + (disliked ? 1 : 0)
  const isTrending = likeCount > TRENDING_THRESHOLD

  return (
    <div
      onClick={goToPost}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter') goToPost()
      }}
      role="link"
      tabIndex={0}
      className="cursor-pointer overflow-hidden rounded-lg border border-accent-mid bg-white"
    >
      {post.type !== 'text' && (
        <div className="relative flex h-32 items-center justify-center bg-accent-soft">
          {post.type === 'video' && (
            <PlayCircle size={28} className="text-accent-primary" />
          )}
          <span className="ml-2 text-xs text-ink-muted">
            [{post.type} placeholder]
          </span>
          {isTrending && (
            <span className="absolute left-2 top-2 rounded-pill bg-white/90 px-2 py-1 text-xs font-medium text-ink shadow-sm">
              🔥 Trending
            </span>
          )}
        </div>
      )}

      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-pill bg-accent-soft px-2 py-0.5 text-xs font-medium text-ink">
            {post.category}
          </span>
          {isTrending && post.type === 'text' && (
            <span className="text-xs">🔥 Trending</span>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-sm font-semibold text-ink">
          {post.title}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-mid">
              <Logo variant="icon" height={14} bare />
            </span>
            <span className="text-xs font-medium text-ink">
              {post.authorSecretName}
            </span>
            {post.authorBadge && (
              <span className="rounded-pill bg-accent-soft px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
                {post.authorBadge}
              </span>
            )}
          </div>
          <PostOptionsMenu onReport={onReport} onHide={onHide} onBlock={onBlock} />
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
          <button
            type="button"
            onClick={handleLike}
            className={`flex items-center gap-1 ${liked ? 'font-semibold text-accent-primary' : ''}`}
          >
            ❤️ {likeCount}
          </button>
          <button
            type="button"
            onClick={handleDislike}
            className={`flex items-center gap-1 ${disliked ? 'font-semibold text-red-500' : ''}`}
          >
            <ThumbsDown size={13} /> {dislikeCount}
          </button>
          <span className="flex items-center gap-1">
            <MessageCircle size={13} /> {post.comments.length}
          </span>
        </div>
      </div>
    </div>
  )
}