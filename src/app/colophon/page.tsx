import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { colophon, colours } from "@/content/colophon";
import styles from "./colophon.module.css";

export const metadata: Metadata = {
  title: "Colophon",
  description: "How the EMC² website is designed and built.",
};

export default function Colophon() {
  return (
    <>
      <TitleBand eyebrow="Colophon" title="Does this count as an easter egg?" />

      <dl className={`container ${styles.list}`}>
        {colophon.map(({ label, text, colours: showColours }) => (
          <div key={label} className={styles.row}>
            <dt className="eyebrow">{label}</dt>
            <dd className={styles.text}>
              <p>{text}</p>
              {showColours && (
                <ul role="list" className={styles.swatches}>
                  {colours.map(({ name, token, hex }) => (
                    <li key={token} className={styles.swatch}>
                      <span
                        aria-hidden="true"
                        className={styles.chip}
                        style={{ "--chip": `var(${token})` } as CSSProperties}
                      />
                      <span>{name}</span>
                      <span className={styles.hex}>{hex}</span>
                    </li>
                  ))}
                </ul>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
