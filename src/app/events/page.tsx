import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { EventCard } from "@/components/EventCard/EventCard";
import { EventRow } from "@/components/EventCard/EventRow";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { events } from "@/content/events";
import { splitEvents } from "@/lib/events";
import styles from "./events.module.css";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming workshops, site visits and socials, plus what we've run before.",
};

export default async function Events() {
  // The page is static but rebuilt at most once a day, so events move from
  // "Upcoming" to "Past" on their own without a redeploy.
  "use cache";
  cacheLife("days");

  const { upcoming, past } = splitEvents(events, new Date());

  return (
    <>
      <TitleBand eyebrow="Events" title="What's on." />

      <div className={`container ${styles.body}`}>
        <section aria-labelledby="upcoming" className={styles.section}>
          <SectionHeader
            id="upcoming"
            index={1}
            label="Upcoming"
            title="Upcoming"
          />
          {upcoming.length > 0 ? (
            <ul role="list" className={styles.cards}>
              {upcoming.map((event) => (
                <li key={`${event.date}-${event.title}`}>
                  <EventCard
                    date={event.date}
                    title={event.title}
                    location={event.venue}
                    description={event.description}
                    link={event.link}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>
              Nothing scheduled yet. Check back soon.
            </p>
          )}
        </section>

        {past.length > 0 && (
          <section aria-labelledby="past" className={styles.section}>
            <SectionHeader
              id="past"
              index={2}
              label="Past"
              title="Past events"
            />
            <ul role="list">
              {past.map((event) => (
                <li key={`${event.date}-${event.title}`}>
                  <EventRow
                    date={event.date}
                    title={event.title}
                    link={event.link}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
