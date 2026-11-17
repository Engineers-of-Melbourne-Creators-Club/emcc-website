import type { ReactNode } from "react";
import {
  GridBackground,
  type GridVariant,
} from "@/components/GridBackground/GridBackground";
import styles from "./TitleBand.module.css";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  // The Home page uses the taller hero version with a larger heading, intro and buttons.
  hero?: boolean;
  intro?: string;
  actions?: ReactNode;
  grid?: GridVariant;
};

export function TitleBand({
  eyebrow,
  title,
  hero,
  intro,
  actions,
  grid,
}: Props) {
  return (
    <section className={`${styles.band} ${hero ? styles.hero : ""}`}>
      <GridBackground variant={grid} />
      <div className={`container ${styles.content}`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
