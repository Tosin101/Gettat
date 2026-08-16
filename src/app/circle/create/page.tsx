'use client'

import { useRef, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ImageIcon, Video } from 'lucide-react'
import AuthHeader from '@/components/auth/AuthHeader'
import Select from '@/components/ui/Select'
import { CATEGORIES } from '@/data/circle-posts'

export default function CreatePostPage() {
  const router = useRouter()
  const [category, setCategory] = useState('')
  const [text, setText] = useState('')
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none')
  const [mediaFileName, setMediaFileName] = useState<string | null>(null)
  const [mediaError, setMediaError] = useState<string | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMediaError(null)
    setMediaType('image')
    setMediaFileName(file.name)
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMediaError(null)

    // Real check — reads the actual video's length via the browser, not
    // just trusting the filename or a guess
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      if (video.duration > 60) {
        setMediaError(
          `That video is ${Math.ceil(video.duration)}s — videos must be 1 minute or shorter.`
        )
        setMediaType('none')
        setMediaFileName(null)
      } else {
        setMediaType('video')
        setMediaFileName(file.name)
      }
    }
    video.src = URL.createObjectURL(file)
  }

  const isValid = category !== '' && text.trim() !== ''

  const handlePost = () => {
    // No backend to actually save this post to yet
    router.push('/circle')
  }

  return (
    <>
      <AuthHeader title="New post" backHref="/circle" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Category
          </label>
          <Select
            options={CATEGORIES.map((c) => ({ label: c, value: c }))}
            placeholder="Pick a category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-ink">
            What&apos;s on your mind?
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Share something with the Circle..."
            className="input-field"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="btn-secondary flex-1"
          >
            <ImageIcon size={16} /> Add photo
          </button>
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="btn-secondary flex-1"
          >
            <Video size={16} /> Add video
          </button>
        </div>

        {mediaFileName && (
          <p className="mt-3 text-sm text-ink-muted">
            Attached ({mediaType}): {mediaFileName}
          </p>
        )}
        {mediaError && (
          <p className="mt-3 text-sm text-red-500">{mediaError}</p>
        )}

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoChange}
        />

        {/* No backend to actually store the post/media to yet */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handlePost}
          className="btn-primary mt-10 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          Post
        </button>
      </main>
    </>
  )
}
