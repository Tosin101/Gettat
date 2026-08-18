'use client'

import { useRef, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import AuthHeader from '@/components/auth/AuthHeader'

export default function ReplacePhotoPage() {
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
  }

  const handleSave = () => {
    // No backend to persist this to yet
    router.push('/you/photo')
  }

  return (
    <>
      <AuthHeader title="Replace photo" backHref="/you/photo" />

      <main className="mx-auto max-w-md px-6 py-8 text-center">
        <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-accent-soft">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="New photo preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Logo variant="icon" height={44} bare />
          )}
        </div>

        <div className="mt-8 flex gap-3">
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

        <button
          type="button"
          disabled={!preview}
          onClick={handleSave}
          className="btn-primary mt-10 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save photo
        </button>
      </main>
    </>
  )
}
