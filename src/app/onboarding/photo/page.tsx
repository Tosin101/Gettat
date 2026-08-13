import AuthHeader from '@/components/auth/AuthHeader'
import PhotoUpload from '@/components/onboarding/PhotoUpload'

export default function PhotoUploadPage() {
  return (
    <>
      <AuthHeader title="Add your photo" />

      <main className="mx-auto max-w-md px-6 py-12">
        <PhotoUpload />
      </main>
    </>
  )
}
