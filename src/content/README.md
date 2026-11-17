# `src/content`: the site's words and data

All the text, lists and numbers on the site live here as typed TypeScript files. **To update the site, edit these files. You shouldn't need to touch any components.** TypeScript checks the shape of everything, so a typo in a field name or a missing field fails `pnpm typecheck` instead of breaking a page.

Lines marked `// PLACEHOLDER` are stand-ins waiting for real content. To find them all: `grep -rn PLACEHOLDER src/content`.

## Files

| File             | What it holds                                                                                   | Used on                                     |
| ---------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `site.ts`        | Club name, nav links, the Join button, footer blurb, contact email, Instagram and Discord links | Every page (nav, footer), Contact           |
| `about.ts`       | The "Our story" text and photo                                                                  | About                                       |
| `values.ts`      | The four club values                                                                            | About                                       |
| `disciplines.ts` | The four disciplines and their descriptions. Also the source of the Projects filter tabs.       | Home, Projects                              |
| `projects.ts`    | Every project                                                                                   | Home (first three), Projects, project pages |
| `events.ts`      | Every event, upcoming and past                                                                  | Events                                      |
| `team.ts`        | Committee members, and the order and headings of team groups                                    | Team                                        |
| `stats.ts`       | The numbers in the Home stats strip                                                             | Home                                        |
| `partners.ts`    | Partner names and logos                                                                         | Home                                        |

## Common edits

**Add an event** in `events.ts`:

```ts
event("Robotics Workshop", "2027-05-06", "Engineering Building 1", "Build a line-following robot.", "https://instagram.com/p/..."),
```

- The date must be `"YYYY-MM-DD"`. The link at the end is optional and makes the title clickable.
- Order doesn't matter. The Events page splits Upcoming from Past using today's date in Melbourne, and sorts each list.

**Add a project** in `projects.ts`:

- Copy an existing `project({...})` block. The page URL is made from the title ("Solar Car" → `/projects/solar-car`), so titles must be unique.
- `team`, `links` and `gallery` are optional. Leave one out and its section is hidden on the project page.
- Images go in `public/projects/` and are referenced from the site root: `cover: "/projects/solar-car-cover.jpg"`.
- **Order matters:** the Home page shows the first three.

**Add a team member** in `team.ts`:

- Add `{ name, role, group, photo? }` to `team`. `group` must be one of the groups in `TeamGroup` (`src/lib/types.ts`).
- The order of `engineeringGroups` and `clubGroups` is the order the groups appear on the page.

**Add a discipline:**

- Add it to the `Discipline` type in `src/lib/types.ts` and to `disciplines.ts`.
- The Projects filter tabs pick it up automatically.

**Change a stat** in `stats.ts`: values are strings, so `"40+"` or `"2019"` show exactly as written.
