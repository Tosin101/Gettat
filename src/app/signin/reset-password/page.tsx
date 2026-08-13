import Link from 'next/link'
import { ArrowLeft, KeyRound, Mail } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ResetPasswordPage() {
  return (
    <>
      <AuthHeader title="Reset your password" />

      <main className="mx-auto max-w-md px-6 py-8">
        <Link
          href="/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>

        <span className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
          <KeyRound size={22} className="text-accent-primary" />
        </span>

        <h2 className="mt-6 text-2xl font-bold text-ink">
          Let&apos;s get you back in.
        </h2>
        <p className="mt-2 text-ink-muted">
          Enter the email or phone number linked to your Gehtta account.
          We&apos;ll send a private reset link.
        </p>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-ink">
            Email or phone
          </label>
          <Input icon={Mail} type="text" placeholder="amara@example.com" />
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-md border border-accent-mid/50 p-4">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary" />
          <p className="text-sm text-ink-muted">
            Reset links expire after 15 minutes and cannot reveal whether an
            account is associated with another member.
          </p>
        </div>

        <Button variant="primary" className="mt-8 w-full">
          Send reset link
        </Button>

        <p className="mt-4 text-center text-sm text-ink-muted">
          Remembered it?{' '}
          <Link href="/signin" className="font-semibold text-ink">
            Back to sign in
          </Link>
        </p>
      </main>
    </>
  )
}