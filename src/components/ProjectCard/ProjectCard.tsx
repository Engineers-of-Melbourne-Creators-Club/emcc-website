import Link from "next/link";
import type { Discipline } from "@/lib/types";
import { Photo } from "@/components/Photo/Photo";
import { Tag } from "@/components/Tag/Tag";
import styles from "./ProjectCard.module.css";

type Props = {
  href: string;
  title: string;
  description: string;
  disciplines: Discipline[];
  image?: string;
  imageAlt: string;
};

export function ProjectCard({
  href,
  title,
  description,
  disciplines,
  image,
  imageAlt,
}: Props) {
  // The whole card is one link, so "Read more" is a styled span, not a second nested link.
  return (
    <Link href={href} className={styles.card}>
      <Photo
        src={image}
        alt={imageAlt}
        sizes="(max-width: 767px) 100vw, 300px"
        className={styles.image}
      />
      <div className={styles.body}>
        <ul role="list" className={styles.tags}>
          {disciplines.map((discipline) => (
            <li key={discipline}>
              <Tag>{discipline}</Tag>
            </li>
          ))}
        </ul>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <span className={styles.more}>
        Read more{" "}
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
      </span>
    </Link>
  );
}
