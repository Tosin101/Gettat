import Nav from '@/components/layout/Nav'
import Hero from '@/components/landing/Hero'
import ValueProps from '@/components/landing/ValueProps'
import HowItWorks from '@/components/landing/HowItWorks'
import EventsSection from '@/components/landing/EventsSection'
import PrivacyCTA from '@/components/landing/PrivacyCTA'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <ValueProps />
      <HowItWorks />
      <EventsSection />
      <PrivacyCTA />
      <Footer />
    </>
  )
}
