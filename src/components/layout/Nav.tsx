'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const links = ['How it works', 'Events', 'Safety']

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Logo variant="full" height={28} priority />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Link href="/signup" className="btn-primary">
            Start onboarding
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-4 md:hidden">
          {links.map((link) => (
            <a key={link} href="#" className="text-sm text-ink-muted">
              {link}
            </a>
          ))}
          <Link href="/signup" className="btn-primary w-full">
            Start onboarding
          </Link>
        </div>
      )}
    </nav>
  )
}