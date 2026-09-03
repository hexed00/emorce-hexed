'use client';

import { useState } from 'react';
import { Download, Layers, Film, Sparkles, FileText, Image as ImageIcon } from 'lucide-react';
import CoreTools from './CoreTools';
import CobaltSection from './CobaltSection';
import MediaVault from './MediaVault';
import Extras from './Extras';
import GifTools from './GifTools';
import DoxPaste from './DoxPaste';

const tabs = [
  { id: 'core', label: 'Core Tools', icon: Download },
  { id: 'cobalt', label: 'Cobalt', icon: Layers },
  { id: 'gif', label: 'GIF', icon: ImageIcon },
  { id: 'dox', label: 'Dox Paste', icon: FileText },
  { id: 'media', label: 'Media Vault', icon: Film },
  { id: 'extras', label: 'Extras', icon: Sparkles },
];

export default function Tabs() {
  const [active, setActive] = useState('core');

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap gap-1 mb-8 border-b border-hex-smoke/50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                isActive ? 'text-hex-crimson tab-active' : 'text-hex-muted hover:text-hex-bone'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-display tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="min-h-[60vh]">
        {active === 'core' && <CoreTools />}
        {active === 'cobalt' && <CobaltSection />}
        {active === 'gif' && <GifTools />}
        {active === 'dox' && <DoxPaste />}
        {active === 'media' && <MediaVault />}
        {active === 'extras' && <Extras />}
      </div>
    </div>
  );
}
