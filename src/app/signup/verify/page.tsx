import Link from 'next/link'
import AuthHeader from '@/components/auth/AuthHeader'
import OtpInput from '@/components/ui/OtpInput'
import ResendCountdown from '@/components/ui/ResendCountdown'

export default function VerifyAccountPage() {
  return (
    <>
      <AuthHeader title="Confirm your account" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="rounded-md bg-accent-soft p-4">
          <p className="text-sm text-ink-muted">We sent a 6-digit code to</p>
          {/* Static placeholder for now — once signup has a real submit
              handler, this should show the email/phone the user entered */}
          <p className="font-semibold text-ink">amara@example.com</p>
        </div>

        <div className="mt-8">
          <label className="mb-3 block text-sm font-medium text-ink">
            Enter your code
          </label>
          <OtpInput />
        </div>

        <div className="mt-4">
          <ResendCountdown seconds={24} />
        </div>

        <Link href="/onboarding" className="btn-primary mt-8 w-full">
          Verify &amp; continue
        </Link>
      </main>
    </>
  )
}
