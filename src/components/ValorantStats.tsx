"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Loader2 } from "lucide-react";

type RankInfo = {
  currenttierpatched: string;
  images: {
    small: string | null;
    large: string | null;
  };
};

type MatchInfo = {
  metadata: {
    map: string;
    game_start_patched: string;
    mode: string;
    rounds_played: number;
  };
  stats: {
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    character: string;
    character_image: string | null;
    result: "Win" | "Loss";
  };
};

type ValorantData = {
  rank: RankInfo;
  matches: MatchInfo[];
  error?: string;
};

export default function ValorantStats() {
  const [data, setData] = useState<ValorantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = "Him69Her";
  const tag = "9530";

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/valorant");
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }
        const jsonData = await res.json();
        if (jsonData.error) {
          throw new Error(jsonData.error);
        }
        setData(jsonData);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-white/10 bg-black/40 rounded-sm">
        <Loader2 className="size-8 animate-spin text-[var(--valorant-red)] mb-4" />
        <p className="font-mono text-xs uppercase tracking-widest text-white/50">Fetching Tactical Data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-[var(--valorant-red)]/30 bg-[var(--valorant-red)]/[0.05] rounded-sm">
        <ShieldAlert className="size-8 text-[var(--valorant-red)] mb-2" />
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--valorant-red)] font-bold">Data Offline</p>
        <p className="text-white/50 text-xs mt-1">{error || "Could not load stats"}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-[var(--valorant-red)]/20 bg-black/60 p-6 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <span className="text-8xl font-black italic tracking-tighter text-[var(--valorant-red)]">VLR</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
        <div className="text-center md:text-left">
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-[var(--valorant-red)] font-black">Tactical Placement</span>
          <h3 className="text-3xl font-black italic uppercase text-white tracking-tight flex items-center gap-2 mt-1">
            {username}<span className="text-[var(--valorant-red)] font-bold">#{tag}</span>
          </h3>
        </div>

        {/* Rank Display */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-4 bg-black/40 px-4 py-3 border border-white/5 rounded-sm shadow-[0_0_15px_rgba(255,70,85,0.05)]"
        >
          {data.rank.images.large && (
            <img src={data.rank.images.large} alt={data.rank.currenttierpatched} className="w-16 h-16 drop-shadow-[0_0_10px_rgba(255,70,85,0.3)] animate-pulse" />
          )}
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-widest text-white/50 mb-0.5">Competitive Tier</p>
            <p className="font-black italic text-white text-xl uppercase tracking-wider text-[var(--valorant-red)]">
              {data.rank.currenttierpatched}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Match History */}
      <div className="relative z-10">
        <h4 className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/50 mb-4">Recent Combat Deployments</h4>
        
        <div className="grid gap-4 md:grid-cols-3">
          {data.matches.map((match, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -3, borderColor: match.stats.result === "Win" ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)" }}
              className={`p-4 rounded-sm border bg-black/80 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                match.stats.result === "Win" 
                  ? "border-green-500/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]" 
                  : "border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]"
              }`}
            >
              {/* Agent Background / Image */}
              {match.stats.character_image && (
                <div className="absolute top-0 right-0 h-full opacity-10 pointer-events-none">
                  <img src={match.stats.character_image} alt={match.stats.character} className="h-full object-cover" />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-white/40">{match.metadata.mode}</span>
                  <span className={`text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                    match.stats.result === "Win" 
                      ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}>
                    {match.stats.result}
                  </span>
                </div>

                <h5 className="text-xl font-black italic text-white truncate mb-1">{match.metadata.map}</h5>
                <p className="font-mono text-[0.55rem] text-white/50">{match.metadata.game_start_patched}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[0.5rem] uppercase text-white/40 mb-0.5">Agent</p>
                  <p className="text-xs font-bold text-white">{match.stats.character}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[0.5rem] uppercase text-white/40 mb-0.5">K / D / A</p>
                  <p className="font-black italic text-sm text-white">
                    {match.stats.kills}<span className="text-white/40 font-normal mx-0.5">/</span>
                    <span className="text-red-400">{match.stats.deaths}</span><span className="text-white/40 font-normal mx-0.5">/</span>
                    {match.stats.assists}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
