'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Input from '@/components/ui/Input'
import PreferenceModal from '@/components/you/PreferenceModal'
import TraitPicker from '@/components/onboarding/TraitPicker'

// Same 4 options as onboarding quiz question 1 — "Looking for" maps
// directly to that answer
const LOOKING_FOR_OPTIONS = [
  'A real friendship',
  'A lasting partnership',
  'Someone who surprises me',
  'A connection that grows slowly',
]

const DISTANCE_OPTIONS = [
  'Within 10 km',
  'Within 25 km',
  'Within 50 km',
  'Anywhere in city',
]

type ModalKey = 'looking-for' | 'age' | 'distance' | 'values' | null

export default function PreferencesPage() {
  const router = useRouter()
  const [lookingFor, setLookingFor] = useState('A lasting partnership')
  const [minAge, setMinAge] = useState('27')
  const [maxAge, setMaxAge] = useState('36')
  const [distance, setDistance] = useState('Within 25 km')
  const [values, setValues] = useState(['Kind', 'Curious', 'Ambitious', 'Present'])
  const [openModal, setOpenModal] = useState<ModalKey>(null)

  const handleSave = () => {
    // No backend to persist this to yet
    router.push('/you')
  }

  return (
    <>
      <AuthHeader title="Matching preferences" backHref="/you" />

      <main className="mx-auto max-w-md px-6 py-8">
        <p className="text-sm text-ink-muted">
          These preferences help shape your Circle, but never prevent you
          from being surprised by a great connection.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <PreferenceRow
            label="Looking for"
            value={lookingFor}
            onClick={() => setOpenModal('looking-for')}
          />
          <PreferenceRow
            label="Age range"
            value={`${minAge} – ${maxAge}`}
            onClick={() => setOpenModal('age')}
          />
          <PreferenceRow
            label="Distance"
            value={`${distance} of Lagos`}
            onClick={() => setOpenModal('distance')}
          />
          <PreferenceRow
            label="Values"
            value={values.join(' · ')}
            onClick={() => setOpenModal('values')}
          />
        </div>

        <div className="mt-6 rounded-md bg-accent-soft p-4 text-sm text-ink">
          Your preferences are private. Matches never see the filters you
          chose.
        </div>

        <button type="button" onClick={handleSave} className="btn-primary mt-10 w-full">
          Save preferences
        </button>
      </main>

      <PreferenceModal
        open={openModal === 'looking-for'}
        title="Looking for"
        onClose={() => setOpenModal(null)}
      >
        <div className="flex flex-col gap-2">
          {LOOKING_FOR_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setLookingFor(opt)
                setOpenModal(null)
              }}
              className={`rounded-lg border px-4 py-3 text-left text-sm ${
                lookingFor === opt
                  ? 'border-accent-primary bg-accent-soft font-semibold text-ink'
                  : 'border-accent-mid text-ink-muted'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </PreferenceModal>

      <PreferenceModal
        open={openModal === 'age'}
        title="Age range"
        onClose={() => setOpenModal(null)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="text"
              inputMode="numeric"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value.replace(/\D/g, ''))}
              placeholder="Min"
            />
          </div>
          <span className="text-ink-muted">to</span>
          <div className="flex-1">
            <Input
              type="text"
              inputMode="numeric"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value.replace(/\D/g, ''))}
              placeholder="Max"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpenModal(null)}
          className="btn-primary mt-4 w-full"
        >
          Done
        </button>
      </PreferenceModal>

      <PreferenceModal
        open={openModal === 'distance'}
        title="Distance"
        onClose={() => setOpenModal(null)}
      >
        <div className="flex flex-col gap-2">
          {DISTANCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                setDistance(opt)
                setOpenModal(null)
              }}
              className={`rounded-lg border px-4 py-3 text-left text-sm ${
                distance === opt
                  ? 'border-accent-primary bg-accent-soft font-semibold text-ink'
                  : 'border-accent-mid text-ink-muted'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </PreferenceModal>

      <PreferenceModal
        open={openModal === 'values'}
        title="Values"
        onClose={() => setOpenModal(null)}
      >
        <TraitPicker selected={values} onChange={setValues} />
        <button
          type="button"
          onClick={() => setOpenModal(null)}
          className="btn-primary mt-4 w-full"
        >
          Done
        </button>
      </PreferenceModal>
    </>
  )
}

function PreferenceRow({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between rounded-lg border border-accent-mid bg-white p-4 text-left"
    >
      <div>
        <p className="text-xs text-ink-muted">{label}</p>
        <p className="mt-1 font-semibold text-ink">{value}</p>
      </div>
      <ChevronRight size={18} className="text-ink-muted" />
    </button>
  )
}
