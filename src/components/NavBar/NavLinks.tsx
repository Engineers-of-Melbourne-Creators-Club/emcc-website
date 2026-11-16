"use client";

// client only because the active link depends on the current URL.
// The rest of the nav stays server-rendered.
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteLink } from "@/content/site";
import styles from "./NavBar.module.css";

type Props = {
  links: SiteLink[];
  stacked?: boolean;
  onNavigate?: () => void;
};

export function isActive(pathname: string, href: string) {
  // section match so /projects/project-1 still highlights Projects.
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ links, stacked, onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <ul role="list" className={stacked ? styles.stacked : styles.links}>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link
            href={href}
            className={styles.link}
            onClick={onNavigate}
            aria-current={isActive(pathname, href) ? "page" : undefined}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
