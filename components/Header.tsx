'use client';

import { Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-hex-smoke/60 bg-hex-darker/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-hex-blood/50 shadow-[0_0_18px_rgba(139,0,0,0.45)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.pinimg.com/736x/42/de/d5/42ded506cb69f48fad09de00cdf3e54f.jpg"
              alt="emorce"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight">
              <span className="text-hex-bone">emorce</span>{' '}
              <span className="text-hex-crimson glow-text">✦ hexed</span>
            </h1>
            <p className="text-[10px] text-hex-muted font-mono tracking-[0.2em] uppercase">
              tools · vault · demons
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-hex-muted">
          <Zap className="w-3.5 h-3.5 text-hex-crimson animate-pulse" />
          <span>online</span>
        </div>
      </div>
    </header>
  );
}
