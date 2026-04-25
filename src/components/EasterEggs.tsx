"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const konami = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type SecretEvent = CustomEvent<{ message: string }>;

export default function EasterEggs() {
  const keysRef = useRef<string[]>([]);
  const typedRef = useRef("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const reveal = (nextMessage: string) => {
      setMessage(nextMessage);
      window.setTimeout(() => setMessage(null), 5200);
    };

    const onSecret = (event: Event) => {
      reveal((event as SecretEvent).detail.message);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();

      if (tag === "input" || tag === "textarea" || target?.isContentEditable) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const nextKeys = [...keysRef.current, key].slice(-konami.length);
      keysRef.current = nextKeys;

      if (nextKeys.join("|") === konami.join("|")) {
        reveal("Konami accepted. Recruiter brief is now highlighted in Work.");
        document.getElementById("resume")?.scrollIntoView({ block: "start" });
      }

      if (/^[a-z0-9 ]$/i.test(event.key)) {
        const nextTyped = `${typedRef.current}${event.key.toLowerCase()}`.slice(-24);
        typedRef.current = nextTyped;

        if (nextTyped.includes("hire me") || nextTyped.includes("hireme")) {
          reveal("Command accepted: opening the fastest route to projects.");
          window.location.hash = "resume";
        }
        if (nextTyped.includes("brain")) {
          reveal("Neural route armed. Try the Brain map nodes.");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("portfolio-secret", onSecret);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("portfolio-secret", onSecret);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          aria-live="polite"
          className="fixed bottom-4 left-1/2 z-50 flex w-[min(92vw,520px)] -translate-x-1/2 items-center justify-between gap-4 rounded-md border border-[color:var(--border)] bg-[rgba(7,8,11,0.94)] px-4 py-3 text-sm text-[var(--foreground)] shadow-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
        >
          <span>{message}</span>
          <button
            aria-label="Close secret message"
            className="grid size-8 shrink-0 place-items-center rounded border border-white/10 hover:bg-white/10"
            onClick={() => setMessage(null)}
            type="button"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
