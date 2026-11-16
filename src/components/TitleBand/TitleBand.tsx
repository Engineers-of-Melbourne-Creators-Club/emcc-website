import type { ReactNode } from "react";
import { GridBackground } from "@/components/GridBackground/GridBackground";
import styles from "./TitleBand.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  // The Home page uses the taller hero version with a larger heading, intro and buttons.
  hero?: boolean;
  intro?: string;
  actions?: ReactNode;
};

export function TitleBand({ eyebrow, title, hero, intro, actions }: Props) {
  return (
    <section className={`${styles.band} ${hero ? styles.hero : ""}`}>
      <GridBackground />
      <div className={`container ${styles.content}`}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {intro && <p className={styles.intro}>{intro}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
