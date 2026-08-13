import Link from 'next/link'
import { Sparkle } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'

type CompatibilityResult = {
  title: string
  description: string
  tags: string[]
}

// Static placeholder for now, exactly as shown in the design. Once quiz
// answers are actually stored and scored, this object gets computed
// per-user instead of hardcoded — nothing else on this page needs to
// change when that happens.
const result: CompatibilityResult = {
  title: 'You lead with calm curiosity.',
  description:
    'You value thoughtful conversation, consistency, and connections that grow with real care.',
  tags: ['Thoughtful', 'Warm', 'Intentional'],
}

export default function CompatibilityOverviewPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-accent-soft via-accent-mid to-accent-primary">
      <AuthHeader title="Your compatibility style" />

      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-16 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-soft">
          <Sparkle
            size={28}
            className="text-accent-primary"
            fill="currentColor"
          />
        </span>

        <h2 className="mt-8 text-2xl font-bold text-ink">{result.title}</h2>
        <p className="mt-3 text-ink-muted">{result.description}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {result.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-pill bg-white/80 px-4 py-2 text-sm font-medium text-ink shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href="/onboarding/profile"
          className="btn-primary mt-16 w-full"
        >
          Continue to verification
        </Link>
      </div>
    </main>
  )
}
