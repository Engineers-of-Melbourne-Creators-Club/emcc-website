import type { Metadata } from "next";
import { Photo } from "@/components/Photo/Photo";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { ValueItem } from "@/components/ValueItem/ValueItem";
import { story } from "@/content/about";
import { values } from "@/content/values";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why EMC² exists and how we work: hands-on, cross-disciplinary projects that ship.",
};

const process = ["Learn", "Build", "Show"];

export default function About() {
  return (
    <>
      <TitleBand
        grid="about"
        eyebrow="About"
        title={
          <>
            A club for people
            <br />
            who build.
          </>
        }
      />

      <section
        aria-labelledby="story"
        className={`container ${styles.section} ${styles.story}`}
      >
        <SectionHeader
          id="story"
          index={1}
          label="Our story"
          title="Started by students who wanted to build, not just study."
          subtitle={story.text}
        />
        <Photo
          src={story.photo}
          alt={story.photoAlt}
          sizes="(max-width: 1023px) 100vw, 480px"
          className={styles.storyPhoto}
        />
      </section>

      <section
        aria-labelledby="values"
        className={`container ${styles.section} ${styles.valuesSection}`}
      >
        <SectionHeader
          id="values"
          index={2}
          label="Values"
          title="How we work."
        />
        <ul role="list" className={styles.values}>
          {values.map(({ title, description }, i) => (
            <li key={title}>
              <ValueItem
                index={i + 1}
                title={title}
                description={description}
              />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="How projects run" className={styles.process}>
        <ol role="list" className={`container ${styles.processRow}`}>
          {process.map((step, i) => (
            <li key={step}>
              <span className={styles.processIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {step}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
