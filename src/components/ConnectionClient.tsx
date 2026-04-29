"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Terminal, 
  Briefcase, 
  Hash, 
  Mail, 
  MessageSquare,
  MessageCircle,
  Activity, 
  Sword, 
  Target, 
  Code2, 
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Gamepad2,
  Music
} from "lucide-react";
import Link from "next/link";
import Lottie from "lottie-react";
import catAnimation from "../../public/lottie/Cat playing animation.json";
import ValorantStats from "./ValorantStats";
import ChessStats from "./ChessStats";
import { GitHubCalendar } from "react-github-calendar";
import githubLottie from "../../public/lottie/Github Logo Octocat animated.json";
import matrixLottie from "../../public/lottie/matrix.json";
import linkedinLottie from "../../public/lottie/Linkedin Logo.json";
import whatsappLottie from "../../public/lottie/WhatsApp.json";
import emailLottie from "../../public/lottie/Email Send.json";
import discordLottie from "../../public/lottie/Wumpus Hi.json";
import twitterLottie from "../../public/lottie/X Twitter.json";
import redditLottie from "../../public/lottie/red bot.json";


type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  error?: string;
};

type Stats = {
  github: { 
    repos: number | string; 
    followers: number | string;
    latestRepo?: { name: string; description: string; language: string; url: string; } | null;
    orgs?: { login: string; avatar_url: string; }[];
  };
  codeforces: { 
    handle?: string;
    rating: number | string;
    rank: string;
    lastChange?: number;
    solved?: number | string;
  };
  leetcode: { 
    handle?: string;
    solved: number | string;
    easy: number;
    medium: number;
    hard: number;
    ranking: number | string;
    badges?: { id: string; name: string; icon: string }[];
  };
  chess: { rating: number | string };
  valorant: { rank: string };
};

function AnimatedNumber({ value, prefix = "" }: { value: number | string, prefix?: string }) {
  const numValue = typeof value === "string" ? parseInt(value.toString().replace(/[^0-9.-]/g, '')) : value;
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isNaN(numValue)) return;
    const animation = animate(count, numValue, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [numValue, count]);

  if (value === "---" || value === "N/A" || isNaN(numValue)) return <>{prefix}{value}</>;
  return <><>{prefix}</><motion.span>{rounded}</motion.span></>;
}

const SOCIAL_LINKS = [
  { name: "WhatsApp", icon: MessageCircle, lottie: whatsappLottie, url: "https://wa.me/+918081534758", speed: "< 1 MINUTE", color: "var(--green)" },
  { name: "Email", icon: Mail, lottie: emailLottie, url: "mailto:him2000.maurya@gmail.com", speed: "< 1 HOUR", color: "var(--cyan)" },
  { name: "Discord", icon: Gamepad2, lottie: discordLottie, url: "https://discord.gg/mrUh4rfnY", speed: "< 5 MINUTES", color: "var(--violet)" },
  { name: "Reddit", icon: MessageSquare, lottie: redditLottie, url: "https://www.reddit.com/user/Top_Sundae8258/", speed: "< 12 HOURS", color: "var(--valorant-red)" },
  { name: "LinkedIn", icon: Briefcase, lottie: linkedinLottie, url: "https://www.linkedin.com/in/himanshu-maurya-81a92b200/", speed: "< 24 HOURS", color: "var(--cyan)" },
  { name: "X (Twitter)", icon: Hash, lottie: twitterLottie, url: "https://x.com/HiMaN108", speed: "> 48 HOURS", color: "var(--muted)" },
];


const BACKGROUND_AGENTS = [
  { name: "Reyna", portrait: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/fullportrait.png" },
  { name: "Gekko", portrait: "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png" },
  { name: "Iso", portrait: "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/fullportrait.png" },
  { name: "Phoenix", portrait: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png" },
  { name: "Yoru", portrait: "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/fullportrait.png" },
  { name: "Sage", portrait: "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png" }
];

export default function ConnectionClient() {

  const [currentAgentIdx, setCurrentAgentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAgentIdx((prev) => (prev + 1) % BACKGROUND_AGENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [stats, setStats] = useState<Stats | null>(null);
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mounted, setMounted] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/stats")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => console.error("Failed to load telemetry"));
    
    fetch("/api/spotify")
      .then(res => res.json())
      .then(data => setSpotifyData(data))
      .catch(() => console.error("Failed to load spotify data"));
  }, []);

  useEffect(() => {
    if (mounted && calendarRef.current) {
      // Small timeout to ensure GitHubCalendar has rendered its SVG
      setTimeout(() => {
        if (calendarRef.current) {
          calendarRef.current.scrollLeft = calendarRef.current.scrollWidth;
        }
      }, 500);
    }
  }, [mounted, stats]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (res.ok) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 3000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  return (
    <div className="mx-auto max-w-7xl pt-32 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 pl-6 border-l-2 border-[var(--pink)]"
      >
        <div className="flex items-center gap-3 mb-4">
          <Activity className="size-5 text-[var(--pink)]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[var(--pink)]">Comms_Uplink_Established</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white mb-4">
          Connection <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--pink)] to-[var(--violet)]">Hub</span>
        </h1>
        <p className="text-white/50 max-w-xl text-sm leading-relaxed">
          Direct lines to my communication channels, live telemetry from my engineering and gaming profiles, and matchmaking for co-op missions.
        </p>

        {/* Uplink Channels Row */}
        <div className="mt-8 flex flex-wrap items-center gap-6">
           {SOCIAL_LINKS.map((link) => (
             <Link key={link.name} href={link.url} target="_blank" className="group/link relative flex items-center justify-center transition-transform hover:-translate-y-2 hover:scale-110 duration-300 w-16 h-16 sm:w-20 sm:h-20" style={{ '--hover-color': link.color } as React.CSSProperties}>
                {(link as any).lottie ? (
                  <Lottie animationData={(link as any).lottie} loop={true} className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover/link:drop-shadow-[0_0_20px_var(--hover-color)] transition-all" />
                ) : (
                  <link.icon className="size-10 text-white group-hover/link:text-[var(--hover-color)] transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover/link:drop-shadow-[0_0_20px_var(--hover-color)]" />
                )}
             </Link>
           ))}
        </div>

      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2 items-stretch mb-8">
        <div className="w-full h-full flex flex-col">
          {/* Direct Email Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-sm border-t-2 border-b-2 border-t-[var(--valorant-red)] border-b-white/10 bg-black/60 p-8 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Mail className="size-32" />
            </div>
            
            <h2 className="text-xl font-black italic uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="h-2 w-2 bg-[var(--pink)] rounded-full" />
              Direct Transmission
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10 h-full">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40">Codename / Name</label>
                  <input required name="name" type="text" className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-[var(--pink)] focus:outline-none transition-colors" placeholder="Viper" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40">Return Address / Email</label>
                  <input required name="email" type="email" className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-[var(--pink)] focus:outline-none transition-colors" placeholder="viper@protocol.com" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40">Subject</label>
                  <input required name="subject" type="text" className="w-full bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-[var(--pink)] focus:outline-none transition-colors" placeholder="Mission Proposal" />
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 flex-1">
                <div className="space-y-1 flex-1 flex flex-col">
                  <label className="font-mono text-[0.6rem] uppercase tracking-widest text-white/40">Intel / Message</label>
                  <textarea required name="message" className="w-full flex-1 bg-black/40 border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:border-[var(--pink)] focus:outline-none transition-colors resize-none min-h-[100px]" placeholder="Let's build something..." />
                </div>
                
                <button 
                  disabled={formState === "loading" || formState === "success"}
                  className="w-full flex items-center justify-center gap-2 bg-[var(--pink)]/10 hover:bg-[var(--pink)]/20 border border-[var(--pink)]/50 text-[var(--pink)] px-4 py-3 rounded-sm font-bold uppercase tracking-widest text-[0.7rem] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                >
                  {formState === "loading" ? <Loader2 className="size-4 animate-spin" /> : 
                   formState === "success" ? <CheckCircle2 className="size-4 text-green-400" /> : 
                   <Send className="size-4" />}
                  {formState === "loading" ? "Transmitting..." : 
                   formState === "success" ? "Received" : 
                   "Send Intel"}
                </button>
              </div>
              
              {formState === "error" && (
                <div className="md:col-span-2">
                  <p className="text-red-500 text-[0.6rem] font-mono mt-2 uppercase text-center">Transmission Failed. Try again.</p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
        
        <div className="w-full h-full flex flex-col space-y-8">
{/* Right Column: Telemetry & Co-op */}
        
          
          {/* Live Telemetry */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 flex items-center justify-between">
               <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
                 <span className="h-2 w-2 bg-[var(--green)] rounded-full" />
                 Live Telemetry
               </h2>
               {!stats && <Loader2 className="size-4 animate-spin text-[var(--green)]" />}
            </div>
            
            {/* Featured Codeforces Panel */}
            <div className="relative mb-4">
              <div className="absolute -top-[4.5rem] -right-4 w-48 h-48 pointer-events-none z-20">
                <Lottie animationData={catAnimation} loop={true} />
              </div>
              <Link  
                href={`https://codeforces.com/profile/${stats?.codeforces.handle || "HiM69CoDe"}`}
                target="_blank"
                className="rounded-sm border border-[var(--violet)]/30 bg-[var(--violet)]/[0.05] p-4 relative overflow-hidden group flex flex-col md:flex-row items-center gap-4 hover:bg-[var(--violet)]/10 hover:border-[var(--violet)]/50 transition-all cursor-pointer block"
              >
               
               <div className="relative z-10 flex-1 w-full text-center md:text-left">
                 <div className="flex flex-col md:flex-row items-center gap-2 mb-1">
                   <h3 className="text-3xl font-black italic text-white tracking-tight group-hover:text-[var(--violet)] transition-colors">{stats?.codeforces.handle || "Loading..."}</h3>
                   <img src="/images/codeforcesLogo.png" alt="Codeforces Logo" className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity rounded-md" />
                   {stats?.codeforces.rank && (
                     <span className="px-2 py-0.5 rounded-sm bg-[var(--violet)] text-white font-mono text-[0.6rem] uppercase font-bold tracking-widest">
                       {stats.codeforces.rank}
                     </span>
                   )}
                 </div>
                 
                 <div className="grid grid-cols-3 gap-3 mt-3 bg-black/40 p-3 rounded-sm border border-white/5">
                   <div>
                     <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-1">Current Rating</p>
                     <p className="font-black italic text-[var(--violet)] text-xl"><AnimatedNumber value={stats?.codeforces.rating || "---"} /></p>
                   </div>
                   <div>
                     <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-1">Solved</p>
                     <p className="font-black italic text-white text-xl"><AnimatedNumber value={stats?.codeforces.solved !== undefined ? stats.codeforces.solved : "---"} /></p>
                   </div>
                   <div>
                     <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-1">Latest Change</p>
                     <p className={`font-black italic text-xl ${stats?.codeforces.lastChange && stats.codeforces.lastChange > 0 ? "text-green-400" : stats?.codeforces.lastChange && stats.codeforces.lastChange < 0 ? "text-red-400" : "text-white"}`}>
                       <AnimatedNumber prefix={stats?.codeforces.lastChange && stats.codeforces.lastChange > 0 ? "+" : ""} value={stats?.codeforces.lastChange || "---"} />
                     </p>
                   </div>
                 </div>
               </div>
               
               <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--violet)]/30 group-hover:bg-[var(--violet)] transition-colors" />
            </Link>
            </div>

            {/* Featured LeetCode Panel */}
            <Link 
              href={`https://leetcode.com/u/${stats?.leetcode.handle || "HiMaN810"}`}
              target="_blank"
              className="mb-4 rounded-sm border border-[var(--amber)]/30 bg-[var(--amber)]/[0.05] p-4 relative overflow-hidden group flex flex-col md:flex-row items-center gap-4 hover:bg-[var(--amber)]/10 hover:border-[var(--amber)]/50 transition-all cursor-pointer block"
            >
               <div className="relative z-10 flex-1 w-full text-center md:text-left">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
                   <div className="flex flex-col md:flex-row items-center gap-2">
                     <h3 className="text-3xl font-black italic text-white tracking-tight group-hover:text-[var(--amber)] transition-colors">{stats?.leetcode.handle || "Loading..."}</h3>
                     <img src="/images/LeetCode_Logo_2.png" alt="LeetCode Logo" className="h-6 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity rounded-md" />
                     {stats?.leetcode.ranking && stats.leetcode.ranking !== "N/A" && (
                       <span className="px-2 py-0.5 rounded-sm bg-[var(--amber)] text-black font-mono text-[0.6rem] uppercase font-bold tracking-widest">
                         Rank {stats.leetcode.ranking}
                       </span>
                     )}
                   </div>
                   
                   {/* Badges */}
                   {stats?.leetcode.badges && stats.leetcode.badges.length > 0 && (
                     <div className="flex items-center gap-1.5">
                       <span className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mr-1">
                         {stats.leetcode.badges.length} Badges
                       </span>
                       <div className="flex -space-x-2">
                         {stats.leetcode.badges.slice(0, 3).map((badge, i) => (
                           <img 
                             key={badge.id} 
                             src={badge.icon} 
                             alt={badge.name} 
                             title={badge.name}
                             className="w-8 h-8 rounded-full border border-[var(--amber)]/20 bg-black/50 relative z-10 hover:z-20 hover:scale-110 transition-transform"
                             style={{ zIndex: 10 - i }}
                           />
                         ))}
                         {stats.leetcode.badges.length > 3 && (
                           <div className="w-8 h-8 rounded-full border border-[var(--amber)]/20 bg-black/80 flex items-center justify-center relative z-0">
                             <span className="text-[0.5rem] text-[var(--amber)] font-bold">+{stats.leetcode.badges.length - 3}</span>
                           </div>
                         )}
                       </div>
                     </div>
                   )}
                 </div>
                 
                 <div className="mt-2 bg-black/40 p-3 rounded-sm border border-white/5">
                   <div className="flex justify-between items-end mb-2">
                     <div>
                       <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-1">Total Solved</p>
                       <p className="font-black italic text-[var(--amber)] text-xl"><AnimatedNumber value={stats?.leetcode.solved || "---"} /></p>
                     </div>
                     <div className="flex gap-4 text-right">
                       <div>
                         <p className="font-mono text-[0.5rem] uppercase text-white/40">Easy</p>
                         <p className="font-bold text-green-400 text-sm"><AnimatedNumber value={stats?.leetcode.easy || 0} /></p>
                       </div>
                       <div>
                         <p className="font-mono text-[0.5rem] uppercase text-white/40">Med</p>
                         <p className="font-bold text-yellow-400 text-sm"><AnimatedNumber value={stats?.leetcode.medium || 0} /></p>
                       </div>
                       <div>
                         <p className="font-mono text-[0.5rem] uppercase text-white/40">Hard</p>
                         <p className="font-bold text-red-400 text-sm"><AnimatedNumber value={stats?.leetcode.hard || 0} /></p>
                       </div>
                     </div>
                   </div>
                   
                   {/* Progress Bar */}
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex">
                     {stats?.leetcode.solved && stats.leetcode.solved !== "N/A" ? (
                       <>
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(Number(stats.leetcode.easy) / Number(stats.leetcode.solved)) * 100}%` }}
                           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                           className="h-full bg-green-400" 
                         />
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(Number(stats.leetcode.medium) / Number(stats.leetcode.solved)) * 100}%` }}
                           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                           className="h-full bg-yellow-400" 
                         />
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${(Number(stats.leetcode.hard) / Number(stats.leetcode.solved)) * 100}%` }}
                           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                           className="h-full bg-red-400" 
                         />
                       </>
                     ) : null}
                   </div>
                 </div>
               </div>
               
               <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--amber)]/30 group-hover:bg-[var(--amber)] transition-colors" />
            </Link>
            
            {/* Featured GitHub Panel */}
            <div className="mb-4 rounded-sm border border-white/20 bg-white/[0.02] p-4 relative overflow-hidden group flex flex-col gap-4 hover:bg-white/5 hover:border-white/40 transition-all">
               {/* Header Row */}
               <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="flex items-center gap-4">
                   <Link href="https://github.com/HiMaN108" target="_blank" className="relative z-10 shrink-0 w-24 h-24 flex items-center justify-center hover:scale-110 transition-transform">
                     <Lottie animationData={githubLottie} loop={true} />
                   </Link>
                   <Link href="https://github.com/HiMaN108" target="_blank" className="hover:opacity-80 transition-opacity">
                     <h3 className="text-4xl font-black italic text-white tracking-tight">HiMaN108</h3>
                     {stats?.github.orgs && stats.github.orgs.length > 0 && (
                       <div className="flex items-center gap-2 mt-2">
                         {stats.github.orgs.map((org, i) => (
                           <img key={i} src={org.avatar_url} alt={org.login} title={org.login} className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform" />
                         ))}
                       </div>
                     )}
                   </Link>
                 </div>
                 
                 <div className="flex gap-6">
                   <div className="text-center md:text-right">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/50 mb-1">Repositories</p>
                     <p className="font-black italic text-white text-2xl"><AnimatedNumber value={stats?.github.repos || 0} /></p>
                   </div>
                   <div className="text-center md:text-right">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/50 mb-1">Followers</p>
                     <p className="font-black italic text-white text-2xl"><AnimatedNumber value={stats?.github.followers || 0} /></p>
                   </div>
                 </div>
               </div>

               {/* Latest Repo */}
               {stats?.github.latestRepo && (
                 <Link href={stats.github.latestRepo.url} target="_blank" className="p-3 bg-black/40 border border-white/5 rounded-sm hover:border-white/20 transition-colors flex flex-col justify-between group/repo block">
                   <div>
                     <div className="flex items-center justify-between mb-1">
                       <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50">Latest Activity</p>
                       <span className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded-sm bg-white/10 text-white/80">{stats.github.latestRepo.language || "Code"}</span>
                     </div>
                     <h4 className="text-white font-bold text-sm truncate group-hover/repo:text-[var(--cyan)] transition-colors">{stats.github.latestRepo.name}</h4>
                     {stats.github.latestRepo.description && (
                       <p className="text-white/50 text-xs mt-1 line-clamp-1">{stats.github.latestRepo.description}</p>
                     )}
                   </div>
                 </Link>
               )}
               
               <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/30 group-hover:bg-white transition-colors" />
            </div>
          </motion.div>



        </div>
      </div>

      

      {/* Valorant Live Stats Integration */}
      <div className="mt-12">
        <ValorantStats />
      </div>

      {/* Challenge Me & Live Audio Sections */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch mt-12">
        
        {/* Challenge Me Panel */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
           <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
             <span className="h-2 w-2 bg-[var(--valorant-red)] rounded-full animate-pulse shadow-[0_0_10px_var(--valorant-red)]" />
             Co-Op Missions & Challenges
           </h2>
           
           <div className="grid gap-4 sm:grid-cols-2 flex-1">
              {/* Valorant Team Up */}
              <div className="group rounded-sm border-2 border-[var(--valorant-red)] bg-black/80 p-6 relative overflow-hidden flex flex-col justify-between hover:shadow-[0_0_25px_rgba(255,70,85,0.2)] transition-all duration-300">
                <div className="absolute right-0 top-0 h-full w-[full] pointer-events-none overflow-hidden z-0 flex justify-end">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={BACKGROUND_AGENTS[currentAgentIdx].name}
                      src={BACKGROUND_AGENTS[currentAgentIdx].portrait}
                      alt={BACKGROUND_AGENTS[currentAgentIdx].name}
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 0.65 }}
                      exit={{ x: -60, opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="h-[140%] object-cover object-right select-none translate-y-[-15%] translate-x-[30%] pointer-events-none drop-shadow-[0_0_20px_rgba(255,70,85,0.2)]"
                    />
                  </AnimatePresence>
                </div>
                
                {/* Tactical Accent Corner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--valorant-red)]" />
                
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-sm bg-[var(--valorant-red)] text-white font-mono text-[0.55rem] uppercase font-black tracking-wider">Operational</span>
                    <span className="font-mono text-[0.6rem] text-[var(--valorant-red)] tracking-widest uppercase font-bold">Protocol // CO-OP</span>
                  </div>
                  
                  <h3 className="text-3xl font-black italic uppercase text-white group-hover:text-[var(--valorant-red)] transition-colors duration-300 tracking-tighter">Queue Up</h3>
                  <p className="text-xs text-white/60 mt-2 font-medium leading-relaxed">Assembling a tactical squad for optimized rank advancement.</p>
                  
                  {/* Teammate Compatibility Checklist */}
                  <div className="mt-6 space-y-2 bg-white/[0.02] p-4 rounded-sm border border-white/5">
                    <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/40 font-bold mb-2">Teammate Requirements</p>
                    <div className="grid grid-cols-2 gap-2 text-[0.65rem] font-mono text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[var(--valorant-red)] rotate-45" />
                        <span>Open Comms / Mic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[var(--valorant-red)] rotate-45" />
                        <span>Strategic Minds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[var(--valorant-red)] rotate-45" />
                        <span>Positive Mentality</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-[var(--valorant-red)] rotate-45" />
                        <span>No Toxicity</span>
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-6 flex flex-col gap-2">
                    <span className="font-mono text-[0.55rem] uppercase tracking-wider text-[var(--valorant-red)] font-bold">Deployed Agents</span>
                    <div className="flex flex-wrap gap-3">
                       {[
                         { name: "Reyna", icon: "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png" },
                         { name: "Phoenix", icon: "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png" },
                         { name: "Gekko", icon: "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png" }
                       ].map((agent) => (
                         <div key={agent.name} className="flex items-center gap-2 px-2.5 py-1 bg-black border border-[var(--valorant-red)]/30 rounded-sm hover:border-[var(--valorant-red)]/80 transition-all duration-200 group/agent">
                           <img src={agent.icon} alt={agent.name} className="w-5 h-5 object-cover rounded-full bg-[var(--valorant-red)]/20 border border-[var(--valorant-red)]/40 group-hover/agent:scale-110 transition-transform" />
                           <span className="text-[0.65rem] font-bold text-white/90">{agent.name}</span>
                         </div>
                       ))}
                    </div>
                  </div> */}
                </div>
                
                <Link 
                  href="https://discord.gg/mrUh4rfnY" 
                  target="_blank"
                  className="relative z-10 w-full flex items-center justify-center gap-2 bg-[var(--valorant-red)] hover:bg-white text-white hover:text-black py-3 rounded-sm text-[0.7rem] font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,70,85,0.3)] hover:shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
                >
                  <Gamepad2 className="size-4" /> Initialize Deployment
                </Link>
              </div>

              {/* Live Chess Stats */}
              <ChessStats />
           </div>
        </div>

        {/* Live Audio Panel (Spotify) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
           <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
             <span className="h-2 w-2 bg-[#1DB954] rounded-full animate-pulse shadow-[0_0_10px_#1DB954]" />
             Live Audio Feed
           </h2>
           
           <div className="rounded-sm border border-[#1DB954]/30 bg-black/60 p-6 relative overflow-hidden group flex-1 flex flex-col justify-center">
             <div className="absolute inset-0 bg-gradient-to-t from-[#1DB954]/5 to-transparent pointer-events-none" />
             
             {spotifyData ? (
               spotifyData.isPlaying ? (
                 <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="relative w-32 h-32 mb-6 rounded-sm overflow-hidden border-2 border-[#1DB954]/50 shadow-[0_0_20px_rgba(29,185,84,0.2)] group-hover:scale-105 transition-transform duration-500">
                     <img src={spotifyData.albumImageUrl} alt="Album Art" className="w-full h-full object-cover animate-[spin_10s_linear_infinite]" />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Music className="size-8 text-[#1DB954]" />
                     </div>
                   </div>
                   
                   <div className="flex gap-1 items-end h-4 mb-4">
                     <span className="w-1 bg-[#1DB954] animate-[bounce_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }} />
                     <span className="w-1 bg-[#1DB954] animate-[bounce_1.2s_ease-in-out_infinite]" style={{ animationDelay: '100ms' }} />
                     <span className="w-1 bg-[#1DB954] animate-[bounce_0.8s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }} />
                     <span className="w-1 bg-[#1DB954] animate-[bounce_1.1s_ease-in-out_infinite]" style={{ animationDelay: '300ms' }} />
                   </div>

                   <p className="font-mono text-[0.6rem] uppercase tracking-widest text-[#1DB954] mb-2">Currently Playing</p>
                   <Link href={spotifyData.songUrl || "#"} target="_blank" className="font-black italic text-xl text-white hover:text-[#1DB954] transition-colors line-clamp-1">{spotifyData.title}</Link>
                   <p className="text-white/50 text-xs mt-1 font-bold">{spotifyData.artist}</p>
                 </div>
               ) : (
                 <div className="relative z-10 flex flex-col items-center text-center text-white/30">
                   <Music className="size-16 mb-4 opacity-50" />
                   <p className="font-mono text-xs uppercase tracking-widest mb-1">Audio Feed Offline</p>
                   <p className="text-[0.6rem]">Not currently listening to Spotify</p>
                 </div>
               )
             ) : (
               <div className="relative z-10 flex flex-col items-center justify-center h-full">
                 <Loader2 className="size-8 animate-spin text-[#1DB954]/50 mb-4" />
                 <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/30">Establishing Connection...</p>
               </div>
             )}
           </div>
        </div>
      </div>

    </div>
  );
}
