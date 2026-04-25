"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { brainLinks, brainNodes } from "@/lib/portfolio";

export default function BrainMap() {
  const [activeId, setActiveId] = useState(brainNodes[0].id);
  const activeNode = brainNodes.find((node) => node.id === activeId) ?? brainNodes[0];

  const nodeById = new Map(brainNodes.map((node) => [node.id, node]));

  return (
    <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <motion.div
        className="theme-panel relative min-h-[520px] overflow-hidden rounded-lg p-4 sm:p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="valorant-grid absolute inset-0 opacity-50" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {brainLinks.map(([source, target]) => {
            const from = nodeById.get(source);
            const to = nodeById.get(target);

            if (!from || !to) {
              return null;
            }

            const active = activeId === source || activeId === target;

            return (
              <motion.line
                animate={{
                  opacity: active ? 0.9 : 0.28,
                  pathLength: active ? 1 : 0.82,
                }}
                initial={{ pathLength: 0, opacity: 0 }}
                key={`${source}-${target}`}
                stroke={active ? "var(--valorant-red)" : "rgba(245,242,236,0.38)"}
                strokeWidth={active ? 0.34 : 0.2}
                x1={from.x}
                x2={to.x}
                y1={from.y}
                y2={to.y}
              />
            );
          })}
        </svg>

        {brainNodes.map((node, index) => {
          const active = node.id === activeId;

          return (
            <motion.button
              aria-pressed={active}
              className="absolute z-10 grid min-h-16 min-w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-[rgba(7,8,11,0.82)] px-3 text-center text-xs font-black shadow-2xl outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
              transition={{ delay: index * 0.06 }}
              key={node.id}
              onClick={() => setActiveId(node.id)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: active ? "var(--valorant-red)" : "rgba(245,242,236,0.2)",
                color: active ? "var(--foreground)" : "var(--muted)",
                boxShadow: active
                  ? "0 0 0 8px rgba(255,70,85,0.08), 0 20px 42px rgba(0,0,0,0.38)"
                  : "0 16px 34px rgba(0,0,0,0.28)",
              }}
              type="button"
            >
              <span>{node.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.aside
        className="theme-panel rounded-lg p-5"
        key={activeNode.id}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="font-mono text-xs uppercase text-[var(--valorant-red)]">
          Active Node
        </p>
        <h2 className="mt-3 text-3xl font-black">{activeNode.label}</h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">{activeNode.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {activeNode.tags.map((tag) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[var(--foreground)]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.aside>
    </section>
  );
}
