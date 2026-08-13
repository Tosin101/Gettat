import { notFound } from 'next/navigation'
import AuthHeader from '@/components/auth/AuthHeader'
import QuizOptions from '@/components/onboarding/QuizOptions'
import { quizQuestions } from '@/data/quiz-questions'

// Next.js 15+/16 passes route params as a Promise you have to await —
// that's why this function is async.
export default async function QuizStepPage({
  params,
}: {
  params: Promise<{ step: string }>
}) {
  const { step } = await params
  const stepNumber = Number(step)
  const total = quizQuestions.length
  const questionData = quizQuestions[stepNumber - 1]

  // Bad or out-of-range step number (e.g. /onboarding/quiz/99) shows
  // Next.js's built-in 404 page instead of crashing.
  if (!Number.isInteger(stepNumber) || !questionData) {
    notFound()
  }

  const percent = Math.round((stepNumber / total) * 100)
  const isLast = stepNumber === total

  // Next question after 10 isn't built yet (ID verification screen) —
  // this will 404 until that design comes in, which is expected for now.
  const nextHref = isLast
    ? '/onboarding/quiz/complete'
    : `/onboarding/quiz/${stepNumber + 1}`

  const buttonLabel = isLast ? 'See my compatibility style' : 'Continue'

  return (
    <>
      <AuthHeader title="Values & compatibility" />

      <main className="mx-auto max-w-md px-6 py-8">
        <div className="flex items-center justify-between text-sm text-ink-muted">
          <span>
            Question {stepNumber} of {total}
          </span>
          <span>{percent}% complete</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-pill bg-accent-mid/40">
          <div
            className="h-1.5 rounded-pill bg-accent-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold leading-snug text-ink">
          {questionData.question}
        </h2>

        <QuizOptions
          options={questionData.options}
          nextHref={nextHref}
          buttonLabel={buttonLabel}
        />
      </main>
    </>
  )
}