import Image from "next/image";
import styles from "./Photo.module.css";

type Props = {
  src?: string;
  alt: string;
  // Tells the browser which image size to download;. The caller knows how wide it renders.
  sizes: string;
  // Sets the box size (aspect-ratio or height). The image always covers the box.
  className?: string;
};

export function Photo({ src, alt, sizes, className = "" }: Props) {
  return (
    <div className={`${styles.photo} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={styles.image}
        />
      ) : (
        // No photo yet: a flat block keeps the layout, and the alt text is still announced.
        <div role="img" aria-label={alt} className={styles.placeholder} />
      )}
    </div>
  );
}
