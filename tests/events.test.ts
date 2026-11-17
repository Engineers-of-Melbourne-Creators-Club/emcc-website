// Run with `pnpm test`. Node runs TypeScript directly (22.18+), so no test library is needed.
import assert from "node:assert/strict";
import { test } from "node:test";
import { splitEvents } from "../src/lib/events.ts";

const event = {
  title: "Welcome Night",
  date: "2026-11-17",
  venue: "Venue TBC",
  description: "",
};

// The server runs in UTC, ~11 hours behind Melbourne in November.
test("an event stays upcoming for its whole Melbourne day", () => {
  // 1am on the 17th in Melbourne, still the 16th in UTC.
  const { upcoming } = splitEvents([event], new Date("2026-11-16T14:00Z"));
  assert.deepEqual(upcoming, [event]);
});

test("an event is past once its Melbourne day is over", () => {
  // 12:30am on the 18th in Melbourne, still the 17th in UTC.
  const { past } = splitEvents([event], new Date("2026-11-17T13:30Z"));
  assert.deepEqual(past, [event]);
});
