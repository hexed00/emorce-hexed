'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import Entrance from '@/components/Entrance';

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && sessionStorage.getItem('hexed-entered') === '1') {
      setEntered(true);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('hexed-entered', '1');
    setEntered(true);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-hex-black" />;
  }

  return (
    <>
      {!entered && <Entrance onEnter={handleEnter} />}
      <main
        className={`min-h-screen flex flex-col transition-opacity duration-700 ${
          entered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Header />
        <Tabs />
        <footer className="mt-auto border-t border-hex-smoke/40 py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-hex-muted font-mono">emorce hexed · built for the circle</p>
            <a
              href="https://discord.gg/emorce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-hex-muted/70 font-mono hover:text-[#5865F2] transition-colors"
            >
              discord.gg/emorce
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
