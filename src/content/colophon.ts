export const colours = [
  { name: "Ink", token: "--color-ink", hex: "#0E0F11" },
  { name: "Paper", token: "--color-paper", hex: "#F7F7F5" },
  { name: "Rust", token: "--color-accent", hex: "#C2410C" },
  { name: "Rust on dark", token: "--color-accent-on-dark", hex: "#F26B2E" },
];

export const colophon: { label: string; text: string; colours?: true }[] = [
  {
    label: "Typeface",
    text: "Set in Geist and Geist Mono, by Vercel. Geist for headings and body text, Geist Mono for labels, numbers and the drawings.",
  },
  {
    label: "Colour",
    text: "Two neutrals and one accent. The orange represents the bright colour of steel coming out of a forge, symbolising the beauty of things being made. It comes in two shades so small text stays readable on both light and dark backgrounds.",
    colours: true,
  },
  {
    label: "Grid",
    text: "Every engineer's ideas start on graph paper, so the site starts there too. Every dark band sits on a grid of 24px cells with a heavier line every 96px, and the drawings are laid out on it like they would be on the page. The numbers along the top count cells from the left edge of the content.",
  },
  {
    label: "Drawings",
    text: "Each page has its own drawing, and each one is a small nod to a different corner of engineering. Look carefully through each page and think about what they represent. They're plain SVG, projected from 3D in a few lines of TypeScript, with no graphics library. The site builds its own parts too.",
  },
  {
    label: "Footer",
    text: "Three rockets fly around down in the footer, curving as they go and bouncing off the edges, the text and each other. You might've not even noticed!",
  },
  {
    label: "Built with",
    text: "Next.js, React and TypeScript, styled with CSS Modules, and love <3",
  },
  {
    label: "Made by",
    text: "The 2026 EMCC website team.",
  },
];
