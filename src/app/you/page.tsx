'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Pencil,
  Mic,
  Camera,
  SlidersHorizontal,
  Wallet,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react'
import Sidebar from '@/components/home/Sidebar'
import AuthHeader from '@/components/auth/AuthHeader'
import Logo from '@/components/ui/Logo'

const manageItems = [
  {
    href: '/you/profile',
    icon: Pencil,
    title: 'Profile details',
    subtitle: 'Name, work, city',
  },
  {
    href: '/you/voice',
    icon: Mic,
    title: 'Voice introduction',
    subtitle: '0:38 · ready to play',
  },
  {
    href: '/you/photo',
    icon: Camera,
    title: 'Photos & reveal',
    subtitle: 'Hidden until mutual choice',
  },
  {
    href: '/you/preferences',
    icon: SlidersHorizontal,
    title: 'Matching preferences',
    subtitle: 'Traits, age range, distance',
  },
  {
    href: '/you/wallet',
    icon: Wallet,
    title: 'Wallet',
    subtitle: 'Balance & top-up',
  },
]

export default function YouPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AuthHeader title="My profile" onMenuClick={() => setSidebarOpen(true)} />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="card-glass">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <Logo variant="icon" height={30} bare />
              </span>
              <div>
                <p className="text-lg font-bold text-ink">Lila</p>
                <p className="text-sm text-ink-muted">29 · Architect · Lagos</p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
              <BadgeCheck size={14} className="text-accent-primary" />
              Verified
            </span>
          </div>

          <div className="mt-5 border-t border-accent-mid/30 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Profile readiness</span>
              <span className="font-semibold text-ink">92% complete</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-pill bg-accent-mid/40">
              <div
                className="h-2 rounded-pill bg-accent-primary"
                style={{ width: '92%' }}
              />
            </div>
          </div>
        </div>

        <h2 className="mb-3 mt-6 text-sm font-semibold text-ink-muted">
          Manage
        </h2>
        <div className="flex flex-col gap-3">
          {manageItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg border border-accent-mid bg-white p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <item.icon size={18} className="text-accent-primary" />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="text-sm text-ink-muted">{item.subtitle}</p>
              </div>
              <ChevronRight size={18} className="text-ink-muted" />
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
