import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "EMC²", template: "%s | EMC²" },
  description:
    "Engineers of Melbourne Creators Club, a University of Melbourne student engineering club.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
