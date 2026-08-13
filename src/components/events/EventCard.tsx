import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const badgeColorClasses = {
  soft: 'bg-accent-soft',
  mid: 'bg-accent-mid',
  primary: 'bg-accent-primary',
}

type EventCardProps = {
  id: string
  name: string
  subtitle: string
  /** Overrides the auto-generated "XM · YF left" text — used for cards
   * that aren't an open seat pool, like Golden Ticket */
  detail?: string
  seatsLeftMale?: number
  seatsLeftFemale?: number
  actionLabel: string
  badgeColor?: 'soft' | 'mid' | 'primary'
}

export default function EventCard({
  id,
  name,
  subtitle,
  detail,
  seatsLeftMale,
  seatsLeftFemale,
  actionLabel,
  badgeColor = 'soft',
}: EventCardProps) {
  const seatsText =
    detail ??
    (seatsLeftMale !== undefined && seatsLeftFemale !== undefined
      ? `${seatsLeftMale}M · ${seatsLeftFemale}F left`
      : null)

  const actionClass =
    actionLabel === 'Join'
      ? 'shrink-0 rounded-pill bg-accent-primary px-4 py-2 text-sm font-semibold text-white shadow-glow'
      : 'shrink-0 rounded-pill border border-accent-mid px-4 py-2 text-sm font-semibold text-ink hover:bg-accent-soft'

  return (
    <div className="flex items-center gap-3 rounded-lg border border-accent-mid bg-white p-4">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${badgeColorClasses[badgeColor]}`}
      >
        <Logo variant="icon" height={26} bare />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>
        {seatsText && (
          <p className="mt-0.5 text-xs text-ink-muted">{seatsText}</p>
        )}
      </div>

      {/* Event detail/application pages aren't built yet */}
      <Link href={`/events/${id}`} className={actionClass}>
        {actionLabel}
      </Link>
    </div>
  )
}
