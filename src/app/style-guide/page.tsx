import Nav from '../../components/layout/Nav'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function StyleGuidePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-md px-6 py-8 md:max-w-2xl">
        <h1 className="mb-4 text-2xl">Soft World, Strong Woman.</h1>
        <p className="mb-6 text-ink-muted">
          Every screen you convert should reuse these components and Tailwind
          tokens instead of hardcoding new styles.
        </p>

        <Card className="mb-6">
          <h3 className="mb-2">Glass card</h3>
          <p className="text-ink-muted">
            Frosted, translucent, soft shadow — the base surface for most screens.
          </p>
        </Card>

        <Input placeholder="Secret name" className="mb-6" />

        <div className="flex gap-3">
          <Button variant="primary">Continue</Button>
          <Button variant="secondary">Not now</Button>
        </div>
      </main>
    </>
  )
}
