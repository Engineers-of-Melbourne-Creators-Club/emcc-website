import { Button } from "@/components/Button/Button";
import { Tag } from "@/components/Tag/Tag";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { ValueItem } from "@/components/ValueItem/ValueItem";
import { StatBlock } from "@/components/StatBlock/StatBlock";
import { Photo } from "@/components/Photo/Photo";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import { TeamMemberCard } from "@/components/TeamMemberCard/TeamMemberCard";
import { EventCard } from "@/components/EventCard/EventCard";
import { EventRow } from "@/components/EventCard/EventRow";
import { FormField } from "@/components/FormField/FormField";
import { FilterTabsDemo } from "./FilterTabsDemo";
import styles from "./styleguide.module.css";

const description =
  "Short description of the project goes here, in one or two sentences.";
const longText =
  "Placeholder paragraph. Replace with the real text. Placeholder paragraph. Replace with the real text. Placeholder paragraph.";

export function ComponentSections() {
  return (
    <>
      <Demo title="Button">
        <div className={styles.row}>
          <Button href="#">Join the club</Button>
          <Button>Send message</Button>
          <Button disabled>Sending…</Button>
          <Button href="#" variant="link-light">
            All projects
          </Button>
        </div>
        <div className={`${styles.row} ${styles.dark}`}>
          <Button href="#" variant="link-dark">
            See our projects
          </Button>
        </div>
      </Demo>

      <Demo title="Tag">
        <div className={styles.row}>
          <Tag>Mechanical</Tag>
          <Tag>Software</Tag>
        </div>
        <div className={`${styles.row} ${styles.dark}`}>
          <Tag onDark>Electrical</Tag>
          <Tag onDark>Civil</Tag>
        </div>
      </Demo>

      {/* Full-bleed demos break out of the styleguide column like they will on real pages. */}
      <Demo title="TitleBand and GridBackground">
        <div className={styles.bleed}>
          <TitleBand eyebrow="About" title="Who we are." />
          <TitleBand
            hero
            eyebrow="Engineers of Melbourne Creators Club"
            title="Build things that matter."
            intro={longText}
            actions={
              <>
                <Button href="#">Join the club</Button>
                <Button href="#" variant="link-dark">
                  See our projects
                </Button>
              </>
            }
          />
        </div>
      </Demo>

      <Demo title="SectionHeader">
        <SectionHeader
          index={1}
          label="Disciplines"
          title="Four disciplines, one workshop."
          subtitle="Optional subtitle in body text, secondary colour."
        />
        <SectionHeader index={2} label="Committee" title="Executive." centred />
      </Demo>

      <Demo title="ValueItem">
        <ul role="list" className={styles.valueGrid}>
          {[1, 2, 3, 4].map((index) => (
            <li key={index}>
              <ValueItem
                index={index}
                title="Value title"
                description={longText}
              />
            </li>
          ))}
        </ul>
      </Demo>

      <Demo title="StatBlock">
        <div className={`${styles.stats} ${styles.dark}`}>
          {["Members", "Projects", "Events", "Partners"].map((label) => (
            <StatBlock key={label} value="00" label={label} />
          ))}
        </div>
      </Demo>

      <Demo title="Photo">
        <div className={styles.row}>
          <Photo
            alt="Empty placeholder"
            sizes="200px"
            className={styles.photo}
          />
        </div>
      </Demo>

      <Demo title="ProjectCard">
        <ul role="list" className={styles.projectGrid}>
          <li>
            <ProjectCard
              href="#"
              title="Project 1"
              description={description}
              disciplines={["Mechanical"]}
              imageAlt="Project 1"
            />
          </li>
          <li>
            <ProjectCard
              href="#"
              title="Project with a very long title that should be truncated"
              description={longText}
              disciplines={["Mechanical", "Electrical", "Software", "Civil"]}
              imageAlt="Project 2"
            />
          </li>
        </ul>
      </Demo>

      <Demo title="TeamMemberCard">
        <ul role="list" className={styles.row}>
          {["President", "Treasurer"].map((role) => (
            <li key={role}>
              <TeamMemberCard name="Member Name" role={role} />
            </li>
          ))}
        </ul>
      </Demo>

      <Demo title="EventCard and EventRow">
        <ul role="list" className={styles.eventGrid}>
          <li>
            <EventCard
              date="2026-09-01"
              title="Event 1"
              location="Venue TBC"
              description="Short description of the event goes here."
            />
          </li>
          <li>
            <EventCard
              date="2026-10-24"
              title="Event with a long title that truncates"
              location="Venue TBC"
              description={longText}
            />
          </li>
        </ul>
        <ul role="list">
          <li>
            <EventRow date="2026-05-12" title="Event 5" />
          </li>
          <li>
            <EventRow date="2026-03-03" title="Event 6" />
          </li>
        </ul>
      </Demo>

      <Demo title="FilterTabs">
        <FilterTabsDemo />
      </Demo>

      <Demo title="FormField">
        <div className={styles.form}>
          <FormField label="Name" name="demo-name" placeholder="Your name" />
          <FormField
            label="Email"
            name="demo-email"
            type="email"
            placeholder="you@student.unimelb.edu.au"
            defaultValue="not-an-email"
            error="Enter a valid email address."
          />
          <FormField
            label="Message"
            name="demo-message"
            type="textarea"
            placeholder="Tell us what you're interested in…"
          />
        </div>
      </Demo>
    </>
  );
}

function Demo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const id = `demo-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section aria-labelledby={id} className={styles.demo}>
      <h2 id={id} className={styles.heading}>
        {title}
      </h2>
      {children}
    </section>
  );
}
