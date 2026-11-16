import type { TeamGroup, TeamMember } from "@/lib/types";

type GroupHeading = { group: TeamGroup; title: string };

// Display order and headings on the Team page. Leadership and the engineering teams come first;
// the club's non-engineering teams are shown below them, after a divider.
export const engineeringGroups: GroupHeading[] = [
  { group: "Leadership", title: "Leadership" },
  { group: "Mechanical", title: "Mechanical Team" },
  { group: "Electrical", title: "Electrical Team" },
  { group: "Software", title: "Software Team" },
  { group: "Civil & Environmental", title: "Civil & Environmental Team" },
];

export const clubGroups: GroupHeading[] = [
  { group: "Publicity", title: "Publicity Team" },
  { group: "Events", title: "Events Team" },
  { group: "People & Culture", title: "People & Culture Team" },
  { group: "HR", title: "HR Team" },
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
    [
      "Mechanical",
      "Electrical",
      "Software",
      "Civil & Environmental",
      "Publicity",
      "Events",
      "People & Culture",
      "HR",
    ] as const
  ).flatMap((group) => [
    member(group, "Team Lead"),
    member(group, "Member"),
    member(group, "Member"),
  ]),
];
