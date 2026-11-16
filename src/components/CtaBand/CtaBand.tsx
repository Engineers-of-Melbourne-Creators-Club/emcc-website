import { Button } from "@/components/Button/Button";
import type { Link } from "@/lib/types";
import styles from "./CtaBand.module.css";

type Props = { title: string; action: Link };

// The closing call to action that ends the Home and About pages.
export function CtaBand({ title, action }: Props) {
  return (
    <section aria-labelledby="cta-title" className={styles.band}>
      <div className={`container ${styles.content}`}>
        <h2 id="cta-title" className={styles.title}>
          {title}
        </h2>
        <Button href={action.href}>{action.label}</Button>
      </div>
    </section>
  );
}
