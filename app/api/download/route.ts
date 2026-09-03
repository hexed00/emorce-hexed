import { NextRequest, NextResponse } from 'next/server';

const COBALT_INSTANCES = [
  'https://api.cobalt.tools/',
  'https://cobalt-api.kwiatekmroz.com/',
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, tool } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid URL' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (tool === 'discord') {
      const idMatch = url.match(/(\d{17,20})/);
      if (idMatch) {
        const userId = idMatch[1];
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/`;
        return NextResponse.json({
          message: `Discord user ID detected: ${userId}. Open profile or use avatar CDN.`,
          downloadUrl: `https://discord.com/users/${userId}`,
          avatarBase: avatarUrl,
          note: 'For animated banners/avatars you need the hash from the user object.',
        });
      }
      return NextResponse.json({
        message: 'Paste a Discord user ID (17-20 digits) or profile URL.',
        downloadUrl: null,
      });
    }

    if (tool === 'img2gif' || tool === 'mp4gif') {
      return NextResponse.json({
        message: tool === 'img2gif'
          ? 'Image\u2192GIF: use an online converter or the Cobalt instance for media.'
          : 'MP4\u2192GIF: short clips work best. Open Cobalt or a dedicated converter.',
        downloadUrl: url.startsWith('http') ? url : null,
        cobalt: `https://cobalt.tools/?u=${encodeURIComponent(url)}`,
      });
    }

    const payload = {
      url,
      videoQuality: '1080',
      audioFormat: 'mp3',
      downloadMode: 'auto',
      filenameStyle: 'basic',
    };

    let lastError = 'All instances failed';

    for (const instance of COBALT_INSTANCES) {
      try {
        const res = await fetch(instance, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          lastError = `Instance ${instance} returned ${res.status}`;
          continue;
        }

        const data = await res.json();

        if (data.status === 'tunnel' || data.status === 'redirect' || data.url) {
          return NextResponse.json({
            message: 'Download ready via Cobalt.',
            downloadUrl: data.url || data.tunnel,
            status: data.status,
            filename: data.filename,
          });
        }

        if (data.status === 'picker' && data.picker) {
          return NextResponse.json({
            message: 'Multiple items found \u2014 open Cobalt to choose.',
            downloadUrl: `https://cobalt.tools/?u=${encodeURIComponent(url)}`,
            picker: data.picker,
          });
        }

        if (data.status === 'error') {
          lastError = data.error?.code || data.text || 'Cobalt error';
          continue;
        }

        return NextResponse.json({
          message: 'Response received',
          ...data,
          downloadUrl: data.url || null,
        });
      } catch (e: any) {
        lastError = e.message || 'Network error';
        continue;
      }
    }

    return NextResponse.json({
      message: `Could not reach Cobalt API (${lastError}). Opening the web UI instead.`,
      downloadUrl: `https://cobalt.tools/?u=${encodeURIComponent(url)}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
