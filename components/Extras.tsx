'use client';

import { Sparkles, Link2, Image, Hash, Terminal, Shield } from 'lucide-react';

const extras = [
  {
    title: 'TikTok No-WM',
    desc: 'Direct no-watermark TikTok via Cobalt',
    action: 'Use Cobalt tab \u2192 paste TikTok link',
    icon: Link2,
  },
  {
    title: 'YouTube Audio',
    desc: 'Extract high-quality audio only',
    action: 'Cobalt \u2192 YouTube URL \u2192 audio mode',
    icon: Hash,
  },
  {
    title: 'Twitter / X Media',
    desc: 'Videos + images from any public post',
    action: 'Cobalt or Core Tools',
    icon: Image,
  },
  {
    title: 'Reddit Video',
    desc: 'Download Reddit videos + galleries',
    action: 'Cobalt tab',
    icon: Terminal,
  },
  {
    title: 'Bulk Image \u2192 GIF',
    desc: 'Sequence of frames \u2192 animated GIF',
    action: 'Core Tools \u2192 Image \u2192 GIF',
    icon: Image,
  },
  {
    title: 'Discord Banner',
    desc: 'Grab animated banners + avatars',
    action: 'Core Tools \u2192 Discord Profile',
    icon: Shield,
  },
];

export default function Extras() {
  return (
    <div className="space-y-8">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-900/40 to-hex-ash flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Extras \u271e</h2>
            <p className="text-xs text-hex-muted font-mono">more power \u00b7 same black aura</p>
          </div>
        </div>
        <p className="text-sm text-hex-muted mt-4 leading-relaxed">
          Extra workflows and shortcuts layered on top of Core + Cobalt. Keep everything in one place.
        </p>
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
          <li className="flex gap-2">
            <span className="text-hex-crimson">\u25b8</span>
            All downloaders prefer public content. Private / login-walled media needs your own session.
          </li>
          <li className="flex gap-2">
            <span className="text-hex-crimson">\u25b8</span>
            GIF tools work best with short clips (<15s) for clean file size.
          </li>
          <li className="flex gap-2">
            <span className="text-hex-crimson">\u25b8</span>
            Media vault links rotate \u2014 if a domain dies, we update the list.
          </li>
          <li className="flex gap-2">
            <span className="text-hex-crimson">\u25b8</span>
            Built for emorce. Black theme. No tracking. No accounts.
          </li>
        </ul>
      </div>
    </div>
  );
}
