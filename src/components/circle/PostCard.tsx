import Link from 'next/link'
import { MoreHorizontal, MessageCircle, PlayCircle } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import {
  type CirclePost,
  totalReactions,
  topReaction,
} from '@/data/circle-posts'

const TRENDING_THRESHOLD = 100

export default function PostCard({ post }: { post: CirclePost }) {
  const total = totalReactions(post)
  const isTrending = total > TRENDING_THRESHOLD

  return (
    <Link
      href={`/circle/${post.id}`}
      className="block overflow-hidden rounded-lg border border-accent-mid bg-white"
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
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            aria-label="More options"
          >
            <MoreHorizontal size={16} className="text-ink-muted" />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
          <span>
            {topReaction(post)} {total}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={13} /> {post.comments.length}
          </span>
        </div>
      </div>
    </Link>
  )
}
