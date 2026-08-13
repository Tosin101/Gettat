import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function OnboardingWelcomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-accent-soft via-accent-mid to-accent-primary px-6 py-12">
      <Logo variant="full" height={32} priority />

      <div className="card-glass mt-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold leading-snug text-ink">
          Where a woman chooses, and a gentleman earns it.
        </h2>
        <p className="mt-3 text-ink-muted">
          Blind speed-dating built on personality. Voice first. Faces last.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link href="/onboarding/quiz/1" className="btn-primary w-full">
            I&apos;m a Woman — Join Free
          </Link>
          <Link href="/onboarding/quiz/1" className="btn-secondary w-full">
            I&apos;m a Man — Join Free
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink/70">
        Free forever · No swiping · Verified members
      </p>
    </main>
  )
}