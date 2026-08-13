import { ShieldCheck } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import VerificationForm from '@/components/onboarding/VerificationForm'

export default function VerifyIdPage() {
  return (
    <>
      <AuthHeader title="Verify it's really you" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="flex items-start gap-3 rounded-md bg-accent-soft p-4">
          <ShieldCheck
            size={18}
            className="mt-0.5 shrink-0 text-accent-primary"
          />
          <p className="text-sm text-ink">
            For safety only. Your ID is never shown to anyone you meet.
          </p>
        </div>

        <VerificationForm />
      </main>
    </>
  )
}
