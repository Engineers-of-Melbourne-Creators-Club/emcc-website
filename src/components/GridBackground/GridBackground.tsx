import type { CSSProperties } from "react";
import { CoordinateTracker } from "./CoordinateTracker";
import { figures } from "./figures";
import { GraphSearch } from "./GraphSearch";
import { LiveFigure, type LiveKind } from "./LiveFigure";
import styles from "./GridBackground.module.css";

export type GridVariant = keyof typeof figures;

// Variants with a part drawn every frame. Kept here because a server component cannot read values from a "use client" file.
const live: string[] = [
  "home",
  "about",
  "projects",
  "contact",
] satisfies LiveKind[];

// Axis labels at each major line, counted in cells from the content's left edge.
const ticks = Array.from({ length: 13 }, (_, i) => i);

// Decorative only, so it is hidden from screen readers. The parent must be position: relative.
// `plain` drops the axis labels, for bands that just want the grid texture.
export function GridBackground({
  variant,
  plain,
}: {
  variant?: GridVariant;
  plain?: boolean;
}) {
  return (
    <div aria-hidden="true" className={styles.grid}>
      {!plain &&
        ticks.map((i) => (
          <span
            key={i}
            className={styles.tick}
            style={{ "--i": i } as CSSProperties}
          >
            {i * 4}
          </span>
        ))}
      {variant === "team" && <CoordinateTracker />}
      {/* Events draws across the whole band rather than in the right-hand figure box. */}
      {variant === "events" && (
        <svg className={`${styles.figure} ${styles.full}`}>
          <GraphSearch />
        </svg>
      )}
      {variant && (
        <svg
          className={styles.figure}
          width="480"
          height="192"
          viewBox="0 0 480 192"
        >
          {figures[variant]}
          {live.includes(variant) && <LiveFigure kind={variant as LiveKind} />}
        </svg>
      )}
    </div>
  );
}
