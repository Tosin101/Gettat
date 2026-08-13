'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Home, Calendar, Heart, Users, User } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const navItems = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Matches', href: '/matches', icon: Heart },
  { label: 'Circle', href: '/circle', icon: Users },
  { label: 'You', href: '/you', icon: User },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-ink/30 animate-backdrop-fade-in"
        onClick={onClose}
      />

      <div className="flex w-72 flex-col bg-white px-5 py-6 shadow-soft animate-modal-pop-in">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-ink">
            gehtta
          </span>
          <button type="button" onClick={onClose} aria-label="Close menu">
            <X size={20} className="text-ink-muted" />
          </button>
        </div>

        {/* Placeholder until real auth/profile data exists */}
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-accent-soft/60 p-3">
          <Logo variant="icon" height={36} />
          <div>
            <p className="font-semibold text-ink">&ldquo;Lila&rdquo;</p>
            <p className="text-xs text-ink-muted">Anonymous · Lagos</p>
          </div>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-ink'
                    : 'text-ink-muted hover:bg-accent-soft/50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.label}
                </span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        <p className="mt-auto pt-6 text-xs text-ink-muted">
          Names stay hidden until you both choose to reveal.
        </p>
      </div>
    </div>
  )
}
