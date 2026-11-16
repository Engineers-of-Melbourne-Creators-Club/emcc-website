import styles from "./ValueItem.module.css";

type Props = { index: number; title: string; description: string };

export function ValueItem({ index, title, description }: Props) {
  return (
    <div className={styles.item}>
      <p className={styles.index}>{String(index).padStart(2, "0")}</p>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
