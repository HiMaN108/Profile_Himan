"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  BriefcaseBusiness,
  Terminal,
  Video,
  User,
  MessageSquare,
  Trophy,
} from "lucide-react";
import EasterEggs from "@/components/EasterEggs";
import { navPaths } from "@/lib/portfolio";

const messages = [
  "Initializing Himanshu.exe",
  "Loading full-stack experience",
  "Syncing AscentSpark projects, real-time systems",
  "Ready",
];

export default function EntryScreen() {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const bootDone = line === messages.length;
  const [taglineTyped, setTaglineTyped] = useState("");
  const taglineText = "I follow patterns, not time.";
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    if (bootDone) {
      return;
    }

    const current = messages[line];

    if (typed.length < current.length) {
      const timer = window.setTimeout(() => {
        setTyped(current.slice(0, typed.length + 1));
      }, 26);

      return () => clearTimeout(timer);
    }

    const nextLine = window.setTimeout(() => {
      setLine((value) => value + 1);
      setTyped("");
    }, 520);

    return () => clearTimeout(nextLine);
  }, [bootDone, line, typed]);

  useEffect(() => {
    const cursorTimer = window.setInterval(() => setShowCursor((c) => !c), 480);
    return () => window.clearInterval(cursorTimer);
  }, []);

  useEffect(() => {
    if (!bootDone) {
      setShowTagline(false);
      setTaglineTyped("");
      return;
    }

    const showTimer = window.setTimeout(() => {
      setShowTagline(true);
    }, 800);

    return () => window.clearTimeout(showTimer);
  }, [bootDone]);

  useEffect(() => {
    if (!showTagline) {
      setTaglineTyped("");
      return;
    }

    if (taglineTyped.length < taglineText.length) {
      const timer = window.setTimeout(() => {
        setTaglineTyped(taglineText.slice(0, taglineTyped.length + 1));
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [showTagline, taglineTyped, taglineText]);

  const renderedLines = useMemo(() => {
    const complete = messages.slice(0, line);
    return bootDone ? messages : [...complete, typed];
  }, [bootDone, line, typed]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && bootDone) {
        window.location.href = "/work";
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [bootDone]);

  const modeIcons = [
    Brain,
    BriefcaseBusiness,
    Video,
    User,
    MessageSquare,
    Trophy,
  ];

  return (
    <main className="adventure-bg scanlines min-h-dvh overflow-hidden text-[var(--foreground)]">
      <EasterEggs />
      <section className="relative z-10 mx-auto grid min-h-dvh w-full max-w-7xl content-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <motion.div
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,70,85,0.42)] bg-[rgba(255,70,85,0.1)] px-3 py-2 font-mono text-xs text-[var(--muted)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Terminal
              className="size-4 text-[var(--valorant-red)]"
              aria-hidden="true"
            />
            Code by Logic • Play by Instinct
          </motion.div>
          <motion.div
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(69,245,161,0.42)] bg-[rgba(69,245,161,0.1)] px-3 py-2 font-mono text-xs text-[var(--green)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
          >
            <span className="size-2 rounded-full bg-[var(--green)] animate-pulse" />
            Currently at AscentSpark • Open to opportunities
          </motion.div>
          <motion.h1
            className="text-balance text-5xl font-black leading-none sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            Himanshu
            <span className="block text-[var(--valorant-red)]">
              Pattern Seeker
            </span>
          </motion.h1>
          <motion.p
            className="mt-3 font-mono text-sm text-[var(--cyan)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: showTagline ? 1 : 0 }}
          >
            {taglineTyped}
            <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
          </motion.p>
          <motion.p
            className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
          >
            Building scalable backend services, real-time systems, and
            interactive web experiences. Currently at AscentSpark, powering
            platforms with 1M+ downloads.
          </motion.p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="theme-button-primary inline-flex items-center justify-center rounded-md px-5 text-sm font-bold"
              href="/work"
            >
              Recruiter Route
            </Link>
            <Link
              className="theme-button inline-flex items-center justify-center rounded-md px-5 text-sm font-bold"
              href="/brain"
            >
              Developer Route
            </Link>
          </div>

          {/* <motion.div
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
          >
            {[
              { label: "Users Impacted", value: "1M+" },
              { label: "System Reliability", value: "99.9%" },
              { label: "Performance Gain", value: "30%+" },
              { label: "Real-time Systems", value: "Expert" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-white/10 bg-white/[0.045] p-3 text-center"
              >
                <p className="text-xl font-black text-[var(--valorant-red)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div> */}
        </div>

        <motion.div
          className="theme-panel rounded-lg p-4 sm:p-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18 }}
        >
          <div className="rounded-md border border-white/10 bg-black/55 p-4 font-mono text-sm leading-7 shadow-inner">
            <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3 text-xs text-[var(--muted)]">
              <span className="size-2 rounded-full bg-[var(--valorant-red)]" />
              <span className="size-2 rounded-full bg-[var(--amber)]" />
              <span className="size-2 rounded-full bg-[var(--green)]" />
              <span className="ml-2">/terminal/himanshu</span>
            </div>
            <AnimatePresence mode="popLayout">
              {renderedLines.map((message, index) => (
                <motion.div
                  className="min-h-7 text-[var(--foreground)]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`${message}-${index}`}
                >
                  <span className="text-[var(--green)]">&gt;</span> {message}
                  {index === renderedLines.length - 1 && !bootDone && (
                    <span className={showCursor ? "opacity-100" : "opacity-0"}>
                      _
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {bootDone && (
              <motion.div
                className="mt-3 text-[var(--cyan)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Press Enter for Work, or choose a path below
                <span className={showCursor ? "opacity-100" : "opacity-0"}>
                  _
                </span>
              </motion.div>
            )}
          </div>

          <motion.div
            className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            initial={false}
            animate={bootDone ? "shown" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 14, pointerEvents: "none" },
              shown: { opacity: 1, y: 0, pointerEvents: "auto" },
            }}
          >
            {navPaths.map((path, index) => {
              const Icon = modeIcons[index];

              return (
                <Link
                  className="group rounded-md border border-[color:var(--border)] bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.075]"
                  href={path.href}
                  key={path.id}
                  style={{ borderColor: `${path.accent}55` }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Icon
                      className="size-5"
                      style={{ color: path.accent }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs text-[var(--muted)]">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-xl font-black">{path.label}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {path.tagline}
                  </p>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
