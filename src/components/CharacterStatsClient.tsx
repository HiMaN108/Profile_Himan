"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UserAvatar3D from "@/components/Character3D";

const skillNodes = [
  {
    id: "core",
    label: "Himanshu",
    type: "core",
    x: 50,
    y: 50,
    color: "var(--valorant-red)",
  },
  {
    id: "backend",
    label: "Backend",
    type: "skill",
    x: 25,
    y: 30,
    color: "var(--cyan)",
  },
  {
    id: "frontend",
    label: "Frontend",
    type: "skill",
    x: 75,
    y: 30,
    color: "var(--cyan)",
  },
  {
    id: "dsa",
    label: "DSA",
    type: "skill",
    x: 15,
    y: 50,
    color: "var(--cyan)",
  },
  {
    id: "systems",
    label: "Systems",
    type: "skill",
    x: 85,
    y: 50,
    color: "var(--cyan)",
  },
  {
    id: "valorant",
    label: "Valorant",
    type: "gaming",
    x: 30,
    y: 70,
    color: "var(--valorant-red)",
  },
  {
    id: "chess",
    label: "Chess",
    type: "gaming",
    x: 70,
    y: 70,
    color: "var(--valorant-red)",
  },
  {
    id: "freelance",
    label: "Freelance",
    type: "business",
    x: 20,
    y: 85,
    color: "var(--amber)",
  },
  {
    id: "saree",
    label: "Saree Biz",
    type: "business",
    x: 80,
    y: 85,
    color: "var(--amber)",
  },
  {
    id: "gym",
    label: "Gym",
    type: "life",
    x: 40,
    y: 15,
    color: "var(--green)",
  },
  {
    id: "cooking",
    label: "Cooking",
    type: "life",
    x: 60,
    y: 15,
    color: "var(--green)",
  },
];

const skillLinks = [
  ["core", "backend"],
  ["core", "frontend"],
  ["core", "dsa"],
  ["core", "systems"],
  ["core", "valorant"],
  ["core", "chess"],
  ["core", "freelance"],
  ["core", "saree"],
  ["core", "gym"],
  ["core", "cooking"],
  ["backend", "systems"],
  ["dsa", "backend"],
  ["valorant", "chess"],
  ["freelance", "saree"],
];

const nodeDetails: Record<
  string,
  { summary: string; level: string; tags: string[] }
> = {
  core: {
    summary:
      "The hub: practical engineering, clear communication, and steady shipping.",
    level: "LVL 26",
    tags: ["Full Stack", "Pattern Seeker", "Multi-Domain"],
  },
  backend: {
    summary: "APIs, auth flows, databases, queues, and service boundaries.",
    level: "85%",
    tags: ["Laravel", "Node.js", "REST"],
  },
  frontend: {
    summary: "React, Next.js, Tailwind, and responsive UI development.",
    level: "70%",
    tags: ["React", "Next.js", "Tailwind"],
  },
  dsa: {
    summary:
      "Pattern recognition, constraints, edge cases, and clean solutions.",
    level: "80%",
    tags: ["Algorithms", "LeetCode", "Codeforces"],
  },
  systems: {
    summary:
      "Scaling instincts: caching, observability, resilience, and trade-offs.",
    level: "75%",
    tags: ["Design", "Scale", "Reliability"],
  },
  valorant: {
    summary:
      "Tactical shooter expertise, team coordination, and strategic thinking.",
    level: "85%",
    tags: ["Tactics", "Team Play", "Ranked"],
  },
  chess: {
    summary: "Strategic planning, pattern recognition, and long-term thinking.",
    level: "75%",
    tags: ["Strategy", "Pattern", "Focus"],
  },
  freelance: {
    summary: "Client management, project delivery, and business communication.",
    level: "70%",
    tags: ["Clients", "Delivery", "Communication"],
  },
  saree: {
    summary: "Family business operations, logistics, and traditional craft.",
    level: "65%",
    tags: ["Business", "Logistics", "Heritage"],
  },
  gym: {
    summary: "Discipline, consistency, and physical fitness routine.",
    level: "75%",
    tags: ["Discipline", "Fitness", "Routine"],
  },
  cooking: {
    summary: "Creativity, experimentation, and culinary exploration.",
    level: "70%",
    tags: ["Creativity", "KFC Fan", "Experiment"],
  },
};

export default function CharacterStatsClient() {
  const [activeId, setActiveId] = useState(skillNodes[0].id);
  const activeNode =
    skillNodes.find((node) => node.id === activeId) ?? skillNodes[0];
  const nodeById = new Map(skillNodes.map((node) => [node.id, node]));

  return (
    <>
      <section className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="theme-panel rounded-lg p-5 sm:p-7">
          <h2 className="mb-4 text-2xl font-black">3D Avatar</h2>
          <UserAvatar3D />
        </div>

        <div className="theme-panel rounded-lg p-5 sm:p-7">
          <h2 className="mb-4 text-2xl font-black">Core Stats</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Total XP",
                value: "26 Years",
                color: "var(--valorant-red)",
              },
              {
                label: "Main Class",
                value: "Full Stack",
                color: "var(--cyan)",
              },
              {
                label: "Specialization",
                value: "Real-time Systems",
                color: "var(--amber)",
              },
              {
                label: "Play Style",
                value: "Strategic",
                color: "var(--green)",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-white/10 bg-white/[0.045] p-4"
              >
                <p className="font-mono text-xs text-[var(--muted)]">
                  {stat.label}
                </p>
                <p
                  className="mt-2 text-xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8 theme-panel relative min-h-[560px] overflow-hidden rounded-lg p-4 sm:min-h-[520px] sm:p-6">
        <div className="valorant-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,70,85,0.11),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.2))]" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {skillLinks.map(([source, target]) => {
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
                stroke={
                  active ? "var(--valorant-red)" : "rgba(245,242,236,0.38)"
                }
                strokeWidth={active ? 0.34 : 0.2}
                x1={from.x}
                x2={to.x}
                y1={from.y}
                y2={to.y}
              />
            );
          })}
        </svg>

        {skillNodes.map((node, index) => {
          const active = node.id === activeId;

          return (
            <motion.button
              aria-pressed={active}
              className="absolute z-10 grid h-14 w-[4.75rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-[rgba(7,8,11,0.88)] px-2 text-center text-[0.68rem] font-black leading-tight shadow-2xl outline-none backdrop-blur transition focus-visible:ring-2 focus-visible:ring-[var(--cyan)] sm:h-16 sm:w-20 sm:text-xs"
              initial={{ opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: active ? 1.1 : 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: active ? 1.12 : 1.04 }}
              key={node.id}
              onClick={() => setActiveId(node.id)}
              style={{
                left: `clamp(2.75rem, ${node.x}%, calc(100% - 2.75rem))`,
                top: `clamp(2.75rem, ${node.y}%, calc(100% - 2.75rem))`,
                borderColor: active ? node.color : "rgba(245,242,236,0.2)",
                color: active ? "var(--foreground)" : "var(--muted)",
                boxShadow: active
                  ? `0 0 0 8px ${node.color}22, 0 20px 42px rgba(0,0,0,0.38)`
                  : "0 16px 34px rgba(0,0,0,0.28)",
              }}
              type="button"
            >
              <span className="max-w-[4rem] sm:max-w-[4.5rem]">
                {node.label}
              </span>
            </motion.button>
          );
        })}
      </section>

      <motion.aside
        className="theme-panel rounded-lg p-5"
        key={activeNode.id}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <p
            className="font-mono text-xs uppercase"
            style={{ color: activeNode.color }}
          >
            Active Node
          </p>
          <span
            className="font-mono text-sm font-black"
            style={{ color: activeNode.color }}
          >
            {nodeDetails[activeNode.id]?.level}
          </span>
        </div>
        <h2 className="mt-3 text-3xl font-black">{activeNode.label}</h2>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          {nodeDetails[activeNode.id]?.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {nodeDetails[activeNode.id]?.tags.map((tag) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[var(--foreground)]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.aside>

      <section className="theme-panel mt-8 rounded-lg p-5 sm:p-7">
        <h2 className="mb-4 text-2xl font-black">Achievements Unlocked</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "1M+ Users Impacted", icon: "🚀", rarity: "Legendary" },
            { name: "99.9% System Reliability", icon: "💎", rarity: "Epic" },
            { name: "30% Performance Boost", icon: "⚡", rarity: "Rare" },
            { name: "Real-time Systems Expert", icon: "🔥", rarity: "Epic" },
            { name: "Multi-Domain Player", icon: "🎮", rarity: "Legendary" },
            { name: "Business Hustler", icon: "💼", rarity: "Rare" },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className="rounded-md border border-white/10 bg-white/[0.045] p-4"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-2xl">{achievement.icon}</span>
                <span
                  className="font-mono text-xs"
                  style={{
                    color:
                      achievement.rarity === "Legendary"
                        ? "var(--valorant-red)"
                        : achievement.rarity === "Epic"
                          ? "var(--purple)"
                          : "var(--cyan)",
                  }}
                >
                  {achievement.rarity}
                </span>
              </div>
              <p className="font-bold">{achievement.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
