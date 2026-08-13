'use client'

import { useRef, useState } from 'react'
import { CloudUpload } from 'lucide-react'
import Link from 'next/link'

const DOCUMENT_TYPES = [
  { id: 'nin', label: 'NIN' },
  { id: 'license', label: "Driver's License" },
  { id: 'passport', label: 'Passport' },
]

export default function VerificationForm() {
  const [selectedDoc, setSelectedDoc] = useState('nin')
  const [fileName, setFileName] = useState<string | null>(null)
  const [simulateMismatch, setSimulateMismatch] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const selectedLabel = DOCUMENT_TYPES.find((d) => d.id === selectedDoc)?.label

  return (
    <div className="mt-6 flex flex-col gap-3">
      {DOCUMENT_TYPES.map((doc) => {
        const isSelected = selectedDoc === doc.id
        return (
          <button
            key={doc.id}
            type="button"
            onClick={() => setSelectedDoc(doc.id)}
            className={`flex items-center justify-between rounded-lg border-2 bg-white px-5 py-4 text-left transition-colors ${
              isSelected ? 'border-accent-primary' : 'border-accent-mid'
            }`}
          >
            <span className="font-medium text-ink">{doc.label}</span>
            <span
              className={`h-5 w-5 shrink-0 rounded-full border-2 ${
                isSelected
                  ? 'border-accent-primary bg-accent-primary'
                  : 'border-accent-mid bg-white'
              }`}
            />
          </button>
        )
      })}

      {/* Upload zone — border/icon turn red when simulateMismatch is true.
          Once real ID verification exists (comparing the extracted document
          name against the profile's real name), that comparison result is
          what should set this instead of the temporary checkbox below. */}
      <div
        className={`mt-2 flex flex-col items-center rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors ${
          simulateMismatch ? 'border-red-400' : 'border-accent-mid'
        }`}
      >
        <CloudUpload
          size={28}
          className={simulateMismatch ? 'text-red-400' : 'text-accent-primary'}
        />
        <p className="mt-3 font-semibold text-ink">
          Upload front of {selectedLabel}
        </p>
        <p className="mt-1 text-sm text-ink-muted">PNG, JPG, or PDF</p>

        {fileName && (
          <p className="mt-2 text-xs text-ink-muted">Selected: {fileName}</p>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 rounded-pill bg-accent-primary px-8 py-2 font-display font-semibold text-white shadow-glow transition-all hover:shadow-[0_0_32px_rgba(197,186,255,0.75)]"
        >
          Upload
        </button>
      </div>

      {simulateMismatch && (
        <p className="text-sm text-red-500">
          Name data doesn&apos;t correlate with profile.
        </p>
      )}

      {/* TEMPORARY — lets you preview the error state before real ID
          verification exists. Delete this whole label once name-matching
          is wired to a real backend/OCR service. */}
      <label className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          checked={simulateMismatch}
          onChange={(e) => setSimulateMismatch(e.target.checked)}
        />
        Preview: simulate name mismatch (dev only — remove later)
      </label>

      {/* Navigates to the real next screen — still no backend to actually
          verify the uploaded ID against */}
      <Link href="/onboarding/voice-intro" className="btn-primary mt-4 w-full text-center">
        Verify
      </Link>
    </div>
  )
}