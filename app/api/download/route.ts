import { NextRequest, NextResponse } from 'next/server';

const COBALT_INSTANCES = [
  'https://api.cobalt.rpkiinval.id/',
  'https://cobaltapi.squair.xyz/',
  'https://cobalt-api.lamps-dev.dev/',
  'https://nuko-c.meowing.de/',
  'https://apicobalt.mgytr.top/',
  'https://cobaltapi.kittycat.boo/',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url, mode } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }
    url = url.trim();

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const payload: Record<string, any> = {
      url,
      videoQuality: '1080',
      audioFormat: 'mp3',
      downloadMode: mode === 'audio' ? 'audio' : 'auto',
      filenameStyle: 'basic',
      disableMetadata: false,
    };

    const errors: string[] = [];

    for (const base of COBALT_INSTANCES) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(base, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'emorce-hexed/2.1',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timer);

        if (!res.ok) {
          errors.push(`${base} HTTP ${res.status}`);
          continue;
        }

        const data = await res.json();

        if (data.status === 'error') {
          errors.push(`${base} ${data.error?.code || data.text || 'error'}`);
          continue;
        }

        const fileUrl = data.url || data.tunnel || null;
        if (fileUrl) {
          return NextResponse.json({
            ok: true,
            message: 'Ready',
            downloadUrl: fileUrl,
            filename: data.filename || null,
            status: data.status || 'ok',
          });
        }

        if (data.status === 'picker' && Array.isArray(data.picker) && data.picker.length) {
          return NextResponse.json({
            ok: true,
            message: 'Multiple items',
            downloadUrl: data.picker[0].url || null,
            picker: data.picker,
          });
        }

        errors.push(`${base} no url`);
      } catch (e: any) {
        errors.push(`${base} ${e.name === 'AbortError' ? 'timeout' : e.message}`);
      }
    }

    if (url.includes('spotify.com')) {
      return NextResponse.json({
        ok: false,
        message: 'Spotify blocked on public instances. Search the track on YouTube tool instead.',
        downloadUrl: null,
        errors: errors.slice(0, 4),
      });
    }

    return NextResponse.json({
      ok: false,
      message: 'All backends failed. Try again or another link.',
      downloadUrl: null,
      errors: errors.slice(0, 5),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}
