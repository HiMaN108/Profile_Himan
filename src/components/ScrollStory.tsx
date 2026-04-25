"use client";

import { motion } from "framer-motion";
import { storyBeats } from "@/lib/portfolio";

export default function ScrollStory() {
  return (
    <section className="mx-auto mt-14 max-w-4xl">
      <div className="mb-8">
        <p className="font-mono text-xs uppercase text-[var(--valorant-red)]">
          Storyline
        </p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">
          Recruiter-friendly by design
        </h2>
      </div>
      <div className="relative grid gap-5">
        <div className="absolute bottom-8 left-4 top-8 hidden w-px bg-white/12 sm:block" />
        {storyBeats.map((beat, index) => (
          <motion.article
            className="theme-panel rounded-lg p-5 sm:ml-10"
            initial={{ opacity: 0, y: 24 }}
            key={beat.title}
            transition={{ duration: 0.45 }}
            viewport={{ amount: 0.45, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-md bg-[rgba(255,70,85,0.18)] font-mono text-xs text-[var(--valorant-red)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs uppercase text-[var(--muted)]">
                {beat.kicker}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-black">{beat.title}</h3>
            <p className="mt-3 leading-7 text-[var(--muted)]">{beat.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
