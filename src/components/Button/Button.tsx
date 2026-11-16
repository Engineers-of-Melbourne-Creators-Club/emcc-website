import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  children: ReactNode;
  variant?: "primary" | "link-dark" | "link-light";
  // With href it navigates (a link). Without it, it is a form/action button.
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  disabled,
}: Props) {
  const className = `${styles.button} ${styles[variant]}`;

  const content = (
    <>
      {children}{" "}
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button type={type} className={className} disabled={disabled}>
      {content}
    </button>
  );
}
