import styles from "./GridBackground.module.css";

// Decorative only, so it is hidden from screen readers. The parent must be position: relative.
export function GridBackground() {
  return <div aria-hidden="true" className={styles.grid} />;
}
