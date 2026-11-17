"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./GridBackground.module.css";

type Pos = { col: number; row: number };

// Crosshair that snaps to the nearest grid intersection under the pointer. x counts cells from the content's left edge, y counts cells down from the top grid line.
export function CoordinateTracker() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const [origin, setOrigin] = useState({ cell: 24, col: 80 });

  useEffect(() => {
    const grid = ref.current?.parentElement;
    const band = grid?.parentElement;
    if (
      !grid ||
      !band ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    const css = getComputedStyle(grid);
    const cell = parseFloat(css.getPropertyValue("--grid-cell"));
    const col = (20 * parseFloat(css.getPropertyValue("--grid-major"))) / cell;
    setOrigin({ cell, col });

    const onMove = (e: PointerEvent) => {
      const r = grid.getBoundingClientRect();
      const next = {
        col: Math.round((e.clientX - r.left) / cell),
        row: Math.max(0, Math.round((e.clientY - r.top) / cell)),
      };
      setPos((p) => (p && p.col === next.col && p.row === next.row ? p : next));
    };
    const onLeave = () => setPos(null);
    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerleave", onLeave);
    return () => {
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const x = pos && pos.col * origin.cell;
  const y = pos && pos.row * origin.cell;
  return (
    <div ref={ref} className={styles.tracker}>
      {pos && (
        <>
          <div className={styles.trackerV} style={{ left: x! }} />
          <div className={styles.trackerH} style={{ top: y! }} />
          <div className={styles.trackerDot} style={{ left: x!, top: y! }} />
          <div className={styles.trackerLabel} style={{ left: x!, top: y! }}>
            X {pos.col - origin.col} · Y {pos.row}
          </div>
        </>
      )}
    </div>
  );
}
