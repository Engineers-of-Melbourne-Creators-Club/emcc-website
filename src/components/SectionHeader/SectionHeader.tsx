import styles from "./SectionHeader.module.css";

type Props = {
  index: number;
  label: string;
  title: string;
  subtitle?: string;
  // Pass the same id to the section's aria-labelledby so screen readers name the section.
  id?: string;
  centred?: boolean;
};

export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  id,
  centred,
}: Props) {
  return (
    <header className={`${styles.header} ${centred ? styles.centred : ""}`}>
      <p className={styles.eyebrow}>
        {String(index).padStart(2, "0")} / {label}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}
