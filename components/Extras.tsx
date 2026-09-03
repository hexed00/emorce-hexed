'use client';

import { Sparkles, Hash, Terminal, Shield, User } from 'lucide-react';

const extras = [
  { title: 'Discord deep search', desc: 'ID to avatar, banner, bio, badges', action: 'Core Tools then Discord', icon: User },
  { title: 'YouTube audio only', desc: 'Extract high-quality audio', action: 'Core Tools then YouTube audio only', icon: Hash },
  { title: 'TikTok no watermark', desc: 'Clean TikTok downloads', action: 'Core Tools then TikTok', icon: Terminal },
  { title: 'Discord banner + avatar', desc: 'Full-res animated assets', action: 'Core Tools then Discord Search', icon: Shield },
];

export default function Extras() {
  return (
    <div className="space-y-8 fade-up">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-900/40 to-hex-ash flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Extras</h2>
            <p className="text-xs text-hex-muted font-mono">more power / same black aura</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {extras.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="hex-card rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-hex-ash flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-hex-crimson" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-hex-bone">{item.title}</h3>
                  <p className="text-xs text-hex-muted mt-1">{item.desc}</p>
                  <p className="text-[11px] text-hex-crimson/80 font-mono mt-2">{item.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hex-card rounded-2xl p-6 border-hex-blood/30">
        <h3 className="font-display font-semibold text-hex-bone mb-3">Hexed Notes</h3>
        <ul className="space-y-2 text-sm text-hex-muted">
          <li className="flex gap-2"><span className="text-hex-crimson">*</span> All tools stay on this site except Media Vault.</li>
          <li className="flex gap-2"><span className="text-hex-crimson">*</span> Discord deep search uses public profile sources + CDN.</li>
          <li className="flex gap-2"><span className="text-hex-crimson">*</span> Upload works for Image/MP4 GIF preview.</li>
          <li className="flex gap-2"><span className="text-hex-crimson">*</span> discord.gg/emorce</li>
        </ul>
      </div>
    </div>
  );
}
