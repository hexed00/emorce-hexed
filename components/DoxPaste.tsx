'use client';

import { useState } from 'react';
import { FileText, Copy, Check, Trash2 } from 'lucide-react';

const TEMPLATES = [
  {
    name: 'blank',
    body: `=======================================\nHEXED DOX\n=======================================\n\nTarget: \nAKA: \nAge: \nLocation: \n\n-- Contacts --\nPhone: \nEmail: \nDiscord: \nIG: \nTikTok: \n\n-- Notes --\n\n\n=======================================\nemorce · hexed\n=======================================`,
  },
  {
    name: 'social',
    body: `=======================================\nSOCIAL DOX · HEXED\n=======================================\n\nName: \nHandles:\n  · Discord: \n  · Instagram: \n  · TikTok: \n  · Twitter/X: \n  · Snap: \n\nLinks:\n\n\nNotes:\n\n\n=======================================\ndiscord.gg/emorce\n=======================================`,
  },
];

export default function DoxPaste() {
  const [text, setText] = useState(TEMPLATES[0].body);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const load = (name: string) => {
    const t = TEMPLATES.find((x) => x.name === name);
    if (t) setText(t.body);
  };

  return (
    <div className="space-y-6 fade-up">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hex-blood/50 to-hex-ash flex items-center justify-center">
            <FileText className="w-5 h-5 text-hex-crimson" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Dox Paste</h2>
            <p className="text-xs text-hex-muted font-mono">build · copy · drop in chat</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {TEMPLATES.map((t) => (
            <button key={t.name} onClick={() => load(t.name)} className="site-pill text-xs capitalize">{t.name}</button>
          ))}
          <button onClick={() => setText('')} className="site-pill text-xs flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> clear
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={18}
          className="hex-input w-full rounded-xl p-4 text-sm font-mono leading-relaxed resize-y"
          spellCheck={false}
        />

        <div className="mt-4 flex gap-3">
          <button onClick={copy} className="hex-btn rounded-xl px-5 py-2.5 text-sm font-display font-semibold flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy paste'}
          </button>
        </div>
      </div>
    </div>
  );
}
