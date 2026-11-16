import type { ClubEvent } from "@/lib/types";

const event = (n: number, date: string): ClubEvent => ({
  title: `Event ${n}`, // PLACEHOLDER
  date, // PLACEHOLDER
  venue: "Venue TBC", // PLACEHOLDER
  description: "Short description of the event goes here.", // PLACEHOLDER
});

// Upcoming and past are worked out from the date, so order here does not matter.
export const events: ClubEvent[] = [
  event(1, "2027-03-04"),
  event(2, "2027-03-18"),
  event(3, "2027-04-01"),
  event(4, "2026-10-15"),
  event(5, "2026-08-20"),
  event(6, "2026-05-07"),
];
