import styles from "./StatBlock.module.css";

type Props = { value: string; label: string };

// A string value so stats like "40+" or "2019" read exactly as written.
export function StatBlock({ value, label }: Props) {
  return (
    <div className={styles.stat}>
      <p className={styles.value}>{value}</p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
