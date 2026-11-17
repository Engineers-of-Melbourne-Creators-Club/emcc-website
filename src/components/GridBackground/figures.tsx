import type { ReactNode } from "react";

// Each figure is drawn on a 480 × 192 canvas (20 × 8 grid cells of 24px), so lines on multiples of 24 land on the grid.

// About: LiveFigure draws the robot arm, so there is nothing static.
const about = null;

// Team: the sine wave, which GridBackground draws across the whole band.
const team = null;

// Projects: label for the exploded differential that LiveFigure draws.
const projects = (
  <>
    {/* x = 480 is the 48 tick; the label ends on that line. */}
    <text x="480" y="186" textAnchor="end">
      SPUR GEAR DIFFERENTIAL
    </text>
  </>
);

// Home: LiveFigure draws the bevel gears, so there is nothing static.
const home = null;

// Events: GraphSearch draws across the whole band, so there is nothing in the figure box.
const events = null;

// Contact: labels for the rotating globe that LiveFigure draws, with Melbourne marked.
const contact = (
  <>
    <text x="344" y="164">
      MELBOURNE
    </text>
    <text x="344" y="180">
      37.81°S 144.96°E
    </text>
  </>
);

export const figures = {
  home,
  about,
  team,
  projects,
  events,
  contact,
} satisfies Record<string, ReactNode>;
