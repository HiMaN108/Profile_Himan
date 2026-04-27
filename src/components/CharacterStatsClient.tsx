"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  Dumbbell,
  Gamepad2,
  Gauge,
  GraduationCap,
  Layers3,
  Network,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import UserAvatar3D from "@/components/Character3D";
import { projects } from "@/lib/portfolio";

type BrainNode = {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  color: string;
  score: string;
  summary: string;
  signal: string;
  tags: string[];
  details: string[];
  icon: LucideIcon;
};

type Mode = {
  id: string;
  label: string;
  title: string;
  accent: string;
  description: string;
  perks: string[];
  icon: LucideIcon;
};

const modes: Mode[] = [
  {
    id: "builder",
    label: "Builder",
    title: "Full-stack builder mode",
    accent: "var(--cyan)",
    description:
      "Turns rough product ideas into shipped interfaces, APIs, and reliable user flows.",
    perks: ["Next.js + React UI", "Laravel and Node APIs", "Practical delivery"],
    icon: Code2,
  },
  {
    id: "operator",
    label: "Operator",
    title: "Real-time operator mode",
    accent: "var(--green)",
    description:
      "Optimizes live sessions, caching, communication, and platform performance.",
    perks: ["LiveKit joins", "Amazon Chime SDK", "TanStack Query caching"],
    icon: Radio,
  },
  {
    id: "strategist",
    label: "Strategist",
    title: "Pattern strategist mode",
    accent: "var(--valorant-red)",
    description:
      "Uses DSA, systems thinking, gaming instincts, and chess-like planning to make sharper calls.",
    perks: ["Algorithms", "System trade-offs", "Team coordination"],
    icon: BrainCircuit,
  },
  {
    id: "hustle",
    label: "Hustle",
    title: "Business hustle mode",
    accent: "var(--amber)",
    description:
      "Connects client work, logistics, payments, family business sense, and clear communication.",
    perks: ["Freelance delivery", "Razorpay flows", "Operations mindset"],
    icon: BriefcaseBusiness,
  },
];

const coreStats = [
  {
    label: "Users Impacted",
    value: "1M+",
    detail: "Tutopia platform downloads",
    color: "var(--valorant-red)",
    icon: Rocket,
  },
  {
    label: "Reliability Target",
    value: "99.9%",
    detail: "real-time session stability",
    color: "var(--green)",
    icon: ShieldCheck,
  },
  {
    label: "Perf Boost",
    value: "30%",
    detail: "TanStack Query + caching",
    color: "var(--cyan)",
    icon: Gauge,
  },
  {
    label: "Join Speed",
    value: "40%",
    detail: "faster LiveKit sessions",
    color: "var(--amber)",
    icon: Activity,
  },
];

const skillNodes: BrainNode[] = [
  {
    id: "core",
    label: "Himanshu",
    type: "core",
    x: 50,
    y: 48,
    color: "var(--valorant-red)",
    score: "LVL 26",
    summary:
      "Full-stack engineer with a practical builder brain: backend depth, frontend taste, and a bias for shipping.",
    signal: "Pattern Seeker",
    tags: ["Full Stack", "Problem Solver", "Fast Learner"],
    details: [
      "B.Tech in Information Technology from UIET Kanpur.",
      "Works across Next.js, React, Laravel, Node.js, databases, and real-time systems.",
      "Uses gaming, DSA, and business instincts as decision-making fuel.",
    ],
    icon: BrainCircuit,
  },
  {
    id: "backend",
    label: "Backend",
    type: "skill",
    x: 24,
    y: 29,
    color: "var(--cyan)",
    score: "92",
    summary:
      "API architecture, auth, database work, service boundaries, and production-minded delivery.",
    signal: "API Core",
    tags: ["Laravel", "Node.js", "REST"],
    details: [
      "Built scalable backend services for the Tutopia Learning Platform.",
      "Comfortable with MySQL, PostgreSQL, MongoDB, authentication, and API contracts.",
      "Thinks in clear ownership, response time, and failure paths.",
    ],
    icon: Database,
  },
  {
    id: "realtime",
    label: "Real-time",
    type: "system",
    x: 50,
    y: 17,
    color: "var(--green)",
    score: "99.9",
    summary:
      "Live communication, quick joins, session reliability, and low-latency product moments.",
    signal: "Live Sync",
    tags: ["LiveKit", "Chime SDK", "Low Latency"],
    details: [
      "Integrated Amazon Chime SDK to improve session reliability to 99.9%.",
      "Built 1:1 Quick Live sessions with LiveKit and reduced join time by about 40%.",
      "Keeps the user experience smooth when timing matters most.",
    ],
    icon: Radio,
  },
  {
    id: "frontend",
    label: "Frontend",
    type: "skill",
    x: 76,
    y: 29,
    color: "var(--purple)",
    score: "88",
    summary:
      "Next.js, React, Tailwind, responsive layouts, and interfaces that explain the system clearly.",
    signal: "Interface Layer",
    tags: ["Next.js", "React", "Tailwind"],
    details: [
      "Ships recruiter-readable product UI instead of generic portfolio screens.",
      "Uses animation and interaction when they help the story move.",
      "Balances visual energy with scanning, clarity, and mobile behavior.",
    ],
    icon: Layers3,
  },
  {
    id: "dsa",
    label: "DSA",
    type: "logic",
    x: 17,
    y: 55,
    color: "var(--amber)",
    score: "86",
    summary:
      "Pattern recognition, constraints, edge cases, and clean explanations under pressure.",
    signal: "Algorithm Reflex",
    tags: ["C++", "LeetCode", "Codeforces"],
    details: [
      "Uses DSA as a thinking gym for complex product and backend decisions.",
      "Focuses on constraints, trade-offs, and failure cases before writing code.",
      "Brings contest-style pattern spotting into everyday engineering.",
    ],
    icon: Cpu,
  },
  {
    id: "systems",
    label: "Systems",
    type: "architecture",
    x: 83,
    y: 55,
    color: "var(--cyan)",
    score: "84",
    summary:
      "Caching, observability, reliability, queues, and decisions that make software easier to operate.",
    signal: "Scale Instinct",
    tags: ["Caching", "Design", "Reliability"],
    details: [
      "Optimized performance by around 30% with TanStack Query and caching.",
      "Reduced redundant API calls by about 35%.",
      "Thinks beyond the happy path: load, latency, handoffs, and ownership.",
    ],
    icon: Network,
  },
  {
    id: "ascent",
    label: "AscentSpark",
    type: "experience",
    x: 38,
    y: 73,
    color: "var(--valorant-red)",
    score: "ACTIVE",
    summary:
      "Junior Full Stack Developer work on Tutopia, real-time sessions, APIs, and performance.",
    signal: "Production Arc",
    tags: ["Tutopia", "1M+ Downloads", "Current"],
    details: [
      "Building scalable backend services and REST APIs with Next.js and Laravel APIs.",
      "Worked on real-time learning sessions with Chime SDK and LiveKit.",
      "Improved performance and reliability on a product with serious reach.",
    ],
    icon: Rocket,
  },
  {
    id: "innovilla",
    label: "Innovilla",
    type: "experience",
    x: 63,
    y: 73,
    color: "var(--green)",
    score: "SHIP",
    summary:
      "Sellio feature work, logistics automation, payments, delivery routing, and Flutter rider tools.",
    signal: "Commerce Ops",
    tags: ["Sellio", "Delhivery", "Razorpay"],
    details: [
      "Automated logistics with Delhivery API.",
      "Implemented Razorpay payments and zone-based delivery routing.",
      "Built a Flutter delivery app with real-time tracking and rider KYC.",
    ],
    icon: BriefcaseBusiness,
  },
  {
    id: "research",
    label: "Research",
    type: "research",
    x: 25,
    y: 88,
    color: "var(--purple)",
    score: "IOT",
    summary:
      "IIT BHU and IIIT Kottayam research work with IoT, MERN systems, Raspberry Pi, and crop intelligence.",
    signal: "Field Lab",
    tags: ["IoT", "MERN", "Raspberry Pi"],
    details: [
      "Built IoT + MERN systems on Raspberry Pi.",
      "Improved decision-making speed by 40% in research workflows.",
      "Contributed to systems tied to crop yield improvements around 50%.",
    ],
    icon: GraduationCap,
  },
  {
    id: "rituals",
    label: "Rituals",
    type: "life",
    x: 76,
    y: 88,
    color: "var(--amber)",
    score: "FOCUS",
    summary:
      "Valorant, chess, gym, cooking, and family business energy that keeps the builder loop alive.",
    signal: "Focus Loop",
    tags: ["Valorant", "Chess", "Gym"],
    details: [
      "Valorant and chess sharpen pattern reading, timing, and team coordination.",
      "Gym discipline keeps consistency visible even outside code.",
      "Cooking and family business work add patience, taste, and operations sense.",
    ],
    icon: Gamepad2,
  },
];

const skillLinks: Array<[string, string]> = [
  ["core", "backend"],
  ["core", "frontend"],
  ["core", "dsa"],
  ["core", "systems"],
  ["core", "ascent"],
  ["core", "innovilla"],
  ["core", "rituals"],
  ["backend", "realtime"],
  ["frontend", "systems"],
  ["dsa", "backend"],
  ["systems", "realtime"],
  ["ascent", "realtime"],
  ["ascent", "systems"],
  ["innovilla", "backend"],
  ["research", "systems"],
  ["research", "dsa"],
  ["rituals", "dsa"],
];

const buildMeters = [
  {
    label: "Backend Systems",
    value: 92,
    color: "var(--cyan)",
    detail: "APIs, auth, data, services",
  },
  {
    label: "Real-time Product",
    value: 90,
    color: "var(--green)",
    detail: "Chime, LiveKit, latency",
  },
  {
    label: "Frontend Polish",
    value: 86,
    color: "var(--purple)",
    detail: "React, Next.js, Tailwind",
  },
  {
    label: "Strategic Thinking",
    value: 88,
    color: "var(--amber)",
    detail: "DSA, chess, systems",
  },
];

const unlocks = [
  {
    title: "Production Reach",
    rarity: "Legendary",
    body: "Worked on learning platform systems with 1M+ downloads.",
    icon: Trophy,
    color: "var(--valorant-red)",
  },
  {
    title: "Live Session Stability",
    rarity: "Epic",
    body: "Integrated real-time communication flows targeting 99.9% reliability.",
    icon: Radio,
    color: "var(--green)",
  },
  {
    title: "Cache Reflex",
    rarity: "Rare",
    body: "Cut redundant API calls by around 35% with caching and query discipline.",
    icon: Sparkles,
    color: "var(--cyan)",
  },
  {
    title: "Commerce Operator",
    rarity: "Rare",
    body: "Connected Delhivery, Razorpay, delivery routing, and rider KYC workflows.",
    icon: BriefcaseBusiness,
    color: "var(--amber)",
  },
  {
    title: "Field Researcher",
    rarity: "Epic",
    body: "Built IoT + MERN systems on Raspberry Pi for agriculture research.",
    icon: GraduationCap,
    color: "var(--purple)",
  },
  {
    title: "Discipline Loop",
    rarity: "Passive",
    body: "Uses gym, games, chess, and cooking as pattern training outside the IDE.",
    icon: Dumbbell,
    color: "var(--green)",
  },
];

export default function CharacterStatsClient() {
  const [activeId, setActiveId] = useState(skillNodes[0].id);
  const [modeId, setModeId] = useState(modes[0].id);
  const activeNode =
    skillNodes.find((node) => node.id === activeId) ?? skillNodes[0];
  const activeMode = modes.find((mode) => mode.id === modeId) ?? modes[0];
  const nodeById = useMemo(
    () => new Map(skillNodes.map((node) => [node.id, node])),
    [],
  );
  const ActiveNodeIcon = activeNode.icon;

  return (
    <>
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
    {/* Replace the first motion.article wrapping UserAvatar3D with this: */}
  <motion.article
    className="theme-panel relative overflow-hidden rounded-lg border border-white/5 bg-black/40 p-6 sm:p-8 backdrop-blur-md"
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--cyan)]/5 blur-[100px]" />
    
    <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--cyan)]">
          <span className="h-1 w-1 bg-[var(--cyan)]" />
          <span>Neural // Avatar</span>
        </div>
        <h2 className="mt-3 text-3xl font-black italic uppercase tracking-tighter sm:text-4xl">
          Visual <span className="text-white/20">Interface</span>
        </h2>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">// SIGNAL_STRENGTH</span>
        <span
          className="rounded-sm border-b-2 px-4 py-1.5 font-mono text-sm font-black uppercase tracking-tighter"
          style={{
            borderColor: activeNode.color,
            color: activeNode.color,
            background: `${activeNode.color}11`
          }}
        >
          {activeNode.score}
        </span>
      </div>
    </div>
    {/* This div gives the 3D canvas an explicit height — critical */}
      <div className="flex-1 w-full min-h-[520px] sm:min-h-[300px] mt-6 flex flex-col justify-center items-center gap-4 p-2">
      <UserAvatar3D
        accent={activeNode.color} 
        mode={activeMode.label}
        signal={activeNode.signal}
      />
    </div>
  </motion.article>

        <div className="grid content-start gap-4">
          <motion.article
            className="theme-panel relative overflow-hidden rounded-lg border border-white/5 bg-black/40 p-6 sm:p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-[50px]" />
            
            <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">
                   <span className="h-1 w-1 bg-white/20" />
                   <span>Active // Protocol</span>
                </div>
                <h2
                  className="mt-3 text-3xl font-black italic uppercase tracking-tighter"
                  style={{ color: activeMode.accent }}
                >
                  {activeMode.title}
                </h2>
              </div>
              <TerminalSquare
                className="size-7 shrink-0 opacity-40"
                style={{ color: activeMode.accent }}
                aria-hidden="true"
              />
            </div>
            <p className="leading-7 text-[var(--muted)]">
              {activeMode.description}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {modes.map((mode) => {
                const ModeIcon = mode.icon;
                const active = mode.id === modeId;

                return (
                  <button
                    className="flex min-h-12 items-center gap-3 rounded-md border px-3 py-2 text-left text-sm font-bold transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)]"
                    key={mode.id}
                    onClick={() => setModeId(mode.id)}
                    style={{
                      borderColor: active ? mode.accent : "var(--border)",
                      color: active ? "var(--foreground)" : "var(--muted)",
                      background: active ? "rgba(245,242,236,0.075)" : "transparent",
                    }}
                    type="button"
                  >
                    <ModeIcon className="size-4 shrink-0" aria-hidden="true" />
                    {mode.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
              {activeMode.perks.map((perk) => (
                <div
                  className="flex items-center gap-3 text-sm text-[var(--foreground)]"
                  key={perk}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: activeMode.accent }}
                  />
                  {perk}
                </div>
              ))}
            </div>
          </motion.article>

          <div className="grid gap-4 sm:grid-cols-2">
            {coreStats.map((stat, index) => {
              const StatIcon = stat.icon;

              return (
                <motion.article
                  className="theme-panel rounded-lg p-4"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.04 }}
                  key={stat.label}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <StatIcon
                      className="size-5"
                      style={{ color: stat.color }}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[0.68rem] uppercase text-[var(--muted)]">
                      Impact
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <p
                    className="mt-1 text-3xl font-black"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-[var(--muted)]">
                    {stat.detail}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <motion.div
          className="theme-panel relative min-h-[640px] overflow-hidden rounded-lg p-4 sm:min-h-[610px] sm:p-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <div className="valorant-grid absolute inset-0 opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,209,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))]" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[var(--cyan)]">
                <span className="h-1 w-1 bg-[var(--cyan)]" />
                <span>Neural // Grid_Map</span>
              </div>
              <h2 className="mt-3 text-2xl font-black italic uppercase tracking-tighter">Route <span className="text-white/20">The Avatar</span></h2>
            </div>
            <span className="rounded-md border border-white/10 bg-black/25 px-3 py-0.5 font-mono text-xs text-[var(--muted)]">
              {activeNode.type} / {activeNode.score}
            </span>
          </div> 

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
                    opacity: active ? 0.95 : 0.24,
                    pathLength: active ? 1 : 0.78,
                  }}
                  initial={{ opacity: 0, pathLength: 0 }}
                  key={`${source}-${target}`}
                  stroke={active ? activeNode.color : "rgba(245,242,236,0.34)"}
                  strokeWidth={active ? 0.38 : 0.18}
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
            const NodeIcon = node.icon;

            return (
              <motion.button
                aria-pressed={active}
                className="absolute z-10 flex h-16 w-[5.35rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-md border bg-[rgba(7,8,11,0.88)] px-2 text-center text-[0.68rem] font-black leading-tight shadow-2xl outline-none backdrop-blur transition hover:bg-[rgba(245,242,236,0.08)] focus-visible:ring-2 focus-visible:ring-[var(--cyan)] sm:h-[4.65rem] sm:w-[6.25rem] sm:text-xs"
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{ opacity: 1, scale: active ? 1.08 : 1 }}
                transition={{ delay: index * 0.035 }}
                whileHover={{ scale: active ? 1.1 : 1.04 }}
                key={node.id}
                onClick={() => setActiveId(node.id)}
                style={{
                  left: `clamp(3.05rem, ${node.x}%, calc(100% - 3.05rem))`,
                  top: `clamp(4.4rem, ${node.y}%, calc(100% - 3.2rem))`,
                  borderColor: active ? node.color : "rgba(245,242,236,0.18)",
                  boxShadow: active
                    ? `0 0 0 8px ${node.color}22, 0 22px 48px rgba(0,0,0,0.42)`
                    : "0 16px 34px rgba(0,0,0,0.28)",
                  color: active ? "var(--foreground)" : "var(--muted)",
                }}
                type="button"
              >
                <NodeIcon
                  className="size-4 shrink-0"
                  style={{ color: active ? node.color : "currentColor" }}
                  aria-hidden="true"
                />
                <span>{node.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.aside
          className="theme-panel rounded-lg p-5 sm:p-6"
          key={activeNode.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="font-mono text-xs uppercase"
                style={{ color: activeNode.color }}
              >
                Active Signal
              </p>
              <h2 className="mt-2 text-3xl font-black">{activeNode.label}</h2>
            </div>
            <div
              className="grid size-12 shrink-0 place-items-center rounded-md border"
              style={{
                borderColor: `${activeNode.color}66`,
                color: activeNode.color,
              }}
            >
              <ActiveNodeIcon className="size-6" aria-hidden="true" />
            </div>
          </div>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            {activeNode.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {activeNode.tags.map((tag) => (
              <span
                className="rounded-md border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[var(--foreground)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
            {activeNode.details.map((detail) => (
              <div className="flex gap-3 text-sm leading-6 text-[var(--muted)]" key={detail}>
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full"
                  style={{ background: activeNode.color }}
                />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </motion.aside>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-4">
        {buildMeters.map((meter, index) => (
          <motion.article
            className="theme-panel rounded-lg p-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.04 }}
            key={meter.label}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase text-[var(--muted)]">
                {meter.label}
              </p>
              <span className="font-mono text-xs font-black" style={{ color: meter.color }}>
                {meter.value}%
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${meter.value}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ background: meter.color }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {meter.detail}
            </p>
          </motion.article>
        ))}
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--cyan)]">
              Unlocks
            </p>
            <h2 className="mt-2 text-2xl font-black">Achievements pulled from your real work</h2>
          </div>
          <span className="font-mono text-xs uppercase text-[var(--muted)]">
            No fake XP
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unlocks.map((unlock, index) => {
            const UnlockIcon = unlock.icon;

            return (
              <motion.article
                className="theme-panel rounded-lg p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.04 }}
                key={unlock.title}
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div
                    className="grid size-11 place-items-center rounded-md border"
                    style={{ borderColor: `${unlock.color}66`, color: unlock.color }}
                  >
                    <UnlockIcon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs uppercase" style={{ color: unlock.color }}>
                    {unlock.rarity}
                  </span>
                </div>
                <h3 className="text-xl font-black">{unlock.title}</h3>
                <p className="mt-3 leading-6 text-[var(--muted)]">{unlock.body}</p>
              </motion.article>
            );
          })}
        </div>
      </section>


      {/* <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--valorant-red)]">
              Mission Sync
            </p>
            <h2 className="mt-2 text-2xl font-black">How the brain connects to the portfolio</h2>
          </div>
          <span className="font-mono text-xs uppercase text-[var(--muted)]">
            {projects.length} project signals
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <motion.article
              className="theme-panel rounded-lg p-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 + index * 0.04 }}
              key={project.title}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span
                  className="rounded-md border px-3 py-1 font-mono text-xs"
                  style={{ borderColor: `${project.accent}66`, color: project.accent }}
                >
                  {project.level}
                </span>
                <span className="font-mono text-xs uppercase text-[var(--muted)]">
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-black">{project.title}</h3>
              <p className="mt-3 leading-6 text-[var(--muted)]">{project.impact}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((item) => (
                  <span
                    className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section> */}
    </>
  );
}
