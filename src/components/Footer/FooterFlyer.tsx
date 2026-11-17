"use client";

import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";

const COUNT = 3;
const SPEED = 70; // px per second
const R = 10; // collision radius, about half a rocket
// Each rocket weaves: its turn rate swings smoothly between +TURN and −TURN (radians per second),
// a full swing every 2π / WEAVE seconds. That gives S-shaped paths that never run straight and
// never settle into circling one spot.
const TURN = 0.7;
const WEAVE = 0.45;
// A bounce never leaves closer than this to straight off the surface, so a rocket always keeps
// some sideways speed and can't ping-pong in place between two walls.
const STEEPEST = (35 * Math.PI) / 180;

type Rocket = { x: number; y: number; heading: number; phase: number };

// Phase that makes the turn sin(phase) start at its strongest, in the given direction.
const strongest = (sign: number) => (sign >= 0 ? Math.PI / 2 : -Math.PI / 2);

// After a bounce, weave away from what was hit (nx, ny points away from it), so a rocket can't
// curve straight back into the same wall and skip along it.
function phaseAway(vx: number, vy: number, nx: number, ny: number) {
  const cross = vx * ny - vy * nx;
  return strongest(cross || Math.random() - 0.5);
}

// If (vx, vy) leaves the surface with normal (nx, ny) at closer than STEEPEST to straight off it,
// tilt it to exactly STEEPEST, keeping its sideways direction (or picking one if it has none).
function notTooSteep(vx: number, vy: number, nx: number, ny: number) {
  const speed = Math.hypot(vx, vy);
  const n = Math.hypot(nx, ny);
  const [ux, uy] = [nx / n, ny / n];
  const along = (vx * ux + vy * uy) / speed;
  if (along < Math.cos(STEEPEST)) return [vx, vy];
  let [tx, ty] = [vx / speed - along * ux, vy / speed - along * uy];
  let t = Math.hypot(tx, ty);
  if (t < 1e-6) {
    [tx, ty, t] = Math.random() < 0.5 ? [-uy, ux, 1] : [uy, -ux, 1];
  }
  const [c, s] = [Math.cos(STEEPEST), Math.sin(STEEPEST)];
  return [(ux * c + (tx / t) * s) * speed, (uy * c + (ty / t) * s) * speed];
}

type Box = { l: number; r: number; t: number; b: number };

// One box per line of actual text in the footer, grown by R, in footer coordinates. Measuring
// the text itself (not its element) leaves the empty part of each column free to fly through.
function textBoxes(footer: HTMLElement, f: DOMRect): Box[] {
  const boxes: Box[] = [];
  const range = document.createRange();
  const walk = document.createTreeWalker(footer, NodeFilter.SHOW_TEXT);
  for (let n = walk.nextNode(); n; n = walk.nextNode()) {
    if (!n.textContent?.trim()) continue;
    range.selectNodeContents(n);
    for (const r of range.getClientRects()) {
      const box = {
        l: r.left - f.left - R,
        r: r.right - f.left + R,
        t: r.top - f.top - R,
        b: r.bottom - f.top + R,
      };
      // A gap between text and a footer edge that is too narrow to turn in (like the strip under
      // the copyright line) is closed off, so a rocket can't get in and rattle along it.
      const tight = 3 * R;
      if (box.l < tight) box.l = -R;
      if (box.t < tight) box.t = -R;
      if (box.r > f.width - tight) box.r = f.width + R;
      if (box.b > f.height - tight) box.b = f.height + R;
      boxes.push(box);
    }
  }
  return boxes;
}

const inBox = (x: number, y: number, box: Box) =>
  x > box.l && x < box.r && y > box.t && y < box.b;

// Small rockets that weave around the footer. A rocket only changes course abruptly when it hits
// a footer edge, a line of text or another rocket: it bounces, then weaves away from it.
// Decorative only. Hidden when the visitor asks for reduced motion.
export function FooterFlyers() {
  const refs = useRef<(SVGSVGElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current;
    const footer = els[0]?.parentElement;
    if (!footer || els.some((el) => !el)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of els) el!.style.display = "none";
      return;
    }

    // Each rocket starts at a random clear spot in its own third of the footer, so they don't
    // begin on top of each other or on top of text (which they would then fly straight through).
    const start = footer.getBoundingClientRect();
    const startBoxes = textBoxes(footer, start);
    const rockets: Rocket[] = els.map((_, i) => {
      let x = 0;
      let y = 0;
      for (let tries = 0; tries < 50; tries++) {
        x = start.width * ((i + Math.random()) / COUNT);
        y = R + Math.random() * (start.height - 2 * R);
        if (!startBoxes.some((box) => inBox(x, y, box))) break;
      }
      return {
        x,
        y,
        heading: Math.random() * 2 * Math.PI,
        phase: Math.random() * 2 * Math.PI,
      };
    });
    let last = 0;
    let raf = 0;

    const step = (ms: number) => {
      raf = requestAnimationFrame(step);
      const f = footer.getBoundingClientRect();
      // Pause while the footer is off-screen, and don't jump ahead when it comes back.
      if (f.bottom <= 0 || f.top >= innerHeight) {
        last = 0;
        return;
      }
      const dt = last ? Math.min((ms - last) / 1000, 0.05) : 0;
      last = ms;
      const text = textBoxes(footer, f);

      for (const rk of rockets) {
        rk.phase += WEAVE * dt;
        rk.heading += TURN * Math.sin(rk.phase) * dt;
        let vx = Math.cos(rk.heading) * SPEED;
        let vy = Math.sin(rk.heading) * SPEED;
        let nx = rk.x + vx * dt;
        let ny = rk.y + vy * dt;
        // Sum of the normals of everything hit this frame, pointing away from it.
        let awayX = 0;
        let awayY = 0;

        if (nx < R || nx > f.width - R) {
          vx = -vx;
          awayX += nx < R ? 1 : -1;
          nx = Math.min(Math.max(nx, R), f.width - R);
        }
        if (ny < R || ny > f.height - R) {
          vy = -vy;
          awayY += ny < R ? 1 : -1;
          ny = Math.min(Math.max(ny, R), f.height - R);
        }

        // Text is a wall: flip the axis it was crossed on. A box the rocket is already inside
        // (e.g. after a resize) is ignored so it can fly back out.
        for (const box of text) {
          if (!inBox(nx, ny, box) || inBox(rk.x, rk.y, box)) continue;
          if (rk.x <= box.l || rk.x >= box.r) {
            vx = -vx;
            awayX += rk.x <= box.l ? -1 : 1;
          } else {
            vy = -vy;
            awayY += rk.y <= box.t ? -1 : 1;
          }
          nx = rk.x;
          ny = rk.y;
        }

        if (awayX || awayY) {
          [vx, vy] = notTooSteep(vx, vy, awayX, awayY);
          rk.phase = phaseAway(vx, vy, awayX, awayY);
        }
        rk.heading = Math.atan2(vy, vx);
        rk.x = nx;
        rk.y = ny;
      }

      // Rockets bounce off each other: each one moving towards the other is mirrored across the
      // line between them, and any overlap is pushed apart so they can't stick together.
      for (let i = 0; i < rockets.length; i++) {
        for (let j = i + 1; j < rockets.length; j++) {
          const [a, b] = [rockets[i], rockets[j]];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist >= 2 * R || dist === 0) continue;
          const [ux, uy] = [dx / dist, dy / dist];
          for (const [rk, sign] of [
            [a, 1],
            [b, -1],
          ] as const) {
            const vx = Math.cos(rk.heading);
            const vy = Math.sin(rk.heading);
            const along = vx * ux + vy * uy;
            if (along * sign <= 0) continue; // already moving away
            const [nvx, nvy] = [vx - 2 * along * ux, vy - 2 * along * uy];
            rk.heading = Math.atan2(nvy, nvx);
            rk.phase = phaseAway(nvx, nvy, -sign * ux, -sign * uy);
          }
          const push = (2 * R - dist) / 2;
          a.x -= ux * push;
          a.y -= uy * push;
          b.x += ux * push;
          b.y += uy * push;
        }
      }

      rockets.forEach((rk, i) => {
        els[i]!.style.transform =
          `translate(${rk.x - R}px, ${rk.y - R}px) rotate(${rk.heading}rad)`;
      });
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return Array.from({ length: COUNT }, (_, i) => (
    <svg
      key={i}
      ref={(el) => {
        refs.current[i] = el;
      }}
      aria-hidden="true"
      className={styles.flyer}
      width={2 * R}
      height={2 * R}
      viewBox="0 0 20 20"
    >
      {/* Points right; the transform turns it to face where it is going. */}
      <path className={styles.flame} d="M3 10 L-2 8 L0 10 L-2 12 Z" />
      <path d="M3 10 Q7 5.5 13 6.5 L18 10 L13 13.5 Q7 14.5 3 10 Z" />
      <path d="M6 7.2 L4 3.5 L9 6.6 M6 12.8 L4 16.5 L9 13.4" />
      <circle cx="12" cy="10" r="1.6" />
    </svg>
  ));
}
