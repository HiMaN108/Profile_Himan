"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Disc3, Radio, Music4 } from "lucide-react";

type SpotifyStatus = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function SpotifyNowPlaying() {
  const [status, setStatus] = useState<SpotifyStatus>({ isPlaying: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Failed to fetch Spotify status", error);
        setStatus({ isPlaying: false });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = window.setInterval(fetchStatus, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 rounded-md border border-[rgba(69,245,161,0.22)] bg-[rgba(69,245,161,0.06)] p-3 sm:p-4">
      <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-mono uppercase tracking-[0.28em] text-[var(--green)]">
        <Radio className="size-3" aria-hidden="true" />
        <span>&gt; now_playing.exe</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Disc3 className="size-4 animate-spin" aria-hidden="true" />
          <span>Initializing audio feed...</span>
        </div>
      ) : status.isPlaying && status.title ? (
        <div className="flex items-start gap-3">
          {status.albumImageUrl ? (
            <img
              src={status.albumImageUrl}
              alt={`${status.title} album art`}
              className="h-14 w-14 shrink-0 rounded-sm border border-white/10 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-white/10 bg-black/40">
              <Music4
                className="size-5 text-[var(--green)]"
                aria-hidden="true"
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.24em] text-[var(--green)]">
              Live stream
            </p>
            <Link
              href={status.songUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block truncate text-sm font-black text-[var(--foreground)] transition hover:text-[var(--cyan)]"
            >
              {status.title}
            </Link>
            <p className="truncate text-sm text-[var(--muted)]">
              {status.artist}
            </p>
            {status.album ? (
              <p className="mt-1 truncate text-[0.7rem] text-[var(--muted)]">
                {status.album}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="text-sm text-[var(--muted)]">
          Not listening to anything right now.
        </div>
      )}
    </div>
  );
}
