export type PathId =
  | "brain"
  | "work"
  | "watch"
  | "freelancer"
  | "connection"
  | "challenge";

export const navPaths: Array<{
  id: PathId;
  href: string;
  label: string;
  short: string;
  tagline: string;
  accent: string;
}> = [
  {
    id: "brain",
    href: "/brain",
    label: "Character Stats",
    short: "Attributes",
    tagline: "Level 26 Human • Multi-domain skill tree.",
    accent: "var(--cyan)",
  },
  {
    id: "work",
    href: "/work",
    label: "Work",
    short: "Missions",
    tagline: "Projects framed as recruiter-readable levels.",
    accent: "var(--valorant-red)",
  },
  {
    id: "watch",
    href: "/watch",
    label: "Watch",
    short: "Live desk",
    tagline: "Creator work, learning status, and deployment pulse.",
    accent: "var(--amber)",
  },
  {
    id: "freelancer",
    href: "/freelancer",
    label: "Freelancer",
    short: "Services",
    tagline: "Available for hire, rates, and client success stories.",
    accent: "var(--purple)",
  },
  {
    id: "connection",
    href: "/connection",
    label: "Connect",
    short: "Network",
    tagline: "Let's collaborate, chat, or build something together.",
    accent: "var(--pink)",
  },
  {
    id: "challenge",
    href: "/challenge",
    label: "Challenge",
    short: "Arena",
    tagline: "Interactive puzzles, experiments, and hidden unlocks.",
    accent: "var(--green)",
  },
];

export const brainNodes = [
  {
    id: "core",
    label: "Himanshu",
    type: "core",
    x: 50,
    y: 46,
    summary:
      "The hub: practical engineering, clear communication, and steady shipping.",
    tags: ["Builder", "Learner", "Creator"],
  },
  {
    id: "dsa",
    label: "DSA",
    type: "skill",
    x: 23,
    y: 22,
    summary:
      "Pattern recognition, constraints, edge cases, and clean explanations.",
    tags: ["Algorithms", "Complexity", "Practice"],
  },
  {
    id: "backend",
    label: "Backend",
    type: "skill",
    x: 70,
    y: 23,
    summary: "APIs, auth flows, databases, queues, and service boundaries.",
    tags: ["Node", "APIs", "Data"],
  },
  {
    id: "systems",
    label: "Systems",
    type: "skill",
    x: 79,
    y: 68,
    summary:
      "Scaling instincts: caching, observability, resilience, and trade-offs.",
    tags: ["Design", "Scale", "Reliability"],
  },
  {
    id: "creator",
    label: "YouTube",
    type: "creator",
    x: 31,
    y: 72,
    summary: "Turning learning into useful stories, demos, and public notes.",
    tags: ["Teaching", "Video", "Audience"],
  },
  {
    id: "gaming",
    label: "Gaming",
    type: "play",
    x: 52,
    y: 15,
    summary:
      "Reflexes, competition, team sense, and a taste for responsive UI.",
    tags: ["Focus", "Feedback", "Fun"],
  },
];

export const brainLinks = [
  ["core", "dsa"],
  ["core", "backend"],
  ["core", "systems"],
  ["core", "creator"],
  ["core", "gaming"],
  ["dsa", "backend"],
  ["backend", "systems"],
  ["creator", "gaming"],
];

export type Project = {
  title: string;
  level: string;
  status: "Shipped" | "Active" | "Prototype";
  brief: string;
  impact: string;
  stack: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Interactive Portfolio OS",
    level: "Level 01",
    status: "Active",
    brief:
      "A game-like portfolio with route-based exploration, keyboard secrets, animated panels, and recruiter CTAs.",
    impact:
      "Converts a static profile into a guided experience without hiding the serious engineering signal.",
    stack: ["Next.js App Router", "React", "Framer Motion", "Tailwind CSS"],
    accent: "var(--valorant-red)",
  },
  {
    title: "API Mission Control",
    level: "Level 02",
    status: "Prototype",
    brief:
      "A backend dashboard concept for tracking services, recent deploys, latency, and ownership notes.",
    impact:
      "Shows how systems thinking can become operational UI for debugging and handoffs.",
    stack: ["REST", "Node", "PostgreSQL", "Observability"],
    accent: "var(--cyan)",
  },
  {
    title: "Learning Status Engine",
    level: "Side Quest",
    status: "Shipped",
    brief:
      "A small status model that turns study streaks, current topics, and public output into live portfolio signals.",
    impact:
      "Makes momentum visible to recruiters without requiring them to dig through every link.",
    stack: ["TypeScript", "Mock APIs", "State Machines"],
    accent: "var(--green)",
  },
  {
    title: "Creator Ops Board",
    level: "Creator Arc",
    status: "Active",
    brief:
      "A watch page for latest upload metadata, content queue, learning themes, and publishing rhythm.",
    impact:
      "Connects communication skill with engineering discipline and public proof of work.",
    stack: ["YouTube Data API Ready", "Cards", "Realtime UI"],
    accent: "var(--amber)",
  },
];

export const storyBeats = [
  {
    kicker: "Spawn",
    title: "Start with signal, not spectacle.",
    body: "The entry screen earns attention quickly, then gets out of the way so a recruiter can jump straight to work.",
  },
  {
    kicker: "Loadout",
    title: "Translate skills into proof.",
    body: "Each project reads like a mission: goal, stack, status, and the decision-making behind it.",
  },
  {
    kicker: "Clutch",
    title: "Show how the mind moves.",
    body: "The brain route connects algorithms, backend thinking, creator work, and play into one coherent map.",
  },
  {
    kicker: "Extract",
    title: "Leave with a next action.",
    body: "Resume, projects, live stats, and challenge input stay close enough that the adventure remains practical.",
  },
];

export const liveStats = [
  {
    label: "Learning",
    value: "System design",
    detail: "Caching, queues, and incident notes",
  },
  {
    label: "Latest Upload",
    value: "Build log",
    detail: "Mock YouTube source, API-ready",
  },
  {
    label: "Deploy Pulse",
    value: "Green",
    detail: "Local build target",
  },
  {
    label: "Focus Mode",
    value: "Backend + UI",
    detail: "Shipping portfolio interactions",
  },
];
