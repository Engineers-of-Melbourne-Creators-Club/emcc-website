# `src/app`: pages and routes

This folder uses the Next.js **App Router**: each folder is a URL, and the `page.tsx` inside it is what renders at that URL. Pages are mostly layout. They pull their text from [`src/content`](../content/README.md) and build the page out of [`src/components`](../components/README.md).

## Routes

| URL                | File                       | What's on it                                                                                       |
| ------------------ | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `/`                | `page.tsx`                 | Hero, the four disciplines, the first three projects, stats, partner logos, closing call to action |
| `/about`           | `about/page.tsx`           | Our story, values, how projects run, closing call to action                                        |
| `/team`            | `team/page.tsx`            | Leadership and engineering teams, then the club teams below a divider                              |
| `/projects`        | `projects/page.tsx`        | Every project, with discipline filter tabs                                                         |
| `/projects/<slug>` | `projects/[slug]/page.tsx` | One project: overview, gallery, specs, team, links                                                 |
| `/events`          | `events/page.tsx`          | Upcoming events as cards, past events as a list                                                    |
| `/contact`         | `contact/page.tsx`         | Contact details and the contact form                                                               |
| anything else      | `not-found.tsx`            | The 404 page                                                                                       |

## Other files

| File                                                | What it does                                                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `layout.tsx`                                        | Wraps every page: loads the Geist fonts, sets the default page title and description, and renders the nav bar and footer around the page. |
| `globals.css`                                       | Imports the design tokens and base styles from [`src/styles`](../styles/README.md). Nothing else goes here.                               |
| `home.module.css` and each `<page>.module.css`      | Styles used only by that page.                                                                                                            |
| `icon.png`, `apple-icon.png`, `opengraph-image.png` | The browser tab icon, iOS home-screen icon and social share preview image. Next picks these up automatically by file name.                |
| `contact/actions.ts`                                | The server action behind the contact form (see below).                                                                                    |

## How pages are built

- **Static by default.** Pages are built ahead of time and served as plain HTML, which keeps the site fast and cheap to host. `next.config.ts` turns on `cacheComponents`, so Next caches pages and rebuilds them in the background.
- **Rebuilt daily where dates matter.** The Events page and the footer's copyright year use `"use cache"` with `cacheLife("days")`. They refresh at most once a day, so events move from Upcoming to Past without a redeploy.
- **One page per project.** `projects/[slug]/page.tsx` uses `generateStaticParams` to build a page for every project in `src/content/projects.ts`. An unknown slug shows the 404 page.
- **Title band on every page.** Each page starts with `TitleBand`, the dark header strip. Its `grid` prop picks which background drawing appears (see `GridBackground` in the components docs).

## The contact form

`contact/actions.ts` is a **server action**: a function that runs on the server when the form is submitted. The browser never sees the API key.

1. **Honeypot check:** if the hidden `company` field is filled in, it's a bot. The action pretends it worked and stops.
2. **Validation:** every field is re-checked on the server with `zod`. Name is required, email must be valid, and the message must be 10 to 5000 characters. Errors go back to the form, and so does what the person typed.
3. **Sending:** the message is sent through [Resend](https://resend.com) to `CONTACT_TO_EMAIL`, with the visitor's address as reply-to.
4. **Failures:** if the env vars are missing or Resend fails, it logs the error and returns a friendly "could not be sent" message. It never throws.

The form itself is `src/components/ContactForm`. On Vercel, a Firewall rule also rate-limits form posts: 5 per IP address every 10 minutes. The form catches the blocked request and shows an inline error.

Environment variables are listed in the root [README](../../README.md#environment-variables).

## Adding a page

1. Create `src/app/<name>/page.tsx` and export a default component.
2. Export `metadata` with a `title` and `description`. The layout adds " | EMC²" to the title.
3. Start the page with `<TitleBand eyebrow="..." title="..." />`. Pass `grid="..."` if it should get a background drawing.
4. Add it to `nav` in `src/content/site.ts` so it shows in the nav bar and footer.
