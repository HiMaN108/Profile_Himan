import PortfolioShell from "@/components/PortfolioShell";

export const metadata = {
  title: "Connect",
  description: "Connect with Himanshu for collaboration, networking, or just a chat.",
};

export default function ConnectionPage() {
  return (
    <PortfolioShell>
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <section className="mb-8 max-w-3xl">
          <p className="font-mono text-xs uppercase text-[var(--pink)]">
            Connection Route
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Let's connect</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Whether you're a recruiter, fellow developer, or just want to chat about tech,
            I'm always open to meaningful conversations.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              platform: "Email",
              handle: "himanshu@example.com",
              accent: "var(--pink)",
              description: "For inquiries, collaborations, or just to say hi",
            },
            {
              platform: "LinkedIn",
              handle: "/in/himanshu",
              accent: "var(--cyan)",
              description: "Professional network and career updates",
            },
            {
              platform: "GitHub",
              handle: "@himanshu",
              accent: "var(--white)",
              description: "Open source contributions and project code",
            },
            {
              platform: "Twitter/X",
              handle: "@himanshu_dev",
              accent: "var(--valorant-red)",
              description: "Tech thoughts, learning updates, and discussions",
            },
            {
              platform: "YouTube",
              handle: "Himanshu Dev",
              accent: "var(--amber)",
              description: "Tutorial content and build logs",
            },
            {
              platform: "Discord",
              handle: "Join the community",
              accent: "var(--purple)",
              description: "Real-time chat with fellow developers",
            },
          ].map((social) => (
            <a
              key={social.platform}
              className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-0.5 hover:bg-white/[0.075]"
              href="#"
              style={{ borderColor: `${social.accent}33` }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-black">{social.platform}</h3>
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: social.accent }}
                />
              </div>
              <p className="font-mono text-sm text-[var(--foreground)]">
                {social.handle}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{social.description}</p>
            </a>
          ))}
        </section>

        <section className="theme-panel mt-10 rounded-lg p-5 sm:p-7">
          <h2 className="text-2xl font-black">Quick message</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Drop a message and I'll get back to you within 24 hours.
          </p>
          <form className="mt-4 grid gap-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-sm placeholder:text-[var(--muted)] focus:border-[var(--pink)] focus:outline-none"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full rounded-md border border-white/10 bg-white/[0.045] px-4 py-3 text-sm placeholder:text-[var(--muted)] focus:border-[var(--pink)] focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="theme-button inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-bold"
              style={{ backgroundColor: "var(--pink)" }}
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    </PortfolioShell>
  );
}
