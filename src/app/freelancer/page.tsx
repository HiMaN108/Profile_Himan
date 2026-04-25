import PortfolioShell from "@/components/PortfolioShell";

export const metadata = {
  title: "Freelancer",
  description: "Himanshu's freelance services, availability, and client success stories.",
};

export default function FreelancerPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="mb-8 max-w-3xl">
          <p className="font-mono text-xs uppercase text-[var(--purple)]">
            Freelancer Route
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Available for hire</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Full-stack development, system design, and interactive web experiences.
            Let's build something impactful together.
          </p>
        </section>

        <section className="theme-panel rounded-lg p-5 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black">Services</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Full-stack web applications (Next.js, React, Node.js)",
                  "API design and backend architecture",
                  "Interactive UI/UX with animations",
                  "System design and scalability consulting",
                  "Code reviews and technical mentoring",
                ].map((service) => (
                  <li key={service} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 rounded-full bg-[var(--purple)]" />
                    <span className="text-sm text-[var(--muted)]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black">Availability</h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                  <p className="font-mono text-xs text-[var(--green)]">Status</p>
                  <p className="mt-1 font-bold">Open to new projects</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Available for part-time and full-time engagements
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                  <p className="font-mono text-xs text-[var(--purple)]">Response time</p>
                  <p className="mt-1 font-bold">Within 24 hours</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Quick turnaround on initial consultations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-black">Client Success Stories</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Coming soon - Real projects, real impact, real results.
          </p>
        </section>
      </main>
    </PortfolioShell>
  );
}
