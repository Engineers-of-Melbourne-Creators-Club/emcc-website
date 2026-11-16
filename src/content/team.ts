import type { TeamGroup, TeamMember } from "@/lib/types";

// Display order and headings for each group on the Team page.
export const teamGroups: { group: TeamGroup; title: string }[] = [
  { group: "Leadership", title: "Leadership" },
  { group: "Mechanical", title: "Mechanical Team" },
  { group: "Electrical", title: "Electrical Team" },
  { group: "Software", title: "Software Team" },
  { group: "Civil & Environmental", title: "Civil & Environmental Team" },
];

const member = (group: TeamGroup, role: string): TeamMember => ({
  name: "Member Name", // PLACEHOLDER
  role, // PLACEHOLDER
  group,
});

export const team: TeamMember[] = [
  member("Leadership", "President"),
  member("Leadership", "Vice President"),
  member("Leadership", "Treasurer"),
  member("Leadership", "Secretary"),
  ...(
    ["Mechanical", "Electrical", "Software", "Civil & Environmental"] as const
  ).flatMap((group) => [
    member(group, "Team Lead"),
    member(group, "Member"),
    member(group, "Member"),
  ]),
];
