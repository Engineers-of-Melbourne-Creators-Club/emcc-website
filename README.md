# EMC² website

Marketing site for EMC² (Engineers of Melbourne Creators Club). Next.js App Router, TypeScript, CSS Modules, deployed on Vercel.

## Getting started

Requires Node 22.18+ (for `pnpm test`, which runs TypeScript directly) and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # eslint + prettier --check
pnpm typecheck    # generate route types, then tsc
pnpm build        # production build
pnpm format       # prettier --write
pnpm test         # unit tests (node:test)
```

## Environment variables

The contact form sends email through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

| Variable           | What it is                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`   | API key from the Resend dashboard.                                                                                                      |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form messages. Until a domain is verified in Resend, this must be the address that owns the Resend account. |

Set the same two variables in Vercel (Project → Settings → Environment Variables) for deployed builds. Without them the site works, but the form shows a "could not be sent" error.

## Content

All site content lives in `src/content/` as typed data files: projects, team, events, stats, partners, disciplines, values, the About story, and site-wide details (nav, footer, contact, socials). Edit those files to update the site; no component changes needed. Lines marked `// PLACEHOLDER` are still waiting on real content.

## Styling

All colours, type sizes and spacing are CSS custom properties in `src/styles/tokens.css`. Components reference tokens only; never hard-code a value.
