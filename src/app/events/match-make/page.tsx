import EligibilityCheck from '@/components/events/EligibilityCheck'

const requirements = [
  { label: 'Minimum age of 21', met: true },
  { label: 'Monthly income above ₦100,000', met: true },
  { label: 'Compatibility profile complete', met: false },
]

export default function MatchMakeEligibilityPage() {
  return (
    <EligibilityCheck
      tierName="Match-Make"
      price={2645}
      requirements={requirements}
    />
  )
}
