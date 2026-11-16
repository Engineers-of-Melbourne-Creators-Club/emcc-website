import { Photo } from "@/components/Photo/Photo";
import styles from "./TeamMemberCard.module.css";

type Props = { name: string; role: string; photo?: string };

export function TeamMemberCard({ name, role, photo }: Props) {
  return (
    <div className={styles.card}>
      <Photo src={photo} alt={name} sizes="200px" className={styles.photo} />
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{role}</p>
    </div>
  );
}
