"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

type Result = {
  title: string;
  body: string;
};

export default function ChallengeMe() {
  const [idea, setIdea] = useState("");
  const [email, setEmail] = useState("");
  const [difficulty, setDifficulty] = useState("mid");
  const [loading, setLoading] = useState(false);
  const [transmitted, setTransmitted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showMeeting, setShowMeeting] = useState(false);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-4), msg]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!idea.trim() || !email.trim()) return;

    setLoading(true);
    setLogs([]);
    
    const logSequence = [
      "Securing communication channel...",
      "Encrypting mission payload...",
      "Bypassing firewalls...",
      "Transmitting to command center...",
    ];

    for (const log of logSequence) {
      addLog(log);
      await new Promise((r) => setTimeout(r, 600));
    }

    try {
      const res = await fetch("/api/challenge", {
        method: "POST",
        body: JSON.stringify({ idea, email, difficulty }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        addLog("TRANSMISSION SUCCESSFUL.");
        // Clear fields on success
        setIdea("");
        setEmail("");
        setTimeout(() => setTransmitted(true), 800);
      } else {
        addLog("SIGNAL LOST. RETRY UPLINK.");
      }
    } catch (err) {
      addLog("CRITICAL ERROR: UPLINK FAILED.");
    } finally {
      setLoading(false);
    }
  };

  if (transmitted) {
    return (
      <section className="theme-panel mt-14 rounded-lg border border-[var(--green)]/30 bg-black/60 p-5 sm:p-7 backdrop-blur-md text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 rounded-full border-2 border-[var(--green)] flex items-center justify-center text-[var(--green)] animate-pulse">
            <Send className="size-8" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter sm:text-5xl">Mission <span className="text-[var(--green)]">Logged</span></h2>
          <p className="max-w-md text-[var(--muted)]">
            Intel has been received. I will analyze the challenge and respond via email. 
            Check your inbox for the <strong>Acceptance Status</strong> soon.
          </p>
          <button 
            onClick={() => setTransmitted(false)}
            className="mt-4 px-6 py-2 border border-white/10 rounded-sm font-mono text-xs uppercase hover:bg-white/5 transition-colors"
          >
            [ Back to Command ]
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="theme-panel mt-14 rounded-lg border border-white/5 bg-black/40 p-5 sm:p-7 backdrop-blur-sm">
      {/* Header with Switcher */}
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-white/10 pb-8">
        <div className="relative">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-[var(--valorant-red)]">
            <span className="h-1 w-1 bg-[var(--valorant-red)]" />
            <span>Tactical Operations</span>
          </div>
          <h2 className="mt-3 text-4xl font-black uppercase italic tracking-tighter sm:text-6xl italic">
            Choose Your <span className="text-white/20">Route</span>
          </h2>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setShowMeeting(false)}
            className={`px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-all rounded-sm border ${!showMeeting ? "bg-[var(--valorant-red)]/20 border-[var(--valorant-red)] text-white" : "border-white/10 text-white/40 hover:text-white"}`}
          >
            [ Transmit Brief ]
          </button>
          <button 
            onClick={() => setShowMeeting(true)}
            className={`px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-all rounded-sm border ${showMeeting ? "bg-[var(--cyan)]/20 border-[var(--cyan)] text-white" : "border-white/10 text-white/40 hover:text-white"}`}
          >
            [ Book Briefing ]
          </button>
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative">
          <h3 className="text-2xl font-black uppercase italic tracking-tight">
            {showMeeting ? "Direct Tactical Briefing" : "Submit Mission Intel"}
          </h3>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            {showMeeting 
              ? "Skip the brief and schedule a direct 1-on-1 strategy session to discuss potential operations and technical scaling."
              : "Drop a specific bug, system design prompt, or product idea. I'll decrypt it and reply with a strategic execution plan."}
          </p>

          {!showMeeting && logs.length > 0 && (
            <div className="mt-8 flex flex-col gap-1.5 font-mono text-[0.65rem] uppercase text-[var(--valorant-red)]">
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
                  <span className="opacity-50">[{new Date().toLocaleTimeString()}]</span>
                  <span className="font-bold">{log}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {showMeeting ? (
          <div className="overflow-hidden rounded-md border border-white/10 bg-black/40 shadow-2xl h-[500px]">
             <iframe
               src="https://cal.com/150-himanshu-maurya-mjk6jx/tactical-briefing?embed=true"
               className="w-full h-full"
               frameBorder="0"
               allowFullScreen
             />
          </div>
        ) : (
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">// Visitor ID (Email)</span>
                <input
                  type="email"
                  required
                  className="min-h-11 rounded-sm border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[var(--valorant-red)]/50 focus:bg-white/[0.02]"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="commander@enterprise.com"
                  value={email}
                />
              </label>
              <label className="grid gap-2">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">// Operational Level</span>
                <select
                  className="min-h-11 rounded-sm border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-[var(--valorant-red)]/50 focus:bg-white/[0.02]"
                  onChange={(event) => setDifficulty(event.target.value)}
                  value={difficulty}
                >
                  <option value="fast">Silver Tier (Prototype)</option>
                  <option value="mid">Diamond Tier (Production)</option>
                  <option value="hard">Radiant Tier (Boss Level)</option>
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">// Mission Brief</span>
              <textarea
                required
                className="min-h-40 rounded-sm border border-white/10 bg-black/40 p-4 text-sm text-white outline-none transition placeholder:text-white/10 focus:border-[var(--valorant-red)]/50 focus:bg-white/[0.02]"
                onChange={(event) => setIdea(event.target.value)}
                placeholder="Build me a real-time leaderboard, debug a slow API..."
                value={idea}
              />
            </label>

            <button
              className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-sm border border-[var(--valorant-red)]/30 bg-[var(--valorant-red)]/10 font-black uppercase tracking-[0.2em] transition-all hover:bg-[var(--valorant-red)]/20 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-[var(--valorant-red)] transition-transform -translate-x-full group-hover:translate-x-0" />
              {loading ? <Sparkles className="size-4 animate-pulse" /> : <Send className="size-4" />}
              {loading ? "Transmitting..." : "Transmit Mission"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
