"use client";

// Client component for the pending, error and success states. The form still posts without
// JavaScript, because a server action passed to <form action> works as a plain HTML form.
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactState } from "@/app/contact/actions";
import { Button } from "@/components/Button/Button";
import { FormField } from "@/components/FormField/FormField";
import styles from "./ContactForm.module.css";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <p role="status" className={styles.success}>
        Thanks, your message is on its way. We&apos;ll get back to you soon.
      </p>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  return (
    // noValidate: the server's messages show inline in our own style, instead of browser pop-ups.
    <form action={formAction} noValidate className={styles.form}>
      <FormField
        label="Name"
        name="name"
        placeholder="Your name"
        autoComplete="name"
        required
        defaultValue={values?.name}
        error={errors?.name}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="you@student.unimelb.edu.au"
        autoComplete="email"
        required
        defaultValue={values?.email}
        error={errors?.email}
      />
      <FormField
        label="Message"
        name="message"
        type="textarea"
        placeholder="Tell us what you're interested in…"
        required
        defaultValue={values?.message}
        error={errors?.message}
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
      {state.status === "error" && state.message && (
        <p role="alert" className={styles.error}>
          {state.message}
        </p>
      )}
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}

// useFormStatus only works in a child of the <form>, so the button is its own component.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send message"}
    </Button>
  );
}
