"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Brain,
  BriefcaseBusiness,
  Download,
  Home,
  MessageSquare,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import EasterEggs from "@/components/EasterEggs";
import { navPaths, type PathId } from "@/lib/portfolio";

const icons = {
  brain: Brain,
  work: BriefcaseBusiness,
  armory: ShoppingBag,
  connection: MessageSquare,
  challenge: Trophy,
} satisfies Record<PathId, any>;

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
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0f1923cc] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-4 py-3 sm:px-6">
          {/* Tactical Logo */}
          <button
            aria-label="Himanshu logo secret"
            className="group relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-sm border border-[var(--valorant-red)]/30 bg-[var(--valorant-red)]/10 transition-all hover:bg-[var(--valorant-red)]/20"
            onClick={handleLogoClick}
            type="button"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--valorant-red)_0%,transparent_70%)] opacity-20" />
            <span className="relative z-10 font-black text-white italic text-xl tracking-tighter">H</span>
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--valorant-red)] transition-transform translate-x-[-100%] group-hover:translate-x-0" />
          </button>

          <Link
            aria-label="Back to entry screen"
            className="ml-2 hidden h-11 items-center gap-2 rounded-sm border border-white/5 bg-white/[0.03] px-4 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-white/40 transition-all hover:bg-white/5 hover:text-white sm:flex"
            href="/"
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span>Entry</span>
          </Link>

          {/* Navigation Route */}
          <nav
            aria-label="Portfolio paths"
            className="mx-4 flex flex-1 items-center gap-1.5 overflow-x-auto no-scrollbar"
          >
            {navPaths.map((path) => {
              const Icon = icons[path.id];
              const active = pathname === path.href;

              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`relative flex h-11 shrink-0 items-center gap-2.5 rounded-sm px-4 text-[0.7rem] font-black uppercase italic tracking-widest transition-all hover:bg-white/5 ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}
                  href={path.href}
                  key={path.id}
                >
                  <Icon className={`size-3.5 ${active ? "" : "opacity-50"}`} aria-hidden="true" style={{ color: active ? path.accent : "currentColor" }} />
                  <span>{path.label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--valorant-red)] shadow-[0_0_8px_var(--valorant-red)]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action: Dossier */}
          <Link
            className="group relative flex h-11 items-center justify-center gap-3 overflow-hidden rounded-sm bg-white px-5 text-black transition-all hover:scale-105 active:scale-95 hidden sm:flex"
            href="/work#resume"
          >
            <div className="absolute inset-0 translate-x-[-100%] bg-[var(--valorant-red)] transition-transform group-hover:translate-x-0" />
            <span className="relative z-10 font-mono text-[0.65rem] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">Resume</span>
            <Download className="relative z-10 size-3.5 group-hover:text-white transition-colors" aria-hidden="true" />
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
