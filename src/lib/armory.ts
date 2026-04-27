export type ArmoryType = "Freelance" | "Assignment" | "Business";

export type ArmoryItem = {
  id: string;
  title: string;
  type: ArmoryType;
  status: string;
  brief: string;
  tech: string[];
  link?: string;
  companyLink?: string;
  accent: string;
  logo?: string;
  timeline?: string;
};

export const armoryItems: ArmoryItem[] = [
  // Freelance
  {
    id: "newhive-cafe",
    title: "newHive.co.in",
    type: "Freelance",
    status: "INITIAL_PHASE",
    brief: "Developing a modern digital presence for a local cafe. Focused on aesthetic brand identity, menu visualization, and localized customer engagement.",
    tech: ["Next.js", "Tailwind", "Responsive Design"],
    accent: "var(--cyan)",
    link: "https://newhive.co.in",
  },

  // Assignments / Tactical
  {
    id: "tuf-assignment",
    title: "Interactive Wall Calendar",
    type: "Assignment",
    status: "COMPLETED",
    brief: "A high-fidelity frontend assignment for takeUforward. Features a fully interactive wall calendar with integrated sticky notes, state persistence, and a custom design system.",
    tech: ["Next.js", "TailwindCSS", "Lucide React"],
    accent: "var(--violet)",
    link: "https://takeu-forward-frontend-assignment.vercel.app/",
    companyLink: "https://takeuforward.org/",
    logo: "/images/takeUForward_logo.png",
    timeline: "4 Hours"
  },

  // Business (Banarasi Saree)
  {
    id: "banarasi-saree",
    title: "Varanasi Silk Hub",
    type: "Business",
    status: "MISSION_PLANNING",
    brief: "Launching traditional Banarasi Saree artistry on the Amazon India marketplace. Managing domestic supply chains and local artisan sourcing for the Indian market.",
    tech: ["Marketplace Strategy", "Domestic Logistics", "Indian Sourcing"],
    accent: "var(--valorant-red)",
  },
];

export const youtubeStats = {
  subscribers: "1.2K",
  totalViews: "45K+",
  latestVideo: {
    title: "How I built a Tactical Portfolio with Next.js",
    views: "2.5K",
    date: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2070&auto=format&fit=crop",
  }
};
