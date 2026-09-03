'use client';

import { useState } from 'react';
import { Layers, Loader2, Download, Check, Link2 } from 'lucide-react';

const services = [
  'YouTube', 'TikTok', 'Twitter / X', 'Instagram', 'Reddit', 'SoundCloud',
  'Vimeo', 'Tumblr', 'Facebook', 'Twitch', 'Pinterest', 'Bluesky',
  'Bilibili', 'Streamable', 'VK', 'Xiaohongshu',
];

export default function CobaltSection() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<'auto' | 'audio'>('auto');

  const run = async () => {
    if (!url.trim()) return;
    setStatus('loading');
    setMessage('');
    setDownloadUrl(null);
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), tool: 'cobalt', mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setDownloadUrl(data.downloadUrl || null);
      setMessage(data.message || (data.downloadUrl ? 'Ready' : 'No file returned'));
      setStatus(data.downloadUrl ? 'done' : 'error');
    } catch (e: any) {
      setMessage(e.message || 'Error');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 fade-up">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-900/40 to-hex-ash flex items-center justify-center">
            <Layers className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Cobalt</h2>
            <p className="text-xs text-hex-muted font-mono">integrated · no watermark · stays on this site</p>
          </div>
        </div>

        <p className="text-sm text-hex-muted mt-4 mb-6 leading-relaxed">
          Paste any supported link. Download happens here — nothing opens externally.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hex-muted" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && run()}
              placeholder="YouTube, TikTok, X, Reddit, SoundCloud..."
              className="hex-input w-full rounded-xl pl-10 pr-4 py-3.5 text-sm font-mono"
            />
          </div>
          <button
            onClick={run}
            disabled={status === 'loading' || !url.trim()}
            className="hex-btn rounded-xl px-6 py-3.5 font-display font-semibold text-sm flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Working...</> : <><Download className="w-4 h-4" /> Download</>}
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-mono text-hex-muted cursor-pointer mb-4">
          <input type="checkbox" checked={mode === 'audio'} onChange={(e) => setMode(e.target.checked ? 'audio' : 'auto')} className="accent-hex-crimson" />
          audio only
        </label>

        {status !== 'idle' && (
          <div className={`rounded-xl p-4 border ${
            status === 'done' ? 'border-green-900/50 bg-green-950/20' :
            status === 'error' ? 'border-hex-blood/50 bg-red-950/20' : 'border-hex-smoke bg-hex-ash/50'
          }`}>
            <div className="flex items-start gap-3">
              {status === 'done' && <Check className="w-5 h-5 text-green-400 shrink-0" />}
              <div>
                <p className="text-sm text-hex-bone">{message}</p>
                {downloadUrl && (
                  <a href={downloadUrl} download className="mt-2 inline-flex items-center gap-2 text-sm text-hex-crimson hover:text-white">
                    <Download className="w-4 h-4" /> Get file
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-semibold text-hex-bone">Supported</h3>
          <div className="section-line flex-1" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {services.map((s) => (
            <div key={s} className="hex-card rounded-xl px-4 py-3 text-sm text-hex-bone">{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
