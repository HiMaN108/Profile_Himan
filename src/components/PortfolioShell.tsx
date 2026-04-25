"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Brain,
  BriefcaseBusiness,
  Download,
  Home,
  MessageSquare,
  Trophy,
  User,
  Video,
} from "lucide-react";
import EasterEggs from "@/components/EasterEggs";
import { navPaths, type PathId } from "@/lib/portfolio";

const icons = {
  brain: Brain,
  work: BriefcaseBusiness,
  watch: Video,
  freelancer: User,
  connection: MessageSquare,
  challenge: Trophy,
} satisfies Record<PathId, typeof Brain>;

export default function PortfolioShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);

    if (next === 5) {
      window.dispatchEvent(
        new CustomEvent("portfolio-secret", {
          detail: {
            message: "Logo combo unlocked. Type 'hire me' for the shortcut.",
          },
        }),
      );
      setLogoClicks(0);
    }
  };

  return (
    <div className="adventure-bg min-h-dvh text-[var(--foreground)]">
      <EasterEggs />
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[rgba(7,8,11,0.82)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            aria-label="Himanshu logo secret"
            className="grid size-11 shrink-0 place-items-center rounded-md border border-[rgba(255,70,85,0.55)] bg-[rgba(255,70,85,0.16)] font-mono text-lg font-black text-[var(--foreground)]"
            onClick={handleLogoClick}
            type="button"
          >
            H
          </button>
          <Link
            aria-label="Back to entry screen"
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--foreground)] sm:flex"
            href="/"
          >
            <Home className="size-4" aria-hidden="true" />
            Entry
          </Link>
          <nav
            aria-label="Portfolio paths"
            className="flex flex-1 items-center gap-2 overflow-x-auto"
          >
            {navPaths.map((path) => {
              const Icon = icons[path.id];
              const active = pathname === path.href;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-11 shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm transition hover:bg-white/7"
                  href={path.href}
                  key={path.id}
                  style={{
                    borderColor: active ? path.accent : "var(--border)",
                    color: active ? "var(--foreground)" : "var(--muted)",
                    background: active
                      ? "rgba(245,242,236,0.08)"
                      : "transparent",
                  }}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span>{path.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            className="theme-button-primary hidden items-center justify-center gap-2 rounded-md px-4 text-sm font-bold sm:flex"
            href="/work#resume"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
