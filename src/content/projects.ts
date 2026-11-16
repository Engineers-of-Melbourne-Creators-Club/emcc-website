import type { Discipline, Project } from "@/lib/types";

const overview = Array(6)
  .fill("Placeholder paragraph. Replace with the real text.")
  .join(" "); // PLACEHOLDER

// Every placeholder project shares the same details; only the number and disciplines differ.
const placeholder = (n: number, disciplines: Discipline[]): Project => ({
  slug: `project-${n}`, // PLACEHOLDER
  title: `Project ${n}`, // PLACEHOLDER
  disciplines, // PLACEHOLDER
  description:
    "Short description of the project goes here, in one or two sentences.", // PLACEHOLDER
  overview,
  status: "TBC", // PLACEHOLDER
  year: "TBC", // PLACEHOLDER
  teamSize: "TBC", // PLACEHOLDER
  team: Array(3).fill({ name: "Member Name", role: "Role" }), // PLACEHOLDER
  links: [
    { label: "Repository", href: "#" }, // PLACEHOLDER
    { label: "Updates", href: "#" }, // PLACEHOLDER
  ],
  gallery: [],
});

// Order matters: the Home page shows the first three.
export const projects: Project[] = [
  placeholder(1, ["Mechanical", "Software"]),
  placeholder(2, ["Electrical"]),
  placeholder(3, ["Civil"]),
  placeholder(4, ["Mechanical", "Electrical"]),
  placeholder(5, ["Software"]),
  placeholder(6, ["Mechanical", "Software", "Civil"]),
  placeholder(7, ["Electrical", "Civil"]),
  placeholder(8, ["Civil", "Electrical"]),
];
