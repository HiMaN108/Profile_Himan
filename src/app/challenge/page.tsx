import PortfolioShell from "@/components/PortfolioShell";

export const metadata = {
  title: "Challenge",
  description: "Test your skills with interactive puzzles and easter eggs.",
};

export default function ChallengePage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="mb-8 max-w-3xl">
          <p className="font-mono text-xs uppercase text-[var(--orange)]">
            Challenge Mode
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Test your skills
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Interactive puzzles, easter eggs, and hidden unlocks. Prove your
            engineering instincts and discover hidden features.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Code Puzzle #1",
              difficulty: "Easy",
              description: "Find the bug in this React component and fix it",
              status: "Available",
              accent: "var(--green)",
            },
            {
              title: "System Design Challenge",
              difficulty: "Medium",
              description: "Design a scalable URL shortener service",
              status: "Coming Soon",
              accent: "var(--amber)",
            },
            {
              title: "Algorithm Race",
              difficulty: "Hard",
              description: "Optimize this O(n²) solution to O(n log n)",
              status: "Locked",
              accent: "var(--valorant-red)",
            },
            {
              title: "Quick Experiments",
              difficulty: "Play",
              description:
                "Fast prototypes, UI experiments, and fun side projects",
              status: "Available",
              accent: "var(--cyan)",
            },
            {
              title: "Easter Egg Hunt",
              difficulty: "Special",
              description:
                "Find all hidden keyboard shortcuts across the portfolio",
              status: "Always Available",
              accent: "var(--purple)",
            },
          ].map((challenge) => (
            <div
              key={challenge.title}
              className="theme-panel rounded-lg p-5 sm:p-6"
              style={{ borderColor: `${challenge.accent}33` }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-black">{challenge.title}</h3>
                <span
                  className="rounded-full px-2 py-1 font-mono text-xs"
                  style={{
                    backgroundColor: `${challenge.accent}22`,
                    color: challenge.accent,
                  }}
                >
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)]">
                {challenge.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className="font-mono text-xs"
                  style={{ color: challenge.accent }}
                >
                  {challenge.status}
                </span>
                {challenge.status === "Available" ||
                challenge.status === "Always Available" ? (
                  <button className="theme-button rounded-md px-4 py-2 text-xs font-bold">
                    Start Challenge
                  </button>
                ) : (
                  <button
                    className="rounded-md border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-bold text-[var(--muted)]"
                    disabled
                  >
                    {challenge.status === "Coming Soon"
                      ? "Notify Me"
                      : "Locked"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        <section className="theme-panel mt-10 rounded-lg p-5 sm:p-7">
          <h2 className="text-2xl font-black">Leaderboard</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Top performers who conquered the challenges
          </p>
          <div className="mt-4 space-y-2">
            {[
              {
                rank: 1,
                name: "Anonymous Solver",
                score: "950 pts",
                time: "2m 34s",
              },
              { rank: 2, name: "CodeMaster", score: "890 pts", time: "3m 12s" },
              { rank: 3, name: "TechNinja", score: "845 pts", time: "4m 01s" },
            ].map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.045] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-[var(--orange)]">
                    #{entry.rank}
                  </span>
                  <span className="font-bold">{entry.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                  <span>{entry.score}</span>
                  <span className="font-mono">{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PortfolioShell>
  );
}
