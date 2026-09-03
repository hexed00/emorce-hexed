'use client';

import { useState, useRef } from 'react';
import { Upload, Download, Loader2, Image as ImageIcon, Film } from 'lucide-react';

export default function GifTools() {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [busy, setBusy] = useState(false);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState('emorce.gif');
  const [msg, setMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMsg('Processing…');
    setOutUrl(null);
    try {
      if (mode === 'image') {
        const bitmap = await createImageBitmap(file);
        const max = 480;
        const scale = Math.min(1, max / bitmap.width);
        const w = Math.round(bitmap.width * scale);
        const h = Math.round(bitmap.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(bitmap, 0, 0, w, h);

        let blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/gif'));
        if (!blob || blob.size < 100) {
          blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'));
          setOutName('emorce.png');
          setMsg('Exported as PNG — Discord accepts this');
        } else {
          setOutName('emorce.gif');
          setMsg('GIF ready');
        }
        if (!blob) throw new Error('Encode failed');
        setOutUrl(URL.createObjectURL(blob));
      } else {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.src = URL.createObjectURL(file);
        await new Promise<void>((res, rej) => {
          video.onloadedmetadata = () => res();
          video.onerror = () => rej(new Error('Invalid video'));
        });
        const dur = Math.min(video.duration || 2, 3);
        video.currentTime = Math.min(0.5, dur / 2);
        await new Promise<void>((r) => { video.onseeked = () => r(); });
        const max = 400;
        const scale = Math.min(1, max / (video.videoWidth || 400));
        const w = Math.round((video.videoWidth || 400) * scale);
        const h = Math.round((video.videoHeight || 300) * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(video, 0, 0, w, h);
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/png'));
        if (!blob) throw new Error('Frame export failed');
        setOutUrl(URL.createObjectURL(blob));
        setOutName('emorce-frame.png');
        setMsg('Frame extracted — Discord ready');
        URL.revokeObjectURL(video.src);
      }
    } catch (err: any) {
      setMsg(err.message || 'Failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="hex-card rounded-2xl p-6 md:p-8 space-y-5 fade-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900/40 to-hex-ash flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-hex-bone">GIF / Media Converter</h2>
          <p className="text-xs text-hex-muted font-mono">upload → download · client-side · Discord ready</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('image')} className={`px-4 py-2 rounded-lg text-sm font-mono ${mode === 'image' ? 'bg-hex-blood text-white' : 'bg-hex-ash text-hex-muted'}`}>
          <ImageIcon className="w-3.5 h-3.5 inline mr-1" /> Image
        </button>
        <button type="button" onClick={() => setMode('video')} className={`px-4 py-2 rounded-lg text-sm font-mono ${mode === 'video' ? 'bg-hex-blood text-white' : 'bg-hex-ash text-hex-muted'}`}>
          <Film className="w-3.5 h-3.5 inline mr-1" /> Video frame
        </button>
      </div>

      <input ref={fileRef} type="file" accept={mode === 'image' ? 'image/*' : 'video/*'} className="hidden" onChange={onFile} />
      <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className="hex-btn rounded-xl px-6 py-3.5 font-display font-semibold text-sm flex items-center gap-2">
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {busy ? 'Working…' : 'Upload file'}
      </button>

      {msg && <p className="text-sm text-hex-muted font-mono">{msg}</p>}

      {outUrl && (
        <div className="space-y-3">
          <img src={outUrl} alt="out" className="max-w-xs rounded-xl border border-hex-smoke bg-black" />
          <a href={outUrl} download={outName} className="hex-btn inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm">
            <Download className="w-4 h-4" /> Download {outName}
          </a>
        </div>
      )}
    </div>
  );
}
