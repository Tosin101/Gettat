'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Pencil } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'

export default function ProfileDetailsPage() {
  const router = useRouter()
  const [secretName, setSecretName] = useState('Lila')
  const [age, setAge] = useState('29')
  const [profession, setProfession] = useState('Architect')
  const [city, setCity] = useState('Lagos')

  const handleSave = () => {
    // No backend to persist this to yet
    router.push('/you')
  }

  return (
    <>
      <AuthHeader title="Profile details" backHref="/you" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="flex items-start gap-3 rounded-md bg-accent-soft p-4">
          <Lock size={16} className="mt-0.5 shrink-0 text-accent-primary" />
          <p className="text-sm text-ink">
            Your real name and contact details are private account
            information, not profile fields.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <FieldRow label="Secret name" value={secretName} onChange={setSecretName} />
          <FieldRow label="Age" value={age} onChange={setAge} inputMode="numeric" />
          <FieldRow label="Profession" value={profession} onChange={setProfession} />
          <FieldRow label="City" value={city} onChange={setCity} />
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="btn-primary mt-10 w-full"
        >
          Save profile details
        </button>
      </main>
    </>
  )
}

function FieldRow({
  label,
  value,
  onChange,
  inputMode,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  inputMode?: 'text' | 'numeric'
}) {
  return (
    <div className="relative rounded-lg border border-accent-mid bg-white px-4 pb-3 pt-2">
      <label className="text-xs text-ink-muted">{label}</label>
      <input
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border-none bg-transparent p-0 text-base font-bold text-ink outline-none"
      />
      <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-primary" />
    </div>
  )
}
