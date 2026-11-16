import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/FormField/FormField";
import styles from "./ContactForm.module.css";

// Markup only for now: sending, validation messages and the success state are wired up next.
export function ContactForm() {
  return (
    <form className={styles.form}>
      <FormField
        label="Name"
        name="name"
        placeholder="Your name"
        autoComplete="name"
        required
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@student.unimelb.edu.au"
        autoComplete="email"
        required
      />
      <FormField
        label="Message"
        name="message"
        type="textarea"
        placeholder="Tell us what you're interested in…"
        required
      />
      {/* Honeypot: invisible to people, but spam bots fill in every field, which flags them. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="visually-hidden"
      />
      <div>
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
}
