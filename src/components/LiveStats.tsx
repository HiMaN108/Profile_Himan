"use client";

import { useEffect, useState } from "react";
import { Activity, Clock, Radio, Rocket } from "lucide-react";
import { liveStats } from "@/lib/portfolio";

const icons = [Activity, Radio, Rocket, Clock];

export default function LiveStats() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const initial = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
    };
  }, []);

  const syncTime = now
    ? new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now)
    : "Syncing";

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {liveStats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <article className="theme-panel rounded-lg p-5" key={stat.label}>
            <div className="mb-6 flex items-center justify-between">
              <Icon className="size-5 text-[var(--amber)]" aria-hidden="true" />
              <span className="font-mono text-xs text-[var(--muted)]">
                {index === 2 ? syncTime : "Live"}
              </span>
            </div>
            <p className="text-sm font-bold text-[var(--muted)]">{stat.label}</p>
            <h2 className="mt-2 text-2xl font-black">{stat.value}</h2>
            <p className="mt-3 leading-6 text-[var(--muted)]">{stat.detail}</p>
          </article>
        );
      })}
    </section>
  );
}
