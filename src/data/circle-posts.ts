export type PostType = 'text' | 'image' | 'video'

export type Comment = {
  authorSecretName: string
  text: string
}

export type CirclePost = {
  id: string
  authorSecretName: string
  authorBadge?: string
  category: string
  type: PostType
  title: string
  body: string
  date: string
  reactions: Record<string, number>
  comments: Comment[]
  pinned?: boolean
}

export const CATEGORIES = [
  'Lifestyle',
  'Memes',
  'Sports',
  'Relationships',
  'Career',
  'Wellness',
  'Beauty',
  'Food',
  'Travel',
  'Money',
  'Safety Tips',
  'Ask The Circle',
]

export const REACTION_OPTIONS = ['❤️', '😂', '👏', '😮']

export function totalReactions(post: CirclePost) {
  return Object.values(post.reactions).reduce((sum, n) => sum + n, 0)
}

export function topReaction(post: CirclePost) {
  const entries = Object.entries(post.reactions)
  if (entries.length === 0) return '❤️'
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

export const circlePosts: CirclePost[] = [
  {
    id: 'weekly-prompt',
    pinned: true,
    authorSecretName: 'Gehtta',
    category: 'Weekly Prompt',
    type: 'text',
    title: '23 matches this week 💜',
    body: "If you had a match, tell us how it went (or how you're feeling about it) in the comments — good, bad, or still figuring it out.",
    date: 'This week',
    reactions: { '❤️': 41, '👏': 9 },
    comments: [
      { authorSecretName: 'Zainab', text: 'Mine went better than expected, honestly nervous energy the whole time' },
      { authorSecretName: 'Amara', text: 'Still waiting to hear back on scheduling a call, fingers crossed' },
    ],
  },
  {
    id: '1',
    authorSecretName: 'Lila',
    category: 'Ask The Circle',
    type: 'text',
    title: 'Anyone else nervous before their first event?',
    body: "I'm attending my first Gehtta Classic this Friday and I'm equal parts excited and terrified. Any tips from people who've been?",
    date: 'Feb 4, 2026',
    reactions: { '❤️': 22, '👏': 8 },
    comments: [
      { authorSecretName: 'Zainab', text: 'You will be fine! Just be yourself, the voice-first thing takes the pressure off.' },
      { authorSecretName: 'Amara', text: 'Bring a light jacket, the venues are always cold lol' },
    ],
  },
  {
    id: '2',
    authorSecretName: 'Zainab',
    authorBadge: '🔥 5-day streak',
    category: 'Memes',
    type: 'image',
    title: 'When he says "I have a good personality" as his opener',
    body: 'We have all heard this line at least once 😭',
    date: 'Feb 3, 2026',
    reactions: { '😂': 96, '❤️': 32, '👏': 4 },
    comments: [{ authorSecretName: 'Tomi', text: 'I felt this in my soul' }],
  },
  {
    id: '3',
    authorSecretName: 'Amara',
    authorBadge: '⭐ Top contributor',
    category: 'Wellness',
    type: 'text',
    title: "Small win: I said no to a call that didn't feel right",
    body: 'It felt uncomfortable in the moment but so freeing after. Reminder that "no" is a full sentence.',
    date: 'Feb 2, 2026',
    reactions: { '❤️': 178, '👏': 34 },
    comments: [
      { authorSecretName: 'Lila', text: 'This is such a good reminder, thank you for sharing' },
      { authorSecretName: 'Chidi', text: 'Proud of you for that!' },
      { authorSecretName: 'Ada', text: 'Needed to hear this today' },
    ],
  },
  {
    id: '4',
    authorSecretName: 'Ada',
    category: 'Lifestyle',
    type: 'video',
    title: 'My whole get-ready-with-me before a Circle event',
    body: '15 minutes, no fuss, and I still feel put together. Save this for your next event day.',
    date: 'Feb 1, 2026',
    reactions: { '❤️': 54, '😮': 12 },
    comments: [],
  },
  {
    id: '5',
    authorSecretName: 'Tomi',
    category: 'Sports',
    type: 'text',
    title: 'Anyone else watching the derby this weekend?',
    body: 'Trying to find people who actually care about football for once. Asking for a friend.',
    date: 'Jan 31, 2026',
    reactions: { '👏': 14, '❤️': 5 },
    comments: [],
  },
]
