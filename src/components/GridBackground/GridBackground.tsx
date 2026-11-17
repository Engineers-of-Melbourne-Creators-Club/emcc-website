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

// Team's converging wave: WAVES cycles starting at the bottom-left of the grid, with the height
// shrinking in a straight line until the peaks and troughs meet at a point halfway up the right
// edge. Drawn in a 1000 × 100 box that the SVG stretches to fill the band.
const WAVES = 4;
const wave = Array.from({ length: 401 }, (_, i) => {
  const t = i / 400;
  const y = 50 + 49 * (1 - t) * Math.cos(2 * Math.PI * WAVES * t);
  return `${i ? "L" : "M"}${(t * 1000).toFixed(1)} ${y.toFixed(2)}`;
}).join("");

// Decorative only, so it is hidden from screen readers. The parent must be position: relative.
// Every band except `plain` ones gets the crosshair that follows the mouse.
// `plain` drops the axis labels, for bands that just want the grid texture.
export function GridBackground({
  variant,
  plain,
}: {
  variant?: GridVariant;
  plain?: boolean;
}) {
  return (
    <>
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
        {!plain && <CoordinateTracker />}
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
            {live.includes(variant) && (
              <LiveFigure kind={variant as LiveKind} />
            )}
          </svg>
        )}
      </div>
      {/* Positioned against the band, not the grid, so it spans exactly the visible width. */}
      {variant === "team" && (
        <svg
          aria-hidden="true"
          className={styles.wave}
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path d={wave} />
        </svg>
      )}
    </>
  );
}
