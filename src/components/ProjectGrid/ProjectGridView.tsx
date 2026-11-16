import { FilterTabs } from "@/components/FilterTabs/FilterTabs";
import { ProjectCard } from "@/components/ProjectCard/ProjectCard";
import type { Discipline, Project } from "@/lib/types";
import styles from "./ProjectGrid.module.css";

export type Filter = "All" | Discipline;

export const filters: Filter[] = [
  "All",
  "Mechanical",
  "Electrical",
  "Software",
  "Civil",
];

type Props = {
  projects: Project[];
  filter: Filter;
  onFilter?: (filter: Filter) => void;
};

// No hooks here, so the same markup can be server-rendered as the static fallback.
export function ProjectGridView({ projects, filter, onFilter }: Props) {
  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) => p.disciplines.includes(filter));

  return (
    <div className={styles.column}>
      <FilterTabs
        label="Filter projects by discipline"
        options={filters}
        value={filter}
        onChange={onFilter}
      />
      <ul role="list" className={styles.grid}>
        {shown.map((project) => (
          <li key={project.slug} className={styles.item}>
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
    </div>
  );
}
