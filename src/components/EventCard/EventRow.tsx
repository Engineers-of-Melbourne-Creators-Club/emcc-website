import { eventMonthYear } from "@/lib/dates";
import { EventTitle } from "./EventTitle";
import styles from "./EventCard.module.css";

type Props = { date: string; title: string; link?: string };

// Past events are a compact ruled list rather than cards, so they take less room than upcoming ones.
export function EventRow({ date, title, link }: Props) {
  return (
    <div className={styles.row}>
      <time dateTime={date} className={styles.rowDate}>
        {eventMonthYear(date)}
      </time>
      <p className={styles.rowTitle}>
        <EventTitle title={title} link={link} />
      </p>
    </div>
  );
}
