'use client'

import { useRef, useState, ChangeEvent } from 'react'
import { Lock } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import SuccessModal from '@/components/onboarding/SuccessModal'

export default function PhotoUpload() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (photoPreview) URL.revokeObjectURL(photoPreview) // avoid a memory leak
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleRetake = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview)
    setPhotoPreview(null)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-accent-mid to-accent-primary">
        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-white">
          {photoPreview ? (
            // Local object URL from the file input, not a static asset —
            // next/image doesn't handle blob: URLs, so a plain <img> is
            // the right tool for this specific case.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoPreview}
              alt="Your profile photo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Logo variant="icon" height={160} />
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 rounded-pill bg-accent-soft px-4 py-3 text-sm text-ink">
        <Lock size={16} className="shrink-0 text-accent-primary" />
        Hidden until you both choose to reveal
      </div>

      <p className="mt-4 max-w-xs text-center text-sm text-ink-muted">
        No one sees your face until a mutual reveal. You decide, every
        time.
      </p>

      <div className="mt-8 w-full">
        {!photoPreview ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="btn-secondary flex-1"
            >
              Take Photo
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="btn-primary flex-1"
            >
              Upload Photo
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* No backend to actually save the photo to yet — this just
                opens the success modal for now */}
            <button
              type="button"
              onClick={() => setShowSuccess(true)}
              className="btn-primary w-full"
            >
              Finish Setup
            </button>
            <button
              type="button"
              onClick={handleRetake}
              className="text-sm font-medium text-accent-primary"
            >
              Retake photo
            </button>
          </div>
        )}
      </div>

      {/* capture="user" hints mobile browsers to open the front camera
          directly; the plain input below has no capture attribute, so it
          opens the normal file/gallery picker instead */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showSuccess && <SuccessModal />}
    </div>
  )
}
