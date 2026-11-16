import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { TeamMemberCard } from "@/components/TeamMemberCard/TeamMemberCard";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { team, teamGroups } from "@/content/team";
import styles from "./team.module.css";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the committee and project teams that run EMC².",
};

// Groups with no members are dropped, so an empty team never shows a heading with nothing under it.
const groups = teamGroups
  .map((g) => ({ ...g, members: team.filter((m) => m.group === g.group) }))
  .filter((g) => g.members.length > 0);

export default function Team() {
  return (
    <>
      <TitleBand eyebrow="Team" title="The people behind the projects." />

      <div className={`container ${styles.groups}`}>
        {groups.map(({ group, title, members }, i) => {
          const id = `team-${i + 1}`;
          return (
            <section key={group} aria-labelledby={id} className={styles.group}>
              <SectionHeader
                id={id}
                index={i + 1}
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
        })}
      </div>
    </>
  );
}
