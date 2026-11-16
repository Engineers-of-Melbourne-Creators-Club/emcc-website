export type SiteLink = { label: string; href: string };

export const site = {
  name: "EMC²",
  longName: "Engineers of Melbourne Creators Club",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Events", href: "/events" },
    { label: "Contact", href: "/contact" },
  ] satisfies SiteLink[],
  join: { label: "Join", href: "/contact" } satisfies SiteLink,
  footer: {
    blurb:
      "A University of Melbourne student club where engineers of every discipline design, build and ship things together.", 
    copyright: "© 2027 Engineers of Melbourne Creators Club.", 
  },
  contact: {
    email: "hello@example.com", // TODO: do we even have an email lol
  },
  socials: {
    instagram: { label: "@emc2.melb", href: "https://www.instagram.com/emc2.melb/" }, 
    discord: { label: "Join our server", href: "#" }, // TODO: is our discord even public?? maybe remove
  },
};
