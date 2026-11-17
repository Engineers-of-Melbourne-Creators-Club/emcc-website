"use client";

import { useEffect, useRef } from "react";
import styles from "./GridBackground.module.css";

type Node = { x: number; y: number };
type Graph = {
  nodes: Node[];
  // BFS result: depth and parent of each reached node, in visit order.
  order: number[];
  depth: number[];
  parent: number[];
  maxDepth: number;
};
type Rect = { l: number; t: number; r: number; b: number };

const STEP = 0.6; // seconds per BFS layer
const HOLD = 3; // seconds to show the finished search before restarting

// Small seeded generator so each loop gets a new but repeatable graph.
function random(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const inside = (x: number, y: number, a: Rect) =>
  x > a.l && x < a.r && y > a.t && y < a.b;

// One node per 4 × 3 cell block, jittered onto a grid intersection, kept out of the title.
// Each node links to its 3 nearest neighbours, skipping links that would cross the title.
function build(
  seed: number,
  cell: number,
  x0: number,
  w: number,
  h: number,
  avoid: Rect,
): Graph {
  const rand = random(seed);
  const nodes: Node[] = [];
  const first = Math.ceil(x0 / cell) + 1;
  const last = Math.floor((x0 + w) / cell) - 1;
  const rows = Math.floor(h / cell) - 1;
  for (let bx = first; bx <= last - 2; bx += 4) {
    for (let by = 3; by <= rows - 1; by += 3) {
      const gx = bx + Math.floor(rand() * 3);
      const gy = Math.min(rows, by + Math.floor(rand() * 2));
      const [x, y] = [gx * cell, gy * cell];
      if (inside(x, y, avoid)) continue;
      nodes.push({ x, y });
    }
  }

  if (!nodes.length)
    return { nodes, order: [], depth: [], parent: [], maxDepth: 0 };

  const crosses = (a: Node, b: Node) =>
    [0.25, 0.5, 0.75].some((f) =>
      inside(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, avoid),
    );
  const key = new Set<string>();
  const adj: number[][] = nodes.map(() => []);
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter(({ j }) => j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const k = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (key.has(k) || crosses(a, nodes[j])) return;
        key.add(k);
        adj[i].push(j);
        adj[j].push(i);
      });
  });

  // BFS from the leftmost node.
  const start = nodes.reduce(
    (best, n, i) => (n.x < nodes[best].x ? i : best),
    0,
  );
  const depth = nodes.map(() => -1);
  const parent = nodes.map(() => -1);
  const order = [start];
  depth[start] = 0;
  for (let q = 0; q < order.length; q++) {
    for (const v of adj[order[q]]) {
      if (depth[v] !== -1) continue;
      depth[v] = depth[order[q]] + 1;
      parent[v] = order[q];
      order.push(v);
    }
  }
  return {
    nodes,
    order,
    depth,
    parent,
    maxDepth: depth[order[order.length - 1]],
  };
}

const f = (n: number) => n.toFixed(1);

// Breadth-first search across the whole band: tree edges grow out layer by layer and each node reached turns orange.
export function GraphSearch() {
  const tree = useRef<SVGPathElement>(null);
  const dots = useRef<SVGGElement>(null);

  useEffect(() => {
    const svgEl = tree.current?.ownerSVGElement;
    const band = svgEl?.parentElement?.parentElement;
    if (!svgEl || !band) return;
    const css = getComputedStyle(svgEl.parentElement!);
    const cell = parseFloat(css.getPropertyValue("--grid-cell"));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let seed = 1;
    let graph: Graph | null = null;
    let size = "";
    let start = 0;
    let shown = -1;
    let raf = 0;

    const draw = (ms: number) => {
      // React clears refs on unmount before this effect's cleanup runs, so a frame can land in between.
      const [treeEl, dotsEl] = [tree.current, dots.current];
      if (!treeEl || !dotsEl) return;
      const svg = svgEl.getBoundingClientRect();
      const b = band.getBoundingClientRect();
      // Skip the work while the band is scrolled off-screen, but keep the loop alive for when it returns.
      if (!still && (b.bottom <= 0 || b.top >= innerHeight)) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const x0 = b.left - svg.left;
      const next = `${b.width}x${svg.height}`;
      const t = (ms - start) / 1000;

      if (
        !graph ||
        next !== size ||
        (!still && t > graph.maxDepth * STEP + HOLD)
      ) {
        if (graph && next === size) seed++;
        // Keep nodes and links out of the eyebrow and title, with a cell of padding.
        const text = [...band.querySelectorAll("h1, p")].map((e) =>
          e.getBoundingClientRect(),
        );
        const avoid = {
          l: Math.min(...text.map((r) => r.left)) - svg.left - cell,
          t: Math.min(...text.map((r) => r.top)) - svg.top - cell,
          r: Math.max(...text.map((r) => r.right)) - svg.left + cell,
          b: Math.max(...text.map((r) => r.bottom)) - svg.top + cell,
        };
        graph = build(seed, cell, x0, b.width, svg.height, avoid);
        size = next;
        start = ms;
        shown = -1;
      }

      const { nodes, order, depth, parent } = graph;
      // Reduced motion shows the finished search.
      const layer = still ? Infinity : (ms - start) / 1000 / STEP;
      let d = "";
      for (const v of order) {
        const p = parent[v];
        if (p === -1) continue;
        // The edge into a node at depth k grows while the layer runs from k − 1 to k.
        const g = Math.min(1, Math.max(0, layer - (depth[v] - 1)));
        if (g === 0) continue;
        const [a, c] = [nodes[p], nodes[v]];
        d += `M${f(a.x)} ${f(a.y)}L${f(a.x + (c.x - a.x) * g)} ${f(a.y + (c.y - a.y) * g)}`;
      }
      treeEl.setAttribute("d", d);

      // Rebuild the node markup only when another node has been reached.
      const reached = order.filter((v) => depth[v] <= layer).length;
      if (reached !== shown) {
        shown = reached;
        const hit = new Set(order.slice(0, reached));
        dotsEl.innerHTML = nodes
          .map((n, i) =>
            hit.has(i)
              ? `<circle class="${styles.ping}" cx="${n.x}" cy="${n.y}" r="3.5"/>`
              : `<circle class="${styles.node}" cx="${n.x}" cy="${n.y}" r="2"/>`,
          )
          .join("");
      }

      if (!still) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <g>
      <path ref={tree} className={styles.edge} />
      <g ref={dots} />
    </g>
  );
}
