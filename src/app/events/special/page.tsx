import EligibilityCheck from '@/components/events/EligibilityCheck'

// Special's real eligibility criteria weren't specified — this is a
// reasonable placeholder set, confirm the real requirements before this
// goes live
const requirements = [
  { label: 'Minimum age of 21', met: true },
  { label: 'Verified profile', met: true },
  { label: 'Complete voice introduction', met: true },
]

export default function SpecialEligibilityPage() {
  return (
    <EligibilityCheck
      tierName="Special"
      price={1850}
      requirements={requirements}
    />
  )
}
