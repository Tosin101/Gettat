# Gehtta Frontend — Next.js + Tailwind

## Setup

```bash
npx create-next-app@latest gehtta-frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd gehtta-frontend
```

Then copy the files from this folder in on top (same relative paths):
- `tailwind.config.ts` → overwrite
- `.env.example` → add
- `src/app/globals.css` → overwrite
- `src/app/layout.tsx` → overwrite
- `src/app/style-guide/page.tsx` → add
- `src/components/**` → add

```bash
npm install
npm run dev
```
Visit `/style-guide` to see the design system rendered.

## Git

`create-next-app` already runs `git init` + an initial commit. From here:

```bash
git add .
git commit -m "chore: apply Gehtta design tokens and base components"

# then, after creating an empty repo on GitHub:
git remote add origin https://github.com/<you>/gehtta.git
git branch -M main
git push -u origin main
```

Suggested habit for the screen-conversion phase: **one commit per screen** (or
per small group of related screens), not one giant commit at the end — makes
it much easier to review or revert a single screen later.

## Structure

```
src/
├── app/
│   ├── layout.tsx        # fonts + global wrapper
│   ├── globals.css       # Tailwind layers + .btn/.card-glass/.input-field
│   └── style-guide/      # reference page — check every screen against this
├── components/
│   ├── ui/                # Button, Card, Input — generic, reused everywhere
│   └── layout/             # Nav — page chrome
tailwind.config.ts          # Gehtta palette, radius, shadow, font tokens
```

## Screen naming convention

As you convert designs, map each new route to the PRD's Screen Inventory
(§10), e.g. `app/(auth)/signup/page.tsx`, `app/onboarding/values-quiz/page.tsx`,
`app/events/[id]/page.tsx`. Group related screens into route folders (auth,
onboarding, events, dates, admin) rather than one flat list — Next.js routing
makes this natural, unlike the flat-file vanilla approach.

## Rules of thumb

1. **Never hardcode a hex color** — use the Tailwind tokens (`bg-accent-primary`,
   `text-ink`, etc.) so a palette change only touches `tailwind.config.ts`.
2. **New repeated UI element → a component in `components/ui`**, not inline
   JSX copied across pages.
3. **Check both the mobile and desktop breakpoints** on every screen — this
   is a responsive web app per the PRD, not mobile-only.
