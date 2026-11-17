import type { ClubEvent } from "@/lib/types";

// Today's date in Melbourne as "YYYY-MM-DD" (en-CA formats dates that way), so an event
// stays "upcoming" for the whole of its day in Melbourne, whatever timezone the server is in.
const melbourneToday = (now: Date) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(
    now,
  );

// ISO date strings sort correctly as plain strings, so no date parsing is needed.
export function splitEvents(events: ClubEvent[], now: Date) {
  const today = melbourneToday(now);
  const upcoming = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((event) => event.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
