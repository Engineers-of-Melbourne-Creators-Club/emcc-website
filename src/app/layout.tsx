import type { Metadata } from "next";
import { Titan_One, Work_Sans } from "next/font/google";
import "./globals.css";

const titanOne = Titan_One({
  variable: "--font-titan-one",
  weight: "400",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMCC - Engineers of Melbourne Creators Club",
  description:
    "A student community designing, building and breaking things together.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${titanOne.variable} ${workSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
