# `src/styles`: design tokens and base styles

Both files are loaded once, for the whole site, by `src/app/globals.css`.

| File         | What it holds                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.css` | Every design value as a CSS custom property: colours, fonts, type sizes, spacing, layout widths, grid size, transitions.                                 |
| `base.css`   | The reset (no default margins, `border-box` sizing, sensible images and form controls), page defaults, focus outlines, and a few shared utility classes. |

## The rule

**Components use tokens, never raw values.** Write `color: var(--color-text-secondary)`, not `color: #6b6e73`. To change how the whole site looks, such as the accent colour or the heading sizes, change the token once in `tokens.css`.

## Tokens worth knowing

| Token(s)                                   | Used for                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------- |
| `--color-ink`, `--color-paper`             | The dark bands (title bands, footer, stats) and the light page background               |
| `--color-accent`, `--color-accent-on-dark` | Rust orange. Two shades so small text is readable on both light and dark backgrounds.   |
| `--color-text-on-dark-*`                   | Text on dark bands: `primary`, `secondary` and `muted` (the grey the grid drawings use) |
| `--font-sans`, `--font-mono`               | Geist and Geist Mono. Mono is used for eyebrows, labels and the grid drawings.          |
| `--text-*-size` / `-leading` / `-tracking` | The type scale: `display`, `h1`, `h2`, `body`, `label`, and so on                       |
| `--grid-cell`, `--grid-major`              | The grid background: 24px cells, a darker line every 96px                               |
| `--content-max`, `--page-gutter`           | Content width (1180px) and the side margin on narrow screens                            |

**Responsive sizes:** at the bottom of `tokens.css`, media queries shrink headings and padding on smaller screens by changing the tokens. Components get the right sizes automatically and rarely need their own media queries.

## Utility classes (`base.css`)

| Class              | What it does                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `.container`       | Centres content at the site width, with page gutters. Wrap each section's content in it. |
| `.eyebrow`         | The small orange mono label above a heading.                                             |
| `.visually-hidden` | Hides something on screen but keeps it for screen readers, e.g. "(opens in a new tab)".  |
