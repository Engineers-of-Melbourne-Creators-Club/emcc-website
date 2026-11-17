# EMC² website

Website for Engineers of Melbourne Creators Club, built by the website team :D

## Getting started

Requires Node 22.18+ and pnpm. Scripts:

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # eslint + prettier --check
pnpm typecheck    # generate route types, then tsc
pnpm build        # production build
pnpm format       # prettier --write
pnpm test         # unit tests (node:test)
```

## Tech stack

| Area                   | What we use                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework              | [Next.js](https://nextjs.org) 16 (App Router, Turbopack). |
| UI                     | [React](https://react.dev) 19 |
| Language               | [TypeScript](https://www.typescriptlang.org), strict mode                                                                         |
| Styling                | CSS Modules plus design tokens (CSS custom properties) in `src/styles/tokens.css`.                                 |
| Fonts                  | [Geist and Geist Mono](https://vercel.com/font)                                                                                     |
| Contact form           | Next.js server action, validated with [Zod](https://zod.dev) 4 and sent through [Resend](https://resend.com)                        |
| Testing                | Node's built-in test runner (`node:test`)                                                                                           |
| Linting and formatting | ESLint 9 (`eslint-config-next`) and Prettier 3                                                                                      |
## Project structure

| Folder            | What's in it                                                                                                                                                                                                                                                   | Docs                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `src/app/`        | Pages and routes (one folder per URL), the root layout, and the contact form's server action                                                                                                                                                                   | [src/app](src/app/README.md)               |
| `src/components/` | Reusable UI pieces, including the animated grid backgrounds                                                                                                                                                                                                    | [src/components](src/components/README.md) |
| `src/content/`    | All the site's text and data. Edit these to update the site.                                                                                                                                                                                                   | [src/content](src/content/README.md)       |
| `src/lib/`        | Shared types and the event date helpers                                                                                                                                                                                                                        | [src/lib](src/lib/README.md)               |
| `src/styles/`     | Design tokens and base styles                                                                                                                                                                                                                                  | [src/styles](src/styles/README.md)         |
| `tests/`          | Unit tests (`pnpm test`)                                                                                                                                                                                                                                       | [tests](tests/README.md)                   |
| `public/`         | Files served as-is from the site root: `brand/` holds the logos (`logo.svg` is the original, `logo-bw.svg` is the black-and-white header version), `projects/` holds project photos. Anything here is publicly downloadable, so don't put private files in it. | (this section)                             |

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable           | What it is                                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`   | API key from the Resend dashboard.                                                                                                      |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form messages. Until a domain is verified in Resend, this must be the address that owns the Resend account. |

Ask the website lead for these.
