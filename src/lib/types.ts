export type Discipline = "Mechanical" | "Electrical" | "Software" | "Civil";

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  disciplines: Discipline[];
  description: string;
  cover?: string;
  overview: string;
  status: string;
  year: string;
  team: { name: string; role: string; photo?: string }[];
  links: Link[];
  gallery: string[];
};

export type TeamGroup =
  | "Leadership"
  | "Mechanical"
  | "Electrical"
  | "Software"
  | "Civil & Environmental";

export type TeamMember = {
  name: string;
  role: string;
  group: TeamGroup;
  photo?: string;
};

export type ClubEvent = {
  title: string;
  // "YYYY-MM-DD"
  date: string;
  venue: string;
  description: string;
  // Optional external page: an Instagram post, ticket page, sign-up form, etc.
  link?: string;
};
