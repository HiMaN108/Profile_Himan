"use client";

import PortfolioShell from "@/components/PortfolioShell";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Package, 
  ExternalLink, 
  ShoppingCart, 
  Video, 
  Zap, 
  Shield, 
  Target,
  Box,
  RefreshCcw,
  Clock
} from "lucide-react";
import { armoryItems } from "@/lib/armory";

export default function ArmoryPage() {
  const [ytData, setYtData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYT() {
      try {
        const res = await fetch("/api/youtube");
        const data = await res.json();
        if (!data.error) setYtData(data);
      } catch (e) {
        console.error("Failed to fetch YouTube stats");
      } finally {
        setLoading(false);
      }
    }
    fetchYT();
  }, []);

  // Helper to format large numbers
  const formatNum = (num: string | number) => {
    const n = typeof num === "string" ? parseInt(num) : num;
    if (isNaN(n)) return "0";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        {/* Header Section */}
        <section className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--amber)]">
              <span className="h-1 w-1 bg-[var(--amber)]" />
              <span>Protocol // Armory_Hub</span>
              <span className="h-[1px] flex-1 bg-[var(--amber)]/20 max-w-[100px]" />
            </div>
            
            <h1 className="mt-4 text-5xl font-black italic uppercase tracking-tighter sm:text-7xl">
              Gear <span className="text-white/20 select-none">& Ops</span>
            </h1>

            <div className="group mt-6 flex max-w-3xl items-start gap-5 border-l-2 border-[var(--amber)]/30 bg-gradient-to-r from-[var(--amber)]/5 to-transparent py-2 pl-6">
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                The collection of <span className="text-white font-bold italic uppercase tracking-wide">Secondary Objectives</span>. 
                From freelance contracts and creator content to experimental gear and upcoming marketplace deployments.
              </p>
            </div>
          </div>
        </section>

        {/* Signal Broadcast (YouTube) */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-red-500">
             <span>// Signal_Broadcast</span>
             {loading && <RefreshCcw className="size-3 animate-spin opacity-40" />}
             <span className="h-[1px] flex-1 bg-red-500/10" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-sm border border-white/5 bg-black/40 p-8 backdrop-blur-md"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-600/10 blur-[60px]" />
            <div className="relative z-10">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div className="flex-1 min-w-[300px]">
                  <div className="flex items-center gap-4 mb-4">
                    {ytData?.channelAvatar ? (
                      <div className="h-12 w-12 rounded-full border-2 border-red-500/50 overflow-hidden">
                        <img src={ytData.channelAvatar} alt="Channel Avatar" className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center">
                        <Video className="size-6 text-red-500/50" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">YouTube <span className="text-white/20">Intel</span></h2>
                        {ytData?.channelName && (
                          <span className="text-[0.6rem] font-mono border border-red-500/30 px-3 py-1 rounded-sm text-red-500 uppercase tracking-widest bg-red-500/5">{ytData.channelName}</span>
                        )}
                      </div>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.4em] text-white/30">System // Operational_Terminal</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="grid grid-cols-3 gap-10">
                       <div className="relative">
                         <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/30 mb-1">Subscribers</p>
                         <p className="text-2xl font-black text-white">{loading ? "---" : formatNum(ytData?.subscribers || 0)}</p>
                         <div className="absolute -left-4 top-0 h-full w-[2px] bg-red-500/20" />
                       </div>
                       <div className="relative">
                         <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/30 mb-1">Total Views</p>
                         <p className="text-2xl font-black text-white">{loading ? "---" : formatNum(ytData?.totalViews || 0)}</p>
                         <div className="absolute -left-4 top-0 h-full w-[2px] bg-red-500/20" />
                       </div>
                       <div className="relative">
                         <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/30 mb-1">Operations</p>
                         <p className="text-2xl font-black text-white">{loading ? "---" : formatNum(ytData?.videoCount || 0)}</p>
                         <div className="absolute -left-4 top-0 h-full w-[2px] bg-red-500/20" />
                       </div>
                    </div>

                    <Link 
                      href="https://www.youtube.com/@Kaitavaplayz?sub_confirmation=1" 
                      target="_blank"
                      className="group relative flex items-center gap-4 rounded-sm border border-red-500 bg-red-500/10 px-8 py-3 transition-all hover:bg-red-500 hover:text-white"
                    >
                       <span className="font-mono text-[0.7rem] font-black uppercase tracking-[0.3em]">Join the Signal</span>
                       <Video className="size-4 group-hover:animate-bounce" />
                       <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-red-500" />
                       <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-red-500" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* Latest Video */}
                {ytData?.latestVideo ? (
                  <Link 
                    href={`https://www.youtube.com/watch?v=${ytData.latestVideo.id}`}
                    target="_blank"
                    className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-sm border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-red-500/30"
                  >
                     <div 
                       className="h-28 w-full sm:w-48 shrink-0 rounded-sm bg-cover bg-center border border-white/10 overflow-hidden relative" 
                       style={{ backgroundImage: `url(${ytData.latestVideo.thumbnail})` }} 
                     >
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                       <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-sm font-mono text-[0.5rem] text-white/60">LATEST</div>
                     </div>
                     <div>
                       <p className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-red-500 mb-2">● Latest Intelligence</p>
                       <h3 className="text-sm font-black uppercase leading-tight group-hover:text-red-500 transition-colors" dangerouslySetInnerHTML={{ __html: ytData.latestVideo.title }} />
                       <div className="mt-4 flex items-center gap-4">
                         <div className="flex flex-col">
                           <span className="text-[0.5rem] font-mono text-white/20 uppercase">Data Pulse</span>
                           <span className="text-[0.65rem] font-black text-white/60">{formatNum(ytData.latestVideo.views)} VIEWS</span>
                         </div>
                         <div className="h-6 w-[1px] bg-white/10" />
                         <div className="flex flex-col">
                           <span className="text-[0.5rem] font-mono text-white/20 uppercase">Timestamp</span>
                           <span className="text-[0.65rem] font-black text-white/60">
                             {new Date(ytData.latestVideo.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                           </span>
                         </div>
                       </div>
                     </div>
                  </Link>
                ) : (
                  <div className="h-36 border border-white/5 bg-white/[0.02] rounded-sm flex items-center justify-center animate-pulse">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/20">Establishing Uplink...</p>
                  </div>
                )}

                {/* Popular Video */}
                {ytData?.popularVideo ? (
                  <Link 
                    href={`https://www.youtube.com/watch?v=${ytData.popularVideo.id}`}
                    target="_blank"
                    className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-sm border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-red-500/30"
                  >
                     <div 
                       className="h-28 w-full sm:w-48 shrink-0 rounded-sm bg-cover bg-center border border-white/10 overflow-hidden relative" 
                       style={{ backgroundImage: `url(${ytData.popularVideo.thumbnail})` }} 
                     >
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                       <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded-sm font-mono text-[0.5rem] text-white/60 uppercase">High Impact</div>
                     </div>
                     <div>
                       <p className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-red-500 mb-2">🔥 High-Impact Mission</p>
                       <h3 className="text-sm font-black uppercase leading-tight group-hover:text-red-500 transition-colors" dangerouslySetInnerHTML={{ __html: ytData.popularVideo.title }} />
                       <div className="mt-4 flex items-center gap-4">
                         <div className="flex flex-col">
                           <span className="text-[0.5rem] font-mono text-white/20 uppercase">Max Impact</span>
                           <span className="text-[0.65rem] font-black text-white/60">{formatNum(ytData.popularVideo.views)} VIEWS</span>
                         </div>
                         <div className="h-6 w-[1px] bg-white/10" />
                         <div className="flex flex-col">
                           <span className="text-[0.5rem] font-mono text-white/20 uppercase">Deployment</span>
                           <span className="text-[0.65rem] font-black text-white/60">
                             {new Date(ytData.popularVideo.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                           </span>
                         </div>
                       </div>
                     </div>
                  </Link>
                ) : (
                  <div className="h-36 border border-white/5 bg-white/[0.02] rounded-sm flex items-center justify-center animate-pulse">
                     <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/20">Scanning Grid...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contract Operations (Freelance) & Tactical Assignments (Timepass) */}
        <div className="grid gap-12 lg:grid-cols-2 mb-12 items-stretch">
           {/* Freelance Column */}
           <section className="flex flex-col">
              <div className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[var(--cyan)]">
                 <span>// Contract_Ops</span>
                 <span className="h-[1px] flex-1 bg-[var(--cyan)]/10" />
              </div>
              
              <div className="grid gap-6 flex-1">
                {armoryItems.filter(i => i.type === "Freelance").map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex flex-col h-full overflow-hidden rounded-sm border border-[var(--cyan)]/20 bg-[var(--cyan)]/[0.02] p-6 hover:bg-[var(--cyan)]/[0.05] transition-all"
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <p className="font-mono text-[0.5rem] uppercase tracking-widest text-[var(--cyan)]/50 italic mb-1">Contract // Active</p>
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-[var(--cyan)] transition-colors">{item.title}</h3>
                      </div>
                      <span className="text-[0.5rem] font-mono text-[var(--cyan)] border border-[var(--cyan)]/30 px-2 py-0.5 rounded-sm uppercase tracking-widest bg-[var(--cyan)]/10">{item.status}</span>
                    </div>

                    <div className="relative mb-6 flex-1">
                       <p className="text-[0.75rem] leading-relaxed text-white/60 pl-6 border-l border-white/10 line-clamp-3">
                         {item.brief}
                       </p>
                       <div className="absolute -left-[1px] top-0 h-4 w-[2px] bg-[var(--cyan)]" />
                    </div>

                    <div className="mb-6 grid grid-cols-2 gap-4 rounded-sm bg-black/40 p-3 border border-white/5">
                       <div>
                         <p className="font-mono text-[0.45rem] uppercase tracking-widest text-white/20 mb-0.5">Phase</p>
                         <p className="text-[0.55rem] font-black uppercase text-[var(--cyan)] truncate">Initial Dev</p>
                       </div>
                       <div>
                         <p className="font-mono text-[0.45rem] uppercase tracking-widest text-white/20 mb-0.5">Target</p>
                         <p className="text-[0.55rem] font-black uppercase text-white/60 truncate">Local Community</p>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-3">
                        {item.tech.map(t => <span key={t} className="text-[0.5rem] font-black uppercase text-white/30 group-hover:text-white/60 transition-colors tracking-widest">{t}</span>)}
                      </div>
                      <Link 
                        href={item.link || "#"} 
                        target="_blank"
                        className="flex items-center gap-2 text-[0.55rem] font-black uppercase tracking-[0.2em] text-[var(--cyan)] group-hover:gap-3 transition-all"
                      >
                         Secure Link <ExternalLink className="size-2.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
           </section>

           {/* Assignments Column */}
           <section className="flex flex-col">
              <div className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[var(--violet)]">
                 <span>// Tactical_Assignments</span>
                 <span className="h-[1px] flex-1 bg-[var(--violet)]/10" />
              </div>
              
              <div className="grid gap-6 flex-1">
                {armoryItems.filter(i => i.type === "Assignment").map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex flex-col h-full overflow-hidden rounded-sm border border-[var(--violet)]/20 bg-[var(--violet)]/[0.02] p-6 hover:bg-[var(--violet)]/[0.05] transition-all"
                  >
                    {/* Header: Identity */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {item.logo ? (
                          <Link 
                            href={item.companyLink || "#"} 
                            target="_blank"
                            className="h-10 w-32 shrink-0 rounded-sm bg-black border border-white/10 p-2 flex items-center justify-center hover:border-[var(--violet)]/50 transition-all relative group/logo"
                          >
                            <img src={item.logo} alt="Logo" className="h-full w-full object-contain" />
                            <div className="absolute inset-0 bg-[var(--violet)]/5 opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                          </Link>
                        ) : (
                          <div className="h-10 w-10 shrink-0 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                            <Target className="size-5 text-white/10" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="font-mono text-[0.5rem] uppercase tracking-widest text-[var(--violet)]/50 italic">Verified</p>
                            <Shield className="size-2 text-[var(--violet)]/50" />
                          </div>
                          <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-[var(--violet)] transition-colors line-clamp-1">{item.title}</h3>
                        </div>
                      </div>
                      <span className="text-[0.5rem] font-mono text-[var(--violet)] border border-[var(--violet)]/30 px-2 py-0.5 rounded-sm uppercase tracking-widest bg-[var(--violet)]/10">{item.status}</span>
                    </div>

                    {/* Body: Brief */}
                    <div className="relative mb-6 flex-1">
                       <p className="text-[0.75rem] leading-relaxed text-white/50 border-l border-white/10 pl-6 italic line-clamp-3">
                         "{item.brief}"
                       </p>
                       <div className="absolute -left-[1px] top-0 h-4 w-[2px] bg-[var(--violet)]" />
                       
                       {item.timeline && (
                         <div className="mt-4 ml-6 flex items-center gap-2">
                            <Clock className="size-3 text-[var(--violet)]" />
                            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-[var(--violet)]">Deployment Timeline: {item.timeline}</span>
                         </div>
                       )}
                    </div>

                    {/* Footer: Tech & Link */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                      <div className="flex gap-3">
                        {item.tech.map(t => (
                          <span key={t} className="flex items-center gap-1.5 font-mono text-[0.5rem] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">
                            <span className="h-1 w-1 rounded-full bg-[var(--violet)]/50" />
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      {item.link && (
                        <Link 
                          href={item.link} 
                          target="_blank"
                          className="flex items-center gap-2 rounded-sm border border-[var(--violet)]/30 bg-[var(--violet)]/5 px-3 py-1.5 text-[0.55rem] font-black uppercase tracking-[0.1em] text-[var(--violet)] hover:bg-[var(--violet)] hover:text-white transition-all"
                        >
                           Analyze
                           <ExternalLink className="size-2.5" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
           </section>
        </div>

        {/* Marketplace Operations (Business) - Moved to bottom */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[var(--valorant-red)]">
             <span>// Domestic_Market_Operations</span>
             <span className="h-[1px] flex-1 bg-[var(--valorant-red)]/10" />
          </div>
          
          {armoryItems.filter(i => i.type === "Business").map(item => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-sm border border-white/5 bg-gradient-to-br from-[var(--valorant-red)]/20 to-transparent p-8 backdrop-blur-md"
            >
              <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <ShoppingCart className="size-48" />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-[1.5fr_1fr] gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">{item.title}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-white/60">
                    {item.brief}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {item.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-white/5 rounded-sm border border-white/10 font-mono text-[0.65rem] uppercase tracking-widest text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-sm border border-white/10 bg-black/40 p-6">
                  <div className="mb-6 flex items-center justify-between">
                     <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/40 italic">Regional Prep</span>
                     <span className="text-[0.65rem] font-black uppercase italic text-[var(--valorant-red)] animate-pulse">{item.status}</span>
                  </div>
                  <div className="space-y-4">
                     {[
                       { label: "Amazon India Onboarding", status: "In Planning" },
                       { label: "Varanasi Sourcing", status: "Secured" },
                       { label: "Domestic Shipping", status: "Ready" },
                     ].map(step => (
                       <div key={step.label} className="flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-widest">
                         <span className="text-white/40">{step.label}</span>
                         <span className={step.status === "Secured" || step.status === "Ready" ? "text-green-500" : "text-[var(--valorant-red)]"}>
                           {step.status === "Secured" || step.status === "Ready" ? "✓ " : ">> "}{step.status}
                         </span>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </PortfolioShell>
  );
}
