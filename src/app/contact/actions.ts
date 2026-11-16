"use server";

import { Resend } from "resend";
import { z } from "zod";

type Field = "name" | "email" | "message";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors?: Partial<Record<Field, string>>;
      message?: string;
      // Sent back so the form can refill what the person typed instead of making them start again.
      values?: Record<Field, string>;
    };

// The server re-checks everything: anyone can post to this action without using our form.
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(200, "Name is too long."),
  email: z.email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot filled in means a bot. Pretend it worked so the bot has no reason to retry.
  if (formData.get("company")) return { status: "success" };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "error",
      values,
      fieldErrors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  const failed: ContactState = {
    status: "error",
    values,
    message:
      "Sorry, your message could not be sent. Please try again, or email us directly.",
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.",
    );
    return failed;
  }

  const { name, email, message } = parsed.data;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      // shortcut: Resend's shared sender only delivers to the account owner; switch to a club domain once verified.
      from: "EMC2 website <onboarding@resend.dev>",
      to,
      replyTo: email,
      // Collapse whitespace so a name cannot add extra lines to the subject.
      subject: `New message from ${name.replace(/\s+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error("Contact form: Resend rejected the message.", error);
      return failed;
    }
  } catch (error) {
    // Never throw to the browser: a network failure becomes the normal error message.
    console.error("Contact form: could not reach Resend.", error);
    return failed;
  }

  return { status: "success" };
}
