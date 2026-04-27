"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyBeats } from "@/lib/portfolio";
import Lottie from "lottie-react";

function RocketLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/images/rocket_boy.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading rocket_boy.json", err));
  }, []);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} />;
}

export default function ScrollStory() {
  // Start the rocket at the first card by default
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section className="mx-auto mt-20 max-w-5xl px-4 sm:px-6">
      <div className="mb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--valorant-red)]">
          // Storyline
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Career Lore <span className="text-[var(--muted)]">// The Archives</span>
        </h2>
      </div>

      <div className="relative">
        {/* The Zipline SVG Track (Desktop Only) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <svg
            className="h-full w-full opacity-60"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Draws a smooth S-curve connecting the centers of the 4 grid areas */}
            <path
              d="M 25 20 C 50 -5, 50 -5, 75 20 C 110 50, -10 50, 25 80 C 50 105, 50 105, 75 80"
              fill="none"
              stroke="var(--valorant-red)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="4 8"
              strokeLinecap="round"
              filter="url(#neon-glow)"
            />
          </svg>
        </div>

        {/* Mobile vertical line */}
        <div className="absolute bottom-8 left-4 top-8 z-0 hidden w-px bg-[var(--valorant-red)]/50 shadow-[0_0_10px_rgba(255,70,85,0.8)] sm:block md:hidden" />

        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {storyBeats.map((beat, index) => (
            <motion.article
              key={beat.title}
              onPointerEnter={() => setHoveredIndex(index)}
              className="group relative flex flex-col justify-between overflow-visible rounded-xl border border-white/5 bg-[#0a0a0a]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ amount: 0.4, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {/* Zipline Rocket Character */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="zipline-rocket"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    // Anticipation easing makes the travel feel heavier and more realistic
                    transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.85 }}
                    className="pointer-events-none absolute -right-6 -top-10 z-20 h-28 w-28 drop-shadow-[0_0_25px_rgba(255,70,85,0.7)] md:-right-8 md:-top-12 md:h-32 md:w-32"
                  >
                    {/* Realistic float animation: lands from high up, then floats infinitely */}
                    <motion.div
                      key={hoveredIndex}
                      initial={{ y: -60, rotate: -20 }}
                      animate={{ 
                        y: [0, -8, 0], 
                        rotate: [0, 4, -4, 0] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        times: [0, 0.5, 1]
                      }}
                      className="h-full w-full"
                    >
                      <RocketLottie />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[rgba(255,70,85,0.15)] font-mono text-sm font-bold text-[var(--valorant-red)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                    {beat.kicker}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white sm:text-2xl">
                  {beat.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  {beat.body}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-br-xl border-b-2 border-r-2 border-[var(--valorant-red)]/50 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
