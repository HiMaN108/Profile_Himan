"use client";

import { useState, useEffect } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import Lottie from "lottie-react";
import horseLottie from "../../public/lottie/horse.json";

type ChessData = {
  username: string;
  avatar: string;
  ratings: {
    rapid: number | null;
    blitz: number | null;
    bullet: number | null;
  };
  error?: string;
};

export default function ChessStats() {
  const [data, setData] = useState<ChessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChessData() {
      try {
        setLoading(true);
        const res = await fetch("/api/chess");
        if (!res.ok) throw new Error("Failed to load chess stats");
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchChessData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-white/10 bg-black/60 rounded-sm">
        <Loader2 className="size-6 animate-spin text-[var(--cyan)] mb-2" />
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-white/50">Pulling Chess Stats...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 bg-black/60 rounded-sm">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-red-400 font-bold">Chess Data Offline</p>
        <p className="text-white/40 text-[0.65rem] mt-1">{error || "Connection error"}</p>
      </div>
    );
  }

  return (
    <div className="group rounded-sm border border-[var(--cyan)]/30 bg-black/80 p-6 relative overflow-hidden flex flex-col justify-between hover:bg-[var(--cyan)]/[0.02] hover:border-[var(--cyan)]/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300">
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Chess Horse Lottie Animation in Corner */}
      <div className="absolute -top-1 right-4 w-28 h-28 pointer-events-none group-hover:scale-110  transition-all duration-500">
        <Lottie animationData={horseLottie} loop={true} />
      </div>

      <div className="relative z-10">
        {/* Header with Avatar and Username */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-sm border-2 border-[var(--cyan)]/50 overflow-hidden group-hover:scale-105 transition-transform duration-300 bg-black">
            <img src={data.avatar} alt={data.username} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded-sm bg-[var(--cyan)]/20 text-[var(--cyan)] font-mono text-[0.5rem] uppercase font-black tracking-widest">Mastery</span>
              <span className="font-mono text-[0.6rem] text-white/40 tracking-wider">Chess.com</span>
            </div>
            <h3 className="text-xl font-black italic uppercase text-white tracking-tight mt-0.5">{data.username}</h3>
          </div>
        </div>

        {/* Ratings Display */}
        <div className="grid gap-3 mb-6">
          {/* Rapid */}
          <div className="flex items-center justify-between p-3 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg" title="Rapid">♟</span>
              <span className="font-mono text-xs text-white/70 font-bold">Rapid</span>
            </div>
            <span className="font-black italic text-md text-[var(--cyan)]">
              {data.ratings.rapid !== null ? data.ratings.rapid : "---"}
            </span>
          </div>

          {/* Blitz */}
          <div className="flex items-center justify-between p-3 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg" title="Blitz">⚡</span>
              <span className="font-mono text-xs text-white/70 font-bold">Blitz</span>
            </div>
            <span className="font-black italic text-md text-[var(--cyan)]">
              {data.ratings.blitz !== null ? data.ratings.blitz : "---"}
            </span>
          </div>

          {/* Bullet */}
          <div className="flex items-center justify-between p-3 rounded-sm bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-lg" title="Bullet">🔫</span>
              <span className="font-mono text-xs text-white/70 font-bold">Bullet</span>
            </div>
            <span className="font-black italic text-md text-[var(--cyan)]">
              {data.ratings.bullet !== null ? data.ratings.bullet : "---"}
            </span>
          </div>
        </div>
      </div>

      {/* Play with me button */}
      <a
        href={`https://www.chess.com/member/${data.username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 w-full flex items-center justify-center gap-2 bg-[var(--cyan)]/10 border border-[var(--cyan)]/50 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[var(--cyan)] hover:text-black transition-all text-[var(--cyan)] shadow-[0_2px_10px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
      >
        Play With Me <ExternalLink className="size-3" />
      </a>
    </div>
  );
}
