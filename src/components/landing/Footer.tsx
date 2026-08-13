import Logo from '@/components/ui/Logo'

const links = ['How it works', 'Events', 'Safety', 'Privacy']

export default function Footer() {
  return (
    <footer className="border-t border-accent-mid/30 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo variant="full" height={24} />
          <p className="mt-3 text-sm text-ink-muted">
            Personality-first dating, hosted with care.
          </p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-ink-muted">
          {links.map((link) => (
            <a key={link} href="#" className="hover:text-ink">
              {link}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-xs text-ink-muted">
        © 2026 Gehtta. All rights reserved.
      </p>
    </footer>
  )
}