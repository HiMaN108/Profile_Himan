"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import {
  Trophy,
  ExternalLink,
  FileText,
  PlaySquare,
  CheckSquare,
  Lock,
  Globe,
  Calendar,
  Home,
  MapPin,
  Tv,
  GraduationCap,
  Mic,
  Wallet,
  Video,
  ShieldCheck,
  Zap,
  Users,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { innovillaCompany } from "./innovilla-data";
import { iitBhuCompany } from "./iitbhu-data";
import { iiitKottayamCompany } from "./iiitkottayam-data";
import { btechProjectData } from "./btech-project-data";
import type { Company, Mission } from "./innovilla-data";

/* ──────────────────────── AscentSpark Data ──────────────────────── */

const ascentSparkCompany: Company = {
  name: "AscentSpark Private Limited",
  url: "https://www.ascentspark.com/",
  logo: "/images/logo-tenyears.gif",
  joinDate: "1 November 2025",
  role: "Junior Full Stack Developer",
  isCurrent: true,
  workMode: "remote",
  missions: [
    {
      id: "ssen",
      title: "SSEN Samsung TV",
      subtitle: "OTT Platform for Sports & Football",
      status: "SHIPPED",
      role: "React Developer / Smart TV",
      timeline: "Nov 2025 — Dec 2025",
      objective:
        "Worked on a high-performance OTT streaming application for Samsung Smart TVs, focused on live football and sports content.",
      impact: "Shipped on Samsung TV Platform",
      liveUrl: "https://ssen.co/",
      techStack: [
        "React",
        "Norigin Spatial Navigation",
        "Samsung Tizen",
        "Smart TV SDK",
        "Streaming APIs",
      ],
      dataLogs: [
        { name: "SSEN_Traffic_Report.pdf", url: "https://drive.google.com/file/d/15oj1uqPtOZnMd2t_lL-hu6cYl4LdN9Td/view?usp=drive_link" },
      ],
      features: [
        {
          name: "Spatial Navigation System",
          icon: Tv,
          detail:
            "Implemented Norigin Spatial Navigation for seamless D-pad and remote control navigation across the entire TV interface.",
        },
        {
          name: "Live Sports Streaming",
          icon: PlaySquare,
          detail:
            "Integrated live video streaming pipelines for real-time football matches and sports events on Samsung Tizen platform.",
        },
        {
          name: "TV-Optimized UI",
          icon: Zap,
          detail:
            "Worked on responsive layouts optimized for large-screen TV displays with focus management, scroll handling, and remote-friendly interactions.",
        },
      ],
      intelReport: {
        problem:
          "SSEN needed a dedicated Samsung Smart TV application for their OTT sports platform. The challenge was working on a React app that works flawlessly with TV remote controls and D-pad navigation — a completely different interaction model from web or mobile.",
        execution:
          "Worked on the TV application using React with Norigin Spatial Navigation library for handling focus-based navigation. Designed the UI to work on large screens with remote-friendly card layouts, smooth scroll, and fast content loading. Integrated with SSEN's streaming backend for live football and sports content delivery.",
        aftermath:
          "Successfully shipped the application on Samsung's Tizen TV platform. The app delivers smooth live sports streaming with intuitive remote-control navigation, giving SSEN a presence on the Smart TV ecosystem.",
      },
      accentColor: "var(--amber)",
    },
    {
      id: "tutopia-web",
      title: "Tutopia Web App",
      subtitle: "Education Learning Platform — Frontend & API Integration",
      status: "ACTIVE",
      role: "Full Stack Developer",
      timeline: "Jan 2026 — Present",
      objective:
        "Build and integrate core features for the Tutopia learning platform web app including subscriptions, live sessions, KYC, and real-time classroom tools.",
      impact: "1M+ App Downloads • Live in Production",
      liveUrl: "https://web.tutopialearningapp.com/",
      techStack: [
        "Next.js",
        "React",
        "Laravel APIs",
        "Amazon Chime SDK",
        "Firebase Realtime DB",
        "TanStack Query",
        "Tailwind CSS",
      ],
      dataLogs: [
        { name: "Tutopia_Web_Traffic_Report.pdf", url: "https://drive.google.com/file/d/1TTcTO2jYu8uDmkEsz0dwkwQJSWmNcn6y/view?usp=drive_link" },
      ],
      features: [
        {
          name: "Quick Live Sessions (1:1)",
          icon: Video,
          detail:
            "Built one-to-one live session meetings powered by wallet transactions. Students can instantly connect with tutors through a real-time booking and joining flow.",
        },
        {
          name: "Subscription & Finance KYC",
          icon: Wallet,
          detail:
            "Implemented the complete subscription purchase flow and integrated finance KYC verification for tutor payouts and wallet operations.",
        },
        {
          name: "Amazon Chime SDK Live Classes",
          icon: Users,
          detail:
            "Integrated Amazon Chime SDK for large-scale live classroom sessions with real-time audio/video, achieving 99.9% session reliability.",
        },
        {
          name: "Raise Hand & Screen Share",
          icon: ShieldCheck,
          detail:
            "Built student raise-hand feature and screen sharing request system using Firebase Realtime Database for instant status synchronization between students and teachers.",
        },
      ],
      intelReport: {
        problem:
          "Tutopia's web application needed critical features to match and extend its mobile app (1M+ downloads). The platform required real-time 1:1 tutoring sessions, a subscription payment flow, KYC compliance for financial operations, and robust live classroom tools — all integrated with existing Laravel backend APIs.",
        execution:
          "Started by building the Laravel API endpoints for Quick Live sessions, then switched to the frontend to integrate everything. Built the subscription flow end-to-end, implemented finance KYC verification, and created the Quick Live 1:1 session feature powered by wallet transactions. Integrated Amazon Chime SDK for live classes and added real-time raise-hand and screen-sharing request features using Firebase Realtime Database for instant status updates between participants.",
        aftermath:
          "The web app is now live in production at web.tutopialearningapp.com, serving students and tutors with real-time sessions, subscription management, and live classroom interactions. Optimized API performance by ~30% with TanStack Query and caching, reducing redundant API calls by ~35%.",
      },
      accentColor: "var(--cyan)",
    },
    {
      id: "tutopia-ai",
      title: "AI Spoken Learning",
      subtitle: "Real-time AI Agent for Spoken English Practice",
      status: "SHIPPED",
      role: "Frontend Developer / LiveKit Integration",
      timeline: "Jan 2026 — Feb 2026",
      objective:
        "Integrate LiveKit for real-time AI-powered spoken learning sessions where an AI agent tests and coaches users on spoken English.",
      impact: "Real-time AI Voice Sessions",
      liveUrl: "https://ai.tutopia.in/login",
      techStack: ["Next.js", "LiveKit", "AI Voice Agent", "Real-time Audio"],
      dataLogs: [],
      features: [
        {
          name: "LiveKit Voice Integration",
          icon: Mic,
          detail:
            "Integrated LiveKit SDK for ultra-low-latency real-time audio communication between users and the AI agent, cutting join time by ~40%.",
        },
        {
          name: "AI Agent Testing Flow",
          icon: GraduationCap,
          detail:
            "Built the frontend interface for the AI agent that evaluates spoken English in real-time, providing instant feedback and scoring.",
        },
        {
          name: "Session Management",
          icon: Zap,
          detail:
            "Implemented session lifecycle management — room creation, user join, AI agent connection, real-time transcription display, and graceful session teardown.",
        },
      ],
      intelReport: {
        problem:
          "Tutopia wanted to launch an AI-powered spoken English learning tool where students can practice speaking with an AI agent in real-time. The challenge was achieving low-latency, high-quality audio communication between the browser and the AI voice agent.",
        execution:
          "Integrated LiveKit as the real-time communication layer, handling room creation, participant management, and audio streaming. Built the frontend UI for the AI testing session including real-time audio level indicators, transcription display, and feedback rendering. Ensured smooth session lifecycle from join to completion.",
        aftermath:
          "The AI spoken learning platform is live at ai.tutopia.in, enabling students to practice spoken English with an AI agent in real-time. Achieved ~40% faster join times compared to the previous Chime-based approach, with smooth WebRTC audio quality.",
      },
      accentColor: "var(--green)",
    },
  ],
};

const companies: Company[] = [
  ascentSparkCompany,
  innovillaCompany,
  iitBhuCompany,
  iiitKottayamCompany,
  btechProjectData,
];

/* ──────────────────── Lottie Work Mode Badge ──────────────────── */

function WorkModeLottie({ mode }: { mode: "remote" | "onsite" | "hybrid" }) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const src = mode === "remote" ? "/images/remote_logo.json" : "/images/onsite_logo.json";

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => {});
  }, [src]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 90, height: 90 }}
    />  
  );
}

/* ──────────────────── Reusable Company Section ──────────────────── */

function CompanySection({ company, expanded, onToggle }: { company: Company; expanded: boolean; onToggle: () => void }) {
  const sortedMissions = [...company.missions].reverse().sort((a, b) =>
    a.status === "ACTIVE" ? -1 : b.status === "ACTIVE" ? 1 : 0
  );
  const [activeMissionId, setActiveMissionId] = useState<string>(
    sortedMissions[0].id,
  );
  const [showLivePreview, setShowLivePreview] = useState(false);

  const activeMission =
    sortedMissions.find((m) => m.id === activeMissionId) ||
    sortedMissions[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Company Header — Clickable to expand/collapse */}
      <button
        onClick={onToggle}
        className="theme-panel flex w-full flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 p-4 text-left transition-colors hover:border-white/20 sm:p-5"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            {company.logo ? (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white p-2 shadow-sm relative z-0">
                <img
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="grid size-16 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 font-black text-xl text-white/60 relative z-0">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <span className="flex items-center gap-2">
              <span className="text-xl font-black text-white">
                {company.name}
              </span>
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center rounded border border-white/10 bg-white/5 p-1 text-[var(--muted)] transition hover:border-[var(--cyan)]/50 hover:text-[var(--cyan)]"
                title={company.url}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
            <p className="font-mono text-xs text-[var(--muted)]">
              {company.role}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="pointer-events-none -my-4 flex items-center justify-center drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            <WorkModeLottie mode={company.workMode} />
          </div>
          {company.isCurrent && (
            <div className="flex items-center gap-2 rounded border border-[var(--green)]/30 bg-[var(--green)]/10 px-3 py-1.5 font-mono text-xs text-[var(--green)]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--green)]" />
              <span>Currently Working Here</span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs"
            style={{
              borderColor: company.workMode === "remote" ? "rgba(96,165,250,0.3)" : company.workMode === "onsite" ? "rgba(251,191,36,0.3)" : "rgba(168,85,247,0.3)",
              color: company.workMode === "remote" ? "rgb(96,165,250)" : company.workMode === "onsite" ? "rgb(251,191,36)" : "rgb(168,85,247)",
              backgroundColor: company.workMode === "remote" ? "rgba(96,165,250,0.08)" : company.workMode === "onsite" ? "rgba(251,191,36,0.08)" : "rgba(168,85,247,0.08)",
            }}
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              {company.workMode === "remote" ? (
                <Home className="h-3 w-3" />
              ) : (
                <MapPin className="h-3 w-3" />
              )}
            </motion.span>
            <span>{company.workMode === "remote" ? "Remote" : company.workMode === "onsite" ? "Onsite" : "Hybrid"}</span>
          </div>
          <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[var(--muted)]">
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {company.endDate
                ? `${company.joinDate} — ${company.endDate}`
                : `Joined ${company.joinDate}`}
            </span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronDown className="h-5 w-5 text-[var(--muted)]" />
          </motion.div>
        </div>
      </button>

      {/* Split-Screen Layout — Collapsible */}
      <AnimatePresence>
      {expanded && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
      <div className="flex flex-col gap-5 xl:flex-row xl:min-h-[820px]">
        {/* LEFT PANEL: ROSTER */}
        <div className="flex w-full flex-col gap-3 xl:w-[340px] xl:shrink-0">
          <div className="mb-1">
            <p className="font-mono text-xs uppercase text-[var(--cyan)]">
              Mission Archive
            </p>
            <h2 className="mt-1 text-xl font-black uppercase tracking-wide">
              Project Roster
            </h2>
          </div>

          <div className="flex flex-col gap-3 xl:overflow-y-auto xl:pr-1">
            {sortedMissions.map((mission) => {
              const isActive = mission.id === activeMissionId;
              const isLive = mission.status === "ACTIVE";

              return (
                <button
                  key={mission.id}
                  onClick={() => {
                    setActiveMissionId(mission.id);
                    setShowLivePreview(false);
                  }}
                  className={`group relative flex w-full flex-col items-start gap-2.5 rounded-md border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[var(--cyan)] bg-[var(--cyan)]/10"
                      : "border-white/10 bg-black/25 hover:border-white/30 hover:bg-white/5"
                  }`}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  }}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`font-mono text-[0.6rem] font-bold uppercase tracking-widest ${
                        isLive
                          ? "text-[var(--valorant-red)]"
                          : mission.status === "PROTOTYPE"
                            ? "text-[var(--purple)]"
                            : "text-[var(--muted)]"
                      }`}
                    >
                      {isLive && (
                        <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--valorant-red)]" />
                      )}
                      [{mission.status}]
                    </span>
                    {isActive && (
                      <span className="font-mono text-[0.6rem] text-[var(--cyan)]">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-base font-black uppercase leading-tight ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {mission.title}
                  </h3>
                  <p className="text-[0.68rem] leading-tight text-[var(--muted)]">
                    {mission.subtitle}
                  </p>
                  <p className="font-mono text-[0.6rem] text-[var(--muted)]">
                    {mission.timeline}
                  </p>

                  {isActive && (
                    <motion.div
                      layoutId={`activeIndicator-${company.name}`}
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{ backgroundColor: mission.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: DOSSIER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMission.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="theme-panel relative flex w-full flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/40"
          >
            <div className="valorant-grid absolute inset-0 pointer-events-none opacity-20" />

            <div className="relative z-10 flex flex-col gap-7 overflow-y-auto p-5 sm:p-7">
              {/* Header */}
              <div className="flex flex-col gap-3 border-b border-white/10 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                      {activeMission.title}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {activeMission.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded border px-3 py-1.5 font-mono text-xs"
                    style={{
                      borderColor: `color-mix(in srgb, ${activeMission.accentColor} 30%, transparent)`,
                      color: activeMission.accentColor,
                    }}
                  >
                    <Trophy className="h-3 w-3" />
                    <span>{activeMission.impact}</span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
                  <span className="font-mono">{activeMission.role}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-mono">{activeMission.timeline}</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  {activeMission.objective}
                </p>
              </div>

              {/* Live Site Preview */}
              {activeMission.liveUrl && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--valorant-red)]">
                      <Globe className="h-4 w-4" /> Live Deployment
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowLivePreview(!showLivePreview)}
                        className="flex items-center gap-1.5 rounded border border-white/15 bg-white/5 px-3 py-1 font-mono text-[0.65rem] transition hover:bg-white/10"
                      >
                        {showLivePreview ? "Hide Preview" : "Show Preview"}
                      </button>
                      <a
                        href={activeMission.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded px-3 py-1 font-mono text-[0.65rem] font-bold text-black transition hover:brightness-110"
                        style={{
                          backgroundColor: activeMission.accentColor,
                          clipPath:
                            "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                        }}
                      >
                        <ExternalLink className="h-3 w-3" /> Open Live
                      </a>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showLivePreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <a
                          href={activeMission.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative block aspect-video w-full overflow-hidden rounded-md border border-white/10 bg-black/60"
                        >
                          <iframe
                            src={activeMission.liveUrl}
                            title={`${activeMission.title} Preview`}
                            className="pointer-events-none h-full w-full"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px] opacity-30" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100">
                            <span className="flex items-center gap-2 rounded-md border border-white/30 bg-black/70 px-5 py-2.5 font-mono text-sm font-bold text-white backdrop-blur">
                              <ExternalLink className="h-4 w-4" /> Visit{" "}
                              {activeMission.title}
                              <ChevronRight className="h-4 w-4" />
                            </span>
                          </div>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showLivePreview && (
                    <div className="flex items-center gap-3 rounded border border-white/8 bg-black/30 px-4 py-3">
                      <Lock className="h-4 w-4 shrink-0 text-white/20" />
                      <p className="font-mono text-[0.65rem] text-white/30">
                        [ PREVIEW STANDBY — Click &quot;Show Preview&quot; to
                        load live deployment ]
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Video, PDF or Prototype Preview */}
              {!activeMission.liveUrl && activeMission.videoUrl ? (
                <div className="flex flex-col gap-3">
                  <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--valorant-red)]">
                    <PlaySquare className="h-4 w-4 animate-pulse" /> Live Video Demonstration
                  </h3>
                  <div className="group relative block aspect-video w-full overflow-hidden rounded-md border border-[var(--valorant-red)]/30 bg-black/60 shadow-[0_0_20px_rgba(255,100,100,0.15)]">
                    <iframe
                      src={activeMission.videoUrl}
                      className="h-full w-full border-0"
                      title={`${activeMission.title} Video Demonstration`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : !activeMission.liveUrl && activeMission.pdfUrl ? (
                <div className="flex flex-col gap-3">
                  <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--valorant-red)]">
                    <FileText className="h-4 w-4 animate-pulse" /> Research Document Preview
                  </h3>
                  <div className="group relative block aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-md border border-[var(--valorant-red)]/30 bg-white/5 shadow-[0_0_20px_rgba(255,100,100,0.15)]">
                    <iframe
                      src={activeMission.pdfUrl}
                      className="h-full w-full border-0"
                      title={`${activeMission.title} Document`}
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : !activeMission.liveUrl && !activeMission.videoUrl && !activeMission.pdfUrl ? (
                <div className="flex items-center gap-3 rounded border border-[var(--purple)]/20 bg-[var(--purple)]/5 px-4 py-3">
                  <Lock className="h-4 w-4 shrink-0 text-[var(--purple)]" />
                  <p className="font-mono text-[0.65rem] text-[var(--purple)]">
                    [ PROTOTYPE — Not deployed to production ]
                  </p>
                </div>
              ) : null}

              {/* Key Features */}
              <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--green)]">
                  <CheckSquare className="h-4 w-4" /> Features Worked On
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {activeMission.features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.name}
                        className="group rounded-md border border-white/8 bg-black/30 p-4 transition hover:border-white/20 hover:bg-white/[0.03]"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Icon
                            className="h-4 w-4 shrink-0"
                            style={{ color: activeMission.accentColor }}
                          />
                          <span className="text-sm font-bold text-white/90">
                            {feature.name}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed text-[var(--muted)]">
                          {feature.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Intel Report */}
              <div className="flex flex-col gap-5 border-t border-white/10 pt-5">
                <div>
                  <h4 className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                    // The Challenge
                  </h4>
                  <p className="text-sm leading-relaxed text-white/80">
                    {activeMission.intelReport.problem}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                    // How I Worked On It
                  </h4>
                  <p className="text-sm leading-relaxed text-white/80">
                    {activeMission.intelReport.execution}
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                    // Result
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: activeMission.accentColor }}
                  >
                    {activeMission.intelReport.aftermath}
                  </p>
                </div>

              </div>

              {/* Data Logs & Tech */}
              <div className="flex flex-col gap-6 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-3 w-full">
                  {activeMission.dataLogs.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-widest text-[var(--amber)]">
                        <FileText className="h-3.5 w-3.5" /> Data Logs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeMission.dataLogs.map((log, i) => (
                          <a
                            key={i}
                            href={log.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded border border-white/10 bg-black/40 px-3 py-2 transition hover:border-[var(--amber)]/50 hover:bg-[var(--amber)]/5"
                          >
                            <FileText className="h-3 w-3 text-white/30 group-hover:text-[var(--amber)]" />
                            <span className="truncate font-mono text-[0.65rem] text-white/70 transition-colors group-hover:text-[var(--amber)]">
                              {log.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <h4 className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
                      // Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeMission.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[0.6rem] text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────── Main Export ──────────────────────── */

export default function MissionLogClient() {
  const [expandedState, setExpandedState] = useState<Record<string, boolean>>({
    [companies[0].name]: true, // Default to first company expanded
  });
  const [amongUsData, setAmongUsData] = useState<object | null>(null);
  const [showParty, setShowParty] = useState(false);

  useEffect(() => {
    fetch("/images/amongus_jump.json")
      .then((res) => res.json())
      .then(setAmongUsData)
      .catch(() => {});
  }, []);

  const toggleCompany = (name: string) => {
    setExpandedState((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isAllCollapsed = Object.values(expandedState).every((val) => !val);

  useEffect(() => {
    if (isAllCollapsed) {
      // The climbing loop is 12s. 
      // We want to show the party only when it reaches the top (around 10.5s - 12s)
      const triggerParty = () => {
        setShowParty(true);
        setTimeout(() => setShowParty(false), 2000); // Show for 2 seconds
      };

      // Initial trigger
      const firstTimer = setTimeout(triggerParty, 10500);
      
      // Repeat every 12 seconds
      const interval = setInterval(triggerParty, 12000);
      
      return () => {
        clearTimeout(firstTimer);
        clearInterval(interval);
        setShowParty(false);
      };
    } else {
      setShowParty(false);
    }
  }, [isAllCollapsed]);

  return (
    <section className="relative mx-auto mt-12 flex max-w-7xl flex-col items-center px-4 sm:px-6">
      {/* --- THE LADDER (Desktop Only) --- */}
      <div className="pointer-events-none absolute bottom-0 left-[37%] top-8 z-20 hidden w-16 flex-col items-center md:flex">
        {/* Rails */}
        <div className="absolute inset-y-0 left-2 w-0.5 bg-[var(--valorant-red)]/40 shadow-[0_0_8px_rgba(255,70,85,0.8)] transition-all duration-500" style={{ transform: isAllCollapsed ? "rotate(0deg)" : "rotate(-3deg) translateX(-20px)", opacity: isAllCollapsed ? 1 : 0 }} />
        <div className="absolute inset-y-0 right-2 w-0.5 bg-[var(--valorant-red)]/40 shadow-[0_0_8px_rgba(255,70,85,0.8)] transition-all duration-500" style={{ transform: isAllCollapsed ? "rotate(0deg)" : "rotate(3deg) translateX(20px)", opacity: isAllCollapsed ? 1 : 0 }} />
        
        {/* Rungs */}
        <div 
          className="absolute inset-0 transition-all duration-500"
          style={{ 
            backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 35px, rgba(255,70,85,0.4) 35px, rgba(255,70,85,0.4) 37px)",
            opacity: isAllCollapsed ? 1 : 0,
            filter: isAllCollapsed ? "none" : "blur(4px)"
          }} 
        />

        {/* Party Celebration (Confetti) */}
        <AnimatePresence>
          {showParty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-12 flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0.5, 0],
                    x: (i - 6) * 20,
                    y: -50 - Math.random() * 50,
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="absolute h-2 w-2 rounded-full"
                  style={{ 
                    backgroundColor: i % 3 === 0 ? "var(--cyan)" : i % 3 === 1 ? "var(--amber)" : "var(--valorant-red)" 
                  }}
                />
              ))}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="whitespace-nowrap font-black text-xl text-[var(--valorant-red)] drop-shadow-[0_0_10px_rgba(255,70,85,1)]"
              >
                LEVEL UP!! 🎊
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Climbing Among Us Character */}
        {amongUsData && (
          <AnimatePresence>
            {isAllCollapsed ? (
              <motion.div
                key="climbing"
                initial={{ top: "100%" }}
                animate={{ 
                  top: ["100%", "80%", "80%", "60%", "60%", "40%", "40%", "20%", "20%", "-5%", "-5%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.15, 0.25, 0.4, 0.5, 0.65, 0.75, 0.9, 1]
                }}
                className="absolute z-10 w-24 h-24 -ml-4 -mt-12"
              >
                <motion.div
                  animate={{ 
                    x: showParty ? [0, 10, -10, 0] : [0, -12, 0], 
                    scale: showParty ? [1, 1.3, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-full"
                  style={{ rotate: "10deg" }}
                >
                  <Lottie animationData={amongUsData} loop autoplay className="h-full w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="falling"
                initial={{ top: "20%", rotate: 0 }}
                animate={{ top: "150%", rotate: 180, opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="absolute z-10 w-24 h-24 -ml-4"
              >
                <div style={{ rotate: "-90deg" }} className="h-full w-full grayscale">
                  <Lottie animationData={amongUsData} loop={false} className="h-full w-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="relative z-10 flex w-full flex-col gap-16">
        {companies.map((company) => (
          <CompanySection 
            key={company.name} 
            company={company} 
            expanded={!!expandedState[company.name]}
            onToggle={() => toggleCompany(company.name)}
          />
        ))}
      </div>
    </section>
  );
}
