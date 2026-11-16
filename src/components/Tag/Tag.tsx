import type { ReactNode } from "react";
import styles from "./Tag.module.css";

type Props = { children: ReactNode; onDark?: boolean };

export function Tag({ children, onDark }: Props) {
  return (
    <span className={`${styles.tag} ${onDark ? styles.onDark : ""}`}>
      {children}
    </span>
  );
}
