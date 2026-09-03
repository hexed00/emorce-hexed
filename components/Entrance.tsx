'use client';

import { useState } from 'react';

export default function Entrance({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 entrance-bg flex flex-col items-center justify-center transition-opacity duration-700 ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="shadow-orb w-64 h-64 top-1/4 left-1/4" style={{ animationDelay: '0s' }} />
      <div className="shadow-orb w-48 h-48 bottom-1/4 right-1/3" style={{ animationDelay: '2s' }} />
      <div className="shadow-orb w-32 h-32 top-1/3 right-1/4" style={{ animationDelay: '4s' }} />
      <div className="scanline" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full border border-hex-crimson/30 pulse-ring" />
          <div className="absolute inset-[-12px] rounded-full border border-hex-blood/20 pulse-ring" style={{ animationDelay: '0.8s' }} />
          <img
            src="https://i.pinimg.com/736x/42/de/d5/42ded506cb69f48fad09de00cdf3e54f.jpg"
            alt="emorce"
            className="w-24 h-24 rounded-2xl object-cover border border-hex-blood/60 shadow-[0_0_40px_rgba(139,0,0,0.5)]"
          />
        </div>

        <div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight glow-text">
            <span className="text-hex-bone">HEXED</span>
          </h1>
          <p className="mt-3 text-xs font-mono tracking-[0.4em] text-hex-muted uppercase">
            emorce · tools for the demons
          </p>
        </div>

        <button
          onClick={handleEnter}
          className="enter-btn px-12 py-4 text-sm font-display rounded-sm"
        >
          click to enter
        </button>

        <p className="text-[10px] font-mono text-hex-muted/60 tracking-widest">
          discord.gg/emorce
        </p>
      </div>
    </div>
  );
}
