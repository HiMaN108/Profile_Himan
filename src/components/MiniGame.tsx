"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crosshair, RotateCcw } from "lucide-react";

type Target = {
  x: number;
  y: number;
};

function createTarget(): Target {
  return {
    x: Math.floor(12 + Math.random() * 76),
    y: Math.floor(18 + Math.random() * 62),
  };
}

export default function MiniGame() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [target, setTarget] = useState<Target>(() => createTarget());
  const unlocked = score >= 6;

  useEffect(() => {
    if (!active || timeLeft <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((value) => {
        const next = Math.max(0, value - 1);

        if (next === 0) {
          setActive(false);
        }

        return next;
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [active, timeLeft]);

  const start = () => {
    setScore(0);
    setTimeLeft(20);
    setTarget(createTarget());
    setActive(true);
  };

  const hitTarget = () => {
    if (!active) {
      return;
    }

    setScore((value) => value + 1);
    setTarget(createTarget());
  };

  return (
    <section className="theme-panel rounded-lg p-5 sm:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs uppercase text-[var(--green)]">Aim Trainer</p>
          <h2 className="mt-2 text-3xl font-black">Reaction run</h2>
        </div>
        <div className="flex gap-2 font-mono text-sm">
          <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2">
            Score {score}
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-2">
            {timeLeft}s
          </span>
        </div>
      </div>

      <div className="relative min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-black/45">
        <div className="valorant-grid absolute inset-0 opacity-40" />
        {!active && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-black/35 p-4 text-center">
            <div>
              <Crosshair className="mx-auto mb-4 size-10 text-[var(--green)]" aria-hidden="true" />
              <p className="mx-auto max-w-sm leading-7 text-[var(--muted)]">
                Hit 6 targets in 20 seconds to reveal the recruiter shortcut.
              </p>
              <button
                className="theme-button-primary mt-5 inline-flex items-center justify-center gap-2 rounded-md px-5 font-bold"
                onClick={start}
                type="button"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                Start Run
              </button>
            </div>
          </div>
        )}
        {active && (
          <motion.button
            aria-label="Aim target"
            className="absolute z-20 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--green)] bg-[rgba(69,245,161,0.14)] text-[var(--green)] shadow-[0_0_32px_rgba(69,245,161,0.24)]"
            animate={{ scale: [0.9, 1.08, 0.95] }}
            key={`${target.x}-${target.y}-${score}`}
            onClick={hitTarget}
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
            transition={{ duration: 0.42 }}
            type="button"
          >
            <Crosshair className="size-7" aria-hidden="true" />
          </motion.button>
        )}
      </div>

      {unlocked && (
        <motion.div
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-[rgba(69,245,161,0.4)] bg-[rgba(69,245,161,0.08)] p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h3 className="font-black">Recruiter route unlocked</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Score kept. Jump to the resume brief and mission board.
            </p>
          </div>
          <Link
            className="theme-button-primary inline-flex items-center justify-center rounded-md px-4 text-sm font-bold"
            href="/work#resume"
          >
            Open Resume Brief
          </Link>
        </motion.div>
      )}
    </section>
  );
}
