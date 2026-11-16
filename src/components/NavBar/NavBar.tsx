import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/Logo/Logo";
import { NavLinks } from "./NavLinks";
import styles from "./NavBar.module.css";

export function NavBar() {
  return (
    <header className={styles.bar}>
      <Logo />
      <nav aria-label="Main">
        <NavLinks links={site.nav} />
      </nav>
      <Link href={site.join.href} className={styles.join}>
        {site.join.label} →
      </Link>
    </header>
  );
}
