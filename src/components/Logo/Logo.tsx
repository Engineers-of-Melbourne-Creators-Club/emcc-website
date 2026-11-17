import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Logo.module.css";

// logo-bw.svg is public/brand/logo.svg recoloured to black and white and cropped to the emblem.
export function Logo() {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={styles.logo}>
      <Image src="/brand/logo-bw.svg" alt="" width={44} height={40} preload />
    </Link>
  );
}
