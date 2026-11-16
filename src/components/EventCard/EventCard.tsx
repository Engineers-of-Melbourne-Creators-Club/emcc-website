import { eventDay, eventMonth } from "@/lib/dates";
import styles from "./EventCard.module.css";

type Props = {
  date: string;
  title: string;
  location: string;
  description: string;
};

export function EventCard({ date, title, location, description }: Props) {
  return (
    <article className={styles.card}>
      {/* <time> gives the date in a machine-readable form for search engines and assistive tech. */}
      <time dateTime={date} className={styles.date}>
        <span className={styles.day}>{eventDay(date)}</span>
        <span className={styles.month}>{eventMonth(date)}</span>
      </time>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.location}>{location}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}
