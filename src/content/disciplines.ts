import type { Discipline } from "@/lib/types";

export const disciplines: { name: Discipline; description: string }[] = [
  {
    name: "Mechanical",
    description:
      "Rigs, robots and rapid prototyping: CAD, 3D printing and machining.",
  },
  {
    name: "Electrical",
    description:
      "Circuits, embedded systems and power, from breadboard to PCB.",
  },
  {
    name: "Software",
    description:
      "Apps, firmware and everything in between: web, mobile and embedded code.",
  },
  {
    name: "Civil",
    description:
      "Structures, sustainability and infrastructure for the world around us.",
  },
];
