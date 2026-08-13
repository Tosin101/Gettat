const steps = [
  {
    number: '01',
    title: 'Make your profile',
    description:
      'Share your values, voice introduction, and what matters to you.',
  },
  {
    number: '02',
    title: 'Find an event',
    description:
      'Review requirements, availability, and send a request for a place.',
  },
  {
    number: '03',
    title: 'Listen and choose',
    description:
      'Meet anonymously, rate on personality, and discover mutual matches.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-accent-primary/10 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-accent-primary">
              Your path in
            </span>
            <h2 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              A thoughtful beginning, end to end.
            </h2>
          </div>
          <a
            href="#onboarding"
            className="text-sm font-medium text-ink hover:text-accent-primary"
          >
            See the onboarding process ↓
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-lg bg-white p-6 shadow-sm">
              <span className="text-sm font-semibold text-accent-primary">
                {step.number}
              </span>
              <h3 className="mt-3 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
