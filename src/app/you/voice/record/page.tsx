import Link from 'next/link'
import AuthHeader from '@/components/auth/AuthHeader'
import VoiceRecorder from '@/components/onboarding/VoiceRecorder'

export default function ReRecordVoicePage() {
  return (
    <>
      <AuthHeader title="Record a new intro" backHref="/you/voice" />

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <p className="text-sm text-ink-muted">
          Same 60-second format as before — talk about what makes you,
          you.
        </p>

        <div className="mt-8">
          <VoiceRecorder />
        </div>

        {/* No backend to persist the new recording to yet */}
        <Link href="/you/voice" className="btn-primary mt-10 w-full">
          Save intro
        </Link>
      </main>
    </>
  )
}
