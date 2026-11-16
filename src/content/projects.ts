import type { Project } from "@/lib/types";

// Images go in public/projects/ (at the repo root) and are referenced from the site root,
// for example cover: "/projects/solar-car-cover.jpg".
type ProjectInput = Omit<Project, "slug" | "team" | "links" | "gallery"> &
  Partial<Pick<Project, "team" | "links" | "gallery">>;

// The page URL comes from the title ("Solar Car" -> /projects/solar-car), so it never needs typing twice.
const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// team, links and gallery are optional so their sections are hidden on the project page when empty
const project = ({
  team = [],
  links = [],
  gallery = [],
  ...rest
}: ProjectInput): Project => ({
  slug: slugify(rest.title),
  team,
  links,
  gallery,
  ...rest,
});

// PLACEHOLDER: every project below is a stand-in
const overview = Array(6)
  .fill("Placeholder paragraph. Replace with the real text.")
  .join(" ");
const team = Array(3).fill({ name: "Member Name", role: "Role" });
const links = [
  { label: "Repository", href: "#" },
  { label: "Updates", href: "#" },
];

// Order matters: the Home page shows the first three.
export const projects: Project[] = [
  project({
    title: "Autonomous Rover",
    disciplines: ["Mechanical", "Software"],
    description:
      "A small rover that maps a room and drives itself around obstacles.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
    // cover: "/projects/autonomous-rover-cover.jpg",
    // gallery: ["/projects/autonomous-rover-1.jpg"],
  }),
  project({
    title: "Smart Power Monitor",
    disciplines: ["Electrical"],
    description:
      "A plug-in sensor that tracks how much power a device uses over a day.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Footbridge Model",
    disciplines: ["Civil"],
    description:
      "A scale footbridge designed, built and load-tested to destruction.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Robotic Arm",
    disciplines: ["Mechanical", "Electrical"],
    description:
      "A desktop arm with four joints that picks up and sorts small parts.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Club Inventory App",
    disciplines: ["Software"],
    description:
      "A web app for booking out the club's tools and tracking parts stock.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Rainwater Harvester",
    disciplines: ["Mechanical", "Software", "Civil"],
    description:
      "A rooftop collection system that logs rainfall and tank levels online.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Solar Bench",
    disciplines: ["Electrical", "Civil"],
    description:
      "An outdoor bench with a solar panel that charges phones on campus.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
  project({
    title: "Structural Health Sensor",
    disciplines: ["Civil", "Electrical"],
    description:
      "Low-cost sensors that measure vibration in a structure over time.",
    overview,
    status: "TBC",
    year: "TBC",
    team,
    links,
  }),
];

// Two projects with the same title would share a URL, so fail the build instead.
const slugs = projects.map((p) => p.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error(`Duplicate project slug in: ${slugs.join(", ")}`);
}
