import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

// Fixed at 122 x 40: the logo was cut from a screenshot, so it must never be scaled up lol
export function Logo() {
  return (
    <Link href="/" aria-label="EMC² home" className={styles.logo}>
      <Image
        src="/brand/logo-mono.png"
        alt=""
        width={122}
        height={40}
        preload
      />
    </Link>
  );
}
