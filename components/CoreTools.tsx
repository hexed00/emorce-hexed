'use client';

import { useState, useRef } from 'react';
import {
  Music, Instagram, User, Pin, Image as ImageIcon, Film,
  Link2, Loader2, Check, Download, Upload, Copy
} from 'lucide-react';

type ToolId = 'spotify' | 'instagram' | 'discord' | 'pinterest' | 'img2gif' | 'mp4gif' | 'tiktok' | 'youtube';

const tools = [
  { id: 'spotify' as ToolId, title: 'Spotify', desc: 'Track · Album · Playlist', icon: Music, color: 'from-green-900/40 to-hex-ash', placeholder: 'Spotify URL...' },
  { id: 'instagram' as ToolId, title: 'Instagram', desc: 'Reels · Posts', icon: Instagram, color: 'from-pink-900/30 to-hex-ash', placeholder: 'Instagram post/reel URL...' },
  { id: 'discord' as ToolId, title: 'Discord', desc: 'Deep profile search', icon: User, color: 'from-indigo-900/40 to-hex-ash', placeholder: 'Discord user ID (17-20 digits)...' },
  { id: 'pinterest' as ToolId, title: 'Pinterest', desc: 'Pins · high-res', icon: Pin, color: 'from-red-900/30 to-hex-ash', placeholder: 'Pinterest pin URL...' },
  { id: 'tiktok' as ToolId, title: 'TikTok', desc: 'No watermark', icon: Film, color: 'from-cyan-900/30 to-hex-ash', placeholder: 'TikTok video URL...' },
  { id: 'youtube' as ToolId, title: 'YouTube', desc: 'Video or audio', icon: Film, color: 'from-red-950/40 to-hex-ash', placeholder: 'YouTube URL...' },
  { id: 'img2gif' as ToolId, title: 'Image to GIF', desc: 'Upload or URL', icon: ImageIcon, color: 'from-purple-900/30 to-hex-ash', placeholder: 'Image URL (or upload below)...' },
  { id: 'mp4gif' as ToolId, title: 'MP4 to GIF', desc: 'Upload or URL', icon: Film, color: 'from-orange-900/30 to-hex-ash', placeholder: 'Video URL (or upload below)...' },
];

export default function CoreTools() {
  const [activeTool, setActiveTool] = useState<ToolId>('spotify');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [discordProfile, setDiscordProfile] = useState<any>(null);
  const [audioOnly, setAudioOnly] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const current = tools.find((t) => t.id === activeTool)!;

  const reset = () => {
    setStatus('idle');
    setMessage('');
    setResult(null);
    setDiscordProfile(null);
    setPreviewUrl(null);
  };

  const handleDownload = async () => {
    if (!url.trim() && !previewUrl) return;
    setStatus('loading');
    setMessage('');
    setResult(null);
    setDiscordProfile(null);

    try {
      if (activeTool === 'discord') {
        const id = url.trim().match(/(\d{17,20})/)?.[1];
        if (!id) throw new Error('Need a valid Discord user ID');
        const res = await fetch('/api/discord', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Lookup failed');
        setDiscordProfile(data);
        setMessage('Profile found');
        setStatus('done');
        return;
      }

      if ((activeTool === 'img2gif' || activeTool === 'mp4gif') && previewUrl && !url.trim()) {
        setResult(previewUrl);
        setMessage('Local file ready — right-click / long-press to save.');
        setStatus('done');
        return;
      }

      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          tool: activeTool,
          mode: audioOnly && activeTool === 'youtube' ? 'audio' : 'auto',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setResult(data.downloadUrl || null);
      setMessage(data.message || (data.downloadUrl ? 'Ready' : 'No direct file — try another link'));
      setStatus(data.downloadUrl ? 'done' : 'error');
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
      setStatus('error');
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUrl('');
    setMessage(`Loaded: ${file.name}`);
    setStatus('idle');
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8 fade-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setUrl(''); reset(); }}
              className={`hex-card rounded-xl p-4 text-left ${isActive ? 'border-hex-blood shadow-[0_0_20px_rgba(139,0,0,0.35)]' : ''}`}
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
            disabled={status === 'loading' || (!url.trim() && !previewUrl)}
            className="hex-btn rounded-xl px-6 py-3.5 font-display font-semibold text-sm flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Working...</>
            ) : (
              <><Download className="w-4 h-4" /> {activeTool === 'discord' ? 'Search' : 'Download'}</>
            )}
          </button>
        </div>

        {(activeTool === 'img2gif' || activeTool === 'mp4gif') && (
          <div className="mt-4">
            <input ref={fileRef} type="file" accept={activeTool === 'img2gif' ? 'image/*' : 'video/*,image/*'} className="hidden" onChange={onFile} />
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 text-sm text-hex-muted hover:text-hex-crimson transition-colors font-mono">
              <Upload className="w-4 h-4" /> or upload file from device
            </button>
            {previewUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-hex-smoke max-w-xs">
                {activeTool === 'mp4gif' ? (
                  <video src={previewUrl} controls className="w-full max-h-48 object-contain bg-black" />
                ) : (
                  <img src={previewUrl} alt="preview" className="w-full max-h-48 object-contain bg-black" />
                )}
              </div>
            )}
          </div>
        )}

        {activeTool === 'youtube' && (
          <label className="mt-3 flex items-center gap-2 text-xs font-mono text-hex-muted cursor-pointer">
            <input type="checkbox" checked={audioOnly} onChange={(e) => setAudioOnly(e.target.checked)} className="accent-hex-crimson" />
            audio only
          </label>
        )}

        {status !== 'idle' && !discordProfile && (
          <div className={`mt-5 rounded-xl p-4 border ${
            status === 'done' ? 'border-green-900/50 bg-green-950/20' :
            status === 'error' ? 'border-hex-blood/50 bg-red-950/20' : 'border-hex-smoke bg-hex-ash/50'
          }`}>
            <div className="flex items-start gap-3">
              {status === 'done' && <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />}
              {status === 'error' && <span className="text-hex-crimson font-mono">x</span>}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-hex-bone">{message}</p>
                {result && (
                  <a href={result} download className="mt-3 inline-flex items-center gap-2 text-sm text-hex-crimson hover:text-white transition-colors">
                    <Download className="w-4 h-4" /> Download file
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {discordProfile && (
          <div className="mt-6 rounded-2xl border border-hex-smoke overflow-hidden bg-hex-ash/40">
            {discordProfile.banner && (
              <div className="h-28 md:h-36 relative">
                <img src={discordProfile.banner} alt="banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            )}
            <div className="p-5 flex flex-col sm:flex-row gap-4 items-start">
              <img
                src={discordProfile.avatar}
                alt="avatar"
                className="w-20 h-20 rounded-2xl border-2 border-hex-blood/50 shadow-lg -mt-12 sm:mt-0 relative z-10 bg-hex-ash"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-lg text-hex-bone">
                  {discordProfile.global_name || discordProfile.username || 'Unknown'}
                </h3>
                {discordProfile.username && (
                  <p className="text-sm text-hex-muted font-mono">@{discordProfile.username}</p>
                )}
                <p className="text-[11px] text-hex-muted font-mono mt-1">ID: {discordProfile.id}</p>
                {discordProfile.bio && (
                  <p className="mt-3 text-sm text-hex-bone/90 leading-relaxed whitespace-pre-wrap">{discordProfile.bio}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={discordProfile.avatar} download className="hex-btn text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Download className="w-3 h-3" /> Avatar
                  </a>
                  {discordProfile.banner && (
                    <a href={discordProfile.banner} download className="hex-btn text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Download className="w-3 h-3" /> Banner
                    </a>
                  )}
                  <button onClick={() => copy(discordProfile.id)} className="site-pill text-xs">
                    <Copy className="w-3 h-3" /> Copy ID
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
