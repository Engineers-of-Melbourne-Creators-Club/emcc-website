import type { Metadata } from "next";
import { Button } from "@/components/Button/Button";
import { CtaBand } from "@/components/CtaBand/CtaBand";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { StatBlock } from "@/components/StatBlock/StatBlock";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { ValueItem } from "@/components/ValueItem/ValueItem";
import { disciplines } from "@/content/disciplines";
import { partners } from "@/content/partners";
import { projects } from "@/content/projects";
import { stats } from "@/content/stats";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Engineers of Melbourne Creators Club is a University of Melbourne student community building real engineering projects.",
};

export default function Home() {
  return (
    <>
      <TitleBand
        hero
        grid="home"
        eyebrow="EMC² / University of Melbourne"
        title="Build things that actually work."
        intro="Engineers of Melbourne Creators Club is a student community designing, building and testing real projects across mechanical, electrical, software and civil engineering."
        actions={
          <>
            <Button href="/projects">View projects</Button>
            <Button href="/contact" variant="link-dark">
              Join the club
            </Button>
          </>
        }
      />

      <section
        aria-labelledby="disciplines"
        className={`container ${styles.section}`}
      >
        <SectionHeader
          id="disciplines"
          index={1}
          label="Disciplines"
          title="Four disciplines."
          subtitle="Every project pulls together people from different disciplines to design, prototype and ship something real."
        />
        <ul role="list" className={styles.values}>
          {disciplines.map(({ name, description }, i) => (
            <li key={name}>
              <ValueItem index={i + 1} title={name} description={description} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="projects"
        className={`container ${styles.section} ${styles.projects}`}
      >
        <SectionHeader
          id="projects"
          index={2}
          label="Projects"
          title="Recent work."
        />
        <ul role="list" className={styles.projectGrid}>
          {projects.slice(0, 3).map((project) => (
            <li key={project.slug}>
              <ProjectCard
                href={`/projects/${project.slug}`}
                title={project.title}
                description={project.description}
                disciplines={project.disciplines}
                image={project.cover}
                imageAlt={project.title}
              />
            </li>
          ))}
        </ul>
        <Button href="/projects" variant="link-light">
          All projects
        </Button>
      </section>

      <section aria-label="Club in numbers" className={styles.stats}>
        <div className={`container ${styles.statsRow}`}>
          {stats.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="partners"
        className={`container ${styles.partners}`}
      >
        <h2 id="partners" className="eyebrow">
          03 / Partners
        </h2>
        <ul role="list" className={styles.partnerRow}>
          {partners.map((partner, i) => (
            <li key={i} className={styles.partner}>
              <span className="visually-hidden">{partner.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="What would you build with a team behind you?"
        action={{ label: "Join the club", href: "/contact" }}
      />
    </>
  );
}
