# `src/components`: building blocks

Every reusable piece of the UI lives here, one folder per component:

```
Button/
  Button.tsx          the component
  Button.module.css   its styles (CSS Modules, so class names never clash)
```

Import with the `@/` alias, e.g. `import { Button } from "@/components/Button/Button";`.

**Conventions**

- Components are **server components** by default: they render to HTML and ship no JavaScript. A file starts with `"use client"` only when it needs the browser (clicks, the current URL, animation). Those are marked **client** below.
- Styles use design tokens from [`src/styles/tokens.css`](../styles/README.md), never hard-coded colours or sizes.
- Components take plain props and don't read from `src/content` themselves. Pages pass the data in. (`NavBar`, `Footer` and `Logo` are the exceptions: they read site-wide details from `site.ts`.)

## Layout and navigation

| Component                    | What it is                                                                                                                                                                                           |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NavBar`                     | The top bar: logo, links and Join button. On small screens the links move into `MobileMenu`.                                                                                                         |
| `NavBar/NavLinks` (client)   | The list of nav links. Highlights the current section, so `/projects/rover` still highlights Projects.                                                                                               |
| `NavBar/MobileMenu` (client) | The "Menu" dropdown on small screens. Closes on Escape, on an outside tap or after choosing a link.                                                                                                  |
| `Logo`                       | The black-and-white emblem (`public/brand/logo-bw.svg`), linking home.                                                                                                                               |
| `Footer`                     | Site blurb, quick links, contact links and the copyright year, on a grid background.                                                                                                                 |
| `TitleBand`                  | The dark header strip at the top of every page: eyebrow, title, and optionally intro text and buttons (`hero` makes it the bigger Home version). Pass `grid="..."` to choose its background drawing. |
| `CtaBand`                    | The closing "call to action" strip with a heading and one button, used at the end of Home and About.                                                                                                 |
| `SectionHeader`              | A numbered section heading ("01 / Projects"), with an optional subtitle. Give it an `id` and point the section's `aria-labelledby` at it.                                                            |

## Content blocks

| Component                     | What it is                                                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                      | The arrow button. With `href` it's a link; without it, a real `<button>`. Variants: `primary`, `link-dark`, `link-light`.                |
| `Tag`                         | A small discipline label ("Mechanical"). `onDark` for dark backgrounds.                                                                  |
| `Photo`                       | An image that covers its box. With no `src`, it shows a grey placeholder block instead, so pages still lay out before real photos exist. |
| `ProjectCard`                 | A project preview: cover photo, tags, title, description. The whole card is one link.                                                    |
| `ProjectGrid` (client)        | The Projects page list with filter tabs. The filter lives in the URL (`?discipline=software`), so a filtered view can be shared.         |
| `ProjectGrid/ProjectGridView` | The same list without browser code. It's shown before JavaScript loads, then `ProjectGrid` takes over.                                   |
| `FilterTabs`                  | A row of toggle buttons. The parent owns which one is selected.                                                                          |
| `EventCard`                   | An upcoming event: big date, title, venue, description.                                                                                  |
| `EventCard/EventRow`          | A past event as a single compact row.                                                                                                    |
| `EventCard/EventTitle`        | An event's title, or a link if the event has one. Shared by the card and the row.                                                        |
| `TeamMemberCard`              | Photo, name and role.                                                                                                                    |
| `StatBlock`                   | A big number with a label ("40+ Members"). Values are strings so they show exactly as written.                                           |
| `ValueItem`                   | A numbered item with a title and description, used for disciplines and values.                                                           |

## Forms

| Component              | What it is                                                                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ContactForm` (client) | The contact form. Sends to the server action in `src/app/contact/actions.ts`; shows a "Sending…" state, inline field errors and a thank-you message. If the request itself fails (e.g. Vercel's rate limit), it shows an error instead of crashing. It includes a hidden honeypot field to catch bots. |
| `FormField`            | A labelled input or textarea, with its error message wired up for screen readers.                                                                                                                                                                                                                      |

## `GridBackground`: the engineering drawings

The graph-paper grid behind every title band, plus an optional animated drawing on top. It's decorative only: hidden from screen readers and ignoring the mouse (except the Team crosshair).

```tsx
<GridBackground variant="projects" />  // grid + that page's drawing
<GridBackground plain />               // just the grid, no axis numbers (the footer uses this)
```

The parent element must be `position: relative` (and usually `overflow: hidden`), and its content needs `position: relative` to sit above the grid.

| Variant    | Drawing                                                        | Where it's drawn                |
| ---------- | -------------------------------------------------------------- | ------------------------------- |
| `home`     | Bevel gear pair, turning                                       | `LiveFigure.tsx`                |
| `about`    | Robotic arm doing pick-and-place                               | `LiveFigure.tsx`                |
| `team`     | Crosshair that follows the mouse and shows grid coordinates    | `CoordinateTracker.tsx`         |
| `projects` | Exploded spur gear differential, parts turning, plus its label | `LiveFigure.tsx`, `figures.tsx` |
| `events`   | Breadth-first search spreading across the whole band           | `GraphSearch.tsx`               |
| `contact`  | Rotating globe with Melbourne marked, plus its labels          | `LiveFigure.tsx`, `figures.tsx` |

**Files**

| File                             | What it does                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GridBackground.tsx`             | Draws the grid and axis numbers, and picks which drawing to add for each variant.                                                                                                                 |
| `GridBackground.module.css`      | Grid lines, drawing colours, the crosshair, and where the drawing box sits.                                                                                                                       |
| `figures.tsx`                    | Static parts that don't move (text labels). Also the list of variant names: add a key here for a new one.                                                                                         |
| `LiveFigure.tsx` (client)        | The 3D wireframes. Each scene is a function of time that returns lines in 3D; `wireframe()` rotates and flattens them into SVG paths. Back edges are drawn dotted so front and back read clearly. |
| `GraphSearch.tsx` (client)       | The Events graph: places nodes on grid points (avoiding the title), links each to its nearest neighbours, and animates a breadth-first search from the left. Starts a new random graph each loop. |
| `CoordinateTracker.tsx` (client) | The Team crosshair. Snaps to grid points and shows `X · Y` in grid cells, counted from the content's left edge. Only shows with a mouse.                                                          |

**Behaviour to know about**

- The drawings sit in a 480 × 192 box (20 × 8 grid cells) to the right of the title. Coordinates in multiples of 24 land on grid lines.
- Drawings are hidden below 1024px wide, where the title fills the band. The Events graph is the exception: it fills the whole band at every size.
- Animations only run while their band is on screen. They stop completely when the visitor's system asks for reduced motion.
- Colours: drawings use the muted grey token. Orange is kept for the Events nodes, the Melbourne dot and the crosshair.
- To add a 3D drawing: add a scene to `scenes` in `LiveFigure.tsx`, add its name to `live` in `GridBackground.tsx`, and add a key (usually `null`) to `figures.tsx`.
