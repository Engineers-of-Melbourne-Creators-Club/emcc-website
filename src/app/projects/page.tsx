import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectGrid } from "@/components/ProjectGrid/ProjectGrid";
import { ProjectGridView } from "@/components/ProjectGrid/ProjectGridView";
import { TitleBand } from "@/components/TitleBand/TitleBand";
import { projects } from "@/content/projects";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Mechanical, electrical, software and civil projects built by EMC² members.",
};

export default function Projects() {
  return (
    <>
      <TitleBand grid="projects" eyebrow="Work" title="What we've built." />
      <div className={`container ${styles.body}`}>
        {/* Reading the URL needs the browser, so the static HTML shows every project until it loads. */}
        <Suspense
          fallback={<ProjectGridView projects={projects} filter="All" />}
        >
          <ProjectGrid projects={projects} />
        </Suspense>
      </div>
    </>
  );
}
