import Link from 'next/link'
import { Mail } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import PasswordInput from '@/components/ui/PasswordInput'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'

export default function SignInPage() {
  return (
    <>
      <AuthHeader title="Welcome back" />

      <main className="mx-auto max-w-md px-6 py-8">
        {/* The icon logo already has its own circular badge baked in, so
            no extra background wrapper is needed here */}
        <Logo variant="icon" height={56} />

        <h2 className="mt-6 text-2xl font-bold text-ink">
          Good to see you again.
        </h2>
        <p className="mt-2 text-ink-muted">
          Sign in to pick up where you left off.
        </p>

        <div className="mt-8 flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Email or phone
            </label>
            <Input icon={Mail} type="text" placeholder="amara@example.com" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Password
            </label>
            <PasswordInput />
          </div>

          <p className="text-center text-sm text-ink-muted">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-ink">
              Sign up instead
            </Link>
          </p>

          <Button variant="primary" className="w-full">
            Sign in
          </Button>

          <Link
            href="/signin/reset-password"
            className="text-center text-sm font-semibold text-accent-primary"
          >
            Forgot password?
          </Link>
        </div>
      </main>
    </>
  )
}