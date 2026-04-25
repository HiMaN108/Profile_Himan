import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Himanshu - Interactive Portfolio",
    template: "%s | Himanshu",
  },
  description:
    "A fast, recruiter-friendly adventure through Himanshu's engineering brain, projects, experiments, and creator work.",
  openGraph: {
    title: "Himanshu - Interactive Portfolio",
    description:
      "Choose a path through Himanshu's work, brain map, live stats, and challenge UI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
