import Link from 'next/link'
import { Lock } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import TraitPicker from '@/components/onboarding/TraitPicker'

const incomeOptions = [
  { label: 'Below ₦100,000', value: 'below-100k' },
  { label: '₦100,000 - ₦500,000', value: '100k-500k' },
  { label: '₦500,000 - ₦1,000,000', value: '500k-1m' },
  { label: '₦1,000,000 and above', value: '1m-above' },
]

export default function ProfileSetupPage() {
  return (
    <>
      <AuthHeader title="Your profile" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-ink">
                Real name
              </label>
              <span className="inline-flex items-center gap-1 rounded-pill bg-accent-soft px-3 py-1 text-xs font-medium text-ink">
                <Lock size={12} />
                Never shown
              </span>
            </div>
            <Input type="text" placeholder="Amara O." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Secret name
            </label>
            <Input type="text" placeholder="Lila" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Age
            </label>
            <Input type="text" inputMode="numeric" placeholder="29" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Profession
            </label>
            <Input type="text" placeholder="Architect" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              Monthly Income
            </label>
            <Select
              options={incomeOptions}
              placeholder="Select income range"
              defaultValue=""
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-ink">
              City
            </label>
            <Input type="text" placeholder="Lagos" />
          </div>

          <div className="rounded-lg border border-accent-mid bg-white p-5">
            <label className="mb-3 block text-sm font-medium text-ink">
              Ideal-partner traits
            </label>
            <TraitPicker />
          </div>

          {/* Navigates to the real next screen — note there's still no
              backend to actually save these fields to yet */}
          <Link href="/onboarding/verify-id" className="btn-primary mt-4 w-full">
            Save profile
          </Link>
        </div>
      </main>
    </>
  )
}