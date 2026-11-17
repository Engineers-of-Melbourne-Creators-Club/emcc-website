import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { TeamMemberCard } from "@/components/TeamMemberCard/TeamMemberCard";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { clubGroups, engineeringGroups, team } from "@/content/team";
import styles from "./team.module.css";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the committee and project teams that run EMC².",
};

// Groups with no members are dropped, so an empty team never shows a heading with nothing under it.
const withMembers = (headings: typeof engineeringGroups) =>
  headings
    .map((g) => ({ ...g, members: team.filter((m) => m.group === g.group) }))
    .filter((g) => g.members.length > 0);

const engineering = withMembers(engineeringGroups);
const club = withMembers(clubGroups);

export default function Team() {
  return (
    <>
      <TitleBand
        grid="team"
        eyebrow="Team"
        title="The people behind the projects."
      />

      <div className={`container ${styles.groups}`}>
        {engineering.map((g, i) => (
          <Group key={g.group} {...g} index={i + 1} />
        ))}
        {club.length > 0 && <hr className={styles.divider} />}
        {/* Numbering carries on from the engineering teams so every section index stays unique. */}
        {club.map((g, i) => (
          <Group key={g.group} {...g} index={engineering.length + i + 1} />
        ))}
      </div>
    </>
  );
}

type GroupProps = ReturnType<typeof withMembers>[number] & { index: number };

function Group({ group, title, members, index }: GroupProps) {
  const id = `team-${index}`;
  return (
    <section aria-labelledby={id} className={styles.group}>
      <SectionHeader
        id={id}
        index={index}
        label={group}
        title={title}
        centred
      />
      <ul role="list" className={styles.cards}>
        {members.map((member, j) => (
          <li key={j}>
            <TeamMemberCard {...member} />
          </li>
        ))}
      </ul>
    </section>
  );
}
