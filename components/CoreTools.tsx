'use client';

import { useState } from 'react';
import {
  Music, Instagram, User, Pin, Image as ImageIcon, Film, Link2, Loader2, Check, ExternalLink, Download
} from 'lucide-react';

type ToolId = 'spotify' | 'instagram' | 'discord' | 'pinterest' | 'img2gif' | 'mp4gif';

const tools = [
  {
    id: 'spotify' as ToolId,
    title: 'Spotify Downloader',
    desc: 'Track \u00b7 Album \u00b7 Playlist \u00b7 Episode',
    icon: Music,
    placeholder: 'Paste Spotify track / album / playlist URL...',
    color: 'from-green-900/40 to-hex-ash',
  },
  {
    id: 'instagram' as ToolId,
    title: 'Instagram Reels & Posts',
    desc: 'Reels \u00b7 Posts \u00b7 Stories (public)',
    icon: Instagram,
    placeholder: 'Paste Instagram post or reel URL...',
    color: 'from-pink-900/30 to-hex-ash',
  },
  {
    id: 'discord' as ToolId,
    title: 'Discord Profile',
    desc: 'Avatar \u00b7 Banner \u00b7 Profile JSON',
    icon: User,
    placeholder: 'Discord user ID or profile URL...',
    color: 'from-indigo-900/30 to-hex-ash',
  },
  {
    id: 'pinterest' as ToolId,
    title: 'Pinterest Downloader',
    desc: 'Pins \u00b7 Boards \u00b7 High-res images',
    icon: Pin,
    placeholder: 'Paste Pinterest pin or board URL...',
    color: 'from-red-900/30 to-hex-ash',
  },
  {
    id: 'img2gif' as ToolId,
    title: 'Image \u2192 GIF',
    desc: 'Single image or sequence \u2192 animated GIF',
    icon: ImageIcon,
    placeholder: 'Image URL or upload...',
    color: 'from-purple-900/30 to-hex-ash',
  },
  {
    id: 'mp4gif' as ToolId,
    title: 'MP4 \u2192 GIF',
    desc: 'Video clip \u2192 high quality GIF',
    icon: Film,
    placeholder: 'MP4 / video URL...',
    color: 'from-orange-900/30 to-hex-ash',
  },
];

export default function CoreTools() {
  const [activeTool, setActiveTool] = useState<ToolId>('spotify');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const current = tools.find((t) => t.id === activeTool)!;

  const handleDownload = async () => {
    if (!url.trim()) return;
    setStatus('loading');
    setMessage('');
    setResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), tool: activeTool }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Download failed');
      }

      setResult(data.downloadUrl || data.url || null);
      setMessage(data.message || 'Ready.');
      setStatus('done');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setActiveTool(tool.id);
                setUrl('');
                setStatus('idle');
                setResult(null);
                setMessage('');
              }}
              className={`
                hex-card rounded-xl p-4 text-left
                ${isActive ? 'border-hex-blood shadow-[0_0_20px_rgba(139,0,0,0.3)]' : ''}
              `}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3`}>
                <Icon className="w-4 h-4 text-hex-bone" />
              </div>
              <h3 className="font-display font-semibold text-sm text-hex-bone">{tool.title}</h3>
              <p className="text-[11px] text-hex-muted mt-1">{tool.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center`}>
            <current.icon className="w-5 h-5 text-hex-bone" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">{current.title}</h2>
            <p className="text-xs text-hex-muted font-mono">{current.desc}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hex-muted" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload()}
              placeholder={current.placeholder}
              className="hex-input w-full rounded-xl pl-10 pr-4 py-3.5 text-sm font-mono"
            />
          </div>
          <button
            onClick={handleDownload}
            disabled={status === 'loading' || !url.trim()}
            className="hex-btn rounded-xl px-6 py-3.5 font-display font-semibold text-sm flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Working...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download
              </>
            )}
          </button>
        </div>

        {status !== 'idle' && (
          <div className={`mt-5 rounded-xl p-4 border ${
            status === 'done' ? 'border-green-900/50 bg-green-950/20' :
            status === 'error' ? 'border-hex-blood/50 bg-red-950/20' :
            'border-hex-smoke bg-hex-ash/50'
          }`}>
            <div className="flex items-start gap-3">
              {status === 'done' && <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />}
              {status === 'error' && <span className="text-hex-crimson font-mono text-lg">\u2715</span>}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-hex-bone">{message}</p>
                {result && (
                  <a
                    href={result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-hex-crimson hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open / Download file
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-hex-smoke/40">
          <p className="text-[11px] text-hex-muted font-mono leading-relaxed">
            \u2691 Supports public links only \u00b7 Rate limits may apply \u00b7 Powered by Cobalt + custom extractors \u00b7
            For private content use your own tokens (extras tab)
          </p>
        </div>
      </div>
    </div>
  );
}
