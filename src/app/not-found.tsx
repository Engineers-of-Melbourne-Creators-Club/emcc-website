import type { Metadata } from "next";
import { Button } from "@/components/Button/Button";
import { TitleBand } from "@/components/TitleBand/TitleBand";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
};

export default function NotFound() {
  return (
    <TitleBand
      eyebrow="404"
      title="Nothing here."
      actions={
        <Button href="/" variant="link-dark">
          Back to home
        </Button>
      }
    />
  );
}
