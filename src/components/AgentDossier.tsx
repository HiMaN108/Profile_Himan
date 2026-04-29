"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import runBallData from "../../public/images/run_ball.json";

export default function AgentDossier() {
  return (
    <section
      className="theme-panel relative mt-20 overflow-hidden rounded-lg border border-white/5 bg-black/40 p-8 sm:p-14 backdrop-blur-md"
      id="resume"
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--valorant-red)]/5 blur-[100px]" />
      
      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr_0.8fr]">
        {/* Column 1: Agent Identity */}
        <div className="flex flex-col gap-10">
           <div>
              <div className="flex items-center gap-3 font-mono text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[var(--valorant-red)]">
                <span className="h-[1px] w-5 bg-[var(--valorant-red)]" />
                <span>Identity // Dossier</span>
              </div>
              <h2 className="mt-5 text-4xl font-black italic uppercase tracking-tighter sm:text-6xl">Agent <span className="text-white/20 select-none">Identity</span></h2>
              <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
                Specialist in building immersive, high-performance web applications. 
                Merging technical precision with tactical design to create 
                products that don't just function—they <span className="text-white font-bold italic uppercase tracking-wide">Dominate</span>.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-10">
              {[
                { label: "Deployment", value: "2+ Years" },
                { label: "Operations", value: "15+ Shipped" },
                { label: "Success Rate", value: "98.9%" },
                { label: "Status", value: "Active" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--muted)]">{stat.label}</p>
                  <p className="mt-1 text-2xl font-black uppercase text-white">{stat.value}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Column 2: Tactical Loadout (Skills) */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-white/40">
            <span>// Tactical_Loadout</span>
            <span className="h-[1px] flex-1 bg-white/5" />
          </div>
          
          <div className="space-y-10">
            {[
              { 
                cat: "Primary Weaponry", 
                skills: ["Next.js", "React", "TypeScript", "C++", "Javascript"],
                color: "var(--valorant-red)"
              },
              { 
                cat: "Support Systems", 
                skills: ["Node.js", "PostgreSQL", "Laravel", "Nest.js", "Flutter"],
                color: "var(--cyan)"
              },
              { 
                cat: "Specialist Gear", 
                skills: ["Framer Motion", "Three.js", "Lottie", "Figma"],
                color: "var(--amber)"
              },
            ].map((loadout) => (
              <div key={loadout.cat} className="group">
                <div className="mb-4 flex items-center gap-3">
                   <span className="h-1 w-1" style={{ backgroundColor: loadout.color }} />
                   <p className="font-mono text-[0.7rem] font-black uppercase tracking-widest" style={{ color: loadout.color }}>{loadout.cat}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {loadout.skills.map((skill) => (
                    <span key={skill} className="rounded-sm border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.75rem] font-bold uppercase tracking-wider text-white/60 transition-all hover:scale-105 hover:border-white/30 hover:bg-white/[0.08] hover:text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Intel Access */}
        <div className="relative flex flex-col gap-8 rounded-sm border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8 lg:justify-between">
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.4em] text-white/40">
               <span className="animate-pulse">●</span>
               <span>Intel_Access</span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Access the full structural breakdown. Download the tactical intelligence dossier in PDF format.
            </p>
          </div>

          {/* Run Ball Icon (Natural Flex Position) */}
          <div className="relative mx-auto h-36 w-36 flex items-center justify-center pointer-events-none z-10">
            <Lottie animationData={runBallData} loop autoplay />
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            <a 
              href="/images/HimanshuResume.pdf" 
              download="Himanshu_Maurya_Resume.pdf" 
              className="group relative flex h-16 items-center justify-center gap-3 overflow-hidden rounded-sm bg-white transition-all hover:scale-[1.02] active:scale-95 z-10"
            >
              <span className="relative z-10 text-[0.7rem] font-black uppercase tracking-[0.3em] text-black">Download Resume</span>
              <div className="absolute inset-0 -translate-x-full bg-[var(--valorant-red)] transition-transform group-hover:translate-x-0" />
              <span className="relative z-10 text-black group-hover:text-white transition-colors text-lg">↓</span>
            </a>
            
            <div className="grid grid-cols-2 gap-3">
               <a 
                 href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"} 
                 target="_blank" 
                 className="flex h-14 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-[0.65rem] font-bold uppercase tracking-widest text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
               >
                 LinkedIn
               </a>
               <a 
                 href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"} 
                 target="_blank" 
                 className="flex h-14 items-center justify-center rounded-sm border border-white/10 bg-white/5 text-[0.65rem] font-bold uppercase tracking-widest text-white/60 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
               >
                 GitHub
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
