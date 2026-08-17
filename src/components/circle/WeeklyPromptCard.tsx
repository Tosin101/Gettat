import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { type CirclePost, getLikes } from '@/data/circle-posts'

export default function WeeklyPromptCard({ post }: { post: CirclePost }) {
  return (
    <Link
      href={`/circle/${post.id}`}
      className="block rounded-lg bg-gradient-to-br from-accent-soft to-accent-primary p-4 shadow-soft"
    >
      <span className="rounded-pill bg-white/70 px-2 py-0.5 text-xs font-semibold text-ink">
        📌 Weekly Prompt
      </span>
      <p className="mt-2 text-base font-bold text-ink">{post.title}</p>
      <p className="mt-1 text-sm text-ink/80">{post.body}</p>
      <div className="mt-3 flex items-center gap-4 text-xs font-medium text-ink/80">
        <span>❤️ {getLikes(post)}</span>
        <span className="flex items-center gap-1">
          <MessageCircle size={13} /> {post.comments.length} replies
        </span>
      </div>
    </Link>
  )
}