import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

const connect = [
  { label: site.contact.email, href: `mailto:${site.contact.email}` },
  site.socials.instagram,
  site.socials.discord,
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <p className={styles.wordmark}>{site.name}</p>
          <p className={styles.blurb}>{site.footer.blurb}</p>
        </div>

        <div>
          <h2 className={styles.heading}>Quick Links</h2>
          <ul role="list" className={styles.list}>
            {site.nav.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>Connect</h2>
          <ul role="list" className={styles.list}>
            {/* Plain <a>: these leave the site (mailto, socials), so next/link adds nothing. */}
            {connect.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className={styles.link}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={styles.copyright}>{site.footer.copyright}</p>
    </footer>
  );
}
