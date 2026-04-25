"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

type Result = {
  title: string;
  body: string;
};

export default function ChallengeMe() {
  const [idea, setIdea] = useState("");
  const [difficulty, setDifficulty] = useState("mid");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = idea.trim();

    if (!trimmed) {
      setResult({
        title: "Need a real problem",
        body: "Drop a bug, product idea, backend task, UI challenge, or system design prompt.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    window.setTimeout(() => {
      const scope =
        difficulty === "hard"
          ? "a design doc, milestones, and a working proof of concept"
          : difficulty === "fast"
            ? "a focused prototype and trade-off notes"
            : "a clear build plan with a shippable first version";

      setResult({
        title: "Challenge queued",
        body: `I would attack "${trimmed.slice(0, 96)}" with ${scope}.`,
      });
      setLoading(false);
    }, 900);
  };

  return (
    <section className="theme-panel mt-14 rounded-lg p-5 sm:p-7">
      <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="font-mono text-xs uppercase text-[var(--green)]">Challenge Me</p>
          <h2 className="mt-3 text-3xl font-black">Submit a problem</h2>
          <p className="mt-3 leading-7 text-[var(--muted)]">
            Drop an idea and the UI returns a quick mission-style response.
          </p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2">
            <span className="text-sm font-bold">Problem brief</span>
            <textarea
              className="min-h-32 rounded-md border border-[color:var(--border)] bg-black/35 p-3 text-[var(--foreground)] outline-none transition placeholder:text-white/30 focus:border-[var(--green)]"
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Build me a real-time leaderboard, debug a slow API, design a notification system..."
              value={idea}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="grid gap-2">
              <span className="text-sm font-bold">Difficulty</span>
              <select
                className="min-h-11 rounded-md border border-[color:var(--border)] bg-black/35 px-3 text-[var(--foreground)] outline-none focus:border-[var(--green)]"
                onChange={(event) => setDifficulty(event.target.value)}
                value={difficulty}
              >
                <option value="fast">Fast prototype</option>
                <option value="mid">Production slice</option>
                <option value="hard">Boss level</option>
              </select>
            </label>
            <button
              className="theme-button-primary inline-flex items-center justify-center gap-2 self-end rounded-md px-5 font-bold disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              {loading ? <Sparkles className="size-4 animate-pulse" /> : <Send className="size-4" />}
              {loading ? "Evaluating" : "Launch"}
            </button>
          </div>
        </form>
      </div>
      {result && (
        <motion.div
          className="mt-5 rounded-md border border-white/10 bg-white/[0.045] p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-black">{result.title}</h3>
          <p className="mt-2 leading-7 text-[var(--muted)]">{result.body}</p>
        </motion.div>
      )}
    </section>
  );
}
