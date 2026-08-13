export type EventListing = {
  id: string
  name: string
  subtitle: string
  seatsLeftMale: number
  seatsLeftFemale: number
  actionLabel: 'Join' | 'Apply'
  badgeColor: 'soft' | 'mid' | 'primary'
}

// Every tier below is created with an EVEN male/female split by design
// rule (10+10, 6+6, 5+5). "Seats left" naturally drifts uneven as real
// people of each gender join — only the starting split has to be even.
// This is example/seed data, not live counts — no backend tracking real
// RSVPs yet.
export const eventListings: EventListing[] = [
  {
    id: 'gehtta-classic',
    name: 'Gehtta Classic',
    subtitle: 'Fri 8:00 PM · weekly · Free',
    seatsLeftMale: 6,
    seatsLeftFemale: 4,
    actionLabel: 'Join',
    badgeColor: 'soft',
  },
  {
    id: 'special',
    name: 'Special',
    subtitle: 'Premium · ₦1,850 to apply',
    seatsLeftMale: 3,
    seatsLeftFemale: 2,
    actionLabel: 'Apply',
    badgeColor: 'mid',
  },
  {
    id: 'match-make',
    name: 'Match-Make',
    subtitle: 'Concierge · price to be confirmed',
    // Seat count wasn't specified — placeholder split, confirm real
    // numbers before this goes live
    seatsLeftMale: 2,
    seatsLeftFemale: 3,
    actionLabel: 'Apply',
    badgeColor: 'primary',
  },
]
