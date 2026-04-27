import PortfolioShell from "@/components/PortfolioShell";
import CharacterStatsClient from "@/components/CharacterStatsClient";
import { BrainCircuit, Radio, Sparkles } from "lucide-react";

export const metadata = {
  title: "Neural Loadout",
  description:
    "A 3D RPG-style brain section showing Himanshu's skills, experience, systems work, and personality loops.",
};

export default function BrainPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--cyan)]">
              <span className="h-1 w-1 bg-[var(--cyan)]" />
              <span>Protocol // Neural_Loadout</span>
              <span className="h-[1px] flex-1 bg-[var(--cyan)]/20 max-w-[100px]" />
            </div>
            
            <h1 className="mt-4 text-5xl font-black italic uppercase tracking-tighter sm:text-7xl">
              Character <span className="text-white/20 select-none">Stats</span>
            </h1>

            <div className="group mt-6 flex max-w-3xl items-start gap-5 border-l-2 border-[var(--cyan)]/30 bg-gradient-to-r from-[var(--cyan)]/5 to-transparent py-2 pl-6">
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                A live tactical breakdown of <span className="text-white font-bold italic uppercase tracking-wide">Himanshu's</span> cognitive stack. 
                From scalable systems to real-time reflexes, this is the neural loadout used to build 
                the next generation of immersive interfaces.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {[
              { label: "Signal", value: "Full Stack", icon: BrainCircuit },
              { label: "Pulse", value: "Real-time", icon: Radio },
              { label: "Style", value: "Tactical", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="flex min-h-[70px] items-center gap-4 rounded-sm border border-white/10 bg-white/[0.03] px-6 transition-all hover:bg-white/[0.06] hover:border-white/20"
                  key={item.label}
                >
                  <Icon className="size-5 text-[var(--cyan)]" aria-hidden="true" />
                  <span>
                    <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
                      {item.label}
                    </span>
                    <span className="block text-base font-black uppercase italic tracking-wider">{item.value}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        <CharacterStatsClient />
      </main>
    </PortfolioShell>
  );
}
