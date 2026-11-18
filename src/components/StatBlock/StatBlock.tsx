"use client";

import { useEffect, useRef } from "react";
import styles from "./StatBlock.module.css";

type Props = { value: string; label: string };

const DURATION = 1500; // ms

// A string value so stats like "40+" or "2019" read exactly as written. The number in it counts
// up from 0 the first time the stat scrolls into view; any text around the number stays as is.
export function StatBlock({ value, label }: Props) {
  const realRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Writes to the DOM directly rather than through state, so counting doesn't re-render React.
  useEffect(() => {
    const match = value.match(/^(\D*)(\d+)(.*)$/);
    const real = realRef.current;
    const counter = counterRef.current;
    if (!match || !real || !counter) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, before, digits, after] = match;
    const target = Number(digits);
    const show = (n: number) => {
      counter.textContent = `${before}${n}${after}`;
    };
    show(0);
    real.classList.add(styles.hidden);

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          show(Math.round(target * (1 - (1 - t) ** 3))); // ease-out: fast start, settles gently
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(real);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      counter.textContent = "";
      real.classList.remove(styles.hidden);
    };
  }, [value]);

  return (
    <div className={styles.stat}>
      <p className={styles.value}>
        {/* The real value keeps the width fixed and is what screen readers hear (and what shows
            without JS); the counting copy is drawn over it. */}
        <span ref={realRef}>{value}</span>
        <span ref={counterRef} aria-hidden="true" className={styles.counter} />
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
