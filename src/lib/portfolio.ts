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
  // New resume node
  {
    id: "resume",
    label: "Resume",
    type: "document",
    x: 50,
    y: 80,
    summary: `HIMANSHU MAURYA
Varanasi, Uttar Pradesh, 221004 India
+91 8081534758 | him2000.maurya@gmail.com
LinkedIn | GitHub | LeetCode | Codeforces

Experience
• Junior Full Stack Developer — AscentSpark Private Limited (Nov ’25 – Present)
  • Developed scalable backend services and REST APIs for the Tutopia Learning Platform (1M+ downloads) using Next.js and Laravel APIs.
  • Integrated real‑time communication systems using Amazon Chime SDK, improving session reliability to 99.9%.
  • Optimized performance by ~30% with TanStack Query and caching, reducing redundant API calls by ~35%.
  • Built low‑latency 1:1 Quick Live sessions with LiveKit, cutting join time by ~40%.
• Software Developer Intern — Innovilla Private Limited (Jun ’25 – Oct ’25)
  • Developed scalable features for Sellio using Next.js and Laravel.
  • Automated logistics with Delhivery API, implemented Razorpay payment system, and built a zone‑based delivery routing system.
  • Created a Flutter delivery app with real‑time tracking and rider KYC.
• Research Intern — IIT BHU & IIIT Kottayam (May ’23 – Mar ’25)
  • Built IoT + MERN systems on Raspberry Pi, improving decision‑making speed by 40% and crop yield by 50%.

Skills
Languages: C++, JavaScript, PHP, SQL
Backend: Laravel, Node.js, REST APIs, Authentication
Frontend: Next.js, React.js, HTML, Tailwind CSS
Databases: MySQL, PostgreSQL, MongoDB
Tools: Git, Postman, Flutter
Core Concepts: Data Structures, Algorithms, OS, Networks, OOP

Education
• B.Tech in Information Technology, UIET, Kanpur (2020 – 2024)`,
    tags: ["Experience", "Education", "Skills"],
  },
];

export const brainLinks = [
  ["core", "dsa"],
  ["core", "backend"],
  ["core", "systems"],
  ["core", "creator"],
  ["core", "resume"], // link to resume node
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
    kicker: "Phase 01: Hardware Uplink",
    title: "Bridging Code and Reality",
    body: "My journey started by stepping out of the browser. During my research stints at IIIT Kottayam and IIT BHU, I learned that software is powerful, but hardware brings it to life. From programming Raspberry Pi sensors for smart agriculture to developing optical STEM toys, I proved I can engineer across the physical tech stack.",
  },
  {
    kicker: "Phase 02: Firewall Breach",
    title: "Securing the Network",
    body: "Building physical systems is only half the battle; defending them is the other. For my B.Tech Capstone, I dove deep into cybersecurity. I researched and simulated IP-based DDoS attacks, utilizing Wireshark and machine learning heuristics to detect and mitigate emerging network threats.",
  },
  {
    kicker: "Phase 03: The Full Stack Evolution",
    title: "Scaling for the Web",
    body: "With a solid foundation in hardware and security, I transitioned into the trenches of web development as a Junior Full Stack Developer at AscentSpark and an Intern at Innovilla. Here, I learned to build highly scalable web architectures, optimize e-commerce platforms like Sellio, and handle real-world backend complexities.",
  },
  {
    kicker: "Phase 04: Next Mission",
    title: "Ready for Deployment",
    body: "Today, I combine my full-stack engineering speed with my research-driven problem-solving skills. Whether it's building a complex Next.js interface, architecting a secure backend, or optimizing a database, I am fully equipped and ready for the next high-stakes mission.",
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
