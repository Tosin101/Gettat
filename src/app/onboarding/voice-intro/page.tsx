import Link from 'next/link'
import AuthHeader from '@/components/auth/AuthHeader'
import VoiceRecorder from '@/components/onboarding/VoiceRecorder'

export default function VoiceIntroPage() {
  return (
    <>
      <AuthHeader title="Record your intro" />

      <main className="mx-auto flex max-w-md flex-col px-6 py-8">
        <div className="text-center">
          <h2 className="text-xl font-bold leading-snug text-ink">
            You have 60 seconds to introduce yourself — no need to
            overthink it.
          </h2>
          <p className="mt-3 text-ink-muted">
            Talk about what makes you laugh, what you&apos;re passionate
            about, or what a great Sunday looks like to you. This is the
            first thing your matches will hear, so let your personality
            lead.
          </p>
          <p className="mt-3 text-sm font-medium text-accent-primary">
            One rule: don&apos;t say your name.
          </p>
        </div>

        <div className="mt-10">
          <VoiceRecorder />
        </div>

        {/* Still no backend to actually upload/save the recording to —
            navigates forward regardless for now */}
        <Link
          href="/onboarding/photo"
          className="btn-primary mt-10 w-full text-center"
        >
          Save My Intro
        </Link>
      </main>
    </>
  )
}