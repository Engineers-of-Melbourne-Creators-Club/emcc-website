"use client";

import { useEffect, useRef } from "react";
import styles from "./GridBackground.module.css";

type V = [number, number, number];
type Frame = { near: string; far?: string; dot?: V };

// Rotate about the y axis by ay, then tilt about the x axis by ax. +z faces the viewer.
function rotate([x, y, z]: V, ay: number, ax: number): V {
  const x1 = x * Math.cos(ay) + z * Math.sin(ay);
  const z1 = -x * Math.sin(ay) + z * Math.cos(ay);
  return [
    x1,
    y * Math.cos(ax) - z1 * Math.sin(ax),
    y * Math.sin(ax) + z1 * Math.cos(ax),
  ];
}

// Orthographic projection centred on (cx, cy). Segments facing away go in `far` so the back can be drawn fainter.
function wireframe(
  lines: V[][],
  ay: number,
  ax: number,
  cx: number,
  cy: number,
) {
  let near = "";
  let far = "";
  for (const line of lines) {
    const p = line.map((v) => rotate(v, ay, ax));
    for (let i = 1; i < p.length; i++) {
      const [a, b] = [p[i - 1], p[i]];
      const seg = `M${(cx + a[0]).toFixed(1)} ${(cy - a[1]).toFixed(1)}L${(cx + b[0]).toFixed(1)} ${(cy - b[1]).toFixed(1)}`;
      if (a[2] + b[2] >= 0) near += seg;
      else far += seg;
    }
  }
  return { near, far };
}

const circle = (n: number, f: (a: number) => V) =>
  Array.from({ length: n + 1 }, (_, i) => f((i / n) * 2 * Math.PI));

// Exploded spur-gear differential laid out along the x axis: flange, shaft, cover plate, ring gear with sun and planets, shaft, flange.
const tau = 2 * Math.PI;

// A closed loop in the plane x = const, with radius given per angle, centred on (cy, cz) in that plane.
const loop = (x: number, r: (a: number) => number, n = 32, cy = 0, cz = 0) =>
  circle(n, (a): V => [x, cy + r(a) * Math.cos(a), cz + r(a) * Math.sin(a)]);

// Spur gear outline with trapezoidal teeth: pitch radius m·n/2, teeth from root (−m) to tip (+m).
function gear(
  x: number,
  n: number,
  m: number,
  turn: number,
  cy = 0,
  cz = 0,
): V[] {
  const r = (m * n) / 2;
  const pts: V[] = [];
  for (let i = 0; i < n; i++) {
    for (const [f, rr] of [
      [0, r - m],
      [0.15, r + m],
      [0.4, r + m],
      [0.55, r - m],
    ]) {
      const a = turn + ((i + f) / n) * tau;
      pts.push([x, cy + rr * Math.cos(a), cz + rr * Math.sin(a)]);
    }
  }
  return [...pts, pts[0]];
}

const flange = (x: number): V[][] => [
  loop(x - 4, (a) => 24 + 5 * Math.cos(6 * a), 72),
  loop(x + 4, (a) => 24 + 5 * Math.cos(6 * a), 72),
  loop(x, () => 7),
  ...Array.from({ length: 6 }, (_, i) =>
    loop(
      x + 4,
      () => 3,
      12,
      24 * Math.cos((i / 6) * tau),
      24 * Math.sin((i / 6) * tau),
    ),
  ),
];

const shaft = (x1: number, x2: number): V[][] =>
  [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * tau;
    return [
      [x1, 7 * Math.cos(a), 7 * Math.sin(a)],
      [x2, 7 * Math.cos(a), 7 * Math.sin(a)],
    ];
  });

// Parts that turn rigidly with the axle.
const body: V[][] = [
  ...flange(-190),
  ...shaft(-186, -120),
  loop(-120, () => 48, 48),
  loop(-108, () => 48, 48),
  loop(-120, () => 22),
  loop(-108, () => 22),
  ...Array.from({ length: 8 }, (_, i) =>
    loop(
      -108,
      () => 5,
      12,
      35 * Math.cos((i / 8) * tau),
      35 * Math.sin((i / 8) * tau),
    ),
  ),
  gear(-8, 48, 2.5, 0),
  gear(8, 48, 2.5, 0),
  loop(-8, () => 40, 48),
  loop(8, () => 40, 48),
  ...shaft(8, 170),
  ...flange(174),
];

// Turn about the axle (the x axis).
const spin = ([x, y, z]: V, a: number): V => [
  x,
  y * Math.cos(a) - z * Math.sin(a),
  y * Math.sin(a) + z * Math.cos(a),
];

// Everything turns with the axle; the sun and planets also turn on their own axes so the gears visibly mesh.
function differential(t: number): V[][] {
  const planets = [0, 1, 2, 3].map((i) => {
    const b = (i / 4) * tau;
    return gear(0, 8, 2, -t * 1.2, 20 * Math.cos(b), 20 * Math.sin(b));
  });
  return [...body, gear(0, 12, 2, t * 0.8), ...planets].map((line) =>
    line.map((v) => spin(v, t * 0.5)),
  );
}

const R = 110;
const onSphere = (lat: number, lon: number): V => [
  R * Math.cos(lat) * Math.sin(lon),
  R * Math.sin(lat),
  R * Math.cos(lat) * Math.cos(lon),
];
const deg = Math.PI / 180;
const globe: V[][] = [
  ...[-60, -30, 0, 30, 60].map((lat) =>
    circle(48, (a) => onSphere(lat * deg, a)),
  ),
  ...[0, 30, 60, 90, 120, 150].map((lon) =>
    circle(48, (a) => onSphere(a, lon * deg)),
  ),
];
const melbourne = onSphere(-37.81 * deg, 144.96 * deg);

// Bevel gear pair meshing at 90°: a 40-tooth gear on the vertical (y) axis and a 24-tooth pinion on the
// horizontal (x) axis. Both pitch cones share their apex at the origin and touch at (60, −36, 0).
const [N1, N2, M] = [40, 24, 3];
const [R1, R2] = [(M * N1) / 2, (M * N2) / 2];

// Tooth rings at the outer cone distance and 70% of it, ridges joining each tooth tip back toward the apex, and a bore.
// `place` maps (radius, angle, k) in the gear's own frame to 3D, where k scales toward the apex.
function bevel(
  n: number,
  r: number,
  turn: number,
  place: (rr: number, a: number, k: number) => V,
): V[][] {
  const tooth = [
    [0, r - M],
    [0.15, r + M],
    [0.4, r + M],
    [0.55, r - M],
  ];
  const ring = (k: number) => {
    const pts: V[] = [];
    for (let i = 0; i < n; i++)
      for (const [f, rr] of tooth)
        pts.push(place(rr, turn + ((i + f) / n) * tau, k));
    return [...pts, pts[0]];
  };
  const [outer, inner] = [ring(1), ring(0.7)];
  const ridges = outer.flatMap((p, i): V[][] =>
    i % 4 === 1 || i % 4 === 2 ? [[p, inner[i]]] : [],
  );
  return [outer, inner, ...ridges, circle(48, (a) => place(r * 0.45, a, 1))];
}

function bevelPair(t: number): V[][] {
  // Phases put a gear tooth in a pinion gap at the contact point; the pinion turns N1/N2 as fast, the other way.
  const a1 = t * 0.3 - 0.275 * (tau / N1);
  const a2 = Math.PI - 0.775 * (tau / N2) - t * 0.3 * (N1 / N2);
  return [
    ...bevel(N1, R1, a1, (rr, a, k) => [
      k * rr * Math.cos(a),
      -k * R2,
      k * rr * Math.sin(a),
    ]),
    ...bevel(N2, R2, a2, (rr, a, k) => [
      k * R1,
      k * rr * Math.cos(a),
      k * rr * Math.sin(a),
    ]),
  ];
}

// Shaft centre lines, drawn dotted like the chain lines on a drawing.
const axes: V[][] = [
  [
    [0, 24, 0],
    [0, -96, 0],
  ],
  [
    [-24, 0, 0],
    [120, 0, 0],
  ],
];

// Robot arm: round base, turret, shoulder, elbow and wrist links as boxes, and a two-finger gripper.
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: V, b: V, k = 1): V => [
  a[0] + b[0] * k,
  a[1] + b[1] * k,
  a[2] + b[2] * k,
];
const norm = (a: V): V => {
  const l = Math.hypot(...a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const cross = (a: V, b: V): V => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

// Box of half-width w around the segment p→q; n is the side direction (the arm plane's normal).
function box(p: V, q: V, w: number, n: V): V[][] {
  const u = norm(cross(norm(sub(q, p)), n));
  const ring = (c: V) =>
    [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
      [1, 1],
    ].map(([a, b]) => add(add(c, u, a * w), n, b * w));
  const [rp, rq] = [ring(p), ring(q)];
  return [rp, rq, ...rp.slice(0, 4).map((c, i) => [c, rq[i]])];
}

// One pick-and-place cycle every 6 s: swing, reach down, grip, lift, swing back.
function robotArm(t: number): V[][] {
  const ph = (t / 6) * tau;
  const yaw = 0.7 * Math.sin(ph);
  const a1 = 1.05 + 0.25 * Math.sin(2 * ph + 1); // shoulder, from horizontal
  const a2 = -1.5 + 0.35 * Math.sin(2 * ph + 1); // elbow, relative to the upper arm
  const grip = 3 + 4 * (0.5 + 0.5 * Math.cos(2 * ph)); // finger gap
  const fwd: V = [Math.cos(yaw), 0, Math.sin(yaw)];
  const side: V = [-Math.sin(yaw), 0, Math.cos(yaw)];
  const inPlane = (o: V, ang: number, len: number) =>
    add(add(o, fwd, len * Math.cos(ang)), [0, 1, 0], len * Math.sin(ang));

  const shoulder: V = [0, 34, 0];
  const elbow = inPlane(shoulder, a1, 80);
  const wrist = inPlane(elbow, a1 + a2, 70);
  const hand = add(wrist, [0, -1, 0], 14); // wrist stays pointing down
  const fingers = [-1, 1].flatMap((sgn) =>
    box(
      add(hand, side, sgn * grip),
      add(add(hand, side, sgn * grip), [0, -1, 0], 18),
      2,
      fwd,
    ),
  );
  const joint = (c: V) =>
    [-1, 1].map((sgn) =>
      circle(20, (a) =>
        add(
          add(add(c, side, sgn * 9), fwd, 10 * Math.cos(a)),
          [0, 1, 0],
          10 * Math.sin(a),
        ),
      ),
    );

  return [
    // base and turret
    ...[0, 12].map((y) =>
      circle(32, (a): V => [32 * Math.cos(a), y, 32 * Math.sin(a)]),
    ),
    ...[0, 1, 2, 3].map((i): V[] => {
      const a = (i / 4) * tau + yaw;
      return [
        [32 * Math.cos(a), 0, 32 * Math.sin(a)],
        [32 * Math.cos(a), 12, 32 * Math.sin(a)],
      ];
    }),
    ...box([0, 12, 0], shoulder, 10, side),
    // links, joints and gripper
    ...box(shoulder, elbow, 7, side),
    ...box(elbow, wrist, 6, side),
    ...box(wrist, hand, 5, side),
    box(add(hand, side, -grip - 3), add(hand, side, grip + 3), 3, fwd)[0],
    ...fingers,
    ...joint(shoulder),
    ...joint(elbow),
  ];
}

const scenes = {
  // Fixed three-quarter view; only the arm moves.
  about: (t: number): Frame =>
    wireframe(
      robotArm(t).map((l) =>
        l.map(([x, y, z]): V => [1.9 * x, 1.9 * y, 1.9 * z]),
      ),
      -0.5,
      0.3,
      250,
      232,
    ),
  // Fixed view from above and in front; only the gears turn.
  home: (t: number): Frame => {
    const [ay, ax, cx, cy, k] = [-0.8, 0.6, 250, 200, 3];
    const scale = (lines: V[][]) =>
      lines.map((l) => l.map(([x, y, z]): V => [k * x, k * y, k * z]));
    const gears = wireframe(scale(bevelPair(t)), ay, ax, cx, cy);
    const centre = wireframe(scale(axes), ay, ax, cx, cy);
    return { near: gears.near, far: gears.far + centre.near + centre.far };
  },
  // Fixed three-quarter view with the axle rising to the right; only the parts turn.
  projects: (t: number): Frame => {
    const [roll, k] = [0.12, 1.3];
    const lines = differential(t).map((line) =>
      line.map(([x, y, z]): V => [
        k * (x * Math.cos(roll) - y * Math.sin(roll)),
        k * (x * Math.sin(roll) + y * Math.cos(roll)),
        k * z,
      ]),
    );
    return wireframe(lines, 0.85, 0.25, 230, 120);
  },
  contact: (t: number): Frame => {
    const [ay, ax] = [t * 0.35, 0.35];
    const [x, y, z] = rotate(melbourne, ay, ax);
    return {
      ...wireframe(globe, ay, ax, 220, 116),
      dot: [220 + x, 116 - y, z],
    };
  },
};

export type LiveKind = keyof typeof scenes;

// Redraws every animation frame by setting path data directly, so React never re-renders. Reduced motion gets one still frame.
export function LiveFigure({ kind }: { kind: LiveKind }) {
  const near = useRef<SVGPathElement>(null);
  const far = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const draw = (ms: number) => {
      // Skip the maths while the figure is hidden on small screens.
      if (near.current?.getClientRects().length) {
        const f = scenes[kind](ms / 1000);
        near.current.setAttribute("d", f.near);
        far.current?.setAttribute("d", f.far ?? "");
        if (dot.current && f.dot) {
          dot.current.setAttribute("cx", String(f.dot[0]));
          dot.current.setAttribute("cy", String(f.dot[1]));
          dot.current.style.visibility = f.dot[2] >= 0 ? "visible" : "hidden";
        }
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    draw(2000);
    return () => cancelAnimationFrame(raf);
  }, [kind]);

  return (
    <g>
      <path ref={far} className={styles.far} />
      <path ref={near} />
      {kind === "contact" && <circle ref={dot} className={styles.ping} r="4" />}
    </g>
  );
}
