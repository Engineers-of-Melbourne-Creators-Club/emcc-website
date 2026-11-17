# `src/lib`: shared types and helpers

Small, plain TypeScript with no React, used across pages and components.

| File        | What it does                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`  | The shapes of the site's data: `Project`, `TeamMember`, `ClubEvent`, `Link`, and the allowed `Discipline` and `TeamGroup` values. The content files in `src/content` must match these. |
| `events.ts` | `splitEvents(events, now)` sorts events into `upcoming` (soonest first) and `past` (most recent first).                                                                                |
| `dates.ts`  | Formats `"YYYY-MM-DD"` strings for display: `eventDay` → `"04"`, `eventMonth` → `"Mar"`, `eventMonthYear` → `"March 2027"`.                                                            |

## Why the date code looks the way it does

- **Melbourne time, not server time.** Vercel's servers run in UTC, which is 10 to 11 hours behind Melbourne. `splitEvents` works out today's date in `Australia/Melbourne` before comparing, so an event stays "Upcoming" for its whole day in Melbourne. Using `new Date().toISOString()` here would move evening events to "Past" early.
- **No `Date` parsing for event dates.** Dates are compared and split as strings. `"YYYY-MM-DD"` strings sort correctly as text, and parsing them as `Date`s would shift them by time zone.
- **Fixed month names.** `dates.ts` uses its own month list rather than `toLocaleString`, because some locales write September as "Sept".

This logic is covered by `tests/events.test.ts` (`pnpm test`). If you change it, keep those tests passing.
