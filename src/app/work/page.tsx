import ChallengeMe from "@/components/ChallengeMe";
import PortfolioShell from "@/components/PortfolioShell";
import ProjectMission from "@/components/ProjectMission";
import ScrollStory from "@/components/ScrollStory";
import { projects } from "@/lib/portfolio";

export const metadata = {
  title: "Work",
  description: "Himanshu's project missions, work narrative, and resume brief.",
};

export default function WorkPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="grid gap-6 lg:grid-cols-[0.9fr_0.45fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-[var(--valorant-red)]">
              Work Route
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-6xl">Mission board</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              Projects are framed as levels so the goal, stack, status, and
              value are easy to scan.
            </p>
          </div>
          <a
            className="theme-button-primary inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold"
            href="#resume"
          >
            Jump to Resume Brief
          </a>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectMission key={project.title} project={project} />
          ))}
        </section>

        <ScrollStory />
        <ChallengeMe />

        <section
          className="theme-panel mt-14 rounded-lg p-5 sm:p-7"
          id="resume"
        >
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-xs uppercase text-[var(--amber)]">
                Resume Brief
              </p>
              <h2 className="mt-3 text-3xl font-black">Why this route works</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Signal", "Projects, stack, and impact are visible without a maze."],
                ["Speed", "Animations stay lightweight and route-scoped."],
                ["Next Step", "Challenge UI and mission cards create natural talking points."],
              ].map(([title, body]) => (
                <article className="rounded-md border border-white/10 bg-white/[0.045] p-4" key={title}>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PortfolioShell>
  );
}
