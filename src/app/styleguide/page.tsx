import type { Metadata } from "next";
import styles from "./styleguide.module.css";
import { ComponentSections } from "./ComponentSections";

// Temporary page for checking tokens and components while the site is built. Delete before launch.
export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design tokens and components for the EMC² website.",
  robots: { index: false },
};

const colours = [
  "ink",
  "paper",
  "surface",
  "accent",
  "accent-on-dark",
  "danger",
  "text-primary",
  "text-secondary",
  "text-on-dark-primary",
  "text-on-dark-secondary",
  "text-on-dark-muted",
  "text-on-dark-faint",
  "border",
  "border-on-dark",
  "placeholder",
];

const typeScale = [
  "display",
  "h1",
  "h2",
  "h2-cta",
  "h3",
  "stat",
  "body-lg",
  "body",
  "body-sm",
  "meta",
  "nav",
  "button",
  "label",
  "tag",
];

const spacing = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
];

export default function Styleguide() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Styleguide</h1>

      <section aria-labelledby="colour">
        <h2 id="colour" className={styles.heading}>
          Colour
        </h2>
        <ul role="list" className={styles.swatches}>
          {colours.map((name) => (
            <li key={name}>
              <div
                className={styles.swatch}
                style={{ background: `var(--color-${name})` }}
              />
              <code className={styles.name}>--color-{name}</code>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="type">
        <h2 id="type" className={styles.heading}>
          Type scale
        </h2>
        <ul role="list" className={styles.stack}>
          {typeScale.map((role) => (
            <li key={role} className={styles.typeRow}>
              <code className={styles.name}>{role}</code>
              <p className={styles[`type-${role}`]}>
                Engineering drawing, precise and calm.
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="spacing">
        <h2 id="spacing" className={styles.heading}>
          Spacing
        </h2>
        <ul role="list" className={styles.stack}>
          {spacing.map((size) => (
            <li key={size} className={styles.spaceRow}>
              <code className={styles.name}>--space-{size}</code>
              <div
                className={styles.bar}
                style={{ width: `var(--space-${size})` }}
              />
            </li>
          ))}
        </ul>
      </section>

      <ComponentSections />
    </div>
  );
}
