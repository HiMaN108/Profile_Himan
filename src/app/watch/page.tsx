import LiveStats from "@/components/LiveStats";
import PortfolioShell from "@/components/PortfolioShell";

export const metadata = {
  title: "Watch",
  description: "Live-style stats for Himanshu's creator work and learning status.",
};

export default function WatchPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--amber)]">
              Watch Route
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-6xl">Live desk</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              Mocked live data keeps the section API-ready while avoiding slow
              third-party calls on first load.
            </p>
          </div>
          <div className="rounded-md border border-[rgba(255,209,102,0.35)] bg-[rgba(255,209,102,0.08)] p-4">
            <p className="font-mono text-xs text-[var(--amber)]">DATA SOURCE</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Local snapshot now. YouTube API and deployment webhooks can plug in later.
            </p>
          </div>
        </section>
        <LiveStats />
      </main>
    </PortfolioShell>
  );
}
