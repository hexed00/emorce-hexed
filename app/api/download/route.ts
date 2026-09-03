import { NextRequest, NextResponse } from 'next/server';

const COBALT = [
  'https://api.cobalt.tools/',
  'https://cobalt-backend.vercel.app/',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, tool, mode } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    if (tool === 'discord') {
      return NextResponse.json({ error: 'Use Discord deep search instead' }, { status: 400 });
    }

    const payload: any = {
      url,
      videoQuality: '1080',
      audioFormat: 'mp3',
      downloadMode: mode === 'audio' ? 'audio' : 'auto',
      filenameStyle: 'basic',
    };

    let lastError = 'No instance responded';

    for (const base of COBALT) {
      try {
        const res = await fetch(base, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          lastError = `HTTP ${res.status}`;
          continue;
        }
        const data = await res.json();
        if (data.status === 'error') {
          lastError = data.error?.code || data.text || 'cobalt error';
          continue;
        }
        if (data.url || data.tunnel || data.status === 'tunnel' || data.status === 'redirect') {
          return NextResponse.json({
            message: 'Ready',
            downloadUrl: data.url || data.tunnel,
            filename: data.filename,
            status: data.status,
          });
        }
        if (data.status === 'picker' && data.picker) {
          return NextResponse.json({
            message: 'Multiple items — pick one',
            picker: data.picker,
            downloadUrl: data.picker[0]?.url || null,
          });
        }
        if (data.url) {
          return NextResponse.json({ message: 'Ready', downloadUrl: data.url, ...data });
        }
      } catch (e: any) {
        lastError = e.message || 'network';
      }
    }

    return NextResponse.json({
      message: `Could not process (${lastError}). Try again or different link.`,
      downloadUrl: null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
