import AgentDossier from "@/components/AgentDossier";
import ChallengeMe from "@/components/ChallengeMe";
import MissionLogClient from "@/components/MissionLogClient";
import PortfolioShell from "@/components/PortfolioShell";
import ScrollStory from "@/components/ScrollStory";

export const metadata = {
  title: "Work",
  description: "Himanshu's project missions, work narrative, and resume brief.",
};

export default function WorkPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative">
            <div className="flex items-center gap-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.3em] text-[var(--valorant-red)]">
              <span className="h-1 w-1 bg-[var(--valorant-red)]" />
              <span>Protocol // Work_Route</span>
              <span className="h-[1px] flex-1 bg-[var(--valorant-red)]/20 max-w-[100px]" />
            </div>
            
            <h1 className="mt-4 text-5xl font-black italic uppercase tracking-tighter sm:text-7xl">
              Mission <span className="text-white/20 select-none">Board</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
              Every project is an operation. Select a mission from the roster to
              read the full intel — videos, documents, side objectives, and
              deployment links.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              className="group relative flex h-12 items-center justify-center gap-3 overflow-hidden rounded-sm border border-[var(--valorant-red)]/30 bg-[var(--valorant-red)]/10 px-6 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:bg-[var(--valorant-red)]/20"
              href="#resume"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[var(--valorant-red)] transition-transform -translate-x-full group-hover:translate-x-0" />
              <span>Access Resume Brief</span>
              <span className="text-[var(--valorant-red)]">»</span>
            </a>
          </div>
        </section>

        {/* Split-Screen Intel Terminal */}
        <MissionLogClient />

        <ScrollStory />
        <ChallengeMe />

        <AgentDossier />
      </main>
    </PortfolioShell>
  );
}
