import Link from 'next/link'
import { Mail, ShieldCheck } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'

export default function SignUpPage() {
  return (
    <>
      <AuthHeader title="Create your account" />

      <main className="mx-auto max-w-md px-6 py-8">
        <h2 className="text-2xl font-bold leading-snug text-ink">
          Meet people at your own pace.
        </h2>
        <p className="mt-3 text-ink-muted">
          Start with personality and voice. Your contact details and face
          are always kept private.
        </p>

        {/* Using a plain div, not a <form>, since there's no submit
            handler yet — real form + validation comes with the backend
            phase. A <form> without a working onSubmit can cause an
            unexpected page reload if someone hits Enter. */}
        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Email or phone
            </label>
            <Input icon={Mail} type="text" placeholder="amara@example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Create a password
            </label>
            <PasswordInput placeholder="At least 8 characters" />
          </div>

          <div className="flex items-start gap-3 rounded-md bg-accent-soft p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-accent-primary"
            />
            <p className="text-sm text-ink">
              We use your account information to keep Circles safe. We
              never show it to other members.
            </p>
          </div>

          <p className="text-center text-sm text-ink-muted">
            Already a member?{' '}
            <Link href="/signin" className="font-semibold text-ink">
              Sign in instead
            </Link>
          </p>

          <Link href="/signup/verify" className="btn-primary w-full">
            Continue securely
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          By continuing, you agree to the Community Guidelines and Privacy
          Notice.
        </p>
      </main>
    </>
  )
}
