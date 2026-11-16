"use client";

// client component because open/closed is state that changes on click
import { useEffect, useId, useRef, useState } from "react";
import type { SiteLink } from "@/content/site";
import { NavLinks } from "./NavLinks";
import styles from "./NavBar.module.css";

type Props = { links: SiteLink[] };

export function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // escape closes the menu and returns focus to the button, so keyboard users are not stranded.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={styles.mobile}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id={panelId}
        aria-label="Main"
        className={styles.panel}
        hidden={!open}
      >
        <NavLinks links={links} stacked onNavigate={() => setOpen(false)} />
      </nav>
    </div>
  );
}
