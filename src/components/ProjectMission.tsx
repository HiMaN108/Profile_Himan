"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShieldCheck, X } from "lucide-react";
import type { Project } from "@/lib/portfolio";

export default function ProjectMission({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <motion.button
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="theme-panel group flex min-h-[260px] w-full flex-col justify-between rounded-lg p-5 text-left transition hover:border-[rgba(255,70,85,0.62)]"
        type="button"
      >
        <span>
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs"
            style={{
              borderColor: `${project.accent}66`,
              color: project.accent,
            }}
          >
            {project.level} / {project.status}
          </span>
          <span className="mt-5 block text-2xl font-black text-[var(--foreground)]">
            {project.title}
          </span>
          <span className="mt-3 block leading-6 text-[var(--muted)]">{project.brief}</span>
        </span>
        <span className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-bold text-[var(--foreground)]">
          Open Mission
          <ChevronRight
            className="size-5 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              aria-modal="true"
              className="theme-panel max-h-[86vh] w-full max-w-2xl overflow-auto rounded-lg p-5 text-[var(--foreground)] sm:p-7"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase text-[var(--valorant-red)]">
                    {project.level}
                  </p>
                  <h2 className="mt-2 text-3xl font-black">{project.title}</h2>
                </div>
                <button
                  aria-label="Close mission"
                  className="grid size-10 shrink-0 place-items-center rounded border border-white/10 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-5 leading-7 text-[var(--muted)]">{project.brief}</p>
              <div className="mt-6 rounded-md border border-white/10 bg-white/[0.045] p-4">
                <div className="mb-2 flex items-center gap-2 font-bold">
                  <ShieldCheck className="size-5 text-[var(--green)]" aria-hidden="true" />
                  Impact
                </div>
                <p className="leading-7 text-[var(--muted)]">{project.impact}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
