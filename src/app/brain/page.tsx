import PortfolioShell from "@/components/PortfolioShell";
import CharacterStatsClient from "@/components/CharacterStatsClient";

export const metadata = {
  title: "Character Stats",
  description:
    "RPG-style character sheet showing Himanshu's multi-domain skills.",
};

export default function BrainPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="mb-8 max-w-3xl">
          <p className="font-mono text-xs uppercase text-[var(--cyan)]">
            Character Sheet
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Level 26 Human
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Multi-domain skill tree. Code by logic, play by instinct, build by
            discipline.
          </p>
        </section>
        <CharacterStatsClient />
      </main>
    </PortfolioShell>
  );
}
