import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id || !/^\d{17,20}$/.test(String(id))) {
      return NextResponse.json({ error: 'Invalid Discord user ID' }, { status: 400 });
    }

    const userId = String(id);

    const sources = [
      `https://discordlookup.mesalytic.moe/v1/user/${userId}`,
      `https://japi.rest/discord/v1/user/${userId}`,
    ];

    let profile: any = null;
    let source = '';

    for (const url of sources) {
      try {
        const res = await fetch(url, {
          headers: { Accept: 'application/json', 'User-Agent': 'emorce-hexed/2.0' },
          next: { revalidate: 60 },
        });
        if (!res.ok) continue;
        const data = await res.json();
        if (data && (data.id || data.username || data.user)) {
          profile = data.user || data;
          source = url;
          break;
        }
      } catch {
        continue;
      }
    }

    const defaultAvatar = Number(userId.slice(-1)) % 6;
    const avatarUrl = profile?.avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${profile.avatar}.${String(profile.avatar).startsWith('a_') ? 'gif' : 'png'}?size=1024`
      : `https://cdn.discordapp.com/embed/avatars/${defaultAvatar}.png`;

    const bannerUrl = profile?.banner
      ? `https://cdn.discordapp.com/banners/${userId}/${profile.banner}.${String(profile.banner).startsWith('a_') ? 'gif' : 'png'}?size=1024`
      : null;

    const result = {
      id: userId,
      username: profile?.username || (profile?.tag ? String(profile.tag).split('#')[0] : null) || null,
      global_name: profile?.global_name || profile?.display_name || profile?.globalName || null,
      discriminator: profile?.discriminator || null,
      bio: profile?.bio || profile?.about_me || profile?.description || null,
      avatar: avatarUrl,
      banner: bannerUrl,
      accent_color: profile?.accent_color || profile?.accentColor || null,
      banner_color: profile?.banner_color || profile?.bannerColor || null,
      public_flags: profile?.public_flags ?? profile?.flags ?? null,
      badges: profile?.badges || [],
      created_at: profile?.created_at || profile?.createdAt || null,
      source: source || 'cdn-fallback',
      profile_url: `https://discord.com/users/${userId}`,
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Lookup failed' }, { status: 500 });
  }
}
