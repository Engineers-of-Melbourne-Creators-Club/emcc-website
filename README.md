# EMC² website

Marketing site for EMC² (Engineers of Melbourne Creators Club). Next.js App Router, TypeScript, CSS Modules, deployed on Vercel.

## Getting started

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint         # eslint + prettier --check
pnpm typecheck    # generate route types, then tsc
pnpm build        # production build
pnpm format       # prettier --write
```

## Styling

All colours, type sizes and spacing are CSS custom properties in `src/styles/tokens.css`. Components reference tokens only; never hard-code a value. `/styleguide` shows every token while the site is being built.
