import Link from 'next/link'
import { ArrowLeft, Menu } from 'lucide-react'

type AuthHeaderProps = {
  title: string
  /** Renders a back arrow that links here, e.g. backHref="/events" */
  backHref?: string
  /** Renders a hamburger button that calls this, typically to open Sidebar */
  onMenuClick?: () => void
}

export default function AuthHeader({
  title,
  backHref,
  onMenuClick,
}: AuthHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-accent-mid/20 px-6 py-5">
      <div className="flex items-center gap-3">
        {backHref && (
          <Link href={backHref} aria-label="Go back">
            <ArrowLeft size={20} className="text-ink" />
          </Link>
        )}
        {onMenuClick && (
          <button type="button" onClick={onMenuClick} aria-label="Open menu">
            <Menu size={20} className="text-ink" />
          </button>
        )}
        <h1 className="text-xl font-bold text-ink">{title}</h1>
      </div>

      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-mid" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent-mid" />
      </div>
    </div>
  )
}