'use client';

import { useState } from 'react';
import { Layers, ExternalLink, Copy, Check, Globe } from 'lucide-react';

const cobaltServices = [
  { name: 'YouTube', desc: 'Video + Audio + Subtitles' },
  { name: 'TikTok', desc: 'No watermark video + audio' },
  { name: 'Twitter / X', desc: 'Video + images + gifs' },
  { name: 'Instagram', desc: 'Reels, posts, stories' },
  { name: 'Reddit', desc: 'Video + gallery' },
  { name: 'SoundCloud', desc: 'Audio tracks' },
  { name: 'Vimeo', desc: 'Video downloads' },
  { name: 'Tumblr', desc: 'Video + images' },
  { name: 'Facebook', desc: 'Public videos' },
  { name: 'Twitch', desc: 'Clips + VODs' },
  { name: 'Pinterest', desc: 'Images + videos' },
  { name: 'Bluesky', desc: 'Posts + media' },
  { name: 'Bilibili', desc: 'Video' },
  { name: 'Streamable', desc: 'Video' },
  { name: 'VK', desc: 'Video + audio' },
  { name: 'Xiaohongshu', desc: 'Images + video' },
];

export default function CobaltSection() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const cobaltUrl = url.trim()
    ? `https://cobalt.tools/?u=${encodeURIComponent(url.trim())}`
    : 'https://cobalt.tools/';

  const copyLink = () => {
    navigator.clipboard.writeText(cobaltUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-900/40 to-hex-ash flex items-center justify-center">
            <Layers className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Cobalt Tools</h2>
            <p className="text-xs text-hex-muted font-mono">full power of cobalt.tools \u00b7 no watermark \u00b7 high quality</p>
          </div>
        </div>

        <p className="text-sm text-hex-muted mt-4 mb-6 leading-relaxed">
          Cobalt is one of the cleanest open downloaders alive. Paste any supported link below and jump straight into the tool, or open the original site.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste any Cobalt-supported URL (YouTube, TikTok, X, Reddit...)"
            className="hex-input flex-1 rounded-xl px-4 py-3.5 text-sm font-mono"
          />
          <a
            href={cobaltUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hex-btn rounded-xl px-6 py-3.5 font-display font-semibold text-sm flex items-center justify-center gap-2 min-w-[140px]"
          >
            <ExternalLink className="w-4 h-4" />
            Open Cobalt
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={copyLink} className="site-pill text-xs">
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy cobalt link'}
          </button>
          <a href="https://cobalt.tools/" target="_blank" rel="noopener noreferrer" className="site-pill text-xs">
            <Globe className="w-3.5 h-3.5" />
            cobalt.tools
          </a>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-display font-semibold text-hex-bone">Supported Services</h3>
          <div className="section-line flex-1" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {cobaltServices.map((s) => (
            <div key={s.name} className="hex-card rounded-xl px-4 py-3">
              <p className="text-sm font-medium text-hex-bone">{s.name}</p>
              <p className="text-[11px] text-hex-muted mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-hex-smoke/50 bg-hex-ash/30 p-4">
        <p className="text-[11px] text-hex-muted font-mono leading-relaxed">
          \u2691 Cobalt is open-source and privacy-focused. No accounts, no tracking of downloads.
          Use the official instance or self-host. All credit to the Cobalt team.
        </p>
      </div>
    </div>
  );
}
