import type { ClubEvent } from "@/lib/types";

// date is "YYYY-MM-DD". link is optional (Instagram post, tickets, sign-up form) and makes the title clickable.
const event = (
  title: string,
  date: string,
  venue: string,
  description: string,
  link?: string,
): ClubEvent => ({ title, date, venue, description, link });

// Upcoming and past are worked out from the date, so order here does not matter.
// PLACEHOLDER: every event below is a stand-in
export const events: ClubEvent[] = [
  event(
    "Welcome Night",
    "2027-03-04",
    "Venue TBC",
    "Meet the committee and find out what the club is building this year.",
  ),
  event(
    "Intro to CAD Workshop",
    "2027-03-18",
    "Venue TBC",
    "A hands-on session covering the basics of 3D modelling for your first project.",
  ),
  event(
    "Project Pitch Night",
    "2027-04-01",
    "Venue TBC",
    "Teams pitch new project ideas and recruit members from every discipline.",
  ),
  event(
    "Soldering Workshop",
    "2026-10-15",
    "Venue TBC",
    "Learn to solder safely and build a small circuit to take home.",
  ),
  event(
    "Mid-Year Showcase",
    "2026-08-20",
    "Venue TBC",
    "Project teams demo what they have built so far this year.",
  ),
  event(
    "Industry Panel",
    "2026-05-07",
    "Venue TBC",
    "Engineers from local companies talk about their careers and answer questions.",
  ),
];
