import { notFound } from 'next/navigation'
import AuthHeader from '@/components/auth/AuthHeader'
import PostDetailClient from '@/components/circle/PostDetailClient'
import { circlePosts } from '@/data/circle-posts'

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = circlePosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  return (
    <>
      <AuthHeader title="Post" backHref="/circle" />
      <PostDetailClient post={post} />
    </>
  )
}
