import Link from 'next/link'
import { PartyPopper } from 'lucide-react'

type Props = {
  tierName: string
  price: number
}

export default function CongratsModal({ tierName, price }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 animate-backdrop-fade-in">
      <div className="card-glass w-full max-w-sm text-center animate-modal-pop-in">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-primary animate-icon-pop">
          <PartyPopper size={28} className="text-white" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">
          Congratulations!
        </h2>
        <p className="mt-2 text-ink-muted">
          You can join {tierName}. Top up your wallet to confirm your
          spot.
        </p>
        {/* Wallet screen isn't built yet — will 404 until that design comes in */}
        <Link href="/wallet/top-up" className="btn-primary mt-6 w-full">
          Top up your wallet · ₦{price.toLocaleString()}
        </Link>
      </div>
    </div>
  )
}
