import { eventFullDate } from "@/lib/dates";
import styles from "./EventCard.module.css";

type Props = { date: string; title: string };

// Past events are a compact ruled list rather than cards, so they take less room than upcoming ones.
export function EventRow({ date, title }: Props) {
  return (
    <div className={styles.row}>
      <time dateTime={date} className={styles.rowDate}>
        {eventFullDate(date)}
      </time>
      <p className={styles.rowTitle}>{title}</p>
    </div>
  );
}
