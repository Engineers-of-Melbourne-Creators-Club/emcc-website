import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { site } from "@/content/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EMC² about joining, partnering or collaborating on a project.",
};

const details = [
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    label: "Instagram",
    value: site.socials.instagram.label,
    href: site.socials.instagram.href,
  },
  {
    label: "Discord",
    value: site.socials.discord.label,
    href: site.socials.discord.href,
  },
];

export default function Contact() {
  return (
    <>
      <TitleBand grid="contact" eyebrow="Contact" title="Get in touch." />

      <div className={`container ${styles.body}`}>
        <dl className={styles.details}>
          {details.map(({ label, value, href }) => (
            <div key={label} className={styles.detail}>
              <dt className="eyebrow">{label}</dt>
              <dd>
                <a href={href} className={styles.value}>
                  {value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <section aria-labelledby="message" className={styles.formColumn}>
          <h2 id="message" className={styles.formTitle}>
            Send us a message
          </h2>
          <ContactForm />
        </section>
      </div>
    </>
  );
}
