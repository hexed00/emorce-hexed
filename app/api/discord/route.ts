import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = body.id || body.userId || '';
    const match = String(raw).match(/(\d{17,20})/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid Discord user ID (need 17-20 digits)' }, { status: 400 });
    }
    const userId = match[1];

    let profile: any = null;
    let source = '';

    try {
      const res = await fetch(`https://japi.rest/discord/v1/user/${userId}`, {
        headers: { Accept: 'application/json', 'User-Agent': 'emorce-hexed/2.1' },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        profile = json.data || json;
        if (profile?.id || profile?.username) source = 'japi.rest';
      }
    } catch {}

    if (!profile) {
      try {
        const res = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${userId}`, {
          headers: { Accept: 'application/json', 'User-Agent': 'emorce-hexed/2.1' },
          cache: 'no-store',
        });
        if (res.ok) {
          profile = await res.json();
          source = 'discordlookup';
        }
      } catch {}
    }

    const avatarHash = profile?.avatar?.id || profile?.avatar;
    const bannerHash = profile?.banner?.id || profile?.banner;
    const isAnimAvatar = typeof avatarHash === 'string' && avatarHash.startsWith('a_');
    const isAnimBanner = typeof bannerHash === 'string' && bannerHash.startsWith('a_');

    const defaultIdx = Number(userId.slice(-1)) % 6;
    const avatarUrl = avatarHash
      ? (profile?.avatar?.link
          ? `${profile.avatar.link}.${isAnimAvatar ? 'gif' : 'png'}?size=1024`
          : `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${isAnimAvatar ? 'gif' : 'png'}?size=1024`)
      : (profile?.avatarURL || profile?.defaultAvatarURL || `https://cdn.discordapp.com/embed/avatars/${defaultIdx}.png`);

    const bannerUrl = bannerHash
      ? (profile?.banner?.link
          ? `${profile.banner.link}.${isAnimBanner ? 'gif' : 'png'}?size=1024`
          : `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${isAnimBanner ? 'gif' : 'png'}?size=1024`)
      : null;

    const username = profile?.username || (profile?.tag ? String(profile.tag).split('#')[0] : null);
    const globalName = profile?.global_name || profile?.globalName || profile?.display_name || null;
    const bio = profile?.bio || profile?.about_me || profile?.description || null;

    return NextResponse.json({
      id: userId,
      username,
      global_name: globalName,
      discriminator: profile?.discriminator ?? null,
      bio,
      avatar: avatarUrl,
      banner: bannerUrl,
      accent_color: profile?.accent_color ?? profile?.accentColor ?? null,
      banner_color: profile?.banner_color ?? profile?.bannerColor ?? profile?.banner?.color ?? null,
      public_flags: profile?.public_flags ?? profile?.flags ?? null,
      badges: profile?.public_flags_array || profile?.badges || [],
      created_at: profile?.createdAt || profile?.created_at || null,
      source: source || 'cdn-fallback',
      profile_url: `https://discord.com/users/${userId}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Lookup failed' }, { status: 500 });
  }
}
