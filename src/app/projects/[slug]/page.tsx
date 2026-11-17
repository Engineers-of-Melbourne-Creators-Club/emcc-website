import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GridBackground } from "@/components/GridBackground/GridBackground";
import { Photo } from "@/components/Photo/Photo";
import { Tag } from "@/components/Tag/Tag";
import { projects } from "@/content/projects";
import styles from "./detail.module.css";

// Builds one static page per project at build time.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

const findProject = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project
    ? { title: project.title, description: project.description }
    : {};
}

export default async function ProjectDetail({
  params,
}: PageProps<"/projects/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const specs = [
    ["Discipline", project.disciplines.join(", ")],
    ["Status", project.status],
    ["Year", project.year],
  ];

  return (
    <>
      <section className={styles.hero}>
        <GridBackground variant="projects" />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/projects" className={styles.back}>
            ← All projects
          </Link>
          <ul role="list" className={styles.tags}>
            {project.disciplines.map((d) => (
              <li key={d}>
                <Tag onDark>{d}</Tag>
              </li>
            ))}
          </ul>
          <h1 className={styles.title}>{project.title}</h1>
        </div>
      </section>

      <div className={`container ${styles.body}`}>
        <div className={styles.main}>
          <section aria-labelledby="overview" className={styles.block}>
            <h2 id="overview" className={styles.heading}>
              Overview
            </h2>
            <p className={styles.overview}>{project.overview}</p>
          </section>
          {project.gallery.length > 0 && (
            <section aria-labelledby="gallery" className={styles.block}>
              <h2 id="gallery" className={styles.heading}>
                Gallery
              </h2>
              <ul role="list" className={styles.gallery}>
                {project.gallery.map((src, i) => (
                  <li key={src}>
                    <Photo
                      src={src}
                      alt={`${project.title} photo ${i + 1}`}
                      sizes="180px"
                      className={styles.galleryPhoto}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <dl className={styles.specs}>
            {specs.map(([label, value]) => (
              <div key={label} className={styles.spec}>
                <dt className={styles.specLabel}>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {/* Each block is hidden when empty, so there is never a heading with nothing under it. */}
          {project.team.length > 0 && (
            <section aria-labelledby="team" className={styles.block}>
              <h2 id="team" className={styles.heading}>
                Team
              </h2>
              <ul role="list" className={styles.people}>
                {project.team.map((person, i) => (
                  <li key={i} className={styles.person}>
                    <Photo
                      src={person.photo}
                      alt=""
                      sizes="40px"
                      className={styles.avatar}
                    />
                    <div>
                      <p className={styles.name}>{person.name}</p>
                      <p className={styles.role}>{person.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.links.length > 0 && (
            <section aria-labelledby="links" className={styles.block}>
              <h2 id="links" className={styles.heading}>
                Links
              </h2>
              <ul role="list" className={styles.links}>
                {project.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                      <span className="visually-hidden">
                        {" "}
                        (opens in a new tab)
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
